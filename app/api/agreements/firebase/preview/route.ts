// PATH: app/api/agreements/firebase/preview/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db, storage } from '@/lib/firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Generate a draft ID
    const draftId = `draft_${crypto.randomBytes(16).toString('hex')}`;
    
    // Generate the agreement content
    const content = generateAgreementContent(formData);
    
    // Create PDF
    const pdfBytes = await createPDF(formData, content);
    
    // Upload to Firebase Storage (drafts folder)
    const storageRef = ref(storage, `agreements/drafts/${draftId}/agreement_preview.pdf`);
    await uploadBytes(storageRef, pdfBytes, {
      contentType: 'application/pdf',
      customMetadata: {
        clientName: formData.clientName,
        status: 'draft',
        createdAt: new Date().toISOString()
      }
    });
    
    // Get download URL
    const pdfUrl = await getDownloadURL(storageRef);
    
    // Save draft to Firestore
    const draftRef = doc(collection(db, 'agreement_drafts'), draftId);
    await setDoc(draftRef, {
      ...formData,
      draftId,
      status: 'draft',
      pdfUrl,
      content,
      created_at: serverTimestamp(),
      created_by: 'Giuseppe Funaro'
    });
    
    return NextResponse.json({
      success: true,
      draftId,
      pdfUrl,
      content
    });
    
  } catch (error) {
    console.error('Error generating preview:', error);
    return NextResponse.json({ error: 'Failed to generate preview' }, { status: 500 });
  }
}

// Generate agreement content (editable text)
function generateAgreementContent(formData: any): string {
  return `PROJECT MANAGEMENT AGREEMENT

This Agreement is entered into on ${new Date().toLocaleDateString()} between:

CONSULTANT:
Invest in Puglia
Giuseppe Funaro, Founder & Investment Consultant
Via [Address]
Bari, Puglia, Italy
Email: info@investinpuglia.eu
Phone: +39 351 901 2974

CLIENT:
${formData.clientName}
${formData.clientCompany ? `Company: ${formData.clientCompany}` : ''}
Email: ${formData.clientEmail}
${formData.clientPhone ? `Phone: ${formData.clientPhone}` : ''}

PROJECT DETAILS:
${formData.projectDescription}

FINANCIAL TERMS:
Total Investment Amount: €${parseInt(formData.totalInvestment).toLocaleString()}
Expected Grant Amount: €${parseInt(formData.grantAmount).toLocaleString()}
Service Fee: €${parseInt(formData.serviceFee).toLocaleString()}

PROJECT TIMELINE:
Start Date: ${new Date(formData.startDate).toLocaleDateString()}
Completion Date: ${new Date(formData.completionDate).toLocaleDateString()}

SCOPE OF SERVICES:
1. Grant Application Preparation and Submission
   - Complete preparation of PIA/Mini PIA grant application
   - Documentation gathering and organization
   - Financial projections and business plan development
   - Technical documentation coordination

2. Project Management Services
   - Liaison with Puglia Sviluppo and regional authorities
   - Progress reporting and milestone tracking
   - Budget monitoring and control
   - Vendor and contractor coordination

3. Compliance and Reporting
   - Ensure compliance with grant requirements
   - Periodic reporting to authorities
   - Documentation maintenance
   - Audit support

PAYMENT TERMS:
${formData.paymentTerms}

TERMS AND CONDITIONS:

1. ENGAGEMENT
The Consultant agrees to provide professional project management and grant advisory services for the Project described above.

2. CLIENT OBLIGATIONS
The Client agrees to:
- Provide all necessary documentation in a timely manner
- Respond promptly to information requests
- Make payments according to the agreed schedule
- Maintain confidentiality of proprietary methods

3. CONFIDENTIALITY
Both parties agree to maintain strict confidentiality regarding all proprietary information exchanged during this engagement.

4. INTELLECTUAL PROPERTY
All work products created specifically for this Project shall become the property of the Client upon full payment.

5. LIMITATION OF LIABILITY
The Consultant's liability shall be limited to the total service fee paid under this Agreement.

6. TERMINATION
Either party may terminate this Agreement with 30 days written notice. Fees for work completed shall remain payable.

7. GOVERNING LAW
This Agreement shall be governed by Italian law and EU regulations.

8. DISPUTE RESOLUTION
Any disputes shall first be addressed through mediation, then arbitration if necessary.

9. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties.

${formData.specialConditions ? `SPECIAL CONDITIONS:\n${formData.specialConditions}\n` : ''}

SIGNATURES:

Client: ________________________     Date: __________
        ${formData.clientName}

Consultant: ____________________     Date: __________
            Giuseppe Funaro
            Invest in Puglia

This agreement becomes legally binding upon signature by both parties.`;
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