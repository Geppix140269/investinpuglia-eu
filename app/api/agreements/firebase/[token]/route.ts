// PATH: app/api/agreements/firebase/[token]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp, increment } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import bcrypt from 'bcryptjs';

// GET agreement by token
export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const agreementRef = doc(db, 'agreements', params.token);
    const agreementSnap = await getDoc(agreementRef);
    
    if (!agreementSnap.exists()) {
      return NextResponse.json({ error: 'Agreement not found' }, { status: 404 });
    }
    
    const data = agreementSnap.data();
    
    // Don't send password hash to client
    const { password_hash, ...agreementData } = data;
    
    // Update access count
    await updateDoc(agreementRef, {
      access_count: increment(1),
      last_accessed: serverTimestamp()
    });
    
    return NextResponse.json(agreementData);
    
  } catch (error) {
    console.error('Error fetching agreement:', error);
    return NextResponse.json({ error: 'Failed to fetch agreement' }, { status: 500 });
  }
}

// PUT - Update agreement
export async function PUT(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const updates = await request.json();
    const agreementRef = doc(db, 'agreements', params.token);
    
    // Check if agreement exists
    const agreementSnap = await getDoc(agreementRef);
    if (!agreementSnap.exists()) {
      return NextResponse.json({ error: 'Agreement not found' }, { status: 404 });
    }
    
    // Update agreement
    await updateDoc(agreementRef, {
      ...updates,
      status: 'edited',
      last_modified: serverTimestamp()
    });
    
    // Log the edit in audit trail
    await addDoc(collection(db, 'agreement_logs'), {
      agreement_token: params.token,
      action: 'edited',
      timestamp: serverTimestamp(),
      ip_address: request.headers.get('x-forwarded-for') || 'unknown',
      changes: JSON.stringify(updates)
    });
    
    // Send notification
    await sendUpdateNotification(params.token, agreementSnap.data().client_name);
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error updating agreement:', error);
    return NextResponse.json({ error: 'Failed to update agreement' }, { status: 500 });
  }
}

// POST - Verify password
export async function POST(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { password, action } = await request.json();
    
    if (action === 'verify') {
      const agreementRef = doc(db, 'agreements', params.token);
      const agreementSnap = await getDoc(agreementRef);
      
      if (!agreementSnap.exists()) {
        return NextResponse.json({ error: 'Agreement not found' }, { status: 404 });
      }
      
      const data = agreementSnap.data();
      
      // Verify password
      const isValid = await bcrypt.compare(password, data.password_hash);
      
      if (!isValid) {
        // Log failed attempt
        await addDoc(collection(db, 'agreement_logs'), {
          agreement_token: params.token,
          action: 'failed_login',
          timestamp: serverTimestamp(),
          ip_address: request.headers.get('x-forwarded-for') || 'unknown'
        });
        
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
      }
      
      // Update first accessed if needed
      if (!data.first_accessed) {
        await updateDoc(agreementRef, {
          first_accessed: serverTimestamp(),
          status: 'viewed'
        });
      }
      
      // Log successful access
      await addDoc(collection(db, 'agreement_logs'), {
        agreement_token: params.token,
        action: 'accessed',
        timestamp: serverTimestamp(),
        ip_address: request.headers.get('x-forwarded-for') || 'unknown'
      });
      
      return NextResponse.json({ success: true });
    }
    
    // Handle digital signature
    if (action === 'sign') {
      const { signatureData, signerType } = await request.json();
      
      const agreementRef = doc(db, 'agreements', params.token);
      const agreementSnap = await getDoc(agreementRef);
      
      if (!agreementSnap.exists()) {
        return NextResponse.json({ error: 'Agreement not found' }, { status: 404 });
      }
      
      const updateData: any = {};
      
      if (signerType === 'client') {
        updateData.client_signature = signatureData;
        updateData.client_signed_at = serverTimestamp();
        updateData.client_ip_address = request.headers.get('x-forwarded-for') || 'unknown';
      } else if (signerType === 'giuseppe') {
        updateData.giuseppe_signature = signatureData;
        updateData.giuseppe_signed_at = serverTimestamp();
      }
      
      // Check if both parties have signed
      const currentData = agreementSnap.data();
      if (
        (signerType === 'client' && currentData.giuseppe_signature) ||
        (signerType === 'giuseppe' && currentData.client_signature)
      ) {
        updateData.status = 'completed';
        
        // Generate final signed PDF
        const signedPdfUrl = await generateSignedPDF(params.token, currentData, updateData);
        updateData.signed_pdf_url = signedPdfUrl;
      } else {
        updateData.status = 'partially_signed';
      }
      
      await updateDoc(agreementRef, updateData);
      
      // Log signing
      await addDoc(collection(db, 'agreement_logs'), {
        agreement_token: params.token,
        action: `${signerType}_signed`,
        timestamp: serverTimestamp(),
        ip_address: request.headers.get('x-forwarded-for') || 'unknown'
      });
      
      return NextResponse.json({ 
        success: true,
        status: updateData.status,
        signedPdfUrl: updateData.signed_pdf_url
      });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

// Generate signed PDF
async function generateSignedPDF(token: string, agreementData: any, signatures: any): Promise<string> {
  // This would generate a new PDF with signatures
  // For now, returning the existing PDF URL
  return agreementData.pdf_url;
}

// Send update notification
async function sendUpdateNotification(token: string, clientName: string) {
  try {
    await fetch('/api/trullo-telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'agreement_updated',
        data: {
          clientName,
          token,
          url: `https://investinpuglia.eu/agreement/${token}`,
          timestamp: new Date().toISOString()
        }
      })
    });
  } catch (error) {
    console.error('Failed to send update notification:', error);
  }
}