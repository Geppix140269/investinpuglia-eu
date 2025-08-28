'use client';

import { useState, useEffect } from 'react';
import { 
  Mail, 
  Plus, 
  Calendar,
  Users, 
  TrendingUp,
  BarChart3,
  Send,
  Edit,
  Trash2,
  Copy,
  Play,
  Pause,
  Settings,
  FileText,
  Clock,
  Target,
  DollarSign,
  RefreshCw,
  Filter,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  type: 'one-time' | 'sequence' | 'automation';
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
  subject: string;
  templateId?: string;
  segments: string[];
  scheduledAt?: Date;
  sentAt?: Date;
  recipients: number;
  opens: number;
  clicks: number;
  conversions: number;
  revenue: number;
  createdAt: Date;
  updatedAt: Date;
  abTest?: {
    enabled: boolean;
    variant: 'A' | 'B';
    splitPercentage: number;
  };
}

interface CampaignStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalRecipients: number;
  totalRevenue: number;
  avgOpenRate: number;
  avgClickRate: number;
  avgConversionRate: number;
}

export default function CampaignsAdmin() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [stats, setStats] = useState<CampaignStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);

  useEffect(() => {
    loadCampaigns();
    loadStats();
  }, []);

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/campaigns');
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data.campaigns || mockCampaigns);
      }
    } catch (error) {
      console.error('Error loading campaigns:', error);
      setCampaigns(mockCampaigns); // Use mock data for now
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch('/api/campaigns/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats || mockStats);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
      setStats(mockStats); // Use mock data for now
    }
  };

  const handleStatusChange = async (campaignId: string, newStatus: Campaign['status']) => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setCampaigns(campaigns.map(campaign => 
          campaign.id === campaignId 
            ? { ...campaign, status: newStatus, updatedAt: new Date() }
            : campaign
        ));
      }
    } catch (error) {
      console.error('Error updating campaign status:', error);
    }
  };

  const handleDuplicateCampaign = async (campaignId: string) => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/duplicate`, {
        method: 'POST'
      });

      if (response.ok) {
        const { campaign: newCampaign } = await response.json();
        setCampaigns([newCampaign, ...campaigns]);
      }
    } catch (error) {
      console.error('Error duplicating campaign:', error);
    }
  };

  const handleDeleteCampaign = async (campaignId: string) => {
    if (!confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setCampaigns(campaigns.filter(campaign => campaign.id !== campaignId));
      }
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    const matchesType = filterType === 'all' || campaign.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Campaign['status']) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'draft': return <Edit className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const calculateROI = (revenue: number, recipients: number) => {
    const cost = recipients * 0.02; // Assume €0.02 per email cost
    return cost > 0 ? ((revenue - cost) / cost * 100) : 0;
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
                Email Campaigns
              </h1>
              <p className="text-gray-600 mt-2">Create and manage your email marketing campaigns</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowNewCampaignModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Campaign
              </button>
              <button
                onClick={loadCampaigns}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          {/* Statistics */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{stats.totalCampaigns}</div>
                <div className="text-sm text-gray-600">Total Campaigns</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{stats.activeCampaigns}</div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">{stats.totalRecipients.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Recipients</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-600">{formatCurrency(stats.totalRevenue)}</div>
                <div className="text-sm text-gray-600">Revenue</div>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-indigo-600">{stats.avgOpenRate.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Open Rate</div>
              </div>
              <div className="bg-teal-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-teal-600">{stats.avgClickRate.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Click Rate</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600">{stats.avgConversionRate.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Conversion</div>
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
                  placeholder="Search campaigns..."
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
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="one-time">One-time</option>
              <option value="sequence">Sequence</option>
              <option value="automation">Automation</option>
            </select>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400" />
              <p className="mt-4 text-gray-600">Loading campaigns...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recipients
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ROI
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{campaign.name}</div>
                          <div className="text-sm text-gray-500">{campaign.subject}</div>
                          {campaign.abTest?.enabled && (
                            <div className="text-xs text-purple-600 mt-1">A/B Test {campaign.abTest.variant}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                          {campaign.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 w-fit ${getStatusColor(campaign.status)}`}>
                          {getStatusIcon(campaign.status)}
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.recipients.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="space-y-1">
                          <div>Opens: {campaign.opens} ({campaign.recipients > 0 ? ((campaign.opens / campaign.recipients) * 100).toFixed(1) : 0}%)</div>
                          <div>Clicks: {campaign.clicks} ({campaign.recipients > 0 ? ((campaign.clicks / campaign.recipients) * 100).toFixed(1) : 0}%)</div>
                          <div>Conv: {campaign.conversions} ({campaign.recipients > 0 ? ((campaign.conversions / campaign.recipients) * 100).toFixed(1) : 0}%)</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        {formatCurrency(campaign.revenue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <span className={`${calculateROI(campaign.revenue, campaign.recipients) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {calculateROI(campaign.revenue, campaign.recipients).toFixed(0)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => window.open(`/admin/campaigns/${campaign.id}`, '_blank')}
                            className="text-blue-600 hover:text-blue-900"
                            title="View/Edit"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDuplicateCampaign(campaign.id)}
                            className="text-gray-600 hover:text-gray-900"
                            title="Duplicate"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          {campaign.status === 'active' ? (
                            <button
                              onClick={() => handleStatusChange(campaign.id, 'paused')}
                              className="text-yellow-600 hover:text-yellow-900"
                              title="Pause"
                            >
                              <Pause className="w-4 h-4" />
                            </button>
                          ) : campaign.status === 'paused' ? (
                            <button
                              onClick={() => handleStatusChange(campaign.id, 'active')}
                              className="text-green-600 hover:text-green-900"
                              title="Resume"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                          ) : null}
                          <button
                            onClick={() => handleDeleteCampaign(campaign.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {!loading && filteredCampaigns.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No campaigns found matching your criteria.
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setShowNewCampaignModal(true)}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
          >
            <div className="bg-blue-100 p-2 rounded-lg">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="font-medium">Create Campaign</div>
              <div className="text-sm text-gray-500">Start a new email campaign</div>
            </div>
          </button>
          
          <button
            onClick={() => window.open('/admin/campaigns/templates', '_blank')}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
          >
            <div className="bg-green-100 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <div className="font-medium">Email Templates</div>
              <div className="text-sm text-gray-500">Manage email templates</div>
            </div>
          </button>
          
          <button
            onClick={() => window.open('/admin/campaigns/automation', '_blank')}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
          >
            <div className="bg-purple-100 p-2 rounded-lg">
              <Settings className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-left">
              <div className="font-medium">Automation</div>
              <div className="text-sm text-gray-500">Set up drip campaigns</div>
            </div>
          </button>
          
          <button
            onClick={() => window.open('/admin/campaigns/analytics', '_blank')}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
          >
            <div className="bg-orange-100 p-2 rounded-lg">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-left">
              <div className="font-medium">Analytics</div>
              <div className="text-sm text-gray-500">View detailed reports</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// Mock data for development
const mockStats: CampaignStats = {
  totalCampaigns: 24,
  activeCampaigns: 5,
  totalRecipients: 15420,
  totalRevenue: 47800,
  avgOpenRate: 24.5,
  avgClickRate: 3.2,
  avgConversionRate: 1.8
};

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'PIA Grant Investment Opportunity',
    type: 'one-time',
    status: 'active',
    subject: 'Unlock €40,000+ in PIA Grants - Limited Time Opportunity',
    segments: ['investors', 'high-net-worth'],
    recipients: 2500,
    opens: 625,
    clicks: 87,
    conversions: 12,
    revenue: 18000,
    createdAt: new Date('2025-08-20'),
    updatedAt: new Date('2025-08-25'),
    abTest: {
      enabled: true,
      variant: 'A',
      splitPercentage: 50
    }
  },
  {
    id: '2',
    name: 'Property Investment Welcome Series',
    type: 'sequence',
    status: 'active',
    subject: 'Welcome to Puglia Property Investment',
    segments: ['new-subscribers'],
    recipients: 1200,
    opens: 288,
    clicks: 42,
    conversions: 8,
    revenue: 12000,
    createdAt: new Date('2025-08-15'),
    updatedAt: new Date('2025-08-24')
  },
  {
    id: '3',
    name: 'Palazzo Palmariggi Showcase',
    type: 'one-time',
    status: 'completed',
    subject: 'Exclusive: Historic Palazzo Available for Investment',
    segments: ['luxury-investors', 'heritage-properties'],
    recipients: 800,
    opens: 240,
    clicks: 56,
    conversions: 3,
    revenue: 45000,
    createdAt: new Date('2025-08-10'),
    updatedAt: new Date('2025-08-15')
  },
  {
    id: '4',
    name: 'Monthly Market Report',
    type: 'automation',
    status: 'scheduled',
    subject: 'Puglia Property Market Report - August 2025',
    segments: ['all-subscribers'],
    scheduledAt: new Date('2025-08-30'),
    recipients: 3500,
    opens: 0,
    clicks: 0,
    conversions: 0,
    revenue: 0,
    createdAt: new Date('2025-08-25'),
    updatedAt: new Date('2025-08-25')
  }
];