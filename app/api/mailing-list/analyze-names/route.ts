import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllInvestors,
  updateInvestorWithNameReview,
  extractNameFromEmail,
  getNameConfidence
} from '@/lib/firebase-mailing-list';

export async function POST(request: NextRequest) {
  try {
    // Get all investors
    const investors = await getAllInvestors();
    
    // Analyze and update names for all contacts
    const updatePromises = investors.map(async (investor) => {
      const extractedName = extractNameFromEmail(investor.email);
      const currentName = investor.name || '';
      const confidence = getNameConfidence(currentName || extractedName);
      
      // Update if we don't have analysis data yet
      if (!investor.extractedName || !investor.confidence) {
        await updateInvestorWithNameReview(investor.id!, {
          extractedName,
          confidence: getNameConfidence(currentName || extractedName)
        });
      }
      
      return {
        id: investor.id,
        email: investor.email,
        currentName,
        extractedName,
        confidence
      };
    });

    const results = await Promise.all(updatePromises);
    
    // Calculate statistics
    const stats = {
      total: results.length,
      withNames: results.filter(r => r.currentName && r.confidence !== 'none').length,
      withoutNames: results.filter(r => !r.currentName || r.confidence === 'none').length,
      highConfidence: results.filter(r => r.confidence === 'high').length,
      mediumConfidence: results.filter(r => r.confidence === 'medium').length,
      lowConfidence: results.filter(r => r.confidence === 'low').length,
      noConfidence: results.filter(r => r.confidence === 'none').length
    };

    return NextResponse.json({
      success: true,
      stats,
      analyzed: results.length
    });
  } catch (error) {
    console.error('Error analyzing names:', error);
    return NextResponse.json(
      { error: 'Failed to analyze names' },
      { status: 500 }
    );
  }
}