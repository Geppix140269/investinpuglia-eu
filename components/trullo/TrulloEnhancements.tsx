// components/trullo/TrulloEnhancements.tsx
// THIS IS AN ENHANCEMENT MODULE - Integrates with existing TrulloChatbot.tsx

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// ============================================
// 1. SMART USER IDENTIFICATION & PROFILING
// ============================================

export interface EnhancedUserProfile {
  // Basic info (extracted from conversation)
  email?: string;
  name?: string;
  phone?: string;
  
  // Investment details (auto-extracted)
  investmentBudget?: string;
  propertyType?: string;
  timeline?: string;
  interestedInGrants?: boolean;
  
  // Behavioral metrics
  trustScore: number;
  engagementLevel: 'hot' | 'warm' | 'cold';
  lastEngagement: Date;
  totalInteractions: number;
  
  // Source tracking
  referralSource?: string;
  firstTouchpoint?: string;
  location?: {
    city: string;
    country: string;
    timezone: string;
  };
}

export class UserProfileExtractor {
  static extractFromMessage(message: string, existingProfile?: EnhancedUserProfile): Partial<EnhancedUserProfile> {
    const updates: Partial<EnhancedUserProfile> = {};
    
    // Email extraction (multiple formats)
    const emailPatterns = [
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
      /my email is ([^\s]+@[^\s]+)/i,
      /contact me at ([^\s]+@[^\s]+)/i
    ];
    
    for (const pattern of emailPatterns) {
      const match = message.match(pattern);
      if (match) {
        updates.email = match[1] || match[0];
        break;
      }
    }
    
    // Name extraction
    const namePatterns = [
      /(?:my name is|i'm|i am|this is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
      /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+here/i
    ];
    
    for (const pattern of namePatterns) {
      const match = message.match(pattern);
      if (match) {
        updates.name = match[1];
        break;
      }
    }
    
    // Budget extraction with multiple formats
    const budgetPatterns = [
      /€?\s*(\d+(?:,\d{3})*(?:\.\d+)?)\s*(?:k|K|thousand|million|M)/,
      /budget.*?(\d+(?:,\d{3})*)/i,
      /(\d+(?:,\d{3})*)\s*(?:euro|EUR|€)/i
    ];
    
    for (const pattern of budgetPatterns) {
      const match = message.match(pattern);
      if (match) {
        updates.investmentBudget = match[0];
        break;
      }
    }
    
    // Property type detection (expanded list)
    const propertyTypes = [
      'trullo', 'trulli', 'masseria', 'villa', 'apartment', 
      'hotel', 'b&b', 'bed and breakfast', 'agriturismo', 
      'resort', 'restaurant', 'commercial', 'land', 'palazzo'
    ];
    
    const lowerMessage = message.toLowerCase();
    for (const type of propertyTypes) {
      if (lowerMessage.includes(type)) {
        updates.propertyType = type;
        break;
      }
    }
    
    // Timeline detection
    const timelineIndicators = {
      'urgent': ['asap', 'immediately', 'urgent', 'right away', 'this month'],
      'short': ['this year', '6 months', '3 months', 'soon'],
      'medium': ['next year', '12 months', 'within a year'],
      'long': ['2 years', '3 years', 'future', 'planning', 'considering']
    };
    
    for (const [timeline, indicators] of Object.entries(timelineIndicators)) {
      if (indicators.some(ind => lowerMessage.includes(ind))) {
        updates.timeline = timeline;
        break;
      }
    }
    
    // Grant interest detection
    if (lowerMessage.includes('grant') || lowerMessage.includes('pia') || 
        lowerMessage.includes('funding') || lowerMessage.includes('subsidy')) {
      updates.interestedInGrants = true;
    }
    
    return updates;
  }
  
  static calculateTrustScore(profile: EnhancedUserProfile, messageCount: number): number {
    let score = 0;
    
    // Base score for engagement
    score += Math.min(messageCount * 5, 30); // Max 30 points for messages
    
    // Contact info provided
    if (profile.email) score += 25;
    if (profile.name) score += 10;
    if (profile.phone) score += 15;
    
    // Investment details
    if (profile.investmentBudget) score += 20;
    if (profile.propertyType) score += 10;
    if (profile.timeline === 'urgent' || profile.timeline === 'short') score += 20;
    
    return Math.min(score, 100);
  }
}

// ============================================
// 2. CONVERSATION SUMMARY & EMAIL SYSTEM
// ============================================

export class ConversationSummarizer {
  static async generateSummary(
    messages: any[],
    userProfile: EnhancedUserProfile,
    sessionId: string
  ) {
    // Extract key points from conversation
    const keyPoints = this.extractKeyPoints(messages);
    const concerns = this.identifyConcerns(messages);
    const nextSteps = this.generateNextSteps(userProfile, concerns);
    
    return {
      sessionId,
      timestamp: new Date().toISOString(),
      duration: this.calculateDuration(messages),
      userProfile: {
        email: userProfile.email,
        name: userProfile.name,
        trustScore: userProfile.trustScore,
        engagementLevel: userProfile.engagementLevel
      },
      investmentDetails: {
        budget: userProfile.investmentBudget,
        propertyType: userProfile.propertyType,
        timeline: userProfile.timeline,
        interestedInGrants: userProfile.interestedInGrants
      },
      conversationInsights: {
        keyPoints,
        concerns,
        sentiment: this.analyzeSentiment(messages),
        readyToBuy: userProfile.trustScore > 70
      },
      recommendedActions: nextSteps,
      followUpScheduled: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days
    };
  }
  
