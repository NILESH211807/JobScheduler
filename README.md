# Job Scheduler Automation System

A minimal job-scheduling demo with:
- Backend: Express + MySQL
- Frontend: Next.js (app router) + React + Tailwind
- Purpose: Create, list, run jobs and notify an external webhook when jobs complete.

---

## 1. Setup instructions

Requirements
- Node.js >= 18
- npm
- MySQL server
- (Optional) ngrok or a publicly reachable URL for webhook testing

Repository: clone and open workspace root.

Backend (c:\Users\NILESH\Desktop\projects\Job-Scheduler-Automation-System\backend)
1. Create `.env` in backend/ with these variables:
   - DB_HOST=localhost
   - DB_USER=root
   - DB_PASSWORD=yourpassword
   - DB_DATABASE=jobs_db
   - DB_PORT=3306
   - PORT=5000
   - WEBHOOK_URL=http://your-webhook-url.example/endpoint
   - CORS_ORIGIN=http://localhost:3000
2. Install and run:
   - Open PowerShell or CMD in the backend folder:
     - npm install
     - npm run dev   (dev uses nodemon)
     - npm start     (production)
3. Confirm DB connection: console shows `DB Connected`.

Frontend (c:\Users\NILESH\Desktop\projects\Job-Scheduler-Automation-System\frontend)
1. Create `frontend/.env`:
   - NEXT_PUBLIC_BASE_URL=http://localhost:5000
2. Install and run:
   - cd frontend
   - npm install
   - npm run dev
3. Open UI: http://localhost:3000

Notes
- Ensure MySQL user has privileges to create/select/update rows in the database.
- No seed step is required for running the app (seeder scripts are not required/used).

---

## 2. Tech stack

Backend
- Node.js + Express (ES modules)
- mysql2 (promise) connection pool
- Joi for request validation
- Axios (for webhook POSTs)

Frontend
- Next.js (app router)
- React 19, Tailwind CSS
- react-hook-form + yup (forms)
- sonner (toasts)
- lucide icons
- axios wrapper (frontend/src/utils/fetch.js)

Dev & Utilities
- nodemon for backend dev
- faker available in repository (not required)

---

## 3. ER diagram / Schema design

Single primary table: jobs

