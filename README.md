## Notes Management App

A full-stack notes management application with:
- **Backend**: NestJS + TypeScript + PostgreSQL (TypeORM)
- **Frontend**: React + TypeScript + Vite

Current backend code is organized by **modules** (feature folders), with a single `note` module and shared infrastructure for database access.

---

## Backend Setup

### Prerequisites
- Node.js **v18+**
- PostgreSQL **v12+**
- npm (or pnpm/yarn)

### 1. Configure database

Create a PostgreSQL database by docker compose:

```bash
docker compose up -d
```

### 2. Environment variables

In `backend/`, create a `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=notesapp
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### 3. Install dependencies

```bash
cd backend
npm install
```

### 4. Run migrations

TypeORM CLI is wired through `shared/database/config/data-source.ts`:

```bash
cd backend
npm run migration:run
```

This will create the `notes` table defined in `1700000000001-CreateNotesTable.ts`.

### 5. Run backend (development)

```bash
cd backend
npm run start:dev
```

Backend will be available at:

- `http://localhost:3000`

### 6. Run backend tests

Unit tests are powered by Jest + ts-jest:

```bash
cd backend
npm test          # run all tests
npm run test:watch  # optional: watch mode
npm run test:cov    # optional: coverage
```

All tests should pass (use cases + controller).

---

## Frontend Setup

### 1. Environment variables (optional)

In `frontend/`, you can create `.env`:

```env
VITE_API_URL=http://localhost:3000
```

If omitted, the frontend will default to `http://localhost:3000`.

### 2. Install dependencies

```bash
cd frontend
npm install
```

### 3. Run frontend (development)

```bash
cd frontend
npm run dev
```

Frontend will be available at:

- `http://localhost:5173`

Make sure the **backend is running** at port `3000` before using the app.

---

## Current API Endpoints (No Authentication)

All note endpoints are **public** (authentication has been removed):

- `GET /notes` – list all notes
- `GET /notes/:id` – get a single note
- `POST /notes` – create a note
  - body: `{ "title": string, "content": string }`
- `PUT /notes/:id` – update a note
  - body: `{ "title"?: string, "content"?: string }`
- `DELETE /notes/:id` – delete a note

---

## Useful Commands

### Backend
- `npm run start:dev` – start Nest dev server
- `npm run build` – build for production
- `npm run migration:generate -- name=SomeName` – generate a new migration
- `npm run migration:run` – run pending migrations
- `npm run migration:revert` – revert last migration
- `npm test` – run Jest tests

### Frontend
- `npm run dev` – start Vite dev server
- `npm run build` – build for production
- `npm run preview` – preview production build
