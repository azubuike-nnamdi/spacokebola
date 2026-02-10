# Custom Authentication System Implementation Plan

## Oke Bola Archdeaconry Church Website

---

## 📋 Executive Summary

This document outlines a comprehensive plan to replace Clerk authentication with a custom authentication system for the Oke Bola Archdeaconry church website. The custom system will manage:

1. **User Authentication** - Login, registration, password management
2. **User Onboarding** - First-time login flow with password setup
3. **Admin Operations** - Full CRUD operations on users and church data
4. **Security** - JWT tokens, password hashing, rate limiting, and session management

---

## 🎯 Current State Analysis

### What You Currently Have:

- ✅ **Next.js 16.1.4** (App Router)
- ✅ **MongoDB Atlas** connection (already configured)
- ✅ **Email allowlisting system** (in `allowed_emails` collection)
- ✅ **Rate limiting & blocking** (failed login attempts tracking)
- ✅ **Clerk** (to be removed)
- ✅ **Basic middleware** for route protection

### What You're Using Clerk For:

1. User authentication (sign in/sign up)
2. Session management
3. User object (`userId`, `email`)
4. Protected routes via middleware
5. UI components (`SignIn`, `SignedIn`, `SignedOut`)

---

## 💾 Database Architecture Recommendation

### **Recommended Stack: PostgreSQL + Prisma ORM**

**Why PostgreSQL over MongoDB for Authentication?**

| Feature               | PostgreSQL                    | MongoDB              | Recommendation                      |
| --------------------- | ----------------------------- | -------------------- | ----------------------------------- |
| **ACID Compliance**   | ✅ Strong                     | ⚠️ Limited           | Critical for user accounts          |
| **Relations**         | ✅ Native                     | ❌ Manual            | Users → Roles → Permissions         |
| **Data Integrity**    | ✅ Strong                     | ⚠️ Weak              | Essential for church records        |
| **Schema Validation** | ✅ Built-in                   | ⚠️ Application-level | Prevents data corruption            |
| **Transactions**      | ✅ Full support               | ⚠️ Limited           | Important for financial data        |
| **Learning Curve**    | ⭐⭐⭐                        | ⭐⭐⭐⭐             | Similar                             |
| **Cost**              | 💰 Free tier (Neon, Supabase) | 💰 Free tier (Atlas) | Similar                             |
| **Performance**       | ⭐⭐⭐⭐⭐                    | ⭐⭐⭐⭐             | PostgreSQL wins for structured data |

### **Why Prisma ORM?**

- ✅ Type-safe database queries
- ✅ Automatic migrations
- ✅ Great developer experience
- ✅ Works seamlessly with Next.js
- ✅ Built-in connection pooling

### **Hybrid Approach (Recommended)**

Keep MongoDB for:

- ✅ Announcements (flexible schema)
- ✅ Gallery images (unstructured)
- ✅ Event data (varying structures)

Use PostgreSQL for:

- ✅ User accounts & authentication
- ✅ User roles & permissions
- ✅ Attendance records
- ✅ Financial transactions
- ✅ Church members database

---

## 🗂️ Database Schema Design

### PostgreSQL Tables (via Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User Management
model User {
  id                String    @id @default(cuid())
  email             String    @unique
  password          String    // Hashed with bcrypt
  firstName         String?
  lastName          String?
  phoneNumber       String?

  // Authentication
  isFirstLogin      Boolean   @default(true)
  emailVerified     Boolean   @default(false)
  verificationToken String?
  resetToken        String?
  resetTokenExpiry  DateTime?

  // Authorization
  role              UserRole  @default(MEMBER)
  isActive          Boolean   @default(true)
  isBlocked         Boolean   @default(false)
  blockedReason     String?
  blockedAt         DateTime?

  // Timestamps
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  lastLoginAt       DateTime?

  // Relations
  sessions          Session[]
  loginAttempts     LoginAttempt[]
  auditLogs         AuditLog[]

  @@index([email])
  @@index([role])
  @@map("users")
}