Suggested SQL:
```sql
CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task_name VARCHAR(255) NOT NULL,
  priority ENUM('low','medium','high') NOT NULL DEFAULT 'medium',
  status ENUM('pending','running','completed','failed') NOT NULL DEFAULT 'pending',
  payload JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

Columns used by app:
- id, task_name, priority, status, payload, created_at, updated_at

Notes:
- payload stored as JSON (or a stringified JSON column depending on connector settings).
- status flow: pending -> running -> completed | failed

---

## 4. Architecture explanation

High level
- Frontend (Next.js) calls backend REST API endpoints to list, create, view, and run jobs.
- Backend exposes /api/jobs and /api/dash routes. Controllers handle DB operations and business logic.
- When a job is run, backend marks status running, performs work (simulated), updates status and posts a webhook to the configured WEBHOOK_URL.

Components
- Backend
  - app.js: express server, middleware (CORS, JSON), routes mount
  - routes/job.router.js: job-related endpoints
  - routes/dash.router.js: dashboard metrics
  - controllers/job.controller.js: createJob, getAllJobs, getJobById, runJobById
  - controllers/dash.controller.js: dashboard stats
  - connection/db.js: mysql2/promise pool
  - validators/create.validator.js: Joi schema
- Frontend
  - src/app/page.js / layout.js: app shell
  - src/context/JobsContext.jsx: stores/streams jobs and helper methods
  - src/components/: JobList, JobDetails, JobForm, PriorityBadge, Pagination
  - src/utils/fetch.js: axios wrapper using NEXT_PUBLIC_BASE_URL
  - pages/components call APIs and update UI state

Flow: UI action -> axios wrapper -> backend router -> controller -> DB -> response -> UI update. For run-job: backend triggers async processing and webhook after responding.

---

## 5. API documentation

Base URL: http://localhost:5000 (change PORT in backend .env)

Common response format:
{ message: string, data?: any, error?: any }

Endpoints

- GET /api/jobs
  - Query:
    - page (int, default 1)
    - limit (int, default 10)
    - query (string, search task_name, min length 3)
    - status (pending|running|completed|failed)
    - priority (low|medium|high)
  - Response: { message, page, limit, total, totalPages, data: [jobs] }

- POST /api/jobs/create
  - Body JSON:
    { "task_name": "Send report", "priority": "high", "payload": { ... } }
  - Validation: task_name required, priority optional (default medium), payload optional (JSON)
  - Response: { message: "Job created successfully", data: job }

- GET /api/jobs/:id
  - Response: { message: "Job fetched successfully", data: job }

- POST /api/jobs/run-job/:id
  - Behavior: marks job running, responds immediately with { message: "Job is running", jobId }
  - Background: simulates processing, updates job to completed/failed, sends webhook
  - Response (immediate): { message, jobId }

- GET /api/dash
  - Response: { message: "Dashboard fetched successfully", data: { total, pending, running, completed, failed } }

Error handling
- Validation errors return 4xx with message and details.
- Server errors return 500 with error message.

Examples (curl)
- Create:
  curl -X POST http://localhost:5000/api/jobs/create -H "Content-Type: application/json" -d '{"task_name":"Export CSV","priority":"low","payload":{"file":"report.csv"}}'

- Run:
  curl -X POST http://localhost:5000/api/jobs/run-job/12

---

## 6. How webhook works

Purpose: notify external system when a job finishes.

Configuration
- Set WEBHOOK_URL in backend/.env to the endpoint that will receive job completion notifications.

Flow
1. Client POSTs to /api/jobs/run-job/:id.
2. Backend immediately updates job status to "running" in DB and returns { message: "Job is running", jobId }.
3. Backend performs the job (simulated by a delay or internal processing).
4. On completion (or failure) backend updates job status to "completed" or "failed" in DB and sets updated_at.
5. Backend constructs webhook payload and POSTs to WEBHOOK_URL using axios.
6. Payload example:
   {
     "jobId": 12,
     "taskName": "Send invoice",
     "priority": "high",
     "payload": { "to": "user@example.com" },
     "status": "completed",
     "completedAt": "2025-11-27T12:00:00.000Z"
   }
7. Backend logs webhook response (status, body). If webhook errors, backend logs error (no automatic retry by default).

Best practices
- Use a retry/backoff mechanism for production webhooks (not implemented by default).
- Make webhook endpoints idempotent.

---

## Project file overview (key files)

Backend
- backend/app.js — server bootstrap & middleware
- backend/connection/db.js — mysql2 pool
- backend/routes/job.router.js — job endpoints
- backend/routes/dash.router.js — dashboard endpoints
- backend/controllers/job.controller.js — job CRUD + run-job + webhook logic
- backend/controllers/dash.controller.js — stats
- backend/validators/create.validator.js — Joi schema
- backend/package.json — scripts: dev, start

Frontend
- frontend/src/app/page.js — app entry
- frontend/src/context/JobsContext.jsx — job state & API calls
- frontend/src/components/JobList.jsx — paginated job list
- frontend/src/components/JobDetails.jsx — job view & run action
- frontend/src/components/JobForm.jsx — create job modal/form
- frontend/src/utils/fetch.js — axios wrapper using NEXT_PUBLIC_BASE_URL
- frontend/package.json — scripts: dev, build, start

---

## Running & troubleshooting (Windows)

1. Start MySQL and ensure DB exists:
   - Use MySQL Workbench / CLI to create database if needed:
     mysql -u root -p
     CREATE DATABASE jobs_db;
2. Start backend (PowerShell):
   cd backend
   npm install
   npm run dev
3. Start frontend (PowerShell):
   cd frontend
   npm install
   npm run dev
4. If CORS errors occur, confirm backend CORS_ORIGIN matches frontend URL.

---

If you want, I can:
- Add a .env.example for backend & frontend.
- Add a SQL file with CREATE TABLE statement.
- Add a small Postman collection or simple webhook listener example (express/ngrok).
