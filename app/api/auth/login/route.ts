import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPin, verifyPin, getAdminSettings, checkAdminExists, updateAdminPin } from '@/lib/auth'
import { z } from 'zod'

export const runtime = 'nodejs'

const PIN_ATTEMPTS_KEY = 'pin_attempts'
const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

// Simple in-memory rate limiting (for production, use Redis or DB)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + LOCKOUT_DURATION })
    return true
  }

  if (record.count >= MAX_ATTEMPTS) {
    return false
  }

  record.count++
  return true
}

function resetRateLimit(ip: string) {
  rateLimitMap.delete(ip)
}

const loginSchema = z.object({
  pin: z.string().length(6).regex(/^\d+$/, 'PIN must be 6 digits'),
  isSetup: z.boolean().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Test database connection first
    try {
      await prisma.$connect()
    } catch (dbError) {
      console.error('Database connection error:', dbError)
      return NextResponse.json(
        { 
          error: 'Database connection failed. Please check your DATABASE_URL in .env file and ensure PostgreSQL is running.',
          details: process.env.NODE_ENV === 'development' ? (dbError instanceof Error ? dbError.message : String(dbError)) : undefined
        },
        { status: 500 }
      )
    }

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    
    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { pin, isSetup } = loginSchema.parse(body)

    // Handle setup flow
    if (isSetup) {
      const adminExists = await checkAdminExists()
      if (adminExists) {
        return NextResponse.json(
          { error: 'Admin already exists. Please login.' },
          { status: 400 }
        )
      }

      // Create admin with hashed PIN
      const pinHash = await hashPin(pin)
      await updateAdminPin(pinHash)

      resetRateLimit(ip)

      const response = NextResponse.json({ success: true })
      response.cookies.set('admin_session', 'valid', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60, // 30 days
      })

      return response
    }

    // Handle login flow
    const settings = await getAdminSettings()
    if (!settings) {
      return NextResponse.json(
        { error: 'No admin found. Please complete setup.' },
        { status: 404 }
      )
    }

    const isValid = await verifyPin(pin, settings.pinHash)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid PIN' },
        { status: 401 }
      )
    }

    resetRateLimit(ip)

    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_session', 'valid', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    })

    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Login error:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    
    // Provide more detailed error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined
    const isDatabaseError = errorMessage.includes('Prisma') || errorMessage.includes('database') || errorMessage.includes('connection') || errorMessage.includes('P1001') || errorMessage.includes('P1000')
    
    return NextResponse.json(
      { 
        error: isDatabaseError 
          ? 'Database connection error. Please check your DATABASE_URL in .env file and ensure PostgreSQL is running.'
          : 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
        stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
      },
      { status: 500 }
    )
  }
}