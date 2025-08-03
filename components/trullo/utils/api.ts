// PATH: components/trullo/utils/api.ts
import { Message, MessageForm, Language } from '../types';

// Helper function to detect browser type
function getBrowserInfo(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  return 'Other';
}

// Helper function to detect device type
function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'Mobile';
  return 'Desktop';
}

// Chat API
export async function sendChatMessage(
  messages: Message[],
  systemPrompt: string,
  language: Language
) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: messages.map(m => ({
        role: m.role,
        content: m.content
      })),
      system: systemPrompt,
      language
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get response');
  }

  return response.json();
}

// Email API
export async function sendEmailMessage(
  formData: MessageForm,
  language: Language
) {
  const response = await fetch('/api/trullo-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...formData,
      language
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to send message');
  }

  return response.json();
}

// Logging API
export async function logToSupabase(action: string, data: any) {
  try {
    const response = await fetch('/api/trullo-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        ...data
      })
    });
    
    return response.json();
  } catch (err) {
    console.error('Failed to log to Supabase:', err);
    return null;
  }
}

export async function startConversation(sessionId: string, language: Language) {
  // Send Telegram notification for new session
  try {
    // Get user's IP address and location data
    const ipResponse = await fetch('https://ipapi.co/json/');
    const locationData = await ipResponse.json();
    
    // Get additional browser/device information
    const userInfo = {
      // Browser info
      userAgent: navigator.userAgent,
      browser: getBrowserInfo(),
      device: getDeviceType(),
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      
      // Location info from IP
      ip: locationData.ip || 'Unknown',
      city: locationData.city || 'Unknown',
      region: locationData.region || 'Unknown',
      country: locationData.country_name || 'Unknown',
      countryCode: locationData.country_code || 'Unknown',
      timezone: locationData.timezone || 'Unknown',
      
      // Referrer and URL info
      referrer: document.referrer || 'Direct',
      currentPage: window.location.pathname,
      fullUrl: window.location.href,
      
      // Session info
      language: navigator.language || 'Unknown',
      chatLanguage: language,
      sessionId,
      started_at: new Date().toISOString()
    };
    
    // Send notification to Telegram
    await fetch('/api/trullo-telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'new_session',
        data: userInfo
      })
    });
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
  }
  
  // Continue with Supabase logging
  return logToSupabase('startConversation', {
    sessionId,
    language,
    userAgent: navigator.userAgent
  });
}

export async function logMessage(conversationId: string, role: 'user' | 'assistant', content: string) {
  return logToSupabase('logMessage', {
    conversationId,
    role,
    content
  });
}

export async function saveContactRequest(
  conversationId: string,
  contactData: MessageForm,
  language: Language
) {
  return logToSupabase('saveContactRequest', {
    conversationId,
    ...contactData,
    language
  });
}

export async function endConversation(conversationId: string) {
  return logToSupabase('endConversation', {
    conversationId
  });
}
