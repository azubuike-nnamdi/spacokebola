# Architecture Comparison: Current vs. Proposed

## Oke Bola Archdeaconry Church Website

---

## 🏗️ Current Architecture (With Clerk)

```
┌──────────────────────────────────────────────────────────────┐
│                    Next.js Application                       │
│                    (App Router - v16.1.4)                    │
└───────────┬─────────────────────────────┬───────────────────┘
            │                             │
            │                             │
    ┌───────▼────────┐          ┌────────▼────────┐
    │  Clerk (SaaS)  │          │  MongoDB Atlas  │
    │                │          │                 │
    │ • Sign In/Up   │          │ • Announcements │
    │ • Sessions     │          │ • Events        │
    │ • User Data    │          │ • Gallery       │
    │ • Middleware   │          │ • Allowed Emails│
    └────────────────┘          └─────────────────┘
         (External)                  (Your Data)

Middleware Flow:
1. User hits /dashboard
2. Clerk checks authentication
3. Custom middleware checks allowed_emails in MongoDB
4. If both pass → Allow access
5. If either fails → Redirect

Issues:
❌ Dependency on external service (Clerk)
❌ Two-step authentication (Clerk + MongoDB)
❌ Limited control over auth flow
❌ Onboarding flow constrained by Clerk
❌ Monthly cost as users grow
```

---

## 🚀 Proposed Architecture (Custom Auth)

```
┌──────────────────────────────────────────────────────────────┐
│                    Next.js Application                       │
│                    (App Router - v16.1.4)                    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Custom Middleware                       │   │
│  │  • JWT verification                                  │   │
│  │  • Role-based access                                 │   │
│  │  • Rate limiting                                     │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────┬──────────────────────────────┬────────────────┘
             │                              │
             │                              │
    ┌────────▼────────┐          ┌─────────▼──────────┐
    │  PostgreSQL     │          │  MongoDB Atlas     │
    │  (Neon.tech)    │          │  (Keep current)    │
    │                 │          │                    │
    │ • users         │          │ • announcements    │
    │ • sessions      │          │ • events           │
    │ • login_attempts│          │ • gallery          │
    │ • audit_logs    │          │                    │
    │ • church_members│          │                    │
    └─────────────────┘          └────────────────────┘
     (Your Control)               (Your Data)

Auth Flow:
1. User submits login (email + password)
2. Check PostgreSQL for user
3. Verify bcrypt password
4. Generate JWT token
5. Create session in PostgreSQL
6. Set HTTP-only cookie
7. Return user data

Benefits:
✅ Complete control over auth
✅ Custom onboarding flow
✅ No external dependencies
✅ Zero cost (free tiers)
✅ Better data sovereignty
✅ Audit trail built-in
```

---

## 📊 Data Flow Comparison

### Current (Clerk) - Login Flow

```
User → Next.js → Clerk API → MongoDB → Response
       (1)      (2-3)         (4)       (5)

1. User enters credentials
2. Form submits to Clerk
3. Clerk validates (external)
4. Your app checks MongoDB for allowed emails
5. Response sent back

⏱️ Typical time: 300-500ms
💰 Cost: Clerk API call + MongoDB query
🔒 Control: Limited (Clerk handles most)
```

### Proposed (Custom) - Login Flow

```
User → Next.js → PostgreSQL → Response
       (1)      (2-3)          (4)

1. User enters credentials
2. API route receives request
3. Query PostgreSQL (user + password check)
4. Generate JWT, create session, return

⏱️ Typical time: 50-150ms (faster!)
💰 Cost: PostgreSQL query only
🔒 Control: Complete (you handle everything)
```

---

## 🗄️ Database Schema Comparison

### Current Setup

```javascript
// MongoDB - allowed_emails collection
{
  email: "pastor@example.com",
  created_at: Date,
  updated_at: Date
}

// MongoDB - failed_attempts collection
{
  email: String,
  ip: String,
  timestamp: Date,
  blocked: Boolean,
  permanent: Boolean
}

// Clerk - users (external, not accessible)
{
  // You don't control this data
  // Limited to Clerk's schema
}
```

