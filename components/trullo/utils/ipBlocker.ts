// PATH: components/trullo/utils/ipBlocker.ts

// Blocked IPs list
export const blockedIPs = [
  '3.136.158.121', // Ohio bot
  // Add more IPs as needed
];

// Blocked IP ranges (for entire hosting providers)
export const blockedIPRanges = [
  // '3.136.', // Uncomment to block all AWS Ohio
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

// Log blocked attempt
export async function logBlockedAttempt(ip: string, userAgent: string) {
  // You could send this to Telegram too
  console.log(`Blocked access attempt from ${ip} - ${userAgent}`);
}
