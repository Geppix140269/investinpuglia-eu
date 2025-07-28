// app/auth/callback/route.ts
import { createClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Get the code from the URL
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const error_description = requestUrl.searchParams.get('error_description')

  // Handle errors from OAuth provider
  if (error) {
    console.error('OAuth error:', error, error_description)
    return NextResponse.redirect(
      new URL(`/buyer-profile?error=${encodeURIComponent(error_description || error)}`, requestUrl.origin)
    )
  }

  // If we have a code, exchange it for a session
  if (code) {
    try {
      const supabase = createClient()
      
      // Exchange the code for a session
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Error exchanging code for session:', exchangeError)
        return NextResponse.redirect(
          new URL('/buyer-profile?error=Failed to authenticate', requestUrl.origin)
        )
      }

      // Successful authentication - redirect back to buyer profile
      return NextResponse.redirect(new URL('/buyer-profile', requestUrl.origin))
    } catch (err) {
      console.error('Unexpected error during auth callback:', err)
      return NextResponse.redirect(
        new URL('/buyer-profile?error=Authentication failed', requestUrl.origin)
      )
    }
  }

  // No code present, redirect to buyer profile with error
  return NextResponse.redirect(
    new URL('/buyer-profile?error=No authorization code received', requestUrl.origin)
  )
}
