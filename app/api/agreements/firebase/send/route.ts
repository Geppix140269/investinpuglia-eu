// PATH: app/api/agreements/firebase/send/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, deleteDoc, setDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { getResendClient } from '@/lib/resend-client';


export async function POST(request: NextRequest) {
  try {
    const { draftId } = await request.json();
    
    if (!draftId) {
      return NextResponse.json({ error: 'Draft ID is required' }, { status: 400 });
    }
    
    // Get the draft from Firestore
    const draftRef = doc(db, 'agreement_drafts', draftId);
    const draftDoc = await getDoc(draftRef);
    
    if (!draftDoc.exists()) {
      return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
    }
    
    const draftData = draftDoc.data();
    
    // Generate unique token and password for client access
    const token = crypto.randomBytes(32).toString('hex');
    const password = generateSecurePassword();
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create agreement ID
    const timestamp = Date.now();
    const agreementId = `IPAG_${timestamp}_${draftData.clientName.replace(/\s+/g, '_').toUpperCase()}`;
    
    // Get the PDF from draft storage
    const draftStorageRef = ref(storage, `agreements/drafts/${draftId}/agreement_preview.pdf`);
    const draftUrl = await getDownloadURL(draftStorageRef);
    
    // Download the draft PDF
    const pdfResponse = await fetch(draftUrl);
    const pdfBytes = await pdfResponse.arrayBuffer();
    
    // Upload to final agreements location
    const finalStorageRef = ref(storage, `agreements/${agreementId}/agreement.pdf`);
    await uploadBytes(finalStorageRef, new Uint8Array(pdfBytes), {
      contentType: 'application/pdf',
      customMetadata: {
        clientName: draftData.clientName,
        clientEmail: draftData.clientEmail,
        status: 'pending_signature',
        createdAt: new Date().toISOString()
      }
    });
    
    // Get final PDF URL
    const pdfUrl = await getDownloadURL(finalStorageRef);
    
    // Save agreement to Firestore
    const agreementRef = doc(collection(db, 'agreements'), agreementId);
    await setDoc(agreementRef, {
      ...draftData,
      agreementId,
      token,
      passwordHash,
      status: 'pending_signature',
      pdfUrl,
      clientSignature: null,
      consultantSignature: null,
      clientSignedAt: null,
      consultantSignedAt: null,
      created_at: serverTimestamp(),
      created_by: 'Giuseppe Funaro',
      sent_at: new Date().toISOString()
    });
    
    // Create access link
    const accessLink = `https://investinpuglia.eu/agreement/firebase/${token}`;

    // Send email to client
    const resend = getResendClient()
    const emailData = await resend.emails.send({
      from: 'Giuseppe Funaro <g.funaro@investinpuglia.eu>',
      to: draftData.clientEmail,
      subject: `Your Investment Agreement - ${agreementId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your Project Management Agreement is Ready</h2>
          
          <p>Dear ${draftData.clientName},</p>
          
          <p>Your Project Management Agreement has been prepared and is ready for your review and signature.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Agreement Details:</h3>
            <ul>
              <li><strong>Agreement ID:</strong> ${agreementId}</li>
              <li><strong>Project:</strong> ${draftData.projectDescription}</li>
              <li><strong>Investment Amount:</strong> €${parseInt(draftData.totalInvestment).toLocaleString()}</li>
            </ul>
          </div>
          
          <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Access Your Agreement:</h3>
            <p><strong>Link:</strong> <a href="${accessLink}">${accessLink}</a></p>
            <p><strong>Password:</strong> <code style="background: #fff; padding: 5px 10px; border: 1px solid #ddd;">${password}</code></p>
            <p style="color: #666; font-size: 14px;">⚠️ Please save this password securely. You will need it to access and sign your agreement.</p>
          </div>
          
          <h3>Next Steps:</h3>
          <ol>
            <li>Click the link above to access your agreement</li>
            <li>Enter the provided password</li>
            <li>Review the agreement terms carefully</li>
            <li>Sign electronically when ready</li>
            <li>Download your copy for your records</li>
          </ol>
          
          <p>If you have any questions or need assistance, please don't hesitate to contact me.</p>
          
          <p>Best regards,<br>
          Giuseppe Funaro<br>
          Founder & Investment Consultant<br>
          1402 Celsius Ltd<br>
          📧 g.funaro@investinpuglia.eu<br>
          📱 +39 351 400 1402</p>
        </div>
      `
    });
    
    // Delete the draft
    await deleteDoc(draftRef);
    
    // Try to delete draft PDF from storage (optional, as it may fail if permissions are strict)
    try {
      await deleteObject(draftStorageRef);
    } catch (deleteError) {
      console.log('Could not delete draft PDF, will be cleaned up later');
    }
    
    return NextResponse.json({
      success: true,
      agreementId,
      accessLink,
      message: 'Agreement sent successfully to client'
    });
    
  } catch (error) {
    console.error('Error sending agreement:', error);
    return NextResponse.json({ error: 'Failed to send agreement' }, { status: 500 });
  }
}

function generateSecurePassword(): string {
  const length = 12;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  const randomBytes = crypto.randomBytes(length);
  
  for (let i = 0; i < length; i++) {
    password += charset[randomBytes[i] % charset.length];
  }
  
  return password;
}