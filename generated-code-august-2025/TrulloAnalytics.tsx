import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Users, MessageSquare, Globe, TrendingUp, Clock } from 'lucide-react';

const TrulloAnalyticsDashboard = () => {
  const [stats, setStats] = useState({
    totalConversations: 0,
    totalMessages: 0,
    activeToday: 0,
    contactRequests: 0,
    conversionRate: 0
  });
  
  const [hourlyData, setHourlyData] = useState<Array<{hour: string; messages: number}>>([]);
  const [languageData, setLanguageData] = useState<Array<{name: string; value: number}>>([]);
  const [topTopics, setTopTopics] = useState<Array<{topic: string; count: number}>>([]);
  const [recentMessages, setRecentMessages] = useState<Array<{id: number; content: string; created_at: string}>>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real-time data
  useEffect(() => {
    fetchAnalytics();
    
    // Poll for updates every 10 seconds
    const interval = setInterval(fetchAnalytics, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch analytics data from API
      const response = await fetch('/api/trullo-analytics');
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      
      const data = await response.json();
      
      // Update all state with the fetched data
      setStats(data.stats || {
        totalConversations: 0,
        totalMessages: 0,
        activeToday: 0,
        contactRequests: 0,
        conversionRate: 0
      });
      
      setLanguageData(data.languageData || []);
      setHourlyData(data.hourlyData || []);
      setTopTopics(data.topTopics || []);
      setRecentMessages(data.recentMessages || []);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
      
      // Set sample data for demonstration
      setStats({
        totalConversations: 156,
        totalMessages: 1842,
        activeToday: 23,
        contactRequests: 18,
        conversionRate: 11.5
      });
      
      setLanguageData([
        { name: 'EN', value: 45 },
        { name: 'IT', value: 30 },
        { name: 'ES', value: 10 },
        { name: 'FR', value: 8 },
        { name: 'DE', value: 7 }
      ]);
      
      setHourlyData(
        Array.from({ length: 24 }, (_, i) => ({
          hour: `${i}:00`,
          messages: Math.floor(Math.random() * 30) + 5
        }))
      );
      
      setTopTopics([
        { topic: 'EU Grants', count: 45 },
        { topic: 'Property Investment', count: 38 },
        { topic: 'Renovation', count: 28 },
        { topic: 'Tax Benefits', count: 22 },
        { topic: 'Legal Requirements', count: 18 }
      ]);
      
      setRecentMessages([
        { id: 1, content: 'How much grant can I get for a masseria renovation?', created_at: new Date().toISOString() },
        { id: 2, content: 'I need a lawyer for property purchase', created_at: new Date().toISOString() },
        { id: 3, content: 'What are the tax benefits for foreign investors?', created_at: new Date().toISOString() },
        { id: 4, content: 'Can you recommend an architect in Ostuni?', created_at: new Date().toISOString() },
        { id: 5, content: 'What documents do I need for PIA Tourism grant?', created_at: new Date().toISOString() }
      ]);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <Activity className="text-teal-600" />
          Trullo Real-Time Analytics
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Conversations</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalConversations}</p>
              </div>
              <Users className="text-blue-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Messages</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalMessages}</p>
              </div>
              <MessageSquare className="text-green-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Today</p>
                <p className="text-2xl font-bold text-gray-800">{stats.activeToday}</p>
              </div>
              <Clock className="text-purple-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contact Requests</p>
                <p className="text-2xl font-bold text-gray-800">{stats.contactRequests}</p>
              </div>
              <TrendingUp className="text-orange-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-800">{stats.conversionRate}%</p>
              </div>
              <Activity className="text-teal-500" size={32} />
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Hourly Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">24-Hour Message Activity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="messages" stroke="#0088FE" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Language Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Globe size={20} />
              Language Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Topics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Topics Discussed</h2>
            <div className="space-y-3">
              {topTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700 capitalize">{topic.topic}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-teal-500 h-2 rounded-full"
                        style={{ width: `${(topic.count / topTopics[0]?.count) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8 text-right">{topic.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent User Messages</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {recentMessages.map((msg, index) => (
                <div key={index} className="border-b pb-2">
                  <p className="text-sm text-gray-600 truncate">{msg.content}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(msg.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrulloAnalyticsDashboard;
