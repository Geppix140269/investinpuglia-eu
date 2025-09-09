import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  
  // Domain-specific routing based on positioning
  
  // Investment Analysis Focus - investiscope.net
  if (hostname.includes('investiscope.net')) {
    if (!url.pathname.startsWith('/investiscope') && !url.pathname.startsWith('/admin')) {
      if (url.pathname === '/') {
        url.pathname = '/investiscope'
      } else {
        url.pathname = `/investiscope${url.pathname}`
      }
      return NextResponse.rewrite(url)
    }
  }
  
  // Lifestyle/Living Focus - in-puglia.com
  if (hostname.includes('in-puglia.com')) {
    if (!url.pathname.startsWith('/lifestyle') && !url.pathname.startsWith('/admin')) {
      if (url.pathname === '/') {
        url.pathname = '/lifestyle'
      } else {
        url.pathname = `/lifestyle${url.pathname}`
      }
      return NextResponse.rewrite(url)
    }
  }
  
  // Local Expertise Focus - inpuglia.eu
  if (hostname.includes('inpuglia.eu') && !hostname.includes('investinpuglia.eu')) {
    if (!url.pathname.startsWith('/local') && !url.pathname.startsWith('/admin')) {
      if (url.pathname === '/') {
        url.pathname = '/local'
      } else {
        url.pathname = `/local${url.pathname}`
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