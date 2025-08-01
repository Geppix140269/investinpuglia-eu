// Path: app/api/professional-registration/complete/route.ts
// API route to mark a registration as completed

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// POST - Mark registration as completed
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 });
    }

    // Update registration status
    const { data, error } = await supabase
      .from('professional_registrations')
      .update({ 
        completed: true,
        completed_at: new Date().toISOString()
      })
      .eq('token', token)
      .select()
      .single();

    if (error) {
      console.error('Error updating registration:', error);
      return NextResponse.json({ error: 'Failed to complete registration' }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Registration completed successfully' 
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
