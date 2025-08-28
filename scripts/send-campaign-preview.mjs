import { Resend } from 'resend';

// Initialize Resend with your API key
const RESEND_API_KEY = 're_WoQwLg5D_Lsgj238sCTppCyVVKoTxTc4R';
const resend = new Resend(RESEND_API_KEY);

// This is the actual email template that will be sent to your 287 contacts
const miniPIAIntroductionTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Unlock 50% Grant Funding for Your Italian Dream</h1>
      <p style="color: #e0e7ff; margin: 10px 0 0 0;">EU Mini PIA Grants - Now Available for International Investors</p>
    </div>
    
    <!-- Body -->
    <div style="padding: 30px;">
      <p style="font-size: 16px; margin-bottom: 20px;">Dear [This will be personalized],</p>
      
      <p style="font-size: 16px; margin-bottom: 20px;">
        You may not know us yet, but we've been helping international investors access millions in EU grants for over 30 years.
      </p>
      
      <p style="font-size: 16px; margin-bottom: 20px;">
        <strong>Who we are:</strong> InvestInPuglia is a specialized advisory firm with a team of technical and business experts 
        who have secured over €50M in Regional and EU grants for property investments in Puglia, Italy.
      </p>
      
      <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0;">
        <h2 style="color: #1e40af; margin: 0 0 10px 0; font-size: 20px;">The Mini PIA Grant Opportunity</h2>
        <p style="margin: 10px 0;">
          The Mini PIA is an Italian Regional grant program offering <strong>50% non-refundable funding</strong> 
          for property investments in Puglia - from €30,000 to €2.75 million.
        </p>
        <ul style="margin: 10px 0;">
          <li>Hotels, B&Bs, and tourist accommodations</li>
          <li>Restaurants and hospitality businesses</li>
          <li>Manufacturing and technology ventures</li>
          <li>Historic property renovations (including Trulli)</li>
        </ul>
        <div style="background: #fee2e2; border: 1px solid #ef4444; border-radius: 6px; padding: 10px; margin: 15px 0;">
          <p style="margin: 5px 0; color: #991b1b; font-weight: bold;">
            ⏰ URGENT: Mini PIA ends in 2027 - First Come, First Served!
          </p>
          <p style="margin: 5px 0; color: #991b1b; font-size: 14px;">
            Limited funds remaining • Applications processed in order received
          </p>
        </div>
      </div>
      
      <p style="font-size: 16px; margin-bottom: 20px;">
        <strong>Why reach out now?</strong> The next application window closes soon, and preparation takes 4-6 weeks.
      </p>
      
      <div style="background: #fefce8; border: 1px solid #facc15; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h3 style="color: #854d0e; margin: 0 0 10px 0;">Our Expertise at Your Service:</h3>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>✅ 30+ years experience in EU/Regional grants</li>
          <li>✅ 95% grant approval success rate</li>
          <li>✅ Complete application management</li>
          <li>✅ Property sourcing and due diligence</li>
          <li>✅ AI Assistant "Trullo" for 24/7 support</li>
        </ul>
      </div>
      
      <p style="font-size: 16px; margin-bottom: 20px;">
        <strong>Free Tools to Get Started:</strong>
      </p>
      <ul style="margin-bottom: 20px;">
        <li>🧮 <a href="https://investinpuglia.eu/tools" style="color: #3b82f6;">InvestiScope Calculator</a> - Calculate your grant eligibility instantly</li>
        <li>🤖 <a href="https://investinpuglia.eu" style="color: #3b82f6;">Meet Trullo</a> - Our AI assistant for immediate answers</li>
        <li>📊 <a href="https://investinpuglia.eu/portfolio" style="color: #3b82f6;">View Our Portfolio</a> - €50M+ in successful projects</li>
      </ul>
      
      <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
        <p style="font-size: 18px; margin: 0 0 15px 0; font-weight: bold;">
          Ready to Secure Your Mini PIA Grant?
        </p>
        <p style="margin: 0 0 10px 0;">
          Professional consultation with Giuseppe Funaro<br>
          30+ years of grant expertise • 95% success rate
        </p>
        <div style="background: white; border-radius: 6px; padding: 15px; margin: 15px 0;">
          <p style="margin: 5px 0; color: #4b5563;">
            <strong>Investment in Expert Guidance:</strong><br>
            30 minutes: €60 | 1 hour: €100
          </p>
          <p style="margin: 10px 0 5px 0; font-size: 14px; color: #10b981; font-weight: bold;">
            💡 Most clients recover this fee 100x through grant savings
          </p>
        </div>
        <a href="https://investinpuglia.eu/book-consultation?source=email&campaign=introduction" 
           style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                  color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; 
                  font-weight: bold; margin-top: 10px;">
          Book Your Consultation →
        </a>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="font-size: 16px; margin-bottom: 20px;">
          <strong>Why Choose InvestInPuglia?</strong>
        </p>
        <ul style="margin-bottom: 20px; line-height: 1.8;">
          <li>✓ Direct relationships with regional grant authorities</li>
          <li>✓ Complete end-to-end service from property search to grant approval</li>
          <li>✓ Multi-lingual team (English, Italian, German, French, Spanish)</li>
          <li>✓ No upfront fees for initial consultation</li>
          <li>✓ Success-based pricing available for qualified projects</li>
        </ul>
      </div>
      
      <p style="font-size: 16px; margin-bottom: 20px;">
        Best regards,<br>
        <strong>Giuseppe Funaro</strong><br>
        Founder & Lead Investment Consultant<br>
        InvestInPuglia.eu
      </p>
      
      <div style="background: #f9fafb; border-radius: 6px; padding: 15px; margin-top: 20px;">
        <p style="margin: 0; font-size: 14px; color: #6b7280; text-align: center;">
          📞 +39 351 400 1402 | 📧 giuseppe@investinpuglia.eu | 🌐 investinpuglia.eu
        </p>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="background: #1f2937; padding: 20px; text-align: center;">
      <p style="margin: 0 0 10px 0; color: #9ca3af; font-size: 12px;">
        This email was sent to you because you expressed interest in Italian property investment opportunities.
      </p>
      <p style="margin: 0; color: #9ca3af; font-size: 12px;">
        InvestInPuglia.eu | 1402 Celsius Ltd | Puglia, Italy<br>
        <a href="https://investinpuglia.eu/unsubscribe?email=[email]" style="color: #60a5fa; text-decoration: none;">
          Unsubscribe
        </a> | 
        <a href="https://investinpuglia.eu/privacy" style="color: #60a5fa; text-decoration: none;">
          Privacy Policy
        </a>
      </p>
    </div>
  </div>
