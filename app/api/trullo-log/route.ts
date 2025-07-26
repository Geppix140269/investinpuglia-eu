// PATH: app/api/trullo-log/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for server-side operations
);

export async function POST(request: NextRequest) {
  try {
    const { action, ...data } = await request.json();

    switch (action) {
      case 'startConversation': {
        const { sessionId, language, userAgent } = data;
        
        // Get user IP (in production, you might use headers['x-forwarded-for'])
        const userIp = request.headers.get('x-forwarded-for') || 'unknown';
        
        const { data: conversation, error } = await supabase
          .from('trullo_conversations')
          .insert({
            session_id: sessionId,
            language,
            user_ip: userIp,
            user_agent: userAgent
          })
          .select()
          .single();

        if (error) throw error;
        
        return NextResponse.json({ success: true, conversationId: conversation.id });
      }

      case 'logMessage': {
        const { conversationId, role, content } = data;
        
        const { error } = await supabase
          .from('trullo_messages')
          .insert({
            conversation_id: conversationId,
            role,
            content
          });

        if (error) throw error;
        
        return NextResponse.json({ success: true });
      }

      case 'endConversation': {
        const { conversationId } = data;
        
        const { error } = await supabase
          .from('trullo_conversations')
          .update({ ended_at: new Date().toISOString() })
          .eq('id', conversationId);

        if (error) throw error;
        
        return NextResponse.json({ success: true });
      }

      case 'saveContactRequest': {
        const { conversationId, name, email, phone, message, language } = data;
        
        const { data: contactRequest, error } = await supabase
          .from('trullo_contact_requests')
          .insert({
            conversation_id: conversationId,
            name,
            email,
            phone,
            message,
            language
          })
          .select()
          .single();

        if (error) throw error;
        
        return NextResponse.json({ success: true, contactRequestId: contactRequest.id });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Trullo logging error:', error);
    return NextResponse.json(
      { error: 'Failed to log data', details: error },
      { status: 500 }
    );
  }
}
