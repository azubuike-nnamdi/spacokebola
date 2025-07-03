# Database Options for Your CMS

## 🎯 **Recommended: SQLite (Already Implemented)**

**Perfect for your use case because:**

-  ✅ **Zero setup** - No server installation needed
-  ✅ **File-based** - Database is just a file in your project
-  ✅ **Built-in** - Works out of the box with Node.js
-  ✅ **Production ready** - Used by many companies
-  ✅ **Backup friendly** - Just copy the `.db` file

### How to Use SQLite (Already Set Up)

1. **Install tsx** (for running TypeScript scripts):

   ```bash
   pnpm add -D tsx
   ```

2. **Database Commands**:

   ```bash
   # List all allowed emails
   pnpm db:list

   # Add an email
   pnpm db:add user@example.com

   # Remove an email
   pnpm db:remove user@example.com

   # Reset to defaults
   pnpm db:reset
   ```

3. **Database File**: `data/cms.db` (automatically created)

---

## 🚀 **Alternative Database Options**

### Option 2: PostgreSQL (For Larger Teams)

**Best for:**

-  Teams with 10+ users
-  Need for complex queries
-  Multiple applications sharing data

**Setup:**

```bash
# Install Prisma ORM
pnpm add @prisma/client prisma

# Initialize Prisma
npx prisma init

# Create schema
npx prisma db push
```

**Schema Example:**

```prisma
model AllowedEmail {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Option 3: MongoDB (For Flexibility)

**Best for:**

-  Rapid prototyping
-  Complex data structures
-  JSON-like data

**Setup:**

```bash
pnpm add mongodb
```

**Usage Example:**

```typescript
import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("cms");
const collection = db.collection("allowedEmails");
```

### Option 4: Supabase (Cloud Database)

**Best for:**

-  No server management
-  Built-in authentication
-  Real-time features

**Setup:**

```bash
pnpm add @supabase/supabase-js
```

---

## 📊 **Database Comparison**

| Database   | Setup      | Performance | Scalability | Cost        |
| ---------- | ---------- | ----------- | ----------- | ----------- |
| **SQLite** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐    | ⭐⭐⭐      | Free        |
| PostgreSQL | ⭐⭐⭐     | ⭐⭐⭐⭐⭐  | ⭐⭐⭐⭐⭐  | $5-50/month |
| MongoDB    | ⭐⭐⭐     | ⭐⭐⭐⭐    | ⭐⭐⭐⭐    | $9-50/month |
| Supabase   | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐    | ⭐⭐⭐⭐    | Free tier   |

---

## 🔄 **Migration Guide**

### From File Storage to SQLite (Already Done)

✅ **Completed automatically** - Your system now uses SQLite

### From SQLite to PostgreSQL

1. **Install Prisma**:

   ```bash
   pnpm add @prisma/client prisma
   ```

2. **Create migration script**:

   ```typescript
   // scripts/migrate-to-postgres.ts
   import { getAllowedEmails } from "../lib/database";
   import { PrismaClient } from "@prisma/client";

   const prisma = new PrismaClient();

   async function migrate() {
      const emails = getAllowedEmails();

      for (const email of emails) {
         await prisma.allowedEmail.create({
            data: { email },
         });
      }
   }
   ```

---

## 🛠 **Current Implementation**

Your CMS now uses **SQLite** with these features:

-  **Automatic setup** - Database created on first use
-  **Default data** - Pre-populated with admin emails
-  **API endpoints** - Full CRUD operations
-  **Admin interface** - Web-based management
-  **CLI tools** - Command-line management

### File Structure

```
lib/
├── database.ts          # SQLite operations
├── auth.ts             # Re-exports database functions
scripts/
└── db-manage.ts        # CLI management tool
data/
└── cms.db             # SQLite database file
```

---

## 🎯 **Recommendation**

**Stick with SQLite** for now because:

1. ✅ **No complexity** - Works immediately
2. ✅ **No costs** - Completely free
3. ✅ **Easy backup** - Just copy the `.db` file
4. ✅ **Scalable** - Can handle hundreds of users
5. ✅ **Upgradable** - Easy to migrate later

**Upgrade to PostgreSQL when:**

-  You have 50+ users
-  Need complex reporting
-  Want multiple applications sharing data
-  Need advanced features like full-text search

---

## 🚨 **Important Notes**

1. **Backup your database**: Copy `data/cms.db` regularly
2. **Don't commit database**: Add `data/cms.db` to `.gitignore`
3. **Environment variables**: Use for production database URLs
4. **Connection pooling**: Consider for high-traffic applications
