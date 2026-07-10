# 🚀 Stellar CRM — Full-Stack SaaS CRM Platform

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**A production-ready, full-stack SaaS CRM application built with React, Express, MongoDB, and JWT authentication.**

[Getting Started](#-getting-started) · [API Docs](#-api-endpoints) · [Architecture](#-architecture) · [Deployment](#-deployment)

</div>

---

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based auth** — Access + Refresh token flow with secure httpOnly cookies
- **Role-based access control** — `user` and `admin` roles with route-level protection
- **Password security** — bcrypt hashing with salt rounds, password strength validation
- **Security middleware** — Helmet, CORS, rate limiting, request sanitization, XSS protection
- **Zod validation** — Schema-based request validation on both client & server

### 📊 Dashboard & Analytics
- **Real-time stats** — Total records, pipeline value, open deals, win count
- **Interactive charts** — Pipeline visualization by status using Recharts
- **MongoDB aggregation** — Server-side analytics powered by aggregation pipelines
- **Admin dashboard** — User management and activity feed for admin users

### 📋 CRM Records (Items/Deals)
- **Full CRUD** — Create, Read, Update, Delete with proper HTTP status codes
- **Advanced filtering** — Search, status filter, priority filter, pagination, sorting
- **CSV export** — Export records to CSV format
- **Pipeline stages** — Lead → Qualified → Proposal → Won / Lost

### 👤 User Management
- **Profile management** — Update name, email, and avatar
- **Password change** — Secure password update with current password verification
- **Avatar upload** — File upload via Multer with local/Cloudinary storage
- **Admin controls** — View all users, monitor activity feed

### 🎨 Modern UI/UX
- **React 19 + TypeScript** — Type-safe frontend with latest React features
- **Dark/Light mode** — System-aware theme toggle with persistence
- **Framer Motion** — Smooth page transitions and micro-animations
- **Responsive design** — Mobile-first layout with Tailwind CSS
- **Skeleton loading** — Graceful loading states across all pages
- **Custom UI components** — Button, Card, Input, Select, Skeleton (shadcn-inspired)

---

## 🏗 Architecture

```mermaid
flowchart TB
    subgraph Client["🖥️ React Client (Vite + TypeScript)"]
        Pages["Pages\n(Landing, Login, Register,\nDashboard, Items, Profile, Admin)"]
        Components["UI Components\n(Button, Card, Input, Select)"]
        Hooks["Hooks\n(useAuth, useTheme)"]
        Services["API Services\n(auth, items, admin)"]
    end

    subgraph Server["⚙️ Express API Server"]
        Routes["Routes\n(auth, items, profile, users, analytics)"]
        Middleware["Middleware\n(auth, validate, upload, security, error)"]
        Controllers["Controllers\n(auth, items, profile, users, analytics)"]
        Models["Mongoose Models\n(User, Item, Activity)"]
    end

    subgraph Database["🗄️ MongoDB Atlas"]
        Users[(Users)]
        Items[(Items)]
        Activities[(Activities)]
    end

    Client -->|"Axios + JWT Bearer"| Server
    Controllers --> Models
    Models --> Database
```

---

## 📁 Project Structure

```
stellar-crm-saas/
├── backend/                        # Express.js API server
│   ├── src/
│   │   ├── config/                 # Database & Swagger configuration
│   │   │   ├── db.js               # MongoDB connection setup
│   │   │   └── swagger.js          # OpenAPI 3.0 spec generation
│   │   ├── controllers/            # Route handler logic
│   │   │   ├── auth.controller.js  # Register, login, logout, refresh, me
│   │   │   ├── item.controller.js  # CRUD, search, filter, export, stats
│   │   │   ├── profile.controller.js # Profile update, password, avatar
│   │   │   ├── user.controller.js  # Admin: list users, activity feed
│   │   │   └── analytics.controller.js # Dashboard analytics aggregation
│   │   ├── middlewares/            # Express middleware
│   │   │   ├── auth.middleware.js  # JWT verification & role authorization
│   │   │   ├── validate.middleware.js # Zod schema validation
│   │   │   ├── security.middleware.js # Request sanitization (NoSQL + XSS)
│   │   │   ├── upload.middleware.js # Multer file upload config
│   │   │   └── error.middleware.js # Global error handler & 404
│   │   ├── models/                 # Mongoose schemas
│   │   │   ├── user.model.js       # User with auth methods & virtuals
│   │   │   ├── item.model.js       # CRM record (deal/lead)
│   │   │   └── activity.model.js   # Audit activity log
│   │   ├── routes/                 # REST API route definitions
│   │   ├── services/               # Business logic services
│   │   ├── utils/                  # Helpers (API errors, JWT, async handler)
│   │   ├── validators/             # Zod request schemas
│   │   ├── app.js                  # Express app setup & middleware
│   │   └── server.js               # Entry point (dotenv + DB + listen)
│   ├── tests/                      # API tests (Vitest + Supertest)
│   └── uploads/                    # Local file uploads directory
│
├── client/                         # React frontend (Vite)
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── ui/                 # Base: Button, Card, Input, Select, Skeleton
│   │   │   ├── ItemForm.tsx        # Create/edit deal form
│   │   │   ├── StatCard.tsx        # Dashboard metric card
│   │   │   └── ThemeToggle.tsx     # Dark/light mode switcher
│   │   ├── hooks/                  # React context providers
│   │   │   ├── useAuth.tsx         # Auth state, signIn, signUp, signOut
│   │   │   └── useTheme.tsx        # Theme state with localStorage persistence
│   │   ├── layouts/
│   │   │   └── AppLayout.tsx       # Sidebar navigation + header
│   │   ├── pages/                  # Route-level page components
│   │   │   ├── LandingPage.tsx     # Public landing page
│   │   │   ├── LoginPage.tsx       # Sign in form
│   │   │   ├── RegisterPage.tsx    # Sign up form (with role selection)
│   │   │   ├── DashboardPage.tsx   # Stats + pipeline chart
│   │   │   ├── ItemsPage.tsx       # Records table with CRUD
│   │   │   ├── ProfilePage.tsx     # User profile management
│   │   │   ├── AdminPage.tsx       # Admin-only user & activity view
│   │   │   └── NotFoundPage.tsx    # 404 page
│   │   ├── services/               # Axios API service layer
│   │   │   ├── api.ts              # Axios instance with interceptors
│   │   │   ├── auth.ts             # Login, register, getMe, logout
│   │   │   ├── items.ts            # CRUD, stats, export
│   │   │   └── admin.ts            # User list, analytics
│   │   ├── utils/                  # Shared utility functions
│   │   ├── types.ts                # TypeScript type definitions
│   │   ├── app.tsx                 # Router + protected routes
│   │   └── main.tsx                # App entry with providers
│   └── index.html                  # HTML entry point
│
├── docs/                           # Documentation
│   ├── api.md                      # API documentation
│   ├── database-design.md          # MongoDB schema design
│   ├── file-guide.md               # Source file explanations
│   ├── ui-wireframes.md            # UI wireframe descriptions
│   └── postman-collection.json     # Postman API collection
│
├── render.yaml                     # Render.com deployment config
├── vercel.json                     # Vercel deployment config
└── package.json                    # Monorepo root (npm workspaces)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MongoDB** — [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier) or local installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/stellar-crm-saas.git
cd stellar-crm-saas
```

### 2. Install Dependencies

```bash
npm install
```

> This installs dependencies for both `backend/` and `client/` via npm workspaces.

### 3. Configure Environment Variables

**Backend** — Create `backend/.env`:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your values:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stellar_crm
JWT_ACCESS_SECRET=your_strong_access_secret_here
JWT_REFRESH_SECRET=your_strong_refresh_secret_here
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

**Client** — Create `client/.env`:

```bash
cp client/.env.example client/.env
```

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Set Up MongoDB Atlas (Free)

1. Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a **free M0 cluster**
3. Create a database user with a username and password
4. Under **Network Access**, click **Allow Access from Anywhere**
5. Click **Connect** → **Drivers** → copy the connection string
6. Paste the URI in `backend/.env` as the `MONGODB_URI` value (replace `<password>` with your actual password)

### 5. Start Development Server

```bash
npm run dev
```

This starts both servers concurrently:

| Service  | URL                              |
| -------- | -------------------------------- |
| Frontend | http://localhost:5173             |
| Backend  | http://localhost:5000             |
| Swagger  | http://localhost:5000/api/docs    |

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint             | Description        | Auth Required |
| ------ | -------------------- | ------------------ | :-----------: |
| POST   | `/api/auth/register` | Register new user  |      ❌       |
| POST   | `/api/auth/login`    | Login user         |      ❌       |
| POST   | `/api/auth/refresh`  | Refresh JWT token  |      ❌       |
| POST   | `/api/auth/logout`   | Logout user        |      ✅       |
| GET    | `/api/auth/me`       | Get current user   |      ✅       |

### CRM Records (Items)

| Method | Endpoint               | Description           | Auth Required |
| ------ | ---------------------- | --------------------- | :-----------: |
| GET    | `/api/items`           | List records (paginated, filterable) |      ✅       |
| GET    | `/api/items/:id`       | Get single record     |      ✅       |
| POST   | `/api/items`           | Create new record     |      ✅       |
| PUT    | `/api/items/:id`       | Update record         |      ✅       |
| DELETE | `/api/items/:id`       | Delete record         |      ✅       |
| GET    | `/api/items/stats`     | Pipeline statistics   |      ✅       |
| GET    | `/api/items/export/csv`| Export records as CSV |      ✅       |

### Profile

| Method | Endpoint                | Description        | Auth Required |
| ------ | ----------------------- | ------------------ | :-----------: |
| GET    | `/api/profile`          | Get profile        |      ✅       |
| PUT    | `/api/profile`          | Update profile     |      ✅       |
| PUT    | `/api/profile/password` | Change password    |      ✅       |
| POST   | `/api/profile/avatar`   | Upload avatar      |      ✅       |

### Admin

| Method | Endpoint                    | Description          | Auth Required |
| ------ | --------------------------- | -------------------- | :-----------: |
| GET    | `/api/users`                | List all users       |    🔒 Admin   |
| GET    | `/api/users/activity`       | Activity feed        |    🔒 Admin   |
| GET    | `/api/analytics/dashboard`  | Dashboard analytics  |      ✅       |

### Health

| Method | Endpoint       | Description  | Auth Required |
| ------ | -------------- | ------------ | :-----------: |
| GET    | `/api/health`  | Health check |      ❌       |

---

## 🛡️ Security

| Feature                | Implementation                                    |
| ---------------------- | ------------------------------------------------- |
| Password Hashing       | bcrypt with 12 salt rounds                        |
| Authentication         | JWT (Access + Refresh tokens)                     |
| HTTP Headers           | Helmet.js security headers                        |
| CORS                   | Origin whitelist with credentials support         |
| Rate Limiting          | 150 requests / 15 minutes per IP                  |
| Input Validation       | Zod schemas on all endpoints                      |
| NoSQL Injection        | `$` and `.` key sanitization middleware            |
| XSS Protection         | Script tag stripping in request body               |
| Secure Cookies         | httpOnly, sameSite: strict, secure in production  |

---

## 🗄️ Database Design

### User Model

| Field            | Type     | Description                     |
| ---------------- | -------- | ------------------------------- |
| name             | String   | Full name (2-80 chars)          |
| email            | String   | Unique, lowercase, indexed      |
| passwordHash     | String   | bcrypt hash (select: false)     |
| role             | String   | `user` or `admin`               |
| avatarUrl        | String   | Profile image URL               |
| refreshTokenHash | String   | Hashed refresh token            |
| isActive         | Boolean  | Account status                  |
| lastLoginAt      | Date     | Last login timestamp            |

### Item Model (CRM Record)

| Field     | Type       | Description                                |
| --------- | ---------- | ------------------------------------------ |
| title     | String     | Deal/lead title                            |
| company   | String     | Company name                               |
| value     | Number     | Deal monetary value                        |
| status    | String     | `lead`, `qualified`, `proposal`, `won`, `lost` |
| priority  | String     | `low`, `medium`, `high`                    |
| closeDate | Date       | Expected close date                        |
| tags      | [String]   | Categorization tags                        |
| owner     | ObjectId   | Reference to User                          |

### Activity Model

| Field      | Type     | Description              |
| ---------- | -------- | ------------------------ |
| actor      | ObjectId | User who performed action|
| action     | String   | Action description       |
| entityType | String   | Entity category          |
| entityId   | ObjectId | Related entity           |
| metadata   | Mixed    | Additional context       |

> For detailed schema documentation, see [docs/database-design.md](docs/database-design.md).

---

## 🧪 Testing

```bash
# Run all tests (backend + client)
npm test

# Run backend tests only
npm test --workspace backend

# Run client tests only
npm test --workspace client
```

- **Backend**: API tests with Vitest + Supertest
- **Frontend**: Component tests with React Testing Library + Vitest

---

## 🚢 Deployment

### Backend → Render

1. Create a **Web Service** on [Render](https://render.com)
2. Set root directory to `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables: `MONGODB_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `CLIENT_URL`, `NODE_ENV=production`

> Pre-configured in [`render.yaml`](render.yaml).

### Frontend → Vercel

1. Import the repository into [Vercel](https://vercel.com)
2. The included [`vercel.json`](vercel.json) handles build config and SPA rewrites
3. Add environment variable: `VITE_API_URL` = your deployed backend URL

---

## 🧰 Tech Stack

### Backend
| Technology    | Purpose                          |
| ------------- | -------------------------------- |
| Express 5     | HTTP server & routing            |
| Mongoose 8    | MongoDB ODM                      |
| jsonwebtoken  | JWT token generation & verification |
| bcryptjs      | Password & token hashing         |
| Zod 4         | Request validation schemas       |
| Multer        | File upload handling             |
| Swagger       | Auto-generated API documentation |
| Helmet        | HTTP security headers            |
| Morgan        | HTTP request logging             |
| Nodemon       | Development auto-restart         |

### Frontend
| Technology         | Purpose                          |
| ------------------ | -------------------------------- |
| React 19           | UI library                       |
| TypeScript 5.9     | Type safety                      |
| Vite 6             | Build tool & dev server          |
| Tailwind CSS 3     | Utility-first styling            |
| TanStack Query 5   | Server state management          |
| React Hook Form 7  | Form state management            |
| Zod 4              | Client-side validation           |
| Framer Motion 12   | Animations & transitions         |
| Recharts 3         | Data visualization charts        |
| Axios              | HTTP client with interceptors    |
| Lucide React       | Icon library                     |
| React Router 6     | Client-side routing              |

---

## 🔮 Future Improvements

- [ ] Cloudinary adapter for production avatar storage
- [ ] PDF and Excel export endpoints
- [ ] Email-based password reset flow
- [ ] Audit log filters and search
- [ ] E2E tests with Playwright
- [ ] WebSocket notifications for real-time updates
- [ ] Multi-tenant workspace support

---

## 📚 Documentation

| Document | Description |
| -------- | ----------- |
| [API Docs](docs/api.md) | Detailed API documentation |
| [Database Design](docs/database-design.md) | MongoDB schema design & relationships |
| [File Guide](docs/file-guide.md) | Explanation of every source file |
| [UI Wireframes](docs/ui-wireframes.md) | UI layout wireframe descriptions |
| [Postman Collection](docs/postman-collection.json) | Import into Postman for API testing |
| [Swagger UI](http://localhost:5000/api/docs) | Interactive API explorer (when running) |

---

## 📄 License

This project is built as an internship project for learning purposes.

---

<div align="center">

**Built with harsh jethwa using React, Express & MongoDB**

</div>
