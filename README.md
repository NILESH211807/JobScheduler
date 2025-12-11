# 🚀 Job Scheduler Automation System

A modern, full-stack job management and automation platform built with **Next.js** and **Express.js**. Create, manage, monitor, and execute background jobs through a beautiful, responsive dashboard with real-time statistics and advanced filtering.

![Node.js](https://img.shields.io/badge/Node.js-v18+-green?style=flat-square&logo=node.js)
![Next.js](https://img.shields.io/badge/Next.js-16.0+-blue?style=flat-square&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=flat-square&logo=mongodb)
![Express](https://img.shields.io/badge/Express-5.1-black?style=flat-square&logo=express)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Project Architecture](#-project-architecture)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Features
- ✅ **Create Jobs** - Add new jobs with custom task names, priorities, and payloads
- ✅ **Job Management** - View, search, filter, and execute jobs
- **Priority Levels** - Three priority levels (Low, Medium, High) for job organization
- **Job Status Tracking** - Track jobs through multiple states (Pending, Running, Completed)
- **Advanced Search** - Search jobs by task name (minimum 3 characters)
- **Smart Filtering** - Filter jobs by priority and status simultaneously
- **Real-time Dashboard** - Live statistics showing job counts by status
- **Pagination** - Navigate through large job lists with customizable page sizes (default: 10 per page)
- **Job Execution** - Execute jobs on-demand with instant status updates
- **Responsive UI** - Fully responsive design that works on mobile, tablet, and desktop
- **View Modes** - Toggle between list and grid view modes for job display
- **Job Details** - View complete job information including metadata and custom payload

### 🔧 Backend Features
- **RESTful API** - Clean, well-structured REST endpoints with proper HTTP methods
- **MongoDB Integration** - Mongoose ODM with optimized queries and indexing
- **Input Validation** - Joi schema validation for all request data
- **Error Handling** - Centralized error handling middleware with meaningful messages
- **CORS Configuration** - Secure cross-origin requests with configurable origins
- **Database Optimization** - Indexes on status, priority, and task_name fields
- **Aggregation Pipelines** - MongoDB aggregation for dashboard statistics
- **Environment Configuration** - Secure configuration management with dotenv

### 🎨 Frontend Features
- **Next.js 16** - Latest React framework with App Router
- **React Context API** - Global state management for jobs and UI state
- **Radix UI Components** - Accessible, unstyled UI component library
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Hook Form** - Efficient form handling and validation
- **Yup Validation** - Schema validation for form data
- **Sonner Toasts** - Beautiful, accessible toast notifications
- **Lucide Icons** - Lightweight, customizable icon library
- **Dark Mode Support** - Theme switching with next-themes
- **Custom Hooks** - Debounce hook for optimized search
- **Loading States** - Skeleton loaders and spinners for better UX

---

## 🛠 Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express.js | 5.1.0 | Web framework |
| MongoDB | Latest | Primary database |
| Mongoose | 9.0.1 | MongoDB ODM |
| Joi | 18.0.2 | Input validation |
| CORS | 2.8.5 | Cross-origin requests |
| dotenv | 17.2.3 | Environment variables |
| Faker.js | 10.1.0 | Data seeding |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.0.4 | React framework |
| React | 19.2.0 | UI library |
| Tailwind CSS | 4.0 | Styling |
| Radix UI | Latest | Component library |
| React Hook Form | 7.66.1 | Form management |
| Axios | 1.13.2 | HTTP client |
| Yup | 1.7.1 | Schema validation |
| Sonner | 2.0.7 | Toast notifications |
| Lucide React | 0.554.0 | Icons |
| next-themes | 0.4.6 | Theme management |

---

## 📁 Project Structure

```
Job-Scheduler-Automation-System/
├── backend/                          # Express.js Backend
│   ├── app.js                       # Main application entry point
│   ├── package.json                 # Backend dependencies
│   ├── .env                         # Environment configuration
│   ├── connection/
│   │   └── db.js                   # MongoDB connection setup
│   ├── controllers/
│   │   ├── job.controller.js       # Job business logic
│   │   └── dash.controller.js      # Dashboard statistics
│   ├── middleware/
│   │   └── errorHandler.js         # Error handling middleware
│   ├── model/
│   │   └── jon.model.js            # MongoDB Job schema
│   ├── routes/
│   │   ├── job.router.js           # Job endpoints
│   │   └── dash.router.js          # Dashboard endpoints
│   ├── seeds/
│   │   └── create_seeds.js         # Database seed data
│   └── validators/
│       └── create.validator.js     # Input validation schemas
│
├── frontend/                         # Next.js Frontend
│   ├── package.json                # Frontend dependencies
│   ├── next.config.mjs             # Next.js configuration
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   ├── eslint.config.mjs           # ESLint configuration
│   ├── jsconfig.json               # JavaScript configuration
│   ├── postcss.config.mjs          # PostCSS configuration
│   ├── public/                     # Static assets
│   └── src/
│       ├── app/
│       │   ├── layout.js           # Root layout
│       │   ├── page.js             # Home page
│       │   ├── loading.jsx         # Loading component
│       │   └── globals.css         # Global styles
│       ├── components/
│       │   ├── Header.jsx          # Header navigation
│       │   ├── Dashboard.jsx       # Main dashboard
│       │   ├── JobForm.jsx         # Job creation form
│       │   ├── JobDetails.jsx      # Job detail view
│       │   ├── JobViewModeGrid.jsx # Grid view layout
│       │   ├── ListView.jsx        # List view layout
│       │   ├── PaginationTool.jsx  # Pagination control
│       │   ├── SearchQuery.jsx     # Search functionality
│       │   ├── FilterSelect.jsx    # Filter component
│       │   ├── StatusBadge.jsx     # Status display
│       │   ├── PriorityBadge.jsx   # Priority display
│       │   ├── StatCard.jsx        # Statistics card
│       │   ├── Loader.jsx          # Loading state
│       │   ├── EmptyState.jsx      # Empty state display
│       │   └── ui/                 # Reusable UI components
│       │       ├── button.jsx
│       │       ├── card.jsx
│       │       ├── badge.jsx
│       │       ├── select.jsx
│       │       ├── table.jsx
│       │       ├── pagination.jsx
│       │       └── sonner.jsx
│       ├── context/
│       │   └── JobsContext.jsx     # Global job state
│       ├── hooks/
│       │   └── debounce.js         # Debounce custom hook
│       ├── lib/
│       │   └── utils.js            # Utility functions
│       ├── pages/
│       │   └── Dashboard.jsx       # Dashboard page
│       └── utils/
│           ├── data.js             # Data utilities
│           ├── fetch.js            # API fetch utilities
│           └── helper.js           # Helper functions
│
└── README.md                         # Project documentation
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use MongoDB Atlas
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Job-Scheduler-Automation-System.git
cd Job-Scheduler-Automation-System
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file and configure
cp .env.example .env
# Edit .env with your configuration

# Start the backend server
npm run dev        # Development mode with nodemon
# or
npm start          # Production mode
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev

# The app will be available at http://localhost:3000
```

---

## ⚙️ Configuration

### Backend Environment Variables (.env)

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration - MongoDB
MONGO_URI=mongodb://localhost:27017/job-scheduler
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/job-scheduler

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# API Configuration
API_BASE_URL=http://localhost:5000/api
```

### Frontend Environment Variables

Create a `.env.local` file in the frontend directory (optional):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 💻 Usage

### Starting the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Open your browser and navigate to:
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000/api`

### Creating a Job

1. Navigate to the dashboard
2. Click the "Create Job" button
3. Fill in the job details:
   - **Task Name:** Name of your job (3-150 characters)
   - **Priority:** Select low, medium, or high
   - **Payload:** Add custom JSON data for the job
4. Click "Create" to save

### Managing Jobs

- **Search:** Use the search bar to find jobs by name (min 3 characters)
- **Filter:** Filter jobs by status and priority
- **View Modes:** Toggle between grid and list views
- **Execute:** Click "Run" to execute a job immediately
- **View Details:** Click on a job to see full details
- **Pagination:** Navigate through job pages

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Job Endpoints

#### 1. Get All Jobs
```http
GET /jobs
```

**Query Parameters:**
- `page` (optional, default: 1): Page number for pagination
- `limit` (optional, default: 10): Number of jobs per page
- `query` (optional): Search term for task name (minimum 3 characters)
- `priority` (optional): Filter by priority - `low`, `medium`, or `high`
- `status` (optional): Filter by status - `pending`, `running`, or `completed`

**Example Request:**
```bash
GET /jobs?page=1&limit=10&query=email&priority=high&status=pending
```

**Response:**
```json
{
  "message": "Jobs fetched successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "task_name": "Send Email Newsletter",
      "priority": "high",
      "status": "pending",
      "payload": {
        "recipients": 1000,
        "template": "weekly_digest"
      },
      "createdAt": "2024-12-11T10:30:00.000Z",
      "updatedAt": "2024-12-11T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

#### 2. Create Job
```http
POST /jobs/create
Content-Type: application/json

{
  "task_name": "Send Email Newsletter",
  "priority": "high",
  "payload": {
    "recipients": 1000,
    "template": "weekly_digest",
    "sendTime": "2024-12-12T09:00:00Z"
  }
}
```

**Validation Rules:**
- `task_name`: Required, string, 3-150 characters
- `priority`: Required, must be `low`, `medium`, or `high`
- `payload`: Required, can be any JSON object

**Response (201 Created):**
```json
{
  "message": "Job created successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "task_name": "Send Email Newsletter",
    "priority": "high",
    "payload": {
      "recipients": 1000,
      "template": "weekly_digest"
    },
    "status": "pending",
    "created_at": "2024-12-11T10:30:00.000Z",
    "updated_at": "2024-12-11T10:30:00.000Z"
  }
}
```

#### 3. Get Job by ID
```http
GET /jobs/:id
```

**Response (200 OK):**
```json
{
  "message": "Job fetched successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "task_name": "Send Email Newsletter",
    "priority": "high",
    "status": "completed",
    "payload": {
      "recipients": 1000,
      "template": "weekly_digest"
    },
    "createdAt": "2024-12-11T10:30:00.000Z",
    "updatedAt": "2024-12-11T10:35:00.000Z"
  }
}
```

#### 4. Run/Execute Job
```http
POST /jobs/run-job/:id
```

**Response (200 OK):**
```json
{
  "message": "Job executed successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "task_name": "Send Email Newsletter",
    "status": "running"
  }
}
```

#### 5. Get Dashboard Statistics
```http
GET /dashboard
```

**Response (200 OK):**
```json
{
  "message": "Dashboard fetched successfully",
  "data": {
    "total": 50,
    "pending": 12,
    "running": 3,
    "completed": 32,
    "failed": 3
  }
}
```

### Error Responses

**400 Bad Request - Invalid Task Name:**
```json
{
  "message": "Task name should have a minimum length 3"
}
```

**400 Bad Request - Invalid Priority:**
```json
{
  "message": "Invalid priority"
}
```

**400 Bad Request - Search Too Short:**
```json
{
  "message": "Search query must be at least 3 characters"
}
```

**500 Internal Server Error:**
```json
{
  "message": "Internal Server Error"
}
```

---

## 🗄️ Database Schema

### Job Model (MongoDB)

```javascript
{
  _id: ObjectId,
  task_name: String (required, indexed for text search, length: 3-150),
  priority: String (enum: ['low', 'medium', 'high'], indexed, default: 'medium'),
  status: String (enum: ['pending', 'running', 'completed'], indexed, default: 'pending'),
  payload: Object (required, stores custom job data),
  createdAt: Date (auto-generated timestamp),
  updatedAt: Date (auto-updated timestamp),
  __v: Number (MongoDB version field)
}
```

**Indexes for Performance:**
- `{ priority: 1 }` - Fast filtering by priority level
- `{ status: 1 }` - Quick status-based queries
- `{ task_name: 'text' }` - Full-text search on task names

**Validation Constraints:**
- `task_name`: Minimum 3 characters, Maximum 150 characters
- `priority`: Only accepts 'low', 'medium', or 'high' (case-insensitive)
- `status`: Only accepts 'pending', 'running', or 'completed'
- `payload`: Must be a valid JSON object

---

## 🏗️ Project Architecture

### Backend Architecture

```
HTTP Request
    ↓
