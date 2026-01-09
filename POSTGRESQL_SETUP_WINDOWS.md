# PostgreSQL Setup for Windows

## Option 1: Install PostgreSQL Locally (Recommended for Development)

### Step 1: Download PostgreSQL

1. Go to: https://www.postgresql.org/download/windows/
2. Click "Download the installer"
3. Download the latest version (usually 15 or 16)
4. Run the installer (.exe file)

### Step 2: Install PostgreSQL

1. **Run the installer**
2. **Installation directory**: Use default (usually `C:\Program Files\PostgreSQL\15`)
3. **Select components**: Make sure "Command Line Tools" is checked (includes psql)
4. **Data directory**: Use default
5. **Password**: Set password to `1234` (or remember what you set)
6. **Port**: Use default `5432`
7. **Advanced Options**: Use defaults
8. **Pre Installation Summary**: Click Next
9. **Ready to Install**: Click Next
10. Wait for installation to complete
11. **Stack Builder**: You can skip this, click Cancel

### Step 3: Add PostgreSQL to PATH (Important!)

After installation, `psql` might not be in your PATH. Here's how to add it:

1. **Find PostgreSQL bin folder**: Usually `C:\Program Files\PostgreSQL\15\bin` (version number may differ)
2. **Open System Environment Variables**:
   - Press `Win + R`
   - Type: `sysdm.cpl`
   - Press Enter
   - Click "Environment Variables" button
3. **Edit PATH**:
   - Under "System variables", find and select "Path"
   - Click "Edit"
   - Click "New"
   - Add: `C:\Program Files\PostgreSQL\15\bin` (replace 15 with your version)
   - Click OK on all windows
4. **Restart PowerShell/Terminal** (important!)

### Step 4: Verify Installation

Open a NEW PowerShell window and run:
```bash
psql --version
```

You should see the PostgreSQL version. If not, the PATH wasn't added correctly.

### Step 5: Create Database

```bash
psql -U postgres
```

Enter password when prompted (the one you set during installation, e.g., `1234`)

Then:
```sql
CREATE DATABASE menufy;
\q
```

---

## Option 2: Use Supabase (Cloud - Easier, No Installation)

### Step 1: Create Supabase Account

1. Go to: https://supabase.com
2. Click "Start your project"
3. Sign up (free account is fine)
4. Create a new project

### Step 2: Get Database URL

1. In your Supabase project, go to **Settings** → **Database**
2. Scroll down to **Connection string**
3. Select **URI** tab
4. Copy the connection string
5. It looks like: `postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres`

### Step 3: Update .env File

Open `.env` file and replace DATABASE_URL with your Supabase connection string:

```env
DATABASE_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?schema=public"
```

Replace `[YOUR-PASSWORD]` with the database password you set in Supabase.

### Step 4: Continue with Database Setup

After updating `.env`, you can skip the `psql` commands and go directly to:
```bash
npm run db:generate
npm run db:push
```

---

## Option 3: Use pgAdmin (GUI Tool - If psql doesn't work)

### Step 1: Install pgAdmin

1. pgAdmin is usually installed with PostgreSQL
2. If not, download from: https://www.pgadmin.org/download/
3. Install it

### Step 2: Create Database

1. Open pgAdmin
2. Connect to your PostgreSQL server (use the password you set during installation)
3. Right-click "Databases"
4. Click "Create" → "Database"
5. Name: `menufy`
6. Click "Save"

### Step 3: Update .env (if needed)

Make sure your `.env` file has the correct connection:
```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/menufy?schema=public"
```

Replace `1234` with your actual PostgreSQL password if different.

---

## After Database is Created

Once you have the database created (using any method above), continue with:

```bash
# Generate Prisma Client
npm run db:generate

# Create all tables
npm run db:push

# Start dev server
npm run dev
```

Then visit: `http://localhost:3000/admin/login` and enter PIN: `123456`

---

## Quick Recommendation

**For quickest setup**: Use **Supabase** (Option 2)
- No installation needed
- Free tier available
- Works immediately
- Can switch to local PostgreSQL later

**For local development**: Install **PostgreSQL** (Option 1)
- Better for offline work
- Full control
- Free and open source






