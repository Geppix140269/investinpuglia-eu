import { NextRequest, NextResponse } from 'next/server';
import { 
  getPreferenceCenterData,
  updateEmailPreferences,
  createPreferenceCenter
} from '@/lib/email-campaigns/gdpr-compliance';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }
    
    const preferences = await getPreferenceCenterData(token);
    
    if (!preferences) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 404 }
      );
    }
    
    // Don't return the update token in the response for security
    const { updateToken, ...safePreferences } = preferences;
    
    return NextResponse.json({
      success: true,
      preferences: safePreferences
    });
    
  } catch (error) {
    console.error('Error fetching preferences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch preferences' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, preferences, frequency, interests, preferredLanguage } = body;
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }
    
    // Get current preferences to find investor ID
    const currentPreferences = await getPreferenceCenterData(token);
    
    if (!currentPreferences) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 404 }
      );
    }
    
    // Update preferences
    const updates: any = {};
    
    if (preferences) updates.preferences = preferences;
    if (frequency) updates.frequency = frequency;
    if (interests) updates.interests = interests;
    if (preferredLanguage) updates.preferredLanguage = preferredLanguage;
    
    await updateEmailPreferences(currentPreferences.investorId, updates);
    
    return NextResponse.json({
      success: true,
      message: 'Email preferences updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating preferences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update preferences' },
      { status: 500 }
    );
  }
}