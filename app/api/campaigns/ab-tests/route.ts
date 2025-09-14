export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllABTests,
  createABTest,
  startABTest,
  completeABTest,
  createSubjectLineTest,
  createSendTimeTest,
  createContentTest
} from '@/lib/email-campaigns/ab-testing';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status') as any;
    
    const tests = await getAllABTests(status);
    
    return NextResponse.json({
      success: true,
      tests
    });
    
  } catch (error) {
    console.error('Error fetching A/B tests:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch A/B tests' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      testType,
      name,
      description,
      trafficSplit,
      variantA,
      variantB,
      segmentRules,
      sampleSize,
      primaryMetric,
      autoStart
    } = body;
    
    let testId: string;
    
    // Use helper functions for common test types
    if (testType === 'subject_line' && variantA.configuration.subject && variantB.configuration.subject) {
      testId = await createSubjectLineTest(
        name,
        variantA.configuration.subject,
        variantB.configuration.subject,
        variantA.configuration.templateId || variantB.configuration.templateId,
        segmentRules,
        sampleSize
      );
    } else if (testType === 'send_time' && variantA.configuration.sendTime && variantB.configuration.sendTime) {
      testId = await createSendTimeTest(
        name,
        variantA.configuration.sendTime,
        variantB.configuration.sendTime,
        variantA.configuration.templateId || variantB.configuration.templateId,
        segmentRules,
        sampleSize
      );
    } else if (testType === 'content' && variantA.configuration.templateId && variantB.configuration.templateId) {
      testId = await createContentTest(
        name,
        variantA.configuration.templateId,
        variantB.configuration.templateId,
        segmentRules,
        sampleSize
      );
    } else {
      // Create custom A/B test
      testId = await createABTest({
        name,
        description: description || '',
        status: 'draft',
        testType: testType || 'content',
        trafficSplit: trafficSplit || 50,
        winnerSelection: 'automatic',
        variantA,
        variantB,
        sampleSize: sampleSize || 1000,
        minimumRunTime: 24,
        maximumRunTime: 168,
        significanceLevel: 0.95,
        primaryMetric: primaryMetric || 'conversion_rate',
        segmentRules: segmentRules || {}
      });
    }
    
    // Auto-start if requested
    if (autoStart) {
      await startABTest(testId);
    }
    
    return NextResponse.json({
      success: true,
      testId,
      message: `A/B test ${autoStart ? 'created and started' : 'created'} successfully`
    });
    
  } catch (error) {
    console.error('Error creating A/B test:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create A/B test' },
      { status: 500 }
    );
  }
}