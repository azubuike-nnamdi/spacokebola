# Quick Start Checklist

## Custom Authentication Implementation

---

## 🚀 Start Here (Day 1-2)

### Step 1: Set Up PostgreSQL Database ⏱️ 15 minutes

#### Option A: Neon.tech (Recommended - Free)

```bash
# 1. Go to https://neon.tech
# 2. Sign up with your email
# 3. Create a new project: "spacokebola-church"
# 4. Copy the connection string
```

#### Option B: Supabase (Alternative - Free)

```bash
# 1. Go to https://supabase.com
# 2. Sign up with your email
# 3. Create a new project: "spacokebola-church"
# 4. Go to Settings → Database
# 5. Copy the "Connection string" (Direct connection)
```

#### Option C: Local with Docker (For testing)

```bash
docker run --name church-postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=spacokebola \
  -p 5432:5432 \
  -d postgres:15-alpine
```

### Step 2: Update Environment Variables ⏱️ 5 minutes

Create/update `.env.local`:

```env
# PostgreSQL (Add this)
DATABASE_URL="postgresql://user:password@host:5432/spacokebola?sslmode=require"

# MongoDB (Keep existing)
MONGODB_URI="mongodb+srv://ctrlaltfix-softwares:iPAbS9lhtmN2LBXz@cluster0.urec7pi.mongodb.net/"
MONGODB_DB=spacokebola

# JWT Secrets (Generate new ones)
# Run: openssl rand -base64 32
JWT_SECRET="your-generated-secret-here-min-32-chars"
JWT_REFRESH_SECRET="another-generated-secret-here-min-32-chars"

# Session
SESSION_SECRET="another-secret-for-sessions"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
APP_ENV="development"

# Clerk (Keep for now, will remove later)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cXVpY2stdG91Y2FuLTQ5LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_xTEY1kFRTWmvgPgW6V7fwkVqrXLPPnczyaqrSjzqnP
```

**Generate secrets:**

```bash
# On Mac/Linux
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 3: Install Dependencies ⏱️ 5 minutes

```bash
cd /Users/nnamdiazubuike/Desktop/projects/spacokebola

# Install Prisma
pnpm add prisma @prisma/client

# Install authentication packages
pnpm add bcrypt jsonwebtoken zod

# Install TypeScript types
pnpm add -D @types/bcrypt @types/jsonwebtoken

# Install utilities
pnpm add nanoid

# Install dev tools
pnpm add -D tsx
```

### Step 4: Initialize Prisma ⏱️ 5 minutes

```bash
# Initialize Prisma
npx prisma init

# This creates:
# ✅ prisma/schema.prisma
# ✅ .env (with DATABASE_URL)
```

### Step 5: Create Database Schema ⏱️ 10 minutes

Replace contents of `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                String    @id @default(cuid())
  email             String    @unique
  password          String
  firstName         String?
  lastName          String?
  phoneNumber       String?

  isFirstLogin      Boolean   @default(true)
  emailVerified     Boolean   @default(false)

  role              UserRole  @default(MEMBER)
  isActive          Boolean   @default(true)
  isBlocked         Boolean   @default(false)
  blockedReason     String?

  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  lastLoginAt       DateTime?

  sessions          Session[]
  loginAttempts     LoginAttempt[]
  auditLogs         AuditLog[]

  @@index([email])
  @@map("users")
}

enum UserRole {
  SUPER_ADMIN
  ADMIN
  PASTOR
  SECRETARY
  TREASURER
  VOLUNTEER
  MEMBER
}

model Session {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  token        String   @unique
  refreshToken String?  @unique
  expiresAt    DateTime
  ipAddress    String?
  createdAt    DateTime @default(now())

  @@index([userId])
  @@index([token])
  @@map("sessions")
}

model LoginAttempt {
  id          String   @id @default(cuid())
  userId      String?
  user        User?    @relation(fields: [userId], references: [id], onDelete: Cascade)
  email       String
  ipAddress   String
  success     Boolean
  failReason  String?
  timestamp   DateTime @default(now())

  @@index([email])
  @@index([ipAddress])
  @@map("login_attempts")
}

model AuditLog {
  id          String   @id @default(cuid())
  userId      String?
  user        User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  action      String
  entityType  String
  entityId    String?
  changes     Json?
  timestamp   DateTime @default(now())

  @@index([userId])
  @@index([action])
  @@map("audit_logs")
}
```

### Step 6: Run First Migration ⏱️ 5 minutes

```bash
# Create the database tables
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Check if it worked
npx prisma studio
# This opens a browser to view your database
```

---

## ✅ Day 1 Complete!

At this point you should have:

- ✅ PostgreSQL database (Neon/Supabase/Local)
- ✅ Prisma ORM installed
- ✅ Database schema created
- ✅ Tables created in database
- ✅ Prisma Client generated

**Time spent**: ~45 minutes  
**Status**: Ready for Day 2 🎉

---

## 🚀 Day 2-3: Create Core Files

### Create Prisma Client Wrapper

**`lib/prisma.ts`** (Create new file)

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
   prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### Create Authentication Utilities

**`lib/auth/password.ts`** (Create new file)

```typescript
import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
   return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
   password: string,
   hashedPassword: string,
): Promise<boolean> {
   return bcrypt.compare(password, hashedPassword);
}

