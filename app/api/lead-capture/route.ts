// app/api/lead-capture/route.ts
import { createClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = createClient()
    
    // Check if email already exists
    const { data: existingLead } = await supabase
      .from('leads')
      .select('id')
      .eq('email', body.email)
      .single()
    
    if (existingLead) {
      return NextResponse.json({ 
        success: true, 
        message: 'Already subscribed'
      })
    }
    
    // Insert new lead
    const { data, error } = await supabase
      .from('leads')
      .insert([{
        name: body.name,
        email: body.email,
        source: body.source || 'website',
        created_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
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
