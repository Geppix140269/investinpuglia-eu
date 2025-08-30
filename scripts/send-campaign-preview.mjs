import { Resend } from 'resend';

// Initialize Resend with your API key
const RESEND_API_KEY = process.env.RESEND_API_KEY || 'YOUR_RESEND_API_KEY';
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
    
    <!-- Modern Gradient Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 60px 30px; text-align: center; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -50%; right: -10%; width: 300px; height: 300px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
      <div style="position: absolute; bottom: -30%; left: -5%; width: 200px; height: 200px; background: rgba(255,255,255,0.08); border-radius: 50%;"></div>
      <h1 style="color: white; margin: 0; font-size: 36px; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative; z-index: 1;">Transform Your Italian Dream Into Reality</h1>
      <div style="width: 60px; height: 4px; background: #fbbf24; margin: 20px auto;"></div>
      <p style="color: #f3e8ff; margin: 0; font-size: 18px; font-weight: 400; position: relative; z-index: 1;">Unlock 50% EU Grant Funding for Puglia Investments</p>
    </div>
    
    <!-- Body -->
    <div style="padding: 40px 30px;">
      <!-- Personalized Greeting Card -->
      <div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); border-radius: 12px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #764ba2;">
        <p style="font-size: 18px; margin: 0; color: #581c87; font-weight: 500;">Dear [This will be personalized],</p>
      </div>
      
      <!-- Modern Intro Section -->
      <div style="text-align: center; margin-bottom: 40px;">
        <h2 style="color: #1e293b; font-size: 28px; font-weight: 600; margin: 0 0 15px 0; line-height: 1.3;">
          Your Gateway to Italian Investment Success
        </h2>
        <p style="font-size: 18px; color: #64748b; line-height: 1.6; margin: 0;">
          We're InvestInPuglia — your specialized partner in unlocking<br>
          exclusive EU grant opportunities for premium properties in Southern Italy.
        </p>
      </div>
      
      <!-- Dynamic Grant Opportunity Card -->
      <div style="background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%); border-radius: 16px; padding: 30px; margin: 30px 0; box-shadow: 0 10px 40px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h2 style="color: #764ba2; margin: 0; font-size: 24px; font-weight: 700;">MINI PIA GRANT PROGRAM</h2>
          <div style="display: inline-block; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: white; padding: 8px 20px; border-radius: 20px; margin-top: 10px; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
            50% Non-Refundable Funding
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-around; text-align: center; margin: 25px 0;">
          <div>
            <p style="color: #764ba2; font-size: 32px; font-weight: 700; margin: 0;">€30K</p>
            <p style="color: #94a3b8; font-size: 14px; margin: 5px 0 0 0;">Minimum</p>
          </div>
          <div style="width: 1px; background: #e2e8f0;"></div>
          <div>
            <p style="color: #764ba2; font-size: 32px; font-weight: 700; margin: 0;">€2.75M</p>
            <p style="color: #94a3b8; font-size: 14px; margin: 5px 0 0 0;">Maximum</p>
          </div>
        </div>
        
        <!-- Urgent Notice -->
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%); border-radius: 12px; padding: 15px; margin-top: 20px; text-align: center;">
          <p style="margin: 0; color: #92400e; font-weight: 600; font-size: 16px;">
            Application Window Closing Soon
          </p>
          <p style="margin: 5px 0 0 0; color: #78350f; font-size: 14px;">
            2027 Deadline • First-Come, First-Served Basis
          </p>
        </div>
      </div>
      
      <!-- Urgency Banner -->
      <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); border-radius: 12px; padding: 20px; margin: 30px 0; text-align: center;">
        <p style="color: white; font-size: 18px; margin: 0; font-weight: 500;">
          Application preparation takes 4-6 weeks — Start your journey today!
        </p>
      </div>
      
      <!-- Modern Project Categories -->
      <div style="margin: 40px 0;">
        <h3 style="color: #1e293b; margin: 0 0 25px 0; text-align: center; font-size: 24px; font-weight: 600;">Investment Opportunities</h3>
        
        <div style="background: linear-gradient(135deg, #ddd6fe 0%, #c7d2fe 100%); border-radius: 12px; padding: 20px; margin-bottom: 15px; border-left: 4px solid #7c3aed;">
          <h4 style="color: #581c87; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">TOURISM & HOSPITALITY</h4>
          <div style="color: #475569; line-height: 1.8;">
            Luxury Hotels • Boutique B&Bs • Agriturismo Estates • Vacation Rentals
          </div>
        </div>
        
        <div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border-radius: 12px; padding: 20px; margin-bottom: 15px; border-left: 4px solid #ec4899;">
          <h4 style="color: #831843; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">HERITAGE PROPERTIES</h4>
          <div style="color: #475569; line-height: 1.8;">
            Historic Masseria • Iconic Trulli • Palazzo Restorations • Cultural Sites
          </div>
        </div>
        
        <div style="background: linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%); border-radius: 12px; padding: 20px; margin-bottom: 15px; border-left: 4px solid #0891b2;">
          <h4 style="color: #164e63; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">INNOVATION & TECH</h4>
          <div style="color: #475569; line-height: 1.8;">
            Digital Ventures • Tech Startups • Innovation Hubs • Smart Solutions
          </div>
        </div>
      </div>
      
      <!-- Modern Services Grid -->
      <div style="margin: 40px 0;">
        <h3 style="color: #1e293b; margin: 0 0 25px 0; text-align: center; font-size: 24px; font-weight: 600;">Why Choose InvestInPuglia</h3>
        <div style="display: grid; gap: 15px;">
          <div style="background: white; border-radius: 12px; padding: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border-left: 3px solid #667eea;">
            <strong style="color: #4c1d95;">Expert Navigation</strong>
            <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">Specialized knowledge in EU grant applications</p>
          </div>
          <div style="background: white; border-radius: 12px; padding: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border-left: 3px solid #ec4899;">
            <strong style="color: #831843;">End-to-End Support</strong>
            <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">From property search to grant approval</p>
          </div>
          <div style="background: white; border-radius: 12px; padding: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border-left: 3px solid #0891b2;">
            <strong style="color: #164e63;">AI-Powered Platform</strong>
            <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">24/7 intelligent assistant and calculators</p>
          </div>
        </div>
      </div>
      
      <!-- Modern Resource Cards -->
      <div style="margin: 40px 0;">
        <h3 style="color: #1e293b; margin: 0 0 20px 0; text-align: center; font-size: 20px; font-weight: 600;">Start Your Research Today</h3>
        <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 12px; padding: 20px;">
          <a href="https://investinpuglia.eu/tools" style="display: block; margin-bottom: 15px; text-decoration: none;">
            <div style="background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: all 0.3s;">
              <strong style="color: #667eea; font-size: 16px;">InvestiScope Calculator</strong>
              <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">Calculate your grant eligibility in 60 seconds</p>
            </div>
          </a>
          <a href="https://investinpuglia.eu" style="display: block; margin-bottom: 15px; text-decoration: none;">
            <div style="background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: all 0.3s;">
              <strong style="color: #ec4899; font-size: 16px;">AI Investment Assistant</strong>
              <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">Get instant answers to your investment questions</p>
            </div>
          </a>
          <a href="https://investinpuglia.eu/portfolio" style="display: block; text-decoration: none;">
            <div style="background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: all 0.3s;">
              <strong style="color: #0891b2; font-size: 16px;">Success Stories</strong>
              <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">Explore our portfolio of successful investments</p>
            </div>
          </a>
        </div>
      </div>
      
      <!-- Ultra-Modern CTA Section -->
      <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 20px; padding: 40px 30px; margin: 40px 0; text-align: center; position: relative; overflow: hidden;">
        <div style="position: absolute; top: 0; right: 0; width: 150px; height: 150px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); opacity: 0.1; border-radius: 50%; transform: translate(30%, -30%);"></div>
        
        <h2 style="color: white; margin: 0 0 20px 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Limited Time Offer</h2>
        
        <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); display: inline-block; padding: 4px; border-radius: 12px; margin-bottom: 20px;">
          <div style="background: #1e293b; padding: 15px 30px; border-radius: 10px;">
            <p style="margin: 0; color: #fbbf24; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
              FREE 30-MINUTE CONSULTATION
            </p>
            <p style="margin: 8px 0 0 0; color: white; font-size: 16px;">
              Valued at €60 • Your Price: €0
            </p>
          </div>
        </div>
        
        <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid rgba(255,255,255,0.2);">
          <p style="color: #fbbf24; font-size: 14px; margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Use Exclusive Code</p>
          <p style="color: white; font-size: 32px; margin: 10px 0; font-weight: 700; letter-spacing: 3px;">MINIPIA50</p>
          <p style="color: #cbd5e1; font-size: 14px; margin: 0;">Valid for first 50 recipients only</p>
        </div>
        <a href="https://investinpuglia.eu/book-consultation?source=email&campaign=introduction&coupon=MINIPIA50" 
           style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                  color: white; padding: 18px 50px; text-decoration: none; border-radius: 50px; 
                  font-weight: 600; font-size: 16px; letter-spacing: 0.5px; 
                  box-shadow: 0 10px 30px rgba(103, 126, 234, 0.3); transition: all 0.3s;
                  text-transform: uppercase;">
          Claim Your Free Session Now
        </a>
        
        <p style="color: #94a3b8; margin: 15px 0 0 0; font-size: 14px;">
          No credit card required • 100% complimentary for email recipients
        </p>
      </div>
      
      <!-- Modern Signature -->
      <div style="margin-top: 40px; text-align: center;">
        <p style="font-size: 18px; margin: 0; color: #1e293b;">Looking forward to your success,</p>
        <p style="font-size: 22px; margin: 10px 0; color: #764ba2; font-weight: 700;">Giuseppe Funaro</p>
        <p style="font-size: 14px; margin: 0; color: #64748b;">Founder & Lead Investment Consultant</p>
        <div style="width: 40px; height: 3px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 15px auto;"></div>
      </div>
    </div>
    
    <!-- Modern Footer -->
    <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 30px 20px; text-align: center;">
      <div style="margin-bottom: 20px;">
        <a href="tel:+393514001402" style="color: white; text-decoration: none; margin: 0 15px; font-size: 14px;">+39 351 400 1402</a>
        <span style="color: #475569;">|</span>
        <a href="mailto:g.funaro@investinpuglia.eu" style="color: white; text-decoration: none; margin: 0 15px; font-size: 14px;">g.funaro@investinpuglia.eu</a>
        <span style="color: #475569;">|</span>
        <a href="https://investinpuglia.eu" style="color: white; text-decoration: none; margin: 0 15px; font-size: 14px;">investinpuglia.eu</a>
      </div>
      <p style="margin: 0 0 15px 0; color: #94a3b8; font-size: 11px;">
        InvestInPuglia.eu | 1402 Celsius Ltd | Puglia, Italy
      </p>
      <p style="margin: 0; font-size: 11px;">
        <a href="https://investinpuglia.eu/unsubscribe?email=[email]" style="color: #667eea; text-decoration: none;">
          Unsubscribe
        </a>
        <span style="color: #475569;"> | </span>
        <a href="https://investinpuglia.eu/privacy" style="color: #667eea; text-decoration: none;">
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