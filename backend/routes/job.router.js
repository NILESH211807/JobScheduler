import express from 'express';
import { createJob, getAllJobs, getJobById, runJobById } from '../controllers/job.controller.js';

const router = express.Router();


// get all jobs
router.get('/', getAllJobs);

// // create job
router.post('/create', createJob);

// // get job by id
router.get('/:id', getJobById);

// // run-job
router.post('/run-job/:id', runJobById);

export default router;