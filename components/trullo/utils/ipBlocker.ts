// IP Blocker utilities for Trullo

const BLOCKED_IPS: string[] = [];
const RATE_LIMIT_STORE = new Map<string, { count: number; timestamp: number }>();
const MAX_REQUESTS_PER_MINUTE = 30;

export function isIpBlocked(ip: string): boolean {
  return BLOCKED_IPS.includes(ip);
}

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const userLimit = RATE_LIMIT_STORE.get(identifier);
  
  if (!userLimit) {
    RATE_LIMIT_STORE.set(identifier, { count: 1, timestamp: now });
    return true;
  }
  
  // Reset if more than a minute has passed
  if (now - userLimit.timestamp > 60000) {
    RATE_LIMIT_STORE.set(identifier, { count: 1, timestamp: now });
    return true;
  }
  
  // Check if limit exceeded
  if (userLimit.count >= MAX_REQUESTS_PER_MINUTE) {
    return false;
  }
  
  // Increment count
  userLimit.count++;
  return true;
}

export function blockIp(ip: string): void {
  if (!BLOCKED_IPS.includes(ip)) {
    BLOCKED_IPS.push(ip);
  }
}
