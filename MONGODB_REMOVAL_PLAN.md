# MongoDB & API Cleanup Plan

## Complete Removal for Fresh Start

---

## 📋 What Will Be Removed

### API Routes (All will be deleted):

1. ✅ `app/api/announcements/route.ts` - Announcements CRUD
2. ✅ `app/api/auth/allowed-emails/route.ts` - Email allowlist management
3. ✅ `app/api/auth/check-authorization/route.ts` - Authorization check
4. ✅ `app/api/auth/failed-attempts/route.ts` - Failed login tracking
5. ✅ `app/api/auth/unblock-email/route.ts` - Email unblocking

### MongoDB-Related Files:

6. ✅ `lib/mongodb.ts` - MongoDB connection
7. ✅ `lib/auth-helpers.ts` - Uses MongoDB (will be removed)
8. ✅ `scripts/migrate-to-mongodb.ts` - Migration script
9. ✅ `types/db.d.ts` - MongoDB type definitions

### Documentation Files (MongoDB-related):

10. ✅ `MONGODB_SETUP.md` - Setup guide
11. ✅ `DATABASE_GUIDE.md` - Database guide
12. ✅ `AUTHENTICATION.md` - Old auth docs

### Package Dependencies:

13. ✅ `mongodb` package - Remove from package.json

### Environment Variables (to remove):

```env
MONGODB_URI=...
MONGODB_DB=...
```

---

## 🗑️ Files to Delete (Total: ~20 files)

### API Routes Directory:

```
app/api/
├── announcements/
│   └── route.ts          ❌ DELETE
└── auth/
    ├── allowed-emails/
    │   └── route.ts      ❌ DELETE
    ├── check-authorization/
    │   └── route.ts      ❌ DELETE
    ├── failed-attempts/
    │   └── route.ts      ❌ DELETE
    └── unblock-email/
        └── route.ts      ❌ DELETE
```

### Library Files:

```
lib/
├── mongodb.ts            ❌ DELETE
└── auth-helpers.ts       ❌ DELETE
```

### Scripts:

```
scripts/
└── migrate-to-mongodb.ts ❌ DELETE
```

### Type Definitions:

```
types/
└── db.d.ts               ❌ DELETE
```

### Documentation:

```
*.md files:
├── MONGODB_SETUP.md      ❌ DELETE
├── DATABASE_GUIDE.md     ❌ DELETE
└── AUTHENTICATION.md     ❌ DELETE (old)
```

---

## ⚠️ Impact Analysis

### What Will Stop Working:

- ❌ All announcements (create, read, update, delete)
- ❌ Event management (MongoDB-based)
- ❌ Gallery images (MongoDB-based)
- ❌ Email allowlist management
- ❌ Failed login tracking
- ❌ Authorization checks

### What Will Still Work:

- ✅ Static pages (home, about, contact)
- ✅ Next.js routing
- ✅ UI components
- ✅ Styling (Tailwind)
- ✅ Public website shell

---

## 🎯 Execution Plan

### Step 1: Remove API Routes

```bash
rm -rf app/api/announcements
rm -rf app/api/auth
```

### Step 2: Remove MongoDB Files

```bash
rm lib/mongodb.ts
rm lib/auth-helpers.ts
rm scripts/migrate-to-mongodb.ts
rm types/db.d.ts
```

### Step 3: Remove Old Documentation

```bash
rm MONGODB_SETUP.md
rm DATABASE_GUIDE.md
rm AUTHENTICATION.md
```

### Step 4: Remove MongoDB Package

```bash
pnpm remove mongodb
```

### Step 5: Clean Environment Variables

Remove from `.env`:

```env
MONGODB_URI=...
MONGODB_DB=...
```

### Step 6: Update package.json

Remove script:

```json
"migrate:mongodb": "tsx scripts/migrate-to-mongodb.ts"
```

---

## ✅ After Cleanup

Your project will be a **clean slate**:

- No MongoDB
- No API routes
- No authentication logic
- Ready for PostgreSQL + Prisma implementation

---

**Ready to Execute**: Yes
**Risk Level**: 🟢 Low (nothing in production)
**Reversible**: Yes (via git)