</body>
</html>
`;

async function sendCampaignPreview() {
  console.log('📧 Sending Mini PIA Introduction Campaign Preview...\n');
  console.log('This is the EXACT email your 287 contacts will receive.\n');

  try {
    const { data, error } = await resend.emails.send({
      from: 'InvestInPuglia Campaign <onboarding@resend.dev>',
      to: ['g.funaro@1402celsius.com'],
      subject: '[PREVIEW] Access 50% EU Grant Funding for Your Italian Investment',
      html: miniPIAIntroductionTemplate.replace('[This will be personalized]', 'Giuseppe'),
      tags: {
        type: 'campaign-preview',
        campaign: 'mini-pia-introduction',
        recipients: '287'
      }
    });

    if (error) {
      console.error('❌ Error:', error);
      return;
    }

    console.log('✅ Campaign preview email sent successfully!\n');
    console.log('📬 Check your inbox: g.funaro@1402celsius.com');
    console.log('📋 Email ID:', data?.id);
    console.log('\n📊 Campaign Details:');
    console.log('- Template: Mini PIA Introduction');
    console.log('- Recipients: 287 contacts');
    console.log('- Personalization: Names will be extracted and inserted');
    console.log('- Subject: Access 50% EU Grant Funding for Your Italian Investment');
    console.log('\n🎯 Ready to send to all 287 contacts?');
    console.log('Go to: https://investinpuglia.eu/admin/email-campaign');
    
  } catch (error) {
    console.error('❌ Failed:', error.message);
  }
}

// Run the function
sendCampaignPreview();