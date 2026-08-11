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
| Database | Neon Postgres (`@payloadcms/db-postgres`) |
| Styling | Tailwind CSS 4 |
| Package manager | pnpm |

## Quick start

### 1. Database (Neon)

1. Create a project at [console.neon.tech](https://console.neon.tech) (or use the linked `spac-cms` project)
2. Copy the **pooled** connection string (`...-pooler...`, with `sslmode=verify-full`)
3. Use it as `DATABASE_URL` locally and in Vercel

### 2. Environment

```bash
cp .env.example .env
pnpm install
```

Set at minimum:

- `DATABASE_URL` — Neon pooled Postgres URL
- `PAYLOAD_SECRET` — long random string
- `NEXT_PUBLIC_SERVER_URL` — `http://localhost:3000` locally

### 3. Install and run

```bash
pnpm dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

### 4. Seed content (one-time)

```bash
pnpm seed
```

Creates an admin user (defaults: `admin@okebola.org` / `password`) plus sample church content.

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

```bash
pnpm seed
```

Only use this on a fresh database. You can also use **Seed your database** on the admin dashboard after logging in.

## Scripts

```bash
pnpm dev                 # development server
pnpm build               # production build
pnpm start               # serve production build
pnpm seed                # seed admin + demo church content
pnpm generate:types      # regenerate Payload TypeScript types
pnpm generate:importmap  # regenerate admin import map
pnpm lint                # eslint
pnpm type-check          # TypeScript check (tsc --noEmit)
```

## Git hooks (Husky + Commitlint)

This repo uses [Husky](https://typicode.github.io/husky/) and [Commitlint](https://commitlint.js.org/) with Conventional Commits.

| Hook | What it does |
| --- | --- |
| **pre-commit** | Runs `pnpm lint` |
| **commit-msg** | Validates conventional commit messages |
| **pre-push** | If `package.json` / `pnpm-lock.yaml` changed → `pnpm install`, then `type-check` + `build` |
| **post-merge** / **post-pull** | If deps changed → `pnpm install` |

Examples:

```bash
feat: add events listing page
fix: correct announcement draft access
docs: update content how-to
chore: bump dependencies
```

Allowed types include: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`, `perf`, `ci`, `build`, `api`, `pages`, `layout`, and others listed in `commitlint.config.ts`.

After `pnpm install`, Husky is set up automatically via the `prepare` script.

## Environment variables

See [`.env.example`](.env.example).

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Neon pooled Postgres connection string |
| `PAYLOAD_SECRET` | Yes | Encrypts auth tokens |
| `NEXT_PUBLIC_SERVER_URL` | Yes (prod) | Public site URL, no trailing slash |
| `CRON_SECRET` | Recommended | Protects cron endpoints |
| `PREVIEW_SECRET` | Recommended | Protects draft preview links |
| `SEED_ADMIN_EMAIL` | Optional | Admin email for `pnpm seed` |
| `SEED_ADMIN_PASSWORD` | Optional | Admin password for `pnpm seed` |

Generate secrets:

```bash
openssl rand -base64 32
```

## Deploying to Vercel

1. Push this repo to GitHub and import it in Vercel.
2. Use the Neon **pooled** `DATABASE_URL` (same as local).
3. In **Vercel → Settings → Environment Variables**, set:

   ```env
   DATABASE_URL=postgresql://USER:PASSWORD@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=verify-full
   PAYLOAD_SECRET=your-long-secret
   NEXT_PUBLIC_SERVER_URL=https://your-app.vercel.app
   CRON_SECRET=your-cron-secret
   PREVIEW_SECRET=your-preview-secret
   ```

4. Deploy.
5. Open `https://your-app.vercel.app/admin` and create the first admin user (or run `pnpm seed` against Neon once).

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
