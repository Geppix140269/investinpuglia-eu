/**
 * Smart name extraction and personalization utilities
 * Handles missing names gracefully for email campaigns
 */

export interface NameExtractionResult {
  firstName: string;
  fullName: string;
  confidence: 'high' | 'medium' | 'low' | 'none';
  salutation: string;
}

/**
 * Extract name from email address
 */
export function extractNameFromEmail(email: string): NameExtractionResult {
  if (!email || !email.includes('@')) {
    return {
      firstName: '',
      fullName: '',
      confidence: 'none',
      salutation: 'Dear Investor'
    };
  }

  // Get the part before @
  const localPart = email.split('@')[0].toLowerCase();
  
  // Remove common prefixes/suffixes
  const cleanedPart = localPart
    .replace(/[0-9]+/g, '') // Remove numbers
    .replace(/[-_\.]/g, ' ') // Replace separators with space
    .trim();

  // Common patterns to extract first name
  let firstName = '';
  let fullName = '';
  let confidence: 'high' | 'medium' | 'low' | 'none' = 'none';

  // Pattern 1: firstname.lastname or firstname_lastname
  if (cleanedPart.includes(' ') || localPart.includes('.') || localPart.includes('_')) {
    const parts = cleanedPart.split(' ').filter(p => p.length > 0);
    if (parts.length >= 1) {
      firstName = capitalizeFirst(parts[0]);
      fullName = parts.map(p => capitalizeFirst(p)).join(' ');
      confidence = parts.length === 2 ? 'high' : 'medium';
    }
  }
  // Pattern 2: Single name (no separators)
  else if (cleanedPart.length > 2 && cleanedPart.length < 20 && !/^(info|admin|contact|support|sales|hello|mail)/.test(cleanedPart)) {
    firstName = capitalizeFirst(cleanedPart);
    fullName = firstName;
    confidence = 'low';
  }
  // Pattern 3: Company emails with clear personal names
  else if (localPart.match(/^[a-z]+$/i) && localPart.length > 2 && localPart.length < 15) {
    firstName = capitalizeFirst(localPart);
    fullName = firstName;
    confidence = 'medium';
  }

  // Generate appropriate salutation
  let salutation = 'Dear Investor';
  if (firstName && confidence !== 'none') {
    salutation = `Dear ${firstName}`;
  }

  return {
    firstName,
    fullName,
    confidence,
    salutation
  };
}

/**
 * Get personalized greeting based on available data
 */
export function getPersonalizedGreeting(
  email: string, 
  providedName?: string,
  options?: {
    formal?: boolean;
    fallback?: string;
    includeTime?: boolean;
  }
): string {
  const opts = {
    formal: false,
    fallback: 'Dear Valued Investor',
    includeTime: false,
    ...options
  };

  // If we have a provided name, use it
  if (providedName && providedName.trim()) {
    const name = providedName.trim();
    if (opts.formal) {
      return `Dear Mr./Ms. ${name}`;
    }
    return `Dear ${name}`;
  }

  // Try to extract from email
  const extracted = extractNameFromEmail(email);
  
  // Use extracted name if confident enough
  if (extracted.confidence === 'high' || extracted.confidence === 'medium') {
    return extracted.salutation;
  }

  // Use time-based greeting as alternative
  if (opts.includeTime) {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }

  // Use fallback
  return opts.fallback;
}

/**
 * Generate smart salutations for different campaign types
 */
export function getCampaignSalutation(
  email: string,
  name?: string,
  campaignType?: 'cold' | 'warm' | 'hot' | 'newsletter'
): string {
  // For known contacts with names
  if (name && name.trim()) {
    return `Dear ${name.trim()}`;
  }

  // Campaign-specific fallbacks
  const campaignFallbacks = {
    cold: [
      'Dear Future Puglia Investor',
      'Dear Investment Professional',
      'Greetings from Puglia',
      'Dear Valued Professional'
    ],
    warm: [
      'Dear Friend',
      'Welcome back',
      'Dear Valued Member',
      'Greetings'
    ],
    hot: [
      'Dear Partner',
      'Dear Esteemed Client',
      'Welcome'
    ],
    newsletter: [
      'Dear InvestInPuglia Community',
      'Dear Subscribers',
      'Hello Everyone'
    ]
  };

  // Try to extract name
  const extracted = extractNameFromEmail(email);
  if (extracted.confidence === 'high') {
    return extracted.salutation;
  }

  // Use campaign-specific fallback
  const fallbacks = campaignFallbacks[campaignType || 'cold'];
  const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  
  return randomFallback;
}

/**
 * Batch process emails to extract names
 */
export function batchExtractNames(emails: string[]): Map<string, NameExtractionResult> {
  const results = new Map<string, NameExtractionResult>();
  
  emails.forEach(email => {
    results.set(email, extractNameFromEmail(email));
  });
  
  return results;
}

/**
 * Generate Firebase update queries for extracted names
 */
export function generateNameUpdateQueries(emails: string[]): Array<{email: string, name: string}> {
  const updates: Array<{email: string, name: string}> = [];
  
  emails.forEach(email => {
    const extracted = extractNameFromEmail(email);
    if (extracted.confidence === 'high' && extracted.firstName) {
      updates.push({
        email,
        name: extracted.firstName
      });
    }
  });
  
  return updates;
}

/**
 * Smart email personalization
 */
export function personalizeEmailContent(
  template: string,
  data: {
    email: string;
    name?: string;
    company?: string;
    [key: string]: any;
  }
): string {
  let content = template;
  
  // Get the best possible name
  const greeting = getPersonalizedGreeting(data.email, data.name);
  
  // Replace common tokens
  content = content.replace(/\[Name\]/g, data.name || extractNameFromEmail(data.email).firstName || 'Friend');
  content = content.replace(/\[Greeting\]/g, greeting);
  content = content.replace(/\[Email\]/g, data.email);
  content = content.replace(/\[Company\]/g, data.company || 'your company');
  
  // Replace any other custom tokens
  Object.keys(data).forEach(key => {
    const token = `[${key}]`;
    if (content.includes(token)) {
      content = content.replace(new RegExp(token, 'g'), data[key] || '');
    }
  });
  
  return content;
}

/**
 * Utility: Capitalize first letter
 */
function capitalizeFirst(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Test function to see extracted names
 */
export function testNameExtraction(): void {
  const testEmails = [
    'luc.vantilburg@icloud.com',
    'daniel.m.smith84@gmail.com',
    'greg@henriquezpartners.com',
    'byrne_dara@yahoo.com',
    'info@company.com',
    'john.doe@example.com',
    'sarah_johnson@test.com',
    'mike123@email.com',
    'contact@business.org'
  ];

  console.log('Email Name Extraction Test:\n');
  testEmails.forEach(email => {
    const result = extractNameFromEmail(email);
    console.log(`${email}:`);
    console.log(`  → Name: ${result.firstName || '(none)'}`);
    console.log(`  → Confidence: ${result.confidence}`);
    console.log(`  → Salutation: ${result.salutation}`);
    console.log('');
  });
}