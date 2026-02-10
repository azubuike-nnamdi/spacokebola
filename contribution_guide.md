# Contribution Guide

We welcome contributions from the community! Follow this guide to get started.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher) - [Download here](https://nodejs.org/)
- **pnpm** (v8 or higher) - Install with `npm install -g pnpm`
- **Git** - [Download here](https://git-scm.com/)

## Getting Started for Contributors

### 1. Clone the Repository

Choose one of the following approaches:

**Option A: Fork the Repository (Recommended for external contributors)**

1. Fork the repository by clicking the "Fork" button at the top of the repo page.
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

### 2. Install Dependencies

This project uses **pnpm** as the package manager (enforced via `preinstall` script):

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` or `.env.local` file in the root directory. **Contact the project maintainer** to obtain the required environment variables. Do not commit these files to version control.

Example structure:

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
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Set Up the Database

This project uses **Prisma** with **PostgreSQL** (via Neon).

1. **Generate Prisma Client**:

   ```bash
   npx prisma generate
   ```

2. **Run Migrations**:

   ```bash
   npx prisma migrate dev
   ```

3. **Seed the Database**:
   ```bash
   npx prisma db seed
   ```

To view your database in a GUI:

```bash
npx prisma studio
```

### 5. Start the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Contribution Workflow

1. **Create a new branch** for your feature or bugfix:

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes** following the project's coding standards.

3. **Test your changes** thoroughly:

   ```bash
   pnpm type-check  # Check for TypeScript errors
   pnpm lint        # Check for linting issues
   pnpm build       # Ensure the build succeeds
   ```

4. **Commit your changes**:

   ```bash
   git add .
   git commit -m "feat: add user authentication feature"
   ```

   **Commit Message Guidelines:**
   - Use conventional commits format: `type: description`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

5. **Push your changes**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**:
   - Go to the repository on GitHub
   - Click "Pull Request" → "New Pull Request"
   - Select your branch and provide a clear description of your changes

## Code Style Guidelines

- Follow the existing code style and patterns
- Use TypeScript for all new files
- Write meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused
- Avoid usage of `any` types

## Need Help?

- Check existing issues and pull requests
- Review the project documentation
- Contact the project maintainer for questions or access to environment variables
