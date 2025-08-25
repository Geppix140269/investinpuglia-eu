// PATH: app/api/agreements/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    // Get agreement with password hash
    const { data, error } = await supabase
      .from('agreements')
      .select('password_hash')
      .eq('access_token', token)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, data.password_hash);

    if (!isValid) {
      // Log failed attempt
      await supabase
        .from('agreement_logs')
        .insert({
          token,
          action: 'failed_login',
          timestamp: new Date().toISOString(),
          ip_address: request.headers.get('x-forwarded-for') || 'unknown'
        });

      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Log successful access
    await supabase
      .from('agreement_logs')
      .insert({
        token,
        action: 'accessed',
        timestamp: new Date().toISOString(),
        ip_address: request.headers.get('x-forwarded-for') || 'unknown'
      });

    // Update agreement status if first access
    await supabase
      .from('agreements')
      .update({ 
        status: 'viewed',
        first_accessed: new Date().toISOString()
      })
      .eq('access_token', token)
      .eq('status', 'pending');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}