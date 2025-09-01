// app/api/trullo-log/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

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
        
        // Get user IP
        const userIp = request.headers.get('x-forwarded-for') || 'unknown';
        
        // Insert conversation into Firebase
        const conversationData = {
          session_id: sessionId,
          language,
          user_ip: userIp,
          user_agent: userAgent,
          started_at: serverTimestamp(),
          ended_at: null
        };
        
        const docRef = await addDoc(collection(db, 'trullo_conversations'), conversationData);
        const conversationId = docRef.id;
        
        // NOTIFY TELEGRAM about new session
        await notifyTelegram('new_session', {
          id: conversationId,
          ...conversationData,
          language,
          user_ip: userIp
        });
        
        // Check for multiple active sessions
        const activeSessionsQuery = query(
          collection(db, 'trullo_conversations'),
          where('ended_at', '==', null)
        );
        const activeSessionsSnapshot = await getDocs(activeSessionsQuery);
        const count = activeSessionsSnapshot.size;
        
        if (count > 1) {
          const languages = [...new Set(
            activeSessionsSnapshot.docs.map(doc => doc.data().language?.toUpperCase() || 'EN')
          )];
          
          await notifyTelegram('multiple_sessions', {
            count,
            languages
          });
        }
        
        return NextResponse.json({ success: true, conversationId });
      }

      case 'logMessage': {
        const { conversationId, role, content } = data;
        
        // Add message to Firebase
        await addDoc(collection(db, 'trullo_messages'), {
          conversation_id: conversationId,
          role,
          content,
          timestamp: serverTimestamp()
        });
        
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
        
        // Update conversation in Firebase
        const conversationRef = doc(db, 'trullo_conversations', conversationId);
        await updateDoc(conversationRef, {
          ended_at: serverTimestamp()
        });
        
        return NextResponse.json({ success: true });
      }

      case 'saveContactRequest': {
        const { conversationId, name, email, phone, message, language } = data;
        
        // Save contact request to Firebase
        const contactData = {
          conversation_id: conversationId,
          name,
          email,
          phone,
          message,
          language,
          status: 'new',
          created_at: serverTimestamp()
        };
        
        const docRef = await addDoc(collection(db, 'trullo_contact_requests'), contactData);
        
        // NOTIFY TELEGRAM about new contact
        await notifyTelegram('new_contact', {
          name,
          email,
          phone,
          message,
          language
        });
        
        return NextResponse.json({ 
          success: true, 
          contactId: docRef.id 
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Trullo log error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}