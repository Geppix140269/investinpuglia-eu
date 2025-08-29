import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllInvestors, 
  extractNameFromEmail, 
  getNameConfidence 
} from '@/lib/firebase-mailing-list';

export async function GET(request: NextRequest) {
  try {
    const investors = await getAllInvestors();
    
    // Enhance each investor with extracted name and confidence if not already set
    const enhancedInvestors = investors.map(investor => ({
      ...investor,
      extractedName: investor.extractedName || extractNameFromEmail(investor.email),
      confidence: investor.confidence || getNameConfidence(investor.name || extractNameFromEmail(investor.email))
    }));
    
    return NextResponse.json({
      success: true,
      investors: enhancedInvestors,
      total: enhancedInvestors.length
    });
  } catch (error) {
    console.error('Error fetching mailing list:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mailing list' },
      { status: 500 }
    );
  }
}