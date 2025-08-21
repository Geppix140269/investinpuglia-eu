// PATH: app/api/visitor-tracking/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const GIUSEPPE_CHAT_ID = process.env.GIUSEPPE_TELEGRAM_CHAT_ID!;

// In-memory storage for visitor data (consider using Redis/DB in production)
const visitorData = new Map<string, {
  visits: Array<{
    timestamp: Date;
    page: string;
    duration: number;
    referrer: string;
    userAgent: string;
    device: string;
    browser: string;
    os: string;
  }>;
  location: {
    country: string;
    countryCode: string;
    region: string;
    city: string;
    latitude: number;
    longitude: number;
    timezone: string;
    isp: string;
  };
  firstVisit: Date;
  lastVisit: Date;
  totalPageViews: number;
  totalDuration: number;
  bounceRate: number;
  isReturning: boolean;
  engagementScore: number;
}>();

// Country statistics
const countryStats = new Map<string, {
  visitors: number;
  pageViews: number;
  avgDuration: number;
  bounceRate: number;
  cities: Map<string, number>;
}>();

// Daily statistics
const dailyStats = {
  date: new Date().toDateString(),
  totalVisitors: 0,
  totalPageViews: 0,
  uniqueCountries: new Set<string>(),
  topPages: new Map<string, number>(),
  topReferrers: new Map<string, number>(),
  deviceTypes: new Map<string, number>(),
  browsers: new Map<string, number>(),
  hourlyVisits: Array(24).fill(0),
  newVisitors: 0,
  returningVisitors: 0,
  avgSessionDuration: 0,
  bounceRate: 0,
};

// Get real IP address considering proxies
function getRealIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  const cloudflare = request.headers.get('cf-connecting-ip');
  
  return cloudflare || real || forwarded?.split(',')[0] || 'unknown';
}

// Parse user agent to get device info
function parseUserAgent(userAgent: string): {
  device: string;
  browser: string;
  os: string;
} {
  const ua = userAgent.toLowerCase();
  
  // Detect device type
  let device = 'Desktop';
  if (/mobile|android|iphone/i.test(ua)) {
    device = 'Mobile';
  } else if (/tablet|ipad/i.test(ua)) {
    device = 'Tablet';
  }
  
  // Detect browser
  let browser = 'Unknown';
  if (ua.includes('chrome') && !ua.includes('edg')) {
    browser = 'Chrome';
  } else if (ua.includes('safari') && !ua.includes('chrome')) {
    browser = 'Safari';
  } else if (ua.includes('firefox')) {
    browser = 'Firefox';
  } else if (ua.includes('edg')) {
    browser = 'Edge';
  } else if (ua.includes('opera')) {
    browser = 'Opera';
  }
  
  // Detect OS
  let os = 'Unknown';
  if (ua.includes('windows')) {
    os = 'Windows';
  } else if (ua.includes('mac')) {
    os = 'macOS';
  } else if (ua.includes('linux')) {
    os = 'Linux';
  } else if (ua.includes('android')) {
    os = 'Android';
  } else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) {
    os = 'iOS';
  }
  
  return { device, browser, os };
}

