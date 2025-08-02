// File: app/api/verify-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email, action } = await request.json();
    
    if (action === 'send-code') {
      // Generate 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store in Supabase with expiry
      await supabase.from('email_verifications').insert({
        email,
        code,
        expires_at: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
      });
      
      // Send verification email
      await resend.emails.send({
        from: 'InvestInPuglia <noreply@investinpuglia.eu>',
        to: email,
        subject: 'Verify Your Email - InvestInPuglia',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Verify Your Email</h2>
            <p>Your verification code is:</p>
            <h1 style="background: #f0f0f0; padding: 20px; text-align: center; letter-spacing: 5px;">
              ${code}
            </h1>
            <p>This code expires in 10 minutes.</p>
          </div>
        `
      });
      
      return NextResponse.json({ success: true });
    }
    
    if (action === 'verify-code') {
      const { code } = await request.json();
      
      // Check code validity
      const { data } = await supabase
        .from('email_verifications')
        .select('*')
        .eq('email', email)
        .eq('code', code)
        .gt('expires_at', new Date().toISOString())
        .single();
      
      if (data) {
        // Register user
        await supabase.from('verified_users').upsert({
          email,
          verified_at: new Date().toISOString()
        });
        
        return NextResponse.json({ success: true, verified: true });
      }
      
      return NextResponse.json({ success: false, error: 'Invalid code' });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
