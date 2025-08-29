'use client';

import { useState, useEffect } from 'react';
import { 
  Save, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  User,
  Edit2,
  Search,
  Filter
} from 'lucide-react';

interface Contact {
  id: string;
  email: string;
  name: string;
  extractedName?: string;
  confidence?: 'high' | 'medium' | 'low' | 'none';
  isReviewed?: boolean;
  lastModified?: Date;
}

export default function ReviewNamesPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'uncertain' | 'no-name' | 'reviewed'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    withNames: 0,
    withoutNames: 0,
    reviewed: 0,
    uncertain: 0
  });

  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchTerm, filterType]);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/mailing-list');
      const data = await response.json();
      
      if (response.ok && data.investors) {
        const contactList = data.investors.map((inv: any) => ({
          id: inv.id,
          email: inv.email,
          name: inv.name || '',
          extractedName: extractNameFromEmail(inv.email),
          confidence: getNameConfidence(inv.name || extractNameFromEmail(inv.email)),
          isReviewed: inv.isReviewed || false
        }));
        
        setContacts(contactList);
        updateStats(contactList);
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const extractNameFromEmail = (email: string): string => {
    const localPart = email.split('@')[0];
    
    // Remove common prefixes/suffixes
    let cleanName = localPart
      .replace(/^(info|admin|contact|hello|hi|support|sales|welcome|newsletter|no-reply|noreply)/i, '')
      .replace(/\d+/g, '') // Remove numbers
      .replace(/[._-]/g, ' ') // Replace separators with spaces
      .trim();
    
    // Capitalize first letter of each word
    if (cleanName) {
      return cleanName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
    
    return '';
  };

  const getNameConfidence = (name: string): 'high' | 'medium' | 'low' | 'none' => {
    if (!name) return 'none';
    
    // High confidence: Looks like a real name
    if (/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(name)) return 'high';
    if (/^[A-Z][a-z]+$/.test(name) && name.length > 2) return 'high';
    
    // Medium confidence: Could be a name
    if (/^[A-Za-z]+ [A-Za-z]+$/.test(name)) return 'medium';
    if (/^[A-Za-z]+$/.test(name) && name.length > 2) return 'medium';
    
    // Low confidence: Uncertain
    if (name.length > 1) return 'low';
    
    return 'none';
  };

  const filterContacts = () => {
    let filtered = [...contacts];
    
    // Apply filter type
    switch (filterType) {
      case 'uncertain':
        filtered = filtered.filter(c => c.confidence === 'low' || c.confidence === 'medium');
        break;
      case 'no-name':
        filtered = filtered.filter(c => !c.name || c.confidence === 'none');
        break;
      case 'reviewed':
        filtered = filtered.filter(c => c.isReviewed);
        break;
    }
    
    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredContacts(filtered);
  };

  const updateStats = (contactList: Contact[]) => {
    setStats({
      total: contactList.length,
      withNames: contactList.filter(c => c.name && c.confidence !== 'none').length,
      withoutNames: contactList.filter(c => !c.name || c.confidence === 'none').length,
      reviewed: contactList.filter(c => c.isReviewed).length,
      uncertain: contactList.filter(c => c.confidence === 'low' || c.confidence === 'medium').length
    });
  };

  const startEditing = (contact: Contact) => {
    setEditingId(contact.id);
    setEditValue(contact.name || contact.extractedName || '');
  };

  const saveEdit = async (contact: Contact) => {
    const updatedContact = {
      ...contact,
      name: editValue || 'Friend',
      isReviewed: true,
      confidence: getNameConfidence(editValue)
    };
    
    // Update locally
    const updatedContacts = contacts.map(c => 
      c.id === contact.id ? updatedContact : c
    );
    setContacts(updatedContacts);
    updateStats(updatedContacts);
    
    // Save to backend
    try {
      await fetch(`/api/mailing-list/${contact.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: editValue || 'Friend',
          isReviewed: true 
        })
      });
    } catch (error) {
      console.error('Error saving name:', error);
    }
    
    setEditingId(null);
    setEditValue('');
  };

  const applyFriendToAll = async (type: 'no-name' | 'uncertain') => {
    const message = type === 'no-name' 
      ? 'This will set "Friend" for all contacts without names. Continue?'
      : 'This will set "Friend" for all uncertain names. Continue?';
    
    if (!confirm(message)) return;
    
    setSaving(true);
    
    try {
      // Use the new batch update endpoint
      const response = await fetch('/api/mailing-list/batch-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type, 
          fallbackName: 'Friend' 
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Reload contacts to reflect changes
        await loadContacts();
        console.log(`Updated ${result.updated} contacts to "${result.fallbackName}"`);
      } else {
        console.error('Batch update failed:', result.error);
        alert('Failed to update contacts. Please try again.');
      }
    } catch (error) {
      console.error('Error batch updating names:', error);
      alert('Failed to update contacts. Please try again.');
    }
    
    setSaving(false);
  };

  const analyzeAllNames = async () => {
    if (!confirm('This will analyze all contact names and extract suggestions from email addresses. Continue?')) {
      return;
    }

    setAnalyzing(true);
    
    try {
      const response = await fetch('/api/mailing-list/analyze-names', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const result = await response.json();
      
      if (response.ok) {
        console.log(`Analyzed ${result.analyzed} contacts`);
        await loadContacts(); // Reload to show updated analysis
      } else {
        console.error('Analysis failed:', result.error);
        alert('Failed to analyze names. Please try again.');
      }
    } catch (error) {
      console.error('Error analyzing names:', error);
      alert('Failed to analyze names. Please try again.');
    }
    
    setAnalyzing(false);
  };

  const getConfidenceBadge = (confidence: string) => {
    const styles = {
      high: 'bg-green-100 text-green-800 border-green-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-orange-100 text-orange-800 border-orange-200',
      none: 'bg-red-100 text-red-800 border-red-200'
    };
    
    const icons = {
      high: <CheckCircle className="w-3 h-3" />,
      medium: <AlertTriangle className="w-3 h-3" />,
      low: <AlertTriangle className="w-3 h-3" />,
      none: <XCircle className="w-3 h-3" />
    };
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${styles[confidence as keyof typeof styles] || styles.none}`}>
        {icons[confidence as keyof typeof icons]}
        {confidence}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Contact Names</h1>
          <p className="text-gray-600">
            Verify and edit names before sending your campaign. Uncertain names can be replaced with "Friend".
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <User className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">With Names</p>
                <p className="text-2xl font-bold text-green-600">{stats.withNames}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Without Names</p>
                <p className="text-2xl font-bold text-red-600">{stats.withoutNames}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Uncertain</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.uncertain}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reviewed</p>
                <p className="text-2xl font-bold text-blue-600">{stats.reviewed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={analyzeAllNames}
              disabled={analyzing}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 inline mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 inline mr-2" />
                  Analyze All Names
                </>
              )}
            </button>
            <button
              onClick={() => applyFriendToAll('no-name')}
              disabled={saving || stats.withoutNames === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Updating...' : `Set "Friend" for ${stats.withoutNames} contacts without names`}
            </button>
            <button
              onClick={() => applyFriendToAll('uncertain')}
              disabled={saving || stats.uncertain === 0}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Updating...' : `Set "Friend" for ${stats.uncertain} uncertain names`}
            </button>
            <button
              onClick={loadContacts}
              disabled={loading}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 inline mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by email or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-lg ${filterType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setFilterType('no-name')}
                className={`px-4 py-2 rounded-lg ${filterType === 'no-name' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                No Name ({stats.withoutNames})
              </button>
              <button
                onClick={() => setFilterType('uncertain')}
                className={`px-4 py-2 rounded-lg ${filterType === 'uncertain' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Uncertain ({stats.uncertain})
              </button>
              <button
                onClick={() => setFilterType('reviewed')}
                className={`px-4 py-2 rounded-lg ${filterType === 'reviewed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Reviewed ({stats.reviewed})
              </button>
            </div>
          </div>
        </div>

        {/* Contact List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredContacts.length === 0 ? (
            <div className="p-12 text-center">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
              <p className="text-gray-500">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Your mailing list appears to be empty.'}
              </p>
            </div>
          ) : (
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Suggested Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confidence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className={contact.isReviewed ? 'bg-green-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {contact.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === contact.id ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          placeholder="Enter name or leave empty for 'Friend'"
                          className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-900">
                          {contact.name || <span className="text-gray-400">No name</span>}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.extractedName || <span className="text-gray-400">—</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getConfidenceBadge(contact.confidence || 'none')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {contact.isReviewed ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          Reviewed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {editingId === contact.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(contact)}
                            className="text-green-600 hover:text-green-900"
                            title="Save changes"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setEditValue('');
                            }}
                            className="text-red-600 hover:text-red-900"
                            title="Cancel editing"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditing(contact)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit name"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Campaign Readiness Summary</h3>
              <div className="space-y-2 text-blue-700">
                <p>
                  <strong>{stats.withNames}</strong> contacts have names, 
                  <strong className="ml-1">{stats.withoutNames}</strong> will use "Friend"
                </p>
                <p>
                  <strong>{stats.reviewed}</strong> contacts reviewed, 
                  <strong className="ml-1 text-yellow-700">{stats.uncertain}</strong> need attention
                </p>
                <p className="text-sm">
                  Emails will be personalized as "Dear [Name]," or "Dear Friend," for contacts without names.
                </p>
              </div>
            </div>
            <div className="ml-6">
              {stats.uncertain > 0 ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                    <AlertTriangle className="w-8 h-8 text-yellow-600" />
                  </div>
                  <p className="text-sm text-yellow-700 font-medium">Review Needed</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-sm text-green-700 font-medium">Ready to Send!</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex gap-4">
            <a
              href="/admin/email-campaign"
              className={`px-6 py-2 rounded-lg font-medium ${
                stats.uncertain === 0 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Go to Email Campaign →
            </a>
            {stats.uncertain > 0 && (
              <button
                onClick={() => setFilterType('uncertain')}
                className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                Review {stats.uncertain} Uncertain Names
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
