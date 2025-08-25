// PATH: app/api/admin/auth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// Admin credentials - CHANGE THESE IN PRODUCTION!
const ADMIN_USERNAME = 'giuseppe';
const ADMIN_PASSWORD = '1402Celsius!'; // Change this password!

// Generate secure session token
function generateSessionToken() {
  return crypto.randomBytes(32).toString('hex');
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    // Check credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = generateSessionToken();
      
      // Set secure cookie
      cookies().set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      });
      
      return NextResponse.json({ 
        success: true,
        message: 'Login successful'
      });
    }
    
    return NextResponse.json({ 
      success: false,
      error: 'Invalid credentials' 
    }, { status: 401 });
    
  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: 'Authentication failed' 
    }, { status: 500 });
  }
}

export async function DELETE() {
  // Logout - clear cookie
  cookies().delete('admin_session');
  return NextResponse.json({ success: true });
}

export async function GET() {
  // Check if logged in
  const session = cookies().get('admin_session');
  return NextResponse.json({ 
    authenticated: !!session?.value 
  });
}