# Clerk Removal Plan

## Step-by-Step Guide to Remove All Clerk Dependencies

---

## 📋 Files That Need to Be Modified/Removed

### Files Using Clerk (7 files):

1. ✅ `app/layout.tsx` - ClerkProvider wrapper
2. ✅ `app/(admin)/dashboard/layout.tsx` - SignedIn, SignedOut, SignIn components
3. ✅ `app/auth/login/page.tsx` - SignIn component
4. ✅ `components/admin/nav-user.tsx` - useClerk, useUser hooks
5. ✅ `lib/auth-helpers.ts` - auth, currentUser from Clerk
6. ✅ `proxy.ts` (middleware) - clerkMiddleware
7. ✅ `app/api/auth/check-authorization/route.ts` - auth, currentUser
8. ✅ `.clerk/` directory - Clerk cache directory
9. ✅ `package.json` - @clerk/nextjs dependency
10.   ✅ `.env` - Clerk environment variables

---

## 🚀 Removal Steps

### Step 1: Remove Clerk Package

```bash
pnpm remove @clerk/nextjs
```

### Step 2: Delete Clerk Cache Directory

```bash
rm -rf .clerk
```

### Step 3: Update Environment Variables

Remove these from `.env` and `.env.local`:

```env
# Remove these lines:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

### Step 4: Update Files (see below for specific changes)

---

## 📝 File-by-File Changes

### 1. `app/layout.tsx`

**Remove**: ClerkProvider wrapper
**Keep**: ThemeProvider, TanstackProvider, fonts

### 2. `app/(admin)/dashboard/layout.tsx`

**Remove**: SignedIn, SignedOut, SignIn components
**Add**: Temporary placeholder or simple layout

### 3. `app/auth/login/page.tsx`

**Remove**: Clerk SignIn component
**Add**: Placeholder login page (we'll build custom later)

### 4. `components/admin/nav-user.tsx`

**Remove**: useClerk, useUser hooks
**Add**: Temporary mock user data

### 5. `lib/auth-helpers.ts`

**Remove**: Clerk auth imports
**Add**: Placeholder functions (will be replaced with custom auth)

### 6. `proxy.ts` (middleware)

**Remove**: Entire file (will be replaced)
**Add**: Basic middleware.ts file

### 7. `app/api/auth/check-authorization/route.ts`

**Remove**: Clerk imports
**Add**: Placeholder response

---

## ⚠️ Important Notes

After removal:

- ❌ Authentication will NOT work
- ❌ Dashboard will be accessible to everyone (temporarily)
- ❌ Login page will show placeholder
- ✅ App will compile and run
- ✅ Public pages will work fine
- ✅ Ready for custom auth implementation

---

## 📦 What Happens Next

After Clerk removal, you'll need to:

1. Set up PostgreSQL database
2. Install Prisma
3. Implement custom authentication
4. Build login UI
5. Add session management

Follow `QUICK_START_CHECKLIST.md` after this removal.

---

**Status**: Ready to execute
**Risk**: Low (can always reinstall Clerk if needed)
**Execution Time**: ~5 minutes
