// app/api/verify-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import crypto from 'crypto';

// Generate verification token
function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Send verification email (you can use Resend, SendGrid, etc.)
async function sendVerificationEmail(email: string, token: string) {
  try {
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify-email?token=${token}`;
    
    // Using Resend (if available)
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      await resend.emails.send({
        from: 'InvestInPuglia <info@1402celsius.com>',
        to: email,
        subject: 'Verify your email address',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Verify Your Email Address</h1>
            <p>Thank you for signing up with InvestInPuglia.eu!</p>
            <p>Please click the link below to verify your email address:</p>
            <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #10B981; color: white; text-decoration: none; border-radius: 6px;">
              Verify Email
            </a>
            <p>Or copy and paste this link into your browser:</p>
            <p>${verificationUrl}</p>
            <p>This link will expire in 24 hours.</p>
            <p>Best regards,<br>The InvestInPuglia Team</p>
          </div>
        `
      });
    } else {
      console.log('Verification email would be sent to:', email);
      console.log('Verification URL:', verificationUrl);
    }
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw error;
  }
}

// Handle email verification request (send verification email)
export async function POST(request: NextRequest) {
  try {
    const { email, userId } = await request.json();
    
    if (!email || !userId) {
      return NextResponse.json(
        { error: 'Email and userId are required' },
        { status: 400 }
      );
    }
    
    // Generate verification token
    const token = generateVerificationToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiry
    
    // Store verification token in Firebase
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      email_verification_token: token,
      email_verification_expires: expiresAt.toISOString(),
      email_verified: false,
      updated_at: serverTimestamp()
    });
    
    // Send verification email
    await sendVerificationEmail(email, token);
    
    return NextResponse.json({
      success: true,
      message: 'Verification email sent'
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Failed to send verification email' },
      { status: 500 }
    );
  }
}

// Handle email verification (verify token)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }
    
    // Find user with this verification token
    // Note: In production, you might want to create an index for this query
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email_verification_token', '==', token));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?status=invalid`
      );
    }
    
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    // Check if token has expired
    const expiresAt = new Date(userData.email_verification_expires);
    if (expiresAt < new Date()) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?status=expired`
      );
    }
    
    // Update user as verified
    const userRef = doc(db, 'users', userDoc.id);
    await updateDoc(userRef, {
      email_verified: true,
      email_verification_token: null,
      email_verification_expires: null,
      email_verified_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    
    // Redirect to success page
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?status=success`
    );
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?status=error`
    );
  }
}

// Add missing imports
import { collection, query, where, getDocs } from 'firebase/firestore';