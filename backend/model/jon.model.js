const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    task_name: {
        type: String,
        required: true,
        trim: true
    },
    priority: {
        type: String,
        required: true,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
        lowercase: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'running', 'completed', 'failed'],
        default: 'pending',
        lowercase: true
    },
    payload: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Create indexes for better query performance
jobSchema.index({ priority: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ task_name: 'text' }); // For text search

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;