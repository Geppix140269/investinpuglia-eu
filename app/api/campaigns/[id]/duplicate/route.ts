import { NextRequest, NextResponse } from 'next/server';
import { getScheduledCampaign, scheduleOneTimeCampaign } from '@/lib/email-campaigns/scheduler';
import { Timestamp } from 'firebase/firestore';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const originalCampaign = await getScheduledCampaign(params.id);
    
    if (!originalCampaign) {
      return NextResponse.json(
        { success: false, error: 'Original campaign not found' },
        { status: 404 }
      );
    }
    
    // Create duplicate with modified name and draft status
    // Remove properties that are auto-generated or not allowed
    const { id, type, executions, totalSent, createdAt, updatedAt, ...campaignData } = originalCampaign;
    
    const duplicateId = await scheduleOneTimeCampaign({
      ...campaignData,
      name: `${originalCampaign.name} (Copy)`,
      status: 'scheduled',
      scheduledAt: Timestamp.fromDate(new Date(Date.now() + 24 * 60 * 60 * 1000)), // Schedule for tomorrow
    });
    
    const duplicateCampaign = await getScheduledCampaign(duplicateId);
    
    return NextResponse.json({
      success: true,
      campaign: duplicateCampaign,
      message: 'Campaign duplicated successfully'
    });
    
  } catch (error) {
    console.error('Error duplicating campaign:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to duplicate campaign' },
      { status: 500 }
    );
  }
}