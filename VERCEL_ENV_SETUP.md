# Vercel Environment Variables Setup

## For Production/Preview Deployments

When deploying to Vercel, you must add `DATABASE_URL` to Vercel Environment Variables:

### Steps:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add:
   - **Key**: `DATABASE_URL`
   - **Value**: Your production database connection string (e.g., Supabase, Railway, etc.)
   - **Environment**: Select all (Production, Preview, Development)
6. Click **Save**
7. **Redeploy** your application for changes to take effect

### Example Values:

**Supabase:**
```
postgresql://postgres.xxxxx:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres?schema=public
```

**Railway:**
```
postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway?schema=public
```

### Important Notes:

- Never commit `.env` files to git (already in `.gitignore`)
- Use different database URLs for development and production
- The connection string format must match: `postgresql://user:password@host:port/database?schema=public`






