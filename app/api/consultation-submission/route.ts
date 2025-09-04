// app/api/consultation-submission/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/firebase-admin';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const {
      name,
      email,
      phone,
      budget,
      timeline,
      propertyType,
      location,
      businessPlan,
      grantExperience,
      questionsForUs,
      source,
      campaign,
      timestamp = new Date().toISOString()
    } = data;

    // Save to Firestore database
    const consultationRef = await db.collection('consultation_submissions').add({
      name,
      email,
      phone,
      budget,
      timeline,
      propertyType,
      location,
      businessPlan,
      grantExperience,
      questionsForUs,
      source: source || 'website',
      campaign: campaign || 'direct',
      status: 'new',
      qualified: determineQualification(budget, timeline),
      createdAt: timestamp,
      updatedAt: timestamp
    });

    // Determine if qualified
    const isQualified = determineQualification(budget, timeline);
    
    // Send notification email to admin
    await resend.emails.send({
      from: 'InvestInPuglia <info@1402celsius.com>',
      to: ['info@investinpuglia.eu'],
      cc: ['info@1402celsius.com'],
      subject: `${isQualified ? '🟢 QUALIFIED' : '🟡 NURTURE'} Consultation Request - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">New Consultation Request</h2>
            <p style="color: rgba(255,255,255,0.9); margin: 5px 0;">
              ${isQualified ? '✅ QUALIFIED LEAD' : '📋 NEEDS NURTURING'}
            </p>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px;">
            <h3 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
              Contact Information
            </h3>
            <table style="width: 100%; margin: 20px 0;">
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Name:</strong></td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
                <td style="padding: 8px 0;">
                  <a href="mailto:${email}">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0;">
                  <a href="tel:${phone}">${phone || 'Not provided'}</a>
                </td>
              </tr>
            </table>

            <h3 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-top: 30px;">
              Investment Details
            </h3>
            <table style="width: 100%; margin: 20px 0;">
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Budget:</strong></td>
                <td style="padding: 8px 0;">
                  <span style="background: ${getbudgetColor(budget)}; color: white; padding: 4px 8px; border-radius: 4px;">
                    ${budget}
                  </span>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Timeline:</strong></td>
                <td style="padding: 8px 0;">
                  <span style="background: ${getTimelineColor(timeline)}; color: white; padding: 4px 8px; border-radius: 4px;">
                    ${timeline}
                  </span>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Property Type:</strong></td>
                <td style="padding: 8px 0;">${propertyType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Location:</strong></td>
                <td style="padding: 8px 0;">${location}</td>
              </tr>
            </table>

            <h3 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-top: 30px;">
              Additional Information
            </h3>
            <div style="margin: 20px 0;">
              <p><strong>Business Plan:</strong></p>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
                ${businessPlan || 'Not provided'}
              </div>
              
              <p><strong>Grant Experience:</strong></p>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
                ${grantExperience || 'No previous experience'}
              </div>
              
              <p><strong>Questions for Us:</strong></p>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
                ${questionsForUs || 'No specific questions'}
              </div>
            </div>

            <h3 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-top: 30px;">
              Next Steps
            </h3>
            <div style="background: ${isQualified ? '#e8f5e9' : '#fff3e0'}; padding: 20px; border-radius: 8px; margin: 20px 0;">
              ${isQualified ? `
                <p style="color: #2e7d32; margin: 0 0 10px 0;">
                  <strong>✅ This is a qualified lead!</strong>
                </p>
                <ol style="margin: 10px 0; padding-left: 20px;">
                  <li>Contact within 24 hours</li>
                  <li>Confirm Calendly appointment</li>
                  <li>Prepare grant eligibility assessment</li>
                  <li>Send pre-consultation materials</li>
                </ol>
                <p style="margin-top: 15px;">
                  <a href="https://calendly.com/investinpuglia/30min" 
                     style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    View Calendar
                  </a>
                </p>
              ` : `
                <p style="color: #f57c00; margin: 0 0 10px 0;">
                  <strong>📋 Nurture required</strong>
                </p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li>Add to nurture email sequence</li>
                  <li>Send investment guide</li>
                  <li>Schedule follow-up in 3 months</li>
                </ul>
              `}
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="color: #666; font-size: 12px;">
                Source: ${source || 'website'} | Campaign: ${campaign || 'direct'}<br>
                Submitted: ${new Date(timestamp).toLocaleString()}<br>
                Reference ID: ${consultationRef.id}
              </p>
            </div>
          </div>
        </div>
      `,
      reply_to: email
    });

    // Send confirmation email to user
    if (isQualified) {
      await resend.emails.send({
        from: 'Giuseppe Funaro <info@1402celsius.com>',
        to: [email],
        subject: 'Your FREE Consultation is Confirmed - InvestInPuglia',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Thank you for your interest, ${name}!</h2>
            
            <p>I've received your consultation request and I'm excited to discuss your investment plans in Puglia.</p>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #0369a1;">Your Next Steps:</h3>
              <ol>
                <li><strong>Book Your Time:</strong> Click the link below to schedule your FREE 30-minute consultation</li>
                <li><strong>Prepare:</strong> Have your investment goals and any questions ready</li>
                <li><strong>Join:</strong> We'll meet via Zoom or phone at your chosen time</li>
              </ol>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://calendly.com/investinpuglia/30min" 
                   style="background: #0ea5e9; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                  Schedule Your FREE Consultation
                </a>
              </div>
            </div>
            
            <p>During our call, we'll discuss:</p>
            <ul>
              <li>Your eligibility for EU grants (up to €2.75M)</li>
              <li>Available properties matching your criteria</li>
              <li>Investment timeline and process</li>
              <li>ROI projections and market analysis</li>
            </ul>
            
            <p>Looking forward to speaking with you!</p>
            
            <p>Best regards,<br>
            <strong>Giuseppe Funaro</strong><br>
            Founder & Investment Director<br>
            InvestInPuglia.eu<br>
            📞 +39 351 400 1402<br>
            📧 info@investinpuglia.eu</p>
          </div>
        `
      });
    } else {
      // Send nurture email
      await resend.emails.send({
        from: 'Giuseppe Funaro <info@1402celsius.com>',
        to: [email],
        subject: 'Your Puglia Investment Journey Starts Here',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Thank you for your interest, ${name}!</h2>
            
            <p>I appreciate you taking the time to explore investment opportunities in Puglia.</p>
            
            <p>While you're still in the planning phase, I'd like to share some valuable resources to help you prepare:</p>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Free Resources for You:</h3>
              <ul>
                <li>📚 <a href="https://investinpuglia.eu/mini-pia-guide">Complete Mini PIA Grant Guide</a></li>
                <li>🏠 <a href="https://investinpuglia.eu/properties">Current Investment Properties</a></li>
                <li>💼 <a href="https://investinpuglia.eu/portfolio">Success Stories & Case Studies</a></li>
                <li>🧮 <a href="https://investinpuglia.eu/tools/mini-pia-calculator">Grant Calculator Tool</a></li>
              </ul>
            </div>
            
            <p>When you're ready to move forward (typically when you have a budget of €200K+ and a timeline within 12 months), 
            I'll be here to provide expert guidance and help you access EU grants.</p>
            
            <p>In the meantime, I'll send you occasional updates about:</p>
            <ul>
              <li>New investment opportunities</li>
              <li>Grant deadline reminders</li>
              <li>Market insights and trends</li>
            </ul>
            
            <p>Feel free to reply to this email with any questions!</p>
            
            <p>Best regards,<br>
            <strong>Giuseppe Funaro</strong><br>
            Founder & Investment Director<br>
            InvestInPuglia.eu<br>
            📞 +39 351 400 1402<br>
            📧 info@investinpuglia.eu</p>
          </div>
        `
      });
    }

    return NextResponse.json({
      success: true,
      qualified: isQualified,
      referenceId: consultationRef.id,
      calendlyUrl: isQualified ? 'https://calendly.com/investinpuglia/30min' : null,
      message: isQualified 
        ? 'Qualification complete! You can now book your consultation.'
        : 'Thank you for your interest. We\'ve sent you helpful resources via email.'
    });

  } catch (error) {
    console.error('Error processing consultation submission:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process consultation request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function determineQualification(budget: string, timeline: string): boolean {
  const qualifiedBudgets = [
    '€200,000 - €500,000',
    '€500,000 - €1,000,000',
    '€1,000,000 - €2,000,000',
    'Over €2,000,000'
  ];
  
  const qualifiedTimelines = [
    'Within 3 months',
    '3-6 months',
    '6-12 months'
  ];
  
  return qualifiedBudgets.includes(budget) && qualifiedTimelines.includes(timeline);
}

function getbudgetColor(budget: string): string {
  if (budget.includes('Over €2,000,000')) return '#4caf50';
  if (budget.includes('€1,000,000')) return '#8bc34a';
  if (budget.includes('€500,000')) return '#ff9800';
  if (budget.includes('€200,000')) return '#ff9800';
  return '#9e9e9e';
}

function getTimelineColor(timeline: string): string {
  if (timeline.includes('Within 3 months')) return '#f44336';
  if (timeline.includes('3-6 months')) return '#ff9800';
  if (timeline.includes('6-12 months')) return '#ffc107';
  return '#9e9e9e';
}