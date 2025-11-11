import { NextRequest, NextResponse } from 'next/server'
import { getResendClient } from '@/lib/resend-client'


export async function POST(request: NextRequest) {
  try {
    const { fullName, email, phoneNumber, documentTitle, documentId } = await request.json()

    if (!fullName || !email || !documentTitle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Europe/Rome',
      dateStyle: 'full',
      timeStyle: 'long'
    })

    // Send confirmation email to the user
    const resend = getResendClient(); const userEmail = await resend.emails.send({
      from: 'InvestInPuglia <noreply@investinpuglia.eu>',
      to: email,
      subject: `Confidential Document Access Confirmed - ${documentTitle}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #d97706 0%, #ea580c 100%); padding: 40px 30px; text-align: center;">
      <div style="background-color: rgba(255, 255, 255, 0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </div>
      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Confidential Access Confirmed</h1>
      <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">Document Viewing Agreement</p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">
      <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
        Dear <strong>${fullName}</strong>,
      </p>

      <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
        This email confirms that you have accessed the following confidential document:
      </p>

      <!-- Document Info Box -->
      <div style="background-color: #fef3c7; border-left: 4px solid #d97706; padding: 20px; margin: 30px 0; border-radius: 8px;">
        <h2 style="margin: 0 0 10px; color: #92400e; font-size: 18px; font-weight: 600;">Document Details</h2>
        <p style="margin: 5px 0; color: #78350f; font-size: 14px;"><strong>Title:</strong> ${documentTitle}</p>
        <p style="margin: 5px 0; color: #78350f; font-size: 14px;"><strong>Access Time:</strong> ${timestamp}</p>
        <p style="margin: 5px 0; color: #78350f; font-size: 14px;"><strong>Verified Contact:</strong> ${phoneNumber || email}</p>
      </div>

      <!-- Confidentiality Notice -->
      <div style="background-color: #fee2e2; border: 2px solid #ef4444; padding: 20px; margin: 30px 0; border-radius: 8px;">
        <h3 style="margin: 0 0 10px; color: #991b1b; font-size: 16px; font-weight: 600; display: flex; align-items: center;">
          <span style="margin-right: 8px;">⚠️</span> Confidentiality Agreement
        </h3>
        <p style="margin: 0 0 10px; color: #7f1d1d; font-size: 14px; line-height: 1.6;">
          By accessing this document, you acknowledge and agree to the following:
        </p>
        <ul style="margin: 0; padding-left: 20px; color: #7f1d1d; font-size: 14px; line-height: 1.8;">
          <li>The document contains confidential and proprietary information</li>
          <li>You will not copy, reproduce, or distribute the document contents</li>
          <li>You will not share access credentials or links with unauthorized parties</li>
          <li>You will use the information solely for evaluation purposes</li>
          <li>You understand that unauthorized disclosure may result in legal action</li>
        </ul>
      </div>

      <p style="margin: 30px 0 0; color: #374151; font-size: 14px; line-height: 1.6;">
        This confirmation serves as a legal record of your access and agreement to maintain confidentiality regarding the disclosed information.
      </p>

      <p style="margin: 20px 0 0; color: #374151; font-size: 14px; line-height: 1.6;">
        If you have any questions or concerns, please contact us immediately.
      </p>

      <!-- Contact Info -->
      <div style="margin-top: 30px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">Best regards,</p>
        <p style="margin: 0; color: #111827; font-size: 16px; font-weight: 600;">InvestInPuglia Team</p>
        <p style="margin: 5px 0 0; color: #6b7280; font-size: 14px;">
          <a href="https://investinpuglia.eu" style="color: #d97706; text-decoration: none;">investinpuglia.eu</a>
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0 0 10px; color: #6b7280; font-size: 12px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2" style="display: inline; vertical-align: middle; margin-right: 4px;">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        This is a confidential communication from InvestInPuglia
      </p>
      <p style="margin: 0; color: #9ca3af; font-size: 12px;">
        © ${new Date().getFullYear()} InvestInPuglia. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
      `
    })

    // Send notification to admin
    const adminEmail = await resend.emails.send({
      from: 'InvestInPuglia <noreply@investinpuglia.eu>',
      to: 'g.funaro@investinpuglia.eu',
      subject: `🔒 Document Access: ${documentTitle}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h2 style="color: #111827; margin: 0 0 20px;">🔒 Confidential Document Accessed</h2>

    <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
      <h3 style="margin: 0 0 15px; color: #374151;">User Information</h3>
      <p style="margin: 5px 0; color: #4b5563;"><strong>Name:</strong> ${fullName}</p>
      <p style="margin: 5px 0; color: #4b5563;"><strong>Email:</strong> ${email}</p>
      <p style="margin: 5px 0; color: #4b5563;"><strong>Phone:</strong> ${phoneNumber || 'Not provided'}</p>
    </div>

    <div style="background-color: #fef3c7; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
      <h3 style="margin: 0 0 15px; color: #78350f;">Document Details</h3>
      <p style="margin: 5px 0; color: #92400e;"><strong>Document:</strong> ${documentTitle}</p>
      <p style="margin: 5px 0; color: #92400e;"><strong>Document ID:</strong> ${documentId}</p>
      <p style="margin: 5px 0; color: #92400e;"><strong>Access Time:</strong> ${timestamp}</p>
    </div>

    <p style="color: #6b7280; font-size: 14px; margin: 20px 0 0;">
      The user has been sent a confidentiality confirmation email and has agreed to the terms of access.
    </p>
  </div>
</body>
</html>
      `
    })

    return NextResponse.json({
      success: true,
      userEmailId: userEmail.data?.id,
      adminEmailId: adminEmail.data?.id
    })

  } catch (error: any) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: 'Failed to send confirmation email', details: error.message },
      { status: 500 }
    )
  }
}