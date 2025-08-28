import { NextRequest, NextResponse } from 'next/server';
import { getSubscribedInvestors, updateInvestorName } from '@/lib/firebase-mailing-list';
import { extractNameFromEmail, batchExtractNames } from '@/lib/email-utils/name-extractor';

export async function POST(request: NextRequest) {
  try {
    // Get all investors without names
    const investors = await getSubscribedInvestors();
    const investorsWithoutNames = investors.filter(inv => !inv.name || inv.name === '');
    
    console.log(`Found ${investorsWithoutNames.length} investors without names`);
    
    const updates: Array<{
      email: string;
      extractedName: string;
      confidence: string;
      updated: boolean;
    }> = [];
    
    // Process each investor
    for (const investor of investorsWithoutNames) {
      const extracted = extractNameFromEmail(investor.email);
      
      // Only update if we have high confidence
      if (extracted.confidence === 'high' && extracted.firstName && investor.id) {
        try {
          await updateInvestorName(investor.id, extracted.firstName);
          updates.push({
            email: investor.email,
            extractedName: extracted.firstName,
            confidence: extracted.confidence,
            updated: true
          });
        } catch (error) {
          console.error(`Failed to update ${investor.email}:`, error);
          updates.push({
            email: investor.email,
            extractedName: extracted.firstName,
            confidence: extracted.confidence,
            updated: false
          });
        }
      } else {
        updates.push({
          email: investor.email,
          extractedName: extracted.firstName || '',
          confidence: extracted.confidence,
          updated: false
        });
      }
    }
    
    // Statistics
    const stats = {
      totalProcessed: investorsWithoutNames.length,
      highConfidence: updates.filter(u => u.confidence === 'high').length,
      mediumConfidence: updates.filter(u => u.confidence === 'medium').length,
      lowConfidence: updates.filter(u => u.confidence === 'low').length,
      noConfidence: updates.filter(u => u.confidence === 'none').length,
      successfullyUpdated: updates.filter(u => u.updated).length
    };
    
    return NextResponse.json({
      success: true,
      stats,
      updates: updates.slice(0, 50) // Return first 50 for review
    });
    
  } catch (error) {
    console.error('Name extraction error:', error);
    return NextResponse.json(
      { error: 'Failed to extract names' },
      { status: 500 }
    );
  }
}

// GET endpoint to preview name extraction without updating
export async function GET(request: NextRequest) {
  try {
    const investors = await getSubscribedInvestors();
    const investorsWithoutNames = investors.filter(inv => !inv.name || inv.name === '');
    
    const previews = investorsWithoutNames.slice(0, 20).map(investor => {
      const extracted = extractNameFromEmail(investor.email);
      return {
        email: investor.email,
        currentName: investor.name || '(none)',
        extractedName: extracted.firstName || '(none)',
        confidence: extracted.confidence,
        salutation: extracted.salutation
      };
    });
    
    return NextResponse.json({
      totalWithoutNames: investorsWithoutNames.length,
      totalInvestors: investors.length,
      preview: previews
    });
    
  } catch (error) {
    console.error('Preview error:', error);
    return NextResponse.json(
      { error: 'Failed to generate preview' },
      { status: 500 }
    );
  }
}