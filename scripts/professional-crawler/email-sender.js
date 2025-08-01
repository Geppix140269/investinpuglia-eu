// scripts/professional-crawler/email-sender.js
require('dotenv').config({ path: '../../.env.local' });
const { Resend } = require('resend');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;

// Initialize services
const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

class EmailInvitationSender {
  constructor() {
    this.sentEmails = [];
    this.failedEmails = [];
  }

  async loadProfessionals() {
    console.log('📥 Loading professionals from database...');
    
    const { data: professionals, error } = await supabase
      .from('professionals')
      .select('*')
      .eq('status', 'pending')
      .not('email', 'is', null);
    
    if (error) {
      console.error('Error loading professionals:', error);
      return [];
    }
    
    console.log(`✅ Found ${professionals.length} professionals to invite`);
    return professionals;
  }

  async createRegistrationToken(professional) {
    // Create a registration token
    const { data: registration, error } = await supabase
      .from('professional_registrations')
      .insert({
        professional_id: professional.id,
        token: this.generateToken(),
        email: professional.email,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating registration:', error);
      return null;
    }
    
    return registration.token;
  }

  generateToken() {
    return Math.random().toString(36).substr(2, 9) + 
           Math.random().toString(36).substr(2, 9);
  }

  getEmailTemplate(professional, token) {
    const registrationUrl = `https://investinpuglia.eu/register-professional?token=${token}`;
    
    return {
      subject: `Complete Your Professional Profile on InvestInPuglia.eu`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0ea5e9; color: white; padding: 20px; text-align: center; }
    .content { padding: 30px; background-color: #f9f9f9; }
    .button { 
      display: inline-block; 
      padding: 12px 30px; 
      background-color: #0ea5e9; 
      color: white; 
      text-decoration: none; 
      border-radius: 5px; 
      margin: 20px 0;
    }
    .benefits { background-color: #e0f2fe; padding: 20px; margin: 20px 0; border-radius: 5px; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to InvestInPuglia.eu Professional Directory</h1>
    </div>
    
    <div class="content">
      <h2>Dear ${professional.name},</h2>
      
      <p>We're excited to invite you to join <strong>InvestInPuglia.eu</strong>, the premier platform connecting international investors with trusted professionals in Puglia.</p>
      
      <p>Your business, <strong>${professional.business_name}</strong>, has been pre-selected for inclusion in our exclusive professional directory based on your excellent reputation in ${professional.city}.</p>
      
      <div class="benefits">
        <h3>🌟 Benefits of Joining:</h3>
        <ul>
          <li><strong>International Exposure:</strong> Connect with foreign investors from USA, UK, Germany, and more</li>
          <li><strong>Quality Leads:</strong> Receive pre-qualified inquiries from serious investors</li>
          <li><strong>Professional Profile:</strong> Showcase your expertise in multiple languages</li>
          <li><strong>Free Listing:</strong> No cost to join during our launch phase</li>
          <li><strong>Premium Options:</strong> Upgrade for enhanced visibility and priority placement</li>
        </ul>
      </div>
      
      <p><strong>Complete your registration in just 2 minutes:</strong></p>
      
      <center>
        <a href="${registrationUrl}" class="button">Complete My Profile</a>
      </center>
      
      <p><em>This exclusive invitation link expires in 7 days.</em></p>
      
      <h3>Why InvestInPuglia.eu?</h3>
      <p>We help international investors discover EU grants up to €2.25M for businesses in Puglia. These investors need trusted local professionals like you for:</p>
      <ul>
        <li>Legal services and property transactions</li>
        <li>Tax and financial advisory</li>
        <li>Architecture and construction management</li>
        <li>Business setup and compliance</li>
      </ul>
      
      <p>Join other leading professionals who are already benefiting from international client referrals.</p>
      
      <p>Best regards,<br>
      Giuseppe Funaro<br>
      Founder & CEO<br>
      InvestInPuglia.eu</p>
    </div>
    
    <div class="footer">
      <p>InvestInPuglia.eu | Via Example 123, Lecce, Italy<br>
      This invitation was sent to ${professional.email}<br>
      <a href="https://investinpuglia.eu/privacy">Privacy Policy</a> | 
      <a href="https://investinpuglia.eu/terms">Terms of Service</a></p>
    </div>
  </div>
</body>
</html>
      `,
      text: `
Dear ${professional.name},

Welcome to InvestInPuglia.eu Professional Directory!

Your business, ${professional.business_name}, has been pre-selected for inclusion in our exclusive professional directory.

Complete your registration here: ${registrationUrl}

Benefits of joining:
- Connect with international investors
- Receive quality leads
- Free professional profile
- Multi-language support

This invitation expires in 7 days.

Best regards,
Giuseppe Funaro
InvestInPuglia.eu
      `
    };
  }

  async sendInvitation(professional) {
    try {
      // Create registration token
      const token = await this.createRegistrationToken(professional);
      if (!token) {
        throw new Error('Failed to create registration token');
      }
      
      // Get email template
      const template = this.getEmailTemplate(professional, token);
      
      // Send email
      const { data, error } = await resend.emails.send({
        from: 'InvestInPuglia <info@investinpuglia.eu>', // Use your existing from address
        to: professional.email,
        subject: template.subject,
        html: template.html,
        text: template.text
      });
      
      if (error) {
        throw error;
      }
      
      // Update professional status
      await supabase
        .from('professionals')
        .update({ 
          status: 'invited',
          invited_at: new Date().toISOString()
        })
        .eq('id', professional.id);
      
      this.sentEmails.push(professional.email);
      console.log(`✅ Sent invitation to ${professional.name} (${professional.email})`);
      
      return true;
    } catch (error) {
      console.error(`❌ Failed to send to ${professional.email}: ${error.message}`);
      this.failedEmails.push({ email: professional.email, error: error.message });
      return false;
    }
  }

  async sendCompletionEmail(professional) {
    const template = {
      subject: 'Your Professional Profile is Live on InvestInPuglia.eu!',
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #10b981; color: white; padding: 20px; text-align: center; }
    .content { padding: 30px; background-color: #f9f9f9; }
    .button { 
      display: inline-block; 
      padding: 12px 30px; 
      background-color: #10b981; 
      color: white; 
      text-decoration: none; 
      border-radius: 5px; 
      margin: 20px 0;
    }
    .next-steps { background-color: #d1fae5; padding: 20px; margin: 20px 0; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Congratulations! Your Profile is Live!</h1>
    </div>
    
    <div class="content">
      <h2>Dear ${professional.name},</h2>
      
      <p>Great news! Your professional profile is now <strong>live</strong> on InvestInPuglia.eu and visible to international investors.</p>
      
      <center>
        <a href="https://investinpuglia.eu/professionals" class="button">View Professional Directory</a>
      </center>
      
      <div class="next-steps">
        <h3>📋 What Happens Next:</h3>
        <ol>
          <li><strong>Profile Visibility:</strong> Your profile is now searchable by investors worldwide</li>
          <li><strong>Lead Notifications:</strong> You'll receive email alerts for new inquiries</li>
          <li><strong>Direct Contact:</strong> Investors can contact you directly through our platform</li>
          <li><strong>Analytics:</strong> Track your profile views and engagement (coming soon)</li>
        </ol>
      </div>
      
      <h3>💡 Pro Tips for Success:</h3>
      <ul>
        <li>Respond to inquiries within 24 hours for best results</li>
        <li>Keep your profile updated with recent projects</li>
        <li>Consider adding testimonials from satisfied clients</li>
        <li>Upgrade to Premium for priority placement (optional)</li>
      </ul>
      
      <p>If you have any questions or need assistance, simply reply to this email.</p>
      
      <p>Welcome to our professional community!</p>
      
      <p>Best regards,<br>
      Giuseppe Funaro<br>
      Founder & CEO<br>
      InvestInPuglia.eu</p>
    </div>
  </div>
</body>
</html>
      `
    };
    
    await resend.emails.send({
      from: 'InvestInPuglia <noreply@investinpuglia.eu>',
      to: professional.email,
      subject: template.subject,
      html: template.html
    });
  }

  async run() {
    console.log('📧 Starting email invitation campaign...\n');
    
    // Load professionals
    const professionals = await this.loadProfessionals();
    
    if (professionals.length === 0) {
      console.log('No professionals to invite. Run the crawler first!');
      return;
    }
    
    // Send invitations with rate limiting
    for (const professional of professionals) {
      await this.sendInvitation(professional);
      // Rate limit: 1 email per second
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Summary
    console.log('\n📊 Campaign Summary:');
    console.log(`✅ Sent: ${this.sentEmails.length}`);
    console.log(`❌ Failed: ${this.failedEmails.length}`);
    
    if (this.failedEmails.length > 0) {
      console.log('\nFailed emails:');
      this.failedEmails.forEach(f => console.log(`- ${f.email}: ${f.error}`));
    }
    
    // Save report
    const report = {
      date: new Date().toISOString(),
      sent: this.sentEmails,
      failed: this.failedEmails,
      total: professionals.length
    };
    
    await fs.writeFile(
      'email-campaign-report.json',
      JSON.stringify(report, null, 2)
    );
    
    console.log('\n✅ Report saved to email-campaign-report.json');
  }
}

// Run if called directly
if (require.main === module) {
  const sender = new EmailInvitationSender();
  sender.run().catch(console.error);
}

module.exports = EmailInvitationSender;
