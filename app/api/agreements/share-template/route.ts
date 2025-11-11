// PATH: app/api/agreements/share-template/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db, storage } from '@/lib/firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { getResendClient } from '@/lib/resend-client';

export async function POST(request: NextRequest) {
  try {
    const { clientEmail, clientName, projectType } = await request.json();
    
    // Generate unique token and password for client access
    const token = crypto.randomBytes(32).toString('hex');
    const password = generateSecurePassword();
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create template share record
    const templateShareRef = doc(collection(db, 'agreement_templates_shared'));
    await setDoc(templateShareRef, {
      token,
      passwordHash,
      clientEmail,
      clientName,
      projectType,
      status: 'pending_completion',
      shared_at: new Date().toISOString(),
      completed: false,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days expiry
    });
    
    // Create access link (use localhost for development)
    const isDevelopment = process.env.NODE_ENV === 'development';
    const baseUrl = isDevelopment ? 'http://localhost:3005' : 'https://investinpuglia.eu';
    const accessLink = `${baseUrl}/agreement/template/${token}`;
    
    // Template will be served from our API
    const templateUrl = `${baseUrl}/api/agreements/get-template`;
    
    // Send email to client
    const resend = getResendClient()
    await resend.emails.send({
      from: 'Giuseppe Funaro <g.funaro@investinpuglia.eu>',
      to: clientEmail,
      subject: 'Complete Your Investment Agreement - Invest in Puglia',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Invest in Puglia</h2>
          
          <p>Dear ${clientName},</p>
          
          <p>Thank you for your interest in investing in Puglia. Please download and complete your Project Management Agreement.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Agreement Template:</h3>
            ${templateUrl ? `
            <p style="margin-bottom: 15px;">
              <a href="${templateUrl}" style="display: inline-block; padding: 10px 20px; background: #0066cc; color: white; text-decoration: none; border-radius: 5px;">
                📄 Download Agreement Template (PDF)
              </a>
            </p>
            ` : ''}
            <p><strong>Access Link:</strong> <a href="${accessLink}">${accessLink}</a></p>
            <p><strong>Password:</strong> <code style="background: #fff; padding: 5px 10px; border: 1px solid #ddd;">${password}</code></p>
            <p style="color: #666; font-size: 14px;">⚠️ This link expires in 7 days. Please save this password securely.</p>
          </div>
          
          <h3>What to Expect:</h3>
          <ol>
            <li>Click the access link above</li>
            <li>Enter the provided password</li>
            <li>The editable PDF agreement will open automatically</li>
            <li>Fill in your company details directly in the PDF</li>
            <li>Save the completed PDF</li>
            <li>Email it back to g.funaro@investinpuglia.eu</li>
          </ol>
          
          <p>The agreement template includes:</p>
          <ul>
            <li>Standard terms and conditions</li>
            <li>Grant application services</li>
            <li>Project management framework</li>
            <li>Payment terms</li>
            <li>Compliance requirements</li>
          </ul>
          
          <p>If you have any questions, please don't hesitate to contact me.</p>
          
          <p>Best regards,<br>
          Giuseppe Funaro<br>
          Founder & Investment Consultant<br>
          Invest in Puglia<br>
          📧 g.funaro@investinpuglia.eu<br>
          📱 +39 351 400 1402</p>
        </div>
      `
    });
    
    return NextResponse.json({
      success: true,
      message: 'Template shared successfully',
      accessLink,
      expiresIn: '7 days'
    });
    
  } catch (error) {
    console.error('Error sharing template:', error);
    return NextResponse.json({ error: 'Failed to share template' }, { status: 500 });
  }
}

function generateSecurePassword(): string {
  const length = 8;
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  const randomBytes = crypto.randomBytes(length);
  
  for (let i = 0; i < length; i++) {
    password += charset[randomBytes[i] % charset.length];
  }
  
  return password;
}