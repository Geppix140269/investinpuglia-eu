import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  limit,
  startAfter,
  Timestamp,
  addDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface EmailEvent {
  id: string;
  campaignId: string;
  investorId: string;
  eventType: 'sent' | 'opened' | 'clicked' | 'bounced' | 'spam' | 'unsubscribed' | 'converted';
  timestamp: Timestamp;
  metadata?: {
    linkUrl?: string;
    linkText?: string;
    deviceType?: 'desktop' | 'mobile' | 'tablet';
    location?: string;
    conversionValue?: number;
    conversionType?: 'consultation' | 'property_inquiry' | 'download' | 'purchase' | 'contract_signed' | 'payment_received';
  };
}

export interface CampaignAnalytics {
  campaignId: string;
  metrics: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    spam: number;
    unsubscribed: number;
    conversions: number;
    revenue: number;
  };
  rates: {
    deliveryRate: number;
    openRate: number;
    clickRate: number;
    bounceRate: number;
    conversionRate: number;
    unsubscribeRate: number;
  };
  timeline: {
    date: string;
    sent: number;
    opened: number;
    clicked: number;
    conversions: number;
  }[];
  topLinks: {
    url: string;
    clicks: number;
    uniqueClicks: number;
  }[];
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  locationBreakdown: {
    [country: string]: number;
  };
  lastUpdated: Timestamp;
}

export interface ABTestResults {
  campaignId: string;
  variantA: {
    name: string;
    metrics: CampaignAnalytics['metrics'];
    rates: CampaignAnalytics['rates'];
  };
  variantB: {
    name: string;
    metrics: CampaignAnalytics['metrics'];
    rates: CampaignAnalytics['rates'];
  };
  winner?: 'A' | 'B' | 'tie';
  confidenceLevel?: number;
  statisticalSignificance: boolean;
}

export interface RevenueAttribution {
  id: string;
  campaignId: string;
  investorId: string;
  conversionType: 'consultation' | 'property_inquiry' | 'contract_signed' | 'payment_received';
  revenue: number;
  conversionDate: Timestamp;
  attributionModel: 'first_touch' | 'last_touch' | 'linear' | 'time_decay';
  touchpoints: {
    campaignId: string;
    timestamp: Timestamp;
    weight: number;
  }[];
}

const EVENTS_COLLECTION = 'email_events';
const ANALYTICS_COLLECTION = 'campaign_analytics';
const REVENUE_ATTRIBUTION_COLLECTION = 'revenue_attribution';

// Event Tracking
export async function trackEmailEvent(event: Omit<EmailEvent, 'id' | 'timestamp'>): Promise<string> {
  try {
    const eventWithTimestamp = {
      ...event,
      timestamp: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, EVENTS_COLLECTION), eventWithTimestamp);
    
    // Update campaign analytics in real-time
    await updateCampaignAnalytics(event.campaignId);
    
    console.log('Tracked email event:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error tracking email event:', error);
    throw error;
  }
}

export async function getEmailEvents(
  campaignId?: string,
  investorId?: string,
  eventType?: EmailEvent['eventType'],
  startDate?: Date,
  endDate?: Date,
  limitCount: number = 100
): Promise<EmailEvent[]> {
  try {
    let q = query(collection(db, EVENTS_COLLECTION), orderBy('timestamp', 'desc'), limit(limitCount));
    
    if (campaignId) {
      q = query(q, where('campaignId', '==', campaignId));
    }
    
    if (investorId) {
      q = query(q, where('investorId', '==', investorId));
    }
    
    if (eventType) {
      q = query(q, where('eventType', '==', eventType));
    }
    
    if (startDate) {
      q = query(q, where('timestamp', '>=', Timestamp.fromDate(startDate)));
    }
    
    if (endDate) {
      q = query(q, where('timestamp', '<=', Timestamp.fromDate(endDate)));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as EmailEvent));
  } catch (error) {
    console.error('Error getting email events:', error);
    return [];
  }
}

