import { NextRequest, NextResponse } from 'next/server';
import { processUnsubscribe, validateUnsubscribeToken } from '@/lib/email-campaigns/gdpr-compliance';
import { unsubscribeInvestor } from '@/lib/firebase-mailing-list';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    const campaignId = searchParams.get('campaign');
    
    if (!email || !token) {
      return NextResponse.json(
        { success: false, error: 'Email and token are required' },
        { status: 400 }
      );
    }
    
    // Validate token
    const isValidToken = await validateUnsubscribeToken(token, email);
    if (!isValidToken) {
      return NextResponse.json(
        { success: false, error: 'Invalid unsubscribe token' },
        { status: 400 }
      );
    }
    
    // Return unsubscribe page data
    return NextResponse.json({
      success: true,
      email,
      campaignId,
      message: 'Valid unsubscribe request'
    });
    
  } catch (error) {
    console.error('Error processing unsubscribe request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process unsubscribe request' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      token,
      campaignId,
      reason,
      feedback,
      scope = 'all_marketing',
      isGdprWithdrawal = true
    } = body;
    
    if (!email || !token) {
      return NextResponse.json(
        { success: false, error: 'Email and token are required' },
        { status: 400 }
      );
    }
    
    // Validate token
    const isValidToken = await validateUnsubscribeToken(token, email);
    if (!isValidToken) {
      return NextResponse.json(
        { success: false, error: 'Invalid unsubscribe token' },
        { status: 400 }
      );
    }
    
    // Get client IP and user agent for record keeping
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Process unsubscribe
    const unsubscribeId = await processUnsubscribe(email, {
      method: 'email_link',
      scope: scope as any,
      campaignId,
      reason: reason as any,
      feedback,
      ipAddress: clientIP,
      userAgent,
      isGdprWithdrawal
    });
    
    return NextResponse.json({
      success: true,
      unsubscribeId,
      message: 'Successfully unsubscribed. You will no longer receive marketing emails from us.'
    });
    
  } catch (error) {
    console.error('Error processing unsubscribe:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process unsubscribe' },
      { status: 500 }
    );
  }
}