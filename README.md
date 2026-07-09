# Stellar CRM SaaS

A complete full-stack internship project for Backend API Development, expanded into a modern SaaS CRM with React, Express, MongoDB, JWT authentication, role-based access, Swagger documentation, validation, security middleware, tests, and deployment files.

## Features

- GET, POST, PUT, DELETE REST APIs with proper status codes.
- Register, login, logout, refresh token, protected routes, and role-based access.
- MongoDB/Mongoose schemas with timestamps, indexes, validation, virtuals, methods, references, and aggregation.
- CRUD records with search, filtering, pagination, sorting, status, priority, CSV export, and analytics.
- Admin dashboard for users, records, and recent activity.
- Responsive React 19 frontend with Vite, TypeScript, Tailwind CSS, shadcn-style UI components, Framer Motion, TanStack Query, Axios, React Hook Form, Zod, Recharts, light/dark mode, skeleton states, and modern SaaS styling.
- Security: Helmet, CORS, rate limiting, bcrypt password hashing, JWT, request validation, Mongo sanitization, XSS protection, and protected routes.
- Swagger API docs, Postman collection, backend tests, frontend smoke test, Render backend config, and Vercel frontend config.

## Architecture

```mermaid
flowchart LR
  Browser[React Client] -->|Axios + JWT| API[Express API]
  API --> Auth[Auth Middleware]
  API --> Validation[Zod Validation]
  API --> Mongo[(MongoDB Atlas)]
  API --> Swagger[Swagger Docs]
  Admin[Admin Dashboard] --> API
```

## Folder Structure

```text
stellar-crm-saas/
  backend/
    src/config/          Database and Swagger config
    src/controllers/     Request handlers
    src/middlewares/     Auth, validation, upload, error handling
    src/models/          Mongoose schemas
    src/routes/          REST routes
    src/services/        Activity service
    src/utils/           Errors, async wrapper, JWT helpers
    tests/               API tests
    uploads/             Local avatar uploads
  client/
    src/components/      UI and feature components
    src/hooks/           Auth and theme providers
    src/layouts/         Protected app layout
    src/pages/           Landing, auth, dashboard, records, admin, profile
    src/services/        Axios API services
    src/utils/           Shared utilities
  docs/                  API docs, wireframes, database design, Postman
```

## Installation

```bash
npm install
cp backend/.env.example backend/.env
cp client/.env.example client/.env
npm run dev
```

Frontend runs at `http://localhost:5173`.
Backend runs at `http://localhost:5000`.
Swagger docs are available at `http://localhost:5000/api/docs`.

## Environment Variables

Backend:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stellar_crm
JWT_ACCESS_SECRET=change_this_access_secret
JWT_REFRESH_SECRET=change_this_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Client:

```env
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| GET | `/api/health` | Health check | No |
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/me` | Current user | Yes |
| GET | `/api/items` | List records | Yes |
| GET | `/api/items/:id` | Get one record | Yes |
| POST | `/api/items` | Create record | Yes |
| PUT | `/api/items/:id` | Update record | Yes |
| DELETE | `/api/items/:id` | Delete record | Yes |
| GET | `/api/items/stats` | Pipeline statistics | Yes |
| GET | `/api/items/export/csv` | CSV export | Yes |
| GET | `/api/profile` | Get profile | Yes |
| PUT | `/api/profile` | Update profile | Yes |
| PUT | `/api/profile/password` | Change password | Yes |
| POST | `/api/profile/avatar` | Upload avatar | Yes |
| GET | `/api/users` | Admin user list | Admin |
| GET | `/api/users/activity` | Admin activity feed | Admin |
| GET | `/api/analytics/dashboard` | Dashboard analytics | Yes |

## Database Design

See [docs/database-design.md](docs/database-design.md).

## Testing

```bash
npm test
```

Backend smoke tests use `supertest` and `vitest`.
Frontend test uses React Testing Library and Vitest.

## Deployment

### Backend on Render

1. Create a Render Web Service.
2. Set root directory to `backend`.
3. Use `npm install` as build command and `npm start` as start command.
4. Add MongoDB Atlas and JWT environment variables.

### Frontend on Vercel

1. Import the repository into Vercel.
2. Use the included `vercel.json`.
3. Set `VITE_API_URL` to the deployed backend API URL.

## Future Improvements

- Cloudinary upload adapter for production avatar storage.
- PDF and Excel export endpoints.
- Email-based password reset.
- Audit log filters and admin impersonation guardrails.
- E2E tests with Playwright.

## File Guide

See [docs/file-guide.md](docs/file-guide.md) for a concise explanation of every important source file.
