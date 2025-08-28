'use client';

import { useState, useEffect } from 'react';
import { 
  getAllInvestors, 
  getMailingListStats,
  updateInvestorContact,
  deleteInvestor,
  unsubscribeInvestor,
  InvestorContact 
} from '@/lib/firebase-mailing-list';
import { 
  Mail, 
  Users, 
  Upload, 
  Download, 
  Trash2, 
  Edit, 
  CheckCircle,
  XCircle,
  Tag,
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';

export default function MailingListAdmin() {
  const [investors, setInvestors] = useState<InvestorContact[]>([]);
  const [filteredInvestors, setFilteredInvestors] = useState<InvestorContact[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedInvestors, setSelectedInvestors] = useState<string[]>([]);

  useEffect(() => {
    loadInvestors();
    loadStats();
  }, []);

  useEffect(() => {
    filterInvestors();
  }, [investors, searchTerm, filterStatus]);

  const loadInvestors = async () => {
    setLoading(true);
    try {
      const data = await getAllInvestors();
      setInvestors(data);
    } catch (error) {
      console.error('Error loading investors:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await getMailingListStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const filterInvestors = () => {
    let filtered = [...investors];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(investor => 
        investor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (investor.name && investor.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      if (filterStatus === 'subscribed') {
        filtered = filtered.filter(investor => investor.subscribed);
      } else if (filterStatus === 'unsubscribed') {
        filtered = filtered.filter(investor => !investor.subscribed);
      } else {
        filtered = filtered.filter(investor => investor.status === filterStatus);
      }
    }

    setFilteredInvestors(filtered);
  };

  const handleImport = async () => {
    if (!confirm('Import the pre-loaded investor email list? This will add all new emails to Firebase.')) {
      return;
    }

    setImporting(true);
    try {
      const response = await fetch('/api/mailing-list/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      
      if (result.success) {
        alert(`Import successful!\n\nImported: ${result.results.imported}\nDuplicates: ${result.results.duplicates}\nFailed: ${result.results.failed}`);
        await loadInvestors();
        await loadStats();
      } else {
        alert(`Import failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Error importing:', error);
      alert('Failed to import mailing list');
    } finally {
      setImporting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      await deleteInvestor(id);
      await loadInvestors();
      await loadStats();
    } catch (error) {
      console.error('Error deleting investor:', error);
      alert('Failed to delete contact');
    }
  };

  const handleUnsubscribe = async (email: string) => {
    try {
      await unsubscribeInvestor(email);
      await loadInvestors();
      await loadStats();
    } catch (error) {
      console.error('Error unsubscribing:', error);
      alert('Failed to unsubscribe contact');
    }
  };

  const handleToggleSubscription = async (investor: InvestorContact) => {
    if (!investor.id) return;

    try {
      await updateInvestorContact(investor.id, {
        subscribed: !investor.subscribed,
        status: !investor.subscribed ? 'active' : 'unsubscribed'
      });
      await loadInvestors();
      await loadStats();
    } catch (error) {
      console.error('Error toggling subscription:', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Email', 'Name', 'Status', 'Subscribed', 'Tags', 'Source', 'Created At'];
    const rows = filteredInvestors.map(investor => [
      investor.email,
      investor.name || '',
      investor.status,
      investor.subscribed ? 'Yes' : 'No',
      investor.tags.join(', '),
      investor.source,
      investor.createdAt ? new Date(investor.createdAt.seconds * 1000).toLocaleDateString() : ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `investor-mailing-list-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Mail className="w-8 h-8 text-blue-600" />
                Investor Mailing List
              </h1>
              <p className="text-gray-600 mt-2">Manage your investor contacts and email campaigns</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleImport}
                disabled={importing}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
              >
                {importing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Import List
                  </>
                )}
              </button>
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Statistics */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Contacts</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{stats.subscribed}</div>
                <div className="text-sm text-gray-600">Subscribed</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">{stats.unsubscribed}</div>
                <div className="text-sm text-gray-600">Unsubscribed</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-600">{stats.interested}</div>
                <div className="text-sm text-gray-600">Interested</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">{stats.bounced}</div>
                <div className="text-sm text-gray-600">Bounced</div>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by email or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="subscribed">Subscribed</option>
              <option value="unsubscribed">Unsubscribed</option>
              <option value="interested">Interested</option>
              <option value="active">Active</option>
              <option value="bounced">Bounced</option>
            </select>
            <button
              onClick={loadInvestors}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400" />
              <p className="mt-4 text-gray-600">Loading investors...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subscribed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tags
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredInvestors.map((investor) => (
                    <tr key={investor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {investor.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {investor.name || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          investor.status === 'active' ? 'bg-green-100 text-green-800' :
                          investor.status === 'interested' ? 'bg-yellow-100 text-yellow-800' :
                          investor.status === 'unsubscribed' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {investor.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleSubscription(investor)}
                          className="focus:outline-none"
                        >
                          {investor.subscribed ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex flex-wrap gap-1">
                          {investor.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {investor.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => investor.id && handleDelete(investor.id)}
                          className="text-red-600 hover:text-red-900 ml-3"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {!loading && filteredInvestors.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No investors found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}