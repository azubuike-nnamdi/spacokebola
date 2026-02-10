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

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Contributing

We welcome contributions from the community! Follow this guide to get started.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher) - [Download here](https://nodejs.org/)
- **pnpm** (v8 or higher) - Install with `npm install -g pnpm`
- **Git** - [Download here](https://git-scm.com/)

### Getting Started for Contributors

#### 1. Clone the Repository

Choose one of the following approaches:

**Option A: Fork the Repository (Recommended for external contributors)**

1. Fork the repository by clicking the "Fork" button at the top of this page
2. Clone your fork locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/okebola-archdeaconry.git
   cd okebola-archdeaconry
   ```

**Option B: Direct Contributor Access**

1. Request to be added as a contributor by contacting the project maintainer
2. Once added, clone the repository:

   ```bash
   git clone https://github.com/okebola-archdeaconry/okebola-archdeaconry.git
   cd okebola-archdeaconry
   ```

#### 2. Install Dependencies

This project uses **pnpm** as the package manager (enforced via `preinstall` script):

```bash
pnpm install
```

#### 3. Set Up Environment Variables

Create a `.env` or `.env.local` file in the root directory. **Contact the project maintainer** to obtain the required environment variables. Do not commit these files to version control.

Example structure (values will be provided separately):

```bash
# Database
DATABASE_URL="..."

# JWT Secrets
JWT_SECRET="..."
JWT_REFRESH_SECRET="..."

# Session
SESSION_SECRET="..."

# App Configuration
APP_ENV="development"
APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

#### 4. Set Up the Database

This project uses **Prisma** with **PostgreSQL** (via Neon). Run the following commands to set up your database:

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database if seed script exists
npx prisma db seed
```

To view your database in a GUI:

```bash
npx prisma studio
```

#### 5. Start the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Available Commands

Here are the main commands you'll use during development:

| Command                  | Description                                        |
| ------------------------ | -------------------------------------------------- |
| `pnpm dev`               | Start the development server with Turbopack        |
| `pnpm build`             | Build the application for production               |
| `pnpm start`             | Start the production server (after build)          |
| `pnpm lint`              | Run ESLint to check code quality                   |
| `pnpm type-check`        | Run TypeScript compiler to check for type errors   |
| `pnpm clean`             | Remove build artifacts and node_modules            |
| `npx prisma generate`    | Generate Prisma Client from schema                 |
| `npx prisma migrate dev` | Create and apply database migrations               |
| `npx prisma studio`      | Open Prisma Studio to view/edit database           |
| `npx prisma db push`     | Push schema changes to database without migrations |

### Contribution Workflow

1. **Create a new branch** for your feature or bugfix:

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes** following the project's coding standards

3. **Test your changes** thoroughly:

   ```bash
   pnpm type-check  # Check for TypeScript errors
   pnpm lint        # Check for linting issues
   pnpm build       # Ensure the build succeeds
   ```

4. **Commit your changes** with a descriptive message:

   ```bash
   git add .
   git commit -m "feat: add user authentication feature"
   # or
   git commit -m "fix: resolve database connection issue"
   ```

   **Commit Message Guidelines:**
   - Use conventional commits format: `type: description`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
   - Keep the first line under 72 characters
   - Add a detailed description if needed

5. **Push your changes**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**:
   - Go to the repository on GitHub
   - Click "Pull Request" → "New Pull Request"
   - Select your branch and provide a clear description of your changes
   - Wait for code review and address any feedback

### Code Style Guidelines

- Follow the existing code style and patterns
- Use TypeScript for all new files
- Write meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused
- Use proper TypeScript types (avoid `any`)

### Need Help?

- Check existing issues and pull requests
- Review the project documentation
- Contact the project maintainer for questions or access to environment variables

### Getting Environment Variables

**Important:** Environment variables contain sensitive information and are not included in the repository.

👉 **Contact the project maintainer** to receive the `.env` file or environment variable values needed for development.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
