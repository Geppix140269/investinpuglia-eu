// PATH: app/api/trullo-log/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for server-side operations
);

// Function to notify Telegram
async function notifyTelegram(type: string, data: any) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/trullo-telegram`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, data })
    });
  } catch (error) {
    console.error('Failed to notify Telegram:', error);
  }
}

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
            user_agent: userAgent,
            started_at: new Date().toISOString()
          })
          .select()
          .single();

        if (error) throw error;
        
        // NOTIFY TELEGRAM about new session
        await notifyTelegram('new_session', {
          ...conversation,
          language,
          user_ip: userIp
        });
        
        // Check for multiple sessions
        const { count } = await supabase
          .from('trullo_conversations')
          .select('*', { count: 'exact', head: true })
          .is('ended_at', null);
          
        if (count && count > 1) {
          const { data: activeSessions } = await supabase
            .from('trullo_conversations')
            .select('language')
            .is('ended_at', null);
            
          await notifyTelegram('multiple_sessions', {
            count,
            languages: [...new Set(activeSessions?.map(s => s.language.toUpperCase()) || [])]
          });
        }
        
        return NextResponse.json({ success: true, conversationId: conversation.id });
      }

      case 'logMessage': {
        const { conversationId, role, content } = data;
        
        const { error } = await supabase
          .from('trullo_messages')
          .insert({
            conversation_id: conversationId,
            role,
            content,
            timestamp: new Date().toISOString()
          });

        if (error) throw error;
        
        // Check for important keywords
        const keywords = ['investment', 'grant', 'property', 'masseria', 'trulli', 'urgent', 'buy', 'million', 'help'];
        const foundKeywords = keywords.filter(keyword => 
          content.toLowerCase().includes(keyword)
        );
        
        if (foundKeywords.length > 0 && role === 'user') {
          await notifyTelegram('keyword_alert', {
            keywords: foundKeywords,
            message: content,
            role,
            conversationId
          });
        }
        
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
            language,
            status: 'new',
            created_at: new Date().toISOString()
          })
          .select()
          .single();

        if (error) throw error;
        
        // NOTIFY TELEGRAM about new contact
        await notifyTelegram('new_contact', {
          name,
          email,
          phone,
          message,
          language
        });
        
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
