import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllInvestors,
  getMailingListStats,
  extractNameFromEmail,
  getNameConfidence
} from '@/lib/firebase-mailing-list';

export async function GET(request: NextRequest) {
  try {
    // Get basic mailing list stats
    const basicStats = await getMailingListStats();
    
    // Get detailed name review stats
    const investors = await getAllInvestors();
    
    const nameReviewStats = investors.reduce((acc, investor) => {
      const currentName = investor.name || '';
      const extractedName = investor.extractedName || extractNameFromEmail(investor.email);
      const confidence = investor.confidence || getNameConfidence(currentName || extractedName);
      
      acc.total++;
      
      if (investor.isReviewed) {
        acc.reviewed++;
      }
      
      if (currentName) {
        acc.withNames++;
      } else {
        acc.withoutNames++;
      }
      
      switch (confidence) {
        case 'high':
          acc.highConfidence++;
          break;
        case 'medium':
          acc.mediumConfidence++;
          break;
        case 'low':
          acc.lowConfidence++;
          break;
        case 'none':
          acc.noConfidence++;
          break;
      }
      
      if (confidence === 'low' || confidence === 'medium') {
        acc.uncertain++;
      }
      
      return acc;
    }, {
      total: 0,
      withNames: 0,
      withoutNames: 0,
      reviewed: 0,
      uncertain: 0,
      highConfidence: 0,
      mediumConfidence: 0,
      lowConfidence: 0,
      noConfidence: 0
    });

    return NextResponse.json({
      success: true,
      basicStats,
      nameReviewStats,
      readyForCampaign: nameReviewStats.total - nameReviewStats.uncertain
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}