# Menufy Admin Panel Setup Guide

A complete admin panel with simple cookie-based authentication (no JWT).

## How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up database:**
   ```bash
   # Create .env file
   cp .env.example .env
   
   # Edit .env with your DATABASE_URL
   # DATABASE_URL="postgresql://user:password@localhost:5432/menufy"
   
   # Generate Prisma Client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Create admin account:**
   - Visit `http://localhost:3000/admin/login`
   - Enter a 6-digit PIN to create your admin account

## Authentication System

### Simple Cookie-Based Auth

- **6-digit PIN only** - No username/email
- **Cookie**: `admin_session=valid` (httpOnly, secure in production)
- **No JWT** - Middleware only checks if cookie exists
- **Rate limiting**: 5 attempts, 15-minute lockout

### Login Flow

1. User visits `/admin/login`
2. Enters 6-digit PIN
3. Server validates PIN against hashed value in database
4. If valid, sets cookie: `admin_session=valid`
5. Cookie expires after 30 days

### Middleware Protection

- All `/admin` routes (except `/admin/login`) are protected
- Middleware checks if `admin_session` cookie exists
- If cookie missing or not "valid" → redirect to `/admin/login`
- Edge-safe (no token verification, just cookie check)

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string

Optional:
- `NODE_ENV` - Set to "production" for secure cookies (HTTPS required)
- Supabase keys (for image uploads)

## Project Structure

```
web/
├── app/
│   ├── admin/              # Admin panel pages
│   │   ├── login/          # Login page
│   │   ├── content/        # Content management
│   │   ├── inbox/          # Contact submissions
│   │   └── settings/       # Change PIN
│   ├── api/
│   │   ├── auth/           # Login, logout, check-setup
│   │   ├── admin/          # Change PIN
│   │   └── contact/        # Contact form API
│   └── ...
├── components/
│   └── admin/              # Admin UI components
├── lib/
│   ├── auth.ts             # PIN hashing/verification
│   ├── prisma.ts           # Prisma client
│   └── content.ts          # Content helpers
├── prisma/
│   └── schema.prisma       # Database schema
└── middleware.ts           # Cookie-based auth middleware
```

## Admin Panel Features

### Dashboard (`/admin`)
- Overview of contact submissions
- Site status (published/draft)
- Quick actions

### Content Management (`/admin/content`)
- Edit all website content
- Manage sections (Hero, Features, etc.)
- Upload images
- Preview changes
- Publish content

### Inbox (`/admin/inbox`)
- View contact form submissions
- Filter by handled/unhandled status
- Mark submissions as handled

### Settings (`/admin/settings`)
- Change admin PIN
- Manage global settings

## Security

- PINs are hashed with bcrypt before storage
- httpOnly cookies (not accessible via JavaScript)
- Secure flag in production (requires HTTPS)
- Rate limiting on login attempts
- Middleware protection for admin routes
- Input validation with Zod

## Database Schema

### AdminSettings
- Stores hashed PIN (single row, created on first setup)

### Content Models
- Page, Brand, Navbar, Hero, Section, Footer
- All editable content stored in database

### ContactSubmission
- Stores contact form submissions
- Includes handled status

## Change Admin PIN

1. Login to admin panel
2. Go to Settings (`/admin/settings`)
3. Enter current PIN, new PIN, and confirm
4. PIN is updated in database (old cookie remains valid)

## Logout

Click "Logout" in admin sidebar - clears the `admin_session` cookie

## Troubleshooting

### "No admin found" error
- Run: `npm run db:push`
- Visit `/admin/login` to create admin

### Cookie not working
- Check browser allows cookies
- Ensure HTTPS in production
- Verify `NODE_ENV=production` for secure cookies

### Rate limit issues
- Wait 15 minutes after 5 failed attempts
- Rate limiting is in-memory (resets on server restart)

### Database connection errors
- Verify DATABASE_URL format
- Check database is running
- Ensure network access (for remote databases)

## Production Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables:
   - `DATABASE_URL`
   - `NODE_ENV=production`
4. Deploy

### Security Checklist

- [ ] Use strong database password
- [ ] Enable HTTPS (secure cookies require this)
- [ ] Set `NODE_ENV=production`
- [ ] Use production database (not localhost)
- [ ] Review rate limiting settings
- [ ] Regular PIN changes recommended

## Support

For general project information, see the main `README.md`.
For implementation details, see `SETUP_GUIDE.md` and `IMPLEMENTATION_STATUS.md`.