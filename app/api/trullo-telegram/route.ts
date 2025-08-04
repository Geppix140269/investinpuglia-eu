// PATH: app/api/trullo-telegram/route.ts
import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const GIUSEPPE_CHAT_ID = process.env.GIUSEPPE_TELEGRAM_CHAT_ID!;

// Track visitor patterns and behavior
const visitorTracking = new Map<string, {
  count: number;
  firstSeen: Date;
  lastSeen: Date;
  sessions: string[];
  leadScore: number;
  messages: number;
  avgSessionDuration: number;
  engagementScore: number;
  suspiciousBehaviors: string[];
}>();

// Track daily stats
const dailyStats = {
  date: new Date().toDateString(),
  totalConversations: 0,
  highQualityLeads: 0,
  topicsDiscussed: new Map<string, number>(),
  conversionRate: 0,
  totalVisitors: 0,
  suspiciousVisitors: 0
};

// Known datacenter providers (BUT WE WON'T AUTO-BLOCK!)
const datacenterRanges = {
  'AWS Ohio': ['3.136.', '3.137.', '3.138.', '3.139.', '52.14.', '52.15.', '18.188.', '18.189.', '18.190.', '18.191.'],
  'AWS Virginia': ['54.', '52.', '3.80.', '3.208.'],
  'Google Cloud': ['35.', '34.', '104.'],
  'Microsoft Azure': ['20.', '40.', '13.', '52.'],
  'Cloudflare': ['104.16.', '104.17.', '104.18.', '104.19.', '172.64.', '172.65.', '172.66.', '172.67.'],
  'Digital Ocean': ['104.131.', '104.236.', '107.170.', '138.68.', '138.197.', '139.59.'],
};

// Bot patterns (behaviors, not just technical indicators)
const botPatterns = {
  noMessages: 'Opens chat but never sends a message',
  rapidClicks: 'Clicks too fast (non-human speed)',
  sameMessagePattern: 'Sends identical messages',
  noReadTime: 'Responds without reading time',
  scriptedFlow: 'Follows exact same conversation pattern',
  noMouseMovement: 'No mouse movement detected',
  immediateExit: 'Exits immediately after opening'
};

// Urgent keywords for instant alerts
const urgentKeywords = ['urgent', 'immediately', 'today', 'now', 'asap', 'emergency'];

// High-value keywords for lead scoring
const highValueKeywords = {
  grants: ['grant', 'funding', 'subsidy', 'pia turismo', '50%'],
  investment: ['invest', 'property', 'real estate', 'purchase', 'buy'],
  serious: ['budget', 'timeline', 'requirements', 'application', 'qualify'],
  contact: ['call', 'meeting', 'appointment', 'discuss', 'email me']
};

