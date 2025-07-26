// PATH: app/trullo-monitor/page.tsx
'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Message {
  id: string;
  conversation_id: string;
  role: string;
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  session_id: string;
  language: string;
  started_at: string;
  messages?: Message[];
}

export default function TrulloMonitor() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load initial data
    loadConversations();

    // Subscribe to real-time updates
    const messagesSubscription = supabase
      .channel('trullo-messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'trullo_messages'
      }, handleNewMessage)
      .subscribe();

    const conversationsSubscription = supabase
      .channel('trullo-conversations')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'trullo_conversations'
      }, handleNewConversation)
      .subscribe();

    return () => {
      messagesSubscription.unsubscribe();
      conversationsSubscription.unsubscribe();
    };
  }, []);

  const loadConversations = async () => {
    try {
      // Get conversations from last 24 hours
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const { data: convos, error } = await supabase
        .from('trullo_conversations')
        .select('*')
        .gte('started_at', yesterday.toISOString())
        .order('started_at', { ascending: false });

      if (error) throw error;

      // Load messages for each conversation
      const conversationsWithMessages = await Promise.all(
        (convos || []).map(async (conv) => {
          const { data: messages } = await supabase
            .from('trullo_messages')
            .select('*')
            .eq('conversation_id', conv.id)
            .order('timestamp', { ascending: true });

          return { ...conv, messages: messages || [] };
        })
      );

      setConversations(conversationsWithMessages);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading conversations:', error);
      setIsLoading(false);
    }
  };

  const handleNewMessage = async (payload: any) => {
    const newMessage = payload.new as Message;
    
    // Play notification sound
    const audio = new Audio('/notification.mp3');
    audio.play().catch(() => {});

    // Update conversation with new message
    setConversations(prev => prev.map(conv => {
      if (conv.id === newMessage.conversation_id) {
        return {
          ...conv,
          messages: [...(conv.messages || []), newMessage]
        };
      }
      return conv;
    }));

    // Show browser notification if permitted
    if (Notification.permission === 'granted') {
      new Notification('New Trullo Message', {
        body: newMessage.role === 'user' ? newMessage.content.substring(0, 100) : 'Trullo responded',
        icon: '/Trullo.png'
      });
    }
  };

  const handleNewConversation = (payload: any) => {
    const newConvo = payload.new as Conversation;
    setConversations(prev => [{ ...newConvo, messages: [] }, ...prev]);
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Trullo Real-time Monitor</h1>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading conversations...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="md:col-span-1 space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Active Chats (24h)</h2>
              {conversations.length === 0 ? (
                <p className="text-gray-500">No conversations yet</p>
              ) : (
                conversations.map(conv => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`p-4 bg-white rounded-lg shadow cursor-pointer transition-all ${
                      selectedConversation === conv.id ? 'ring-2 ring-purple-600' : 'hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800">
                          {new Date(conv.started_at).toLocaleTimeString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Language: {conv.language.toUpperCase()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {conv.messages?.length || 0} messages
                        </p>
                      </div>
                      {conv.messages && conv.messages.length > 0 && (
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Messages View */}
            <div className="md:col-span-2">
              {selectedConversation ? (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">Conversation</h2>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {conversations
                      .find(c => c.id === selectedConversation)
                      ?.messages?.map(msg => (
                        <div
                          key={msg.id}
                          className={`p-3 rounded-lg ${
                            msg.role === 'user'
                              ? 'bg-purple-100 ml-8'
                              : 'bg-gray-100 mr-8'
                          }`}
                        >
                          <p className="text-xs font-medium text-gray-600 mb-1">
                            {msg.role === 'user' ? 'User' : 'Trullo'}
                          </p>
                          <p className="text-sm text-gray-800">{msg.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <p className="text-gray-500">Select a conversation to view messages</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stats Bar */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-2xl font-bold text-purple-600">{conversations.length}</p>
            <p className="text-sm text-gray-600">Total Chats (24h)</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-2xl font-bold text-green-600">
              {conversations.filter(c => c.messages && c.messages.length > 0).length}
            </p>
            <p className="text-sm text-gray-600">Active Chats</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-2xl font-bold text-blue-600">
              {conversations.reduce((acc, c) => acc + (c.messages?.length || 0), 0)}
            </p>
            <p className="text-sm text-gray-600">Total Messages</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-2xl font-bold text-orange-600">
              {[...new Set(conversations.map(c => c.language))].length}
            </p>
            <p className="text-sm text-gray-600">Languages Used</p>
          </div>
        </div>
      </div>
    </div>
  );
}
