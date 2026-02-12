# Oke Bola Archdeaconry Website

This is the official website for Oke Bola Archdeaconry, headquartered at ST. PAUL'S ANGLICAN CHURCH OKE BOLA, IBADAN, OYO STATE.

## About Us

Our motto: "The Action Place of the Holy Spirit"

We are a network of Anglican churches serving the community of Ibadan, Oyo State, Nigeria. Our headquarters is located at St. Paul's Anglican Church Oke Bola, with branches spread across the city.

### Our Branches

1. Emmanuel Anglican Church
2. Hosanna Anglican Church Joyce B

## Development Stack

This project is built with modern web technologies:

- [Next.js](https://nextjs.org) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript
- [PostgreSQL](https://www.postgresql.org/) - Powerful, open-source relational database (hosted on [Neon](https://neon.tech/))
- [pnpm](https://pnpm.io) - Fast, disk space efficient package manager
- [shadcn/ui](https://ui.shadcn.com) - Re-usable components built with Radix UI and Tailwind CSS
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (v20 or higher)
- **pnpm** (v8 or higher) - Install with `npm install -g pnpm`
- **PostgreSQL Database** (We recommend [Neon](https://neon.tech/) for development and production)

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory with your configuration.

> **📝 Note**: This project uses a standard `.env` file (not `.env.local`). See our [Environment Variables Guide](docs/ENV_SETUP.md) for detailed documentation.

**Quick Setup:**

```bash
# Database (Example for Neon)
DATABASE_URL="postgresql://user:password@ep-xxx.region.neon.tech/spacokebola?sslmode=require"

# JWT Secrets (Generate with `openssl rand -base64 32`)
JWT_SECRET="your-jwt-secret"
JWT_REFRESH_SECRET="your-refresh-token-secret"

# Session
SESSION_SECRET="your-session-secret"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
APP_ENV="development"
```

**Generate secure secrets:**

```bash
# Generate 3 different secrets for JWT_SECRET, JWT_REFRESH_SECRET, and SESSION_SECRET
openssl rand -base64 32
```

For a complete environment variables reference, security best practices, and troubleshooting, see [docs/ENV_SETUP.md](docs/ENV_SETUP.md).

### 3. Setup Database (Create & Seed)

Run the following commands to generate the Prisma client, create the database schema, and seed the database with initial data (including the default admin user).

```bash
# Generate Prisma Client
npx prisma generate

# Create tables in the database
npx prisma migrate dev --name init

# Seed the database with initial data
npx prisma db seed
```

Once seeded, the default admin user is `admin@spacokebola.com`.

The system uses **OTP-based authentication** (no passwords). In development, you can check the server logs for the OTP code when logging in.

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

We welcome contributions from the community! If you'd like to contribute, please read our [Contribution Guide](contribution_guide.md) for detailed instructions on how to get started, our workflow, and coding standards.

## Checklists & Plans

- [Quick Start Checklist](docs/QUICK_START_CHECKLIST.md)
- [Environment Variables Setup Guide](docs/ENV_SETUP.md)
- [Custom Auth Implementation Plan](docs/CUSTOM_AUTH_IMPLEMENTATION_PLAN.md)
