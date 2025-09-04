// PATH: app/api/agreements/firebase/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db, storage } from '@/lib/firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const agreementData = await request.json();
    
    // Generate unique token and password
    const token = crypto.randomBytes(32).toString('hex');
    const password = generateSecurePassword();
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create agreement document in Firestore
    const agreementRef = doc(collection(db, 'agreements'), token);
    
    const agreementDoc = {
      // Security
      access_token: token,
      password_hash: passwordHash,
      
      // Client Information
      client_name: agreementData.clientName,
      client_email: agreementData.clientEmail,
      client_phone: agreementData.clientPhone || '',
      client_company: agreementData.clientCompany || '',
      
      // Project Details
      project_description: agreementData.projectDescription,
      total_investment: parseFloat(agreementData.totalInvestment),
      grant_amount: parseFloat(agreementData.grantAmount),
      service_fee: parseFloat(agreementData.serviceFee),
      start_date: agreementData.startDate,
      completion_date: agreementData.completionDate,
      
      // Agreement Status
      status: 'pending', // pending, viewed, edited, signed, completed
      
      // Signatures
      client_signature: null,
      client_signed_at: null,
      giuseppe_signature: null,
      giuseppe_signed_at: null,
      
      // Tracking
      created_at: serverTimestamp(),
      created_by: agreementData.createdBy || 'Giuseppe Funaro',
      last_modified: serverTimestamp(),
      first_accessed: null,
      access_count: 0,
      
      // Document Storage
      pdf_url: null,
      signed_pdf_url: null,
      
      // Additional Fields
      notes: agreementData.notes || '',
      payment_terms: agreementData.paymentTerms || 'Standard terms apply',
      special_conditions: agreementData.specialConditions || ''
    };
    
    // Save to Firestore
    await setDoc(agreementRef, agreementDoc);
    
    // Generate initial PDF
    const pdfUrl = await generateAgreementPDF(agreementDoc, token);
    
    // Update document with PDF URL
    await setDoc(agreementRef, { pdf_url: pdfUrl }, { merge: true });
    
    // Log creation in audit trail
    const logRef = doc(collection(db, 'agreement_logs'));
    await setDoc(logRef, {
      agreement_token: token,
      action: 'created',
      timestamp: serverTimestamp(),
      details: `Agreement created for ${agreementData.clientName}`,
      ip_address: request.headers.get('x-forwarded-for') || 'unknown'
    });
    
    // Send email to client with access details
    await sendClientNotification(
      agreementData.clientEmail,
      agreementData.clientName,
      token,
      password
    );
    
    // Send notification to Giuseppe
    await sendAdminNotification(agreementData.clientName, token);
    
    return NextResponse.json({
      success: true,
      agreementId: token,
      accessUrl: `https://investinpuglia.eu/agreement/${token}`,
      message: 'Agreement created and sent to client'
    });
    
  } catch (error) {
    console.error('Error creating agreement:', error);
    return NextResponse.json({ error: 'Failed to create agreement' }, { status: 500 });
  }
}

