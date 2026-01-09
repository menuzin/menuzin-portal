import { PrismaClient } from '@prisma/client'

// Validate DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  throw new Error(
    '❌ DATABASE_URL is not set in environment variables.\n\n' +
    'Please ensure:\n' +
    '1. A .env file exists in the project root (same level as package.json)\n' +
    '2. The .env file contains: DATABASE_URL="postgresql://user:password@host:port/database?schema=public"\n' +
    '3. For Vercel: Add DATABASE_URL to Environment Variables in Vercel dashboard\n' +
    '4. Restart the dev server after creating/updating .env file\n\n' +
    'See .env.example for a template.'
  )
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Singleton pattern to prevent multiple Prisma Client instances in development
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