### Proposed Setup

```sql
-- PostgreSQL - users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, -- bcrypt hashed
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone_number VARCHAR(20),
  role VARCHAR(50) DEFAULT 'MEMBER',
  is_first_login BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  is_blocked BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
);

-- sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  token VARCHAR(500) UNIQUE,
  expires_at TIMESTAMP,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_user_id (user_id),
  INDEX idx_token (token)
);

-- login_attempts table
CREATE TABLE login_attempts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  email VARCHAR(255),
  ip_address VARCHAR(45),
  success BOOLEAN,
  fail_reason VARCHAR(255),
  timestamp TIMESTAMP DEFAULT NOW(),
  INDEX idx_email (email),
  INDEX idx_ip (ip_address)
);

-- audit_logs table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action VARCHAR(100),
  entity_type VARCHAR(50),
  entity_id VARCHAR(100),
  changes JSONB,
  timestamp TIMESTAMP DEFAULT NOW(),
  INDEX idx_user_id (user_id),
  INDEX idx_action (action)
);
```

```javascript
// MongoDB - Keep for content
db.announcements.insertOne({
   title: "Sunday Service",
   content: "...",
   created_at: new Date(),
});

db.events.insertOne({
   title: "Christmas Carol",
   date: "2024-12-25",
   // ... flexible schema
});
```

---

## 🔄 Migration Path

### Week 1: Setup Phase

```bash
# No changes to production
# Only local development

1. Set up PostgreSQL (Neon)
2. Install Prisma
3. Create schema
4. Test locally
5. Clerk still active ✅
```

### Week 2-3: Dual Authentication

```
Production:
├── Clerk (primary) ✅
└── Custom auth (testing) 🧪

Both systems running:
- Clerk handles all users
- Custom auth tested with test accounts
- No production impact
```

### Week 4: Switch Flag

```typescript
// Feature flag approach
const USE_CUSTOM_AUTH = process.env.CUSTOM_AUTH_ENABLED === "true";

if (USE_CUSTOM_AUTH) {
   // Use custom auth
} else {
   // Use Clerk (fallback)
}
```

### Week 5: Full Migration

```
1. Export users from Clerk
2. Import to PostgreSQL
3. Send password reset emails
4. Switch flag to true
5. Monitor for 1 week
6. Remove Clerk
```

---

## 💡 Feature Comparison

| Feature                  | Current (Clerk) | Proposed (Custom)       |
| ------------------------ | --------------- | ----------------------- |
| **Sign In**              | ✅ Clerk UI     | ✅ Custom UI            |
| **Sign Up**              | ✅ Clerk UI     | ✅ Custom form          |
| **Password Reset**       | ✅ Clerk        | ✅ Custom email flow    |
| **Session Management**   | ✅ Clerk        | ✅ JWT + PostgreSQL     |
| **Email Verification**   | ✅ Clerk        | 🔄 To implement         |
| **2FA**                  | ✅ Clerk (paid) | 🔄 To implement         |
| **OAuth (Google, etc.)** | ✅ Clerk        | 🔄 To implement (later) |
| **User Roles**           | ⚠️ Limited      | ✅ Full control         |
| **Custom Onboarding**    | ⚠️ Limited      | ✅ Full control         |
| **First Login Flow**     | ❌ No           | ✅ Yes                  |
| **Audit Logging**        | ⚠️ Limited      | ✅ Built-in             |
| **Rate Limiting**        | ✅ Clerk        | ✅ Custom               |
| **Blocked Users**        | ✅ Manual       | ✅ Automatic            |
| **Member Management**    | ❌ No           | ✅ Yes                  |
| **Cost at 100 users**    | ~$25/mo         | $0                      |
| **Cost at 1000 users**   | ~$99/mo         | $19/mo                  |

