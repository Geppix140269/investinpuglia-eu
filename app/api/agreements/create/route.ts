// PATH: app/api/agreements/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const agreementData = await request.json();
    
    // Generate unique token and password
    const token = crypto.randomBytes(32).toString('hex');
    const password = generatePassword();
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create agreement in database
    const { data, error } = await supabase
      .from('agreements')
      .insert({
        access_token: token,
        password_hash: passwordHash,
        client_name: agreementData.clientName,
        client_email: agreementData.clientEmail,
        project_description: agreementData.projectDescription,
        total_investment: agreementData.totalInvestment,
        grant_amount: agreementData.grantAmount,
        service_fee: agreementData.serviceFee,
        start_date: agreementData.startDate,
        completion_date: agreementData.completionDate,
        status: 'pending',
        created_at: new Date().toISOString(),
        created_by: agreementData.createdBy || 'Giuseppe Funaro'
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Send email to client with access details
    await sendClientEmail(
      agreementData.clientEmail,
      agreementData.clientName,
      token,
      password
    );

    // Send notification to Giuseppe
    await sendNotificationEmail(
      'info@investinpuglia.eu',
      'New Agreement Created',
      `A new agreement has been created for ${agreementData.clientName}`
    );

    return NextResponse.json({
      success: true,
      agreementId: data.id,
      accessUrl: `https://investinpuglia.eu/agreement/${token}`,
      message: 'Agreement created and sent to client'
    });

  } catch (error) {
    console.error('Error creating agreement:', error);
    return NextResponse.json({ error: 'Failed to create agreement' }, { status: 500 });
  }
}

// Generate secure password
function generatePassword(): string {
  const length = 12;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

// Send email to client
async function sendClientEmail(email: string, name: string, token: string, password: string) {
  const emailContent = `
    Dear ${name},

    Your Project Management Agreement with Invest in Puglia is ready for review and signature.

    Access your secure agreement portal:
    URL: https://investinpuglia.eu/agreement/${token}
    Password: ${password}

    Please keep this password secure. You will need it to access and sign your agreement.

    The agreement includes:
    - Project scope and deliverables
    - Investment and grant details
    - Payment terms and conditions
    - Timeline and milestones

    Once you review the agreement, you can:
    1. Edit any details that need updating
    2. Digitally sign the agreement using DocuSign
    3. Download a PDF copy for your records

    If you have any questions, please don't hesitate to contact us.

    Best regards,
    Giuseppe Funaro
    Invest in Puglia
    +39 351 901 2974
    info@investinpuglia.eu
  `;

  // This would integrate with your email service
  console.log(`Email sent to ${email}:`, emailContent);
}

// Send notification email
async function sendNotificationEmail(to: string, subject: string, body: string) {
  // Email service integration
  console.log(`Notification sent to ${to}: ${subject} - ${body}`);
}