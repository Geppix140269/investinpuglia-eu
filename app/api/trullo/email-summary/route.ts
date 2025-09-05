import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const LANGUAGE_NAMES = {
  en: 'English',
  it: 'Italian',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  ar: 'Arabic',
  zh: 'Chinese'
};

export async function POST(req: NextRequest) {
  try {
    const { userEmail, conversation, language = 'en' } = await req.json();

    if (!userEmail || !conversation || conversation.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format conversation for email
    const formattedConversation = conversation.map((msg: any) => {
      const time = new Date(msg.timestamp).toLocaleString();
      const sender = msg.sender === 'user' ? 'You' : 'Trullo';
      return `[${time}] ${sender}: ${msg.text}`;
    }).join('\n\n');

    // Create email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 10px 10px; }
            .message { margin: 15px 0; padding: 15px; border-radius: 8px; }
            .user-message { background: #e0f2fe; border-left: 4px solid #0ea5e9; }
            .trullo-message { background: #f0fdf4; border-left: 4px solid #10b981; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; }
            .cta-button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🏛️ Trullo AI Conversation Summary</h2>
              <p>Your investment consultation discussion - ${LANGUAGE_NAMES[language as keyof typeof LANGUAGE_NAMES]}</p>
            </div>
            <div class="content">
              <h3>Conversation Transcript</h3>
              ${conversation.map((msg: any) => {
                const time = new Date(msg.timestamp).toLocaleTimeString();
                const isUser = msg.sender === 'user';
                return `
                  <div class="message ${isUser ? 'user-message' : 'trullo-message'}">
                    <strong>${isUser ? '👤 You' : '🤖 Trullo'}</strong> <span style="color: #6b7280; font-size: 0.9em;">(${time})</span>
                    <p style="margin: 5px 0 0 0;">${msg.text}</p>
                  </div>
                `;
              }).join('')}
              
              <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px;">
                <h3 style="margin-top: 0;">📋 Next Steps</h3>
                <p>Thank you for your interest in investing in Puglia! Based on our conversation, we recommend:</p>
                <ul>
                  <li>Schedule a detailed consultation with our expert team</li>
                  <li>Review the PIA and Mini PIA grant eligibility criteria</li>
                  <li>Prepare your business plan and financial projections</li>
                </ul>
                <div style="text-align: center; margin-top: 20px;">
                  <a href="https://investinpuglia.eu/consultation" class="cta-button">Book Consultation</a>
                  <a href="https://wa.me/393514001402" class="cta-button" style="background: #25d366;">Continue on WhatsApp</a>
                </div>
              </div>
            </div>
            <div class="footer">
              <p>This conversation summary was sent from <strong>Invest in Puglia</strong></p>
              <p>Via Roma 123, Bari, Puglia, Italy | +39 351 400 1402</p>
              <p><a href="https://investinpuglia.eu" style="color: #10b981;">www.investinpuglia.eu</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email via Resend
    await resend.emails.send({
      from: 'Trullo AI <trullo@investinpuglia.eu>',
      to: [userEmail],
      cc: ['info@investinpuglia.eu'], // Copy to admin
      subject: `Your Trullo AI Consultation Summary - ${new Date().toLocaleDateString()}`,
      html: emailHtml,
      text: formattedConversation
    });

    // Also send a copy to info@investinpuglia.eu with full details
    await resend.emails.send({
      from: 'Trullo AI <trullo@investinpuglia.eu>',
      to: ['info@investinpuglia.eu'],
      subject: `🔥 New Trullo Conversation - ${userEmail}`,
      html: `
        <h2>New Trullo AI Conversation</h2>
        <p><strong>User Email:</strong> ${userEmail}</p>
        <p><strong>Language:</strong> ${LANGUAGE_NAMES[language as keyof typeof LANGUAGE_NAMES]}</p>
        <p><strong>Messages:</strong> ${conversation.length}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        ${emailHtml}
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email summary error:', error);
    return NextResponse.json(
      { error: 'Failed to send email summary' },
      { status: 500 }
    );
  }
}