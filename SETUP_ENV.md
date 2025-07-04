# Environment Setup

## 🔧 Create .env.local

Create a `.env.local` file in your project root with:

```bash
# MongoDB Configuration
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/
MONGODB_DB=spacokebola

# Remove or comment out Supabase variables (no longer needed)
# SUPABASE_URL=...
# SUPABASE_SERVICE_ROLE_KEY=...
```

## 🚀 Get MongoDB URI

1. **MongoDB Atlas (Recommended):**

   -  Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   -  Create free account
   -  Create a cluster
   -  Click "Connect" → "Connect your application"
   -  Copy the connection string

2. **Local MongoDB:**
   ```bash
   MONGODB_URI=mongodb://localhost:27017
   ```

## ✅ Test Setup

After setting up `.env.local`, run:

```bash
pnpm migrate:mongodb
```

This should work without errors!