CORS Middleware
    ↓
Express Middleware (JSON Parser)
    ↓
Express Routes
    ↓
Controllers (Business Logic)
    ↓
Mongoose Models
    ↓
MongoDB Database
    ↓
HTTP Response
```

### Frontend Architecture

```
Browser
    ↓
Next.js App Router
    ↓
Layout Component
    ↓
Dashboard Page
    ↓
JobsContext (Global State)
    ↓
React Components Tree
    ├── Header
    ├── FilterSelect
    ├── SearchQuery
    ├── JobForm
    ├── ListView / JobViewModeGrid
    └── PaginationTool
    ↓
Axios API Client
    ↓
Backend API
```

### Data Flow

```
Frontend Components
         ↓
JobsContext State Management
         ↓
useJobs Hook
         ↓
Axios API Calls
         ↓
Express Routes (/api/jobs, /api/dashboard)
         ↓
Job Controllers
         ↓
Mongoose Models
         ↓
MongoDB Database
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/Job-Scheduler-Automation-System.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes and commit**
   ```bash
   git add .
   git commit -m 'Add some amazing feature'
   ```

4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**

### Code Style Guidelines
- Use consistent indentation (2 spaces)
- Follow ESLint rules
- Add comments for complex logic
- Keep components small and reusable
- Use meaningful variable and function names

