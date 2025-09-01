// app/api/lead-capture/route.ts
// import { createClient } from '@/lib/supabase' // Removed - using Firebase instead
import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Check if email already exists in Firebase
    const leadsRef = collection(db, 'leads')
    const q = query(leadsRef, where('email', '==', body.email))
    const querySnapshot = await getDocs(q)
    const existingLead = !querySnapshot.empty ? querySnapshot.docs[0] : null
    
    if (existingLead) {
      return NextResponse.json({ 
        success: true, 
        message: 'Already subscribed'
      })
    }
    
    // Insert new lead using Firebase
    let data;
    try {
      const docRef = await addDoc(collection(db, 'leads'), {
        name: body.name,
        email: body.email,
        source: body.source || 'website',
        created_at: new Date().toISOString()
      })
      
      data = {
        id: docRef.id,
        name: body.name,
        email: body.email
      }
    } catch (error) {
      console.error('Firebase error:', error)
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 400 }
      )
    }
    
    // Send welcome email
    try {
      // EmailJS or other email service implementation
      console.log('Sending welcome email to:', body.email)
      
      // If this is from exit intent popup, trigger PDF download
      if (body.source === 'exit_intent_mini_pia_guide') {
        // Email with PDF link
      }
      
    } catch (emailError) {
      console.error('Email error:', emailError)
    }
    
    return NextResponse.json({ 
      success: true, 
      data,
      message: 'Successfully subscribed'
    })
    
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