enum UserRole {
  SUPER_ADMIN    // Full system access
  ADMIN          // Church administrator
  PASTOR         // Clergy member
  SECRETARY      // Administrative staff
  TREASURER      // Financial management
  VOLUNTEER      // Limited access
  MEMBER         // Regular member
}

// Session Management
model Session {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  token        String   @unique
  refreshToken String?  @unique
  expiresAt    DateTime
  ipAddress    String?
  userAgent    String?
  createdAt    DateTime @default(now())

  @@index([userId])
  @@index([token])
  @@map("sessions")
}

// Security: Login Attempts
model LoginAttempt {
  id          String   @id @default(cuid())
  userId      String?
  user        User?    @relation(fields: [userId], references: [id], onDelete: Cascade)
  email       String
  ipAddress   String
  userAgent   String?
  success     Boolean
  failReason  String?
  timestamp   DateTime @default(now())

  @@index([email])
  @@index([ipAddress])
  @@index([timestamp])
  @@map("login_attempts")
}

// Audit Trail
model AuditLog {
  id          String   @id @default(cuid())
  userId      String?
  user        User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  action      String   // "USER_CREATED", "USER_UPDATED", "PASSWORD_CHANGED", etc.
  entityType  String   // "User", "Announcement", "Event", etc.
  entityId    String?
  changes     Json?    // Store before/after values
  ipAddress   String?
  userAgent   String?
  timestamp   DateTime @default(now())

  @@index([userId])
  @@index([action])
  @@index([timestamp])
  @@map("audit_logs")
}

// Church-Specific: Member Management (optional)
model ChurchMember {
  id              String   @id @default(cuid())
  userId          String?  @unique
  membershipId    String   @unique // e.g., "OKB-2024-001"
  branch          String   // "ST. PAUL'S", "Emmanuel", "Hosanna"
  joinDate        DateTime
  membershipType  String   @default("REGULAR") // "REGULAR", "FOUNDING", "HONORARY"

  // Personal Info
  address         String?
  city            String   @default("Ibadan")
  state           String   @default("Oyo")
  country         String   @default("Nigeria")
  dateOfBirth     DateTime?
  gender          String?
  occupation      String?

  // Family Info
  maritalStatus   String?
  spouseName      String?
  children        Json?    // Array of children

  // Ministry Involvement
  ministries      Json?    // Array of ministries they're part of

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([branch])
  @@index([membershipId])
  @@map("church_members")
}
```

### MongoDB Collections (Keep Existing)

```javascript
// announcements
{
  _id: ObjectId,
  title: String,
  date: String,
  category: String,
  image: String,
  excerpt: String,
  content: String,
  created_at: Date,
  updated_at: Date
}

// events
{
  _id: ObjectId,
  title: String,
  date: String,
  time: String,
  location: String,
  description: String,
  image: String,
  created_at: Date,
  updated_at: Date
}

// gallery
{
  _id: ObjectId,
  title: String,
  description: String,
  images: Array,
  created_at: Date,
  updated_at: Date
}
```

---

## 🏗️ Technology Stack

### Core Technologies

```json
{
   "database": {
      "primary": "PostgreSQL 15+",
      "secondary": "MongoDB Atlas",
      "orm": "Prisma 5.x",
      "hosting": "Neon.tech (free tier) or Supabase"
   },
   "authentication": {
      "tokens": "jsonwebtoken (JWT)",
      "hashing": "bcrypt",
      "validation": "zod",
      "sessions": "PostgreSQL + Redis (optional)"
   },
   "security": {
      "rateLimit": "Custom middleware",
      "csrf": "next-csrf",
      "helmet": "Custom security headers"
   },
   "deployment": {
      "docker": "Yes (recommended)",
      "orchestration": "Docker Compose",
      "ci-cd": "GitHub Actions"
   }
}
```

### NPM Packages to Install

```bash
# Database & ORM
pnpm add prisma @prisma/client
pnpm add -D prisma

