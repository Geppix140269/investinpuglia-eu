// PATH: app/api/agreements/get-template/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    // Read config to get current template file
    let templateFile = 'Project_Management_Agreement_Editable.pdf';
    try {
      const configPath = path.join(process.cwd(), 'config', 'agreement-template.json');
      const configData = await fs.readFile(configPath, 'utf-8');
      const config = JSON.parse(configData);
      templateFile = config.templateFile || templateFile;
    } catch {
      // Use default if config doesn't exist
    }
    
    // Serve the PDF directly from the local file system
    const pdfPath = path.join(process.cwd(), 'docs', templateFile);
    
    // Check if file exists
    try {
      await fs.access(pdfPath);
    } catch {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }
    
    // Read the PDF file
    const pdfBuffer = await fs.readFile(pdfPath);
    
    // Return the PDF as a response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Project_Management_Agreement_Template.pdf"',
        'Cache-Control': 'public, max-age=3600'
      }
    });
    
  } catch (error) {
    console.error('Error serving template:', error);
    return NextResponse.json({ error: 'Failed to get template' }, { status: 500 });
  }
}