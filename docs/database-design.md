# Database Design

## User

Stores application identities and access control.

- `name`: Display name.
- `email`: Unique indexed login identifier.
- `passwordHash`: bcrypt password hash, excluded from default queries.
- `role`: `user` or `admin`, indexed for admin queries.
- `avatarUrl`: Optional profile image path.
- `refreshTokenHash`: Hashed refresh token for logout/revocation.
- `isActive`: Allows admin account disablement.
- `lastLoginAt`: Login activity timestamp.
- Virtual: `initials`.
- Methods: `comparePassword`, `setPassword`, `setRefreshToken`.
- Indexes: unique email, role, active status, text search on name/email.

## Item

Represents a CRM record/deal.

- `title`: Deal title.
- `company`: Account/company name.
- `value`: Pipeline value.
- `status`: `lead`, `qualified`, `proposal`, `won`, or `lost`.
- `priority`: `low`, `medium`, or `high`.
- `closeDate`: Optional expected close date.
- `owner`: Reference to `User`.
- `tags`: Searchable tags.
- `notes`: Embedded notes with author references.
- `isFavorite`: User bookmarking flag.
- `archivedAt`: Soft archive marker.
- Virtual: `isOpen`.
- Indexes: text search, owner/date, status/priority.

## Activity

Stores audit events.

- `actor`: Reference to `User`.
- `action`: Human readable action.
- `entityType`: `item`, `user`, or `auth`.
- `entityId`: Related document ID.
- `metadata`: Optional event data.
- Indexes: actor/date and entity/date.

## Aggregations

- Pipeline summary groups item count, value, won deals, and open deals.
- Admin analytics groups records by status and month.
- Pagination uses `skip`, `limit`, and `countDocuments`.