# Authentication
pnpm add bcrypt jsonwebtoken
pnpm add -D @types/bcrypt @types/jsonwebtoken

# Validation
pnpm add zod

# Security
pnpm add iron-session
pnpm add next-csrf

# Utilities
pnpm add nanoid
pnpm add date-fns
```

### Packages to Remove

```bash
# After migration is complete
pnpm remove @clerk/nextjs
```

---

## 🚀 Implementation Phases

### **Phase 1: Database Setup (Week 1)**

#### 1.1 PostgreSQL Setup

```bash
# Option A: Neon (Recommended)
# - Sign up at https://neon.tech
# - Create new project
# - Get connection string

# Option B: Supabase
# - Sign up at https://supabase.com
# - Create new project
# - Get connection string (PostgreSQL direct)

# Option C: Local with Docker
docker run --name postgres-church \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=spacokebola \
  -p 5432:5432 \
  -d postgres:15-alpine
```

#### 1.2 Prisma Setup

```bash
# Initialize Prisma
pnpm add prisma @prisma/client
npx prisma init

# This creates:
# - prisma/schema.prisma
# - .env (with DATABASE_URL)
```

#### 1.3 Environment Variables

```env
# .env.local

# PostgreSQL (Prisma)
DATABASE_URL="postgresql://user:password@host:5432/spacokebola?schema=public"

# MongoDB (Keep existing)
MONGODB_URI="mongodb+srv://..."
MONGODB_DB="spacokebola"

# JWT Secrets (generate with: openssl rand -base64 32)
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_REFRESH_SECRET="your-refresh-token-secret"

# Session
SESSION_SECRET="your-session-secret"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
APP_ENV="development"

# Email (for future implementation)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
```

#### 1.4 Database Migration

```bash
# Create database tables
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Seed database with initial admin user
npx prisma db seed
```

---

### **Phase 2: Core Authentication (Week 2)**

#### 2.1 Create Authentication Library

**File: `lib/auth/password.ts`**

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
      errors.push("Password must contain at least one uppercase letter");
   }
   if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
   }
   if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
   }

   return {
      isValid: errors.length === 0,
      errors,
   };
}
```

**File: `lib/auth/jwt.ts`**

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
   return jwt.sign(payload, JWT_SECRET, {
      expiresIn: "15m", // Short-lived
   });
}

export function generateRefreshToken(payload: JWTPayload): string {
   return jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: "7d", // Long-lived
   });
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

**File: `lib/auth/session.ts`**

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

   // Store session in database
   await prisma.session.create({
      data: {
         userId: user.id,
         token: accessToken,
         refreshToken,
         expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
   });

   // Set cookies
   const cookieStore = await cookies();
   cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15, // 15 minutes
   });

   cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
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
      // Delete session from database
      await prisma.session.deleteMany({
         where: { token },
      });
   }

   // Clear cookies
   cookieStore.delete(ACCESS_TOKEN_COOKIE);
   cookieStore.delete(REFRESH_TOKEN_COOKIE);
}
```

#### 2.2 API Routes

**File: `app/api/auth/login/route.ts`**

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

      // Find user
      const user = await prisma.user.findUnique({
         where: { email: email.toLowerCase() },
      });

      if (!user) {
         // Log failed attempt
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

      // Check if user is blocked
      if (user.isBlocked) {
         return NextResponse.json(
            { message: "Account is blocked. Please contact administrator." },
            { status: 403 },
         );
      }

      // Verify password
      const isValidPassword = await verifyPassword(password, user.password);

      if (!isValidPassword) {
         // Log failed attempt
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

      // Log successful attempt
      await prisma.loginAttempt.create({
         data: {
            userId: user.id,
            email: user.email,
            ipAddress: req.ip || "unknown",
            success: true,
         },
      });

      // Update last login
      await prisma.user.update({
         where: { id: user.id },
         data: { lastLoginAt: new Date() },
      });

      // Create session
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

**File: `app/api/auth/logout/route.ts`**

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

**File: `app/api/auth/onboarding/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { hashPassword, validatePasswordStrength } from "@/lib/auth/password";
import { z } from "zod";

