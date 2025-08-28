import { NextRequest, NextResponse } from 'next/server';
import { 
  getScheduledCampaign, 
  updateScheduledCampaign, 
  deleteScheduledCampaign,
  pauseScheduledCampaign,
  resumeScheduledCampaign
} from '@/lib/email-campaigns/scheduler';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const campaign = await getScheduledCampaign(params.id);
    
    if (!campaign) {
      return NextResponse.json(
        { success: false, error: 'Campaign not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      campaign
    });
    
  } catch (error) {
    console.error('Error fetching campaign:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch campaign' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json();
    
    await updateScheduledCampaign(params.id, body);
    
    return NextResponse.json({
      success: true,
      message: 'Campaign updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating campaign:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update campaign' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await deleteScheduledCampaign(params.id);
    
    return NextResponse.json({
      success: true,
      message: 'Campaign deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting campaign:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete campaign' },
      { status: 500 }
    );
  }
}