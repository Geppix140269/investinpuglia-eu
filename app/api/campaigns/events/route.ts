import { NextRequest, NextResponse } from 'next/server';
import { trackEmailEvent, getEmailEvents } from '@/lib/email-campaigns/analytics';
import { trackRevenue } from '@/lib/email-campaigns/analytics';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');
    const investorId = searchParams.get('investorId');
    const eventType = searchParams.get('eventType') as any;
    const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined;
    const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 100;
    
    const events = await getEmailEvents(
      campaignId || undefined,
      investorId || undefined,
      eventType,
      startDate,
      endDate,
      limit
    );
    
    return NextResponse.json({
      success: true,
      events,
      total: events.length
    });
    
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      campaignId,
      investorId,
      eventType,
      metadata,
      revenue,
      conversionType
    } = body;
    
    if (!campaignId || !investorId || !eventType) {
      return NextResponse.json(
        { success: false, error: 'campaignId, investorId, and eventType are required' },
        { status: 400 }
      );
    }
    
    // Track the event
    const eventId = await trackEmailEvent({
      campaignId,
      investorId,
      eventType,
      metadata
    });
    
    // If this is a conversion with revenue, track revenue attribution
    if (eventType === 'converted' && revenue && conversionType) {
      await trackRevenue(
        campaignId,
        investorId,
        conversionType,
        revenue
      );
    }
    
    return NextResponse.json({
      success: true,
      eventId,
      message: 'Event tracked successfully'
    });
    
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track event' },
      { status: 500 }
    );
  }
}