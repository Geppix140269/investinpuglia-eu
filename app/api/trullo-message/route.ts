// PATH: app/api/trullo-message/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EXPERT_DIRECTORY } from '@/components/trullo/knowledge/core/expert-directory';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Giuseppe's email - CRITICAL
const GIUSEPPE_EMAIL = 'g.funaro@investinpuglia.eu';

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      message,
      conversationHistory,
      language,
      timestamp,
      // New fields for better lead tracking
      budget,
      timeline,
      propertyType,
      purpose
    } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store lead in Supabase with enhanced data
    try {
      const { error: dbError } = await supabase
        .from('trullo_contact_requests')
        .insert({
          name,
          email,
          phone: phone || null,
          message,
          language: language || 'en',
          budget: budget || null,
          timeline: timeline || null,
          property_type: propertyType || null,
          purpose: purpose || null,
          conversation_history: conversationHistory || null,
          created_at: new Date().toISOString()
        });

      if (dbError) {
        console.error('Supabase storage error:', dbError);
        // Continue with email even if storage fails
      }
    } catch (storageError) {
      console.error('Failed to store in Supabase:', storageError);
      // Continue with email
    }

    // Language labels
    const languageNames: Record<string, string> = {
      en: 'English',
      it: 'Italian',
      es: 'Spanish',
      fr: 'French',
      de: 'German',
      ar: 'Arabic',
      zh: 'Chinese'
    };

    // Create enhanced HTML email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8B5CF6 0%, #10B981 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">New Investment Inquiry</h1>
          <p style="color: white; opacity: 0.9; margin: 10px 0 0 0;">via Trullo AI Assistant</p>
        </div>
        
        <div style="background: #f3f4f6; padding: 30px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #7c3aed; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Language:</strong> ${languageNames[language] || language?.toUpperCase() || 'English'}</p>
            <p><strong>Timestamp:</strong> ${timestamp || new Date().toISOString()}</p>
          </div>

          ${(budget || timeline || propertyType || purpose) ? `
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #7c3aed; margin-top: 0;">Investment Details</h3>
            ${budget ? `<p><strong>Budget Range:</strong> ${budget}</p>` : ''}
            ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
            ${propertyType ? `<p><strong>Property Type Interest:</strong> ${propertyType}</p>` : ''}
            ${purpose ? `<p><strong>Investment Purpose:</strong> ${purpose}</p>` : ''}
          </div>
          ` : ''}

          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #7c3aed; margin-top: 0;">Message</h3>
            <div style="white-space: pre-wrap;">${message}</div>
          </div>

          ${conversationHistory ? `
          <div style="background: #e5e7eb; padding: 20px; border-radius: 8px;">
            <h3 style="color: #6b7280; margin-top: 0;">Conversation History</h3>
            <pre style="white-space: pre-wrap; font-family: Arial, sans-serif; font-size: 14px; color: #374151; max-height: 400px; overflow-y: auto;">${conversationHistory}</pre>
          </div>
          ` : ''}

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This inquiry was generated through the InvestInPuglia.eu AI Assistant<br>
              <a href="https://investinpuglia.eu" style="color: #7c3aed; text-decoration: none;">www.investinpuglia.eu</a>
            </p>
          </div>
        </div>
      </div>
    `;

    // Send email to Giuseppe with client in CC
    const { data, error } = await resend.emails.send({
      from: 'Trullo AI Assistant <noreply@investinpuglia.eu>',
      to: GIUSEPPE_EMAIL,
      cc: email, // CC the client
      subject: `New Investment Inquiry from ${name} - InvestInPuglia`,
      html: htmlContent,
      reply_to: email,
      headers: {
        'X-Entity-Ref-ID': new Date().getTime().toString(),
      }
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    // Send confirmation email to client
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8B5CF6 0%, #10B981 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Thank You for Your Inquiry!</h1>
        </div>
        
        <div style="background: #f7f7f7; padding: 30px;">
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
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://calendly.com/investinpuglia/30min" style="background: #8B5CF6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Book a 30-Min Strategy Call</a>
          </div>
          
          <p>We look forward to helping you discover the investment potential of Puglia!</p>
          
          <p>Best regards,<br>
          <strong>The InvestInPuglia Team</strong></p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            InvestInPuglia.eu | Your Gateway to EU Grants & Property Investment<br>
            <a href="https://investinpuglia.eu" style="color: #7c3aed;">www.investinpuglia.eu</a>
          </p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: 'InvestInPuglia <noreply@investinpuglia.eu>',
      to: email,
      subject: 'Your Investment Inquiry Received - InvestInPuglia',
      html: confirmationHtml
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Emails sent successfully to Giuseppe and client',
      emailId: data?.id 
    });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

