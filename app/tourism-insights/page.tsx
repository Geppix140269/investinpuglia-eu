'use client';

import React from 'react';
import TourismDataDashboard from '../../components/TourismDataDashboard';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Globe } from 'lucide-react';

export default function TourismInsights() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white"
      >
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="text-sm font-medium">Powered by Puglia DMS Observatory</span>
            </motion.div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Tourism Data & Insights
            </h1>
            
            <p className="text-xl lg:text-2xl text-blue-100 mb-8">
              Real-time analytics to power your investment decisions in Puglia's thriving tourism sector
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <Users className="w-10 h-10 mb-3 mx-auto" />
                <h3 className="font-bold text-lg mb-2">2.4M+ Visitors</h3>
                <p className="text-blue-100 text-sm">Annual tourist arrivals</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <TrendingUp className="w-10 h-10 mb-3 mx-auto" />
                <h3 className="font-bold text-lg mb-2">+18.2% Growth</h3>
                <p className="text-blue-100 text-sm">Year-over-year increase</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <Globe className="w-10 h-10 mb-3 mx-auto" />
                <h3 className="font-bold text-lg mb-2">35% International</h3>
                <p className="text-blue-100 text-sm">Foreign visitor share</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TourismDataDashboard />
        </motion.div>

        {/* Additional Information Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">About This Data</h3>
            <p className="text-gray-600 mb-4">
              Our tourism insights are sourced directly from the official Puglia DMS (Destination Management System) Observatory, 
              providing accurate and up-to-date information on visitor flows, accommodation statistics, and economic impact.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Real-time data synchronization with regional tourism boards
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Comprehensive coverage of all six Puglia provinces
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Historical trends and predictive analytics
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Export capabilities for detailed analysis
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Opportunities</h3>
            <p className="text-gray-600 mb-4">
              Puglia's tourism sector presents exceptional investment potential with consistent growth 
              and government support for sustainable development projects.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-700">Hotel & Hospitality</span>
                <span className="text-green-600 font-semibold">High Demand</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-700">Agritourism</span>
                <span className="text-green-600 font-semibold">Growing Sector</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-700">Coastal Resorts</span>
                <span className="text-blue-600 font-semibold">Premium Returns</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-700">Historic Properties</span>
                <span className="text-purple-600 font-semibold">Tax Incentives</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="bg-gray-100 py-16 mt-12"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Invest in Puglia's Tourism Sector?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with our investment advisors to explore opportunities tailored to your portfolio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Schedule Consultation
            </a>
            <a
              href="/portfolio"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              View Investment Portfolio
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}