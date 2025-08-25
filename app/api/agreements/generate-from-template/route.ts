// PATH: app/api/agreements/generate-from-template/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { templateId, clientData, token } = await request.json();
    
    // Generate agreement ID
    const timestamp = Date.now();
    const agreementId = `IPAG_${timestamp}_${clientData.companyName.replace(/\s+/g, '_').toUpperCase()}`;
    
    // Generate agreement content with client data
    const agreementContent = generateAgreementContent(clientData);
    
    // Create PDF
    const pdfBytes = await createPDF(clientData, agreementContent);
    
    // Upload PDF to Firebase Storage
    const storageRef = ref(storage, `agreements/${agreementId}/agreement.pdf`);
    await uploadBytes(storageRef, pdfBytes, {
      contentType: 'application/pdf',
      customMetadata: {
        companyName: clientData.companyName,
        clientEmail: clientData.representativeEmail,
        status: 'pending_signature',
        createdAt: new Date().toISOString()
      }
    });
    
    // Get PDF URL
    const pdfUrl = await getDownloadURL(storageRef);
    
    // Save agreement to Firestore
    const agreementRef = doc(collection(db, 'agreements'), agreementId);
    await setDoc(agreementRef, {
      agreementId,
      ...clientData,
      status: 'pending_signature',
      pdfUrl,
      templateId,
      token,
      clientSignature: null,
      consultantSignature: null,
      clientSignedAt: null,
      consultantSignedAt: null,
      created_at: new Date().toISOString(),
      created_by: 'Client Self-Service'
    });
    
    // Send confirmation email to client
    await resend.emails.send({
      from: 'Giuseppe Funaro <g.funaro@investinpuglia.eu>',
      to: clientData.representativeEmail,
      cc: 'g.funaro@investinpuglia.eu',
      subject: `Agreement Received - ${agreementId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank You for Submitting Your Agreement</h2>
          
          <p>Dear ${clientData.representativeName},</p>
          
          <p>We have successfully received your completed Project Management Agreement.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Agreement Details:</h3>
            <ul>
              <li><strong>Agreement ID:</strong> ${agreementId}</li>
              <li><strong>Company:</strong> ${clientData.companyName}</li>
              <li><strong>Project:</strong> ${clientData.projectTitle}</li>
              <li><strong>Total Investment:</strong> €${parseInt(clientData.totalInvestment).toLocaleString()}</li>
              <li><strong>Grant Request:</strong> €${parseInt(clientData.requestedGrant).toLocaleString()}</li>
            </ul>
          </div>
          
          <p>A PDF copy of your agreement is attached to this email for your records.</p>
          
          <h3>Next Steps:</h3>
          <ol>
            <li>Giuseppe Funaro will review your submission within 24 hours</li>
            <li>You will receive the countersigned agreement via email</li>
            <li>Project implementation planning will begin immediately after</li>
          </ol>
          
          <p>If you have any questions, please don't hesitate to contact me.</p>
          
          <p>Best regards,<br>
          Giuseppe Funaro<br>
          Founder & Investment Consultant<br>
          1402 Celsius Ltd<br>
          📧 g.funaro@investinpuglia.eu<br>
          📱 +39 351 400 1402</p>
        </div>
      `,
      attachments: [
        {
          filename: `Agreement_${agreementId}.pdf`,
          content: Buffer.from(pdfBytes).toString('base64')
        }
      ]
    });
    
    return NextResponse.json({
      success: true,
      agreementId,
      pdfUrl
    });
    
  } catch (error) {
    console.error('Error generating agreement from template:', error);
    return NextResponse.json({ error: 'Failed to generate agreement' }, { status: 500 });
  }
}

