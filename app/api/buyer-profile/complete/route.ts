import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: Request) {
  try {
    const { email, name, profileData } = await request.json()

    // Send welcome email to user
    const { data, error } = await resend.emails.send({
      from: 'Invest in Puglia <info@investinpuglia.eu>',
      to: email,
      subject: 'Welcome to Invest in Puglia - Profile Complete!',
      html: `
        <h1>Welcome ${name}!</h1>
        <p>Thank you for completing your buyer profile.</p>
        <p>Our team will review your preferences and contact you within 24-48 hours with personalized property recommendations.</p>
        <p>In the meantime, you can:</p>
        <ul>
          <li><a href="https://investinpuglia.eu/properties">Browse available properties</a></li>
          <li><a href="https://investinpuglia.eu/calculator">Calculate potential grants</a></li>
          <li><a href="https://calendly.com/investinpuglia/consultation">Schedule a consultation</a></li>
        </ul>
        <p>Best regards,<br>The Invest in Puglia Team</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    // Send notification to admin
    await resend.emails.send({
      from: 'Invest in Puglia <notifications@investinpuglia.eu>',
      to: 'admin@investinpuglia.eu',
      subject: 'New Buyer Profile Submitted',
      html: `
        <h2>New Buyer Profile</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Budget:</strong> ${profileData.budget}</p>
        <p><strong>Timeline:</strong> ${profileData.timeline}</p>
        <p><strong>Purpose:</strong> ${profileData.investmentPurpose}</p>
        <hr>
        <p>Log in to the admin panel to view full details.</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in complete route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
