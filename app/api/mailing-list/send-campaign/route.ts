import { NextRequest, NextResponse } from 'next/server';
import { getSubscribedInvestors, recordEmailSent } from '@/lib/firebase-mailing-list';

// Email service configuration (you'll need to set up with your provider)
// Options: SendGrid, Mailchimp, Amazon SES, Resend, etc.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      subject, 
      htmlContent, 
      segment = 'all', 
      testMode = false 
    } = body;

    // Get target recipients
    const investors = await getSubscribedInvestors();
    
    // Apply segmentation
    let recipients = investors;
    if (segment === 'high-intent') {
      // Filter for engaged users (you'd track this in Firebase)
      recipients = investors.filter(i => i.emailsSent && i.emailsSent > 3);
    } else if (segment === 'new') {
      // New subscribers (last 30 days)
      recipients = investors.filter(i => {
        if (i.createdAt) {
          const created = new Date(i.createdAt.seconds * 1000);
          const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
          return created > thirtyDaysAgo;
        }
        return false;
      });
    }

    // Test mode - only send to first 5 recipients
    if (testMode) {
      recipients = recipients.slice(0, 5);
    }

    // Campaign statistics
    const stats = {
      totalRecipients: recipients.length,
      sent: 0,
      failed: 0,
      errors: [] as string[]
    };

    // Send emails (integrate with your email service)
    for (const investor of recipients) {
      try {
        // HERE: Integrate with your email service
        // Example with a generic email API:
        
        /*
        await sendEmail({
          to: investor.email,
          subject: subject,
          html: personalizeContent(htmlContent, investor),
          from: 'invest@investinpuglia.eu',
          replyTo: 'info@investinpuglia.eu'
        });
        */

        // For now, we'll simulate sending
        console.log(`Would send email to: ${investor.email}`);
        
        // Record that email was sent
        if (investor.id) {
          await recordEmailSent(investor.id);
        }
        
        stats.sent++;
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Failed to send to ${investor.email}:`, error);
        stats.failed++;
        stats.errors.push(investor.email);
      }
    }

    return NextResponse.json({
      success: true,
      campaign: {
        subject,
        segment,
        testMode
      },
      stats
    });

  } catch (error) {
    console.error('Campaign send error:', error);
    return NextResponse.json(
      { error: 'Failed to send campaign' },
      { status: 500 }
    );
  }
}

// Helper function to personalize content
function personalizeContent(html: string, investor: any): string {
  return html
    .replace(/\[Name\]/g, investor.name || 'Valued Investor')
    .replace(/\[Email\]/g, investor.email)
    .replace(/\[UnsubscribeLink\]/g, `https://investinpuglia.eu/unsubscribe?email=${investor.email}`);
}