import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllEmailSequences,
  createEmailSequence,
  enrollInvestorInSequence,
  bulkEnrollBySegment,
  SEQUENCE_TEMPLATES
} from '@/lib/email-campaigns/automation';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as any;
    
    const sequences = await getAllEmailSequences(status);
    
    return NextResponse.json({
      success: true,
      sequences
    });
    
  } catch (error) {
    console.error('Error fetching sequences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sequences' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      templateKey,
      action,
      sequenceId,
      investorId,
      investorIds,
      segmentRules,
      ...sequenceData
    } = body;
    
    if (action === 'enroll') {
      // Enroll investors in sequence
      if (investorIds && Array.isArray(investorIds)) {
        // Bulk enroll specific investors
        const results = { success: 0, failed: 0, errors: [] as string[] };
        
        for (const id of investorIds) {
          try {
            await enrollInvestorInSequence(id, sequenceId);
            results.success++;
          } catch (error) {
            results.failed++;
            results.errors.push(`Failed to enroll ${id}: ${error}`);
          }
        }
        
        return NextResponse.json({
          success: true,
          results,
          message: `Enrolled ${results.success} investors, ${results.failed} failed`
        });
        
      } else if (segmentRules) {
        // Bulk enroll by segment
        const results = await bulkEnrollBySegment(sequenceId, segmentRules);
        
        return NextResponse.json({
          success: true,
          results,
          message: `Enrolled ${results.success} investors from segments`
        });
        
      } else if (investorId) {
        // Enroll single investor
        await enrollInvestorInSequence(investorId, sequenceId);
        
        return NextResponse.json({
          success: true,
          message: 'Investor enrolled successfully'
        });
      }
      
      return NextResponse.json(
        { success: false, error: 'Missing enrollment parameters' },
        { status: 400 }
      );
    }
    
    // Create new sequence
    let sequenceConfig;
    
    if (templateKey && SEQUENCE_TEMPLATES[templateKey as keyof typeof SEQUENCE_TEMPLATES]) {
      // Create from template
      const template = SEQUENCE_TEMPLATES[templateKey as keyof typeof SEQUENCE_TEMPLATES];
      sequenceConfig = {
        ...template,
        status: 'draft' as const,
        trigger: {
          type: 'manual' as const
        },
        analytics: {
          totalEnrolled: 0,
          totalCompleted: 0,
          totalOptedOut: 0,
          averageCompletionTime: 0
        },
        settings: {
          respectUnsubscribe: true,
          respectGlobalOptOut: true
        }
      };
    } else {
      // Create custom sequence
      if (!sequenceData.name || !sequenceData.steps) {
        return NextResponse.json(
          { success: false, error: 'Name and steps are required' },
          { status: 400 }
        );
      }
      
      sequenceConfig = {
        name: sequenceData.name,
        description: sequenceData.description || '',
        status: 'draft' as const,
        trigger: sequenceData.trigger || { type: 'manual' as const },
        steps: sequenceData.steps,
        settings: {
          respectUnsubscribe: true,
          respectGlobalOptOut: true,
          ...sequenceData.settings
        },
        analytics: {
          totalEnrolled: 0,
          totalCompleted: 0,
          totalOptedOut: 0,
          averageCompletionTime: 0
        }
      };
    }
    
    const newSequenceId = await createEmailSequence(sequenceConfig);
    
    return NextResponse.json({
      success: true,
      sequenceId: newSequenceId,
      message: 'Email sequence created successfully'
    });
    
  } catch (error) {
    console.error('Error creating sequence:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create sequence' },
      { status: 500 }
    );
  }
}