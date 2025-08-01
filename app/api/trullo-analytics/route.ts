// app/api/trullo-analytics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key for server-side access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    // Fetch overall stats
    const { count: totalConversations } = await supabase
      .from('trullo_conversations')
      .select('*', { count: 'exact', head: true });

    const { count: totalMessages } = await supabase
      .from('trullo_messages')
      .select('*', { count: 'exact', head: true });

    const { count: contactRequests } = await supabase
      .from('trullo_contact_requests')
      .select('*', { count: 'exact', head: true });

    // Fetch today's active conversations
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { count: activeToday } = await supabase
      .from('trullo_conversations')
      .select('*', { count: 'exact', head: true })
      .gte('started_at', today.toISOString());

    // Calculate conversion rate
    const conversionRate = totalConversations && contactRequests
      ? ((contactRequests / totalConversations) * 100).toFixed(1)
      : '0';

    // Fetch language distribution (last 100 conversations)
    const { data: langData } = await supabase
      .from('trullo_conversations')
      .select('language')
      .order('started_at', { ascending: false })
      .limit(100);

    // Process language data
    const langCounts: Record<string, number> = {};
    langData?.forEach(({ language }) => {
      langCounts[language] = (langCounts[language] || 0) + 1;
    });

    const languageData = Object.entries(langCounts).map(([lang, count]) => ({
      name: lang.toUpperCase(),
      value: count
    }));

    // Fetch hourly message data for the last 24 hours
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const { data: messages } = await supabase
      .from('trullo_messages')
      .select('timestamp')
      .gte('timestamp', twentyFourHoursAgo.toISOString())
      .order('timestamp', { ascending: true });

    // Process hourly data
    const hourlyCount: Record<number, number> = {};
    messages?.forEach(msg => {
      const hour = new Date(msg.timestamp).getHours();
      hourlyCount[hour] = (hourlyCount[hour] || 0) + 1;
    });

    const hourlyData = Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      messages: hourlyCount[i] || 0
    }));

    // Fetch recent user messages for topic analysis
    const { data: recentMessages } = await supabase
      .from('trullo_messages')
      .select('id, content, timestamp')
      .eq('role', 'user')
      .order('timestamp', { ascending: false })
      .limit(50);

    // Simple topic extraction
    const topics: Record<string, number> = {};
    const keywords = [
      'grant', 'grants', 'funding', 'EU funds', 'PIA',
      'property', 'masseria', 'trullo', 'villa', 'real estate',
      'renovation', 'restoration', 'construction',
      'lawyer', 'attorney', 'legal', 'avvocato',
      'architect', 'architetto', 'design',
      'tax', 'fiscal', 'accounting', 'commercialista',
      'investment', 'invest', 'ROI', 'return'
    ];

    recentMessages?.forEach(msg => {
      const content = msg.content.toLowerCase();
      keywords.forEach(keyword => {
        if (content.includes(keyword.toLowerCase())) {
          // Group related keywords
          let topicGroup = keyword;
          if (['grant', 'grants', 'funding', 'EU funds', 'PIA'].includes(keyword)) {
            topicGroup = 'EU Grants';
          } else if (['property', 'masseria', 'trullo', 'villa', 'real estate'].includes(keyword)) {
            topicGroup = 'Property Investment';
          } else if (['renovation', 'restoration', 'construction'].includes(keyword)) {
            topicGroup = 'Renovation';
          } else if (['lawyer', 'attorney', 'legal', 'avvocato'].includes(keyword)) {
            topicGroup = 'Legal Services';
          } else if (['architect', 'architetto', 'design'].includes(keyword)) {
            topicGroup = 'Architecture';
          } else if (['tax', 'fiscal', 'accounting', 'commercialista'].includes(keyword)) {
            topicGroup = 'Tax & Accounting';
          } else if (['investment', 'invest', 'ROI', 'return'].includes(keyword)) {
            topicGroup = 'Investment Strategy';
          }
          
          topics[topicGroup] = (topics[topicGroup] || 0) + 1;
        }
      });
    });

    const topTopics = Object.entries(topics)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([topic, count]) => ({ topic, count }));

    // Format recent messages for display
    const formattedRecentMessages = recentMessages?.slice(0, 5).map(msg => ({
      id: msg.id,
      content: msg.content.length > 100 ? msg.content.substring(0, 100) + '...' : msg.content,
      created_at: msg.timestamp
    })) || [];

    // Return all analytics data
    return NextResponse.json({
      stats: {
        totalConversations: totalConversations || 0,
        totalMessages: totalMessages || 0,
        activeToday: activeToday || 0,
        contactRequests: contactRequests || 0,
        conversionRate: parseFloat(conversionRate)
      },
      languageData,
      hourlyData,
      topTopics,
      recentMessages: formattedRecentMessages,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching Trullo analytics:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch analytics data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: Add caching headers to reduce database load
export const revalidate = 30; // Cache for 30 seconds
