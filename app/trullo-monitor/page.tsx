// PATH: app/trullo-monitor/page.tsx
'use client'
import { useEffect, useState, useRef } from 'react';
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

interface ContactRequest {
  id: string;
  conversation_id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  language: string;
  status: string;
  created_at: string;
}

export default function TrulloMonitor() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts'>('chats');
  const [isLoading, setIsLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    // Create audio element with multiple sources for better compatibility
    audioRef.current = new Audio();
    audioRef.current.innerHTML = `
      <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGD0fPTgjMGHm7A7+OZURE" type="audio/wav">
      <source src="/notification.mp3" type="audio/mpeg">
    `;
  }, []);

  const playNotificationSound = () => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log('Could not play sound:', err);
      });
    }
  };

  useEffect(() => {
    // Load initial data
    loadConversations();
    loadContactRequests();

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

    const contactsSubscription = supabase
      .channel('trullo-contacts')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'trullo_contact_requests'
      }, handleContactUpdate)
      .subscribe();

    return () => {
      messagesSubscription.unsubscribe();
      conversationsSubscription.unsubscribe();
      contactsSubscription.unsubscribe();
    };
  }, []);

  const loadConversations = async () => {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const { data: convos, error } = await supabase
        .from('trullo_conversations')
        .select('*')
        .gte('started_at', yesterday.toISOString())
        .order('started_at', { ascending: false });

      if (error) throw error;

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

  const loadContactRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('trullo_contact_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setContactRequests(data || []);
    } catch (error) {
      console.error('Error loading contact requests:', error);
    }
  };

  const handleNewMessage = async (payload: any) => {
    const newMessage = payload.new as Message;
    
    playNotificationSound();

    setConversations(prev => prev.map(conv => {
      if (conv.id === newMessage.conversation_id) {
        return {
          ...conv,
          messages: [...(conv.messages || []), newMessage]
        };
      }
      return conv;
    }));

    // Enhanced push notification
    if (Notification.permission === 'granted') {
      const notification = new Notification('New Trullo Message', {
        body: newMessage.role === 'user' 
          ? `User: ${newMessage.content.substring(0, 100)}...` 
          : 'Trullo responded',
        icon: '/Trullo.png',
        badge: '/Trullo.png',
        tag: 'trullo-message',
        renotify: true,
        vibrate: [200, 100, 200]
      });

      notification.onclick = () => {
        window.focus();
        setSelectedConversation(newMessage.conversation_id);
        setActiveTab('chats');
      };
    }
  };

  const handleNewConversation = (payload: any) => {
    const newConvo = payload.new as Conversation;
    setConversations(prev => [{ ...newConvo, messages: [] }, ...prev]);
    
    playNotificationSound();
    
    if (Notification.permission === 'granted') {
      new Notification('New Chat Started', {
        body: `Language: ${newConvo.language.toUpperCase()}`,
        icon: '/Trullo.png',
        tag: 'trullo-new-chat'
      });
    }
  };

  const handleContactUpdate = async (payload: any) => {
    if (payload.eventType === 'INSERT') {
      const newContact = payload.new as ContactRequest;
      setContactRequests(prev => [newContact, ...prev]);
      
      playNotificationSound();
      
      if (Notification.permission === 'granted') {
        const notification = new Notification('🎯 New Contact Request!', {
          body: `${newContact.name} - ${newContact.email}`,
          icon: '/Trullo.png',
          badge: '/Trullo.png',
          tag: 'trullo-contact',
          renotify: true,
          requireInteraction: true,
          vibrate: [300, 200, 300]
        });

        notification.onclick = () => {
          window.focus();
          setActiveTab('contacts');
        };
      }
    } else {
      // Reload contacts on update
      loadContactRequests();
    }
  };

  const updateContactStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('trullo_contact_requests')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification('Notifications Enabled!', {
          body: 'You will receive alerts for new messages and contacts',
          icon: '/Trullo.png'
        });
      }
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Trullo Real-time Monitor</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg ${soundEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>
            <button
              onClick={requestNotificationPermission}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Enable Notifications
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('chats')}
            className={`px-6 py-2 rounded-lg font-medium ${
              activeTab === 'chats' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Live Chats ({conversations.length})
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-6 py-2 rounded-lg font-medium ${
              activeTab === 'contacts' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Contact Requests ({contactRequests.filter(c => c.status === 'new').length})
          </button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading data...</p>
          </div>
        ) : activeTab === 'chats' ? (
          // Chats View
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        ) : (
          // Contact Requests View
          <div className="space-y-4">
            {contactRequests.length === 0 ? (
              <p className="text-gray-500">No contact requests yet</p>
            ) : (
              contactRequests.map(contact => (
                <div key={contact.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{contact.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          contact.status === 'new' 
                            ? 'bg-red-100 text-red-700'
                            : contact.status === 'responded'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {contact.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {contact.language.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">📧 {contact.email}</p>
                      {contact.phone && (
                        <p className="text-sm text-gray-600 mb-3">📱 {contact.phone}</p>
                      )}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-800">{contact.message}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Received: {new Date(contact.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="ml-4 space-y-2">
                      <select
                        value={contact.status}
                        onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="responded">Responded</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Stats Bar */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-2xl font-bold text-purple-600">{conversations.length}</p>
            <p className="text-sm text-gray-600">Total Chats</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-2xl font-bold text-green-600">
              {conversations.filter(c => c.messages && c.messages.length > 0).length}
            </p>
            <p className="text-sm text-gray-600">Active Chats</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-2xl font-bold text-red-600">
              {contactRequests.filter(c => c.status === 'new').length}
            </p>
            <p className="text-sm text-gray-600">New Contacts</p>
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
            <p className="text-sm text-gray-600">Languages</p>
          </div>
        </div>
      </div>
    </div>
  );
}
