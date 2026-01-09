# Quick Fix: Database Connection Error

## Current Error
"Database connection failed. Please check your DATABASE_URL in .env file and ensure PostgreSQL is running."

## Quick Solutions

### Solution 1: Restart PostgreSQL Service

1. **Open Services** (Press `Win + R`, type `services.msc`, press Enter)
2. **Find PostgreSQL service** (look for "postgresql" or "PostgreSQL")
3. **Right-click → Start** (if stopped) or **Restart** (if running)
4. **Restart your dev server**: `npm run dev`
5. **Try login again**

### Solution 2: Use Supabase (No PostgreSQL Installation)

If PostgreSQL isn't installed or keeps failing:

1. **Go to**: https://supabase.com
2. **Create free account** and new project
3. **Get connection string** from Settings → Database → URI tab
4. **Update .env file** with Supabase connection string
5. **Restart dev server**: `npm run dev`
6. **Try login again**

### Solution 3: Verify .env File

Make sure your `.env` file in the project root has:

```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/menufy?schema=public"
```

**Important**: 
- Replace `1234` with your actual PostgreSQL password
- No spaces around `=`
- Keep the quotes

### Solution 4: Restart Dev Server

Sometimes the server doesn't pick up environment variables:

1. **Stop dev server**: Press `Ctrl+C` in terminal
2. **Close terminal completely**
3. **Open new terminal/PowerShell**
4. **Navigate to project**: `cd C:\Users\muham\OneDrive\Desktop\web`
5. **Start server**: `npm run dev`
6. **Try login again**

### Solution 5: Check PostgreSQL is Running

Run in PowerShell:
```powershell
Get-Service -Name "*postgres*"
```

If PostgreSQL service doesn't exist or isn't running, you need to:
- Install PostgreSQL, OR
- Use Supabase (cloud database, no installation)

## Recommended: Use Supabase

Since PostgreSQL installation can be complex, **Supabase is recommended**:
- ✅ No installation needed
- ✅ Free tier available
- ✅ Works immediately
- ✅ Can access from anywhere

See `EASIEST_SETUP.md` for Supabase setup instructions.






