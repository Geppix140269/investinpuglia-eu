// PATH: app/admin/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, Users, Activity, Settings, LogOut, 
  TrendingUp, Mail, Calendar, DollarSign, 
  ChevronRight, Eye, Download, Send, Plus,
  BarChart3, PieChart, Clock, CheckCircle,
  AlertCircle, Archive, Shield, Globe
} from 'lucide-react';

interface DashboardStats {
  totalClients: number;
  activeAgreements: number;
  pendingSignatures: number;
  completedProjects: number;
  monthlyRevenue: number;
  recentActivities: any[];
  clientsList: any[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    activeAgreements: 0,
    pendingSignatures: 0,
    completedProjects: 0,
    monthlyRevenue: 0,
    recentActivities: [],
    clientsList: []
  });

  useEffect(() => {
    checkAuth();
    loadDashboardData();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth');
      const data = await response.json();
      
      if (!data.authenticated) {
        router.push('/admin/login');
      } else {
        setAuthenticated(true);
      }
    } catch {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardData = async () => {
    // Load real data from your APIs
    // For now, using sample data
    setStats({
      totalClients: 24,
      activeAgreements: 8,
      pendingSignatures: 3,
      completedProjects: 15,
      monthlyRevenue: 125000,
      recentActivities: [
        { id: 1, type: 'agreement', action: 'New agreement shared', client: 'Tech Solutions Ltd', time: '2 hours ago' },
        { id: 2, type: 'signature', action: 'Agreement signed', client: 'Global Invest SpA', time: '5 hours ago' },
        { id: 3, type: 'client', action: 'New client registered', client: 'Milano Properties', time: '1 day ago' },
        { id: 4, type: 'payment', action: 'Payment received', client: 'Swiss Capital AG', time: '2 days ago' },
      ],
      clientsList: [
        { id: 1, name: 'Tech Solutions Ltd', email: 'contact@techsolutions.com', status: 'active', investment: 500000 },
        { id: 2, name: 'Global Invest SpA', email: 'info@globalinvest.it', status: 'pending', investment: 750000 },
        { id: 3, name: 'Milano Properties', email: 'admin@milanoprop.it', status: 'active', investment: 1200000 },
        { id: 4, name: 'Swiss Capital AG', email: 'office@swisscap.ch', status: 'completed', investment: 2000000 },
      ]
    });
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  const quickActions = [
    { icon: FileText, label: 'Share Agreement', href: '/admin/agreements/share', color: 'bg-blue-500' },
    { icon: Users, label: 'View Clients', href: '/admin/clients', color: 'bg-green-500' },
    { icon: Plus, label: 'New Agreement', href: '/admin/agreements/create', color: 'bg-purple-500' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics', color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-teal-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">1402 Celsius Ltd</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, Giuseppe</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-500" />
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+12%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalClients}</div>
            <div className="text-sm text-gray-500">Total Clients</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-green-500" />
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">Active</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.activeAgreements}</div>
            <div className="text-sm text-gray-500">Agreements</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-yellow-500" />
              <AlertCircle className="w-4 h-4 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.pendingSignatures}</div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-purple-500" />
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+5</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.completedProjects}</div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-600" />
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">€{stats.monthlyRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Monthly Revenue</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => router.push(action.href)}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group"
              >
                <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-medium text-gray-900">{action.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
              <button className="text-sm text-teal-600 hover:text-teal-700">View all</button>
            </div>
            
            <div className="space-y-4">
              {stats.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{activity.action}</div>
                    <div className="text-sm text-gray-500">{activity.client}</div>
                  </div>
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Management Tools */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Management Tools</h2>
            
            <div className="space-y-3">
              <button
                onClick={() => router.push('/admin/agreements')}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Agreements</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </button>

              <button
                onClick={() => router.push('/admin/agreements/upload-template')}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group"
              >
                <div className="flex items-center gap-3">
                  <Archive className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Templates</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </button>

              <button
                onClick={() => router.push('/admin/visitor-analytics')}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Visitor Analytics</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </button>

              <button
                onClick={() => router.push('/admin/telegram-reports')}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Telegram Reports</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </button>

              <button
                onClick={() => router.push('/admin/settings')}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group"
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Settings</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Clients Table */}
        <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Recent Clients</h2>
              <button 
                onClick={() => router.push('/admin/clients')}
                className="text-sm text-teal-600 hover:text-teal-700"
              >
                View all clients
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.clientsList.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{client.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        client.status === 'active' ? 'bg-green-100 text-green-800' :
                        client.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">€{client.investment.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-teal-600 hover:text-teal-900 mr-3">View</button>
                      <button className="text-blue-600 hover:text-blue-900">Contact</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}