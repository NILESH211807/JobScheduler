# Job Scheduler Automation System

A minimal job scheduling demo with a Next.js frontend and an Express + MySQL backend.  
This README covers setup, tech stack, schema, architecture, API docs, and webhook behavior.

---

## 1. Setup instructions

1. Clone repository and open workspace root.

2. Backend
   - Copy [.env.example] or create `.env` in [backend/.env](backend/.env) with:
     - DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT
     - PORT (optional), WEBHOOK_URL, CORS_ORIGIN
   - Install & run:
     ```bash
     # from repo root
     cd backend
     npm install
     npm run dev   # uses nodemon (see [backend/package.json](backend/package.json))
     ```
   - Confirm DB connection: logs show `DB Connected` from .

   - Seed sample jobs:
     ```bash
     # ensure backend server not required; run seed script after env set
     node seeds/create_seeds.js
     ```
     (See .)

3. Frontend
   - Create  in  with:
     - NEXT_PUBLIC_BASE_URL=http://localhost:5000 (or your backend base URL)
   - Install & run:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```
   - Open UI: http://localhost:3000 (Next dev server)

Notes:
- Backend uses ES modules; Node >= 18 recommended.
- Ensure MySQL is running and credentials in [backend/connection/db.js] are correct.

---

## 2. Tech stack

- Backend
  - Node.js + Express (backend/app.js)
  - MySQL (mysql2/promise) connection pool (backend/connection/db.js)
  - Joi validation (backend/validators/create.validator.js)
- Frontend
  - Next.js 16 (app router) (frontend/src/app/page.js, frontend/src/app/layout.js)
  - React 19, Tailwind CSS, lucide icons
  - axios wrapper (frontend/src/utils/fetch.js)
- Utilities
  - Seeder using faker (backend/seeds/create_seeds.js)
  - Sonner for toasts, react-hook-form + yup for forms

---

## 3. ER diagram / Schema design

Primary table: 

Suggested SQL (schema derived from code usage in controllers/seeds):

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