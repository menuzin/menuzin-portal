# 🚀 Easiest Database Setup (Supabase - No Installation)

If you don't have PostgreSQL installed, use Supabase - it's free and takes 5 minutes!

## Step 1: Create Supabase Account

1. Go to: **https://supabase.com**
2. Click **"Start your project"**
3. Sign up (free, use GitHub/Google or email)
4. Click **"New Project"**
5. Fill in:
   - **Name**: menufy (or any name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to you
   - Click **"Create new project"**
6. Wait 1-2 minutes for project to initialize

## Step 2: Get Database Connection String

1. In your Supabase project dashboard, click **Settings** (gear icon on left)
2. Click **Database** in the sidebar
3. Scroll down to **"Connection string"** section
4. Click the **"URI"** tab
5. Copy the connection string (looks like this):
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
6. **Important**: Replace `[YOUR-PASSWORD]` with the password you set when creating the project

## Step 3: Update .env File

Open `.env` file in your project and update DATABASE_URL:

```env
DATABASE_URL="postgresql://postgres.xxxxx:YOUR_ACTUAL_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres?schema=public"
NODE_ENV="development"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-min-32-chars"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

**Example** (replace with your actual connection string):
```env
DATABASE_URL="postgresql://postgres.abcdefghijklmnop:[MY-PASSWORD-123]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?schema=public"
```

## Step 4: Create Database Tables

Open PowerShell in your project folder and run:

```bash
# Generate Prisma Client
npm run db:generate

# Create all tables in Supabase
npm run db:push
```

You should see: `✅ Your database is now in sync with your Prisma schema.`

## Step 5: Start Dev Server

```bash
npm run dev
```

## Step 6: Create Admin Account

1. Visit: **http://localhost:3000/admin/login**
2. Enter PIN: **123456**
3. Click Login/Setup
4. Done! 🎉

---

## That's It!

No PostgreSQL installation needed. Everything runs in the cloud (free tier is generous).

You can view your database anytime in Supabase dashboard:
- Go to **Table Editor** to see your tables
- Go to **SQL Editor** to run queries
- Go to **Settings** → **Database** to see connection info

---

## Troubleshooting

**"Can't connect to database"**
- Make sure you replaced `[YOUR-PASSWORD]` with actual password
- Check the connection string is correct (no extra spaces)
- Make sure your Supabase project is active (not paused)

**"npm run db:push fails"**
- Check DATABASE_URL in `.env` is correct
- Make sure Supabase project is fully initialized (wait a minute if just created)
- Try `npm run db:generate` first, then `npm run db:push`






