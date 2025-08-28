import { NextRequest, NextResponse } from 'next/server';
import { 
  EMAIL_TEMPLATES,
  getTemplatesByCategory,
  getTemplatesByPurpose,
  validateTemplate,
  personalizeTemplate
} from '@/lib/email-campaigns/templates';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as any;
    const purpose = searchParams.get('purpose') as any;
    const templateId = searchParams.get('id');
    
    if (templateId) {
      // Get specific template
      const template = EMAIL_TEMPLATES[templateId];
      if (!template) {
        return NextResponse.json(
          { success: false, error: 'Template not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        template: {
          id: templateId,
          ...template,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    }
    
    let templates;
    
    if (category) {
      templates = getTemplatesByCategory(category);
    } else if (purpose) {
      templates = getTemplatesByPurpose(purpose);
    } else {
      // Get all templates
      templates = Object.entries(EMAIL_TEMPLATES).map(([id, template]) => ({
        ...template,
        id,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
    }
    
    return NextResponse.json({
      success: true,
      templates,
      total: templates.length
    });
    
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, templateId, personalizations } = body;
    
    if (action === 'preview' && templateId && personalizations) {
      // Preview personalized template
      const template = EMAIL_TEMPLATES[templateId];
      if (!template) {
        return NextResponse.json(
          { success: false, error: 'Template not found' },
          { status: 404 }
        );
      }
      
      const personalizedHtml = personalizeTemplate(template.html, personalizations);
      const personalizedSubject = personalizeTemplate(template.subject, personalizations);
      
      return NextResponse.json({
        success: true,
        preview: {
          subject: personalizedSubject,
          html: personalizedHtml,
          previewText: personalizeTemplate(template.previewText, personalizations)
        }
      });
    }
    
    if (action === 'validate') {
      // Validate template
      const validation = validateTemplate(body.template);
      return NextResponse.json({
        success: true,
        validation
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Error processing template request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process template request' },
      { status: 500 }
    );
  }
}