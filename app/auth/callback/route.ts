// PATH: app/auth/callback/route.ts
import { createClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const error_description = requestUrl.searchParams.get('error_description')
  const next = requestUrl.searchParams.get('next') || '/'

  if (error) {
    console.error('OAuth error:', error, error_description)
    return NextResponse.redirect(
      new URL(`${next}?error=${encodeURIComponent(error_description || error)}`, requestUrl.origin)
    )
  }

  if (code) {
    try {
      const supabase = createClient()
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

      const redirectUrl = new URL(next, requestUrl.origin)
      redirectUrl.searchParams.set('trullo_auth', 'success')
      
      const response = NextResponse.redirect(redirectUrl)
      
      if (data?.session) {
        response.cookies.set('supabase-auth-token', data.session.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7
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

  return NextResponse.redirect(
    new URL(`${next}?error=No authorization code received`, requestUrl.origin)
  )
}
