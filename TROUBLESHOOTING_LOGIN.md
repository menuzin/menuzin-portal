# Troubleshooting Login Error

If you see "Internal server error" when entering PIN `123456`, follow these steps:

## Step 1: Stop the Dev Server

Press `Ctrl+C` in the terminal where `npm run dev` is running.

## Step 2: Check Database Connection

Make sure your `.env` file exists and has the correct DATABASE_URL:

```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/menufy?schema=public"
```

## Step 3: Create the Database (if not done)

```bash
psql -U postgres
```

Enter password: `1234`

Then:
```sql
CREATE DATABASE menufy;
\q
```

## Step 4: Generate Prisma Client

```bash
npm run db:generate
```

If you get a permission error (EPERM), make sure:
- Dev server is stopped (Ctrl+C)
- No other processes are using the database
- Close Prisma Studio if it's open
- Try again

## Step 5: Create Database Tables

```bash
npm run db:push
```

You should see:
```
✅ Your database is now in sync with your Prisma schema.
```

## Step 6: Start Dev Server

```bash
npm run dev
```

## Step 7: Try Login Again

1. Visit: `http://localhost:3000/admin/login`
2. Enter PIN: `123456`
3. If it's the first time, it will create the admin account
4. If admin exists, it will log you in

## Common Errors

### "Database connection error"
- PostgreSQL is not running
- Wrong password in DATABASE_URL
- Database `menufy` doesn't exist
- Fix: Check PostgreSQL is running, verify password, create database

### "EPERM: operation not permitted"
- Dev server is still running
- File is locked
- Fix: Stop dev server completely, close all terminals, try again

### "Prisma Client not generated"
- Need to run `npm run db:generate`
- Fix: Run the command above

### "Table does not exist"
- Need to run `npm run db:push`
- Fix: Run `npm run db:push` to create all tables

## Quick Checklist

- [ ] PostgreSQL is installed and running
- [ ] Database `menufy` exists
- [ ] `.env` file has correct DATABASE_URL
- [ ] Dev server is stopped
- [ ] `npm run db:generate` completed successfully
- [ ] `npm run db:push` completed successfully
- [ ] Dev server is running
- [ ] Can access `/admin/login`

## Still Having Issues?

Check the terminal/console output where `npm run dev` is running. It will show the actual error message.

Common error messages:
- `P1001: Can't reach database server` → PostgreSQL not running
- `P1000: Authentication failed` → Wrong password
- `P1003: Database does not exist` → Create the database first
- `PrismaClient is not generated` → Run `npm run db:generate`