const onboardingSchema = z
   .object({
      password: z.string().min(8),
      confirmPassword: z.string(),
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      phoneNumber: z.string().optional(),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
   });

export async function POST(req: NextRequest) {
   try {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
         return NextResponse.json(
            { message: "Not authenticated" },
            { status: 401 },
         );
      }

      if (!currentUser.isFirstLogin) {
         return NextResponse.json(
            { message: "Onboarding already completed" },
            { status: 400 },
         );
      }

      const body = await req.json();
      const data = onboardingSchema.parse(body);

      // Validate password strength
      const passwordValidation = validatePasswordStrength(data.password);
      if (!passwordValidation.isValid) {
         return NextResponse.json(
            { message: "Password too weak", errors: passwordValidation.errors },
            { status: 400 },
         );
      }

      // Hash password
      const hashedPassword = await hashPassword(data.password);

      // Update user
      await prisma.user.update({
         where: { id: currentUser.id },
         data: {
            password: hashedPassword,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            isFirstLogin: false,
         },
      });

      // Log audit
      await prisma.auditLog.create({
         data: {
            userId: currentUser.id,
            action: "ONBOARDING_COMPLETED",
            entityType: "User",
            entityId: currentUser.id,
         },
      });

      return NextResponse.json({
         message: "Onboarding completed successfully",
      });
   } catch (error) {
      if (error instanceof z.ZodError) {
         return NextResponse.json(
            { message: "Invalid input", errors: error.errors },
            { status: 400 },
         );
      }

      console.error("Onboarding error:", error);
      return NextResponse.json(
         { message: "Internal server error" },
         { status: 500 },
      );
   }
}
```

---

### **Phase 3: Admin Operations (Week 3)**

#### 3.1 User Management API

**File: `app/api/admin/users/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { hashPassword } from "@/lib/auth/password";
import { z } from "zod";

const createUserSchema = z.object({
   email: z.string().email(),
   firstName: z.string().min(1),
   lastName: z.string().min(1),
   role: z.enum([
      "ADMIN",
      "PASTOR",
      "SECRETARY",
      "TREASURER",
      "VOLUNTEER",
      "MEMBER",
   ]),
   phoneNumber: z.string().optional(),
});

// GET all users
export async function GET() {
   const currentUser = await getCurrentUser();

   if (!currentUser || !["SUPER_ADMIN", "ADMIN"].includes(currentUser.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
   }

   const users = await prisma.user.findMany({
      select: {
         id: true,
         email: true,
         firstName: true,
         lastName: true,
         role: true,
         isActive: true,
         isBlocked: true,
         createdAt: true,
         lastLoginAt: true,
      },
      orderBy: { createdAt: "desc" },
   });

   return NextResponse.json({ users });
}

// POST create user
export async function POST(req: NextRequest) {
   const currentUser = await getCurrentUser();

   if (!currentUser || !["SUPER_ADMIN", "ADMIN"].includes(currentUser.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
   }

   try {
      const body = await req.json();
      const data = createUserSchema.parse(body);

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
         where: { email: data.email.toLowerCase() },
      });

      if (existingUser) {
         return NextResponse.json(
            { message: "User with this email already exists" },
            { status: 400 },
         );
      }

      // Generate temporary password
      const tempPassword = Math.random().toString(36).slice(-12);
      const hashedPassword = await hashPassword(tempPassword);

      // Create user
      const user = await prisma.user.create({
         data: {
            email: data.email.toLowerCase(),
            password: hashedPassword,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
            phoneNumber: data.phoneNumber,
            isFirstLogin: true,
         },
         select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
         },
      });

      // Log audit
      await prisma.auditLog.create({
         data: {
            userId: currentUser.id,
            action: "USER_CREATED",
            entityType: "User",
            entityId: user.id,
            changes: { createdUser: user },
         },
      });

      // TODO: Send email with temporary password

      return NextResponse.json({
         message: "User created successfully",
         user,
         tempPassword, // Remove in production, send via email instead
      });
   } catch (error) {
      if (error instanceof z.ZodError) {
         return NextResponse.json(
            { message: "Invalid input", errors: error.errors },
            { status: 400 },
         );
      }

      console.error("Create user error:", error);
      return NextResponse.json(
         { message: "Internal server error" },
         { status: 500 },
      );
   }
}
```

**File: `app/api/admin/users/[id]/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";