---

## 🔐 Security Comparison

### Clerk Security

```
✅ Enterprise-grade security
✅ SOC 2 certified
✅ Automatic updates
✅ DDoS protection
✅ Managed infrastructure

⚠️ Dependency on external service
⚠️ Data stored externally
⚠️ Limited customization
```

### Custom Auth Security

```
✅ Full control over data
✅ No external dependencies
✅ Custom security rules
✅ Audit trails
✅ Data sovereignty

⚠️ You manage security updates
⚠️ You handle infrastructure
⚠️ Requires security knowledge

Mitigations:
✅ Use bcrypt (industry standard)
✅ JWT with short expiry
✅ HTTP-only cookies
✅ Rate limiting
✅ Prepared statements (Prisma)
✅ Input validation (Zod)
✅ Security headers
✅ Regular security audits
```

---

## 📈 Scalability Comparison

### Current (Clerk)

```
Users:        1-10,000+ (Clerk scales automatically)
Cost:         Increases with users ($25 → $99 → $500+)
Maintenance:  Low (managed by Clerk)
Control:      Low (Clerk's rules)
```

### Proposed (Custom)

```
Users:        1-10,000+ (PostgreSQL scales well)
Cost:         Fixed/predictable ($0 → $19 → $69)
Maintenance:  Medium (you manage)
Control:      Complete (your rules)

Scaling strategy:
- 0-100 users:     Neon free tier
- 100-1,000:       Neon Pro ($19/mo)
- 1,000-10,000:    Neon Scale ($69/mo)
- 10,000+:         Self-hosted or Neon custom
```

---

## 🎯 Decision Matrix

### Stay with Clerk If:

- ⏰ Need to launch immediately (no time)
- 👥 Team has no auth experience
- 💰 Budget is not a concern
- 🔒 Want enterprise security certifications
- 🤝 Need OAuth (Google, Facebook) immediately

### Switch to Custom Auth If:

- 💰 Want to minimize costs
- 🎯 Need custom onboarding flow
- 🔧 Want full control over user management
- 📊 Need custom member management
- 🌍 Want data sovereignty
- 📚 Team wants to learn auth implementation
- 🏛️ This is your recommendation ✅

---

## 🚀 Recommended Approach

```
Phase 1: Build Custom Auth (Recommended)
├── Why: Full control, no cost, custom features
├── Timeline: 4-5 weeks
└── Risk: Medium (you manage security)

Backup Plan: Keep Clerk
├── When: If custom auth takes too long
├── Cost: ~$25-99/month
└── Risk: Low (managed service)
```

---

## 📝 Final Architecture (Recommended)

```
                    ┌─────────────────┐
                    │   Next.js App   │
                    │   (Frontend)    │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Custom Middleware│
                    │  • JWT verify     │
                    │  • Rate limit     │
                    │  • Audit log      │
                    └────────┬────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
       ┌────────▼────────┐      ┌────────▼────────┐
       │   PostgreSQL    │      │   MongoDB       │
       │   (Neon.tech)   │      │   (Atlas)       │
       ├─────────────────┤      ├─────────────────┤
       │ • Users         │      │ • Announcements │
       │ • Sessions      │      │ • Events        │
       │ • Roles         │      │ • Gallery       │
       │ • Audit Logs    │      │                 │
       │ • Church Members│      │                 │
       └─────────────────┘      └─────────────────┘
        (Authentication)         (Content)
              │                       │
              └───────────┬───────────┘
                          │
                    ┌─────▼─────┐
                    │   Vercel  │
                    │  (Hosting)│
                    └───────────┘
```

---

**Decision**: Build custom authentication system with PostgreSQL + Prisma  
**Reason**: Cost-effective, full control, custom features for church management  
**Timeline**: 4-5 weeks  
**Confidence**: High ⭐⭐⭐⭐⭐
