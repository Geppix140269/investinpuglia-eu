// PATH: middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple password protection for monitor route
const MONITOR_PASSWORD = 'trullo2025'; // Change this!

export function middleware(request: NextRequest) {
  // Only protect the monitor route
  if (request.nextUrl.pathname.startsWith('/trullo-monitor')) {
    const basicAuth = request.headers.get('authorization');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      if (user === 'admin' && pwd === MONITOR_PASSWORD) {
        return NextResponse.next();
      }
    }

    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/trullo-monitor/:path*',
};