// GET single user
export async function GET(
   req: NextRequest,
   { params }: { params: { id: string } },
) {
   const currentUser = await getCurrentUser();

   if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
   }

   const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
         id: true,
         email: true,
         firstName: true,
         lastName: true,
         phoneNumber: true,
         role: true,
         isActive: true,
         isBlocked: true,
         isFirstLogin: true,
         createdAt: true,
         updatedAt: true,
         lastLoginAt: true,
      },
   });

   if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
   }

   return NextResponse.json({ user });
}

// PATCH update user
export async function PATCH(
   req: NextRequest,
   { params }: { params: { id: string } },
) {
   const currentUser = await getCurrentUser();

   if (!currentUser || !["SUPER_ADMIN", "ADMIN"].includes(currentUser.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
   }

   try {
      const body = await req.json();
      const { firstName, lastName, phoneNumber, role, isActive } = body;

      const user = await prisma.user.update({
         where: { id: params.id },
         data: {
            firstName,
            lastName,
            phoneNumber,
            role,
            isActive,
         },
         select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            isActive: true,
         },
      });

      // Log audit
      await prisma.auditLog.create({
         data: {
            userId: currentUser.id,
            action: "USER_UPDATED",
            entityType: "User",
            entityId: user.id,
            changes: body,
         },
      });

      return NextResponse.json({
         message: "User updated successfully",
         user,
      });
   } catch (error) {
      console.error("Update user error:", error);
      return NextResponse.json(
         { message: "Internal server error" },
         { status: 500 },
      );
   }
}

// DELETE user
export async function DELETE(
   req: NextRequest,
   { params }: { params: { id: string } },
) {
   const currentUser = await getCurrentUser();

   if (!currentUser || currentUser.role !== "SUPER_ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
   }

   try {
      await prisma.user.delete({
         where: { id: params.id },
      });

      // Log audit
      await prisma.auditLog.create({
         data: {
            userId: currentUser.id,
            action: "USER_DELETED",
            entityType: "User",
            entityId: params.id,
         },
      });

      return NextResponse.json({
         message: "User deleted successfully",
      });
   } catch (error) {
      console.error("Delete user error:", error);
      return NextResponse.json(
         { message: "Internal server error" },
         { status: 500 },
      );
   }
}
```

---

### **Phase 4: Middleware & Route Protection (Week 4)**

**File: `middleware.ts`** (Replace existing proxy.ts)

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/auth/jwt";

const publicRoutes = ["/auth/login", "/auth/register", "/"];
const authRoutes = ["/auth/login", "/auth/register"];
const adminRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl;

   // Get token from cookie
   const token = request.cookies.get("auth_token")?.value;

   // Check if route is public
   const isPublicRoute = publicRoutes.some((route) =>
      pathname.startsWith(route),
   );

   const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

   const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

   // If no token and trying to access protected route
   if (!token && !isPublicRoute) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
   }

   // If has token and trying to access auth routes, redirect to dashboard
   if (token && isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
   }

   // Verify token for protected routes
   if (token && (isAdminRoute || !isPublicRoute)) {
      const payload = verifyAccessToken(token);

      if (!payload) {
         // Token invalid or expired
         const response = NextResponse.redirect(
            new URL("/auth/login", request.url),
         );
         response.cookies.delete("auth_token");
         response.cookies.delete("refresh_token");
         return response;
      }

      // Add user info to headers for downstream use
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", payload.userId);
      requestHeaders.set("x-user-email", payload.email);
      requestHeaders.set("x-user-role", payload.role);

      return NextResponse.next({
         request: {
            headers: requestHeaders,
         },
      });
   }

   return NextResponse.next();
}

export const config = {
   matcher: [
      "/((?!_next|api|favicon.ico|.*\\..*|_next/static|_next/image).*)",
      "/api/:path*",
   ],
};
```

