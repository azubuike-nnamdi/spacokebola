# Supabase Setup Guide

## 🚀 **Step 1: Create Supabase Project**

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   -  **Name**: `spacokebola`
   -  **Database Password**: (create a strong password)
   -  **Region**: Choose closest to you
6. Click "Create new project"

## 🔑 **Step 2: Get Your Credentials**

Once your project is created:

1. Go to **Settings > API**
2. Copy your **Project URL** and **service_role key** (NOT the anon key)
3. Create `.env.local` file in your project root:

```bash
# .env.local
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

**Important**: Use the `service_role` key, not the `anon` key for server-side operations!

## 🗄️ **Step 3: Create Database Table**

In your Supabase dashboard:

1. Go to **SQL Editor**
2. Run this SQL to create the table:

```sql
-- Create the allowed_emails table
CREATE TABLE allowed_emails (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert your email
INSERT INTO allowed_emails (email) VALUES ('blessedmarcel1@gmail.com');

-- Enable Row Level Security (RLS)
ALTER TABLE allowed_emails ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for now)
CREATE POLICY "Allow all operations" ON allowed_emails FOR ALL USING (true);
```

## 📦 **Step 4: Install Dependencies**

```bash
pnpm add @supabase/supabase-js
```

## ✅ **Step 5: Test the Setup**

1. Start your development server:

   ```bash
   pnpm dev
   ```

2. Try to sign in with your email
3. Check the Supabase dashboard to see if data is being created

## 🔍 **Step 6: View Your Data**

In your Supabase dashboard:

1. Go to **Table Editor**
2. Click on **allowed_emails** table
3. You can now view, edit, and manage your allowed emails directly in the web interface!

## 🛠️ **Troubleshooting**

### Common Issues

1. **"Invalid API key" error**:

   -  Check your `.env.local` file
   -  Make sure you copied the **service_role** key, not the anon key
   -  Ensure the key starts with `eyJ...`

2. **"Table doesn't exist" error**:

   -  Run the SQL commands in Step 3
   -  Check the SQL Editor for any errors

3. **"RLS policy" error**:

   -  Make sure you created the RLS policy in Step 3

4. **"409 Email already exists" but no data in table**:
   -  Check your Supabase connection
   -  Verify environment variables are correct
   -  Check server logs for database errors

### Environment Variables Format

```bash
# .env.local
SUPABASE_URL=https://abcdefghijklmnop.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM2NTQ2NDAwLCJleHAiOjE5NTIxMjI0MDB9.example
```

## 🔒 **Security Benefits**

✅ **Server-side only** - Supabase credentials never exposed to client
✅ **Service role key** - Full database access for server operations
✅ **Environment variables** - Secure credential management
✅ **No client-side database calls** - All operations go through API routes

## 🎯 **Benefits of Supabase**

✅ **Web Interface** - View and edit data directly in the dashboard
✅ **Real-time** - Changes sync instantly
✅ **Scalable** - Handles thousands of users
✅ **Secure** - Built-in authentication and authorization
✅ **Free Tier** - Generous free plan for small projects
