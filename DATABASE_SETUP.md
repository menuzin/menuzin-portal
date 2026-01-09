# Database Setup Instructions

## Step 1: Create .env File

Create a `.env` file in the root directory with the following content:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/menufy?schema=public"

# Node Environment
NODE_ENV="development"
```

**Important:** Replace the DATABASE_URL with your actual PostgreSQL connection string:
- **Username**: Replace `user` with your PostgreSQL username
- **Password**: Replace `password` with your PostgreSQL password
- **Host**: Replace `localhost` if using a remote database
- **Port**: Default is `5432`
- **Database name**: Replace `menufy` with your desired database name

### Example connection strings:

**Local PostgreSQL:**
```
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/menufy?schema=public"
```

**Supabase (Cloud):**
```
DATABASE_URL="postgresql://postgres.xxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?schema=public"
```

**Railway:**
```
DATABASE_URL="postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway"
```

## Step 2: Create the Database

If using local PostgreSQL, create the database first:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE menufy;

# Exit
\q
```

Or if you have a different database setup, create the database using your preferred method.

## Step 3: Generate Prisma Client

```bash
npm run db:generate
```

## Step 4: Push Schema to Database

This will create all the tables in your database:

```bash
npm run db:push
```

## Step 5: Verify Setup

After pushing, you can verify the tables were created:

```bash
npm run db:studio
```

This opens Prisma Studio where you can view and edit your database tables.

## Troubleshooting

### Permission Errors
If you get permission errors during `db:generate`, try:
1. Stop the dev server (Ctrl+C)
2. Close any database tools
3. Run the command again

### Connection Errors
- Verify PostgreSQL is running
- Check DATABASE_URL format is correct
- Ensure database exists before running `db:push`
- Verify username/password are correct

### Database Doesn't Exist
Make sure to create the database first before running `db:push`.






