# Mini Post Scheduler — Weekly Content Calendar

Plan, color‑tag, and schedule your social posts on a clean list or a drag‑and‑drop weekly calendar. Built with Next.js App Router, Prisma, and NextAuth (credentials).

## What you can do

- **Create, edit, duplicate, delete posts**
- **Schedule** posts (validation prevents past dates)
- **Switch views** between List and Calendar (drag posts to reschedule)
- **Filter** by platform and status
- **Mark as posted** when it’s published

## Tech stack

- **Next.js 15 (App Router)** + **React 19**
- **NextAuth (credentials only)** with **Prisma Adapter**
- **Prisma** + **SQLite** (local dev)
- **FullCalendar** (week/month view, drag & drop)
- **Tailwind CSS v4** styling

---

## Quick start

1. Install dependencies

```bash
npm install
```

1. Set environment variables

Create a `.env` file in the project root:

```bash
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="replace-with-a-long-random-string"
NEXTAUTH_URL="http://localhost:3000"
```

Tips:

- Generate a secret quickly: `openssl rand -base64 32` (or any secure generator)
- SQLite file is already in `prisma/dev.db`

1. Prepare the database

```bash
npx prisma generate
npx prisma migrate deploy
```

1. Run the app

```bash
npm run dev
```

Open `http://localhost:3000`.

---

## Using the app

1. Register a user

- Go to `/auth/register` and create an account (email + password)

1. Login

- Go to `/auth/login` to sign in

1. Create posts

- From `/dashboard`, click “Create Post”
- Required: `title`, `content`, `platform`, `scheduled date & time`
- Optional: `color` tag for visual grouping
- You can duplicate a post; the app ensures the new one is scheduled in the future

1. Manage posts

- List view: quick actions to edit, delete, duplicate, mark as posted
- Calendar view: drag a post to a new day/time to reschedule

---

## API overview

All routes require authentication unless noted.

- `POST /api/auth/register` (public): create user `{ name?, email, password }`
- `GET /api/posts`: list current user’s posts, supports `?platform=` and `?status=`
- `POST /api/posts`: create a post; rejects past `scheduledAt`
- `PATCH /api/posts/[id]`: update fields (`title`, `content`, `platform`, `scheduledAt`, `status`, `color`)
- `DELETE /api/posts/[id]`: delete a post

Data model (simplified):

```txt
Post {
  id, title, content, platform, scheduledAt, status ('scheduled'|'draft'|'posted'), color?, userId
}
```

---

## Project structure

- `src/app` — App Router pages (auth, dashboard) and API routes
- `src/components` — `PostForm`, `PostList`, `CalendarView`
- `src/lib/prisma.ts` — Prisma client
- `prisma/schema.prisma` — SQLite models

