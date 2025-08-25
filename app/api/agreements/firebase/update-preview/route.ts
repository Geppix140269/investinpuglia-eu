// PATH: app/api/agreements/firebase/update-preview/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db, storage } from '@/lib/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const { draftId, content, formData } = await request.json();
    
    if (!draftId) {
      return NextResponse.json({ error: 'Draft ID is required' }, { status: 400 });
    }
    
    // Get the draft from Firestore
    const draftRef = doc(db, 'agreement_drafts', draftId);
    const draftDoc = await getDoc(draftRef);
    
    if (!draftDoc.exists()) {
      return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
    }
    
    // Create updated PDF with new content
    const pdfBytes = await createPDF(formData || draftDoc.data(), content);
    
    // Upload updated PDF to Firebase Storage
    const storageRef = ref(storage, `agreements/drafts/${draftId}/agreement_preview.pdf`);
    await uploadBytes(storageRef, pdfBytes, {
      contentType: 'application/pdf',
      customMetadata: {
        clientName: formData?.clientName || draftDoc.data().clientName,
        status: 'draft',
        updatedAt: new Date().toISOString()
      }
    });
    
    // Get new download URL
    const pdfUrl = await getDownloadURL(storageRef);
    
    // Update draft in Firestore
    await updateDoc(draftRef, {
      content,
      pdfUrl,
      updated_at: new Date().toISOString(),
      ...(formData && { ...formData })
    });
    
    return NextResponse.json({
      success: true,
      draftId,
      pdfUrl,
      message: 'Draft updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating preview:', error);
    return NextResponse.json({ error: 'Failed to update preview' }, { status: 500 });
  }
}

// Create PDF from content
async function createPDF(formData: any, content: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  
  // A4 size
  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;
  const fontSize = 11;
  const lineHeight = fontSize * 1.5;
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  // Split content into lines
  const lines = content.split('\n');
  let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let yPosition = pageHeight - margin;
  
  for (const line of lines) {
    // Check if we need a new page
    if (yPosition < margin + lineHeight) {
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      yPosition = pageHeight - margin;
    }
    
    // Determine if line should be bold (headers)
    const isBold = line.startsWith('PROJECT MANAGEMENT AGREEMENT') ||
                   line.startsWith('CONSULTANT:') ||
                   line.startsWith('CLIENT:') ||
                   line.startsWith('PROJECT DETAILS:') ||
                   line.startsWith('FINANCIAL TERMS:') ||
                   line.startsWith('PROJECT TIMELINE:') ||
                   line.startsWith('SCOPE OF SERVICES:') ||
                   line.startsWith('PAYMENT TERMS:') ||
                   line.startsWith('TERMS AND CONDITIONS:') ||
                   line.startsWith('SPECIAL CONDITIONS:') ||
                   line.startsWith('SIGNATURES:') ||
                   /^\d+\./.test(line); // Numbered items
    
    const currentFont = isBold ? boldFont : font;
    const currentFontSize = line.startsWith('PROJECT MANAGEMENT AGREEMENT') ? 16 : fontSize;
    
    // Handle long lines by wrapping
    const maxWidth = pageWidth - (2 * margin);
    const words = line.split(' ');
    let currentLine = '';
    
    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const textWidth = currentFont.widthOfTextAtSize(testLine, currentFontSize);
      
      if (textWidth > maxWidth && currentLine) {
        // Draw current line
        currentPage.drawText(currentLine, {
          x: margin,
          y: yPosition,
          size: currentFontSize,
          font: currentFont,
          color: rgb(0, 0, 0)
        });
        yPosition -= lineHeight;
        
        // Check for new page
        if (yPosition < margin + lineHeight) {
          currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
          yPosition = pageHeight - margin;
        }
        
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    
    // Draw remaining text
    if (currentLine) {
      currentPage.drawText(currentLine, {
        x: margin,
        y: yPosition,
        size: currentFontSize,
        font: currentFont,
        color: rgb(0, 0, 0)
      });
      yPosition -= lineHeight;
    }
  }
  
  // Add page numbers
  const pages = pdfDoc.getPages();
  pages.forEach((page, index) => {
    page.drawText(`Page ${index + 1} of ${pages.length}`, {
      x: pageWidth / 2 - 30,
      y: 30,
      size: 9,
      font: font,
      color: rgb(0.5, 0.5, 0.5)
    });
  });
  
  return await pdfDoc.save();
}