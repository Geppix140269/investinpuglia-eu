// File: middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple password protection for monitor route
const MONITOR_PASSWORD = 'trullo2025' // Change this!

// Locale configurations
const locales = ['en', 'it', 'ar', 'zh', 'de', 'fr']
const defaultLocale = 'en'

const countryToLocale: Record<string, string> = {
  'US': 'en', 'UK': 'en', 'AU': 'en', 'CA': 'en',
  'IT': 'it',
  'SA': 'ar', 'AE': 'ar', 'EG': 'ar',
  'CN': 'zh', 'HK': 'zh', 'TW': 'zh',
  'DE': 'de', 'AT': 'de', 'CH': 'de',
  'FR': 'fr', 'BE': 'fr', 'LU': 'fr'
}

function getLocaleFromCountry(country: string | undefined): string {
  if (!country) return defaultLocale
  return countryToLocale[country] || defaultLocale
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  // Handle trullo-monitor authentication first
  if (pathname.startsWith('/trullo-monitor')) {
    const basicAuth = req.headers.get('authorization')
    
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1]
      const [user, pwd] = atob(authValue).split(':')
      
      if (user === 'admin' && pwd === MONITOR_PASSWORD) {
        return NextResponse.next()
      }
    }
    
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    })
  }

  // For all other routes, handle Supabase auth and locales
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  // Refresh session if expired
  await supabase.auth.getSession()

  // Skip middleware for API routes, static files, and auth callbacks
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/auth') ||
    pathname.includes('.') // static files
  ) {
    return res
  }

  // Handle locale routing
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    // Get country from request headers
    const country = req.geo?.country
    const locale = getLocaleFromCountry(country)
    
    // Redirect to localized path
    const newUrl = new URL(`/${locale}${pathname}`, req.url)
    newUrl.search = req.nextUrl.search
    return NextResponse.redirect(newUrl)
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|auth).*)',
    '/trullo-monitor/:path*',
  ],
}
