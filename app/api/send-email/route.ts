import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { coldOutreachTemplates } from '@/lib/email-campaigns/cold-outreach-templates';
import { getPersonalizedGreeting } from '@/lib/email-utils/name-extractor';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      templateId = 'introduction-mini-pia',
      recipientEmail = 'g.funaro@1402celsius.com',
      recipientName = 'Giuseppe'
    } = body;

    // Find the template
    const template = coldOutreachTemplates.find(t => t.id === templateId);
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }
    
    // Personalize the email
    const personalizedHtml = template.html
      .replace(/\[Name\]/g, recipientName)
      .replace(/\[Email\]/g, recipientEmail)
      .replace(/\[UnsubscribeLink\]/g, `https://investinpuglia.eu/unsubscribe?email=${encodeURIComponent(recipientEmail)}`);
    
    // Send email using Resend
    const data = await resend.emails.send({
      from: 'InvestInPuglia <invest@investinpuglia.eu>', // You need to verify this domain in Resend
      to: recipientEmail,
      subject: template.subject.replace(/\[Name\]/g, recipientName),
      html: personalizedHtml,
    });
    
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      data: data
    });
    
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}