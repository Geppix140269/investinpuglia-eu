// PATH: app/api/telegram-reports/route.ts
import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const GIUSEPPE_CHAT_ID = process.env.GIUSEPPE_TELEGRAM_CHAT_ID!;

// Send Telegram notification
async function sendTelegramNotification(message: string, parseMode: 'HTML' | 'Markdown' = 'HTML') {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: GIUSEPPE_CHAT_ID,
          text: message,
          parse_mode: parseMode
        })
      }
    );
    
    const result = await response.json();
    console.log('Telegram report sent:', result);
    return result;
  } catch (error) {
    console.error('Failed to send Telegram report:', error);
    throw error;
  }
}

// Generate comprehensive analytics report
async function generateAnalyticsReport(period: 'daily' | 'weekly' | 'monthly'): Promise<string> {
  try {
    // Fetch visitor tracking data
    const visitorResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/visitor-tracking`);
    const visitorData = await visitorResponse.json();
    
    // Fetch Trullo analytics data  
    const trulloResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/trullo-analytics`);
    const trulloData = await trulloResponse.json();
    
    const now = new Date();
    const periodEmoji = period === 'daily' ? '📅' : period === 'weekly' ? '📆' : '📊';
    const periodTitle = period.charAt(0).toUpperCase() + period.slice(1);
    
    let report = `${periodEmoji} <b>${periodTitle.toUpperCase()} ANALYTICS REPORT</b>\n`;
    report += `📍 InvestInPuglia.eu\n`;
    report += `⏰ ${now.toLocaleString()}\n`;
    report += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    // Website Traffic Overview
    report += `🌐 <b>WEBSITE TRAFFIC</b>\n`;
    report += `👥 Total Visitors: ${visitorData.dailyStats?.totalVisitors || 0}\n`;
    report += `📄 Page Views: ${visitorData.dailyStats?.totalPageViews || 0}\n`;
    report += `🆕 New Visitors: ${visitorData.dailyStats?.newVisitors || 0}\n`;
    report += `🔄 Returning: ${visitorData.dailyStats?.returningVisitors || 0}\n`;
    report += `⏱️ Avg Duration: ${Math.round(visitorData.dailyStats?.avgSessionDuration || 0)}s\n`;
    report += `📊 Bounce Rate: ${((visitorData.dailyStats?.bounceRate || 0) * 100).toFixed(1)}%\n\n`;
    
    // Geographic Distribution
    if (visitorData.countryStats && visitorData.countryStats.length > 0) {
      report += `🗺️ <b>TOP COUNTRIES</b>\n`;
      const topCountries = visitorData.countryStats
        .sort((a: any, b: any) => b[1].visitors - a[1].visitors)
        .slice(0, 5);
      
      topCountries.forEach(([country, stats]: [string, any], index: number) => {
        const flag = getCountryFlag(country);
        report += `${index + 1}. ${flag} ${country}: ${stats.visitors} visitors\n`;
        if (stats.cities?.size > 0) {
          const topCity = Array.from(stats.cities.entries())[0];
          report += `   📍 Top city: ${topCity[0]}\n`;
        }
      });
      report += '\n';
    }
    
    // Top Pages
    if (visitorData.dailyStats?.topPages?.size > 0) {
      report += `📱 <b>TOP PAGES</b>\n`;
      const topPages = Array.from(visitorData.dailyStats.topPages.entries())
        .sort((a: any, b: any) => b[1] - a[1])
        .slice(0, 5);
      
      topPages.forEach(([page, views]: [string, number]) => {
        report += `• ${page}: ${views} views\n`;
      });
      report += '\n';
    }
    
    // Device & Browser Stats
    if (visitorData.dailyStats?.deviceTypes?.size > 0) {
      report += `💻 <b>DEVICES</b>\n`;
      visitorData.dailyStats.deviceTypes.forEach((count: number, device: string) => {
        report += `• ${device}: ${count}\n`;
      });
      report += '\n';
    }
    
    // Trullo Chatbot Analytics
    if (trulloData.stats) {
      report += `🤖 <b>TRULLO AI ASSISTANT</b>\n`;
      report += `💬 Conversations: ${trulloData.stats.totalConversations || 0}\n`;
      report += `📝 Messages: ${trulloData.stats.totalMessages || 0}\n`;
      report += `📧 Contact Requests: ${trulloData.stats.contactRequests || 0}\n`;
      report += `✅ Conversion Rate: ${trulloData.stats.conversionRate || 0}%\n\n`;
    }
    
    // Language Distribution
    if (trulloData.languageData && trulloData.languageData.length > 0) {
      report += `🌍 <b>LANGUAGES</b>\n`;
      trulloData.languageData.forEach((lang: any) => {
        report += `• ${lang.name}: ${lang.value}%\n`;
      });
      report += '\n';
    }
    
    // Top Topics
    if (trulloData.topTopics && trulloData.topTopics.length > 0) {
      report += `💡 <b>TOP TOPICS</b>\n`;
      trulloData.topTopics.slice(0, 5).forEach((topic: any) => {
        report += `• ${topic.topic}: ${topic.count} mentions\n`;
      });
      report += '\n';
    }
    
    // Traffic Sources
    if (visitorData.dailyStats?.topReferrers?.size > 0) {
      report += `🔗 <b>TRAFFIC SOURCES</b>\n`;
      const topReferrers = Array.from(visitorData.dailyStats.topReferrers.entries())
        .sort((a: any, b: any) => b[1] - a[1])
        .slice(0, 5);
      
      topReferrers.forEach(([referrer, count]: [string, number]) => {
        report += `• ${referrer}: ${count}\n`;
      });
      report += '\n';
    }
    
    // Peak Hours Analysis
    if (visitorData.dailyStats?.hourlyVisits) {
      const peakHour = visitorData.dailyStats.hourlyVisits.indexOf(
        Math.max(...visitorData.dailyStats.hourlyVisits)
      );
      report += `⏰ <b>PEAK ACTIVITY</b>\n`;
      report += `🔥 Busiest Hour: ${peakHour}:00 (${visitorData.dailyStats.hourlyVisits[peakHour]} visits)\n\n`;
    }
    
    // Key Performance Indicators
    report += `📈 <b>KEY METRICS</b>\n`;
    const engagementRate = visitorData.dailyStats?.totalPageViews && visitorData.dailyStats?.totalVisitors
      ? (visitorData.dailyStats.totalPageViews / visitorData.dailyStats.totalVisitors).toFixed(1)
      : '0';
    report += `• Pages per Session: ${engagementRate}\n`;
    
    const returnRate = visitorData.dailyStats?.totalVisitors
      ? ((visitorData.dailyStats.returningVisitors / visitorData.dailyStats.totalVisitors) * 100).toFixed(1)
      : '0';
    report += `• Return Rate: ${returnRate}%\n`;
    
    // Recommendations based on data
    report += `\n💡 <b>INSIGHTS & ACTIONS</b>\n`;
    
    // Generate insights based on the data
    const insights = generateInsights(visitorData, trulloData);
    insights.forEach(insight => {
      report += `• ${insight}\n`;
    });
    
    report += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    report += `📲 <a href="https://investinpuglia.eu/trullo-analytics">View Full Dashboard</a>`;
    
    return report;
  } catch (error) {
    console.error('Error generating report:', error);
    return `❌ Error generating ${period} report: ${error}`;
  }
}

