// PATH: app/api/trullo-message/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { 
      name, 
      email, 
      phone, 
      message, 
      conversationHistory, 
      language, 
      timestamp 
    } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Language labels
    const languageNames: Record<string, string> = {
      en: 'English',
      it: 'Italian',
      fr: 'French',
      de: 'German',
      ar: 'Arabic',
      zh: 'Chinese'
    };

    // Create HTML email content
    const htmlContent = `
      <h2>New Message from Trullo Assistant</h2>
      
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #7c3aed; margin-top: 0;">Contact Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Language:</strong> ${languageNames[language] || language.toUpperCase()}</p>
        <p style="margin-bottom: 0;"><strong>Timestamp:</strong> ${timestamp}</p>
      </div>

      <div style="background: #ddd6fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #7c3aed; margin-top: 0;">Message</h3>
        <p style="white-space: pre-wrap; margin-bottom: 0;">${message}</p>
      </div>

      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #6b7280; margin-top: 0;">Conversation History with Trullo</h3>
        <pre style="white-space: pre-wrap; font-family: Arial, sans-serif; font-size: 14px; margin-bottom: 0;">${conversationHistory}</pre>
      </div>

      <hr style="margin: 30px 0; border: 1px solid #e5e7eb;">
      
      <p style="color: #6b7280; font-size: 12px;">
        This message was sent through the Trullo AI Assistant on investinpuglia.eu
      </p>
    `;

    // Create customer confirmation email
    const customerHtmlContent = `
      <h2>Thank you for contacting Invest in Puglia!</h2>
      
      <p>Dear ${name},</p>
      
      <p>We've received your message and Giuseppe will personally review it within 24 hours.</p>
      
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #7c3aed; margin-top: 0;">Your Message:</h3>
        <p style="white-space: pre-wrap; margin-bottom: 0;">${message}</p>
      </div>
      
      <p>In the meantime, you can:</p>
      <ul>
        <li>Book a direct consultation: <a href="https://calendly.com/investinpuglia/30min">Schedule a call</a></li>
        <li>Visit our website: <a href="https://investinpuglia.eu">investinpuglia.eu</a></li>
        <li>Learn about PIA Turismo grants (up to 50% funding)</li>
      </ul>
      
      <p>We look forward to helping you with your investment in Puglia!</p>
      
      <p>Best regards,<br>
      The Invest in Puglia Team</p>
      
      <hr style="margin: 30px 0; border: 1px solid #e5e7eb;">
      
      <p style="color: #6b7280; font-size: 12px;">
        This is an automated confirmation. Giuseppe will respond personally to your inquiry.
      </p>
    `;

    // Send both emails using Resend
    const [mainEmail, customerEmail] = await Promise.all([
      // Email to Giuseppe
      resend.emails.send({
        from: 'Trullo Assistant <trullo@investinpuglia.eu>',
        to: ['info@investinpuglia.eu'],
        cc: [email], // CC the customer
        reply_to: email, // Changed from replyTo to reply_to
        subject: `New Message from Trullo Chat - ${name} (${languageNames[language] || language.toUpperCase()})`,
        html: htmlContent,
      }),
      // Confirmation email to customer
      resend.emails.send({
        from: 'Invest in Puglia <noreply@investinpuglia.eu>',
        to: [email],
        reply_to: 'info@investinpuglia.eu', // Changed from replyTo to reply_to
        subject: 'Message Received - Invest in Puglia',
        html: customerHtmlContent,
      })
    ]);

    if (mainEmail.error || customerEmail.error) {
      console.error('Resend error:', mainEmail.error || customerEmail.error);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      mainEmailId: mainEmail.data?.id,
      customerEmailId: customerEmail.data?.id 
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
