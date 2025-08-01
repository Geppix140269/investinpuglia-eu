// Path: app/api/professional-registration/route.ts
// API route for handling professional registrations from Trullo

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import crypto from 'crypto';

// Initialize services
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(process.env.RESEND_API_KEY);

// POST - Create registration and send email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Generate unique token
    const token = crypto.randomBytes(32).toString('hex');
    
    // Prepare initial data
    const initialData = {
      name: body.name,
      type: body.type,
      email: body.email,
      phone: body.phone || '',
      location: body.location || '',
      languages: body.languages || [],
      specialties: body.specialties || [],
      description: body.description || '',
      fromTrullo: true
    };

    // Save registration
    const { data: registration, error: dbError } = await supabase
      .from('professional_registrations')
      .insert([{
        token,
        email: body.email,
        initial_data: initialData,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 });
    }

    // Create registration link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://investinpuglia.eu';
    const registrationLink = `${baseUrl}/register-professional?token=${token}`;

    // Send email
    const { error: emailError } = await resend.emails.send({
      from: 'InvestInPuglia <noreply@investinpuglia.eu>',
      to: body.email,
      subject: 'Complete Your Professional Profile on InvestInPuglia',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0d9488;">Welcome to InvestInPuglia Professional Directory!</h1>
          
          <p>Hello ${body.name},</p>
          
          <p>Thank you for your interest in joining our professional directory. We're excited to help connect you with potential clients looking for ${body.type} services in Puglia.</p>
          
          <h2 style="color: #0d9488;">Complete Your Profile</h2>
          <p>Click the button below to complete your professional profile. This link will expire in 7 days.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${registrationLink}" style="background-color: #0d9488; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Complete My Profile
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">Or copy and paste this link: ${registrationLink}</p>
          
          <h3>What happens next?</h3>
          <ul>
            <li>Complete your profile with additional details</li>
            <li>Upload your photo and credentials</li>
            <li>Your profile will be reviewed and activated within 24 hours</li>
            <li>Start receiving inquiries from potential clients</li>
          </ul>
          
          <p>If you have any questions, feel free to reply to this email.</p>
          
          <p>Best regards,<br>The InvestInPuglia Team</p>
        </div>
      `
    });

    if (emailError) {
      console.error('Email error:', emailError);
      // Don't fail the request if email fails - admin can resend
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Registration created successfully',
      token: token // Only for testing, remove in production
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET - Validate token and return initial data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('professional_registrations')
      .select('*')
      .eq('token', token)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 404 });
    }

    if (data.completed) {
      return NextResponse.json({ error: 'Registration already completed' }, { status: 400 });
    }

    if (new Date(data.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Token expired' }, { status: 400 });
    }

    return NextResponse.json({
      valid: true,
      initialData: data.initial_data
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
