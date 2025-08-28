import { NextRequest, NextResponse } from 'next/server';
import { 
  pauseScheduledCampaign, 
  resumeScheduledCampaign, 
  updateScheduledCampaign 
} from '@/lib/email-campaigns/scheduler';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json();
    const { status } = body;
    
    if (!status) {
      return NextResponse.json(
        { success: false, error: 'Status is required' },
        { status: 400 }
      );
    }
    
    switch (status) {
      case 'paused':
        await pauseScheduledCampaign(params.id);
        break;
      case 'scheduled':
      case 'running':
        await resumeScheduledCampaign(params.id);
        break;
      default:
        await updateScheduledCampaign(params.id, { status });
        break;
    }
    
    return NextResponse.json({
      success: true,
      message: `Campaign status updated to ${status}`
    });
    
  } catch (error) {
    console.error('Error updating campaign status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update campaign status' },
      { status: 500 }
    );
  }
}