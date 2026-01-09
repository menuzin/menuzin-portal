# DATABASE_URL Setup Verification

## ✅ All Configuration Complete

### Files Updated/Created:

1. **`.env.example`** - Template for environment variables
2. **`lib/prisma.ts`** - Improved error handling with clear messages
3. **`.gitignore`** - Ensures `.env` is not committed (but `.env.example` is)
4. **`VERCEL_ENV_SETUP.md`** - Vercel deployment guide

### Prisma Configuration:

- ✅ `prisma/schema.prisma` uses `env("DATABASE_URL")` (no hardcoding)
- ✅ Prisma client uses singleton pattern to prevent multiple connections
- ✅ Clear error messages if DATABASE_URL is missing

## Quick Verification Steps:

### 1. Verify .env File Exists

```bash
# Should show .env file
ls -la .env
# or on Windows:
Test-Path .env
```

### 2. Verify .env File Location

The `.env` file MUST be at the project root:
```
web/
├── .env          ← MUST be here (same level as package.json)
├── package.json
├── prisma/
├── app/
└── ...
```

### 3. Verify .env File Content

Your `.env` file should contain (update with your actual credentials):

```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/menufy?schema=public"
NODE_ENV="development"
```

**Important**: Replace `1234` with your actual PostgreSQL password.

### 4. Test Prisma Connection

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push
```

If these commands work, DATABASE_URL is correct.

### 5. Start Dev Server

```bash
# Stop any running server first (Ctrl+C)
npm run dev
```

The server should start without DATABASE_URL errors.

### 6. Test Admin Login

1. Visit: `http://localhost:3000/admin/login`
2. Enter PIN: `123456`
3. Should successfully create/login

## Troubleshooting

### Error: "DATABASE_URL is not set"

**Solution:**
1. Verify `.env` file exists in project root
2. Check `.env` file has `DATABASE_URL="..."` (with quotes)
3. No spaces around `=` sign
4. Restart dev server completely (close terminal, reopen, start server)

### Error: "Connection refused" or "P1001"

**Solution:**
- PostgreSQL is not running
- Start PostgreSQL service
- Or use Supabase (cloud database, no installation)

### Error: "Authentication failed" or "P1000"

**Solution:**
- Wrong password in DATABASE_URL
- Update `.env` with correct PostgreSQL password
- Restart dev server

### Error: "Database does not exist"

**Solution:**
- Create the database first:
  ```bash
  psql -U postgres
  CREATE DATABASE menufy;
  \q
  ```
- Or run `npm run db:push` which will create it automatically

## Vercel Deployment

For production deployments, add `DATABASE_URL` to Vercel Environment Variables.

See `VERCEL_ENV_SETUP.md` for detailed instructions.

## Current Status

- ✅ Prisma schema configured correctly
- ✅ Prisma client with error handling
- ✅ .env.example template created
- ✅ .gitignore configured
- ✅ Vercel deployment guide created

**Next:** Verify your `.env` file has the correct DATABASE_URL and restart the dev server.






