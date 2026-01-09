# Environment Setup

## Automatic Setup

The project includes an automatic environment setup script that ensures your `.env` file exists with all required variables.

### Run Setup Manually

```bash
npm run setup:env
```

This script will:
- ✅ Check if `.env` file exists
- ✅ Create `.env` if it doesn't exist
- ✅ Add missing required variables (DATABASE_URL, ADMIN_SETUP_PIN)
- ✅ Preserve existing variables (never overwrites)

### Automatic Setup (Post-Install)

The script runs automatically after `npm install` via the `postinstall` hook.

## Required Environment Variables

### DATABASE_URL (Required)

PostgreSQL connection string:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/menufy?schema=public"
```

**Examples:**
- **Local PostgreSQL**: `postgresql://postgres:YOUR_PASSWORD@localhost:5432/menufy?schema=public`
- **Supabase**: `postgresql://postgres.xxxxx:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres?schema=public`

### ADMIN_SETUP_PIN (Required)

6-digit PIN for first-time admin setup:

```env
ADMIN_SETUP_PIN="123456"
```

## Setup Steps

1. **Run the setup script**:
   ```bash
   npm run setup:env
   ```

2. **Update DATABASE_URL** in `.env` with your actual database credentials

3. **Restart dev server**:
   ```bash
   npm run dev
   ```

4. **Generate Prisma Client**:
   ```bash
   npm run db:generate
   ```

5. **Create database tables**:
   ```bash
   npm run db:push
   ```

6. **Test admin login**:
   - Visit: `http://localhost:3000/admin/login`
   - Enter PIN from `ADMIN_SETUP_PIN` (default: `123456`)

## Safety

- ✅ `.env` is in `.gitignore` (never committed)
- ✅ `.env.example` is tracked (safe template)
- ✅ Script never overwrites existing values
- ✅ Clear error messages if variables are missing

## Vercel Deployment

For production, add `DATABASE_URL` to Vercel Environment Variables:
- Dashboard → Project → Settings → Environment Variables
- Add `DATABASE_URL` with production database URL
- Select all environments (Production, Preview, Development)

See `VERCEL_ENV_SETUP.md` for detailed instructions.






