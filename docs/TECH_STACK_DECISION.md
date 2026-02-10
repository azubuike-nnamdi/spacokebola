# Technology Stack Decision Summary

## Church Website Authentication System

---

## 🎯 Quick Decision Matrix

| Component            | Recommended Choice                    | Why?                                              |
| -------------------- | ------------------------------------- | ------------------------------------------------- |
| **Primary Database** | PostgreSQL 15+                        | Strong ACID compliance, perfect for user accounts |
| **ORM**              | Prisma 5.x                            | Type-safe, great DX, auto-migrations              |
| **Secondary DB**     | MongoDB Atlas                         | Keep for flexible content (announcements, events) |
| **Hosting**          | Neon.tech (Free Tier)                 | Serverless PostgreSQL, free tier is generous      |
| **Password Hashing** | bcrypt                                | Industry standard, 12 rounds                      |
| **Tokens**           | JWT                                   | Stateless, scalable                               |
| **Session Storage**  | PostgreSQL                            | Simple, no Redis needed initially                 |
| **Docker**           | Yes                                   | Consistent dev/prod environments                  |
| **Email Service**    | Gmail SMTP (start) → SendGrid (scale) | Free to start, easy migration                     |

---

## 💾 Why PostgreSQL over MongoDB for Auth?

### ✅ PostgreSQL Wins For:

1. **User Authentication Data**
   - Need strong consistency
   - No tolerance for data loss
   - Complex relationships (users → sessions → roles)

2. **Financial/Member Records**
   - Church tithes/offerings
   - Membership records
   - Attendance tracking

3. **Audit Trails**
   - Must be immutable
   - Need strong guarantees

### ✅ Keep MongoDB For:

1. **Content Management**
   - Announcements (varying fields)
   - Events (flexible schemas)
   - Gallery images (unstructured metadata)

2. **Why keep it?**
   - Already set up and working
   - Perfect for CMS-style content
   - No migration needed

---

## 🏗️ Final Architecture

```
┌─────────────────────────────────────────────┐
│           Next.js Application               │
│         (Frontend + API Routes)             │
└─────────────────┬───────────────────────────┘
                  │
         ┌────────┴────────┐
         │                 │
    ┌────▼─────┐    ┌─────▼──────┐
    │PostgreSQL│    │  MongoDB   │
    │ (Prisma) │    │  (Native)  │
    └──────────┘    └────────────┘
         │                 │
    ┌────▼─────┐    ┌─────▼──────┐
    │  Users   │    │Announcements│
    │ Sessions │    │   Events    │
    │  Roles   │    │   Gallery   │
    │  Audit   │    │
    └──────────┘    └────────────┘
```

---

## 📦 Packages to Install

```bash
# Database & ORM
pnpm add prisma @prisma/client

# Authentication
pnpm add bcrypt jsonwebtoken
pnpm add -D @types/bcrypt @types/jsonwebtoken

# Validation
pnpm add zod

# Security
pnpm add iron-session next-csrf

# Utilities
pnpm add nanoid date-fns

# Development
pnpm add -D tsx
```

---

## 📦 Packages to Remove (After Migration)

```bash
pnpm remove @clerk/nextjs
```

---

## 🐳 Docker Decision: YES

### Why Use Docker?

✅ **Consistency**: Same environment in dev/staging/production  
✅ **Easy Setup**: New developers can start in minutes  
✅ **PostgreSQL**: Run locally without installing PostgreSQL  
✅ **MongoDB**: Can run both databases together  
✅ **CI/CD**: Easier deployment pipelines

### What's in the Docker Setup?

```yaml
services:
   - postgres:15-alpine # PostgreSQL database
   - redis:7-alpine # (Optional) Session cache
   - app (Next.js) # Your application
```

---

## 💰 Cost Analysis

### Option 1: Free Tier (Recommended to Start)

```
PostgreSQL: Neon.tech Free      →  $0/month
MongoDB:    Atlas M0 Free       →  $0/month
Hosting:    Vercel Free         →  $0/month
Email:      Gmail SMTP          →  $0/month
─────────────────────────────────────
TOTAL:                             $0/month
```

**Good for**: <100 users, <1GB data

### Option 2: Small Church (Most Churches)

```
PostgreSQL: Neon Pro            →  $19/month
MongoDB:    Atlas M2            →  $9/month
Hosting:    Vercel Pro          →  $20/month
Email:      SendGrid Essentials →  $15/month
─────────────────────────────────────
TOTAL:                             $63/month
```

**Good for**: <1000 users, <10GB data

### Option 3: Large Parish

```
PostgreSQL: Neon Scale          →  $69/month
MongoDB:    Atlas M10           →  $57/month
Hosting:    Vercel Pro          →  $20/month
Email:      SendGrid Pro        →  $90/month
─────────────────────────────────────
TOTAL:                             $236/month
```

**Good for**: <10,000 users, <100GB data

---

## 🚀 Recommended Hosting Providers

### PostgreSQL Options

1. **Neon.tech** ⭐ (Recommended)
   - Serverless PostgreSQL
   - Free tier: 3GB, 10M queries/month
   - Auto-scaling
   - Built-in connection pooling

2. **Supabase**
   - PostgreSQL + REST API + Auth
   - Free tier: 500MB
   - Good if you want built-in auth

3. **Railway.app**
   - Simple setup
   - $5/month minimum
   - Great for small projects

