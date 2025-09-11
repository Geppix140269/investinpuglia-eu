import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, Euro, FileText, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Investment Tools & Calculators | InvestInPuglia.eu',
  description: 'Free investment calculators and tools for Italian property investments. Calculate costs, grants, and returns for your Puglia investment projects.',
  keywords: [
    'investment tools',
    'property calculator',
    'Italy investment calculator',
    'Mini PIA calculator',
    'property costs calculator',
    'Italian real estate tools'
  ]
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Investment Tools & Calculators
          </h1>
          <p className="text-xl text-gray-600">
            Free tools to help you calculate costs and plan your Italian property investments
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Property Costs Calculator */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Property Costs Calculator</h2>
                <p className="text-sm text-gray-600">Complete cost breakdown</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">
              Calculate all costs for buying property in Italy as a foreign investor. 
              Includes taxes, legal fees, agency costs, and annual expenses.
            </p>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Includes:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Registration and cadastral taxes</li>
                <li>• Notary and legal fees</li>
                <li>• Agency and professional costs</li>
                <li>• Annual property taxes (IMU, TASI)</li>
                <li>• Special rates for foreign buyers</li>
              </ul>
            </div>
            
            <Link 
              href="/property-calculator"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Euro className="w-5 h-5" />
              Calculate Property Costs
            </Link>
          </div>

          {/* Mini PIA Calculator */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Mini PIA Grant Calculator</h2>
                <p className="text-sm text-gray-600">EU grant eligibility</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">
              Calculate your eligibility for Mini PIA tourism grants up to €200,000. 
              Get 50% non-refundable funding for qualifying tourism projects.
            </p>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Features:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Grant eligibility assessment</li>
                <li>• Funding amount calculations</li>
                <li>• Project requirement analysis</li>
                <li>• ROI projections</li>
                <li>• Application guidance</li>
              </ul>
            </div>
            
            <Link 
              href="/tools/mini-pia-calculator"
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Calculate Mini PIA Grant
            </Link>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Why Use Our Calculators?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calculator className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Accurate Calculations</h3>
              <p className="text-gray-600 text-sm">
                Based on current Italian tax rates and regulations, updated regularly for accuracy.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Euro className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Free to Use</h3>
              <p className="text-gray-600 text-sm">
                No registration required. Get instant results for all your investment calculations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Guidance</h3>
              <p className="text-gray-600 text-sm">
                Created by Giuseppe Funaro's team with 15+ years of Italian investment experience.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Need personalized guidance for your Italian investment?
          </p>
          <Link 
            href="/#trullo"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-green-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-shadow"
          >
            Chat with Trullo AI Assistant
          </Link>
        </div>
      </div>
    </div>
  );
}