export function validatePasswordStrength(password: string): {
   isValid: boolean;
   errors: string[];
} {
   const errors: string[] = [];

   if (password.length < 8) {
      errors.push("Password must be at least 8 characters");
   }
   if (!/[A-Z]/.test(password)) {
      errors.push("Must contain uppercase letter");
   }
   if (!/[a-z]/.test(password)) {
      errors.push("Must contain lowercase letter");
   }
   if (!/[0-9]/.test(password)) {
      errors.push("Must contain number");
   }

   return {
      isValid: errors.length === 0,
      errors,
   };
}
```

**`lib/auth/jwt.ts`** (Create new file)

```typescript
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export interface JWTPayload {
   userId: string;
   email: string;
   role: string;
}

export function generateAccessToken(payload: JWTPayload): string {
   return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
}

export function generateRefreshToken(payload: JWTPayload): string {
   return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

export function verifyAccessToken(token: string): JWTPayload | null {
   try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload;
   } catch {
      return null;
   }
}

export function verifyRefreshToken(token: string): JWTPayload | null {
   try {
      return jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload;
   } catch {
      return null;
   }
}
```

**`lib/auth/session.ts`** (Create new file)

```typescript
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
   generateAccessToken,
   generateRefreshToken,
   verifyAccessToken,
} from "./jwt";

const ACCESS_TOKEN_COOKIE = "auth_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

export async function createSession(userId: string) {
   const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true },
   });

   if (!user) throw new Error("User not found");

   const accessToken = generateAccessToken(user);
   const refreshToken = generateRefreshToken(user);

   await prisma.session.create({
      data: {
         userId: user.id,
         token: accessToken,
         refreshToken,
         expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
   });

   const cookieStore = await cookies();
   cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15,
   });

   cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
   });

   return { accessToken, refreshToken };
}

export async function getCurrentUser() {
   const cookieStore = await cookies();
   const token = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

   if (!token) return null;

   const payload = verifyAccessToken(token);
   if (!payload) return null;

   const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
         id: true,
         email: true,
         firstName: true,
         lastName: true,
         role: true,
         isActive: true,
         isBlocked: true,
         isFirstLogin: true,
      },
   });

   if (!user || !user.isActive || user.isBlocked) {
      return null;
   }

   return user;
}

export async function destroySession() {
   const cookieStore = await cookies();
   const token = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

   if (token) {
      await prisma.session.deleteMany({ where: { token } });
   }

   cookieStore.delete(ACCESS_TOKEN_COOKIE);
   cookieStore.delete(REFRESH_TOKEN_COOKIE);
}
```

---

## 🚀 Day 3-4: Create First API Routes

### Login API

**`app/api/auth/custom/login/route.ts`** (Create new file)

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { z } from "zod";

const loginSchema = z.object({
   email: z.string().email(),
   password: z.string().min(1),
});

export async function POST(req: NextRequest) {
   try {
      const body = await req.json();
      const { email, password } = loginSchema.parse(body);

      const user = await prisma.user.findUnique({
         where: { email: email.toLowerCase() },
      });

      if (!user) {
         await prisma.loginAttempt.create({
            data: {
               email: email.toLowerCase(),
               ipAddress: req.ip || "unknown",
               success: false,
               failReason: "User not found",
            },
         });

         return NextResponse.json(
            { message: "Invalid email or password" },
            { status: 401 },
         );
      }

      if (user.isBlocked) {
         return NextResponse.json(
            { message: "Account blocked. Contact administrator." },
            { status: 403 },
         );
      }

      const isValidPassword = await verifyPassword(password, user.password);

      if (!isValidPassword) {
         await prisma.loginAttempt.create({
            data: {
               userId: user.id,
               email: user.email,
               ipAddress: req.ip || "unknown",
               success: false,
               failReason: "Invalid password",
            },
         });

         return NextResponse.json(
            { message: "Invalid email or password" },
            { status: 401 },
         );
      }

      await prisma.loginAttempt.create({
         data: {
            userId: user.id,
            email: user.email,
            ipAddress: req.ip || "unknown",
            success: true,
         },
      });

      await prisma.user.update({
         where: { id: user.id },
         data: { lastLoginAt: new Date() },
      });

      await createSession(user.id);

      return NextResponse.json({
         message: "Login successful",
         isFirstLogin: user.isFirstLogin,
         user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
         },
      });
   } catch (error) {
      if (error instanceof z.ZodError) {
         return NextResponse.json(
            { message: "Invalid input", errors: error.errors },
            { status: 400 },
         );
      }

      console.error("Login error:", error);
      return NextResponse.json(
         { message: "Internal server error" },
         { status: 500 },
      );
   }
}
```

### Logout API

**`app/api/auth/custom/logout/route.ts`** (Create new file)

