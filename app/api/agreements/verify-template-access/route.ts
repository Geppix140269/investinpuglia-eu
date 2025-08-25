// PATH: app/api/agreements/verify-template-access/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();
    
    // Get template share record
    const templatesSnapshot = await getDocs(
      query(collection(db, 'agreement_templates_shared'), where('token', '==', token))
    );
    
    if (templatesSnapshot.empty) {
      return NextResponse.json({ error: 'Invalid or expired link' }, { status: 404 });
    }
    
    const templateDoc = templatesSnapshot.docs[0];
    const data = templateDoc.data();
    
    // Check expiry
    if (new Date(data.expires_at) < new Date()) {
      return NextResponse.json({ error: 'This link has expired. Please request a new one.' }, { status: 410 });
    }
    
    // Verify password
    const isValid = await bcrypt.compare(password, data.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }
    
    return NextResponse.json({
      success: true,
      id: templateDoc.id,
      ...data
    });
    
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}