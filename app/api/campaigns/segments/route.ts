export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllSegments, 
  createSegment, 
  recalculateSegment,
  createSegmentFromTemplate,
  SEGMENT_TEMPLATES
} from '@/lib/email-campaigns/segmentation';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const activeOnly = searchParams.get('active') === 'true';
    const includeCount = searchParams.get('includeCount') === 'true';
    
    const segments = await getAllSegments(activeOnly);
    
    // If requested, recalculate segment counts
    if (includeCount) {
      const segmentsWithCounts = await Promise.all(
        segments.map(async (segment) => {
          if (segment.isDynamic && (!segment.cachedCount || !segment.lastCalculated)) {
            const count = await recalculateSegment(segment.id);
            return { ...segment, cachedCount: count };
          }
          return segment;
        })
      );
      
      return NextResponse.json({
        success: true,
        segments: segmentsWithCounts
      });
    }
    
    return NextResponse.json({
      success: true,
      segments
    });
    
  } catch (error) {
    console.error('Error fetching segments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch segments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { templateKey, ...segmentData } = body;
    
    let segmentId: string;
    
    if (templateKey && SEGMENT_TEMPLATES[templateKey as keyof typeof SEGMENT_TEMPLATES]) {
      // Create segment from template
      segmentId = await createSegmentFromTemplate(templateKey);
    } else {
      // Create custom segment
      if (!segmentData.name || !segmentData.conditions) {
        return NextResponse.json(
          { success: false, error: 'Name and conditions are required' },
          { status: 400 }
        );
      }
      
      segmentId = await createSegment({
        name: segmentData.name,
        description: segmentData.description || '',
        conditions: segmentData.conditions,
        conditionLogic: segmentData.conditionLogic || 'AND',
        isActive: segmentData.isActive !== false,
        isDynamic: segmentData.isDynamic !== false,
        usedInCampaigns: [],
        usedInSequences: []
      });
    }
    
    return NextResponse.json({
      success: true,
      segmentId,
      message: 'Segment created successfully'
    });
    
  } catch (error) {
    console.error('Error creating segment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create segment' },
      { status: 500 }
    );
  }
}