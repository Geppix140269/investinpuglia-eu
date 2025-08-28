import { NextRequest, NextResponse } from 'next/server';
import { 
  createDataSubjectRequest,
  processDataAccessRequest,
  processDataErasureRequest,
  recordConsent,
  generateGdprComplianceReport
} from '@/lib/email-campaigns/gdpr-compliance';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const requestId = searchParams.get('requestId');
    const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : new Date();
    
    if (action === 'compliance-report') {
      // Generate GDPR compliance report
      const report = await generateGdprComplianceReport(startDate, endDate);
      
      return NextResponse.json({
        success: true,
        report,
        period: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      });
    }
    
    if (action === 'export-data' && requestId) {
      // Process data access request
      const personalData = await processDataAccessRequest(requestId);
      
      return NextResponse.json({
        success: true,
        data: personalData,
        exportedAt: new Date().toISOString()
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid action or missing parameters' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Error processing GDPR request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process GDPR request' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, requestType, consentData } = body;
    
    if (action === 'data-request') {
      // Create data subject request
      if (!email || !requestType) {
        return NextResponse.json(
          { success: false, error: 'Email and requestType are required' },
          { status: 400 }
        );
      }
      
      const requestId = await createDataSubjectRequest(email, requestType);
      
      return NextResponse.json({
        success: true,
        requestId,
        message: `Data ${requestType} request created successfully. We will respond within 30 days.`
      });
    }
    
    if (action === 'record-consent') {
      // Record consent
      if (!consentData || !consentData.investorId || !consentData.email) {
        return NextResponse.json(
          { success: false, error: 'Consent data with investorId and email is required' },
          { status: 400 }
        );
      }
      
      // Get client IP and user agent
      const clientIP = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
      const userAgent = request.headers.get('user-agent') || 'unknown';
      
      const consentId = await recordConsent(
        consentData.investorId,
        consentData.email,
        {
          consentType: consentData.consentType || 'marketing',
          consentMethod: consentData.consentMethod || 'explicit_opt_in',
          consentSource: consentData.consentSource || 'website_form',
          legalBasis: consentData.legalBasis || 'consent',
          dataProcessingPurposes: consentData.dataProcessingPurposes || ['email_marketing'],
          retentionPeriod: consentData.retentionPeriod || 24, // months
          ipAddress: clientIP,
          userAgent,
          metadata: consentData.metadata
        }
      );
      
      return NextResponse.json({
        success: true,
        consentId,
        message: 'Consent recorded successfully'
      });
    }
    
    if (action === 'process-erasure') {
      // Process data erasure request
      const { requestId } = body;
      
      if (!requestId) {
        return NextResponse.json(
          { success: false, error: 'Request ID is required' },
          { status: 400 }
        );
      }
      
      await processDataErasureRequest(requestId);
      
      return NextResponse.json({
        success: true,
        message: 'Data erasure completed successfully'
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Error processing GDPR request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process GDPR request' },
      { status: 500 }
    );
  }
}