```typescript
import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth/session";

export async function POST() {
   try {
      await destroySession();
      return NextResponse.json({ message: "Logged out successfully" });
   } catch (error) {
      console.error("Logout error:", error);
      return NextResponse.json(
         { message: "Error logging out" },
         { status: 500 },
      );
   }
}
```

### Current User API

**`app/api/auth/custom/me/route.ts`** (Create new file)

```typescript
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET() {
   try {
      const user = await getCurrentUser();

      if (!user) {
         return NextResponse.json(
            { message: "Not authenticated" },
            { status: 401 },
         );
      }

      return NextResponse.json({ user });
   } catch (error) {
      console.error("Get user error:", error);
      return NextResponse.json(
         { message: "Internal server error" },
         { status: 500 },
      );
   }
}
```

---

## 🚀 Day 4-5: Create First Admin User

### Create Seed Script

**`prisma/seed.ts`** (Create new file)

```typescript
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
   // Create super admin
   const hashedPassword = await bcrypt.hash("Admin123!", 12);

   const admin = await prisma.user.upsert({
      where: { email: "admin@spacokebola.com" },
      update: {},
      create: {
         email: "admin@spacokebola.com",
         password: hashedPassword,
         firstName: "Super",
         lastName: "Admin",
         role: "SUPER_ADMIN",
         isFirstLogin: false,
         emailVerified: true,
         isActive: true,
      },
   });

   console.log("✅ Created admin user:", admin.email);
   console.log("📧 Email: admin@spacokebola.com");
   console.log("🔑 Password: Admin123!");
   console.log("⚠️  Change this password after first login!");
}

main()
   .catch((e) => {
      console.error(e);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
```

Update `package.json`:

```json
{
   "prisma": {
      "seed": "tsx prisma/seed.ts"
   }
}
```

Run the seed:

```bash
npx prisma db seed
```

---

## ✅ Testing Your Setup

### Test 1: Check Database Connection

```bash
npx prisma studio
# Should open browser showing your tables
```

### Test 2: Test Login API

```bash
# Start your dev server
pnpm dev

# In another terminal, test login:
curl -X POST http://localhost:3000/api/auth/custom/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@spacokebola.com", "password": "Admin123!"}'

# Expected response:
# {
#   "message": "Login successful",
#   "isFirstLogin": false,
#   "user": {
#     "id": "...",
#     "email": "admin@spacokebola.com",
#     ...
#   }
# }
```

### Test 3: Check Session

```bash
# After logging in via browser, check current user:
curl http://localhost:3000/api/auth/custom/me \
  -H "Cookie: auth_token=YOUR_TOKEN_FROM_LOGIN"
```

---

## 📦 Quick Commands Reference

```bash
# Database migrations
npx prisma migrate dev --name description    # Create migration
npx prisma migrate deploy                    # Run migrations (production)
npx prisma db push                            # Quick sync (development)

# Prisma Client
npx prisma generate                           # Regenerate client after schema changes

# Database management
npx prisma studio                             # Open GUI
npx prisma db seed                            # Run seed script

# Development
pnpm dev                                      # Start dev server
pnpm build                                    # Build for production
pnpm start                                    # Start production server
```

---

## 🐛 Troubleshooting

### Issue: "prisma generate" fails

```bash
# Solution:
rm -rf node_modules/.prisma
pnpm install
npx prisma generate
```

### Issue: Database connection error

```bash
# Check DATABASE_URL in .env.local
# Make sure it includes ?sslmode=require for Neon/Supabase

# Test connection:
npx prisma db pull
```

### Issue: JWT_SECRET missing

```bash
# Generate secrets:
openssl rand -base64 32

# Add to .env.local:
JWT_SECRET="your-secret-here"
JWT_REFRESH_SECRET="another-secret-here"
```

### Issue: TypeScript errors

```bash
# Make sure Prisma Client is generated:
npx prisma generate

# Restart TypeScript server in VS Code:
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

---

## ✅ Completion Checklist

- [ ] PostgreSQL database created
- [ ] Environment variables set
- [ ] Dependencies installed
- [ ] Prisma initialized
- [ ] Database schema created
- [ ] Migrations run
- [ ] Prisma Client generated
- [ ] Auth utility files created
- [ ] API routes created
- [ ] Admin user seeded
- [ ] Login tested successfully
- [ ] Session working

---

## 🎉 You're Ready!

Once all checkboxes are ✅, you have:

- Working custom authentication
- PostgreSQL database with tables
- JWT-based sessions
- Admin user created
- API routes for login/logout

**Next steps:**

1. Create login UI
2. Create onboarding flow
3. Build admin user management
4. Gradually migrate from Clerk

**Need help?** Refer to:

- `CUSTOM_AUTH_IMPLEMENTATION_PLAN.md` - Full implementation guide
- `TECH_STACK_DECISION.md` - Technology decisions
- `ARCHITECTURE_COMPARISON.md` - Architecture diagrams

**Estimated time to complete**: 4-5 days
**Difficulty**: Medium
**Support**: You got this! 🚀
