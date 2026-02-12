# Passwordless OTP Authentication Migration Guide

## Overview

We've successfully migrated from **password-based authentication** to **OTP (One-Time Password) email authentication** for enhanced security.

## ✅ Changes Completed

### 1. Database Schema Updates (`prisma/schema.prisma`)

**Removed from User model:**

- `password` field - No more passwords stored!
- `isFirstLogin` field - Not needed with OTP

**Added to User model:**

- `emailVerifiedAt` - Timestamp when email was verified
- `otpCodes` relation - Links to OTP codes

**New Model: `OtpCode`**

```prisma
model OtpCode {
  id          String     @id @default(cuid())
  userId      String
  user        User       @relation(fields: [userId], references: [id])
  code        String     // 6-digit OTP
  purpose     OtpPurpose // LOGIN, EMAIL_VERIFICATION, INVITATION_ACCEPT
  expiresAt   DateTime   // Expires in 10 minutes
  verified    Boolean    @default(false)
  verifiedAt  DateTime?
  attempts    Int        @default(0) // Max 5 attempts
  ipAddress   String?
  createdAt   DateTime   @default(now())
}
```

**New Enum: `OtpPurpose`**

- `LOGIN` - For user login
- `EMAIL_VERIFICATION` - For verifying email addresses
- `INVITATION_ACCEPT` - For accepting invitations

### 2. New Utility Files

**`lib/auth/otp.ts`** - OTP Management

- ✅ `createOtp()` - Generate and store secure 6-digit OTP
- ✅ `verifyOtp()` - Verify OTP with timing-safe comparison
- ✅ `canRequestNewOtp()` - Rate limiting (60-second cooldown)
- ✅ `cleanupExpiredOtps()` - Cleanup utility for cron jobs

**`lib/auth/email.ts`** - Email Service

- ✅ `sendOtpEmail()` - Beautiful HTML email template for OTP
- ✅ `sendInvitationEmail()` - Invitation email template
- ✅ Placeholder for email provider integration (SendGrid, Resend, etc.)

### 3. New API Routes

**`POST /api/auth/otp/request`** - Request OTP Code

- Validates email exists
- Checks account status (active/blocked)
- Rate limiting (1 OTP per minute)
- Sends OTP email
- Security: Doesn't leak if email exists

**`POST /api/auth/otp/verify`** - Verify OTP & Login

- Validates OTP code
- Max 5 attempts per OTP
- Creates session on success
- Updates last login timestamp

### 4. Updated Files

**`prisma/seed.ts`**

- Removed bcrypt password hashing
- Removed password field from admin user
- Updated console messages for OTP-based auth

## 🔒 Security Features

1. **No Password Storage** - Eliminates password breach risk
2. **Time-Limited OTPs** - Expire after 10 minutes
3. **Attempt Limiting** - Max 5 verification attempts per OTP
4. **Rate Limiting** - 60-second cooldown between OTP requests
5. **Timing-Safe Comparison** - Prevents timing attacks
6. **IP Tracking** - Logs IP addresses for security auditing
7. **Automatic Cleanup** - Old OTPs are invalidated

## 📋 Next Steps

### Step 1: Run the Migration

⚠️ **IMPORTANT**: This will delete the `password` column from your database!

```bash
npx prisma migrate dev --name passwordless_otp_auth
```

This will:

- Drop the `password` column from `users` table
- Drop the `isFirstLogin` column
- Add `emailVerifiedAt` column
- Create `otp_codes` table
- Create `OtpPurpose` enum

### Step 2: Generate Prisma Client

```bash
npx prisma generate
```

This updates the Prisma Client with the new schema.

### Step 3: Reseed the Database

```bash
npx prisma db seed
```

Expected output:

```
✅ Created admin user: admin@spacokebola.com
📧 Email: admin@spacokebola.com
🔐 Authentication: OTP-based (passwordless)
ℹ️  Request an OTP code via email to login
```

### Step 4: Configure Email Service

The email service currently logs to console in development. For production, configure one of these providers in `lib/auth/email.ts`:

**Option A: Resend** (Recommended - Simple & Modern)

```bash
pnpm add resend
```

Update `lib/auth/email.ts`:

```typescript
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
   from: process.env.FROM_EMAIL,
   to,
   subject,
   html,
});
```

Add to `.env`:

```env
RESEND_API_KEY="re_..."
FROM_EMAIL="noreply@yourdomain.com"
```

**Option B: SendGrid**

```bash
pnpm add @sendgrid/mail
```

**Option C: AWS SES, Postmark, Mailgun**, etc.

### Step 5: Test the Authentication Flow

#### Test in Development (Console Logging)

1. **Request OTP:**

```bash
curl -X POST http://localhost:3000/api/auth/otp/request \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@spacokebola.com"}'
```

Check console for OTP code.