---

## 🔧 Troubleshooting

### Backend Issues

**MongoDB Connection Error**
```
Error: connect ECONNREFUSED
```
- Check if MongoDB is running: `mongod --version`
- Verify `MONGO_URI` in `.env` file
- Ensure MongoDB service is started

**Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
- Change the `PORT` in `.env` file
- Or kill the process: Windows `netstat -ano | findstr :5000` and `taskkill /PID <PID> /F`

**Joi Validation Errors**
- Check request payload matches schema requirements
- `task_name`: Must be 3-150 characters
- `priority`: Must be 'low', 'medium', or 'high'
- `payload`: Must be provided as JSON object

### Frontend Issues

**API Connection Failed**
- Verify backend is running on correct port
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Clear browser cache and refresh

**Build Errors**
```bash
npm run build
# If there are ESLint errors, fix them first
npm run lint
```

**Search Not Working**
- Search query must be at least 3 characters
- Ensure backend is running and database is connected

---

## 📝 License

This project is licensed under the **ISC License** - see the LICENSE file for details.

---

## 📞 Support & Contact

For support, open an issue on the GitHub repository or contact the development team.

---

## 🎉 Acknowledgments

- Express.js community for excellent web framework
- Next.js team for modern React framework
- MongoDB for reliable database
- Radix UI for accessible component library
- Tailwind CSS for utility-first styling

---

## 🚦 Roadmap

**Planned Features:**
- [ ] **Job Scheduling** - Schedule jobs with cron expressions
- [ ] **Retry Logic** - Automatic retry with exponential backoff
- [ ] **Notifications** - Email/SMS alerts on job completion or failure
- [ ] **Execution History** - Detailed logs and audit trail for each job
- [ ] **WebSocket Integration** - Real-time status updates without polling
- [ ] **User Authentication** - Role-based access control and authentication
- [ ] **Job Templates** - Reusable job templates and presets
- [ ] **Analytics Dashboard** - Performance metrics and insights
- [ ] **Webhook Support** - Trigger external services on job events
- [ ] **Job Dependencies** - Chain jobs based on completion
- [ ] **Bulk Operations** - Create, update, delete multiple jobs at once
- [ ] **Export Features** - Export job data to CSV/JSON
- [ ] **API Documentation UI** - Interactive Swagger/OpenAPI documentation
- [ ] **Rate Limiting** - API rate limiting for stability

---

**Made with ❤️ by Nilesh**

*Last Updated: December 11, 2024*
