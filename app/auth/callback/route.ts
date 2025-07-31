// PATH: app/auth/callback/route.ts
import { createClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Get the code from the URL
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const error_description = requestUrl.searchParams.get('error_description')
  // IMPORTANT: Default to home page, not buyer-profile
  const next = requestUrl.searchParams.get('next') || '/'

  // Handle errors from OAuth provider
  if (error) {
    console.error('OAuth error:', error, error_description)
    return NextResponse.redirect(
      new URL(`${next}?error=${encodeURIComponent(error_description || error)}`, requestUrl.origin)
    )
  }

  // If we have a code, exchange it for a session
  if (code) {
    try {
      const supabase = createClient()
      
      // Exchange the code for a session
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Error exchanging code for session:', exchangeError)
        return NextResponse.redirect(
          new URL(`${next}?error=Failed to authenticate`, requestUrl.origin)
        )
      }

      if (data?.session) {
        console.log('Session created successfully for:', data.session.user.email)
      }

      // Successful authentication - redirect back to the original page
      // Add query parameter to signal chat should reopen
      const redirectUrl = new URL(next, requestUrl.origin)
      redirectUrl.searchParams.set('trullo_auth', 'success')
      
      const response = NextResponse.redirect(redirectUrl)
      
      // Set cookie manually to ensure it's properly set
      if (data?.session) {
        response.cookies.set('supabase-auth-token', data.session.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7 // 7 days
        })
      }
      
      return response
    } catch (err) {
      console.error('Unexpected error during auth callback:', err)
      return NextResponse.redirect(
        new URL(`${next}?error=Authentication failed`, requestUrl.origin)
      )
    }
  }

  // No code present, redirect to home with error
  return NextResponse.redirect(
    new URL(`${next}?error=No authorization code received`, requestUrl.origin)
  )
}
