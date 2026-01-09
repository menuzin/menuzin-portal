import { NextResponse } from 'next/server'
import { checkAdminExists } from '@/lib/auth'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const exists = await checkAdminExists()
    return NextResponse.json({ exists })
  } catch (error) {
    console.error('Check setup error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const isDatabaseError = errorMessage.includes('Prisma') || errorMessage.includes('database') || errorMessage.includes('connection')
    
    return NextResponse.json(
      { 
        exists: false,
        error: isDatabaseError ? 'Database not connected. Please run: npm run db:push' : 'Error checking admin setup'
      },
      { status: 500 }
    )
  }
}