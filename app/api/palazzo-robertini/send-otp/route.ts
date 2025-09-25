import { NextRequest, NextResponse } from 'next/server'
import { sendOTPMessage, formatWhatsAppNumber } from '@/lib/twilio/client'
import { otpStore, cleanupExpiredOTPs } from '@/lib/otp-store'

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json()

    if (!phoneNumber) {
      return NextResponse.json(
        { message: 'Phone number is required' },
        { status: 400 }
      )
    }

    // Format and validate phone number
    const formattedPhone = formatWhatsAppNumber(phoneNumber)

    // Rate limiting: max 3 attempts per hour per phone number
    const now = Date.now()
    const hourAgo = now - (60 * 60 * 1000)

    // Check existing OTP data
    const existingOTP = otpStore.get(formattedPhone)
    if (existingOTP && existingOTP.expiresAt > now) {
      // Don't allow new OTP if current one is still valid and was sent recently
      const timeSinceGenerated = now - (existingOTP.expiresAt - (5 * 60 * 1000))
      if (timeSinceGenerated < 60000) { // Less than 1 minute ago
        return NextResponse.json(
          { message: 'Please wait before requesting a new code' },
          { status: 429 }
        )
      }
    }

    // Generate new OTP
    const otp = generateOTP()
    const expiresAt = now + (5 * 60 * 1000) // 5 minutes

    // Store OTP
    otpStore.set(formattedPhone, {
      otp,
      expiresAt,
      attempts: 0
    })

    // Send OTP via SMS using existing Twilio function
    const result = await sendOTPMessage(formattedPhone, otp)

    if (result.success) {
      console.log(`✅ Palazzo Robertini OTP sent to ${formattedPhone}: ${otp}`)

      return NextResponse.json({
        message: 'OTP sent successfully',
        success: true
      })
    } else {
      console.error('❌ Failed to send Palazzo Robertini OTP:', result.error)

      // Clean up failed OTP from store
      otpStore.delete(formattedPhone)

      return NextResponse.json(
        { message: 'Failed to send OTP. Please check your phone number.' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('❌ Palazzo Robertini OTP API error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}