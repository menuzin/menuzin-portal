# Quick Database Setup

## 1. Create .env File

Create a file named `.env` in the root directory (`C:\Users\muham\OneDrive\Desktop\web\.env`) with:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/menufy?schema=public"
NODE_ENV="development"
```

**Update the DATABASE_URL with your actual PostgreSQL credentials:**
- Replace `postgres` with your PostgreSQL username
- Replace `password` with your PostgreSQL password  
- Replace `localhost` if using a remote database
- Replace `menufy` with your database name

## 2. Create PostgreSQL Database

**Option A: Using psql (command line)**
```bash
psql -U postgres
CREATE DATABASE menufy;
\q
```

**Option B: Using pgAdmin or another GUI**
- Create a new database named `menufy`

## 3. Stop Dev Server

If the dev server is running, stop it (Ctrl+C in the terminal)

## 4. Generate Prisma Client

```bash
npm run db:generate
```

## 5. Create Tables

```bash
npm run db:push
```

This will create all the database tables (AdminSettings, Page, Brand, Navbar, Hero, Section, Footer, ContactSubmission, Setting).

## 6. Verify

Open Prisma Studio to see your database:
```bash
npm run db:studio
```

## 7. Create Admin

1. Start dev server: `npm run dev`
2. Visit: `http://localhost:3000/admin/login`
3. Enter a 6-digit PIN to create your admin account

Done! 🎉






