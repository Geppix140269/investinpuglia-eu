export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  category: 'welcome' | 'nurture' | 'promotional' | 'transactional' | 'newsletter' | 'follow-up';
  purpose: 'lead_generation' | 'conversion' | 'retention' | 'education' | 'announcement';
  
  // Template configuration
  subject: string;
  previewText: string;
  
  // Content blocks
  html: string;
  designVariant: 'classic' | 'modern' | 'luxury' | 'minimal';
  
  // Personalization tokens
  personalizations: {
    [key: string]: string; // token -> description
  };
  
  // Performance metrics (from A/B tests)
  metrics?: {
    avgOpenRate: number;
    avgClickRate: number;
    avgConversionRate: number;
    totalSends: number;
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  tags: string[];
}

// High-converting email templates focused on Puglia property investment
export const EMAIL_TEMPLATES: { [key: string]: Omit<EmailTemplate, 'id' | 'createdAt' | 'updatedAt'> } = {
  
  // WELCOME SERIES
  WELCOME_INTRO: {
    name: 'Welcome to InvestInPuglia',
    description: 'First touchpoint - introduces brand and sets expectations',
    category: 'welcome',
    purpose: 'lead_generation',
    subject: 'Welcome to Your Italian Property Investment Journey 🇮🇹',
    previewText: 'Giuseppe here - I\'m personally excited to guide you through Puglia\'s hidden investment gems',
    designVariant: 'luxury',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to InvestInPuglia</title>
    <style>
        body { font-family: 'Georgia', serif; margin: 0; padding: 0; background-color: #f8f6f3; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #2c5f7c 0%, #1e4a5f 100%); padding: 40px 30px; text-align: center; }
        .logo { color: #ffffff; font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .header-text { color: #f0f8ff; font-size: 16px; }
        .content { padding: 40px 30px; }
        .hero-image { width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 30px; }
        .greeting { font-size: 24px; color: #2c5f7c; margin-bottom: 20px; font-weight: 600; }
        .main-text { font-size: 18px; line-height: 1.7; color: #4a4a4a; margin-bottom: 25px; }
        .highlight-box { background: #f0f8ff; border-left: 4px solid #2c5f7c; padding: 20px; margin: 25px 0; }
        .cta-button { display: inline-block; background: #c8940d; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 6px; font-weight: 600; font-size: 18px; margin: 20px 0; }
        .signature { border-top: 2px solid #e5e5e5; padding-top: 25px; margin-top: 35px; }
        .giuseppe-photo { width: 80px; height: 80px; border-radius: 50%; float: left; margin-right: 20px; }
        .footer { background: #2c5f7c; color: #ffffff; padding: 30px; text-align: center; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">InvestInPuglia</div>
            <div class="header-text">Authentic Italian Property Investment</div>
        </div>
        
        <div class="content">
            <img src="https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=600&h=300&fit=crop" alt="Beautiful Puglia countryside" class="hero-image">
            
            <div class="greeting">Benvenuto, {{first_name}}!</div>
            
            <p class="main-text">
                Welcome to InvestInPuglia! I'm Giuseppe Funaro, and I'm personally excited to guide you through one of Europe's most promising property investment destinations.
            </p>
            
            <p class="main-text">
                Over the next few days, I'll share with you the insider knowledge I've gained from 15+ years of helping international investors discover Puglia's hidden gems - properties that combine authentic Italian charm with exceptional ROI potential.
            </p>
            
            <div class="highlight-box">
                <strong>What to expect from me:</strong><br>
                ✓ Exclusive property opportunities before they hit the market<br>
                ✓ Complete PIA grant guidance (up to €40,000+ in government incentives)<br>
                ✓ Personal consultation for your investment strategy<br>
                ✓ Direct access to our vetted network of local professionals
            </div>
            
            <a href="{{consultation_link}}" class="cta-button">Book Your Free Consultation</a>
            
            <p class="main-text">
                Your journey to owning a piece of Italy starts now. I'm here to make it as smooth and profitable as possible.
            </p>
            
            <div class="signature">
                <img src="https://investinpuglia.com/giuseppe-photo.jpg" alt="Giuseppe Funaro" class="giuseppe-photo">
                <strong>Giuseppe Funaro</strong><br>
                Founder & Investment Director<br>
                InvestInPuglia<br>
                📞 Direct: +39 080 123 4567<br>
                📧 giuseppe@investinpuglia.com
            </div>
        </div>
        
        <div class="footer">
            <p>InvestInPuglia | Via Roma 123, 70121 Bari, Italy</p>
            <p>This email was sent to {{email}}. <a href="{{unsubscribe_url}}" style="color: #f0f8ff;">Unsubscribe</a></p>
        </div>
    </div>
</body>
</html>`,
    personalizations: {
      'first_name': 'Recipient\'s first name',
      'email': 'Recipient\'s email address',
      'consultation_link': 'Link to book consultation',
      'unsubscribe_url': 'Unsubscribe link'
    },
    isActive: true,
    tags: ['welcome', 'personal-touch', 'high-converting']
  },

  // NURTURE SEQUENCE
  PIA_GRANT_DEEP_DIVE: {
    name: 'PIA Grant Deep Dive - €40,000+ Opportunity',
    description: 'Educational email explaining PIA grants with strong CTA',
    category: 'nurture',
    purpose: 'education',
    subject: '{{first_name}}, here\'s how to claim your €40,000+ PIA grant',
    previewText: 'Most investors miss this - but you won\'t. Here\'s the complete PIA grant guide...',
    designVariant: 'modern',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PIA Grant Guide</title>
    <style>
        body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f5f7fa; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; text-align: center; color: white; }
        .content { padding: 35px 30px; }
        .headline { font-size: 28px; font-weight: 700; color: #1e3a8a; margin-bottom: 20px; line-height: 1.2; }
        .subheadline { font-size: 18px; color: #6b7280; margin-bottom: 25px; }
        .text { font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 20px; }
        .grant-box { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 25px; border-radius: 12px; text-align: center; margin: 25px 0; }
        .grant-amount { font-size: 36px; font-weight: 800; margin-bottom: 10px; }
        .requirements-list { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .requirements-list h4 { color: #1e3a8a; margin-bottom: 15px; }
        .requirement-item { display: flex; align-items: flex-start; margin-bottom: 12px; }
        .check-icon { color: #10b981; font-weight: bold; margin-right: 10px; }
        .cta-section { background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 25px; text-align: center; margin: 30px 0; }
        .cta-button { display: inline-block; background: #f59e0b; color: white; text-decoration: none; padding: 18px 35px; border-radius: 8px; font-weight: 600; font-size: 18px; margin: 15px 0; }
        .urgency { color: #dc2626; font-weight: 600; font-size: 14px; }
        .calculator-preview { border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 24px;">The PIA Grant Opportunity</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Your pathway to €40,000+ in Italian government incentives</p>
        </div>
        
        <div class="content">
            <h2 class="headline">{{first_name}}, 97% of investors miss this opportunity</h2>
            
            <p class="subheadline">But I'm going to make sure you're in the smart 3% who capitalize on it.</p>
            
            <p class="text">
                The Piano di Incentivi per l'Attrazione (PIA) is Italy's best-kept investment secret. It's a government program designed to attract foreign investment to southern Italy - and Puglia is the crown jewel.
            </p>
            
            <div class="grant-box">
                <div class="grant-amount">€40,000+</div>
                <div>Available in direct government incentives for qualified property investments</div>
            </div>
            
            <p class="text">
                Here's what most people don't understand: PIA grants aren't just about the money (though €40,000+ certainly helps). They're about getting official government backing for your investment strategy.
            </p>
            
            <div class="requirements-list">
                <h4>PIA Grant Qualification Requirements:</h4>
                <div class="requirement-item">
                    <span class="check-icon">✓</span>
                    <span>Minimum €200,000 property investment in eligible Puglia municipalities</span>
                </div>
                <div class="requirement-item">
                    <span class="check-icon">✓</span>
                    <span>Commitment to maintain investment for minimum 5 years</span>
                </div>
                <div class="requirement-item">
                    <span class="check-icon">✓</span>
                    <span>Property must meet specific renovation/development criteria</span>
                </div>
                <div class="requirement-item">
                    <span class="check-icon">✓</span>
                    <span>Business plan demonstrating economic impact (we help with this)</span>
                </div>
            </div>
            
            <div class="calculator-preview">
                <h4 style="color: #1e3a8a; margin-bottom: 15px;">PIA Grant Calculator Preview</h4>
                <p style="margin-bottom: 15px;"><strong>Investment:</strong> €250,000</p>
                <p style="margin-bottom: 15px;"><strong>Eligible Grant:</strong> €37,500 (15%)</p>
                <p style="margin-bottom: 15px;"><strong>Tax Benefits:</strong> €8,200/year</p>
                <p style="margin-bottom: 0; color: #059669; font-weight: 600;"><strong>Total 5-Year Benefit:</strong> €78,500</p>
            </div>
            
            <div class="cta-section">
                <h3 style="color: #92400e; margin-bottom: 15px;">Get Your Personal PIA Grant Assessment</h3>
                <p>I'll analyze your specific situation and calculate your exact grant eligibility - completely free.</p>
                <a href="{{pia_calculator_link}}" class="cta-button">Calculate My PIA Grant →</a>
                <p class="urgency">⚡ Limited time: Free consultation included with assessment</p>
            </div>
            
            <p class="text">
                <strong>Why am I sharing this with you?</strong> Because I've seen too many investors discover PIA grants AFTER they've already purchased - missing out on tens of thousands of euros.
            </p>
            
            <p class="text">
                Tomorrow, I'll show you three specific properties currently available that are PIA-grant eligible, including one in Ostuni that could net you €45,000 in incentives alone.
            </p>
            
            <p class="text">
                To your Italian investment success,<br>
                <strong>Giuseppe Funaro</strong>
            </p>
        </div>
        
        <div style="background: #1e3a8a; color: white; padding: 20px; text-align: center; font-size: 14px;">
            <p>InvestInPuglia | Helping investors claim €2.3M+ in PIA grants since 2019</p>
            <p><a href="{{unsubscribe_url}}" style="color: #93c5fd;">Unsubscribe</a></p>
        </div>
    </div>
</body>
</html>`,
    personalizations: {
      'first_name': 'Recipient\'s first name',
      'pia_calculator_link': 'Link to PIA calculator',
      'unsubscribe_url': 'Unsubscribe link'
    },
    isActive: true,
    tags: ['nurture', 'pia-grants', 'education', 'high-value']
  },

  // PROMOTIONAL CAMPAIGN
  PALAZZO_PALMARIGGI_EXCLUSIVE: {
    name: 'Palazzo Palmariggi - Exclusive Investment Opportunity',
    description: 'High-value property promotion with scarcity and urgency',
    category: 'promotional',
    purpose: 'conversion',
    subject: 'EXCLUSIVE: 16th Century Palazzo - €485K (€45K PIA Grant Eligible)',
    previewText: 'This won\'t last. Historic palazzo in Salento with immediate rental income potential...',
    designVariant: 'luxury',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Palazzo Palmariggi Exclusive</title>
    <style>
        body { font-family: 'Georgia', serif; margin: 0; padding: 0; background-color: #f8f6f3; }
        .container { max-width: 650px; margin: 0 auto; background-color: #ffffff; }
        .exclusive-banner { background: #dc2626; color: white; text-align: center; padding: 12px; font-weight: bold; }
        .header { padding: 30px; text-align: center; }
        .property-gallery { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 30px; }
        .main-image { grid-column: span 2; width: 100%; height: 350px; object-fit: cover; border-radius: 8px; }
        .secondary-image { width: 100%; height: 180px; object-fit: cover; border-radius: 6px; }
        .property-title { font-size: 32px; color: #8b5a2b; margin-bottom: 15px; font-weight: 600; }
        .property-subtitle { font-size: 18px; color: #6b5b47; margin-bottom: 25px; }
        .price-box { background: linear-gradient(135deg, #8b5a2b 0%, #a0622d 100%); color: white; padding: 25px; border-radius: 10px; text-align: center; margin-bottom: 25px; }
        .price { font-size: 42px; font-weight: 700; margin-bottom: 10px; }
        .grant-highlight { background: #10b981; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; margin-left: 15px; }
        .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 25px 0; }
        .detail-item { background: #f8f6f3; padding: 15px; border-radius: 8px; text-align: center; }
        .detail-value { font-size: 24px; font-weight: 600; color: #8b5a2b; }
        .detail-label { font-size: 14px; color: #6b5b47; }
        .highlight-section { background: #fef3e2; border: 2px solid #f59e0b; border-radius: 12px; padding: 25px; margin: 25px 0; }
        .roi-calculator { background: #f0fdf4; border: 2px solid #10b981; border-radius: 12px; padding: 20px; margin: 20px 0; }
        .cta-button { display: inline-block; background: #dc2626; color: white; text-decoration: none; padding: 20px 40px; border-radius: 8px; font-weight: 600; font-size: 20px; margin: 20px 0; }
        .scarcity { background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 15px; color: #dc2626; font-weight: 600; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="exclusive-banner">
            🔒 EXCLUSIVE OPPORTUNITY - INVITED INVESTORS ONLY
        </div>
        
        <div class="header">
            <div class="property-title">Palazzo Palmariggi</div>
            <div class="property-subtitle">16th Century Noble Residence in the Heart of Salento</div>
        </div>
        
        <div class="content" style="padding: 0 30px 30px;">
            <div class="property-gallery">
                <img src="https://investinpuglia.com/palazzo-palmariggi-images/IMG_5304_compressed.jpg" alt="Palazzo Palmariggi exterior" class="main-image">
                <img src="https://investinpuglia.com/palazzo-palmariggi-images/IMG_5310_compressed.jpg" alt="Interior courtyard" class="secondary-image">
                <img src="https://investinpuglia.com/palazzo-palmariggi-images/IMG_5314_compressed.jpg" alt="Historic frescoes" class="secondary-image">
            </div>
            
            <p style="font-size: 18px; line-height: 1.6; color: #4a4a4a; margin-bottom: 25px;">
                {{first_name}}, I'm writing to offer you exclusive access to what may be the most remarkable property investment opportunity I've encountered this year.
            </p>
            
            <div class="price-box">
                <div class="price">€485,000</div>
                <div>Full ownership of historic palazzo + PIA grant eligible
                <span class="grant-highlight">€45,000 Grant Available</span>
                </div>
            </div>
            
            <div class="details-grid">
                <div class="detail-item">
                    <div class="detail-value">850m²</div>
                    <div class="detail-label">Total Interior Space</div>
                </div>
                <div class="detail-item">
                    <div class="detail-value">12</div>
                    <div class="detail-label">Historic Rooms</div>
                </div>
                <div class="detail-item">
                    <div class="detail-value">3</div>
                    <div class="detail-label">Courtyard Gardens</div>
                </div>
                <div class="detail-item">
                    <div class="detail-value">1580</div>
                    <div class="detail-label">Year Built</div>
                </div>
            </div>
            
            <div class="highlight-section">
                <h3 style="color: #92400e; margin-bottom: 15px;">Why This Property is Special</h3>
                <p><strong>🏛️ Historical Significance:</strong> Former residence of the Palmariggi noble family, with original 16th-century architectural details intact</p>
                <p><strong>📍 Prime Location:</strong> Historic center of Melpignano, walking distance to Lecce (20 min drive)</p>
                <p><strong>🎯 Investment Potential:</strong> Approved for luxury B&B conversion - projected €180K+ annual revenue</p>
                <p><strong>💰 PIA Grant Eligible:</strong> Qualify for €45,000 in government incentives</p>
            </div>
            
            <div class="roi-calculator">
                <h4 style="color: #065f46; margin-bottom: 15px;">5-Year Investment Projection</h4>
                <p><strong>Initial Investment:</strong> €485,000</p>
                <p><strong>Renovation (included):</strong> €150,000</p>
                <p><strong>PIA Grant:</strong> -€45,000</p>
                <p><strong>Net Investment:</strong> €590,000</p>
                <p><strong>Projected Annual Revenue:</strong> €180,000</p>
                <p style="color: #059669; font-weight: 600; font-size: 18px;"><strong>5-Year ROI:</strong> 165% (€975,000 total return)</p>
            </div>
            
            <div class="scarcity">
                ⚠️ <strong>Important:</strong> Only 2 qualified investors will be shown this property. Viewing appointments are being scheduled for next week only.
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                This isn't just a property purchase - it's acquiring a piece of Italian history with exceptional income potential. The palazzo has been in the same family for over 200 years, and they've decided to sell only to someone who will respect its heritage while unlocking its commercial potential.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="{{exclusive_viewing_link}}" class="cta-button">Schedule Exclusive Viewing</a>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                The next investor I speak with about this property will likely be making an offer. If you're ready to own a piece of Italian history while building serious wealth, reply to this email immediately.
            </p>
            
            <p style="font-size: 16px; color: #4a4a4a;">
                Exclusively yours,<br>
                <strong>Giuseppe Funaro</strong><br>
                <em>📞 Direct Line: +39 080 123 4567</em>
            </p>
        </div>
        
        <div style="background: #8b5a2b; color: white; padding: 20px; text-align: center; font-size: 14px;">
            <p>This exclusive opportunity expires in 72 hours</p>
            <p><a href="{{unsubscribe_url}}" style="color: #d4c4b0;">Unsubscribe</a></p>
        </div>
    </div>
</body>
</html>`,
    personalizations: {
      'first_name': 'Recipient\'s first name',
      'exclusive_viewing_link': 'Link to schedule viewing',
      'unsubscribe_url': 'Unsubscribe link'
    },
    isActive: true,
    tags: ['promotional', 'high-value', 'exclusive', 'palazzo-palmariggi']
  },

  // FOLLOW-UP SEQUENCE
  CONSULTATION_FOLLOW_UP: {
    name: 'Post-Consultation Follow-up',
    description: 'Follow-up after consultation with next steps and value add',
    category: 'follow-up',
    purpose: 'conversion',
    subject: 'Your Puglia investment plan + 3 immediate opportunities',
    previewText: 'Thank you for our conversation, {{first_name}}. Here\'s your personalized action plan...',
    designVariant: 'modern',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Investment Plan</title>
    <style>
        body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: #1e40af; color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .personal-note { background: #fef7cd; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin-bottom: 25px; }
        .action-plan { background: #f0fdf4; border: 2px solid #10b981; border-radius: 12px; padding: 25px; margin: 25px 0; }
        .step { display: flex; align-items: flex-start; margin-bottom: 15px; }
        .step-number { background: #10b981; color: white; border-radius: 50%; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0; }
        .opportunity-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
        .opportunity-header { display: flex; justify-content: between; align-items: center; margin-bottom: 15px; }
        .property-name { font-size: 18px; font-weight: 600; color: #1f2937; }
        .investment-amount { background: #3b82f6; color: white; padding: 4px 12px; border-radius: 16px; font-size: 14px; }
        .roi-highlight { color: #059669; font-weight: 600; font-size: 16px; }
        .cta-button { display: inline-block; background: #dc2626; color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 26px;">Your Puglia Investment Plan</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Personalized roadmap to your Italian property portfolio</p>
        </div>
        
        <div class="content">
            <div class="personal-note">
                <p style="margin: 0; font-size: 16px;"><strong>{{first_name}},</strong> thank you for our conversation yesterday. I enjoyed learning about your investment goals and I'm excited to help you build wealth through Puglia real estate.</p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin-bottom: 25px;">
                Based on our discussion, I've created a personalized action plan for your {{budget_range}} investment budget, focusing on {{investment_focus}} properties in {{preferred_locations}}.
            </p>
            
            <div class="action-plan">
                <h3 style="color: #065f46; margin-bottom: 20px;">Your Next Steps (Next 30 Days)</h3>
                
                <div class="step">
                    <div class="step-number">1</div>
                    <div>
                        <strong>PIA Grant Pre-Qualification</strong><br>
                        I'll submit your preliminary application this week. Expected approval: 7-10 days.
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">2</div>
                    <div>
                        <strong>Property Shortlist Review</strong><br>
                        I've identified 3 properties matching your criteria (details below). We'll schedule virtual tours next week.
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">3</div>
                    <div>
                        <strong>Legal & Financial Setup</strong><br>
                        Introduction to our Italian tax advisor and recommended legal counsel for purchase structure optimization.
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">4</div>
                    <div>
                        <strong>In-Person Viewing Trip</strong><br>
                        3-day guided tour of shortlisted properties + meetings with local professionals (all expenses covered by us).
                    </div>
                </div>
            </div>
            
            <h3 style="color: #1f2937; margin-bottom: 20px;">3 Opportunities Matching Your Criteria</h3>
            
            <div class="opportunity-card">
                <div class="opportunity-header">
                    <div class="property-name">Restored Masseria - Ostuni</div>
                    <div class="investment-amount">€{{property_1_price}}</div>
                </div>
                <p style="margin-bottom: 10px; color: #6b7280;">8 bedrooms, pool, 2 hectares of olive groves. Ready for luxury rental operation.</p>
                <p class="roi-highlight">Projected ROI: 18.5% annually | PIA Grant: €38,000</p>
            </div>
            
            <div class="opportunity-card">
                <div class="opportunity-header">
                    <div class="property-name">Historic Palazzo - Lecce Center</div>
                    <div class="investment-amount">€{{property_2_price}}</div>
                </div>
                <p style="margin-bottom: 10px; color: #6b7280;">12 rooms, original frescoes, approved for boutique hotel conversion.</p>
                <p class="roi-highlight">Projected ROI: 22.1% annually | PIA Grant: €42,000</p>
            </div>
            
            <div class="opportunity-card">
                <div class="opportunity-header">
                    <div class="property-name">Luxury Villa - Polignano a Mare</div>
                    <div class="investment-amount">€{{property_3_price}}</div>
                </div>
                <p style="margin-bottom: 10px; color: #6b7280;">Sea views, modern renovation, immediate rental income potential.</p>
                <p class="roi-highlight">Projected ROI: 16.8% annually | PIA Grant: €35,000</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="{{detailed_analysis_link}}" class="cta-button">View Detailed Property Analysis</a>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
                <strong>Next call:</strong> I'll ring you {{next_call_date}} at {{next_call_time}} to discuss your thoughts on these properties and answer any questions.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
                In the meantime, if anything comes up or you'd like to fast-track any of these opportunities, I'm available on my direct line: +39 080 123 4567.
            </p>
            
            <p style="font-size: 16px; color: #4b5563;">
                Looking forward to helping you build your Italian property empire,<br>
                <strong>Giuseppe Funaro</strong>
            </p>
        </div>
        
        <div style="background: #1e40af; color: white; padding: 20px; text-align: center; font-size: 14px;">
            <p>InvestInPuglia - Your trusted partner in Italian real estate</p>
            <p><a href="{{unsubscribe_url}}" style="color: #bfdbfe;">Unsubscribe</a></p>
        </div>
    </div>
</body>
</html>`,
    personalizations: {
      'first_name': 'Recipient\'s first name',
      'budget_range': 'Investment budget range discussed',
      'investment_focus': 'Type of properties they\'re interested in',
      'preferred_locations': 'Preferred locations in Puglia',
      'property_1_price': 'Price of first property',
      'property_2_price': 'Price of second property', 
      'property_3_price': 'Price of third property',
      'next_call_date': 'Date of next scheduled call',
      'next_call_time': 'Time of next scheduled call',
      'detailed_analysis_link': 'Link to detailed property analysis',
      'unsubscribe_url': 'Unsubscribe link'
    },
    isActive: true,
    tags: ['follow-up', 'personalized', 'consultation', 'high-converting']
  },

  // NEWSLETTER TEMPLATE
  MONTHLY_MARKET_REPORT: {
    name: 'Puglia Market Report - Monthly Newsletter',
    description: 'Monthly market insights and opportunities newsletter',
    category: 'newsletter',
    purpose: 'retention',
    subject: 'Puglia Market Report: {{current_month}} 2025 | New opportunities inside',
    previewText: 'Market trends, new listings, success stories, and exclusive opportunities for this month...',
    designVariant: 'modern',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Puglia Market Report</title>
    <style>
        body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f9fafb; }
        .container { max-width: 650px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 40px 30px; }
        .newsletter-title { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
        .newsletter-subtitle { opacity: 0.9; font-size: 16px; }
        .content { padding: 30px; }
        .section-header { background: #f1f5f9; border-left: 4px solid #0f172a; padding: 15px 20px; margin: 30px 0 20px 0; }
        .section-title { font-size: 20px; font-weight: 600; color: #0f172a; margin: 0; }
        .market-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin: 20px 0; }
        .stat-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; text-align: center; }
        .stat-number { font-size: 24px; font-weight: 700; color: #059669; }
        .stat-label { font-size: 13px; color: #64748b; margin-top: 5px; }
        .property-spotlight { border: 2px solid #f59e0b; border-radius: 12px; padding: 25px; margin: 25px 0; background: #fffbeb; }
        .success-story { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .cta-section { background: #1e40af; color: white; border-radius: 10px; padding: 25px; text-align: center; margin: 30px 0; }
        .cta-button { display: inline-block; background: white; color: #1e40af; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: 600; margin: 10px 0; }
        .market-insight { background: #fdf2f8; border-left: 4px solid #ec4899; padding: 20px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="newsletter-title">Puglia Market Report</div>
            <div class="newsletter-subtitle">{{current_month}} 2025 | Exclusive market insights for smart investors</div>
        </div>
        
        <div class="content">
            <p style="font-size: 18px; line-height: 1.6; color: #374151; margin-bottom: 25px;">
                Ciao {{first_name}}, here's what's happening in the Puglia property market this month...
            </p>
            
            <div class="section-header">
                <div class="section-title">📊 Market Overview</div>
            </div>
            
            <div class="market-stats">
                <div class="stat-card">
                    <div class="stat-number">+12.3%</div>
                    <div class="stat-label">YoY Price Growth</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">47</div>
                    <div class="stat-label">New Listings</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">€380K</div>
                    <div class="stat-label">Avg. Investment</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">18.5%</div>
                    <div class="stat-label">Avg. ROI</div>
                </div>
            </div>
            
            <div class="market-insight">
                <h4 style="color: #be185d; margin-bottom: 10px;">💡 Giuseppe's Market Insight</h4>
                <p style="margin: 0; color: #374151;">
                    "Foreign investment in Puglia has increased 34% this quarter, driven primarily by the PIA grant program and post-COVID lifestyle shifts. Properties under €500K are seeing the strongest demand, with luxury rentals booking 6 months in advance. Now is an exceptional time to enter the market."
                </p>
            </div>
            
            <div class="section-header">
                <div class="section-title">🏛️ Property Spotlight</div>
            </div>
            
            <div class="property-spotlight">
                <h3 style="color: #92400e; margin-bottom: 15px;">18th Century Masseria - Ceglie Messapica</h3>
                <p style="margin-bottom: 15px;"><strong>Price:</strong> €420,000 | <strong>PIA Grant:</strong> €41,000 | <strong>ROI Projection:</strong> 19.8%</p>
                <p style="color: #78716c; line-height: 1.6;">
                    Spectacular stone farmhouse with 6 bedrooms, infinity pool, and 3 hectares of ancient olive groves. Fully restored with modern amenities while preserving authentic architectural details. Licensed for agriturismo operation with 85% average occupancy rate.
                </p>
                <p style="margin-top: 15px;"><strong>Why it's special:</strong> This property has a waiting list for bookings through 2026, making it essentially a "business purchase" rather than just real estate.</p>
            </div>
            
            <div class="section-header">
                <div class="section-title">🎉 Success Story</div>
            </div>
            
            <div class="success-story">
                <h4 style="color: #059669; margin-bottom: 10px;">Marcus & Sarah (Germany) - 287% ROI in 18 months</h4>
                <p style="margin: 0; color: #374151;">
                    "We purchased a €290K trullo complex in Alberobello through Giuseppe in late 2023. After receiving €28K in PIA grants and completing the renovation, our property is now valued at €485K. More importantly, it's generating €4,200/month in rental income. Giuseppe's guidance was invaluable throughout the entire process."
                </p>
            </div>
            
            <div class="section-header">
                <div class="section-title">📈 Trending Locations</div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                <div>
                    <h4 style="color: #1f2937; margin-bottom: 8px;">🔥 Hot This Month</h4>
                    <ul style="color: #6b7280; margin: 0; padding-left: 20px;">
                        <li>Ceglie Messapica (+23% inquiries)</li>
                        <li>Martina Franca (+18% inquiries)</li>
                        <li>Cisternino (+15% inquiries)</li>
                    </ul>
                </div>
                <div>
                    <h4 style="color: #1f2937; margin-bottom: 8px;">💎 Hidden Gems</h4>
                    <ul style="color: #6b7280; margin: 0; padding-left: 20px;">
                        <li>Melpignano (undervalued)</li>
                        <li>Tricase (coastal potential)</li>
                        <li>Francavilla Fontana (emerging)</li>
                    </ul>
                </div>
            </div>
            
            <div class="cta-section">
                <h3 style="margin-bottom: 15px;">Ready to Explore Opportunities?</h3>
                <p style="margin-bottom: 20px; opacity: 0.9;">I currently have 12 exclusive properties not yet on the public market. Book a call to see if any match your investment criteria.</p>
                <a href="{{book_call_link}}" class="cta-button">Book Strategy Call</a>
            </div>
            
            <div class="section-header">
                <div class="section-title">📅 Upcoming Events</div>
            </div>
            
            <p style="color: #6b7280; line-height: 1.6;">
                <strong>Virtual Puglia Property Tour:</strong> {{next_tour_date}} at 7 PM CET<br>
                I'll be doing a live virtual tour of 3 properties currently available for international investors. Register <a href="{{tour_registration_link}}" style="color: #2563eb;">here</a>.
            </p>
            
            <p style="font-size: 16px; color: #6b7280; margin-top: 30px;">
                As always, I'm here if you have any questions about the Puglia market or want to discuss specific opportunities.<br><br>
                Buona giornata,<br>
                <strong>Giuseppe Funaro</strong>
            </p>
        </div>
        
        <div style="background: #0f172a; color: white; padding: 25px; text-align: center; font-size: 14px;">
            <p style="margin: 0 0 10px 0;">InvestInPuglia | Via Roma 123, 70121 Bari, Italy</p>
            <p style="margin: 0;"><a href="{{unsubscribe_url}}" style="color: #94a3b8;">Unsubscribe</a> | <a href="{{archive_link}}" style="color: #94a3b8;">View Archive</a></p>
        </div>
    </div>
</body>
</html>`,
    personalizations: {
      'first_name': 'Recipient\'s first name',
      'current_month': 'Current month name',
      'book_call_link': 'Link to book strategy call',
      'next_tour_date': 'Date of next virtual tour',
      'tour_registration_link': 'Link to register for virtual tour',
      'unsubscribe_url': 'Unsubscribe link',
      'archive_link': 'Link to newsletter archive'
    },
    isActive: true,
    tags: ['newsletter', 'market-report', 'monthly', 'retention']
  }
};

// Template utility functions
export function getTemplatesByCategory(category: EmailTemplate['category']): EmailTemplate[] {
  return Object.entries(EMAIL_TEMPLATES)
    .map(([id, template]) => ({ ...template, id, createdAt: new Date(), updatedAt: new Date() }))
    .filter(template => template.category === category);
}

export function getTemplatesByPurpose(purpose: EmailTemplate['purpose']): EmailTemplate[] {
  return Object.entries(EMAIL_TEMPLATES)
    .map(([id, template]) => ({ ...template, id, createdAt: new Date(), updatedAt: new Date() }))
    .filter(template => template.purpose === purpose);
}

export function personalizeTemplate(templateHtml: string, personalizations: { [key: string]: string }): string {
  let personalizedHtml = templateHtml;
  
  Object.entries(personalizations).forEach(([token, value]) => {
    const regex = new RegExp(`{{${token}}}`, 'g');
    personalizedHtml = personalizedHtml.replace(regex, value || '');
  });
  
  return personalizedHtml;
}

export function extractPersonalizationTokens(templateHtml: string): string[] {
  const tokenRegex = /\{\{([^}]+)\}\}/g;
  const tokens: string[] = [];
  let match;
  
  while ((match = tokenRegex.exec(templateHtml)) !== null) {
    if (!tokens.includes(match[1])) {
      tokens.push(match[1]);
    }
  }
  
  return tokens;
}

export function validateTemplate(template: Partial<EmailTemplate>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!template.name) errors.push('Template name is required');
  if (!template.subject) errors.push('Subject line is required');
  if (!template.html) errors.push('HTML content is required');
  if (!template.category) errors.push('Category is required');
  if (!template.purpose) errors.push('Purpose is required');
  
  // Check for required personalization tokens
  const requiredTokens = ['unsubscribe_url'];
  const templateTokens = extractPersonalizationTokens(template.html || '');
  
  requiredTokens.forEach(token => {
    if (!templateTokens.includes(token)) {
      errors.push(`Required personalization token missing: {{${token}}}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Template performance tracking
export interface TemplatePerformance {
  templateId: string;
  campaignCount: number;
  totalSends: number;
  totalOpens: number;
  totalClicks: number;
  totalConversions: number;
  avgOpenRate: number;
  avgClickRate: number;
  avgConversionRate: number;
  revenue: number;
  lastUsed: Date;
}

export function calculateTemplatePerformance(
  templateId: string,
  campaigns: Array<{
    sends: number;
    opens: number;
    clicks: number;
    conversions: number;
    revenue: number;
    sentAt: Date;
  }>
): TemplatePerformance {
  const totals = campaigns.reduce(
    (acc, campaign) => ({
      sends: acc.sends + campaign.sends,
      opens: acc.opens + campaign.opens,
      clicks: acc.clicks + campaign.clicks,
      conversions: acc.conversions + campaign.conversions,
      revenue: acc.revenue + campaign.revenue
    }),
    { sends: 0, opens: 0, clicks: 0, conversions: 0, revenue: 0 }
  );
  
  return {
    templateId,
    campaignCount: campaigns.length,
    totalSends: totals.sends,
    totalOpens: totals.opens,
    totalClicks: totals.clicks,
    totalConversions: totals.conversions,
    avgOpenRate: totals.sends > 0 ? (totals.opens / totals.sends) * 100 : 0,
    avgClickRate: totals.sends > 0 ? (totals.clicks / totals.sends) * 100 : 0,
    avgConversionRate: totals.sends > 0 ? (totals.conversions / totals.sends) * 100 : 0,
    revenue: totals.revenue,
    lastUsed: campaigns.length > 0 ? new Date(Math.max(...campaigns.map(c => c.sentAt.getTime()))) : new Date()
  };
}