// Calculate suspicion score (BUT MORE CAREFULLY!)
function calculateSuspicionScore(data: any, visitor: any): {
  score: number;
  reasons: string[];
  category: 'bot' | 'suspicious' | 'vpn_user' | 'corporate' | 'normal';
} {
  let score = 0;
  const reasons: string[] = [];
  let category: 'bot' | 'suspicious' | 'vpn_user' | 'corporate' | 'normal' = 'normal';

  // Check datacenter IP but be more nuanced
  let datacenterProvider = '';
  for (const [provider, ranges] of Object.entries(datacenterRanges)) {
    if (ranges.some(range => data.ip?.startsWith(range))) {
      datacenterProvider = provider;
      break;
    }
  }

  if (datacenterProvider) {
    // Don't immediately assume it's bad!
    if (datacenterProvider.includes('Cloudflare')) {
      reasons.push('🌐 Via Cloudflare (common for privacy-conscious users)');
      category = 'vpn_user';
      score += 1; // Very low score
    } else if (datacenterProvider.includes('AWS') || datacenterProvider.includes('Azure')) {
      reasons.push(`☁️ ${datacenterProvider} IP (could be VPN/corporate)`);
      category = 'corporate';
      score += 2; // Moderate score
    } else {
      reasons.push(`🏢 ${datacenterProvider} datacenter`);
      score += 2;
    }
  }

  // Check behavior patterns (MORE IMPORTANT THAN IP!)
  if (visitor) {
    // Multiple visits in short time
    const timeSinceLastVisit = Date.now() - visitor.lastSeen.getTime();
    const minutesAgo = timeSinceLastVisit / (1000 * 60);
    
    if (minutesAgo < 5 && visitor.count > 3) {
      score += 4;
      reasons.push('⚡ Rapid repeated visits (bot-like behavior)');
      category = 'bot';
    } else if (minutesAgo < 60 && visitor.count > 2) {
      score += 2;
      reasons.push('🔄 Frequent visits');
    }

    // Check engagement
    if (visitor.messages === 0 && visitor.count > 2) {
      score += 3;
      reasons.push('🤖 Never sends messages (lurker bot)');
      category = 'bot';
    }

    // Low engagement score
    if (visitor.engagementScore < 2 && visitor.count > 3) {
      score += 2;
      reasons.push('📉 Very low engagement');
    }
  }

  // Technical indicators (less weight)
  if (data.viewport === '360x640' && data.device === 'Desktop') {
    score += 2;
    reasons.push('📱 Desktop with mobile viewport (unusual)');
  }

  if (!data.referrer || data.referrer === 'Direct') {
    score += 0.5; // Very low weight - many legitimate users have no referrer
    reasons.push('🔗 Direct access');
  }

  // User agent checks
  const userAgent = data.userAgent?.toLowerCase() || '';
  const suspiciousAgents = ['bot', 'crawler', 'spider', 'scraper', 'wget', 'curl', 'python'];
  if (suspiciousAgents.some(agent => userAgent.includes(agent))) {
    score += 4;
    reasons.push('🕷️ Bot user agent detected');
    category = 'bot';
  }

  // Determine final category
  if (score >= 8) {
    category = 'bot';
  } else if (score >= 5) {
    category = 'suspicious';
  } else if (datacenterProvider && score < 4) {
    category = datacenterProvider.includes('Cloudflare') ? 'vpn_user' : 'corporate';
  }

  return { score: Math.min(score, 10), reasons, category };
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

  return Math.min(score, 20);
}

