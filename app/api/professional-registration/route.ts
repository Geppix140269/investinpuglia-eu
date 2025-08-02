// app/api/professional-registration/route.ts
// This file needs BOTH POST (create) and GET (fetch) methods

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET method to fetch registration by token
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token required' },
        { status: 400 }
      );
    }

    // Fetch registration by token
    const { data: registration, error } = await supabase
      .from('professional_registrations')
      .select('*')
      .eq('token', token)
      .single();

    if (error || !registration) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 404 }
      );
    }

    // Check if already completed
    if (registration.completed_at) {
      return NextResponse.json(
        { error: 'Registration already completed' },
        { status: 400 }
      );
    }

    return NextResponse.json({ registration });
  } catch (error) {
    console.error('Error fetching registration:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registration' },
      { status: 500 }
    );
  }
}

// POST method to create new registration
export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if registration already exists
    const { data: existing } = await supabase
      .from('professional_registrations')
      .select('*')
      .eq('email', email)
      .single();

    if (existing && !existing.completed_at) {
      // Return existing registration
      return NextResponse.json({
        success: true,
        message: 'Registration already exists',
        token: existing.token,
        registrationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/register-professional?token=${existing.token}`
      });
    }

    // Generate token
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);

    // Create new registration
    const { data, error } = await supabase
      .from('professional_registrations')
      .insert({
        email,
        name,
        token,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Registration created successfully',
      token: data.token,
      registrationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/register-professional?token=${data.token}`
    });
  } catch (error) {
    console.error('Error creating registration:', error);
    return NextResponse.json(
      { error: 'Failed to create registration' },
      { status: 500 }
    );
  }
}
