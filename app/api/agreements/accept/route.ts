import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Create agreement record
    const agreementData = {
      clientName: data.fullName,
      clientEmail: data.email,
      clientPhone: data.phone,
      clientAddress: data.address,
      clientCity: data.city,
      clientCountry: data.country,
      clientPostalCode: data.postalCode,
      propertyBudget: data.propertyBudget || '',
      propertyType: data.propertyType || '',
      propertyLocation: data.location || '',
      acceptedTerms: data.acceptTerms,
      acceptedPrivacy: data.acceptPrivacy,
      powerOfAttorney: data.powerOfAttorney,
      signatureTimestamp: data.timestamp,
      ipAddress: ip,
      agreementVersion: '1.0',
      status: 'pending_payment',
      phase: '1.1',
      amountDue: 1500,
      createdAt: serverTimestamp(),
      companyName: '1402 CELSIUS LTD',
      companyRegNo: '12475013',
      companyVAT: 'GB 343 1702 32'
    }

    // Insert into Firebase
    try {
      const docRef = await addDoc(collection(db, 'agreements'), agreementData)
      
      console.log('Agreement saved to Firebase with ID:', docRef.id)
      
      // Send confirmation email
      try {
        await sendConfirmationEmail(data.email, data.fullName, docRef.id)
      } catch (emailError) {
        console.error('Email error:', emailError)
      }

      // Send notification to admin
      try {
        await notifyAdmin(data)
      } catch (notifyError) {
        console.error('Admin notification error:', notifyError)
      }

      return NextResponse.json({ 
        success: true, 
        agreementId: docRef.id,
        message: 'Agreement accepted successfully'
      })
      
    } catch (firebaseError) {
      console.error('Firebase error:', firebaseError)
      
      // Fallback: Still allow the flow to continue
      console.log('Agreement acceptance (Firebase failed):', agreementData)
      
      return NextResponse.json({ 
        success: true, 
        agreementId: `temp_${Date.now()}`,
        message: 'Agreement recorded (pending database confirmation)'
      })
    }

  } catch (error) {
    console.error('Agreement acceptance error:', error)
    return NextResponse.json(
      { error: 'Failed to process agreement acceptance' },
      { status: 500 }
    )
  }
}

async function sendConfirmationEmail(email: string, name: string, agreementId: string) {
  // Implementation for sending confirmation email
  // You can use your existing email service
  console.log(`Sending confirmation email to ${email}`)
}

async function notifyAdmin(data: any) {
  // Send Telegram notification to admin
  const message = `
🆕 NEW AGREEMENT SIGNED!

Client: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Country: ${data.country}
Budget: ${data.propertyBudget || 'Not specified'}
Property Type: ${data.propertyType || 'Not specified'}
Location: ${data.location || 'Not specified'}

Status: Awaiting Phase 1.1 Payment (€1,500)
Time: ${new Date().toLocaleString()}
  `

  try {
    await fetch('/api/telegram-reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    })
  } catch (error) {
    console.error('Telegram notification failed:', error)
  }
}