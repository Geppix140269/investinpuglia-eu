// File: app/api/trullo-conversation/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Handle POST requests (start conversation)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, sessionId, language } = body;

    if (action === 'start') {
      // Generate a unique conversation ID
      const conversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      console.log('[Trullo] Starting conversation:', { 
        conversationId, 
        sessionId, 
        language,
        timestamp: new Date().toISOString()
      });
      
      // TODO: Save to database if needed
      // Example with Supabase:
      /*
      const { data, error } = await supabase
        .from('trullo_conversations')
        .insert({
          id: conversationId,
          session_id: sessionId,
          language: language,
          started_at: new Date(),
          status: 'active'
        });
      */
      
      return NextResponse.json({ 
        success: true, 
        conversationId 
      });
    }

    return NextResponse.json({ 
      success: false, 
      error: 'Invalid action' 
    }, { status: 400 });
    
  } catch (error) {
    console.error('[Trullo] Conversation POST error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

// Handle PUT requests (log messages or end conversation)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, conversationId, role, content } = body;

    if (action === 'log') {
      // Log the message
      console.log('[Trullo] Message logged:', { 
        conversationId, 
        role, 
        preview: content?.substring(0, 50) + '...',
        timestamp: new Date().toISOString()
      });
      
      // TODO: Save message to database
      /*
      const { data, error } = await supabase
        .from('trullo_messages')
        .insert({
          conversation_id: conversationId,
          role: role,
          content: content,
          created_at: new Date()
        });
      */
      
      return NextResponse.json({ success: true });
    }

    if (action === 'end') {
      // End the conversation
      console.log('[Trullo] Ending conversation:', conversationId);
      
      // TODO: Update conversation status in database
      /*
      const { data, error } = await supabase
        .from('trullo_conversations')
        .update({ 
          status: 'ended',
          ended_at: new Date()
        })
        .eq('id', conversationId);
      */
      
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ 
      success: false, 
      error: 'Invalid action' 
    }, { status: 400 });
    
  } catch (error) {
    console.error('[Trullo] Conversation PUT error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

// Optional: Handle GET requests (for debugging)
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    status: 'ok',
    endpoint: '/api/trullo-conversation',
    message: 'Trullo conversation API is running'
  });
}
