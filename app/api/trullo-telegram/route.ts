// PATH: app/api/trullo-telegram/route.ts
import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const GIUSEPPE_CHAT_ID = process.env.GIUSEPPE_TELEGRAM_CHAT_ID!;

// Track visitor patterns (in production, use Redis or database)
const visitorTracking = new Map<string, {
  count: number;
  firstSeen: Date;
  lastSeen: Date;
  sessions: string[];
  leadScore: number;
}>();

// Track daily stats
const dailyStats = {
  date: new Date().toDateString(),
  totalConversations: 0,
  highQualityLeads: 0,
  topicsDiscussed: new Map<string, number>(),
  conversionRate: 0,
  totalVisitors: 0,
  botsDetected: 0
};

// Known bot/VPN/hosting IP ranges
const suspiciousIPRanges = [
  '3.136.', '3.137.', '3.138.', '3.139.', // AWS Ohio
  '52.14.', '52.15.', '18.188.', '18.189.', '18.190.', '18.191.', // AWS Ohio
  '35.', '34.', // Google Cloud
  '13.', '54.', // AWS General
  '20.', '40.', '52.', // Azure
];

// Suspicious user agents
const botUserAgents = [
  'bot', 'crawler', 'spider', 'scraper', 'wget', 'curl', 'python',
  'headless', 'phantom', 'selenium', 'puppeteer'
];

// Urgent keywords for instant alerts
const urgentKeywords = ['urgent', 'immediately', 'today', 'now', 'asap', 'emergency'];

// High-value keywords for lead scoring
const highValueKeywords = {
  grants: ['grant', 'funding', 'subsidy', 'pia turismo', '50%'],
  investment: ['invest', 'property', 'real estate', 'purchase', 'buy'],
  serious: ['budget', 'timeline', 'requirements', 'application', 'qualify'],
  contact: ['call', 'meeting', 'appointment', 'discuss', 'email me']
};

// Calculate suspicion score
function calculateSuspicionScore(data: any): {
  score: number;
  reasons: string[];
} {
  let score = 0;
  const reasons: string[] = [];

  // Check if IP is from known hosting/VPN providers
  const isHostingIP = suspiciousIPRanges.some(range => data.ip?.startsWith(range));
  if (isHostingIP) {
    score += 3;
    reasons.push('🏢 Hosting/Cloud IP detected');
  }

  // Check viewport (360x640 is common bot size)
  if (data.viewport === '360x640' || data.viewport === '1920x1080') {
    score += 2;
    reasons.push('🤖 Common bot viewport size');
  }

  // Check referrer
  if (data.referrer === 'Direct' || !data.referrer) {
    score += 1;
    reasons.push('🔗 No referrer (direct access)');
  }

  // Check user agent for bot indicators
  const userAgent = data.userAgent?.toLowerCase() || '';
  if (botUserAgents.some(bot => userAgent.includes(bot))) {
    score += 3;
    reasons.push('🕷️ Bot user agent detected');
  }

  // Check device type
  if (data.device === 'Desktop' && data.viewport === '360x640') {
    score += 2;
    reasons.push('📱 Desktop claiming mobile viewport');
  }

  // Check visitor frequency
  const visitor = visitorTracking.get(data.ip);
  if (visitor) {
    const timeSinceLastVisit = Date.now() - visitor.lastSeen.getTime();
    const hoursAgo = timeSinceLastVisit / (1000 * 60 * 60);
    
    if (visitor.count > 5) {
      score += 2;
      reasons.push(`🔄 ${visitor.count} visits total`);
    }
    
    if (hoursAgo < 1) {
      score += 3;
      reasons.push(`⏰ Last visit ${Math.round(hoursAgo * 60)} minutes ago`);
    } else if (hoursAgo < 6) {
      score += 1;
      reasons.push(`⏰ Last visit ${Math.round(hoursAgo)} hours ago`);
    }
  }

  // Geographic anomalies
  const suspiciousLocations = ['Hilliard', 'Ashburn', 'Council Bluffs', 'Mountain View'];
  if (suspiciousLocations.includes(data.city)) {
    score += 1;
    reasons.push('📍 Common datacenter location');
  }

  return { score, reasons };
}

