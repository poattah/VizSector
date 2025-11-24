# ✅ Supabase Credentials Configured!

Your environment file has been created with your Supabase credentials.

## ⚠️ Important: Run Database Migration

Before you can use the authentication and cloud features, you need to set up the database tables in Supabase.

### Step 1: Open Supabase SQL Editor

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Open your project: **rfkkrpgadxxdejcpnutg**
3. Click on the **SQL Editor** icon in the left sidebar (looks like </> )

### Step 2: Run the Migration

1. Click **"New query"** button
2. Copy the **ENTIRE contents** from this file:
   ```
   supabase/migrations/20250101000000_initial_schema.sql
   ```
3. Paste it into the SQL Editor
4. Click **"Run"** (or press Ctrl+Enter / Cmd+Enter)
5. You should see a success message: "Success. No rows returned"

### Step 3: Verify Tables Were Created

1. Click on **"Table Editor"** in the left sidebar
2. You should see 3 new tables:
   - ✅ `profiles`
   - ✅ `visualizations`
   - ✅ `shared_visualizations`

If you see these tables, the setup is complete! 🎉

### Step 4: Start the Application

```bash
npm run dev
```

### Step 5: Test Authentication

1. Open the app in your browser
2. Click the **"Sign In"** button in the sidebar
3. Try creating an account or signing in with Google/GitHub

## Optional: Enable OAuth Providers

### Google OAuth (Optional)

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Find **Google** and toggle it on
3. Follow Supabase's instructions to:
   - Create a Google Cloud project
   - Enable Google+ API
   - Create OAuth credentials
   - Add the callback URL from Supabase
4. Save your Google Client ID and Secret in Supabase

### GitHub OAuth (Optional)

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Find **GitHub** and toggle it on
3. Follow Supabase's instructions to:
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Create a new OAuth App
   - Use the callback URL from Supabase
4. Save your GitHub Client ID and Secret in Supabase

## Troubleshooting

### "Supabase credentials not found" warning
- Make sure `.env` file exists in the project root
- Restart your development server: `npm run dev`

### "relation does not exist" error
- You need to run the SQL migration (Step 2 above)
- Make sure you copied the entire SQL file contents

### Authentication not working
- Check that the migration ran successfully
- Verify your Supabase URL and key are correct in `.env`
- Make sure you're using the **anon/public** key, not the service key

### Can't sign up with email
- Go to Authentication > Settings in Supabase
- Temporarily disable "Enable email confirmations" for testing
- For production, set up SMTP and email templates

## What Works Now

✅ **Sign in with email/password**
✅ **Save visualizations to the cloud**
✅ **Load your projects from anywhere**
✅ **Make visualizations public or private**
✅ **Duplicate and manage projects**
✅ **User profiles with names**

Once you complete the migration, all cloud features will be fully functional! 🚀