// Track visitor with behavior analysis
function trackVisitor(ip: string, sessionId: string, messageCount: number = 0): any {
  const existing = visitorTracking.get(ip);
  
  if (existing) {
    existing.count++;
    existing.lastSeen = new Date();
    existing.sessions.push(sessionId);
    existing.messages += messageCount;
    
    // Calculate engagement score
    existing.engagementScore = existing.messages / existing.count;
    
    if (existing.sessions.length > 10) {
      existing.sessions = existing.sessions.slice(-10);
    }
  } else {
    visitorTracking.set(ip, {
      count: 1,
      firstSeen: new Date(),
      lastSeen: new Date(),
      sessions: [sessionId],
      leadScore: 0,
      messages: messageCount,
      avgSessionDuration: 0,
      engagementScore: 0,
      suspiciousBehaviors: []
    });
    dailyStats.totalVisitors++;
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
         `⚠️ Suspicious Visitors: ${dailyStats.suspiciousVisitors}\n` +
         `📈 Conversion Rate: ${conversionRate}%\n\n` +
         `🎯 <b>Top Topics Discussed:</b>\n` +
         topTopics.map(([topic, count]) => `• ${topic}: ${count} times`).join('\n');
}

// Send Telegram notification
async function sendTelegramNotification(message: string, alertLevel: 'normal' | 'warning' | 'alert' = 'normal') {
  try {
    const prefix = alertLevel === 'alert' ? '🚨 ' : alertLevel === 'warning' ? '⚠️ ' : '';
    
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
      await sendTelegramNotification(generateDailySummary());
      
      // Reset daily stats
      dailyStats.date = new Date().toDateString();
      dailyStats.totalConversations = 0;
      dailyStats.highQualityLeads = 0;
      dailyStats.topicsDiscussed.clear();
      dailyStats.conversionRate = 0;
      dailyStats.totalVisitors = 0;
      dailyStats.suspiciousVisitors = 0;
    }
    
    switch (type) {
      case 'new_session':
        dailyStats.totalConversations++;
        
        // Track visitor
        const visitor = trackVisitor(data.ip, data.sessionId || 'unknown');
        
        // Calculate suspicion score with behavior analysis
        const { score, reasons, category } = calculateSuspicionScore(data, visitor);
        
        if (score >= 5) {
          dailyStats.suspiciousVisitors++;
        }
        
        // Determine alert level based on category
        if (category === 'bot' && score >= 8) {
          alertLevel = 'alert';
        } else if (category === 'suspicious' || score >= 5) {
          alertLevel = 'warning';
        }
        
        // Build message
        message = `<b>NEW TRULLO SESSION</b>\n\n`;
        
        // Show category
        const categoryEmoji = {
          'bot': '🤖 LIKELY BOT',
          'suspicious': '⚠️ SUSPICIOUS',
          'vpn_user': '🔒 VPN/PRIVACY USER',
          'corporate': '🏢 CORPORATE/WORK',
          'normal': '✅ NORMAL VISITOR'
        };
        
        message += `<b>Classification: ${categoryEmoji[category]}</b>\n`;
        
        // Add analysis if needed
        if (score > 0) {
          message += `🎯 <b>Analysis Score: ${score}/10</b>\n`;
          if (reasons.length > 0) {
            message += `📋 <b>Observations:</b>\n${reasons.join('\n')}\n\n`;
          }
        }
        
        // Visitor history
        if (visitor.count > 1) {
          message += `👤 <b>Visitor History:</b>\n`;
          message += `• Total visits: ${visitor.count}\n`;
          message += `• Messages sent: ${visitor.messages}\n`;
          message += `• Engagement score: ${visitor.engagementScore.toFixed(1)}\n`;
          message += `• First seen: ${visitor.firstSeen.toLocaleString()}\n`;
          message += `• Last seen: ${visitor.lastSeen.toLocaleString()}\n\n`;
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
        
        // Add recommendations based on category
        if (category === 'bot' && score >= 8) {
          message += `🚨 <b>RECOMMENDED ACTIONS:</b>\n` +
                    `• Monitor their behavior closely\n` +
                    `• If no messages after 2 visits, consider blocking\n` +
                    `• IP to watch: <code>${data.ip}</code>\n\n`;
        } else if (category === 'vpn_user' || category === 'corporate') {
          message += `💡 <b>NOTE:</b> Likely a legitimate user using:\n` +
                    `• ${category === 'vpn_user' ? 'VPN for privacy' : 'Corporate/work network'}\n` +
                    `• Monitor engagement, not just IP\n\n`;
        }
        
        message += `<a href="https://investinpuglia.eu">Open Site</a>`;
        break;
        
      case 'conversation_update':
        const messages = data.messages || [];
        const userMessages = messages.filter((m: any) => m.role === 'user');
        
        // Update visitor message count
        if (data.ip && visitorTracking.has(data.ip)) {
          const vis = visitorTracking.get(data.ip)!;
          vis.messages = userMessages.length;
          vis.engagementScore = vis.messages / vis.count;
        }
        
        // Check for urgent keywords
        const lastUserMessage = userMessages[userMessages.length - 1];
        if (lastUserMessage) {
          const urgentWords = urgentKeywords.filter(kw => 
            lastUserMessage.content.toLowerCase().includes(kw)
          );
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
        
        const hasContactInfo = messages.some((m: any) => 
          m.content.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)
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
                  `• Total messages: ${messages.length}\n` +
                  `• User messages: ${userMessages.length}\n` +
                  `• Has contact info: ${hasContactInfo ? '✅ Yes' : '❌ No'}\n` +
                  `• Lead score: ${leadScore}/20\n\n`;
        
        // Add key topics if found
        if (keyTopics.length > 0) {
          message += `🎯 <b>Topics Discussed:</b>\n${keyTopics.map(t => `• ${t}`).join('\n')}\n\n`;
        }
        
        // Add last few messages
        if (messages.length > 0) {
          message += `💬 <b>Recent Messages:</b>\n`;
          const recentMessages = messages.slice(-4); // Last 2 exchanges
          
          recentMessages.forEach((msg: any) => {
            const role = msg.role === 'user' ? '👤 User' : '🤖 Trullo';
            const content = msg.content.substring(0, 100) + (msg.content.length > 100 ? '...' : '');
            message += `\n${role}: "${content}"\n`;
          });
        }
        
        // Lead classification
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
        const finalMessages = data.messages || [];
        const duration = data.duration || 'Unknown';
        const finalUserMessages = finalMessages.filter((m: any) => m.role === 'user');
        const finalLeadScore = calculateLeadScore(finalMessages);
        
        // Update visitor with final session data
        if (data.ip && visitorTracking.has(data.ip)) {
          const vis = visitorTracking.get(data.ip)!;
          vis.messages = finalUserMessages.length;
          vis.leadScore = Math.max(vis.leadScore, finalLeadScore);
          
          // Update average session duration
          const durationMinutes = parseInt(duration) || 0;
          vis.avgSessionDuration = ((vis.avgSessionDuration * (vis.count - 1)) + durationMinutes) / vis.count;
        }
        
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
        } else if (finalUserMessages.length === 0) {
          message += `🤖 <b>CLASSIFICATION: SILENT VISITOR</b>\n`;
          message += `Note: Opened chat but never engaged\n\n`;
        } else {
          message += `❄️ <b>CLASSIFICATION: INFO SEEKER</b>\n\n`;
        }
        
        // Extract final topics
        const finalTopics = extractKeyTopics(finalMessages);
        if (finalTopics.length > 0) {
          message += `🎯 <b>Topics Covered:</b>\n${finalTopics.map(t => `• ${t}`).join('\n')}\n\n`;
        }
        
        // Add conversation snippet
        if (finalMessages.length > 0) {
          message += `📝 <b>Conversation Highlights:</b>\n`;
          message += `<code>`;
          
          // Show first and last few messages
          const highlights = [
            ...finalMessages.slice(0, 3),
            ...(finalMessages.length > 6 ? ['...'] : []),
            ...finalMessages.slice(-3)
          ];
          
          highlights.forEach((msg: any) => {
            if (msg === '...') {
              message += `\n...\n`;
            } else {
              const role = msg.role === 'user' ? 'U' : 'T';
              const content = msg.content.substring(0, 60) + (msg.content.length > 60 ? '...' : '');
              message += `${role}: ${content}\n`;
            }
          });
          
          message += `</code>`;
        }
        
        break;
        
      case 'new_contact':
        dailyStats.highQualityLeads++;
        
        message = `🎯 <b>NEW CONTACT REQUEST</b>\n\n` +
                 `👤 Name: ${data.name}\n` +
                 `📧 Email: ${data.email}\n` +
                 `📱 Phone: ${data.phone || 'N/A'}\n` +
                 `💬 Message: "${data.message.substring(0, 200)}..."\n` +
                 `🌐 IP: <code>${data.ip || 'Unknown'}</code>\n\n` +
                 `⚡ Action: Contact within 1 hour!`;
        
        alertLevel = 'alert';
        break;

      case 'daily_summary':
        message = generateDailySummary();
        break;
    }
    
    if (message) {
      await sendTelegramNotification(message, alertLevel);
    }
    
   return NextResponse.json({
  success: true,
  suspicionScore: type === 'new_session' ? suspicionScore : undefined,
  leadScore: type === 'conversation_update' ? calculateLeadScore(messages || []) : undefined
});
  } catch (error) {
    console.error('Telegram API error:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
