# Oke Bola Archdeaconry CMS

Official website and CMS for **Oke Bola Archdeaconry** (St. Paul's Anglican Church, Oke Bola, Ibadan).

Motto: *The Action Place of the Holy Spirit*

Built with [Payload CMS](https://payloadcms.com) and [Next.js](https://nextjs.org) — admin panel and public site in one app.

## Features

- Public church website (home, about, branches, announcements, events, gallery, contact)
- Payload admin for content editors
- Draft / publish workflow for announcements and events
- Media uploads
- PostgreSQL database
- Tailwind CSS + shadcn/ui frontend

## Stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| CMS | Payload 3 |
| Database | PostgreSQL (`@payloadcms/db-postgres`) |
| Styling | Tailwind CSS 4 |
| Package manager | pnpm |

## Quick start

### Prerequisites

- Node.js 20+
- pnpm 9, 10, or 11
- PostgreSQL running locally (or a hosted Postgres URL)

### Setup

```bash
cp .env.example .env
pnpm install
```

Create the database if needed:

```bash
createdb spac-cms
# or: psql -c 'CREATE DATABASE "spac-cms";'
```

Fill in `.env` (at minimum):

```env
DATABASE_URL=postgresql://127.0.0.1:5432/spac-cms
PAYLOAD_SECRET=generate-a-long-random-string
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

Start the app:

```bash
pnpm dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

On first visit to `/admin`, create your admin user.

## Content collections

| Collection | Public pages | Drafts? |
| --- | --- | --- |
| **Announcements** | `/`, `/announcements`, `/announcements/[slug]` | Yes |
| **Events** | `/`, `/events` | Yes |
| **Gallery** | `/gallery` | No (live on save) |
| **Branches** | `/branches/[slug]` | No (live on save) |
| **Leadership** | `/about`, branch pages | No (live on save) |
| **Media** | Used by other collections | — |
| **Users** | Admin login | — |

### Draft vs publish

For **Announcements** and **Events**:

- **Save draft** — only admins can see it
- **Publish** — visible to everyone on the public site

See the full editor guide: [docs/HOW_TO_MANAGE_CONTENT.md](docs/HOW_TO_MANAGE_CONTENT.md)

### Seed demo content (optional)

After logging into admin, use **Seed your database** on the dashboard to load sample announcements, events, gallery, branches, and leadership.

Only use this on a fresh/local database.

## Scripts

```bash
pnpm dev                 # development server
pnpm build               # production build
pnpm start               # serve production build
pnpm generate:types      # regenerate Payload TypeScript types
pnpm generate:importmap  # regenerate admin import map
pnpm lint                # eslint
```

## Environment variables

See [`.env.example`](.env.example).

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Postgres connection string |
| `PAYLOAD_SECRET` | Yes | Encrypts auth tokens |
| `NEXT_PUBLIC_SERVER_URL` | Yes (prod) | Public site URL, no trailing slash |
| `CRON_SECRET` | Recommended | Protects cron endpoints |
| `PREVIEW_SECRET` | Recommended | Protects draft preview links |

Generate secrets:

```bash
openssl rand -base64 32
```

## Deploying to Vercel

1. Push this repo to GitHub and import it in Vercel.
2. Provision a **hosted Postgres** database (Neon, Supabase, Railway, or Vercel Postgres). Localhost will not work on Vercel.
3. In **Vercel → Settings → Environment Variables**, set:

   ```env
   DATABASE_URL=postgresql://USER:PASSWORD@HOST/DB?sslmode=require
   PAYLOAD_SECRET=your-long-secret
   NEXT_PUBLIC_SERVER_URL=https://your-app.vercel.app
   CRON_SECRET=your-cron-secret
   PREVIEW_SECRET=your-preview-secret
   ```

4. Deploy.
5. Open `https://your-app.vercel.app/admin` and create the first admin user.

> Media files are stored on disk by default (`public/media`). For production on Vercel, consider adding blob/S3 storage (e.g. `@payloadcms/storage-vercel-blob`) so uploads persist across deploys.

## Project structure

```txt
src/
├── app/
│   ├── (frontend)/     # Public website
│   └── (payload)/      # Payload admin + API
├── collections/        # Announcements, Events, Gallery, Branches, Leadership, Media, Users
├── components/site/    # Frontend UI
├── utilities/          # Content helpers (churchContent, URLs, etc.)
└── payload.config.ts
docs/
└── HOW_TO_MANAGE_CONTENT.md
```

## License

MIT