// Generate insights based on data
function generateInsights(visitorData: any, trulloData: any): string[] {
  const insights: string[] = [];
  
  // Bounce rate insight
  if (visitorData.dailyStats?.bounceRate > 0.5) {
    insights.push('⚠️ High bounce rate detected. Consider improving page load speed or content relevance.');
  } else if (visitorData.dailyStats?.bounceRate < 0.3) {
    insights.push('✅ Excellent bounce rate! Visitors are engaging well with content.');
  }
  
  // Geographic insights
  if (visitorData.countryStats && visitorData.countryStats.length > 0) {
    const topCountry = visitorData.countryStats[0][0];
    insights.push(`🎯 Focus marketing efforts on ${topCountry} - highest visitor volume.`);
  }
  
  // Conversion insights
  if (trulloData.stats?.conversionRate > 10) {
    insights.push('🏆 High conversion rate! Trullo is performing excellently.');
  } else if (trulloData.stats?.conversionRate < 5) {
    insights.push('📊 Consider optimizing Trullo prompts to improve conversion.');
  }
  
  // Device insights
  const mobilePercentage = calculateDevicePercentage(visitorData.dailyStats?.deviceTypes, 'Mobile');
  if (mobilePercentage > 60) {
    insights.push('📱 Mobile-first: Majority of traffic is from mobile devices.');
  }
  
  // Time-based insights
  if (visitorData.dailyStats?.hourlyVisits) {
    const peakHour = visitorData.dailyStats.hourlyVisits.indexOf(
      Math.max(...visitorData.dailyStats.hourlyVisits)
    );
    if (peakHour >= 9 && peakHour <= 17) {
      insights.push('💼 Business hours peak - B2B audience likely dominant.');
    } else {
      insights.push('🌙 Evening peak traffic - Consider after-hours support.');
    }
  }
  
  return insights;
}