// Calculate lead score
function calculateLeadScore(messages: any[]): number {
  let score = 0;

  // Check for high-value keywords
  Object.values(highValueKeywords).forEach(keywords => {
    const mentioned = keywords.filter(kw => 
      messages.some(m => m.content.toLowerCase().includes(kw))
    ).length;
    score += mentioned * 2;
  });

  // More messages = more engaged
  if (messages.length > 10) score += 3;
  else if (messages.length > 5) score += 1;

  // Shared contact info = high intent
  const hasEmail = messages.some(m => 
    m.content.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)
  );
  if (hasEmail) score += 5;

  // Asked questions = engaged
  const questions = messages.filter(m => 
    m.role === 'user' && m.content.includes('?')
  ).length;
  score += Math.min(questions * 2, 6);

  return Math.min(score, 20); // Max 20 points
}

// Track visitor
function trackVisitor(ip: string, sessionId: string): any {
  const existing = visitorTracking.get(ip);
  
  if (existing) {
    existing.count++;
    existing.lastSeen = new Date();
    existing.sessions.push(sessionId);
    if (existing.sessions.length > 10) {
      existing.sessions = existing.sessions.slice(-10);
    }
  } else {
    visitorTracking.set(ip, {
      count: 1,
      firstSeen: new Date(),
      lastSeen: new Date(),
      sessions: [sessionId],
      leadScore: 0
    });
    dailyStats.totalVisitors++;
  }
  
  // Clean up old entries (older than 7 days)
  const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
  for (const [ip, data] of visitorTracking.entries()) {
    if (data.lastSeen.getTime() < weekAgo) {
      visitorTracking.delete(ip);
    }
  }
  
  return visitorTracking.get(ip)!;
}

// Extract key topics
function extractKeyTopics(messages: any[]): string[] {
  const topics = new Set<string>();
  const topicKeywords = {
    'PIA Turismo Grants': ['pia', 'turismo', '50%', 'grant'],
    'Tax Benefits': ['tax', '7%', 'flat tax', 'retiree'],
    'Property Investment': ['property', 'real estate', 'buy', 'invest'],
    'EU Funding': ['eu', 'european', 'funding', 'subsidy'],
    'Residency': ['residency', 'visa', 'moving', 'relocate'],
    'Banking': ['bank', 'account', 'fiscal code'],
  };
  
  messages.forEach(msg => {
    const content = msg.content.toLowerCase();
    Object.entries(topicKeywords).forEach(([topic, keywords]) => {
      if (keywords.some(kw => content.includes(kw))) {
        topics.add(topic);
        // Update daily stats
        dailyStats.topicsDiscussed.set(
          topic, 
          (dailyStats.topicsDiscussed.get(topic) || 0) + 1
        );
      }
    });
  });
  
  return Array.from(topics);
}

// Calculate conversation quality
function calculateConversationQuality(messages: any[]): number {
  let score = 5; // Base score
  
  // More messages = higher engagement
  if (messages.length > 10) score += 2;
  else if (messages.length > 5) score += 1;
  
  // User asking questions = good
  const userQuestions = messages.filter(m => 
    m.role === 'user' && m.content.includes('?')
  ).length;
  if (userQuestions > 2) score += 1;
  
  // Sharing contact info = high intent
  const hasContact = messages.some(m => 
    m.content.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)
  );
  if (hasContact) score += 2;
  
  // Mentioned specific services = interested
  const serviceKeywords = ['grant', 'investment', 'property', 'tax benefit'];
  const mentionedServices = serviceKeywords.filter(kw =>
    messages.some(m => m.content.toLowerCase().includes(kw))
  ).length;
  score += Math.min(mentionedServices, 2);
  
  return Math.min(score, 10);
}

// Check for urgent keywords
function checkUrgentKeywords(message: string): string[] {
  return urgentKeywords.filter(kw => 
    message.toLowerCase().includes(kw)
  );
}