// Generate secure password
function generateSecurePassword(): string {
  const length = 12;
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*';
  const allChars = uppercase + lowercase + numbers + symbols;
  
  let password = '';
  // Ensure at least one of each type
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

// Generate PDF document
async function generateAgreementPDF(agreementData: any, token: string): Promise<string> {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    let yPosition = height - 50;
    
    // Title
    page.drawText('PROJECT MANAGEMENT AGREEMENT', {
      x: 50,
      y: yPosition,
      size: 20,
      font: boldFont,
      color: rgb(0, 0, 0)
    });
    
    yPosition -= 40;
    
    // Agreement details
    const details = [
      `Client Name: ${agreementData.client_name}`,
      `Client Email: ${agreementData.client_email}`,
      `Project: ${agreementData.project_description}`,
      `Total Investment: €${agreementData.total_investment?.toLocaleString()}`,
      `Grant Amount: €${agreementData.grant_amount?.toLocaleString()}`,
      `Service Fee: €${agreementData.service_fee?.toLocaleString()}`,
      `Start Date: ${agreementData.start_date}`,
      `Completion Date: ${agreementData.completion_date}`
    ];
    
    details.forEach(detail => {
      page.drawText(detail, {
        x: 50,
        y: yPosition,
        size: 12,
        font: font,
        color: rgb(0, 0, 0)
      });
      yPosition -= 25;
    });
    
    // Terms and conditions
    yPosition -= 20;
    page.drawText('TERMS AND CONDITIONS', {
      x: 50,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0)
    });
    
    yPosition -= 25;
    const terms = [
      '1. Scope of Services: Comprehensive project management and grant application support',
      '2. Payment Terms: 50% upon grant approval, 50% upon fund disbursement',
      '3. Confidentiality: Both parties agree to maintain strict confidentiality',
      '4. Governing Law: This agreement is governed by Italian law'
    ];
    
    terms.forEach(term => {
      // Wrap long text
      const words = term.split(' ');
      let line = '';
      let lineCount = 0;
      
      words.forEach(word => {
        const testLine = line + word + ' ';
        const textWidth = font.widthOfTextAtSize(testLine, 10);
        
        if (textWidth > width - 100) {
          page.drawText(line, {
            x: 50,
            y: yPosition - (lineCount * 15),
            size: 10,
            font: font,
            color: rgb(0, 0, 0)
          });
          line = word + ' ';
          lineCount++;
        } else {
          line = testLine;
        }
      });
      
      page.drawText(line, {
        x: 50,
        y: yPosition - (lineCount * 15),
        size: 10,
        font: font,
        color: rgb(0, 0, 0)
      });
      
      yPosition -= 25 + (lineCount * 15);
    });
    
    // Signature lines
    yPosition = 150;
    page.drawText('Client Signature: _______________________  Date: __________', {
      x: 50,
      y: yPosition,
      size: 12,
      font: font,
      color: rgb(0, 0, 0)
    });
    
    yPosition -= 40;
    page.drawText('Giuseppe Funaro: _______________________  Date: __________', {
      x: 50,
      y: yPosition,
      size: 12,
      font: font,
      color: rgb(0, 0, 0)
    });
    
    // Save PDF to Firebase Storage
    const pdfBytes = await pdfDoc.save();
    const storageRef = ref(storage, `agreements/${token}/agreement_${token}.pdf`);
    
    await uploadBytes(storageRef, pdfBytes, {
      contentType: 'application/pdf',
      customMetadata: {
        clientName: agreementData.client_name,
        createdAt: new Date().toISOString()
      }
    });
    
    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

// Send email notification to client
async function sendClientNotification(email: string, name: string, token: string, password: string) {
  const emailContent = {
    to: email,
    subject: 'Your Project Management Agreement - Invest in Puglia',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0d9488;">Project Management Agreement Ready</h2>
        
        <p>Dear ${name},</p>
        
        <p>Your Project Management Agreement with Invest in Puglia is ready for review and signature.</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Access Your Agreement:</h3>
          <p><strong>URL:</strong> <a href="https://investinpuglia.eu/agreement/${token}">https://investinpuglia.eu/agreement/${token}</a></p>
          <p><strong>Password:</strong> <code style="background: #fff; padding: 5px 10px; border-radius: 4px;">${password}</code></p>
        </div>
        
        <p><strong>Important:</strong> Please keep this password secure. You will need it to access and sign your agreement.</p>
        
        <h3>What You Can Do:</h3>
        <ul>
          <li>Review all agreement details</li>
          <li>Request changes if needed</li>
          <li>Digitally sign the agreement</li>
          <li>Download a PDF copy for your records</li>
        </ul>
        
        <p>The agreement is legally binding once both parties have signed digitally.</p>
        
        <p>If you have any questions, please don't hesitate to contact us.</p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0;"><strong>Giuseppe Funaro</strong></p>
          <p style="margin: 5px 0;">Founder & Investment Consultant</p>
          <p style="margin: 5px 0;">Invest in Puglia</p>
          <p style="margin: 5px 0;">📞 +39 351 400 1402</p>
          <p style="margin: 5px 0;">✉️ info@investinpuglia.eu</p>
        </div>
      </div>
    `
  };
  
  // Send via your email service (EmailJS, SendGrid, etc.)
  console.log('Email would be sent:', emailContent);
  
  // If using EmailJS
  if (typeof window !== 'undefined' && (window as any).emailjs) {
    try {
      await (window as any).emailjs.send(
        'service_id',
        'template_agreement',
        {
          to_email: email,
          to_name: name,
          agreement_url: `https://investinpuglia.eu/agreement/${token}`,
          password: password
        }
      );
    } catch (error) {
      console.error('EmailJS error:', error);
    }
  }
}

// Send notification to admin
async function sendAdminNotification(clientName: string, token: string) {
  // Send Telegram notification
  try {
    await fetch('/api/trullo-telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'new_agreement',
        data: {
          clientName,
          token,
          url: `https://investinpuglia.eu/agreement/${token}`,
          timestamp: new Date().toISOString()
        }
      })
    });
  } catch (error) {
    console.error('Failed to send admin notification:', error);
  }
}