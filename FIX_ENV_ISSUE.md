# Fix: Environment variable not found

The `.env` file exists, but Prisma might not be reading it. Here are solutions:

## Solution 1: Verify .env File Format

Make sure your `.env` file has NO extra spaces and proper format:

```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/menufy?schema=public"
NODE_ENV="development"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-min-32-chars"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

**Important**: No spaces around the `=` sign in `.env` files.

## Solution 2: Use Supabase (Recommended - No PostgreSQL Installation Needed)

Since you don't have PostgreSQL installed, use Supabase instead:

1. **Create Supabase account**: https://supabase.com
2. **Create new project**
3. **Get connection string** from Settings → Database → Connection string (URI tab)
4. **Update .env file** with Supabase connection string

Example Supabase DATABASE_URL:
```env
DATABASE_URL="postgresql://postgres.xxxxx:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres?schema=public"
```

## Solution 3: Install PostgreSQL Locally

If you want to use local PostgreSQL:

1. **Download PostgreSQL**: https://www.postgresql.org/download/windows/
2. **Install it** (remember the password you set)
3. **Create database**: Use pgAdmin or install psql
4. **Update .env** with correct password

## Solution 4: Restart Terminal

Sometimes environment variables need a fresh terminal:

1. **Close PowerShell completely**
2. **Open new PowerShell**
3. **Navigate to project**: `cd C:\Users\muham\OneDrive\Desktop\web`
4. **Try again**: `npm run db:push`

## Quick Test

To test if Prisma can see the DATABASE_URL, try:

```powershell
# Set environment variable for this session
$env:DATABASE_URL="postgresql://postgres:1234@localhost:5432/menufy?schema=public"
npm run db:push
```

If this works, the issue is with .env file loading. If it still fails, the issue is database connection (PostgreSQL not installed/running).






