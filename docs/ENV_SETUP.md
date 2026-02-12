# Environment Variables Guide

This document explains all the environment variables needed for the Spacokebola Church Management System.

## Overview

The project uses a **single `.env` file** in the root directory for all environment configuration. Node.js and Next.js automatically load this file.

> **Important**: Never commit your `.env` file to version control. It's already in `.gitignore`.

## Required Environment Variables

### Database Configuration

```env
# PostgreSQL Database Connection (Neon recommended)
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

**Where to get it:**

- **Neon.tech** (Recommended): Dashboard → Connection Details → Pooled Connection
- **Supabase**: Settings → Database → Connection String
- **Local PostgreSQL**: `postgresql://localhost:5432/spacokebola`

**Format:**

```
postgresql://[user]:[password]@[host]:[port]/[database]?sslmode=require
```

### Authentication Secrets

```env
# JWT Secret for Access Tokens (15-minute expiry)
JWT_SECRET="your-secret-min-32-chars"

# JWT Secret for Refresh Tokens (7-day expiry)
JWT_REFRESH_SECRET="another-secret-min-32-chars"

# Session Secret for Additional Security
SESSION_SECRET="session-secret-min-32-chars"
```

**How to generate:**

```bash
# Method 1: Using OpenSSL (Mac/Linux)
openssl rand -base64 32

# Method 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

> **Security**: Always use different secrets for each environment (dev, staging, prod)

### Application Configuration

```env
# Application Environment
APP_ENV="development"
# Options: development, staging, production

# Public App URL (used for redirects, emails, etc.)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
# Production: https://your-domain.com

# Request Timeout (optional, default 60000ms)
TIMEOUT=60000
```

## Complete .env Template

Create a `.env` file in your project root with this template:

```env
# =================================
# DATABASE
# =================================
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# =================================
# AUTHENTICATION & SECURITY
# =================================
JWT_SECRET="your-jwt-secret-here"
JWT_REFRESH_SECRET="your-refresh-secret-here"
SESSION_SECRET="your-session-secret-here"

# =================================
# APPLICATION
# =================================
APP_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# =================================
# OPTIONAL
# =================================
TIMEOUT=60000
```

## Environment-Specific Configurations

### Development (.env)

```env
DATABASE_URL="postgresql://user:pass@dev-host.neon.tech/spacokebola_dev?sslmode=require"
APP_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
JWT_SECRET="dev-secret-change-in-production"
JWT_REFRESH_SECRET="dev-refresh-secret-change-in-production"
SESSION_SECRET="dev-session-secret-change-in-production"
```

### Production

**Never hardcode production secrets!** Use your hosting platform's environment variable management:

#### Vercel

1. Go to Project Settings → Environment Variables
2. Add each variable with "Production" scope
3. Redeploy after changes

#### Netlify

1. Site Settings → Environment Variables
2. Add variables under "Production" context

#### Railway

1. Project → Variables
2. Add each variable

## Validation

The application validates environment variables on startup. If any required variables are missing, you'll see an error like:

```
Error: Missing required environment variable: JWT_SECRET
```

## Security Best Practices

1. **Never commit `.env` to Git**
   - Already in `.gitignore`
   - Double-check before committing

2. **Use strong, unique secrets**

   ```bash
   # Generate 3 different secrets
   openssl rand -base64 32
   openssl rand -base64 32
   openssl rand -base64 32
   ```

3. **Rotate secrets regularly**
   - Change secrets every 3-6 months
   - Immediately after security incidents
   - When team members leave

4. **Different secrets per environment**
   - Development secrets ≠ Production secrets
   - Staging should have its own secrets

5. **Database connection strings**
   - Always use SSL in production (`?sslmode=require`)
   - Use connection pooling for better performance
   - Keep credentials secure

## Troubleshooting

### "Cannot connect to database"

```bash
# Test your DATABASE_URL
npx prisma db pull

# If it fails, check:
# 1. Is the database URL correct?
# 2. Is SSL mode set? (?sslmode=require)
# 3. Is your IP whitelisted (Neon/Supabase)?
# 4. Is the database running?
```

### "JWT_SECRET is not defined"

```bash
# Check if .env exists
ls -la .env

# Check if variable is set
cat .env | grep JWT_SECRET

# If missing, generate and add it
echo "JWT_SECRET=\"$(openssl rand -base64 32)\"" >> .env
```

### "Environment variable not loading"

```bash
# Make sure .env is in project root
/Users/nnamdiazubuike/Desktop/projects/spacokebola/.env

# Not in subdirectories like:
# ❌ /prisma/.env
# ❌ /app/.env
# ❌ /lib/.env

# Restart your dev server after changes
pnpm dev
```

## Need Help?

- Check the [Quick Start Checklist](./QUICK_START_CHECKLIST.md)
- Review [README.md](../README.md)
- Contact the development team
