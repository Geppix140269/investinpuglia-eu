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
    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); padding: 40px 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 0.5px;">Access 50% Grant Funding for Your Italian Investment</h1>
      <p style="color: #dbeafe; margin: 12px 0 0 0; font-size: 16px; font-weight: 300;">EU Mini PIA Grants | Regional Investment Program | Puglia, Italy</p>
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
        <div style="background: #fef2f2; border-left: 3px solid #dc2626; padding: 12px 15px; margin: 15px 0;">
          <p style="margin: 0; color: #7f1d1d; font-weight: 600; font-size: 14px;">
            Important: Program Deadline 2027
          </p>
          <p style="margin: 5px 0 0 0; color: #991b1b; font-size: 13px;">
            Limited funds remaining. Applications are processed in order of submission.
          </p>
        </div>
      </div>
      
      <p style="font-size: 16px; margin-bottom: 20px;">
        <strong>Why reach out now?</strong> The next application window closes soon, and preparation takes 4-6 weeks.
      </p>
      
      <!-- REAL SUCCESS STORIES -->
      <div style="background: #f8fffe; border: 1px solid #e0e7e6; border-radius: 4px; padding: 25px; margin: 25px 0;">
        <h3 style="color: #1e293b; margin: 0 0 20px 0; text-align: center; font-size: 20px; font-weight: 500; letter-spacing: 0.3px;">Recent Client Success Stories</h3>
        
        <div style="background: white; border-radius: 6px; padding: 15px; margin-bottom: 12px;">
          <h4 style="color: #1e40af; margin: 0 0 8px 0;">Baglioni Hotel - Masseria Muzza, Otranto</h4>
          <ul style="margin: 5px 0; padding-left: 20px; color: #374151;">
            <li><strong>Investment:</strong> €8.5M</li>
            <li><strong>Mini PIA Grant Secured:</strong> €2.8M (33%)</li>
            <li><strong>Result:</strong> 40 luxury suites, spa & wellness center</li>
            <li><strong>Status:</strong> Operational - 5-star luxury hotel</li>
          </ul>
        </div>
        
        <div style="background: white; border-radius: 6px; padding: 15px; margin-bottom: 12px;">
          <h4 style="color: #1e40af; margin: 0 0 8px 0;">B&B Blue Otranto - Seafront Property</h4>
          <ul style="margin: 5px 0; padding-left: 20px; color: #374151;">
            <li><strong>Investment:</strong> €1.1M</li>
            <li><strong>Mini PIA Grant Secured:</strong> €450K (41%)</li>
            <li><strong>Result:</strong> 12 designer suites with sea views</li>
            <li><strong>ROI:</strong> 25% annual through vacation rentals</li>
          </ul>
        </div>
        
        <div style="background: white; border-radius: 6px; padding: 15px; margin-bottom: 12px;">
          <h4 style="color: #1e40af; margin: 0 0 8px 0;">Riva Marina Resort, Carovigno</h4>
          <ul style="margin: 5px 0; padding-left: 20px; color: #374151;">
            <li><strong>Investment:</strong> €9M</li>
            <li><strong>PIA Turismo Grant:</strong> €3.1M (34%)</li>
            <li><strong>Result:</strong> 442 rooms, private beach, 5 restaurants</li>
            <li><strong>Jobs Created:</strong> 120+ seasonal positions</li>
          </ul>
        </div>
        
        <div style="background: white; border-radius: 6px; padding: 15px; margin-bottom: 12px;">
          <h4 style="color: #1e40af; margin: 0 0 8px 0;">Masseria Santa Lucia, Ostuni</h4>
          <ul style="margin: 5px 0; padding-left: 20px; color: #374151;">
            <li><strong>Investment:</strong> €1.8M</li>
            <li><strong>Mini PIA Grant:</strong> €680K (38%)</li>
            <li><strong>Result:</strong> Luxury wedding venue (300 guests)</li>
            <li><strong>Bookings:</strong> Fully booked 18 months ahead</li>
          </ul>
        </div>
        
        <div style="background: white; border-radius: 6px; padding: 15px;">
          <h4 style="color: #1e40af; margin: 0 0 8px 0;">Cantieri Navali - Gruppo Jolly, Taranto</h4>
          <ul style="margin: 5px 0; padding-left: 20px; color: #374151;">
            <li><strong>Investment:</strong> €12M</li>
            <li><strong>PIA Grant:</strong> €5.2M (43%)</li>
            <li><strong>Result:</strong> 50,000 m² marine facility</li>
            <li><strong>Impact:</strong> 200+ jobs created</li>
          </ul>
        </div>
        
        <p style="text-align: center; margin: 15px 0 5px 0; font-weight: bold; color: #065f46;">
          Total Grants Secured for Clients: €15M+ in 2023-2024
        </p>
      </div>
      
      <div style="background: #fafafa; border-left: 3px solid #1e40af; padding: 20px; margin: 25px 0;">
        <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px; font-weight: 500;">Our Professional Services</h3>
        <ul style="margin: 0; padding-left: 20px; color: #475569; line-height: 1.8;">
          <li style="margin-bottom: 8px;"><strong>Experience:</strong> Over 30 years in EU and Regional grant acquisition</li>
          <li style="margin-bottom: 8px;"><strong>Success Rate:</strong> 95% grant approval rate</li>
          <li style="margin-bottom: 8px;"><strong>Full Service:</strong> Complete application management from start to finish</li>
          <li style="margin-bottom: 8px;"><strong>Due Diligence:</strong> Comprehensive property sourcing and evaluation</li>
          <li style="margin-bottom: 8px;"><strong>Digital Support:</strong> AI-powered assistant available 24/7</li>
        </ul>
      </div>
      
      <p style="font-size: 16px; margin-bottom: 20px;">
        <strong>Resources for Your Due Diligence:</strong>
      </p>
      <ul style="margin-bottom: 20px; line-height: 1.8;">
        <li><a href="https://investinpuglia.eu/tools" style="color: #1e40af; text-decoration: none; border-bottom: 1px solid #93c5fd;"><strong>InvestiScope Calculator</strong></a> - Calculate your grant eligibility instantly</li>
        <li><a href="https://investinpuglia.eu" style="color: #1e40af; text-decoration: none; border-bottom: 1px solid #93c5fd;"><strong>Investment Assistant Portal</strong></a> - Get immediate answers to your questions</li>
        <li><a href="https://investinpuglia.eu/portfolio" style="color: #1e40af; text-decoration: none; border-bottom: 1px solid #93c5fd;"><strong>View Our Portfolio</strong></a> - Over €50M in successful projects</li>
      </ul>
      
      <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
        <p style="font-size: 18px; margin: 0 0 15px 0; font-weight: bold;">
          Ready to Secure Your Mini PIA Grant?
        </p>
        
        <!-- SPECIAL OFFER BANNER -->
        <div style="background: linear-gradient(135deg, #1e40af 0%, #312e81 100%); border-radius: 8px; padding: 25px; margin: 15px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="margin: 0; color: white; font-size: 22px; font-weight: 500; text-align: center; letter-spacing: 0.5px;">
            EXCLUSIVE OFFER: COMPLIMENTARY 30-MINUTE CONSULTATION
          </p>
          <p style="margin: 12px 0 0 0; color: #dbeafe; font-size: 17px; text-align: center;">
            Email Recipients Only - Use Code: <span style="background: white; color: #1e40af; padding: 5px 16px; border-radius: 6px; font-weight: 600; font-size: 18px; letter-spacing: 1px;">MINIPIA50</span>
          </p>
          <p style="margin: 10px 0 0 0; color: #bfdbfe; font-size: 15px; text-align: center;">
            Standard Consultation Fee: €60 | Your Investment: €0
          </p>
        </div>
        
        <p style="margin: 0 0 15px 0; font-size: 16px;">
          <strong>30-Minute Professional Consultation</strong> with Giuseppe Funaro<br>
          <span style="color: #6b7280;">30+ years of grant expertise • 95% success rate</span>
        </p>
        <div style="background: white; border-radius: 6px; padding: 20px; margin: 15px 0; border: 1px solid #e5e7eb;">
          <p style="margin: 0 0 15px 0; color: #1e293b; font-size: 17px; font-weight: 500; text-align: center;">
            Complimentary Professional Consultation
          </p>
          <p style="margin: 0 0 12px 0; color: #475569; text-align: center;">
            Your 30-minute session will include:
          </p>
          <ul style="margin: 10px 0; padding-left: 30px; color: #374151; line-height: 1.8;">
            <li>Comprehensive grant eligibility assessment</li>
            <li>Personalized investment strategy development</li>
            <li>Expert guidance on Mini PIA grant applications</li>
            <li>Clear roadmap for your investment journey</li>
          </ul>
          <p style="margin: 15px 0 0 0; font-size: 14px; color: #dc2626; text-align: center; font-weight: 500;">
            LIMITED AVAILABILITY - First 50 Recipients Only
          </p>
        </div>
        <a href="https://investinpuglia.eu/book-consultation?source=email&campaign=introduction&coupon=MINIPIA50" 
           style="display: inline-block; background: #1e40af; 
                  color: white; padding: 16px 40px; text-decoration: none; border-radius: 6px; 
                  font-weight: 500; margin-top: 10px; letter-spacing: 0.5px; 
                  box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.3s;">
          SCHEDULE YOUR CONSULTATION
        </a>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="font-size: 16px; margin-bottom: 20px;">
          <strong>Why Choose InvestInPuglia?</strong>
        </p>
        <ul style="margin-bottom: 20px; line-height: 2; color: #374151;">
          <li style="margin-bottom: 5px;"><strong>Direct relationships</strong> with regional grant authorities</li>
          <li style="margin-bottom: 5px;"><strong>Complete end-to-end service</strong> from property search to grant approval</li>
          <li style="margin-bottom: 5px;"><strong>Multi-lingual team</strong> (English, Italian, German, French, Spanish)</li>
          <li style="margin-bottom: 5px;"><strong>No upfront fees</strong> for initial consultation</li>
          <li style="margin-bottom: 5px;"><strong>Success-based pricing</strong> available for qualified projects</li>
        </ul>
      </div>
      
      <p style="font-size: 16px; margin-bottom: 20px;">
        Best regards,<br>
        <strong>Giuseppe Funaro</strong><br>
        Founder & Lead Investment Consultant<br>
        InvestInPuglia.eu
      </p>
      
      <div style="background: #f9fafb; border-radius: 6px; padding: 20px; margin-top: 25px;">
        <p style="margin: 0; font-size: 14px; color: #4b5563; text-align: center; line-height: 1.8;">
          <strong>Italy:</strong> +39 351 400 1402 | <strong>UK:</strong> +44 1969 434469<br>
          <strong>Email:</strong> g.funaro@investinpuglia.eu<br>
          <strong>Web:</strong> investinpuglia.eu
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
      subject: '[PREVIEW] Complimentary Consultation: Access 50% EU Grant Funding for Italian Investments',
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