  private static extractKeyPoints(messages: any[]): string[] {
    const points: string[] = [];
    const allContent = messages.map(m => m.content).join(' ').toLowerCase();
    
    // Topics discussed
    if (allContent.includes('grant') || allContent.includes('pia')) {
      points.push('Interested in EU grants and funding opportunities');
    }
    if (allContent.includes('tax')) {
      points.push('Inquired about tax benefits and incentives');
    }
    if (allContent.includes('renovation')) {
      points.push('Planning property renovation project');
    }
    if (allContent.includes('masseria') || allContent.includes('trullo')) {
      points.push('Interested in traditional Puglia properties');
    }
    
    return points;
  }
  
  private static identifyConcerns(messages: any[]): string[] {
    const concerns: string[] = [];
    const allContent = messages.map(m => m.content).join(' ').toLowerCase();
    
    if (allContent.includes('legitimate') || allContent.includes('scam') || allContent.includes('trust')) {
      concerns.push('Verification of legitimacy');
    }
    if (allContent.includes('expensive') || allContent.includes('cost') || allContent.includes('afford')) {
      concerns.push('Budget and costs');
    }
    if (allContent.includes('complicated') || allContent.includes('difficult') || allContent.includes('complex')) {
      concerns.push('Process complexity');
    }
    if (allContent.includes('risk') || allContent.includes('safe')) {
      concerns.push('Investment risks');
    }
    
    return concerns;
  }
  
  private static generateNextSteps(profile: EnhancedUserProfile, concerns: string[]): string[] {
    const steps: string[] = [];
    
    // Based on trust score
    if (profile.trustScore > 70) {
      steps.push('Schedule 30-minute consultation with Giuseppe');
      steps.push('Prepare personalized investment proposal');
      steps.push('Share specific property recommendations');
    } else if (profile.trustScore > 40) {
      steps.push('Send case studies of similar investors');
      steps.push('Share video testimonials from satisfied clients');
      steps.push('Provide detailed grant eligibility assessment');
    } else {
      steps.push('Send introductory guide to Puglia investments');
      steps.push('Share success stories and ROI examples');
      steps.push('Offer free investment readiness assessment');
    }
    
    // Address specific concerns
    if (concerns.includes('Verification of legitimacy')) {
      steps.push('Send partnership credentials (Engel & Völkers, banks)');
    }
    if (concerns.includes('Budget and costs')) {
      steps.push('Provide detailed cost breakdown and financing options');
    }
    
    return steps;
  }
  
  private static analyzeSentiment(messages: any[]): 'positive' | 'neutral' | 'negative' {
    const positiveWords = ['interested', 'excited', 'great', 'perfect', 'love', 'amazing', 'definitely'];
    const negativeWords = ['worried', 'concerned', 'expensive', 'difficult', 'unsure', 'risky'];
    
    const allContent = messages.map(m => m.content).join(' ').toLowerCase();
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
      if (allContent.includes(word)) positiveCount++;
    });
    
    negativeWords.forEach(word => {
      if (allContent.includes(word)) negativeCount++;
    });
    
    if (positiveCount > negativeCount + 2) return 'positive';
    if (negativeCount > positiveCount + 2) return 'negative';
    return 'neutral';
  }
  
  private static calculateDuration(messages: any[]): string {
    if (messages.length < 2) return '< 1 minute';
    
    const first = new Date(messages[0].timestamp);
    const last = new Date(messages[messages.length - 1].timestamp);
    const minutes = Math.round((last.getTime() - first.getTime()) / 60000);
    
    if (minutes < 1) return '< 1 minute';
    if (minutes === 1) return '1 minute';
    return `${minutes} minutes`;
  }
}

