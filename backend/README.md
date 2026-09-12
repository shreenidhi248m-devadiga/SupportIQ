# SupportIQ Backend API

Production-ready Node.js, Express, TypeScript, and MongoDB REST API backend for **SupportIQ — AI-Powered Customer Intelligence & Support System**.

---

## 🛠 Tech Stack

* **Runtime:** Node.js & TypeScript
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose ORM
* **Authentication:** JWT (JSON Web Tokens) & `bcryptjs`
* **File Uploads:** Multer
* **Validation:** Zod
* **Logger:** Winston
* **Environment:** `dotenv`

---

## 📁 Architecture Overview

```text
backend/
├── src/
│   ├── config/          # Database & Environment configuration
│   ├── models/          # Mongoose Schemas (User, Ticket, Message, Attachment, AIAnalysis, Notification)
│   ├── controllers/     # API Endpoints business logic (Auth, User, Ticket, Message, AI, Admin, Analytics)
│   ├── routes/          # Express Routers
│   ├── middleware/      # JWT Authentication, Role Guards, Error Handling, File Uploads
│   ├── services/        # AI Pipeline, Routing Engine, Ticket Service, Notification Engine
│   ├── utils/           # Response Handlers, Ticket ID Generator, Logger
│   ├── app.ts           # Express App Setup & Routes Registry
│   ├── server.ts        # Server Entry Point
│   └── seed.ts          # Database Seeder
├── uploads/             # Static file storage directory
├── .env                 # Environment secrets
├── package.json
└── tsconfig.json
```

---

## 🚀 Setup & Execution

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment (`.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/supportiq
JWT_SECRET=supportiq_super_secret_jwt_key_2026_production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=*
UPLOAD_PATH=uploads
```

### 3. Seed Database (Admin & Customer Accounts)
```bash
npm run seed
```
*Default Credentials Created:*
- **Admin:** `admin@supportiq.com` / `Admin@123456`
- **Customer:** `john.doe@example.com` / `Customer@123456`

### 4. Run Development Server
```bash
npm run dev
```

Server will run at: `http://localhost:5000/api`

---

## 📡 API Endpoints Reference

### 🔐 Authentication (`/api/auth`)
* `POST /api/auth/register` — Customer Registration (`name`, `email`, `password`, `phone`)
* `POST /api/auth/login` — Customer Login (`email`, `password`)
* `POST /api/auth/admin-login` — Admin Login (`email`, `password`)

### 👤 User Profile (`/api/users`)
* `GET /api/users/profile` — Get authenticated profile
* `PUT /api/users/profile` — Update user profile
* `GET /api/users/notifications` — Get user notifications

### 🎟 Ticket Management (`/api/tickets`)
* `POST /api/tickets` — Create new ticket (Text, Voice, Image, Document) + Auto AI Processing
* `GET /api/tickets/my-tickets` — Get customer tickets
* `GET /api/tickets/:ticketId` — Get ticket details & conversation
* `POST /api/tickets/:ticketId/messages` — Send conversation message
* `GET /api/tickets/:ticketId/messages` — Get ticket message history

### 🤖 AI Engine (`/api/ai`)
* `POST /api/ai/analyze` — Run AI analysis pipeline on raw inquiry text
* `GET /api/ai/ticket/:ticketId` — Retrieve AI Analysis record for a ticket

### 🛡 Admin Command Center (`/api/admin`)
* `GET /api/admin/tickets` — Get all tickets with filtering & pagination
* `GET /api/admin/customers` — Get all registered customers
* `PATCH /api/admin/tickets/:ticketId/status` — Update ticket status/assigned agent
* `GET /api/admin/ai-overview` — Get AI telemetry & accuracy overview

### 📊 Analytics & Telemetry (`/api/analytics`)
* `GET /api/analytics/dashboard` — Resolution metrics & KPI summary
* `GET /api/analytics/sentiment` — Real-time sentiment distribution
* `GET /api/analytics/churn` — Predictive churn risk distribution & high-risk tickets
