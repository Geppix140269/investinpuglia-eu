'use client'

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Calendar, Mail, Phone, MapPin, DollarSign, Building, Clock, MessageSquare, User, TrendingUp } from 'lucide-react';

// Initialize Supabase
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  : null;

interface ConversationData {
  id: string;
  phone_number: string;
  user_name?: string;
  email?: string;
  country?: string;
  budget?: string;
  timeline?: string;
  property_type?: string;
  location?: string;
  purpose?: string;
  company_name?: string;
  industry?: string;
  grant_interest?: boolean;
  conversation_stage: string;
  messages_count: number;
  collected_data?: any;
  user_message: string;
  bot_response: string;
  timestamp: string;
}

export default function TrulloDataDashboard() {
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('all');
  const [stats, setStats] = useState({
    totalConversations: 0,
    qualifiedLeads: 0,
    averageMessages: 0,
    conversionRate: 0
  });

  useEffect(() => {
    fetchConversations();
    // Set up real-time subscription
    if (supabase) {
      const subscription = supabase
        .channel('whatsapp_conversations')
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'whatsapp_conversations' 
        }, payload => {
          console.log('Real-time update:', payload);
          fetchConversations();
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const fetchConversations = async () => {
    if (!supabase) {
      // Fallback: Load from API or local storage
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('whatsapp_conversations')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) throw error;

      setConversations(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: ConversationData[]) => {
    const uniqueUsers = new Set(data.map(c => c.phone_number));
    const qualifiedLeads = data.filter(c => 
      c.budget && c.email && c.messages_count > 5
    );
    const totalMessages = data.reduce((sum, c) => sum + c.messages_count, 0);
    
    setStats({
      totalConversations: uniqueUsers.size,
      qualifiedLeads: qualifiedLeads.length,
      averageMessages: Math.round(totalMessages / uniqueUsers.size) || 0,
      conversionRate: Math.round((qualifiedLeads.length / uniqueUsers.size) * 100) || 0
    });
  };

  const filteredConversations = conversations.filter(c => {
    const matchesSearch = searchTerm === '' || 
      c.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone_number.includes(searchTerm);
    
    const matchesStage = filterStage === 'all' || c.conversation_stage === filterStage;
    
    return matchesSearch && matchesStage;
  });

  // Group conversations by user (phone number)
  const groupedConversations = filteredConversations.reduce((groups, conv) => {
    const key = conv.phone_number;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(conv);
    return groups;
  }, {} as Record<string, ConversationData[]>);

  const getLeadScore = (conv: ConversationData) => {
    let score = 0;
    if (conv.email) score += 20;
    if (conv.budget) score += 30;
    if (conv.timeline) score += 15;
    if (conv.property_type) score += 15;
    if (conv.grant_interest) score += 20;
    return score;
  };

  const getLeadBadge = (score: number) => {
    if (score >= 80) return { color: 'bg-green-500', text: 'Hot Lead' };
    if (score >= 50) return { color: 'bg-yellow-500', text: 'Warm Lead' };
    return { color: 'bg-blue-500', text: 'Cold Lead' };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trullo WhatsApp Data Center</h1>
          <p className="text-gray-600">Comprehensive conversation data and lead intelligence</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Conversations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalConversations}</p>
              </div>
              <MessageSquare className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Qualified Leads</p>
                <p className="text-2xl font-bold text-gray-900">{stats.qualifiedLeads}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Messages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageMessages}</p>
              </div>
              <MessageSquare className="w-10 h-10 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
              </div>
              <TrendingUp className="w-10 h-10 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Stages</option>
              <option value="greeting">Greeting</option>
              <option value="personal">Personal Info</option>
              <option value="investment">Investment Details</option>
              <option value="details">Specific Details</option>
              <option value="closing">Ready to Close</option>
            </select>
          </div>
        </div>

        {/* Conversations List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">All Conversations</h2>
          </div>
          
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading conversations...</p>
            </div>
          ) : (
            <div className="divide-y">
              {Object.entries(groupedConversations).map(([phoneNumber, userConvs]) => {
                const latestConv = userConvs[0];
                const leadScore = getLeadScore(latestConv);
                const badge = getLeadBadge(leadScore);
                
                return (
                  <div
                    key={phoneNumber}
                    className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedConversation(latestConv)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {latestConv.user_name || 'Unknown User'}
                          </h3>
                          <span className={`px-2 py-1 text-xs text-white rounded-full ${badge.color}`}>
                            {badge.text} ({leadScore}%)
                          </span>
                          <span className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">
                            {latestConv.conversation_stage}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          {latestConv.email && (
                            <div className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {latestConv.email}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {phoneNumber}
                          </div>
                          {latestConv.country && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {latestConv.country}
                            </div>
                          )}
                          {latestConv.budget && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {latestConv.budget}
                            </div>
                          )}
                          {latestConv.property_type && (
                            <div className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              {latestConv.property_type}
                            </div>
                          )}
                          {latestConv.timeline && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {latestConv.timeline}
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-3 text-sm">
                          <p className="text-gray-700 font-medium">Last Message:</p>
                          <p className="text-gray-600 truncate">{latestConv.user_message}</p>
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <p className="text-sm text-gray-500">
                          {new Date(latestConv.timestamp).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {userConvs.length} messages
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Conversation Detail Modal */}
        {selectedConversation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b sticky top-0 bg-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Conversation Details
                  </h2>
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Name:</strong> {selectedConversation.user_name || 'Not provided'}</p>
                      <p><strong>Email:</strong> {selectedConversation.email || 'Not provided'}</p>
                      <p><strong>Phone:</strong> {selectedConversation.phone_number}</p>
                      <p><strong>Country:</strong> {selectedConversation.country || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Investment Details</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Budget:</strong> {selectedConversation.budget || 'Not provided'}</p>
                      <p><strong>Timeline:</strong> {selectedConversation.timeline || 'Not provided'}</p>
                      <p><strong>Property Type:</strong> {selectedConversation.property_type || 'Not provided'}</p>
                      <p><strong>Location:</strong> {selectedConversation.location || 'Not provided'}</p>
                      <p><strong>Purpose:</strong> {selectedConversation.purpose || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
                
                {selectedConversation.company_name && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Business Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Company:</strong> {selectedConversation.company_name}</p>
                      <p><strong>Industry:</strong> {selectedConversation.industry || 'Not provided'}</p>
                      <p><strong>Grant Interest:</strong> {selectedConversation.grant_interest ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Last Exchange</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-3">
                    <p className="text-sm text-gray-600 mb-2">User Message:</p>
                    <p className="text-gray-900">{selectedConversation.user_message}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Trullo Response:</p>
                    <p className="text-gray-900">{selectedConversation.bot_response}</p>
                  </div>
                </div>
                
                {selectedConversation.collected_data && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">All Collected Data</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                        {JSON.stringify(selectedConversation.collected_data, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
                
                <div className="mt-6 flex gap-3">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Contact via WhatsApp
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Send Email
                  </button>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    Schedule Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}