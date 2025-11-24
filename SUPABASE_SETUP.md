# Supabase Setup Guide for VizSector

This guide will help you set up Supabase as the backend for VizSector, enabling user authentication, cloud storage, and project management features.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js installed on your machine

## Step 1: Create a Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in your project details:
   - **Name**: VizSector (or any name you prefer)
   - **Database Password**: Choose a strong password (save it somewhere safe)
   - **Region**: Select the region closest to your users
4. Click "Create new project" and wait for it to finish setting up (1-2 minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase project dashboard, click on the ⚙️ **Settings** icon in the sidebar
2. Click on **API** in the settings menu
3. You'll need two values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (a long string starting with `eyJ...`)

## Step 3: Configure Environment Variables

1. In the VizSector project root, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 4: Run Database Migrations

You have two options to set up your database schema:

### Option A: Using Supabase SQL Editor (Recommended)

1. In your Supabase dashboard, click on the **SQL Editor** icon in the sidebar
2. Click **"New query"**
3. Copy the entire contents of `supabase/migrations/20250101000000_initial_schema.sql`
4. Paste it into the SQL Editor
5. Click **"Run"** to execute the migration
6. You should see a success message

### Option B: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Link your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

## Step 5: Enable Authentication Providers (Optional)

### Email/Password Authentication

Email/password authentication is enabled by default. No additional setup needed!

### Google OAuth

1. Go to **Authentication** > **Providers** in Supabase dashboard
2. Find **Google** and click to expand
3. Toggle **Enable Sign in with Google**
4. Follow Supabase's instructions to set up Google OAuth:
   - Create a project in [Google Cloud Console](https://console.cloud.google.com)
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs from Supabase
5. Copy Client ID and Client Secret to Supabase
6. Save changes

### GitHub OAuth

1. Go to **Authentication** > **Providers** in Supabase dashboard
2. Find **GitHub** and click to expand
3. Toggle **Enable Sign in with GitHub**
4. Follow Supabase's instructions to set up GitHub OAuth:
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Create a new OAuth App
   - Use the callback URL from Supabase
5. Copy Client ID and Client Secret to Supabase
6. Save changes

## Step 6: Verify Database Setup

1. Go to **Table Editor** in Supabase dashboard
2. You should see three tables:
   - `profiles` - User profile information
   - `visualizations` - Saved visualization projects
   - `shared_visualizations` - Visualization sharing permissions

## Step 7: Test the Application

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open the app in your browser
3. Click **Sign In** button in the sidebar
4. Create a new account with email/password or use OAuth
5. Try creating and saving a visualization
6. Verify that your visualization appears in "My Projects"

## Database Schema

### Tables

#### `profiles`
Stores user profile information
- `id` - UUID (references auth.users)
- `email` - User email
- `full_name` - User's full name
- `avatar_url` - Profile picture URL
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

#### `visualizations`
Stores saved visualization projects
- `id` - UUID (auto-generated)
- `user_id` - UUID (references profiles)
- `title` - Visualization title
- `description` - Optional description
- `chart_type` - Type of chart (bar, line, pie, etc.)
- `chart_config` - JSON configuration object
- `dataset` - JSON data object
- `is_public` - Boolean for public sharing
- `thumbnail_url` - Optional preview image
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

#### `shared_visualizations`
Manages visualization sharing permissions
- `id` - UUID (auto-generated)
- `visualization_id` - UUID (references visualizations)
- `shared_with_email` - Email of user to share with
- `permission` - 'view' or 'edit'
- `created_at` - Share creation timestamp

## Security

### Row Level Security (RLS)

All tables have Row Level Security enabled with the following policies:

**Profiles:**
- Users can only view and update their own profile
- Users can insert their own profile on signup

**Visualizations:**
- Users can view their own visualizations
- Everyone can view public visualizations
- Users can only create, update, and delete their own visualizations

**Shared Visualizations:**
- Users can view shares for their own visualizations
- Users can view visualizations shared with them
- Users can only create/delete shares for their own visualizations

## Features Enabled

✅ User authentication (email/password, Google, GitHub)
✅ User profiles with customizable names
✅ Save visualizations to the cloud
✅ Load saved visualizations
✅ Delete visualizations
✅ Duplicate visualizations
✅ Public/private visibility settings
✅ Automatic profile creation on signup
✅ Secure access with Row Level Security

## Troubleshooting

### "Failed to connect to Supabase"
- Verify your environment variables in `.env`
- Make sure you copied the correct URL and anon key
- Restart your development server after updating `.env`

### "RLS policy violation"
- Make sure you ran the database migration
- Check that Row Level Security is properly configured
- Verify you're signed in when accessing protected resources

### Authentication not working
- Check that email confirmations are disabled for development:
  - Go to **Authentication** > **Settings**
  - Uncheck "Enable email confirmations" for development
- For production, set up email templates and SMTP settings

### OAuth providers not working
- Verify you added the correct redirect URLs
- Check that OAuth apps are configured correctly
- Make sure the providers are enabled in Supabase dashboard

## Production Deployment

Before deploying to production:

1. **Set up email templates** in Authentication > Email Templates
2. **Configure SMTP** for email delivery
3. **Enable email confirmations** for security
4. **Set up custom domain** if desired
5. **Review and tighten RLS policies** if needed
6. **Enable database backups** in Settings > Database
7. **Monitor usage** in Project Dashboard

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

## Support

If you encounter issues:
- Check [Supabase Discussions](https://github.com/supabase/supabase/discussions)
- Visit [Supabase Discord](https://discord.supabase.com)
- Review [VizSector GitHub Issues](https://github.com/your-repo/issues)
