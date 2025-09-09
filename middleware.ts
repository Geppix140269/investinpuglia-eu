import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  
  // Domain-based routing for mini PIA focused content
  const miniPiaDomains = [
    'investiscope.net',
    'www.investiscope.net',
    'in-puglia.com',
    'www.in-puglia.com',
    'inpuglia.eu',
    'www.inpuglia.eu'
  ]
  
  // Check if the request is from a mini PIA domain
  if (miniPiaDomains.some(domain => hostname.includes(domain))) {
    // If not already on /minipia path, rewrite to it
    if (!url.pathname.startsWith('/minipia') && !url.pathname.startsWith('/admin')) {
      // Handle root path
      if (url.pathname === '/') {
        url.pathname = '/minipia'
      } else {
        // Handle other paths by prepending /minipia
        url.pathname = `/minipia${url.pathname}`
      }
      return NextResponse.rewrite(url)
    }
  }
  
  // Check if the request is for an admin route (excluding login)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    // Check for admin session cookie
    const session = request.cookies.get('admin_session');
    
    // If no session, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // Main domain uses new trust-centered positioning by default
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    "/((?!_next|api|favicon.ico|.*\\..*|auth).*)",
  ],
}