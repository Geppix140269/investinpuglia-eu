import { NextRequest, NextResponse } from 'next/server'
import { formatWhatsAppNumber } from '@/lib/twilio/client'

// Import the same OTP store from send-otp route
// In production, this should be a shared Redis/database store
declare global {
  var palazzoRobertiniOTPStore: Map<string, {
    otp: string
    expiresAt: number
    attempts: number
  }> | undefined
}

// Use global to persist across hot reloads in development
const otpStore = globalThis.palazzoRobertiniOTPStore ?? new Map<string, {
  otp: string
  expiresAt: number
  attempts: number
}>()

if (process.env.NODE_ENV === 'development') {
  globalThis.palazzoRobertiniOTPStore = otpStore
}

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, otp } = await request.json()

    if (!phoneNumber || !otp) {
      return NextResponse.json(
        { message: 'Phone number and OTP are required' },
        { status: 400 }
      )
    }

    // Format phone number
    const formattedPhone = formatWhatsAppNumber(phoneNumber)

    // Get stored OTP data
    const storedOTPData = otpStore.get(formattedPhone)

    if (!storedOTPData) {
      return NextResponse.json(
        { message: 'No OTP found. Please request a new code.' },
        { status: 404 }
      )
    }

    const now = Date.now()

    // Check if OTP has expired
    if (storedOTPData.expiresAt < now) {
      otpStore.delete(formattedPhone)
      return NextResponse.json(
        { message: 'OTP has expired. Please request a new code.' },
        { status: 410 }
      )
    }

    // Check attempt limit (max 3 attempts per OTP)
    if (storedOTPData.attempts >= 3) {
      otpStore.delete(formattedPhone)
      return NextResponse.json(
        { message: 'Too many attempts. Please request a new code.' },
        { status: 429 }
      )
    }

    // Verify OTP
    if (storedOTPData.otp !== otp.trim()) {
      // Increment attempts
      storedOTPData.attempts += 1
      otpStore.set(formattedPhone, storedOTPData)

      return NextResponse.json(
        {
          message: `Invalid OTP. ${3 - storedOTPData.attempts} attempts remaining.`,
          attemptsRemaining: 3 - storedOTPData.attempts
        },
        { status: 401 }
      )
    }

    // OTP is valid - clean up and grant access
    otpStore.delete(formattedPhone)

    console.log(`✅ Palazzo Robertini access granted to ${formattedPhone}`)

    // In production, you might want to:
    // 1. Create a session token
    // 2. Log the access for audit purposes
    // 3. Store the verified phone number for future access

    return NextResponse.json({
      message: 'OTP verified successfully',
      success: true,
      // You could return a JWT token here for session management
      accessToken: generateAccessToken(formattedPhone)
    })

  } catch (error) {
    console.error('❌ Palazzo Robertini OTP verification error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Simple access token generation (in production, use proper JWT)
function generateAccessToken(phoneNumber: string): string {
  const payload = {
    phone: phoneNumber,
    property: 'palazzo-robertini',
    grantedAt: Date.now(),
    expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  }

  // In production, use proper JWT signing
  return Buffer.from(JSON.stringify(payload)).toString('base64')
}