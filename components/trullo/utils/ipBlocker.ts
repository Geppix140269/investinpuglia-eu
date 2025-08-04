// PATH: components/trullo/utils/ipBlocker.ts

// Blocked IPs list - ADD THE OHIO BOT HERE!
export const blockedIPs = [
  '3.136.158.121', // Ohio bot that visits every few hours
  // Add more IPs as you identify them from Telegram alerts
];

// Blocked IP ranges (for entire hosting providers)
export const blockedIPRanges = [
  // Uncomment to block entire ranges:
  // '3.136.', // Block all AWS Ohio
  // '52.', // Block all AWS
  // '35.', // Block all Google Cloud
];

// Check if IP should be blocked
export function isIPBlocked(ip: string): boolean {
  // Check exact IP matches
  if (blockedIPs.includes(ip)) {
    return true;
  }
  
  // Check IP ranges
  for (const range of blockedIPRanges) {
    if (ip.startsWith(range)) {
      return true;
    }
  }
  
  return false;
}

// Get block message based on language
export function getBlockedMessage(language: string): string {
  const messages: Record<string, string> = {
    en: 'Access restricted. Please contact support if you believe this is an error.',
    it: 'Accesso limitato. Contatta il supporto se ritieni che questo sia un errore.',
    es: 'Acceso restringido. Contacta con soporte si crees que esto es un error.',
    fr: 'Accès restreint. Contactez le support si vous pensez qu\'il s\'agit d\'une erreur.',
    de: 'Zugriff eingeschränkt. Kontaktieren Sie den Support, wenn Sie glauben, dass dies ein Fehler ist.',
    ar: 'الوصول مقيد. يرجى الاتصال بالدعم إذا كنت تعتقد أن هذا خطأ.',
    zh: '访问受限。如果您认为这是错误，请联系支持。'
  };
  
  return messages[language] || messages.en;
}

// Log blocked attempt (you can enhance this to send to Telegram)
export async function logBlockedAttempt(ip: string, userAgent: string) {
  console.log(`[BLOCKED] IP: ${ip} - UA: ${userAgent}`);
  
  // Optional: Send notification to Telegram
  try {
    await fetch('/api/trullo-telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'bot_detected',
        data: {
          ip,
          city: 'Unknown (Blocked)',
          country: 'Unknown (Blocked)',
          score: 10,
          reasons: ['IP is on blocklist', 'Access denied']
        }
      })
    });
  } catch (error) {
    console.error('Failed to send blocked notification:', error);
  }
}