---

### **Phase 5: Docker Setup (Week 5)**

**File: `docker-compose.yml`**

```yaml
version: "3.8"

services:
   # PostgreSQL Database
   postgres:
      image: postgres:15-alpine
      container_name: church-postgres
      environment:
         POSTGRES_USER: postgres
         POSTGRES_PASSWORD: yourpassword
         POSTGRES_DB: spacokebola
      ports:
         - "5432:5432"
      volumes:
         - postgres_data:/var/lib/postgresql/data
      healthcheck:
         test: ["CMD-SHELL", "pg_isready -U postgres"]
         interval: 10s
         timeout: 5s
         retries: 5

   # Redis (Optional - for session storage)
   redis:
      image: redis:7-alpine
      container_name: church-redis
      ports:
         - "6379:6379"
      volumes:
         - redis_data:/data
      healthcheck:
         test: ["CMD", "redis-cli", "ping"]
         interval: 10s
         timeout: 5s
         retries: 5

   # Next.js Application
   app:
      build:
         context: .
         dockerfile: Dockerfile
      container_name: church-app
      depends_on:
         postgres:
            condition: service_healthy
      environment:
         - DATABASE_URL=postgresql://postgres:yourpassword@postgres:5432/spacokebola
         - MONGODB_URI=${MONGODB_URI}
         - MONGODB_DB=spacokebola
         - JWT_SECRET=${JWT_SECRET}
         - JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}
         - NODE_ENV=production
      ports:
         - "3000:3000"
      volumes:
         - ./app:/app/app
         - ./components:/app/components
         - ./lib:/app/lib
      command: npm run start

volumes:
   postgres_data:
   redis_data:
```

**File: `Dockerfile`**

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build application
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy built application
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Expose port
EXPOSE 3000

# Run migrations and start app
CMD ["sh", "-c", "npx prisma migrate deploy && pnpm start"]
```

**File: `.dockerignore`**

```
node_modules
.next
.git
.env.local
.env*.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
```

---

## 🔒 Security Considerations

### 1. Password Security

- ✅ Use bcrypt with 12+ salt rounds
- ✅ Implement password strength validation
- ✅ Force password change on first login
- ✅ Store password reset tokens securely

### 2. Session Management

- ✅ Short-lived access tokens (15 minutes)
- ✅ Long-lived refresh tokens (7 days)
- ✅ HTTP-only cookies
- ✅ Secure flag in production
- ✅ SameSite attribute

### 3. Rate Limiting

- ✅ Max 5 login attempts per 15 minutes
- ✅ Permanent block after 5 failed attempts
- ✅ IP-based tracking
- ✅ Admin unblock functionality

### 4. Input Validation

- ✅ Zod schemas for all inputs
- ✅ Email format validation
- ✅ SQL injection prevention (Prisma ORM)
- ✅ XSS prevention

### 5. Audit Logging

- ✅ Log all authentication events
- ✅ Log all admin operations
- ✅ Store IP addresses and user agents
- ✅ Track data modifications

---

## 📊 Migration Strategy

### Step 1: Parallel Run (2 weeks)

- Keep Clerk active
- Run custom auth in parallel
- Test all features
- Compare behavior

### Step 2: User Migration

```typescript
// scripts/migrate-clerk-users.ts
async function migrateFromClerk() {
   // Export users from Clerk
   // Create users in PostgreSQL
   // Mark as isFirstLogin = true
   // Send password reset emails
}
```

### Step 3: Gradual Rollout

- Week 1: Internal testing
- Week 2: Admin users
- Week 3: All users
- Week 4: Remove Clerk

### Step 4: Cleanup

```bash
# Remove Clerk packages
pnpm remove @clerk/nextjs