function generateAgreementContent(data: any): string {
  const serviceFee = Math.round(parseInt(data.totalInvestment) * 0.05); // 5% service fee
  
  return `PROJECT MANAGEMENT AGREEMENT

This Agreement is entered into on ${new Date().toLocaleDateString()} between:

CONSULTANT:
1402 Celsius Ltd
Giuseppe Funaro, Founder & Investment Consultant
20-22 Wenlock Road
N1 7GU, London, United Kingdom
Email: g.funaro@investinpuglia.eu
Phone: +39 351 400 1402
Reg #: 124 75013 | VAT: GB 343 1702 32

CLIENT:
${data.companyName}
${data.companyAddress}
VAT: ${data.vatNumber}
${data.registrationNumber ? `Registration: ${data.registrationNumber}` : ''}

Represented by:
${data.representativeName}, ${data.representativeTitle}
Email: ${data.representativeEmail}
Phone: ${data.representativePhone}

PROJECT DETAILS:
Project Title: ${data.projectTitle}
Location: ${data.projectLocation}

Description:
${data.projectDescription}

FINANCIAL TERMS:
Total Investment Amount: €${parseInt(data.totalInvestment).toLocaleString()}
Own Capital: €${parseInt(data.ownCapital).toLocaleString()}
Requested Grant: €${parseInt(data.requestedGrant).toLocaleString()}
Service Fee: €${serviceFee.toLocaleString()} (5% of total investment)

PROJECT TIMELINE:
Start Date: ${new Date(data.startDate).toLocaleDateString()}
Completion Date: ${new Date(data.completionDate).toLocaleDateString()}

BANKING INFORMATION:
Bank: ${data.bankName}
IBAN: ${data.iban}
${data.swift ? `SWIFT/BIC: ${data.swift}` : ''}

SCOPE OF SERVICES:

1. GRANT APPLICATION SERVICES
   • Complete preparation and submission of PIA/Mini PIA grant application
   • Documentation gathering and organization
   • Financial projections and business plan development
   • Technical documentation coordination
   • Liaison with Puglia Sviluppo and regional authorities

2. PROJECT MANAGEMENT
   • Project planning and scheduling
   • Budget monitoring and control
   • Vendor and contractor coordination
   • Progress reporting and milestone tracking
   • Risk management and mitigation

3. COMPLIANCE AND REPORTING
   • Ensure compliance with all grant requirements
   • Periodic reporting to authorities
   • Documentation maintenance
   • Audit support and preparation
   • Final project certification

PAYMENT TERMS:
The Service Fee of €${serviceFee.toLocaleString()} shall be paid as follows:
• 30% upon agreement signing (€${Math.round(serviceFee * 0.3).toLocaleString()})
• 40% upon grant approval (€${Math.round(serviceFee * 0.4).toLocaleString()})
• 30% upon project completion (€${Math.round(serviceFee * 0.3).toLocaleString()})

TERMS AND CONDITIONS:

1. ENGAGEMENT
The Consultant agrees to provide professional project management and grant advisory services for the Project described above.

2. CLIENT OBLIGATIONS
The Client agrees to:
• Provide all necessary documentation in a timely manner
• Respond promptly to information requests
• Make payments according to the agreed schedule
• Maintain confidentiality of proprietary methods

3. GRANT SUCCESS
While the Consultant will use best efforts to secure grant approval, grant decisions are made by government authorities and cannot be guaranteed.

4. CONFIDENTIALITY
Both parties agree to maintain strict confidentiality regarding all proprietary information exchanged during this engagement.

5. INTELLECTUAL PROPERTY
All work products created specifically for this Project shall become the property of the Client upon full payment.

6. LIMITATION OF LIABILITY
The Consultant's liability shall be limited to the total service fee paid under this Agreement.

7. TERMINATION
Either party may terminate this Agreement with 30 days written notice. Fees for work completed shall remain payable.

8. GOVERNING LAW
This Agreement shall be governed by Italian law and EU regulations.

9. DISPUTE RESOLUTION
Any disputes shall first be addressed through mediation, then arbitration if necessary.

10. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties and supersedes all prior understandings.

SIGNATURES:

Client: ________________________     Date: __________
        ${data.representativeName}
        ${data.representativeTitle}
        ${data.companyName}

Consultant: ____________________     Date: __________
            Giuseppe Funaro
            Founder & Investment Consultant
            1402 Celsius Ltd

This agreement becomes legally binding upon signature by both parties.`;
}

async function createPDF(data: any, content: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  
  // A4 size
  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;
  const fontSize = 10;
  const lineHeight = fontSize * 1.4;
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  // Split content into lines
  const lines = content.split('\n');
  let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let yPosition = pageHeight - margin;
  
  // Add header on first page
  currentPage.drawText('1402 CELSIUS LTD', {
    x: margin,
    y: yPosition,
    size: 14,
    font: boldFont,
    color: rgb(0, 0.5, 0.5)
  });
  yPosition -= 30;
  
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
                   line.startsWith('BANKING INFORMATION:') ||
                   line.startsWith('SCOPE OF SERVICES:') ||
                   line.startsWith('PAYMENT TERMS:') ||
                   line.startsWith('TERMS AND CONDITIONS:') ||
                   line.startsWith('SIGNATURES:') ||
                   /^\d+\./.test(line); // Numbered items
    
    const currentFont = isBold ? boldFont : font;
    const currentFontSize = line.startsWith('PROJECT MANAGEMENT AGREEMENT') ? 14 : fontSize;
    
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
    
    // Add footer
    page.drawText('www.investinpuglia.eu', {
      x: margin,
      y: 30,
      size: 9,
      font: font,
      color: rgb(0, 0.5, 0.5)
    });
  });
  
  return await pdfDoc.save();
}