2. **Verify OTP:**

```bash
curl -X POST http://localhost:3000/api/auth/otp/verify \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@spacokebola.com", "code": "123456"}'
```

#### Test with Email Provider (After Step 4)

1. Request OTP via API or frontend
2. Check email inbox for OTP
3. Enter OTP to complete login

## 🔄 Authentication Flow

### User Login Flow:

```
1. User enters email address
   ↓
2. System checks if user exists
   ↓
3. If exists & active:
   - Generate 6-digit OTP
   - Store in database (expires in 10 min)
   - Send OTP via email
   ↓
4. User receives email with OTP
   ↓
5. User enters OTP code
   ↓
6. System verifies OTP:
   - Check if expired
   - Check attempts (max 5)
   - Verify code matches
   ↓
7. On success:
   - Create session
   - Set auth cookies
   - Mark OTP as verified
   - Update last login
   ↓
8. User is logged in ✅
```

### Invitation Flow (To be implemented):

```
1. Admin sends invitation to email
   ↓
2. User receives invitation email with link
   ↓
3. User clicks link
   ↓
4. System generates OTP
   ↓
5. User enters OTP
   ↓
6. Account activated ✅
```

## 🛠️ API Endpoints

### Request OTP

```
POST /api/auth/otp/request
Content-Type: application/json

{
  "email": "user@example.com"
}

Response:
{
  "success": true,
  "message": "OTP sent to your email",
  "expiresAt": "2026-02-12T14:50:00.000Z"
}
```

### Verify OTP

```
POST /api/auth/otp/verify
Content-Type: application/json

{
  "email": "user@example.com",
  "code": "123456"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "ADMIN"
  }
}
```

## 🔧 Environment Variables

No new environment variables are required for the OTP system itself. However, for email sending, you'll need:

```env
# Email Service (e.g., Resend)
RESEND_API_KEY="re_..."
FROM_EMAIL="noreply@spacokebola.com"

# Or SendGrid
SENDGRID_API_KEY="SG..."
FROM_EMAIL="noreply@spacokebola.com"
```

## 📊 Database Impact

### Before Migration:

```sql
users table:
- id, email, password, firstName, lastName, ...
- isFirstLogin, emailVerified, ...
```

### After Migration:

```sql
users table:
- id, email, firstName, lastName, ... (NO password!)
- emailVerified, emailVerifiedAt, ...

otp_codes table (NEW):
- id, userId, code, purpose, expiresAt, ...
- verified, verifiedAt, attempts, ipAddress, ...
```

## 🚨 Breaking Changes

1. **Password field removed** - All password-based auth will break
2. **Old password-based API routes obsolete** - Update frontend to use new OTP endpoints
3. **Login flow changed** - Users now login with email + OTP instead of email + password

## 📝 Frontend Integration (To Do)

Update your frontend login flow:

**Old Flow:**

```typescript
// ❌ Old password-based
const response = await fetch("/api/auth/login", {
   method: "POST",
   body: JSON.stringify({ email, password }),
});
```

**New Flow:**

```typescript
// ✅ New OTP-based

// Step 1: Request OTP
const requestOtp = await fetch("/api/auth/otp/request", {
   method: "POST",
   body: JSON.stringify({ email }),
});

// Step 2: Show OTP input form

// Step 3: Verify OTP
const verifyOtp = await fetch("/api/auth/otp/verify", {
   method: "POST",
   body: JSON.stringify({ email, code: otpCode }),
});
```

## ✅ Benefits of This Change

1. **Enhanced Security**
   - No password database breaches
   - No password reuse attacks
   - No brute force attacks on passwords

2. **Better User Experience**
   - No passwords to remember
   - No password reset flows needed
   - Simpler onboarding

3. **Compliance**
   - Email verification built-in
   - Audit trail of login attempts
   - IP tracking for security

4. **Reduced Support**
   - No "forgot password" support tickets
   - No password complexity complaints

## 🔍 Testing Checklist

After completing the migration:

- [ ] Migration runs successfully
- [ ] Prisma Client regenerated
- [ ] Database seeded with admin user
- [ ] OTP request API works
- [ ] OTP verify API works
- [ ] Email service configured (or console logging in dev)
- [ ] Rate limiting prevents spam
- [ ] OTP expiration works (10 minutes)
- [ ] Max attempts limit works (5 attempts)
- [ ] Session creation works after OTP verification
- [ ] Frontend updated to use new OTP flow

## 📞 Support

If you encounter issues:

1. Check Prisma Studio to verify schema changes
2. Review migration files in `prisma/migrations/`
3. Check console logs for email output (in development)
4. Verify environment variables are set correctly

## 🎉 Summary

You've successfully migrated to a more secure, passwordless authentication system! This eliminates the risk of password breaches and provides a better user experience.

**Next:** Run the migration and test the new authentication flow!