// Helper function to calculate device percentage
function calculateDevicePercentage(deviceTypes: Map<string, number>, deviceName: string): number {
  if (!deviceTypes) return 0;
  const total = Array.from(deviceTypes.values()).reduce((a, b) => a + b, 0);
  const deviceCount = deviceTypes.get(deviceName) || 0;
  return total > 0 ? (deviceCount / total) * 100 : 0;
}

// Get country flag emoji
function getCountryFlag(country: string): string {
  const flags: { [key: string]: string } = {
    'United States': '🇺🇸',
    'United Kingdom': '🇬🇧',
    'Italy': '🇮🇹',
    'Germany': '🇩🇪',
    'France': '🇫🇷',
    'Spain': '🇪🇸',
    'Canada': '🇨🇦',
    'Australia': '🇦🇺',
    'Netherlands': '🇳🇱',
    'Switzerland': '🇨🇭',
    'Belgium': '🇧🇪',
    'Sweden': '🇸🇪',
    'Norway': '🇳🇴',
    'Denmark': '🇩🇰',
    'Poland': '🇵🇱',
    'Austria': '🇦🇹',
    'Ireland': '🇮🇪',
    'Portugal': '🇵🇹',
    'Greece': '🇬🇷',
    'Russia': '🇷🇺',
    'China': '🇨🇳',
    'Japan': '🇯🇵',
    'India': '🇮🇳',
    'Brazil': '🇧🇷',
    'Mexico': '🇲🇽',
    'Argentina': '🇦🇷',
    'South Africa': '🇿🇦',
    'Turkey': '🇹🇷',
    'Saudi Arabia': '🇸🇦',
    'UAE': '🇦🇪',
    'Israel': '🇮🇱',
    'Singapore': '🇸🇬',
    'South Korea': '🇰🇷',
    'Thailand': '🇹🇭',
    'Indonesia': '🇮🇩',
    'Malaysia': '🇲🇾',
    'Philippines': '🇵🇭',
    'Vietnam': '🇻🇳',
    'Egypt': '🇪🇬',
    'Nigeria': '🇳🇬',
    'Kenya': '🇰🇪',
    'Morocco': '🇲🇦',
  };
  
  return flags[country] || '🌍';
}

// API endpoint handler
export async function POST(request: NextRequest) {
  try {
    const { reportType = 'daily', immediate = false } = await request.json();
    
    // Generate the report
    const report = await generateAnalyticsReport(reportType);
    
    // Send to Telegram
    await sendTelegramNotification(report);
    
    return NextResponse.json({
      success: true,
      message: `${reportType} report sent to Telegram`,
      reportLength: report.length
    });
    
  } catch (error) {
    console.error('Error in telegram-reports:', error);
    return NextResponse.json(
      { error: 'Failed to generate or send report' },
      { status: 500 }
    );
  }
}

// GET endpoint for manual trigger or cron job
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reportType = searchParams.get('type') || 'daily';
  const apiKey = searchParams.get('apiKey');
  
  // Simple API key check for cron job security
  if (apiKey !== process.env.CRON_API_KEY && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const report = await generateAnalyticsReport(reportType as 'daily' | 'weekly' | 'monthly');
    await sendTelegramNotification(report);
    
    return NextResponse.json({
      success: true,
      message: `${reportType} report sent`,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in GET telegram-reports:', error);
    return NextResponse.json(
      { error: 'Failed to send report' },
      { status: 500 }
    );
  }
}