// ============================================
// 3. SMART FOLLOW-UP SCHEDULER
// ============================================

export class FollowUpScheduler {
  static async scheduleFollowUp(
    userProfile: EnhancedUserProfile,
    conversationSummary: any
  ) {
    const followUpData = {
      email: userProfile.email,
      name: userProfile.name,
      scheduledFor: this.calculateOptimalTime(userProfile),
      followUpType: this.determineFollowUpType(userProfile),
      personalizedMessage: this.generatePersonalizedMessage(userProfile, conversationSummary),
      priority: this.calculatePriority(userProfile),
      automationTriggers: this.setupAutomationTriggers(userProfile)
    };
    
    // Store in Supabase
    const { data, error } = await supabase
      .from('trullo_scheduled_followups')
      .insert(followUpData);
    
    if (!error) {
      console.log('Follow-up scheduled:', followUpData);
    }
    
    return followUpData;
  }
  
  private static calculateOptimalTime(profile: EnhancedUserProfile): Date {
    // Smart scheduling based on engagement level
    const baseDelay = profile.engagementLevel === 'hot' ? 1 : 
                      profile.engagementLevel === 'warm' ? 3 : 7;
    
    const followUpDate = new Date();
    followUpDate.setDate(followUpDate.getDate() + baseDelay);
    
    // Schedule for optimal time (10 AM in user's timezone if known)
    followUpDate.setHours(10, 0, 0, 0);
    
    return followUpDate;
  }
  
  private static determineFollowUpType(profile: EnhancedUserProfile): string {
    if (profile.trustScore > 70) return 'closing_sequence';
    if (profile.trustScore > 40) return 'nurture_sequence';
    return 'education_sequence';
  }
  
  private static generatePersonalizedMessage(
    profile: EnhancedUserProfile,
    summary: any
  ): string {
    const templates = {
      'hot': `Hi ${profile.name || 'there'}! Following up on our conversation about ${profile.propertyType || 'your investment'} in Puglia. Giuseppe has reviewed your requirements and found some exciting opportunities that match perfectly...`,
      'warm': `Hi ${profile.name || 'there'}! I wanted to share some updates about ${summary.conversationInsights.keyPoints[0] || 'Puglia investments'} that might interest you...`,
      'cold': `Hi ${profile.name || 'there'}! Just checking if you had any questions about investing in Puglia. We're here whenever you're ready to explore further...`
    };
    
    return templates[profile.engagementLevel] || templates['cold'];
  }
  
  private static calculatePriority(profile: EnhancedUserProfile): number {
    // 1-10 scale based on multiple factors
    let priority = 5;
    
    if (profile.trustScore > 70) priority += 3;
    if (profile.investmentBudget) priority += 1;
    if (profile.timeline === 'urgent') priority += 1;
    
    return Math.min(priority, 10);
  }
  
  private static setupAutomationTriggers(profile: EnhancedUserProfile) {
    return {
      sendEmailIn3Days: true,
      sendWhatsAppIfHot: profile.engagementLevel === 'hot' && profile.phone,
      addToNewsletterList: true,
      notifyGiuseppe: profile.trustScore > 80,
      createCRMTask: true
    };
  }
}

// ============================================
// 4. TRUST BUILDING SYSTEM
// ============================================

export class TrustBuilder {
  static getTrustSignals(): string[] {
    return [
      "✅ Partnership with Engel & Völkers",
      "🏆 €12M+ in grants secured for clients",
      "📊 87% grant approval rate",
      "👥 500+ satisfied investors",
      "🏛️ 35+ years of experience",
      "🔒 Success-fee model - we only win when you do"
    ];
  }
  
  static getProgressiveTrustContent(messageCount: number): string {
    const content = {
      1: "Did you know we work exclusively with Engel & Völkers?",
      3: "Our team has secured over €12M in EU grants with an 87% approval rate.",
      5: "Giuseppe personally reviews every investment opportunity to ensure quality.",
      7: "We operate on a success-fee basis - we only succeed when you do.",
      10: "With 500+ satisfied investors from 15+ countries, we're Puglia's trusted investment partner."
    };
    
    return content[messageCount as keyof typeof content] || "";
  }
  
