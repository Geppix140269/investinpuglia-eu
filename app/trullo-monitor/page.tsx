// app/trullo-monitor/page.tsx
'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TrulloMonitor() {
  const [stats, setStats] = useState({
    totalChats: 0,
    activeChats: 0,
    totalMessages: 0,
    newContacts: 0
  });
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data every 5 seconds
  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  async function loadData() {
    try {
      // Get conversations from last 24 hours
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      // Load conversations
      const { data: conversations } = await supabase
        .from('trullo_conversations')
        .select('*')
        .gte('started_at', yesterday.toISOString())
        .order('started_at', { ascending: false });

      // Load recent messages
      const { data: messages } = await supabase
        .from('trullo_messages')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(10);

      // Load contact requests
      const { data: contactRequests } = await supabase
        .from('trullo_contact_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      // Update stats
      setStats({
        totalChats: conversations?.length || 0,
        activeChats: conversations?.filter((c: any) => {
          const hourAgo = new Date();
          hourAgo.setHours(hourAgo.getHours() - 1);
          return new Date(c.started_at) > hourAgo;
        }).length || 0,
        totalMessages: messages?.length || 0,
        newContacts: contactRequests?.filter((c: any) => c.status === 'new').length || 0
      });

      setRecentMessages(messages || []);
      setContacts(contactRequests || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading monitor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Trullo Monitor</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-3xl font-bold text-purple-600">{stats.totalChats}</p>
            <p className="text-gray-600">Total Chats (24h)</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-3xl font-bold text-green-600">{stats.activeChats}</p>
            <p className="text-gray-600">Active (1h)</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-3xl font-bold text-blue-600">{stats.totalMessages}</p>
            <p className="text-gray-600">Recent Messages</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-3xl font-bold text-red-600">{stats.newContacts}</p>
            <p className="text-gray-600">New Contacts</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Messages */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Messages</h2>
            <div className="space-y-3">
              {recentMessages.length === 0 ? (
                <p className="text-gray-500">No messages yet</p>
              ) : (
                recentMessages.map((msg: any) => (
                  <div key={msg.id} className="border-b pb-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">
                        {msg.role === 'user' ? '👤 User' : '🤖 Trullo'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                      {msg.content.substring(0, 100)}...
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Contact Requests */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Requests</h2>
            <div className="space-y-3">
              {contacts.length === 0 ? (
                <p className="text-gray-500">No contacts yet</p>
              ) : (
                contacts.map((contact: any) => (
                  <div key={contact.id} className="border-b pb-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">{contact.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        contact.status === 'new' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {contact.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{contact.email}</p>
                    <p className="text-sm text-gray-700 mt-1">
                      {contact.message.substring(0, 80)}...
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
