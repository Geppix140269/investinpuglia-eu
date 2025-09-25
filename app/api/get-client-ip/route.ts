import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Try multiple headers to get the real client IP
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const cfConnectingIp = request.headers.get('cf-connecting-ip') // Cloudflare

    let clientIp = ''

    if (forwarded) {
      // x-forwarded-for can contain multiple IPs, take the first one
      clientIp = forwarded.split(',')[0].trim()
    } else if (realIp) {
      clientIp = realIp
    } else if (cfConnectingIp) {
      clientIp = cfConnectingIp
    } else {
      // Fallback to request IP (might be localhost in development)
      clientIp = request.ip || 'unknown'
    }

    // Additional headers for legal compliance logging
    const userAgent = request.headers.get('user-agent') || ''
    const acceptLanguage = request.headers.get('accept-language') || ''
    const referer = request.headers.get('referer') || ''

    return NextResponse.json({
      ip: clientIp,
      timestamp: new Date().toISOString(),
      userAgent,
      acceptLanguage,
      referer,
      // Include geolocation info if needed (requires additional service)
      headers: {
        'x-forwarded-for': forwarded,
        'x-real-ip': realIp,
        'cf-connecting-ip': cfConnectingIp
      }
    })

  } catch (error) {
    console.error('Error getting client IP:', error)
    return NextResponse.json(
      {
        ip: 'unknown',
        error: 'Could not determine client IP',
        timestamp: new Date().toISOString()
      },
      { status: 200 } // Still return 200 since IP is not critical for functionality
    )
  }
}