'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, MapPin, Download, Filter, BarChart3, PieChart, Activity, Globe } from 'lucide-react';

interface DataMetric {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

interface FilterOption {
  id: string;
  label: string;
  type: 'select' | 'date' | 'checkbox';
  options?: string[];
  value?: any;
}

const TourismDataDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'overview' | 'detailed' | 'export'>('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const metrics: DataMetric[] = [
    {
      label: 'Total Visitors',
      value: '2.4M',
      change: 12.5,
      trend: 'up',
      icon: <Users className="w-5 h-5" />
    },
    {
      label: 'International Arrivals',
      value: '850K',
      change: 18.2,
      trend: 'up',
      icon: <Globe className="w-5 h-5" />
    },
    {
      label: 'Average Stay',
      value: '4.2 days',
      change: -2.1,
      trend: 'down',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      label: 'Top Destination',
      value: 'Bari',
      trend: 'neutral',
      icon: <MapPin className="w-5 h-5" />
    }
  ];

  const filters: FilterOption[] = [
    {
      id: 'period',
      label: 'Time Period',
      type: 'select',
      options: ['Today', 'Week', 'Month', 'Quarter', 'Year'],
      value: selectedPeriod
    },
    {
      id: 'region',
      label: 'Region',
      type: 'select',
      options: ['All Regions', 'Bari', 'Brindisi', 'Foggia', 'Lecce', 'Taranto', 'BAT'],
      value: selectedRegion
    },
    {
      id: 'dataType',
      label: 'Data Type',
      type: 'select',
      options: ['Tourism', 'Accommodation', 'Transportation', 'Events', 'Revenue']
    }
  ];

  const handleExport = async (format: 'csv' | 'xlsx' | 'pdf') => {
    setLoading(true);
    try {
      const response = await fetch('/api/tourism-data/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          format,
          period: selectedPeriod,
          region: selectedRegion
        })
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tourism-data-${new Date().toISOString().split('T')[0]}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tourism Data Analytics</h2>
          <p className="text-gray-600 mt-1">Real-time insights from Puglia DMS Observatory</p>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            onClick={() => setActiveView('overview')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === 'overview' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveView('detailed')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === 'detailed' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <PieChart className="w-4 h-4 inline mr-2" />
            Detailed
          </button>
          <button
            onClick={() => setActiveView('export')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === 'export' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Download className="w-4 h-4 inline mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>
        {filters.map((filter) => (
          <select
            key={filter.id}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter.value}
            onChange={(e) => {
              if (filter.id === 'period') setSelectedPeriod(e.target.value);
              if (filter.id === 'region') setSelectedRegion(e.target.value);
            }}
          >
            {filter.options?.map((option) => (
              <option key={option} value={option.toLowerCase().replace(' ', '-')}>
                {option}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* Main Content Area */}
      {activeView === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {metric.icon}
                  </div>
                  {metric.change && (
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 
                      metric.trend === 'down' ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
                      {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                      {Math.abs(metric.change)}%
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                <p className="text-sm text-gray-600 mt-1">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Chart Placeholder */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Interactive charts will be displayed here</p>
            <p className="text-sm text-gray-500 mt-2">Data visualization powered by Puglia DMS Observatory</p>
          </div>
        </motion.div>
      )}

      {activeView === 'detailed' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Advanced Analytics</h3>
            <p className="text-blue-700 text-sm">
              Access detailed tourism statistics, seasonal trends, visitor demographics, and economic impact analysis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Visitor Demographics</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Domestic</span>
                  <span className="font-medium">65%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">International</span>
                  <span className="font-medium">35%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Business</span>
                  <span className="font-medium">28%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Leisure</span>
                  <span className="font-medium">72%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Top Attractions</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Alberobello Trulli</span>
                  <span className="font-medium">450K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Castel del Monte</span>
                  <span className="font-medium">380K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Polignano a Mare</span>
                  <span className="font-medium">320K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Lecce Historic Center</span>
                  <span className="font-medium">290K</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeView === 'export' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">Export Tourism Data</h3>
            <p className="text-yellow-700 text-sm">
              Download comprehensive tourism reports and datasets for further analysis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleExport('csv')}
              disabled={loading}
              className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors disabled:opacity-50"
            >
              <Download className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">CSV Format</h4>
              <p className="text-sm text-gray-600 mt-1">For spreadsheet analysis</p>
            </button>
            
            <button
              onClick={() => handleExport('xlsx')}
              disabled={loading}
              className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors disabled:opacity-50"
            >
              <Download className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">Excel Format</h4>
              <p className="text-sm text-gray-600 mt-1">With charts and pivots</p>
            </button>
            
            <button
              onClick={() => handleExport('pdf')}
              disabled={loading}
              className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors disabled:opacity-50"
            >
              <Download className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">PDF Report</h4>
              <p className="text-sm text-gray-600 mt-1">Professional presentation</p>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TourismDataDashboard;