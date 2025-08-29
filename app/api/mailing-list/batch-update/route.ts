import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllInvestors,
  updateInvestorWithNameReview,
  extractNameFromEmail,
  getNameConfidence
} from '@/lib/firebase-mailing-list';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, fallbackName = 'Friend' } = body;

    if (!type || !['no-name', 'uncertain'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be "no-name" or "uncertain"' },
        { status: 400 }
      );
    }

    // Get all investors
    const investors = await getAllInvestors();
    
    // Filter based on type
    const toUpdate = investors.filter(investor => {
      const currentName = investor.name || '';
      const extractedName = extractNameFromEmail(investor.email);
      const confidence = getNameConfidence(currentName || extractedName);
      
      if (type === 'no-name') {
        return !currentName || confidence === 'none';
      } else if (type === 'uncertain') {
        return confidence === 'low' || confidence === 'medium';
      }
      return false;
    });

    // Batch update
    const updatePromises = toUpdate.map(investor => 
      updateInvestorWithNameReview(investor.id!, {
        name: fallbackName,
        isReviewed: true,
        confidence: getNameConfidence(fallbackName)
      })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({
      success: true,
      updated: toUpdate.length,
      type,
      fallbackName
    });
  } catch (error) {
    console.error('Error batch updating contacts:', error);
    return NextResponse.json(
      { error: 'Failed to batch update contacts' },
      { status: 500 }
    );
  }
}