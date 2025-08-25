// PATH: app/api/agreements/upload-template/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // For now, directly upload the local PDF file
    const pdfPath = path.join(process.cwd(), 'docs', 'Project_Management_Agreement_Editable.pdf');
    
    // Read the PDF file
    const pdfBuffer = await fs.readFile(pdfPath);
    
    // Upload to Firebase Storage
    const templateRef = ref(storage, 'templates/agreements/Project_Management_Agreement_Template.pdf');
    
    const snapshot = await uploadBytes(templateRef, pdfBuffer, {
      contentType: 'application/pdf',
      customMetadata: {
        uploadedBy: 'Giuseppe Funaro',
        uploadedAt: new Date().toISOString(),
        type: 'agreement_template'
      }
    });

    // Get download URL
    const downloadUrl = await getDownloadURL(snapshot.ref);
    
    return NextResponse.json({
      success: true,
      url: downloadUrl,
      message: 'Template uploaded successfully'
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Failed to upload template',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Check if template exists and return its URL
    const templateRef = ref(storage, 'templates/agreements/Project_Management_Agreement_Template.pdf');
    const url = await getDownloadURL(templateRef);
    
    return NextResponse.json({
      success: true,
      exists: true,
      url
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      exists: false,
      message: 'No template uploaded yet'
    });
  }
}