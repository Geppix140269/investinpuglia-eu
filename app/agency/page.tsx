'use client';

import { useState } from 'react';

export default function AgencyPortal() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-green-500 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            🏛️ Agency Portal - InvestInPuglia.eu
          </h1>
          <p className="text-white text-lg">
            Connect with international investors for Mini PIA properties
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setActiveTab('login')}
              className={`px-6 py-3 mx-2 rounded-lg font-semibold transition ${
                activeTab === 'login'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`px-6 py-3 mx-2 rounded-lg font-semibold transition ${
                activeTab === 'register'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Register
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-3 mx-2 rounded-lg font-semibold transition ${
                activeTab === 'dashboard'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Dashboard Demo
            </button>
          </div>

          {activeTab === 'login' && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Agency Login</h2>
              <iframe 
                src="/agency-login.html" 
                className="w-full h-[600px] border-0"
                title="Agency Login"
              />
            </div>
          )}

          {activeTab === 'register' && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Agency Registration</h2>
              <iframe 
                src="/agency-registration.html" 
                className="w-full h-[800px] border-0"
                title="Agency Registration"
              />
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Agency Dashboard (Demo)</h2>
              <div className="mb-4 p-4 bg-yellow-100 rounded-lg">
                <p className="text-sm text-yellow-800">
                  This is a demo. Login required for actual access.
                </p>
              </div>
              <iframe 
                src="/agency-dashboard.html" 
                className="w-full h-[700px] border-0"
                title="Agency Dashboard"
              />
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 text-center shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">15 Agencies</h3>
            <p className="text-gray-600">Across all Puglia provinces</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-lg">
            <div className="text-4xl mb-4">🏛️</div>
            <h3 className="text-xl font-bold mb-2">Mini PIA Focus</h3>
            <p className="text-gray-600">€30K-€5M investment range</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-lg">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-bold mb-2">5000+ Investors</h3>
            <p className="text-gray-600">USA, UK, Germany, Switzerland</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <a 
            href="/property-upload.html"
            target="_blank"
            className="inline-block bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
          >
            🏠 Test Property Upload Form
          </a>
        </div>
      </div>
    </div>
  );
}