  static generateTrustBadges(profile: EnhancedUserProfile) {
    const badges = [];
    
    if (profile.trustScore > 30) badges.push({ icon: "🔍", text: "Verified Interest" });
    if (profile.trustScore > 50) badges.push({ icon: "💎", text: "Quality Lead" });
    if (profile.trustScore > 70) badges.push({ icon: "🔥", text: "Hot Prospect" });
    if (profile.trustScore > 90) badges.push({ icon: "⭐", text: "VIP Investor" });
    
    return badges;
  }
}

// ============================================
// 5. AMAZING EMAIL TEMPLATES
// ============================================

export const EmailTemplates = {
  conversationSummary: (data: any) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          background: #f5f5f5;
        }
        .wrapper { background: #f5f5f5; padding: 40px 20px; }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: white; 
          border-radius: 12px; 
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }
        .header { 
          background: linear-gradient(135deg, #667eea 0%, #10b981 100%); 
          color: white; 
          padding: 40px 30px; 
          text-align: center;
        }
        .header h1 { font-size: 28px; margin-bottom: 10px; }
        .header p { opacity: 0.95; font-size: 16px; }
        .trust-badges {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
        }
        .badge {
          background: rgba(255,255,255,0.2);
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 12px;
        }
        .content { padding: 40px 30px; }
        .greeting { font-size: 20px; color: #333; margin-bottom: 20px; }
        .section {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .section h3 {
          color: #667eea;
          font-size: 16px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .progress-bar {
          background: #e5e7eb;
          height: 24px;
          border-radius: 12px;
          overflow: hidden;
          margin: 15px 0;
        }
        .progress-fill {
          background: linear-gradient(90deg, #667eea, #10b981);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          font-weight: bold;
          transition: width 0.3s;
        }
        .key-point {
          padding: 12px;
          background: white;
          border-left: 3px solid #667eea;
          margin: 10px 0;
          border-radius: 4px;
        }
        .cta-section {
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
          border-radius: 8px;
          padding: 30px;
          text-align: center;
          margin: 30px 0;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #667eea, #10b981);
          color: white;
          padding: 14px 32px;
          text-decoration: none;
          border-radius: 28px;
          font-weight: bold;
          font-size: 16px;
          margin: 10px 5px;
        }
        .cta-secondary {
          display: inline-block;
          background: white;
          color: #667eea;
          padding: 12px 28px;
          text-decoration: none;
          border-radius: 28px;
          border: 2px solid #667eea;
          font-weight: bold;
          font-size: 14px;
          margin: 10px 5px;
        }
        .conversation-snippet {
          background: #fafafa;
          border-radius: 8px;
          padding: 15px;
          margin: 10px 0;
          border: 1px solid #e5e7eb;
        }
        .message {
          margin: 8px 0;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
        }
        .user-message {
          background: #e0f2fe;
          text-align: right;
        }
        .assistant-message {
          background: #f3e8ff;
        }
        .footer {
          background: #1f2937;
          color: #9ca3af;
          padding: 30px;
          text-align: center;
          font-size: 12px;
        }
        .footer a { color: #60a5fa; text-decoration: none; }
        .social-links {
          margin: 20px 0;
        }
        .social-links a {
          display: inline-block;
          margin: 0 10px;
          color: white;
          font-size: 20px;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <h1>🏛️ Your Puglia Investment Journey</h1>
            <p>Personalized insights from your conversation with Trullo AI</p>
            <div class="trust-badges">
              <span class="badge">✅ Verified Partners</span>
              <span class="badge">🏆 87% Success Rate</span>
              <span class="badge">💼 35+ Years Experience</span>
            </div>
          </div>
          
          <div class="content">
            <div class="greeting">
              Hello ${data.userProfile.name || 'Valued Investor'} 👋
            </div>
            
            <p>Thank you for taking the time to explore investment opportunities in Puglia with us. 
            Based on our conversation, I've prepared this personalized summary to help guide your next steps.</p>
            
            <div class="section">
              <h3>📊 Your Investment Profile</h3>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${data.userProfile.trustScore}%">
                  Trust Score: ${data.userProfile.trustScore}%
                </div>
              </div>
              <div style="margin-top: 15px;">
                <strong>Investment Details:</strong>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  ${data.investmentDetails.budget ? `<li>Budget Range: <strong>${data.investmentDetails.budget}</strong></li>` : ''}
                  ${data.investmentDetails.propertyType ? `<li>Property Type: <strong>${data.investmentDetails.propertyType}</strong></li>` : ''}
                  ${data.investmentDetails.timeline ? `<li>Timeline: <strong>${data.investmentDetails.timeline}</strong></li>` : ''}
                  ${data.investmentDetails.interestedInGrants ? `<li>✅ Interested in EU Grants (up to €2.25M available)</li>` : ''}
                </ul>
              </div>
            </div>
            
            <div class="section">
              <h3>💡 Key Discussion Points</h3>
              ${data.conversationInsights.keyPoints.map((point: string) => `
                <div class="key-point">
                  ✓ ${point}
                </div>
              `).join('')}
            </div>
            
            ${data.conversationInsights.concerns.length > 0 ? `
              <div class="section">
                <h3>🤔 Your Concerns (And Our Solutions)</h3>
                ${data.conversationInsights.concerns.map((concern: string) => `
                  <div class="key-point">
                    <strong>${concern}</strong><br>
                    <span style="color: #10b981; font-size: 14px;">
                      ${concern.includes('legitimacy') ? '→ We work exclusively with Engel & Völkers and have verifiable partnerships' :
                        concern.includes('cost') ? '→ Our success-fee model means we only profit when you do' :
                        concern.includes('complex') ? '→ Giuseppe personally guides you through every step' :
                        '→ We have solutions for all your concerns'}
                    </span>
                  </div>
                `).join('')}
              </div>
            ` : ''}
            
            <div class="section">
              <h3>🚀 Your Personalized Next Steps</h3>
              ${data.recommendedActions.map((action: string, index: number) => `
                <div class="key-point">
                  <strong>${index + 1}.</strong> ${action}
                </div>
              `).join('')}
            </div>
            
            <div class="cta-section">
              <h2 style="color: #1f2937; margin-bottom: 10px;">Ready to Move Forward?</h2>
              <p style="color: #6b7280; margin-bottom: 20px;">
                Giuseppe Funaro would love to personally discuss your investment plans
              </p>
              <a href="https://calendly.com/investinpuglia/30min" class="cta-button">
                📅 Schedule Free Consultation
              </a>
              <br>
              <a href="mailto:g.funaro@investinpuglia.eu" class="cta-secondary">
                ✉️ Email Giuseppe Directly
              </a>
            </div>
            
            <div class="section" style="background: #fef3c7; border: 2px solid #fbbf24;">
              <h3>⏰ What Happens Next?</h3>
              <ol style="margin: 10px 0; padding-left: 25px;">
                <li style="margin: 8px 0;">You'll receive a follow-up email in <strong>3 days</strong> with tailored opportunities</li>
                <li style="margin: 8px 0;">Giuseppe will personally review your requirements</li>
                <li style="margin: 8px 0;">We'll prepare a customized investment proposal</li>
                <li style="margin: 8px 0;">You can reach us anytime at <strong>+39 351 400 1402</strong></li>
              </ol>
            </div>
            
            <div class="section">
              <h3>💬 Conversation Highlights</h3>
              <div class="conversation-snippet">
                ${data.conversationHighlights ? data.conversationHighlights.slice(-3).map((msg: any) => `
                  <div class="message ${msg.role === 'user' ? 'user-message' : 'assistant-message'}">
                    <strong>${msg.role === 'user' ? 'You' : 'Trullo'}:</strong> 
                    ${msg.content.substring(0, 150)}${msg.content.length > 150 ? '...' : ''}
                  </div>
                `).join('') : '<p>Your conversation details are saved for reference.</p>'}
              </div>
            </div>
          </div>
          
          <div class="footer">
            <div style="margin-bottom: 20px;">
              <strong style="color: white; font-size: 14px;">Why 500+ Investors Trust InvestInPuglia</strong>
            </div>
            <div style="margin: 20px 0; color: #d1d5db;">
              ✅ €12M+ Grants Secured | 🏆 87% Approval Rate | 🤝 Exclusive Vetted Network | 💼 35+ Years Experience
            </div>
            <div class="social-links">
              <a href="https://investinpuglia.eu">🌐 Website</a>
              <a href="https://wa.me/393514001402">📱 WhatsApp</a>
              <a href="tel:+393514001402">📞 Call</a>
            </div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #374151;">
              <p>This email was sent because you engaged with Trullo AI on InvestInPuglia.eu</p>
              <p>Your privacy is our priority. <a href="https://investinpuglia.eu/privacy">Privacy Policy</a></p>
              <p>© 2025 InvestInPuglia. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,
  
  followUpEmail: (data: any) => `
    <!-- Similar structure with follow-up specific content -->
  `
};

// ============================================
// EXPORT ALL ENHANCEMENTS
// ============================================

export const TrulloEnhancements = {
  UserProfileExtractor,
  ConversationSummarizer,
  FollowUpScheduler,
  TrustBuilder,
  EmailTemplates
};