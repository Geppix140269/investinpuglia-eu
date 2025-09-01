// app/api/trullo-conversation/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');
    
    if (!conversationId) {
      return NextResponse.json(
        { error: 'Conversation ID is required' },
        { status: 400 }
      );
    }

    // Get messages for this conversation from Firebase
    const messagesQuery = query(
      collection(db, 'trullo_messages'),
      where('conversation_id', '==', conversationId),
      orderBy('timestamp', 'asc')
    );
    
    const messagesSnapshot = await getDocs(messagesQuery);
    const messages = messagesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ 
      success: true, 
      messages 
    });
  } catch (error) {
    console.error('Failed to fetch conversation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversation' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, ...data } = await request.json();

    switch (action) {
      case 'getRecentConversations': {
        // Get recent conversations from Firebase
        const conversationsQuery = query(
          collection(db, 'trullo_conversations'),
          orderBy('started_at', 'desc'),
          limit(10)
        );
        
        const conversationsSnapshot = await getDocs(conversationsQuery);
        const conversations = conversationsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        return NextResponse.json({ 
          success: true, 
          conversations 
        });
      }

      case 'getConversationStats': {
        // Get conversation statistics
        const conversationsSnapshot = await getDocs(collection(db, 'trullo_conversations'));
        const total = conversationsSnapshot.size;
        
        const activeQuery = query(
          collection(db, 'trullo_conversations'),
          where('ended_at', '==', null)
        );
        const activeSnapshot = await getDocs(activeQuery);
        const active = activeSnapshot.size;

        // Get language distribution
        const languages: Record<string, number> = {};
        conversationsSnapshot.docs.forEach(doc => {
          const lang = doc.data().language || 'en';
          languages[lang] = (languages[lang] || 0) + 1;
        });

        return NextResponse.json({ 
          success: true, 
          stats: {
            total,
            active,
            languages
          }
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Conversation API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}