# Menufy Admin Panel - Complete Setup Guide

## Authentication System

**Important**: This admin panel uses a **simple cookie-based authentication** system:
- **NO JWT** - Authentication is cookie-only
- **6-digit PIN** - Admin login uses a 6-digit numeric PIN
- **Cookie**: `admin_session=valid` (httpOnly, secure in production)
- **Middleware** - Only checks if cookie exists (no token verification)

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

1. Create a PostgreSQL database (local or hosted)

2. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

3. Update `.env` with your database URL:
```
DATABASE_URL="postgresql://user:password@localhost:5432/menufy?schema=public"
```

4. Generate Prisma Client:
```bash
npm run db:generate
```

5. Push schema to database:
```bash
npm run db:push
```

### 3. Create Admin PIN

1. Start the development server:
```bash
npm run dev
```

2. Visit `http://localhost:3000/admin/login`

3. Enter a 6-digit PIN to create the admin account (first time only)

4. After setup, use the same PIN to login

## Database Schema

### AdminSettings Table
- Stores the hashed PIN (single row)
- Created automatically on first admin setup

### Content Tables
- Page, Brand, Navbar, Hero, Section, Footer
- ContactSubmission for form data
- All editable content stored in database

## Authentication Flow

1. User visits `/admin/login`
2. Enters 6-digit PIN
3. Server validates PIN against hashed value in database
4. If valid, sets cookie: `admin_session=valid`
5. Middleware checks cookie existence (not value/content)
6. If cookie exists → access granted
7. If cookie missing → redirect to `/admin/login`

## Admin Routes

All routes under `/admin` are protected by middleware:
- `/admin` - Dashboard
- `/admin/content` - Content management
- `/admin/inbox` - Contact submissions
- `/admin/settings` - Change PIN
- `/admin/login` - Login page (public)

## Security Features

- ✅ PIN hashed with bcrypt
- ✅ httpOnly cookies (not accessible via JavaScript)
- ✅ Secure flag in production
- ✅ Rate limiting on login attempts (5 attempts, 15min lockout)
- ✅ Cookie-based auth (no JWT)
- ✅ Middleware protection (Edge-safe)

## Change Admin PIN

1. Login to admin panel
2. Go to Settings (`/admin/settings`)
3. Enter current PIN, new PIN, and confirm
4. PIN is updated in database

## Logout

Click "Logout" in admin sidebar - clears the `admin_session` cookie

## Production Deployment

### Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV=production`

Optional (for image uploads):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Security Checklist

- [ ] Use strong database password
- [ ] Enable HTTPS (secure cookies require this)
- [ ] Set `NODE_ENV=production`
- [ ] Use production database (not localhost)
- [ ] Review rate limiting settings
- [ ] Regular PIN changes recommended

## Troubleshooting

### "No admin found" error
- Run: `npm run db:push`
- Visit `/admin/login` to create admin

### Cookie not working
- Check browser allows cookies
- Ensure HTTPS in production
- Check `sameSite` and `secure` flags match environment

### Rate limit issues
- Wait 15 minutes after 5 failed attempts
- Rate limiting is in-memory (resets on server restart)

### Database connection errors
- Verify DATABASE_URL format
- Check database is running
- Ensure network access (for remote databases)

## Content Management

The admin panel allows managing:
- Brand settings (name, colors, logo)
- Navigation links
- Hero section
- All page sections (Features, How It Works, etc.)
- Footer content
- Contact form submissions

See the Content Editor in `/admin/content` for full editing capabilities.

## Support

For detailed information, see:
- `README.md` - Main project documentation
- `IMPLEMENTATION_STATUS.md` - Current implementation status