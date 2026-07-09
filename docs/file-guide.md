# File Guide

## Root

- `package.json`: Monorepo scripts for running, building, testing, and installing both apps.
- `.gitignore`: Keeps dependencies, builds, logs, and secrets out of Git.
- `render.yaml`: Render backend deployment blueprint.
- `vercel.json`: Vercel frontend deployment configuration.

## Backend

- `backend/package.json`: Backend dependencies and scripts.
- `backend/.env.example`: Required backend environment variables.
- `backend/src/server.js`: Starts the server after connecting to MongoDB.
- `backend/src/app.js`: Express application, middleware, routes, Swagger, and error handling.
- `backend/src/config/db.js`: Mongoose database connection.
- `backend/src/config/swagger.js`: OpenAPI/Swagger configuration.
- `backend/src/controllers/auth.controller.js`: Register, login, refresh, logout, and current-user handlers.
- `backend/src/controllers/item.controller.js`: CRUD, stats, search, pagination, sorting, and CSV export.
- `backend/src/controllers/profile.controller.js`: Profile, password, and avatar handlers.
- `backend/src/controllers/user.controller.js`: Admin user management and activity feed.
- `backend/src/controllers/analytics.controller.js`: Dashboard aggregation endpoint.
- `backend/src/middlewares/auth.middleware.js`: JWT protection and role authorization.
- `backend/src/middlewares/validate.middleware.js`: Zod request validation wrapper.
- `backend/src/middlewares/error.middleware.js`: 404 and global error responses.
- `backend/src/middlewares/upload.middleware.js`: Multer avatar upload rules.
- `backend/src/models/user.model.js`: User schema, indexes, methods, and virtuals.
- `backend/src/models/item.model.js`: CRM record schema, indexes, references, notes, and virtuals.
- `backend/src/models/activity.model.js`: Audit log schema.
- `backend/src/routes/*.js`: REST route definitions.
- `backend/src/services/activity.service.js`: Shared activity logging helper.
- `backend/src/utils/*.js`: API error, async wrapper, and JWT helpers.
- `backend/tests/*.test.js`: Fast API smoke tests for health and validation responses.

## Frontend

- `client/package.json`: Frontend dependencies and scripts.
- `client/index.html`: Vite HTML entry.
- `client/vite.config.ts`: Vite and Vitest configuration.
- `client/tailwind.config.js`: Tailwind dark mode, theme colors, and content scanning.
- `client/src/main.tsx`: React root with router, query, theme, and auth providers.
- `client/src/app.tsx`: Route definitions and protected-route logic.
- `client/src/styles.css`: Tailwind layers and global glass/gradient styling.
- `client/src/components/ui/*.tsx`: Reusable shadcn-style UI primitives.
- `client/src/components/ItemForm.tsx`: React Hook Form + Zod record form.
- `client/src/components/StatCard.tsx`: Dashboard statistic card.
- `client/src/components/ThemeToggle.tsx`: Light/dark mode button.
- `client/src/hooks/useAuth.tsx`: Auth state, login, register, logout, and current user loading.
- `client/src/hooks/useTheme.tsx`: Theme state persisted to local storage.
- `client/src/layouts/AppLayout.tsx`: Protected app shell with sidebar and mobile navigation.
- `client/src/pages/*.tsx`: Landing, auth, dashboard, records, admin, profile, and 404 pages.
- `client/src/services/*.ts`: Axios API clients for auth, items, admin, and analytics.
- `client/src/types.ts`: Shared TypeScript entity types.
- `client/src/utils/cn.ts`: Tailwind class merging helper.
- `client/src/app.test.tsx`: Frontend smoke test.