// Analytics Generation
export async function updateCampaignAnalytics(campaignId: string): Promise<void> {
  try {
    const events = await getEmailEvents(campaignId);
    const analytics = generateCampaignAnalytics(campaignId, events);
    
    const docRef = doc(db, ANALYTICS_COLLECTION, campaignId);
    await setDoc(docRef, {
      ...analytics,
      lastUpdated: Timestamp.now()
    }, { merge: true });
    
    console.log('Updated campaign analytics:', campaignId);
  } catch (error) {
    console.error('Error updating campaign analytics:', error);
    throw error;
  }
}

export async function getCampaignAnalytics(campaignId: string): Promise<CampaignAnalytics | null> {
  try {
    const docRef = doc(db, ANALYTICS_COLLECTION, campaignId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as CampaignAnalytics;
    }
    
    // Generate analytics if not exists
    await updateCampaignAnalytics(campaignId);
    const updatedDocSnap = await getDoc(docRef);
    
    if (updatedDocSnap.exists()) {
      return updatedDocSnap.data() as CampaignAnalytics;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting campaign analytics:', error);
    return null;
  }
}

function generateCampaignAnalytics(campaignId: string, events: EmailEvent[]): CampaignAnalytics {
  const metrics = {
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    bounced: 0,
    spam: 0,
    unsubscribed: 0,
    conversions: 0,
    revenue: 0
  };
  
  const deviceBreakdown = {
    desktop: 0,
    mobile: 0,
    tablet: 0
  };
  
  const locationBreakdown: { [country: string]: number } = {};
  const linkClicks: { [url: string]: { clicks: number; uniqueClicks: Set<string> } } = {};
  const timelineData: { [date: string]: { sent: number; opened: number; clicked: number; conversions: number } } = {};
  
  events.forEach(event => {
    // Count metrics
    switch (event.eventType) {
      case 'sent':
        metrics.sent++;
        metrics.delivered++; // Assume delivered unless bounced
        break;
      case 'opened':
        metrics.opened++;
        break;
      case 'clicked':
        metrics.clicked++;
        break;
      case 'bounced':
        metrics.bounced++;
        metrics.delivered--; // Remove from delivered count
        break;
      case 'spam':
        metrics.spam++;
        break;
      case 'unsubscribed':
        metrics.unsubscribed++;
        break;
      case 'converted':
        metrics.conversions++;
        metrics.revenue += event.metadata?.conversionValue || 0;
        break;
    }
    
    // Device breakdown
    if (event.metadata?.deviceType) {
      deviceBreakdown[event.metadata.deviceType]++;
    }
    
    // Location breakdown
    if (event.metadata?.location) {
      locationBreakdown[event.metadata.location] = (locationBreakdown[event.metadata.location] || 0) + 1;
    }
    
    // Link clicks
    if (event.eventType === 'clicked' && event.metadata?.linkUrl) {
      const url = event.metadata.linkUrl;
      if (!linkClicks[url]) {
        linkClicks[url] = { clicks: 0, uniqueClicks: new Set() };
      }
      linkClicks[url].clicks++;
      linkClicks[url].uniqueClicks.add(event.investorId);
    }
    
    // Timeline data
    const date = event.timestamp.toDate().toISOString().split('T')[0];
    if (!timelineData[date]) {
      timelineData[date] = { sent: 0, opened: 0, clicked: 0, conversions: 0 };
    }
    
    switch (event.eventType) {
      case 'sent':
        timelineData[date].sent++;
        break;
      case 'opened':
        timelineData[date].opened++;
        break;
      case 'clicked':
        timelineData[date].clicked++;
        break;
      case 'converted':
        timelineData[date].conversions++;
        break;
    }
  });
  
  // Calculate rates
  const rates = {
    deliveryRate: metrics.sent > 0 ? (metrics.delivered / metrics.sent) * 100 : 0,
    openRate: metrics.delivered > 0 ? (metrics.opened / metrics.delivered) * 100 : 0,
    clickRate: metrics.delivered > 0 ? (metrics.clicked / metrics.delivered) * 100 : 0,
    bounceRate: metrics.sent > 0 ? (metrics.bounced / metrics.sent) * 100 : 0,
    conversionRate: metrics.delivered > 0 ? (metrics.conversions / metrics.delivered) * 100 : 0,
    unsubscribeRate: metrics.delivered > 0 ? (metrics.unsubscribed / metrics.delivered) * 100 : 0
  };
  
  // Process top links
  const topLinks = Object.entries(linkClicks)
    .map(([url, data]) => ({
      url,
      clicks: data.clicks,
      uniqueClicks: data.uniqueClicks.size
    }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10);
  
  // Process timeline
  const timeline = Object.entries(timelineData)
    .map(([date, data]) => ({ date, ...data }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return {
    campaignId,
    metrics,
    rates,
    timeline,
    topLinks,
    deviceBreakdown,
    locationBreakdown,
    lastUpdated: Timestamp.now()
  };
}

// A/B Testing
export async function createABTest(
  campaignAId: string,
  campaignBId: string,
  testName: string
): Promise<void> {
  try {
    const analyticsA = await getCampaignAnalytics(campaignAId);
    const analyticsB = await getCampaignAnalytics(campaignBId);
    
    if (!analyticsA || !analyticsB) {
      throw new Error('Analytics not available for one or both campaigns');
    }
    
    const abTestResults = calculateABTestResults(analyticsA, analyticsB);
    
    const docRef = doc(db, 'ab_test_results', `${campaignAId}_${campaignBId}`);
    await setDoc(docRef, {
      campaignId: `${campaignAId}_${campaignBId}`,
      testName,
      ...abTestResults,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    
    console.log('Created A/B test results');
  } catch (error) {
    console.error('Error creating A/B test:', error);
    throw error;
  }
}

function calculateABTestResults(
  analyticsA: CampaignAnalytics,
  analyticsB: CampaignAnalytics
): Omit<ABTestResults, 'campaignId'> {
  const variantA = {
    name: 'Variant A',
    metrics: analyticsA.metrics,
    rates: analyticsA.rates
  };
  
  const variantB = {
    name: 'Variant B',
    metrics: analyticsB.metrics,
    rates: analyticsB.rates
  };
  
  // Statistical significance calculation (simplified)
  const { winner, confidenceLevel, statisticalSignificance } = calculateStatisticalSignificance(
    analyticsA.metrics,
    analyticsB.metrics
  );
  
  return {
    variantA,
    variantB,
    winner,
    confidenceLevel,
    statisticalSignificance
  };
}

function calculateStatisticalSignificance(
  metricsA: CampaignAnalytics['metrics'],
  metricsB: CampaignAnalytics['metrics']
): { winner?: 'A' | 'B' | 'tie'; confidenceLevel: number; statisticalSignificance: boolean } {
  // Simplified statistical significance calculation
  // In production, you'd use proper statistical tests
  
  const conversionRateA = metricsA.delivered > 0 ? metricsA.conversions / metricsA.delivered : 0;
  const conversionRateB = metricsB.delivered > 0 ? metricsB.conversions / metricsB.delivered : 0;
  
  const difference = Math.abs(conversionRateA - conversionRateB);
  const averageRate = (conversionRateA + conversionRateB) / 2;
  
  // Simple confidence calculation based on sample size and difference
  const minSampleSize = Math.min(metricsA.delivered, metricsB.delivered);
  const confidenceLevel = Math.min(95, (difference / averageRate) * minSampleSize * 10);
  
  const statisticalSignificance = confidenceLevel >= 95 && minSampleSize >= 100;
  
  let winner: 'A' | 'B' | 'tie' | undefined;
  if (statisticalSignificance) {
    if (conversionRateA > conversionRateB * 1.05) {
      winner = 'A';
    } else if (conversionRateB > conversionRateA * 1.05) {
      winner = 'B';
    } else {
      winner = 'tie';
    }
  }
  
  return {
    winner,
    confidenceLevel: Math.round(confidenceLevel * 100) / 100,
    statisticalSignificance
  };
}

// Revenue Attribution
export async function trackRevenue(
  campaignId: string,
  investorId: string,
  conversionType: RevenueAttribution['conversionType'],
  revenue: number,
  attributionModel: RevenueAttribution['attributionModel'] = 'last_touch'
): Promise<string> {
  try {
    // Get touchpoints for this investor
    const touchpoints = await getInvestorTouchpoints(investorId);
    
    const attribution: Omit<RevenueAttribution, 'id'> = {
      campaignId,
      investorId,
      conversionType,
      revenue,
      conversionDate: Timestamp.now(),
      attributionModel,
      touchpoints: applyAttributionModel(touchpoints, attributionModel)
    };
    
    const docRef = await addDoc(collection(db, REVENUE_ATTRIBUTION_COLLECTION), attribution);
    
    // Track conversion event
    await trackEmailEvent({
      campaignId,
      investorId,
      eventType: 'converted',
      metadata: {
        conversionValue: revenue,
        conversionType
      }
    });
    
    console.log('Tracked revenue attribution:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error tracking revenue:', error);
    throw error;
  }
}

async function getInvestorTouchpoints(investorId: string): Promise<{ campaignId: string; timestamp: Timestamp }[]> {
  try {
    const events = await getEmailEvents(undefined, investorId);
    
    // Get unique campaigns this investor interacted with
    const touchpoints = events
      .filter(event => event.eventType === 'clicked' || event.eventType === 'opened')
      .reduce((acc, event) => {
        if (!acc.find(t => t.campaignId === event.campaignId)) {
          acc.push({
            campaignId: event.campaignId,
            timestamp: event.timestamp
          });
        }
        return acc;
      }, [] as { campaignId: string; timestamp: Timestamp }[])
      .sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);
    
    return touchpoints;
  } catch (error) {
    console.error('Error getting investor touchpoints:', error);
    return [];
  }
}

function applyAttributionModel(
  touchpoints: { campaignId: string; timestamp: Timestamp }[],
  model: RevenueAttribution['attributionModel']
): RevenueAttribution['touchpoints'] {
  if (touchpoints.length === 0) return [];
  
  switch (model) {
    case 'first_touch':
      return [{ ...touchpoints[0], weight: 1.0 }];
      
    case 'last_touch':
      return [{ ...touchpoints[touchpoints.length - 1], weight: 1.0 }];
      
    case 'linear':
      const linearWeight = 1.0 / touchpoints.length;
      return touchpoints.map(tp => ({ ...tp, weight: linearWeight }));
      
    case 'time_decay':
      const totalTime = touchpoints[touchpoints.length - 1].timestamp.seconds - touchpoints[0].timestamp.seconds;
      return touchpoints.map((tp, index) => {
        const timeFromFirst = tp.timestamp.seconds - touchpoints[0].timestamp.seconds;
        const decayFactor = totalTime > 0 ? timeFromFirst / totalTime : 0;
        const weight = Math.exp(decayFactor) / touchpoints.reduce((sum, _, i) => {
          const tf = touchpoints[i].timestamp.seconds - touchpoints[0].timestamp.seconds;
          const df = totalTime > 0 ? tf / totalTime : 0;
          return sum + Math.exp(df);
        }, 0);
        return { ...tp, weight };
      });
      
    default:
      return touchpoints.map(tp => ({ ...tp, weight: 1.0 / touchpoints.length }));
  }
}

// Reporting
export async function generateCampaignReport(
  campaignId: string,
  startDate?: Date,
  endDate?: Date
): Promise<{
  analytics: CampaignAnalytics;
  events: EmailEvent[];
  revenue: RevenueAttribution[];
  recommendations: string[];
}> {
  try {
    const [analytics, events, revenue] = await Promise.all([
      getCampaignAnalytics(campaignId),
      getEmailEvents(campaignId, undefined, undefined, startDate, endDate),
      getRevenueAttributions(campaignId, startDate, endDate)
    ]);
    
    const recommendations = generateRecommendations(analytics);
    
    return {
      analytics: analytics!,
      events,
      revenue,
      recommendations
    };
  } catch (error) {
    console.error('Error generating campaign report:', error);
    throw error;
  }
}

async function getRevenueAttributions(
  campaignId: string,
  startDate?: Date,
  endDate?: Date
): Promise<RevenueAttribution[]> {
  try {
    let q = query(
      collection(db, REVENUE_ATTRIBUTION_COLLECTION),
      where('campaignId', '==', campaignId),
      orderBy('conversionDate', 'desc')
    );
    
    if (startDate) {
      q = query(q, where('conversionDate', '>=', Timestamp.fromDate(startDate)));
    }
    
    if (endDate) {
      q = query(q, where('conversionDate', '<=', Timestamp.fromDate(endDate)));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as RevenueAttribution));
  } catch (error) {
    console.error('Error getting revenue attributions:', error);
    return [];
  }
}

function generateRecommendations(analytics: CampaignAnalytics | null): string[] {
  if (!analytics) return [];
  
  const recommendations: string[] = [];
  
  // Open rate recommendations
  if (analytics.rates.openRate < 20) {
    recommendations.push('Low open rate detected. Consider improving subject lines with urgency, personalization, or clearer value propositions.');
  } else if (analytics.rates.openRate > 35) {
    recommendations.push('Excellent open rate! Your subject lines are performing well.');
  }
  
  // Click rate recommendations
  if (analytics.rates.clickRate < 2) {
    recommendations.push('Low click rate suggests content may not be engaging. Review email content and call-to-action placement.');
  } else if (analytics.rates.clickRate > 5) {
    recommendations.push('Strong click rate indicates engaging content. Consider scaling similar approaches.');
  }
  
  // Conversion rate recommendations
  if (analytics.rates.conversionRate < 1) {
    recommendations.push('Consider optimizing landing pages and ensuring strong alignment between email content and destination pages.');
  }
  
  // Device recommendations
  const totalInteractions = analytics.deviceBreakdown.desktop + analytics.deviceBreakdown.mobile + analytics.deviceBreakdown.tablet;
  if (totalInteractions > 0) {
    const mobilePercentage = (analytics.deviceBreakdown.mobile / totalInteractions) * 100;
    if (mobilePercentage > 60) {
      recommendations.push('Majority of opens on mobile. Ensure emails are mobile-optimized with large CTAs and readable fonts.');
    }
  }
  
  // Revenue recommendations
  if (analytics.metrics.revenue > 0) {
    const revenuePerRecipient = analytics.metrics.revenue / analytics.metrics.delivered;
    if (revenuePerRecipient > 50) {
      recommendations.push(`Strong revenue per recipient (€${revenuePerRecipient.toFixed(2)}). Consider creating similar high-converting campaigns.`);
    }
  }
  
  return recommendations;
}

// Bulk Analytics Operations
export async function generateBulkAnalytics(campaignIds: string[]): Promise<void> {
  const batchSize = 5;
  for (let i = 0; i < campaignIds.length; i += batchSize) {
    const batch = campaignIds.slice(i, i + batchSize);
    await Promise.all(batch.map(campaignId => updateCampaignAnalytics(campaignId)));
  }
}

export async function getTopPerformingCampaigns(
  metric: 'openRate' | 'clickRate' | 'conversionRate' | 'revenue',
  limit: number = 10
): Promise<CampaignAnalytics[]> {
  try {
    // This would need a composite index in production
    const q = query(
      collection(db, ANALYTICS_COLLECTION),
      orderBy(`rates.${metric}`, 'desc'),
      limit(limit)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as CampaignAnalytics);
  } catch (error) {
    console.error('Error getting top performing campaigns:', error);
    return [];
  }
}