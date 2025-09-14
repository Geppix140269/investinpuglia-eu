import { NextRequest, NextResponse } from 'next/server';
import { getAllScheduledCampaigns, scheduleOneTimeCampaign } from '@/lib/email-campaigns/scheduler';
import { getSegmentInvestors } from '@/lib/email-campaigns/segmentation';
import { trackEmailEvent } from '@/lib/email-campaigns/analytics';
import { Timestamp } from 'firebase/firestore';

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status') as any;
    const type = searchParams.get('type');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    
    const campaigns = await getAllScheduledCampaigns(status);
    
    // Apply additional filters
    let filteredCampaigns = campaigns;
    
    if (type) {
      filteredCampaigns = filteredCampaigns.filter(campaign => campaign.type === type);
    }
    
    if (limit) {
      filteredCampaigns = filteredCampaigns.slice(0, limit);
    }
    
    return NextResponse.json({
      success: true,
      campaigns: filteredCampaigns,
      total: filteredCampaigns.length
    });
    
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      templateId,
      subject,
      senderName,
      senderEmail,
      previewText,
      targetSegments,
      excludeSegments,
      scheduledAt,
      timezone,
      sendSettings,
      testMode
    } = body;
    
    // Validation
    if (!name || !templateId || !subject || !senderEmail) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Calculate recipient count
    let recipientCount = 0;
    if (targetSegments && targetSegments.length > 0) {
      for (const segmentId of targetSegments) {
        const segmentInvestors = await getSegmentInvestors(segmentId);
        recipientCount += segmentInvestors.length;
      }
    }
    
    // Create scheduled campaign
    const campaignId = await scheduleOneTimeCampaign({
      name,
      description,
      status: testMode ? 'paused' : 'scheduled',
      templateId,
      subject,
      senderName: senderName || 'Giuseppe Funaro',
      senderEmail,
      previewText,
      targetSegments: targetSegments || [],
      excludeSegments,
      recipientCount,
      scheduledAt: Timestamp.fromDate(new Date(scheduledAt)),
      timezone: timezone || 'Europe/Rome',
      sendSettings: {
        respectUnsubscribe: true,
        respectGlobalOptOut: true,
        throttleRate: 200,
        ...sendSettings,
        ...(testMode && { testModeEmail: senderEmail })
      }
    });
    
    return NextResponse.json({
      success: true,
      campaignId,
      message: 'Campaign scheduled successfully'
    });
    
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create campaign' },
      { status: 500 }
    );
  }
}