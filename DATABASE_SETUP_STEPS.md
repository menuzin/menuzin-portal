# Database Setup Steps

## Prerequisites
- PostgreSQL installed and running
- Database password: `1234` (as specified)
- PostgreSQL username: `postgres` (default)

## Step 1: Create the Database

Open PowerShell or Command Prompt and run:

```bash
psql -U postgres
```

When prompted, enter your PostgreSQL password (`1234`).

Then create the database:
```sql
CREATE DATABASE menufy;
\q
```

**Alternative:** If you're using pgAdmin or another GUI tool:
1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Right-click "Databases" → Create → Database
4. Name: `menufy`
5. Click Save

## Step 2: Verify .env File

Your `.env` file should contain:
```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/menufy?schema=public"
NODE_ENV="development"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-min-32-chars"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

**Note:** If your PostgreSQL username is different from `postgres`, update the `DATABASE_URL` accordingly.

## Step 3: Stop Dev Server (if running)

Press `Ctrl+C` in the terminal where `npm run dev` is running to stop it.

## Step 4: Generate Prisma Client

```bash
npm run db:generate
```

This generates the Prisma Client based on your schema.

## Step 5: Push Schema to Database

This will create all tables in your database:

```bash
npm run db:push
```

You should see:
```
✅ Your database is now in sync with your Prisma schema.
```

## Step 6: Verify Database

Open Prisma Studio to see your database:

```bash
npm run db:studio
```

This opens a browser window where you can view all your tables:
- `admin_settings` - Stores admin PIN
- `Page` - Site pages
- `Brand` - Brand settings
- `Navbar` & `navbar_links` - Navigation
- `Hero` - Hero section
- `Section` - All page sections
- `Footer` & `footer_links` - Footer content
- `ContactSubmission` - Contact form submissions
- `settings` - Global settings
- `images` - Uploaded images/photos

## Step 7: Create Admin Account

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Visit: `http://localhost:3000/admin/login`

3. Enter PIN: `123456` (6 digits)

4. This will create your admin account and log you in.

## Troubleshooting

### "connection refused" or "could not connect"
- Make sure PostgreSQL is running
- Check if the port is 5432 (default)
- Verify username and password are correct

### "password authentication failed"
- Double-check the password in `.env` file
- Make sure you're using the correct PostgreSQL user password

### "database does not exist"
- Create the database first (Step 1)

### Permission errors during `db:generate`
- Stop the dev server completely
- Close any database tools (pgAdmin, etc.)
- Try again

### "EPERM: operation not permitted" during db:generate
- This happens if the dev server is still running
- Stop the dev server (Ctrl+C)
- Close Prisma Studio if open
- Run the command again

## Database Tables Created

After `npm run db:push`, you'll have these tables:

1. **admin_settings** - Admin PIN (hashed)
2. **Page** - Website pages
3. **Brand** - Site branding (colors, logo, name)
4. **Navbar** - Navigation configuration
5. **navbar_links** - Navigation links
6. **Hero** - Hero section content
7. **Section** - All page sections (features, FAQs, etc.)
8. **Footer** - Footer content
9. **footer_links** - Footer links
10. **ContactSubmission** - Contact form submissions
11. **settings** - Global settings (key-value)
12. **images** - Uploaded images/photos

## Next Steps

Once the database is set up:
1. Login to admin panel with PIN: `123456`
2. Start editing your website content
3. Upload images through the admin panel
4. Manage contact form submissions






