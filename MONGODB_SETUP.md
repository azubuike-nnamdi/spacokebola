# MongoDB Setup Guide

## 🎉 Migration Complete

Your application has been successfully migrated from Supabase to MongoDB. Here's what you need to do to complete the setup:

---

## 📋 Prerequisites

1. **MongoDB Atlas Account** (Free tier available)

   -  Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   -  Sign up for a free account
   -  Create a new cluster

2. **Connection String**
   -  Get your MongoDB connection string from Atlas
   -  It looks like: `mongodb+srv://username:password@cluster.mongodb.net/`

---

## 🔧 Environment Setup

Add these variables to your `.env.local` file:

```bash
# MongoDB Configuration
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/
MONGODB_DB=spacokebola

# Remove or comment out Supabase variables (no longer needed)
# SUPABASE_URL=...
# SUPABASE_SERVICE_ROLE_KEY=...
```

---

## 🚀 Database Setup

Run the migration script to set up your database:

```bash
pnpm migrate:mongodb
```

This will:

-  ✅ Create necessary indexes for performance
-  ✅ Add initial allowed emails
-  ✅ Add a sample announcement
-  ✅ Set up the database structure

---

## 🧪 Testing Your Migration

1. **Start your development server:**

   ```bash
   pnpm dev
   ```

2. **Test the allowed emails API:**

   -  Visit `/admin/settings/allowed-emails`
   -  Try adding/removing emails

3. **Test the announcements API:**
   -  Visit `/admin/announcements`
   -  Try creating a new announcement
   -  Check if it appears on the public page

---

## 📊 What's Been Migrated

### ✅ Allowed Emails

-  **Collection:** `allowed_emails`
-  **Functions:** `getAllowedEmails`, `isEmailAllowed`, `addAllowedEmail`, `removeAllowedEmail`
-  **API:** `/api/auth/allowed-emails`

### ✅ Announcements

-  **Collection:** `announcements`
-  **Functions:** `getAnnouncements`, `createAnnouncement`, `updateAnnouncement`, `deleteAnnouncement`
-  **API:** `/api/announcements`

### ✅ Authentication

-  **Still using:** Clerk (unchanged)
-  **Integration:** MongoDB checks against allowed emails

---

## 🔍 Database Structure

### Allowed Emails Collection

```javascript
{
  _id: ObjectId,
  email: "user@example.com",
  created_at: Date,
  updated_at: Date
}
```

### Announcements Collection

```javascript
{
  _id: ObjectId,
  title: "Announcement Title",
  date: "2024-01-01",
  category: "General",
  image: "optional-image-url",
  excerpt: "Short description",
  content: "Full announcement content",
  created_at: Date,
  updated_at: Date
}
```

---

## 🛠️ Troubleshooting

### Common Issues

1. **"Missing MONGODB_URI" error**

   -  Check your `.env.local` file
   -  Ensure the connection string is correct

2. **"Connection failed" error**

   -  Verify your MongoDB Atlas cluster is running
   -  Check if your IP is whitelisted in Atlas
   -  Ensure username/password are correct

3. **"Collection not found" error**

   -  Run `pnpm migrate:mongodb` to create collections
   -  Check if the database name is correct

4. **"Authentication failed" error**
   -  Verify your Clerk setup is still working
   -  Check if your email is in the allowed_emails collection

### Debug Mode

Add this to your `.env.local` for detailed logging:

```bash
DEBUG=mongodb:*
```

---

## 🎯 Benefits of MongoDB

✅ **Flexible Schema** - Easy to add new fields
✅ **JSON-like Documents** - Natural data structure
✅ **Scalable** - Handles growth well
✅ **Great Tooling** - MongoDB Compass for data management
✅ **Free Tier** - Generous Atlas free plan

---

## 🔄 Rollback Plan

If you need to rollback to Supabase:

1. **Restore Supabase files:**

   -  `lib/supabase-server.ts`
   -  Update API routes to use Supabase again

2. **Update environment variables:**

   -  Remove MongoDB variables
   -  Add back Supabase variables

3. **Restore data:**
   -  Export data from MongoDB
   -  Import to Supabase

---

## 📞 Support

If you encounter any issues:

1. Check the MongoDB Atlas dashboard
2. Review the migration logs
3. Test individual API endpoints
4. Check browser console for errors

---

## 🎉 You're All Set

Your application is now running on MongoDB! The migration maintains all existing functionality while providing better flexibility and scalability.

**Next steps:**

-  Test all features thoroughly
-  Add more allowed emails as needed
-  Create your first announcements
-  Consider setting up MongoDB Compass for data management
