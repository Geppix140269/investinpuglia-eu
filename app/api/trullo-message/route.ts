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

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Trullo Assistant <trullo@investinpuglia.eu>', // Update with your verified domain
      to: ['info@investinpuglia.eu'], // Update with Giuseppe's email
      replyTo: email,
      subject: `New Message from Trullo Chat - ${name} (${languageNames[language] || language.toUpperCase()})`,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
