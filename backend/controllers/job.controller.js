
import { pool } from '../connection/db.js';
import { jobCreateSchema } from '../validators/create.validator.js';

// Create a new job
export const createJob = async (req, res) => {
    const { error, value } = jobCreateSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {

        const { task_name, priority, payload } = value;

        const sql = `
      INSERT INTO jobs (task_name, priority, payload)
      VALUES (?, ?, ?)
      `;

        // Prepare the values to be inserted

        const values = [
            task_name,
            priority,
            JSON.stringify(payload)
        ];

        // Execute the query
        const [result] = await pool.query(sql, values);

        return res.status(201).json({
            message: "Job created successfully",
            data: {
                id: result.insertId,
                task_name,
                priority,
                payload,
                status: "pending",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

// Get all jobs
export const getAllJobs = async (req, res) => {

    const page = parseInt(req.query.page) || 1; //current page
    const limit = parseInt(req.query.limit) || 10; //number of records per page
    const offset = (page - 1) * limit; //starting index of records for the current page

    const py = req.query.priority;
    const st = req.query.status;
    const query = req.query.query;

    const priority = py?.trim()?.toLowerCase();
    const status = st?.trim()?.toLowerCase();
    const task_name = query?.trim()?.toLowerCase();

    // Priority filter (supports multiple values)
    const priorityType = ["low", "medium", "high"];
    // Status filter (exact match)
    const statusType = ["pending", "running", "completed"];

    try {

        let baseSql = 'FROM jobs';
        let whereParts = [];
        let filterParams = [];

        // Priority filter
        if (priority) {
            if (!priorityType.includes(priority)) {
                return res.status(400).json({
                    message: "Invalid priority"
                });
            }
            whereParts.push('priority = ?');
            filterParams.push(priority);
        }

        // Status filter
        if (status) {
            if (!statusType.includes(status)) {
                return res.status(400).json({
                    message: "Invalid status"
                });
            }
            whereParts.push('status = ?');
            filterParams.push(status);
        }

        // Search in task_name
        if (task_name) {
            if (task_name.length < 3) {
                return res.status(400).json({
                    message: "Search query must be at least 3 characters"
                });
            }
            whereParts.push('task_name LIKE ?');
            filterParams.push(`%${task_name}%`);
        }

        // Add WHERE clause if at least 1 filter exists
        if (whereParts.length > 0) {
            baseSql += ' WHERE ' + whereParts.join(' AND ');
        }

        // 1) Data query
        const dataSql = ` SELECT * ${baseSql} ORDER BY id DESC LIMIT ? OFFSET ? `;
        // 2) Count query
        const countSql = `SELECT COUNT(*) AS total ${baseSql}`;

        // Params
        const dataParams = [...filterParams, limit, offset];
        const countParams = [...filterParams];

        // Execute
        const [rows] = await pool.query(dataSql, dataParams);
        const [countRows] = await pool.query(countSql, countParams);

        const total = countRows[0].total;

        res.json({
            message: "Jobs fetched successfully",
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: rows
        });

    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }

};

// Get a job by ID
export const getJobById = async (req, res) => {
    const jobId = req.params.id;

    if (!jobId || isNaN(jobId) || parseInt(jobId) <= 0) {
        return res.status(400).json({
            message: "Invalid job ID."
        });
    }

    try {

        const sql = `SELECT * FROM jobs WHERE id = ?`;
        const [rows] = await pool.query(sql, [jobId]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json({
            message: "Job fetched successfully",
            data: rows[0]
        });

    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({
            message: "An error occurred while fetching the job"
        });
    }

}

// Run a job by ID
export const runJobById = async (req, res) => {
    const jobId = req.params.id;
    const WEBHOOK_URL = process.env.WEBHOOK_URL;

    if (!jobId || isNaN(jobId) || parseInt(jobId) <= 0) {
        return res.status(400).json({
            message: "Invalid job ID."
        });
    }

    try {

        // 1. Fetch job data
        const sql = `SELECT * FROM jobs WHERE id = ?`;
        const [rows] = await pool.query(sql, [jobId]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        const job = rows[0];

        // 2. Set job → running
        const updateSql = `UPDATE jobs SET status = 'running' WHERE id = ?`;
        await pool.query(updateSql, [jobId]);

        // Respond job is running
        res.json({ message: "Job is running", jobId });

        // 3. Simulate 3-second background processing
        await new Promise(resolve => setTimeout(resolve, 3000));

        // 4. Update → completed
        const updateCompletedSql = `UPDATE jobs SET status = 'completed', updatedAt = NOW() WHERE id = ?`;
        await pool.query(updateCompletedSql, [jobId]);

        const completedAt = new Date().toISOString();

        // 5. WEBHOOK PAYLOAD
        const webhookPayload = {
            jobId,
            taskName: job.task_name,
            priority: job.priority,
            payload: JSON.parse(job.payload || "{}"),
            completedAt
        };

        console.log("Sending webhook:", webhookPayload);

        if (!WEBHOOK_URL) {
            return res.status(500).json({
                message: "WEBHOOK_URL not set"
            });
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
        console.error('Error fetching job:', error);
        res.status(500).json({
            message: "An error occurred while running the job"
        });
    }
}