// Get geolocation data from IP
async function getGeolocation(ip: string): Promise<any> {
  try {
    // Using ip-api.com (free tier allows 1000 requests per month)
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query`);
    const data = await response.json();
    
    if (data.status === 'success') {
      return {
        country: data.country,
        countryCode: data.countryCode,
        region: data.regionName,
        city: data.city,
        latitude: data.lat,
        longitude: data.lon,
        timezone: data.timezone,
        isp: data.isp,
        isProxy: data.proxy,
        isMobile: data.mobile,
        isHosting: data.hosting,
      };
    }
  } catch (error) {
    console.error('Geolocation error:', error);
  }
  
  return {
    country: 'Unknown',
    countryCode: 'XX',
    region: 'Unknown',
    city: 'Unknown',
    latitude: 0,
    longitude: 0,
    timezone: 'Unknown',
    isp: 'Unknown',
  };
}

// Update country statistics
function updateCountryStats(location: any, duration: number, isNewVisitor: boolean) {
  const country = location.country;
  const city = location.city;
  
  if (!countryStats.has(country)) {
    countryStats.set(country, {
      visitors: 0,
      pageViews: 0,
      avgDuration: 0,
      bounceRate: 0,
      cities: new Map(),
    });
  }
  
  const stats = countryStats.get(country)!;
  if (isNewVisitor) {
    stats.visitors++;
  }
  stats.pageViews++;
  stats.avgDuration = ((stats.avgDuration * (stats.pageViews - 1)) + duration) / stats.pageViews;
  
  // Track cities
  stats.cities.set(city, (stats.cities.get(city) || 0) + 1);
  
  // Add to daily unique countries
  dailyStats.uniqueCountries.add(country);
}

// Calculate engagement score
function calculateEngagementScore(visitor: any): number {
  let score = 0;
  
  // Page views (max 30 points)
  score += Math.min(visitor.totalPageViews * 3, 30);
  
  // Session duration (max 30 points)
  const avgDuration = visitor.totalDuration / visitor.visits.length;
  score += Math.min(avgDuration / 60, 30); // 1 point per minute, max 30
  
  // Returning visitor (20 points)
  if (visitor.isReturning) {
    score += 20;
  }
  
  // Low bounce rate (20 points)
  if (visitor.bounceRate < 0.3) {
    score += 20;
  }
  
  return Math.min(score, 100);
}

// Generate geographic report
function generateGeographicReport(): string {
  const sortedCountries = Array.from(countryStats.entries())
    .sort((a, b) => b[1].visitors - a[1].visitors)
    .slice(0, 10);
  
  let report = `🌍 <b>GEOGRAPHIC VISITOR REPORT</b>\n\n`;
  report += `📅 Date: ${new Date().toLocaleDateString()}\n`;
  report += `🌐 Unique Countries: ${dailyStats.uniqueCountries.size}\n`;
  report += `👥 Total Visitors: ${dailyStats.totalVisitors}\n`;
  report += `📄 Total Page Views: ${dailyStats.totalPageViews}\n\n`;
  
  report += `🏆 <b>TOP COUNTRIES BY VISITORS:</b>\n`;
  sortedCountries.forEach(([country, stats], index) => {
    const topCity = Array.from(stats.cities.entries())
      .sort((a, b) => b[1] - a[1])[0];
    
    report += `\n${index + 1}. <b>${country}</b>\n`;
    report += `   👥 Visitors: ${stats.visitors}\n`;
    report += `   📄 Page Views: ${stats.pageViews}\n`;
    report += `   ⏱️ Avg Duration: ${Math.round(stats.avgDuration)}s\n`;
    if (topCity) {
      report += `   🏙️ Top City: ${topCity[0]} (${topCity[1]} visits)\n`;
    }
  });
  
  // Device breakdown
  const deviceTotal = Array.from(dailyStats.deviceTypes.values()).reduce((a, b) => a + b, 0);
  if (deviceTotal > 0) {
    report += `\n📱 <b>DEVICE BREAKDOWN:</b>\n`;
    dailyStats.deviceTypes.forEach((count, device) => {
      const percentage = ((count / deviceTotal) * 100).toFixed(1);
      report += `• ${device}: ${count} (${percentage}%)\n`;
    });
  }
  
  // Browser breakdown
  const browserTotal = Array.from(dailyStats.browsers.values()).reduce((a, b) => a + b, 0);
  if (browserTotal > 0) {
    report += `\n🌐 <b>BROWSER BREAKDOWN:</b>\n`;
    const topBrowsers = Array.from(dailyStats.browsers.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    topBrowsers.forEach(([browser, count]) => {
      const percentage = ((count / browserTotal) * 100).toFixed(1);
      report += `• ${browser}: ${count} (${percentage}%)\n`;
    });
  }
  
  // Top pages
  if (dailyStats.topPages.size > 0) {
    report += `\n📊 <b>TOP PAGES:</b>\n`;
    const topPages = Array.from(dailyStats.topPages.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    topPages.forEach(([page, views]) => {
      report += `• ${page}: ${views} views\n`;
    });
  }
  
  // Visitor types
  report += `\n👤 <b>VISITOR TYPES:</b>\n`;
  report += `• New Visitors: ${dailyStats.newVisitors}\n`;
  report += `• Returning Visitors: ${dailyStats.returningVisitors}\n`;
  
  // Engagement metrics
  report += `\n📈 <b>ENGAGEMENT METRICS:</b>\n`;
  report += `• Avg Session Duration: ${Math.round(dailyStats.avgSessionDuration)}s\n`;
  report += `• Bounce Rate: ${(dailyStats.bounceRate * 100).toFixed(1)}%\n`;
  
  // Peak hours
  const peakHour = dailyStats.hourlyVisits.indexOf(Math.max(...dailyStats.hourlyVisits));
  report += `• Peak Hour: ${peakHour}:00 (${dailyStats.hourlyVisits[peakHour]} visits)\n`;
  
  return report;
}

// Send Telegram notification
async function sendTelegramNotification(message: string) {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: GIUSEPPE_CHAT_ID,
          text: message,
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

// Track page view
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const ip = getRealIP(request);
    const userAgent = request.headers.get('user-agent') || '';
    const { device, browser, os } = parseUserAgent(userAgent);
    
    // Get geolocation
    const location = await getGeolocation(ip);
    
    // Get or create visitor record
    let visitor = visitorData.get(ip);
    const isNewVisitor = !visitor;
    
    if (!visitor) {
      visitor = {
        visits: [],
        location,
        firstVisit: new Date(),
        lastVisit: new Date(),
        totalPageViews: 0,
        totalDuration: 0,
        bounceRate: 0,
        isReturning: false,
        engagementScore: 0,
      };
      visitorData.set(ip, visitor);
      dailyStats.newVisitors++;
      dailyStats.totalVisitors++;
    } else {
      visitor.isReturning = true;
      dailyStats.returningVisitors++;
    }
    
    // Record visit
    visitor.visits.push({
      timestamp: new Date(),
      page: data.page || '/',
      duration: data.duration || 0,
      referrer: data.referrer || 'Direct',
      userAgent,
      device,
      browser,
      os,
    });
    
    visitor.lastVisit = new Date();
    visitor.totalPageViews++;
    visitor.totalDuration += data.duration || 0;
    
    // Calculate bounce rate (single page visits)
    const uniquePages = new Set(visitor.visits.map(v => v.page));
    visitor.bounceRate = uniquePages.size === 1 ? 1 : 0;
    
    // Calculate engagement score
    visitor.engagementScore = calculateEngagementScore(visitor);
    
    // Update statistics
    dailyStats.totalPageViews++;
    dailyStats.topPages.set(data.page, (dailyStats.topPages.get(data.page) || 0) + 1);
    dailyStats.topReferrers.set(data.referrer || 'Direct', (dailyStats.topReferrers.get(data.referrer || 'Direct') || 0) + 1);
    dailyStats.deviceTypes.set(device, (dailyStats.deviceTypes.get(device) || 0) + 1);
    dailyStats.browsers.set(browser, (dailyStats.browsers.get(browser) || 0) + 1);
    
    const hour = new Date().getHours();
    dailyStats.hourlyVisits[hour]++;
    
    // Update country stats
    updateCountryStats(location, data.duration || 0, isNewVisitor);
    
    // Calculate daily averages
    if (dailyStats.totalVisitors > 0) {
      const allVisitors = Array.from(visitorData.values());
      dailyStats.avgSessionDuration = allVisitors.reduce((sum, v) => sum + (v.totalDuration / v.visits.length), 0) / allVisitors.length;
      dailyStats.bounceRate = allVisitors.filter(v => v.bounceRate === 1).length / allVisitors.length;
    }
    
    // Send notification for new visitors from interesting locations
    if (isNewVisitor && location.country !== 'Unknown') {
      const message = `🌍 <b>NEW VISITOR FROM ${location.country.toUpperCase()}</b>\n\n` +
                     `📍 Location: ${location.city}, ${location.region}\n` +
                     `🌐 ISP: ${location.isp}\n` +
                     `📱 Device: ${device} (${os})\n` +
                     `🔗 Browser: ${browser}\n` +
                     `📄 Landing Page: ${data.page}\n` +
                     `🔙 Referrer: ${data.referrer || 'Direct'}\n` +
                     `${location.isProxy ? '⚠️ Using Proxy/VPN\n' : ''}` +
                     `${location.isMobile ? '📱 Mobile Network\n' : ''}`;
      
      // Only notify for non-bot traffic
      if (!userAgent.toLowerCase().includes('bot') && !userAgent.toLowerCase().includes('crawler')) {
        await sendTelegramNotification(message);
      }
    }
    
    return NextResponse.json({
      success: true,
      visitor: {
        isReturning: visitor.isReturning,
        engagementScore: visitor.engagementScore,
        totalPageViews: visitor.totalPageViews,
        location: location.city + ', ' + location.country,
      }
    });
    
  } catch (error) {
    console.error('Visitor tracking error:', error);
    return NextResponse.json({ error: 'Failed to track visitor' }, { status: 500 });
  }
}

// Get analytics data
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const report = searchParams.get('report');
  
  if (report === 'geographic') {
    // Generate and send geographic report
    const reportText = generateGeographicReport();
    await sendTelegramNotification(reportText);
    
    return NextResponse.json({
      success: true,
      report: reportText,
      data: {
        countries: Array.from(countryStats.entries()),
        dailyStats,
        totalVisitors: visitorData.size,
      }
    });
  }
  
  // Return general analytics data
  return NextResponse.json({
    dailyStats,
    countryStats: Array.from(countryStats.entries()),
    totalVisitors: visitorData.size,
    visitors: Array.from(visitorData.entries()).map(([ip, data]) => ({
      ip,
      ...data,
    })),
  });
}