// PATH: app/api/agreements/[token]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Get agreement by token
export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { data, error } = await supabase
      .from('agreements')
      .select('*')
      .eq('access_token', params.token)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Agreement not found' }, { status: 404 });
    }

    // Don't send the password hash to the client
    const { password_hash, ...agreementData } = data;

    return NextResponse.json(agreementData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch agreement' }, { status: 500 });
  }
}

// Update agreement
export async function PUT(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const updates = await request.json();
    
    // Update agreement data
    const { error } = await supabase
      .from('agreements')
      .update({
        ...updates,
        status: 'edited',
        last_modified: new Date().toISOString()
      })
      .eq('access_token', params.token);

    if (error) {
      return NextResponse.json({ error: 'Failed to update agreement' }, { status: 500 });
    }

    // Log the edit action
    await supabase
      .from('agreement_logs')
      .insert({
        token: params.token,
        action: 'edited',
        timestamp: new Date().toISOString(),
        ip_address: request.headers.get('x-forwarded-for') || 'unknown',
        changes: JSON.stringify(updates)
      });

    // Send notification email to Giuseppe
    await sendNotificationEmail(
      'info@investinpuglia.eu',
      'Agreement Updated',
      `The agreement for token ${params.token} has been updated by the client.`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update agreement' }, { status: 500 });
  }
}

// Helper function to send emails
async function sendNotificationEmail(to: string, subject: string, body: string) {
  // This would integrate with your email service (SendGrid, AWS SES, etc.)
  // For now, using a placeholder
  console.log(`Email to ${to}: ${subject} - ${body}`);
}