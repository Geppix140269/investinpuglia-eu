// File: app/api/trullo-message/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Giuseppe's email
const GIUSEPPE_EMAIL = 'g.funaro@investinpuglia.eu';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message, language, conversationHistory, leadData } = await request.json();

    // Store lead in Supabase
    if (leadData) {
      const { error: dbError } = await supabase
        .from('trullo_leads')
        .insert({
          name,
          email,
          phone,
          message,
          language,
          budget: leadData.budget,
          timeline: leadData.timeline,
          property_type: leadData.property_type,
          purpose: leadData.purpose,
          tags: leadData.tags,
          conversation_history: conversationHistory,
          created_at: new Date().toISOString()
        });

      if (dbError) {
        console.error('Failed to store lead:', dbError);
      }
    }

    // Prepare email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8B5CF6 0%, #10B981 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">New Investment Inquiry</h1>
          <p style="color: white; opacity: 0.9; margin: 10px 0 0 0;">via Trullo AI Assistant</p>
        </div>
        
        <div style="background: #f7f7f7; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Contact Information</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Language:</strong> ${language.toUpperCase()}</p>
          </div>

          ${leadData ? `
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Investment Details</h2>
            ${leadData.budget ? `<p><strong>Budget:</strong> ${leadData.budget}</p>` : ''}
            ${leadData.timeline ? `<p><strong>Timeline:</strong> ${leadData.timeline}</p>` : ''}
            ${leadData.property_type ? `<p><strong>Property Type:</strong> ${leadData.property_type}</p>` : ''}
            ${leadData.purpose ? `<p><strong>Purpose:</strong> ${leadData.purpose}</p>` : ''}
            ${leadData.tags ? `<p><strong>Lead Quality:</strong> <span style="background: #10B981; color: white; padding: 4px 8px; border-radius: 4px;">${leadData.tags}</span></p>` : ''}
          </div>
          ` : ''}

          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Message</h2>
            <p style="line-height: 1.6;">${message}</p>
          </div>

          ${conversationHistory ? `
          <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h3 style="color: #666; margin-top: 0;">Conversation History</h3>
            <pre style="white-space: pre-wrap; font-family: Arial, sans-serif; font-size: 14px; color: #666;">${conversationHistory}</pre>
          </div>
          ` : ''}

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px;">
              This inquiry was generated through the InvestInPuglia.eu AI Assistant<br>
              <a href="https://investinpuglia.eu" style="color: #8B5CF6; text-decoration: none;">www.investinpuglia.eu</a>
            </p>
          </div>
        </div>
      </div>
    `;

    // Send email to Giuseppe with client in CC
    const { data, error } = await resend.emails.send({
      from: 'Trullo AI <noreply@investinpuglia.eu>',
      to: GIUSEPPE_EMAIL,
      cc: email, // CC the client
      subject: `New Investment Inquiry from ${name}`,
      html: emailHtml,
      reply_to: email
    });

    if (error) {
      console.error('Email send error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    // Send confirmation to client
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8B5CF6 0%, #10B981 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Thank You for Your Inquiry!</h1>
        </div>
        
        <div style="background: #f7f7f7; padding: 30px; border-radius: 0 0 10px 10px;">
          <p>Dear ${name},</p>
          <p>Thank you for your interest in investment opportunities in Puglia. Your inquiry has been received and forwarded to Giuseppe Funaro, our CEO and investment advisor.</p>
          <p>Giuseppe will personally review your inquiry and respond within 24 hours with tailored information about:</p>
          <ul>
            <li>EU grant opportunities (up to €2.25M available)</li>
            <li>Property investment options matching your criteria</li>
            <li>Tax benefits and incentives</li>
            <li>Next steps in your investment journey</li>
          </ul>
          <p>In the meantime, you can:</p>
          <p style="text-align: center;">
            <a href="https://calendly.com/investinpuglia/30min" style="background: #8B5CF6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Book a Strategy Call</a>
          </p>
          <p>Best regards,<br>The InvestInPuglia Team</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: 'InvestInPuglia <noreply@investinpuglia.eu>',
      to: email,
      subject: 'Your Investment Inquiry - InvestInPuglia',
      html: confirmationHtml
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      data 
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
