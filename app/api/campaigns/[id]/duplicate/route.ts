import { NextRequest, NextResponse } from 'next/server';
import { getScheduledCampaign, scheduleOneTimeCampaign } from '@/lib/email-campaigns/scheduler';

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
    const duplicateId = await scheduleOneTimeCampaign({
      ...originalCampaign,
      name: `${originalCampaign.name} (Copy)`,
      status: 'scheduled',
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Schedule for tomorrow
      executions: [],
      totalSent: 0,
      lastRunAt: undefined,
      nextRunAt: undefined
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