### MongoDB (Keep Current)

- **MongoDB Atlas** (Already using)
- Free tier is sufficient

### Application Hosting

- **Vercel** ⭐ (Recommended)
- **Railway.app**
- **Render.com**

---

## ⚡ Performance Expectations

### Database Performance

**PostgreSQL (Neon):**

- Query time: <10ms (indexed)
- Auth check: <5ms
- Session lookup: <3ms

**MongoDB (Atlas):**

- Content fetch: <20ms
- Image metadata: <15ms

### API Response Times

| Endpoint          | Expected Time | Max Acceptable |
| ----------------- | ------------- | -------------- |
| Login             | <100ms        | 500ms          |
| Check Auth        | <50ms         | 200ms          |
| Get Users (Admin) | <150ms        | 500ms          |
| Create User       | <200ms        | 1000ms         |

---

## 🔒 Security Stack

```
Layer 1: HTTPS (Vercel automatic)
Layer 2: HTTP-only cookies
Layer 3: JWT tokens (short-lived)
Layer 4: Bcrypt password hashing
Layer 5: Rate limiting (middleware)
Layer 6: SQL injection prevention (Prisma)
Layer 7: XSS prevention (React)
Layer 8: CSRF protection (next-csrf)
Layer 9: Audit logging (all admin actions)
```

---

## 📊 Database Design Highlights

### PostgreSQL Tables

```sql
users               -- User accounts
├── sessions        -- Login sessions
├── login_attempts  -- Failed login tracking
├── audit_logs      -- Admin action history
└── church_members  -- Member details (optional)
```

### MongoDB Collections

```javascript
announcements; // Church announcements
events; // Church events
gallery; // Photo galleries
```

---

## 🎯 Implementation Priority

### Phase 1: Foundation (Week 1) 🔴 CRITICAL

- Set up PostgreSQL (Neon)
- Install Prisma
- Create database schema
- Run migrations

### Phase 2: Core Auth (Week 2) 🔴 CRITICAL

- Password hashing
- JWT generation
- Login/logout API
- Session management

### Phase 3: Onboarding (Week 2-3) 🟡 HIGH

- First login flow
- Password setup
- Profile completion

### Phase 4: Admin (Week 3) 🟡 HIGH

- User management CRUD
- Role assignment
- User blocking

### Phase 5: Migration (Week 4) 🟢 MEDIUM

- Migrate from Clerk
- Test thoroughly
- Deploy to production

### Phase 6: Polish (Week 5) 🟢 LOW

- Docker setup
- Email notifications
- Advanced features

---

## 🧪 Testing Strategy

### Must Test

- ✅ Login with valid credentials
- ✅ Login with invalid credentials
- ✅ First-time password setup
- ✅ Password reset
- ✅ Session expiry
- ✅ Token refresh
- ✅ Rate limiting
- ✅ Admin user creation
- ✅ Role-based access

### Nice to Test

- Performance testing
- Load testing
- Security penetration testing

---

## 📚 Learning Resources

### PostgreSQL + Prisma

- Prisma Docs: https://www.prisma.io/docs
- Neon Docs: https://neon.tech/docs

### Authentication

- JWT.io: https://jwt.io/
- OWASP Auth Guide: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html

### Next.js

- Next.js Docs: https://nextjs.org/docs/app/building-your-application/authentication

---

## ❓ Common Questions

### Q: Why not use NextAuth.js?

**A**: NextAuth is great, but:

- More complex than needed
- You want to learn auth from scratch
- Custom requirements for church management
- Better control over user onboarding

### Q: Why not use Supabase Auth?

**A**: Supabase Auth is good, but:

- Another external dependency
- You want full control
- Custom onboarding flow needed
- Learning opportunity

### Q: Can I skip PostgreSQL and use only MongoDB?

**A**: You could, but:

- User accounts need strong consistency
- MongoDB transactions are complex
- Relational data (users → roles) is cleaner in SQL
- PostgreSQL is better for this use case

### Q: Do I really need Docker?

**A**: For production, yes:

- Consistency across environments
- Easier deployment
- Database included
- Industry standard

For just trying it out? No, you can:

- Use Neon (cloud PostgreSQL)
- Keep MongoDB Atlas
- Deploy to Vercel
- Skip Docker initially

---

## 🎯 Final Recommendation

### Start Simple, Scale Later

**Week 1-2: Minimum Viable Auth**

```
✅ PostgreSQL on Neon (free)
✅ MongoDB Atlas (keep current)
✅ Basic JWT auth
✅ No Docker yet
✅ Deploy to Vercel
```

**Week 3-4: Production Ready**

```
✅ Add Docker
✅ Add rate limiting
✅ Add audit logging
✅ Add email notifications
✅ Migrate from Clerk
```

**Month 2+: Scale Features**

```
✅ Add two-factor auth
✅ Add email verification
✅ Add password reset
✅ Add member portal
✅ Add mobile app
```

---

## ✅ Next Steps

1. **Review the full plan**: `CUSTOM_AUTH_IMPLEMENTATION_PLAN.md`
2. **Set up PostgreSQL**: Sign up for Neon.tech
3. **Install dependencies**: Run the pnpm commands
4. **Start Phase 1**: Database setup
5. **Test locally**: Before deploying

---

**Document Version**: 1.0  
**Last Updated**: February 10, 2026  
**Status**: Ready to implement
