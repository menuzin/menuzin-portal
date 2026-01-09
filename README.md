# Menuzin Landing Page

A premium, restaurant-focused landing page with a complete admin panel built with Next.js 15, TypeScript, TailwindCSS, and Framer Motion.

## Brand

**Menuzin** - Digital menus made simple

Designed specifically for restaurants and cafés with a sales-contact focus. Includes a full admin panel for managing all website content.

## Features

- ✅ Fully responsive landing page (mobile, tablet, desktop)
- ✅ Complete admin panel with PIN-based authentication
- ✅ Cookie-based authentication (no JWT)
- ✅ Content management system (CMS)
- ✅ Contact form with inbox management
- ✅ Image upload support (Supabase Storage)
- ✅ Draft/Published content workflow
- ✅ PostgreSQL database with Prisma ORM

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

1. Create a PostgreSQL database
2. Copy `.env.example` to `.env`
3. Update `DATABASE_URL` in `.env`
4. Generate Prisma Client: `npm run db:generate`
5. Push schema: `npm run db:push`

### 3. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 4. Create Admin Account

1. Visit `http://localhost:3000/admin/login`
2. Enter a 6-digit PIN to create your admin account

## Environment Variables

See `.env.example` for required variables:

- `DATABASE_URL` - PostgreSQL connection string (required)
- `NODE_ENV` - Set to "production" in production (optional)
- Supabase keys (optional, for image uploads)

## Admin Panel

### Access
- Login link in public header navigation
- Direct: `/admin/login`
- Dashboard: `/admin` (requires authentication)

### Authentication
- **6-digit PIN only** - No username/email required
- **Cookie-based** - Simple `admin_session=valid` cookie
- **Secure** - httpOnly, secure in production, sameSite=lax
- **Rate limited** - 5 attempts, 15min lockout

### Features
- **Dashboard**: Overview and quick stats
- **Content**: Edit all website content
- **Inbox**: Manage contact form submissions
- **Settings**: Change admin PIN

See `SETUP_GUIDE.md` for detailed admin setup and usage.

## Project Structure

```
web/
├── app/
│   ├── admin/              # Admin panel pages
│   ├── api/                # API routes
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx            # Public homepage
├── components/
│   ├── admin/              # Admin components
│   └── [public components] # Public site components
├── lib/                    # Utilities (auth, prisma, content)
├── prisma/
│   └── schema.prisma       # Database schema
└── middleware.ts           # Auth middleware (cookie-based)
```

## Design System

### Colors
- **Primary** (buttons): `#14B8A6` (Teal)
- **Primary Hover**: `#0D9488`
- **Background**: `#FAFAF9`
- **Text Primary**: `#0F172A`
- **Text Muted**: `#64748B`
- **Accent**: `#365314` (WhatsApp)
- **Borders**: `#E5E7EB`

### Typography
- **Font**: Inter (Google Fonts)
- Strong hierarchy, large headings

## Database Commands

```bash
# Generate Prisma Client
npm run db:generate

# Push schema (development)
npm run db:push

# Create migration (production)
npm run db:migrate

# Open Prisma Studio
npm run db:studio
```

## Deployment

### Vercel

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Required Production Variables

- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV=production` - For secure cookies

## Content Management

All website content can be managed through the admin panel:
- Brand settings (name, colors, logo)
- Navigation links
- Hero section
- All page sections
- Footer content
- WhatsApp settings

## Security

- PIN-based authentication (6 digits)
- Bcrypt password hashing
- httpOnly cookies (not accessible via JavaScript)
- Secure flag in production (HTTPS required)
- Rate limiting on login (5 attempts, 15min lockout)
- Middleware protection for admin routes
- Edge-safe middleware (no JWT verification)

## Support

For admin panel setup, see `SETUP_GUIDE.md`.

For deployment issues, check environment variables and database connectivity.