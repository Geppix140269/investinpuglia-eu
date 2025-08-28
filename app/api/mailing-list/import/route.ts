import { NextRequest, NextResponse } from 'next/server';
import { bulkImportInvestors } from '@/lib/firebase-mailing-list';
import { investorEmails } from '@/lib/mailing-list-data';

export async function POST(request: NextRequest) {
  try {
    // Optional: Add authentication check here
    // const authHeader = request.headers.get('authorization');
    // if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // Format the investor emails for import
    const contactsToImport = investorEmails.map(investor => ({
      email: investor.email.toLowerCase(),
      name: investor.name || '',
      status: 'interested' as const,
      tags: investor.tags || ['investor', 'puglia_property'],
      source: 'initial_import',
      subscribed: true,
      eventRegistrations: []
    }));

    // Perform bulk import
    const results = await bulkImportInvestors(contactsToImport);

    return NextResponse.json({
      success: true,
      message: 'Mailing list imported successfully',
      results: {
        totalProcessed: contactsToImport.length,
        imported: results.success,
        duplicates: results.duplicates,
        failed: results.failed
      }
    });

  } catch (error) {
    console.error('Error importing mailing list:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to import mailing list',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check import status without actually importing
export async function GET() {
  return NextResponse.json({
    message: 'Mailing list import endpoint',
    totalContacts: investorEmails.length,
    instructions: 'Send a POST request to import the mailing list'
  });
}