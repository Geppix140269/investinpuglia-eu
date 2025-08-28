import { NextRequest, NextResponse } from 'next/server';
import { 
  getCampaignAnalytics, 
  generateCampaignReport,
  getTopPerformingCampaigns 
} from '@/lib/email-campaigns/analytics';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');
    const reportType = searchParams.get('type') || 'overview';
    const metric = searchParams.get('metric') as 'openRate' | 'clickRate' | 'conversionRate' | 'revenue';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
    const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined;
    const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined;
    
    if (campaignId) {
      // Get analytics for specific campaign
      if (reportType === 'detailed') {
        const report = await generateCampaignReport(campaignId, startDate, endDate);
        return NextResponse.json({
          success: true,
          report
        });
      } else {
        const analytics = await getCampaignAnalytics(campaignId);
        return NextResponse.json({
          success: true,
          analytics
        });
      }
    } else if (reportType === 'top-performing') {
      // Get top performing campaigns
      const topCampaigns = await getTopPerformingCampaigns(metric || 'conversionRate', limit);
      return NextResponse.json({
        success: true,
        campaigns: topCampaigns
      });
    } else {
      // Get overview analytics
      return NextResponse.json({
        success: true,
        message: 'Overview analytics endpoint - implement aggregate stats here'
      });
    }
    
  } catch (error) {
    console.error('Error fetching campaign analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}