'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { Phone, Mail, Calendar, TrendingUp, MessageCircle, DollarSign, Clock, Tag } from 'lucide-react';

interface Lead {
  id: string;
  phone_number: string;
  whatsapp_name: string;
  name?: string;
  email?: string;
  company?: string;
  language: string;
  lead_score: number;
  budget_range?: string;
  timeline?: string;
  property_type?: string;
  interests: string[];
  message_count: number;
  last_interaction: string;
  status: 'hot' | 'warm' | 'cold';
  tags: string[];
  created_at: string;
  total_interactions: number;
  notes?: string[];
}

export default function WhatsAppLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<'all' | 'hot' | 'warm' | 'cold'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    // Real-time listener for leads
    const q = query(collection(db, 'whatsapp_leads'), orderBy('lead_score', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData: Lead[] = [];
      snapshot.forEach((doc) => {
        leadsData.push({ id: doc.id, ...doc.data() } as Lead);
      });
      setLeads(leadsData);
    });

    return () => unsubscribe();
  }, []);

  const filteredLeads = filter === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === filter);

  const getScoreColor = (score: number) => {
    if (score >= 60) return 'text-red-600 bg-red-50';
    if (score >= 30) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  const addNote = async (leadId: string, note: string) => {
    const leadRef = doc(db, 'whatsapp_leads', leadId);
    const lead = leads.find(l => l.id === leadId);
    await updateDoc(leadRef, {
      notes: [...(lead?.notes || []), {
        text: note,
        timestamp: new Date().toISOString(),
        author: 'Admin'
      }]
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">WhatsApp Leads Dashboard</h1>
        <p className="text-gray-600">Real-time lead tracking from WhatsApp conversations</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold">{leads.length}</p>
            </div>
            <MessageCircle className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hot Leads</p>
              <p className="text-2xl font-bold text-red-600">
                {leads.filter(l => l.status === 'hot').length}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Score</p>
              <p className="text-2xl font-bold">
                {leads.length > 0 
                  ? Math.round(leads.reduce((acc, l) => acc + l.lead_score, 0) / leads.length)
                  : 0}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Leads</p>
              <p className="text-2xl font-bold">
                {leads.filter(l => {
                  const today = new Date().toDateString();
                  return new Date(l.created_at).toDateString() === today;
                }).length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-4 mb-6">
        {(['all', 'hot', 'warm', 'cold'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== 'all' && (
              <span className="ml-2">
                ({leads.filter(l => l.status === status).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lead Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Investment Profile
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Engagement
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {lead.name || lead.whatsapp_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      <Phone className="inline h-3 w-3 mr-1" />
                      {lead.phone_number}
                    </div>
                    {lead.email && (
                      <div className="text-sm text-gray-500">
                        <Mail className="inline h-3 w-3 mr-1" />
                        {lead.email}
                      </div>
                    )}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(lead.lead_score)}`}>
                    {lead.lead_score}/100
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="text-sm">
                    {lead.budget_range && (
                      <div><DollarSign className="inline h-3 w-3" /> {lead.budget_range}</div>
                    )}
                    {lead.timeline && (
                      <div><Clock className="inline h-3 w-3" /> {lead.timeline}</div>
                    )}
                    {lead.property_type && (
                      <div className="text-gray-600">{lead.property_type}</div>
                    )}
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div>{lead.message_count} messages</div>
                    <div className="text-gray-500">
                      Last: {new Date(lead.last_interaction).toLocaleDateString()}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {lead.interests.slice(0, 2).map((interest, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <a
                      href={`https://wa.me/${lead.phone_number.replace('+', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-900"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </a>
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">Lead Details</h2>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <p>Name: {selectedLead.name || selectedLead.whatsapp_name}</p>
                  <p>Phone: {selectedLead.phone_number}</p>
                  <p>Email: {selectedLead.email || 'Not captured'}</p>
                  <p>Company: {selectedLead.company || 'Not identified'}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Lead Score: {selectedLead.lead_score}/100</h3>
                  <div className="bg-gray-200 rounded-full h-4 mb-2">
                    <div 
                      className={`h-4 rounded-full ${
                        selectedLead.lead_score >= 60 ? 'bg-red-500' :
                        selectedLead.lead_score >= 30 ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}
                      style={{ width: `${selectedLead.lead_score}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Investment Profile</h3>
                  <p>Budget: {selectedLead.budget_range || 'Not specified'}</p>
                  <p>Timeline: {selectedLead.timeline || 'Not specified'}</p>
                  <p>Property Type: {selectedLead.property_type || 'Not specified'}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Interests & Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {[...selectedLead.interests, ...selectedLead.tags].map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Actions</h3>
                  <div className="flex space-x-4">
                    <a
                      href={`https://wa.me/${selectedLead.phone_number.replace('+', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Message on WhatsApp
                    </a>
                    {selectedLead.email && (
                      <a
                        href={`mailto:${selectedLead.email}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Send Email
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}