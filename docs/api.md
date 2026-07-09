# API Documentation

Swagger is served from `/api/docs` when the backend is running.

All protected routes require:

```http
Authorization: Bearer <access_token>
```

## Example Requests

### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Harsh Kumar",
  "email": "harsh@example.com",
  "password": "Password1",
  "role": "admin"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "harsh@example.com",
  "password": "Password1"
}
```

### Create Item

```http
POST /api/items
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Atlas rollout",
  "company": "Acme Inc",
  "value": 45000,
  "status": "qualified",
  "priority": "high",
  "tags": ["cloud", "priority"]
}
```

### List Items

```http
GET /api/items?page=1&limit=10&search=atlas&status=qualified&sortBy=value&sortOrder=desc
Authorization: Bearer <access_token>
```

## Status Codes

- `200`: Success.
- `201`: Created.
- `400`: Bad request.
- `401`: Missing or invalid authentication.
- `403`: Forbidden.
- `404`: Resource not found.
- `409`: Duplicate resource conflict.
- `422`: Validation error.
- `500`: Internal server error.
