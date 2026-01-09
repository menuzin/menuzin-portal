# Quick Database Setup Guide

## ✅ Already Done
- ✅ Prisma schema created with all tables
- ✅ `.env` file created with database connection
- ✅ Image model added for photo tracking

## 📋 Steps to Connect Database

### 1. Create PostgreSQL Database
```bash
psql -U postgres
```
Enter password: `1234`

Then:
```sql
CREATE DATABASE menufy;
\q
```

### 2. Generate Prisma Client
```bash
npm run db:generate
```

### 3. Create All Tables
```bash
npm run db:push
```

### 4. Verify (Optional)
```bash
npm run db:studio
```

### 5. Create Admin Account
1. Start server: `npm run dev`
2. Visit: `http://localhost:3000/admin/login`
3. Enter PIN: `123456`

## 📊 Database Tables
- `admin_settings` - Admin PIN
- `Page` - Pages
- `Brand` - Branding
- `Navbar` & `navbar_links` - Navigation
- `Hero` - Hero section
- `Section` - Content sections
- `Footer` & `footer_links` - Footer
- `ContactSubmission` - Form submissions
- `settings` - Global settings
- `images` - Uploaded photos

## 🔐 Admin Login
- PIN: `123456` (6 digits)
- URL: `/admin/login`

## 📝 .env File Location
`C:\Users\muham\OneDrive\Desktop\web\.env`

Current DATABASE_URL:
```
DATABASE_URL="postgresql://postgres:1234@localhost:5432/menufy?schema=public"
```






