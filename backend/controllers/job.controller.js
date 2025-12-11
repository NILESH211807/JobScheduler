
import { jobCreateSchema } from '../validators/create.validator.js';
import Job from '../model/jon.model.js';
import mongoose from 'mongoose';

// Create a new job
export const createJob = async (req, res) => {
    const { error, value } = jobCreateSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const { task_name, priority, payload } = value;

        // Create new job document
        const newJob = new Job({
            task_name,
            priority,
            payload,
            status: "pending" // Default status
        });

        // Save to database
        const savedJob = await newJob.save();

        return res.status(201).json({
            message: "Job created successfully",
            data: {
                id: savedJob._id,
                task_name: savedJob.task_name,
                priority: savedJob.priority,
                payload: savedJob.payload,
                status: savedJob.status,
                created_at: savedJob.createdAt,
                updated_at: savedJob.updatedAt
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

// Get all jobs
export const getAllJobs = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const py = req.query.priority;
    const st = req.query.status;
    const query = req.query.query;

    const priority = py?.trim()?.toLowerCase();
    const status = st?.trim()?.toLowerCase();
    const task_name = query?.trim()?.toLowerCase();

    const priorityType = ["low", "medium", "high"];
    const statusType = ["pending", "running", "completed"];

    try {
        // Build filter object
        const filter = {};

        // Priority filter
        if (priority) {
            if (!priorityType.includes(priority)) {
                return res.status(400).json({
                    message: "Invalid priority"
                });
            }
            filter.priority = priority;
        }

        // Status filter
        if (status) {
            if (!statusType.includes(status)) {
                return res.status(400).json({
                    message: "Invalid status"
                });
            }
            filter.status = status;
        }

        // Search in task_name (case-insensitive)
        if (task_name) {
            if (task_name.length < 3) {
                return res.status(400).json({
                    message: "Search query must be at least 3 characters"
                });
            }
            filter.task_name = { $regex: task_name, $options: 'i' };
        }

        // Execute queries in parallel
        const [jobs, total] = await Promise.all([
            Job.find(filter)
                .sort({ _id: -1 }) // Descending order (newest first)
                .skip(skip)
                .limit(limit)
                .lean(), // Returns plain JavaScript objects for better performance
            Job.countDocuments(filter)
        ]);

        res.json({
            message: "Jobs fetched successfully",
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: jobs
        });

    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal Server Error"
        });
    }
};
// Get a job by ID
export const getJobById = async (req, res) => {
    const jobId = req.params.id;

    // Validate MongoDB ObjectId format
    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({
            message: "Invalid job ID."
        });
    }

    try {
        const job = await Job.findById(jobId).lean();

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json({
            message: "Job fetched successfully",
            data: job
        });

    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({
            message: "An error occurred while fetching the job"
        });
    }
};

// Run a job by ID
export const runJobById = async (req, res) => {
    const jobId = req.params.id;
    const WEBHOOK_URL = process.env.WEBHOOK_URL;

    // Validate MongoDB ObjectId format
    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({
            message: "Invalid job ID."
        });
    }

    try {
        // 1. Fetch job data
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        // 2. Set job → running
        job.status = 'running';
        await job.save();

        // Respond job is running
        res.json({ message: "Job is running", jobId });

        // 3. Simulate 3-second background processing
        await new Promise(resolve => setTimeout(resolve, 3000));

        // 4. Update → completed
        job.status = 'completed';
        await job.save(); // updatedAt is automatically updated by timestamps

        const completedAt = new Date().toISOString();

        // 5. WEBHOOK PAYLOAD
        const webhookPayload = {
            jobId: job._id,
            taskName: job.task_name,
            priority: job.priority,
            payload: typeof job.payload === 'string' ? JSON.parse(job.payload) : (job.payload || {}),
            completedAt
        };

        console.log("Sending webhook:", webhookPayload);

        if (!WEBHOOK_URL) {
            console.error("WEBHOOK_URL not set");
            return;
        }

        // 6. Send POST webhook
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(webhookPayload)
        });

        const webhookResponseBody = await response.text();
        // Log webhook result
        console.log("✅ Webhook Delivered");
        console.log("Status:", response.status);
        console.log("Response:", webhookResponseBody);

    } catch (error) {
        console.error('Error running job:', error);
        // Only send response if headers haven't been sent yet
        if (!res.headersSent) {
            res.status(500).json({
                message: "An error occurred while running the job"
            });
        }
    }
};