# Delete Clerk components
rm -rf components/clerk

# Update documentation
```

---

## 📈 Performance Considerations

### Database Optimization

- ✅ Indexed foreign keys
- ✅ Indexed frequently queried fields
- ✅ Connection pooling (via Prisma)
- ✅ Query optimization

### Caching Strategy

- Session data: Redis (optional)
- Static pages: Next.js ISR
- API responses: Custom caching

### Monitoring

- PostgreSQL query performance
- Session count
- Failed login attempts
- API response times

---

## 🧪 Testing Strategy

### Unit Tests

```typescript
// lib/auth/password.test.ts
import {
   hashPassword,
   verifyPassword,
   validatePasswordStrength,
} from "./password";

describe("Password utilities", () => {
   it("should hash password correctly", async () => {
      const password = "Test123!";
      const hashed = await hashPassword(password);
      expect(hashed).not.toBe(password);
   });

   it("should verify password correctly", async () => {
      const password = "Test123!";
      const hashed = await hashPassword(password);
      const isValid = await verifyPassword(password, hashed);
      expect(isValid).toBe(true);
   });

   it("should validate password strength", () => {
      const result = validatePasswordStrength("weak");
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
   });
});
```

### Integration Tests

- API route tests
- Authentication flow tests
- Authorization tests
- Database transaction tests

### E2E Tests

- Login flow
- Onboarding flow
- User management
- Session persistence

---

## 📝 Documentation Checklist

- [ ] API documentation
- [ ] User guide
- [ ] Admin guide
- [ ] Development setup
- [ ] Deployment guide
- [ ] Troubleshooting guide

---

## 🚀 Deployment Checklist

- [ ] Environment variables set
- [ ] Database migrations run
- [ ] SSL certificates configured
- [ ] CORS properly configured
- [ ] Rate limiting active
- [ ] Monitoring setup
- [ ] Backup scheduled
- [ ] Email service configured

---

## 💰 Cost Estimate

### Free Tier Option

- PostgreSQL: Neon (3GB free)
- MongoDB: Atlas (512MB free)
- Hosting: Vercel (free)
- **Total: $0/month**

### Production Option

- PostgreSQL: Neon Pro ($19/month)
- MongoDB: Atlas M10 ($57/month)
- Hosting: Vercel Pro ($20/month)
- Email: SendGrid ($15/month)
- **Total: ~$111/month**

---

## 🎯 Conclusion

### Recommended Approach

1. **Database**: PostgreSQL + Prisma (for users/auth)
2. **Keep MongoDB**: For announcements, events, gallery
3. **Docker**: Yes, for consistent development and deployment
4. **Timeline**: 5-6 weeks for complete implementation

### Next Steps

1. ✅ Review this plan
2. ✅ Set up PostgreSQL (Neon recommended)
3. ✅ Implement Phase 1 (Database setup)
4. ✅ Implement Phase 2 (Authentication)
5. ✅ Test thoroughly
6. ✅ Migrate users
7. ✅ Remove Clerk

---

## 📞 Support & Resources

- PostgreSQL: https://www.postgresql.org/docs/
- Prisma: https://www.prisma.io/docs
- Next.js Auth: https://nextjs.org/docs/authentication
- JWT: https://jwt.io/
- Docker: https://docs.docker.com/

---

**Document Version**: 1.0  
**Last Updated**: February 10, 2026  
**Author**: AI Assistant  
**Project**: Oke Bola Archdeaconry Church Website