// Generate daily summary
function generateDailySummary(): string {
  const topTopics = Array.from(dailyStats.topicsDiscussed.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  const conversionRate = dailyStats.totalVisitors > 0 
    ? Math.round((dailyStats.highQualityLeads / dailyStats.totalVisitors) * 100)
    : 0;

  return `📊 <b>DAILY SUMMARY - ${dailyStats.date}</b>\n\n` +
         `👥 Total Visitors: ${dailyStats.totalVisitors}\n` +
         `💬 Total Conversations: ${dailyStats.totalConversations}\n` +
         `⭐ High Quality Leads: ${dailyStats.highQualityLeads}\n` +
         `🤖 Bots Detected: ${dailyStats.botsDetected}\n` +
         `📈 Conversion Rate: ${conversionRate}%\n\n` +
         `🎯 <b>Top Topics Discussed:</b>\n` +
         topTopics.map(([topic, count]) => `• ${topic}: ${count} times`).join('\n');
}

// Send Telegram notification
async function sendTelegramNotification(message: string, alertLevel: 'normal' | 'warning' | 'alert' = 'normal') {
  try {
    // Add emoji based on alert level
    const prefix = alertLevel === 'alert' ? '🚨🚨🚨 ' : alertLevel === 'warning' ? '⚠️ ' : '';
    
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: GIUSEPPE_CHAT_ID,
          text: prefix + message,
          parse_mode: 'HTML'
        })
      }
    );
    
    const result = await response.json();
    console.log('Telegram notification sent:', result);
    return result;
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();
    
    let message = '';
    let alertLevel: 'normal' | 'warning' | 'alert' = 'normal';
    
    // Check if it's a new day and send summary
    if (new Date().toDateString() !== dailyStats.date) {
      // Send yesterday's summary
      await sendTelegramNotification(generateDailySummary());
      
      // Reset daily stats
      dailyStats.date = new Date().toDateString();
      dailyStats.totalConversations = 0;
      dailyStats.highQualityLeads = 0;
      dailyStats.topicsDiscussed.clear();
      dailyStats.conversionRate = 0;
      dailyStats.totalVisitors = 0;
      dailyStats.botsDetected = 0;
    }
    
    switch (type) {
      case 'new_session':
        dailyStats.totalConversations++;
        
        // Track visitor
        const visitor = trackVisitor(data.ip, data.sessionId || 'unknown');
        
        // Calculate suspicion score
        const { score, reasons } = calculateSuspicionScore(data);
        
        if (score >= 7) {
          dailyStats.botsDetected++;
        }
        
        // Determine alert level
        if (score >= 7) {
          alertLevel = 'alert';
        } else if (score >= 4) {
          alertLevel = 'warning';
        }
        
        // Build message
        message = `<b>NEW TRULLO SESSION</b>\n\n`;
        
        // Add suspicion analysis if needed
        if (score > 0) {
          message += `🎯 <b>Suspicion Score: ${score}/10</b>\n`;
          if (reasons.length > 0) {
            message += `📋 <b>Reasons:</b>\n${reasons.join('\n')}\n\n`;
          }
        }
        
        // Visitor history
        if (visitor.count > 1) {
          message += `👤 <b>Visitor History:</b>\n`;
          message += `• Total visits: ${visitor.count}\n`;
          message += `• First seen: ${visitor.firstSeen.toLocaleString()}\n`;
          message += `• Last seen: ${visitor.lastSeen.toLocaleString()}\n`;
          message += `• Lead score: ${visitor.leadScore}/20\n\n`;
        }
        
        message += `📍 <b>Location:</b>\n` +
                  `🌍 ${data.city}, ${data.region}\n` +
                  `🏴 ${data.country} (${data.countryCode})\n` +
                  `🌐 IP: <code>${data.ip}</code>\n` +
                  `⏰ Timezone: ${data.timezone}\n\n` +
                  `💻 <b>Device Info:</b>\n` +
                  `📱 Type: ${data.device}\n` +
                  `🌐 Browser: ${data.browser}\n` +
                  `📐 Screen: ${data.screenResolution}\n` +
                  `🖼️ Viewport: ${data.viewport}\n\n` +
                  `🔍 <b>Session Info:</b>\n` +
                  `💬 Chat Language: ${data.chatLanguage}\n` +
                  `🌐 Browser Language: ${data.language}\n` +
                  `📄 Current Page: ${data.currentPage}\n` +
                  `🔗 Referrer: ${data.referrer}\n` +
                  `⏰ Started: ${new Date(data.started_at).toLocaleString()}\n\n`;
        
        // Add action recommendations for suspicious visitors
        if (score >= 7) {
          message += `⚡ <b>RECOMMENDED ACTIONS:</b>\n` +
                    `• Consider blocking IP: <code>${data.ip}</code>\n` +
                    `• Monitor for unusual behavior\n` +
                    `• Check if messages are automated\n\n`;
        }
        
        message += `<a href="https://investinpuglia.eu">Open Site</a>`;
        break;
        
      case 'conversation_update':
        // Track the conversation
        const messages = data.messages || [];
        const userMessages = messages.filter((m: any) => m.role === 'user');
        const assistantMessages = messages.filter((m: any) => m.role === 'assistant');
        
        // Check for urgent keywords
        const lastUserMessage = userMessages[userMessages.length - 1];
        if (lastUserMessage) {
          const urgentWords = checkUrgentKeywords(lastUserMessage.content);
          if (urgentWords.length > 0) {
            alertLevel = 'alert';
            message += `🔴 <b>URGENT INQUIRY DETECTED!</b>\n`;
            message += `Keywords: ${urgentWords.join(', ')}\n\n`;
          }
        }
        
        // Calculate lead score
        const leadScore = calculateLeadScore(messages);
        
        // Update visitor lead score
        if (data.ip && visitorTracking.has(data.ip)) {
          const vis = visitorTracking.get(data.ip)!;
          vis.leadScore = Math.max(vis.leadScore, leadScore);
        }
        
        // Analyze conversation
        const conversationLength = messages.length;
        const hasContactInfo = messages.some((m: any) => 
          m.content.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/) || // Email
          m.content.match(/\b\d{10,}\b/) // Phone
        );
        
        // Extract key topics discussed
        const keyTopics = extractKeyTopics(messages);
        
        // Build conversation summary
        message += `💬 <b>CONVERSATION UPDATE</b>\n\n` +
                  `👤 <b>Session Info:</b>\n` +
                  `🌐 IP: <code>${data.ip}</code>\n` +
                  `📍 Location: ${data.city}, ${data.country}\n` +
                  `🌍 Language: ${data.language}\n\n` +
                  `📊 <b>Conversation Stats:</b>\n` +
                  `• Total messages: ${conversationLength}\n` +
                  `• User messages: ${userMessages.length}\n` +
                  `• Trullo responses: ${assistantMessages.length}\n` +
                  `• Has contact info: ${hasContactInfo ? '✅ Yes' : '❌ No'}\n` +
                  `• Lead score: ${leadScore}/20\n\n`;
        
        // Add key topics if found
        if (keyTopics.length > 0) {
          message += `🎯 <b>Topics Discussed:</b>\n${keyTopics.map(t => `• ${t}`).join('\n')}\n\n`;
        }
        
        // Add last few messages
        if (messages.length > 0) {
          message += `💬 <b>Recent Messages:</b>\n`;
          const recentMessages = messages.slice(-6); // Last 3 exchanges
          
          recentMessages.forEach((msg: any) => {
            const role = msg.role === 'user' ? '👤 User' : '🤖 Trullo';
            const content = msg.content.substring(0, 100) + (msg.content.length > 100 ? '...' : '');
            message += `\n${role}: "${content}"\n`;
          });
        }
        
        // Add alerts for important keywords
        const importantKeywords = ['grant', 'funding', '50%', 'tax', 'invest', 'property', 'buy', 'purchase'];
        const mentionedKeywords = importantKeywords.filter(kw => 
          messages.some((m: any) => m.content.toLowerCase().includes(kw))
        );
        
        if (mentionedKeywords.length > 0) {
          message += `\n⚡ <b>Important Keywords:</b> ${mentionedKeywords.join(', ')}`;
        }
        
        // Check if user seems ready to convert
        if (leadScore >= 15) {
          message += `\n\n🏆 <b>HIGH VALUE LEAD!</b> Score: ${leadScore}/20`;
          message += `\n📞 Consider immediate follow-up!`;
          alertLevel = 'alert';
          dailyStats.highQualityLeads++;
        } else if (leadScore >= 10) {
          message += `\n\n⭐ <b>QUALIFIED LEAD!</b> Score: ${leadScore}/20`;
          alertLevel = 'warning';
        }
        
        break;

      case 'conversation_end':
        // Full conversation summary when chat ends
        const finalMessages = data.messages || [];
        const duration = data.duration || 'Unknown';
        const finalUserMessages = finalMessages.filter((m: any) => m.role === 'user');
        const finalLeadScore = calculateLeadScore(finalMessages);
        
        message = `🏁 <b>CONVERSATION ENDED</b>\n\n` +
                 `👤 <b>Visitor:</b>\n` +
                 `🌐 IP: <code>${data.ip}</code>\n` +
                 `📍 ${data.city}, ${data.country}\n` +
                 `⏱️ Duration: ${duration}\n\n` +
                 `📊 <b>Final Stats:</b>\n` +
                 `• Total messages: ${finalMessages.length}\n` +
                 `• User messages: ${finalUserMessages.length}\n` +
                 `• Contact info shared: ${data.hasContactInfo ? '✅' : '❌'}\n` +
                 `• Lead score: ${finalLeadScore}/20\n\n`;
        
        // Add conversation quality score
        const qualityScore = calculateConversationQuality(finalMessages);
        message += `⭐ <b>Quality Score: ${qualityScore}/10</b>\n\n`;
        
        // Lead classification
        if (finalLeadScore >= 15) {
          message += `🏆 <b>CLASSIFICATION: HOT LEAD</b>\n`;
          message += `Action: Contact within 1 hour!\n\n`;
        } else if (finalLeadScore >= 10) {
          message += `⭐ <b>CLASSIFICATION: WARM LEAD</b>\n`;
          message += `Action: Follow up within 24 hours\n\n`;
        } else if (finalLeadScore >= 5) {
          message += `📋 <b>CLASSIFICATION: COLD LEAD</b>\n`;
          message += `Action: Add to nurture campaign\n\n`;
        } else {
          message += `❄️ <b>CLASSIFICATION: INFO SEEKER</b>\n\n`;
        }
        
        // Extract final topics
        const finalTopics = extractKeyTopics(finalMessages);
        if (finalTopics.length > 0) {
          message += `🎯 <b>Topics Covered:</b>\n${finalTopics.map(t => `• ${t}`).join('\n')}\n\n`;
        }
        
        // Add full conversation transcript (limited)
        if (finalMessages.length > 0) {
          message += `📝 <b>Conversation Transcript:</b>\n`;
          message += `<code>`;
          
          finalMessages.forEach((msg: any, index: number) => {
            if (index < 20) { // Limit to prevent too long messages
              const role = msg.role === 'user' ? 'U' : 'T';
              const content = msg.content.substring(0, 80) + (msg.content.length > 80 ? '...' : '');
              message += `${role}: ${content}\n`;
            }
          });
          
          if (finalMessages.length > 20) {
            message += `\n... ${finalMessages.length - 20} more messages`;
          }
          
          message += `</code>`;
        }
        
        break;
        
      case 'new_contact':
        dailyStats.highQualityLeads++;
        
        message = `🎯 <b>NEW CONTACT REQUEST</b>\n\n` +
                 `👤 Name: ${data.name}\n` +
                 `📧 Email: ${data.email}\n` +
                 `📱 Phone: ${data.phone || 'N/A'}\n` +
                 `💬 Message: "${data.message.substring(0, 100)}..."\n` +
                 `🌐 IP: <code>${data.ip || 'Unknown'}</code>\n\n` +
                 `⚡ Action: Contact within 1 hour!`;
        
        alertLevel = 'alert';
        break;
        
      case 'keyword_alert':
        alertLevel = 'warning';
        message = `⚡ <b>KEYWORD ALERT</b>\n\n` +
                 `🔑 Keywords: ${data.keywords.join(', ')}\n` +
                 `💬 Message: "${data.message.substring(0, 150)}..."\n` +
                 `👤 From: ${data.role}\n` +
                 `🌐 IP: <code>${data.ip || 'Unknown'}</code>\n`;
        break;
        
      case 'bot_detected':
        alertLevel = 'alert';
        dailyStats.botsDetected++;
        
        message = `<b>BOT/SCRAPER DETECTED!</b>\n\n` +
                 `🌐 IP: <code>${data.ip}</code>\n` +
                 `📍 Location: ${data.city}, ${data.country}\n` +
                 `🎯 Suspicion Score: ${data.score}/10\n` +
                 `📋 Detection Reasons:\n${data.reasons.join('\n')}\n\n` +
                 `⚡ <b>Automatic Actions Taken:</b>\n` +
                 `• IP has been logged\n` +
                 `• Session is being monitored\n` +
                 `• Rate limiting applied\n\n` +
                 `Consider adding <code>${data.ip}</code> to permanent blocklist.`;
        break;

      case 'daily_summary':
        message = generateDailySummary();
        break;
    }
    
    if (message) {
      await sendTelegramNotification(message, alertLevel);
      
      // If high suspicion, send a separate bot detection alert
      if (type === 'new_session' && score >= 7) {
        setTimeout(() => {
          sendTelegramNotification(
            `<b>BOT/SCRAPER DETECTED!</b>\n\n` +
            `🌐 IP: <code>${data.ip}</code>\n` +
            `📍 Location: ${data.city}, ${data.country}\n` +
            `🎯 Suspicion Score: ${score}/10\n` +
            `📋 Detection Reasons:\n${reasons.join('\n')}\n\n` +
            `⚡ <b>Recommended:</b> Block this IP!`,
            'alert'
          );
        }, 1000);
      }
    }
    
    return NextResponse.json({ 
      success: true,
      suspicionScore: type === 'new_session' ? score : undefined,
      leadScore: type === 'conversation_update' ? calculateLeadScore(data.messages || []) : undefined
    });
  } catch (error) {
    console.error('Telegram API error:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
