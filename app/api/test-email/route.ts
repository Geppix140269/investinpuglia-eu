import { NextRequest, NextResponse } from 'next/server';
import { coldOutreachTemplates } from '@/lib/email-campaigns/cold-outreach-templates';

export async function POST(request: NextRequest) {
  try {
    // Get the first template (introduction email)
    const template = coldOutreachTemplates[0];
    
    // Personalize the email
    const personalizedHtml = template.html
      .replace(/\[Name\]/g, 'Giuseppe')
      .replace(/\[Email\]/g, 'g.funaro@1402celsius.com')
      .replace(/\[UnsubscribeLink\]/g, 'https://investinpuglia.eu/unsubscribe?email=g.funaro@1402celsius.com');
    
    // For testing, we'll return the email content
    // In production, you would integrate with an email service here
    
    const emailData = {
      to: 'g.funaro@1402celsius.com',
      from: 'invest@investinpuglia.eu',
      subject: template.subject,
      html: personalizedHtml,
      preheader: template.preheader
    };
    
    // Log the email for testing
    console.log('Test email prepared for:', emailData.to);
    console.log('Subject:', emailData.subject);
    
    // Since we don't have an email service configured yet,
    // let's create an HTML preview file you can open
    const fs = require('fs').promises;
    const path = require('path');
    const previewPath = path.join(process.cwd(), 'public', 'email-preview.html');
    
    await fs.writeFile(previewPath, personalizedHtml);
    
    return NextResponse.json({
      success: true,
      message: 'Test email prepared successfully',
      preview: '/email-preview.html',
      emailData: {
        to: emailData.to,
        subject: emailData.subject,
        preheader: emailData.preheader
      }
    });
    
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { error: 'Failed to prepare test email' },
      { status: 500 }
    );
  }
}