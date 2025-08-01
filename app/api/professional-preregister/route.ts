import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { name, email, profession, city, sessionId } = await request.json();
    
    // Create pre-registration
    const { data, error } = await supabase
      .from('professional_registrations')
      .insert({
        name,
        email,
        profession,
        city,
        chat_session_id: sessionId,
        status: 'pending'
      })
      .select()
      .single();
      
    if (error) {
      // Check for duplicate email
      if (error.code === '23505') {
        return NextResponse.json({ 
          error: 'Email already registered',
          code: 'EMAIL_EXISTS'
        }, { status: 400 });
      }
      
      console.error('Registration error:', error);
      return NextResponse.json({ 
        error: 'Registration failed',
        details: error.message 
      }, { status: 400 });
    }
    
    // TODO: Send confirmation email
    // await sendConfirmationEmail(email, name, data.confirmation_token);
    
    return NextResponse.json({ 
      success: true,
      message: 'Registration successful',
      data 
    });
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
