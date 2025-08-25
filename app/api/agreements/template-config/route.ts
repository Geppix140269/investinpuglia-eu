// PATH: app/api/agreements/template-config/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const configPath = path.join(process.cwd(), 'config', 'agreement-template.json');
    const configData = await fs.readFile(configPath, 'utf-8');
    const config = JSON.parse(configData);
    
    return NextResponse.json(config);
  } catch {
    // Return default if config doesn't exist
    return NextResponse.json({
      templateFile: 'Project_Management_Agreement_Editable.pdf',
      templateName: 'Project Management Agreement',
      version: '1.0'
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const configPath = path.join(process.cwd(), 'config', 'agreement-template.json');
    
    // Ensure config directory exists
    const configDir = path.join(process.cwd(), 'config');
    try {
      await fs.access(configDir);
    } catch {
      await fs.mkdir(configDir, { recursive: true });
    }
    
    // Save config
    const config = {
      templateFile: data.templateFile,
      templateName: data.templateName || 'Project Management Agreement',
      version: data.version || '1.0',
      lastUpdated: data.lastUpdated || new Date().toISOString()
    };
    
    await fs.writeFile(configPath, JSON.stringify(config, null, 2));
    
    return NextResponse.json({ success: true, config });
  } catch (error) {
    console.error('Error saving config:', error);
    return NextResponse.json({ error: 'Failed to save configuration' }, { status: 500 });
  }
}