// PATH: app/visitor-analytics/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Users, Globe, Clock, TrendingUp, Activity, Monitor, Smartphone, Tablet, BarChart3 } from 'lucide-react';

interface VisitorData {
  ip: string;
  location: {
    country: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  visits: any[];
  totalPageViews: number;
  totalDuration: number;
  engagementScore: number;
  isReturning: boolean;
}

interface CountryStats {
  visitors: number;
  pageViews: number;
  avgDuration: number;
  cities: Map<string, number>;
}

export default function VisitorAnalytics() {
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [countryStats, setCountryStats] = useState<Map<string, CountryStats>>(new Map());
  const [dailyStats, setDailyStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/visitor-tracking');
      const data = await response.json();
      
      setVisitors(data.visitors || []);
      setDailyStats(data.dailyStats || {});
      
      // Convert country stats array back to Map
      if (data.countryStats) {
        const statsMap = new Map();
        data.countryStats.forEach(([country, stats]: [string, any]) => {
          statsMap.set(country, {
            ...stats,
            cities: new Map(Object.entries(stats.cities || {}))
          });
        });
        setCountryStats(statsMap);
      }
      
      setLastUpdate(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  const sendReport = async (type: string) => {
    try {
      const response = await fetch('/api/telegram-reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportType: type, immediate: true })
      });
      
      if (response.ok) {
        alert(`${type} report sent to Telegram!`);
      }
    } catch (error) {
      console.error('Error sending report:', error);
      alert('Failed to send report');
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Mobile': return <Smartphone className="w-4 h-4" />;
      case 'Tablet': return <Tablet className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const getCountryFlag = (country: string): string => {
    const flags: { [key: string]: string } = {
      'Italy': '🇮🇹',
      'United States': '🇺🇸',
      'United Kingdom': '🇬🇧',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'Spain': '🇪🇸',
      'Netherlands': '🇳🇱',
      'Switzerland': '🇨🇭',
    };
    return flags[country] || '🌍';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading visitor analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Globe className="text-teal-600" />
                Real-Time Visitor Analytics
              </h1>
              <p className="text-gray-600 mt-2">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => sendReport('daily')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Daily Report
              </button>
              <button
                onClick={() => sendReport('weekly')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Send Weekly Report
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Visitors</p>
                <p className="text-2xl font-bold text-gray-800">{dailyStats.totalVisitors || 0}</p>
              </div>
              <Users className="text-blue-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Page Views</p>
                <p className="text-2xl font-bold text-gray-800">{dailyStats.totalPageViews || 0}</p>
              </div>
              <BarChart3 className="text-green-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Countries</p>
                <p className="text-2xl font-bold text-gray-800">{dailyStats.uniqueCountries?.size || 0}</p>
              </div>
              <Globe className="text-purple-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Duration</p>
                <p className="text-2xl font-bold text-gray-800">
                  {Math.round(dailyStats.avgSessionDuration || 0)}s
                </p>
              </div>
              <Clock className="text-orange-500" size={32} />
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin size={20} />
              Top Countries
            </h2>
            <div className="space-y-3">
              {Array.from(countryStats.entries())
                .sort((a, b) => b[1].visitors - a[1].visitors)
                .slice(0, 10)
                .map(([country, stats]) => (
                  <div key={country} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getCountryFlag(country)}</span>
                      <span className="font-medium">{country}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">{stats.visitors} visitors</span>
                      <span className="text-gray-500">{stats.pageViews} views</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Device Types</h2>
            <div className="space-y-3">
              {dailyStats.deviceTypes && Object.entries(dailyStats.deviceTypes).map(([device, count]: [string, any]) => {
                const total = Object.values(dailyStats.deviceTypes as Record<string, number>).reduce((a: number, b: number) => a + b, 0);
                return (
                  <div key={device} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(device)}
                      <span className="font-medium">{device}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-teal-500 h-2 rounded-full"
                          style={{ 
                            width: `${(count / total) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Visitors */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Activity size={20} />
            Recent Visitors
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left text-sm text-gray-600">
                  <th className="pb-2">Location</th>
                  <th className="pb-2">Pages Viewed</th>
                  <th className="pb-2">Duration</th>
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Engagement</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {visitors.slice(0, 10).map((visitor, index) => (
                  <tr key={index} className="text-sm">
                    <td className="py-2">
                      {visitor.location?.city}, {visitor.location?.country}
                    </td>
                    <td className="py-2">{visitor.totalPageViews}</td>
                    <td className="py-2">{Math.round(visitor.totalDuration)}s</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        visitor.isReturning ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {visitor.isReturning ? 'Returning' : 'New'}
                      </span>
                    </td>
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-teal-500 h-2 rounded-full"
                            style={{ width: `${visitor.engagementScore}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">{visitor.engagementScore}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Pages */}
        {dailyStats.topPages && (
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Pages</h2>
            <div className="space-y-2">
              {Object.entries(dailyStats.topPages)
                .sort((a: any, b: any) => b[1] - a[1])
                .slice(0, 5)
                .map(([page, views]: [string, any]) => (
                  <div key={page} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{page}</span>
                    <span className="text-sm font-medium text-gray-900">{views} views</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}