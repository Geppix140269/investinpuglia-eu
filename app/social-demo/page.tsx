'use client';

import { useState } from 'react';
import { 
  Send, 
  Globe,
  MessageSquare,
  RefreshCw,
  Copy
} from 'lucide-react';

export default function SocialDemo() {
  const [postContent, setPostContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Investment Opportunities');
  const [generatedContent, setGeneratedContent] = useState('');

  const contentTemplates: Record<string, string[]> = {
    'Investment Opportunities': [
      "🏛️ New development opportunity in Ostuni: Luxury masseria with 15% projected ROI. EU grants available up to €500K. Perfect for boutique hotel conversion. Contact us for exclusive details.",
      "📊 Off-market deal: 450m² commercial space in Lecce center. Prime location for retail or hospitality. Investment from €2.8M with PIA grant eligibility.",
      "🌊 Coastal portfolio alert: 5 properties, beachfront access, €3.5M total. Ideal for luxury resort development. EU funding available."
    ],
    'Success Stories': [
      "✨ Client Success: Swiss investor achieved 180% ROI in 24 months with Masseria restoration project. From €1.2M investment to €3.4M valuation.",
      "🎯 Portfolio milestone: €25M in successful exits for international investors this quarter. Puglia's property market delivers consistent returns.",
      "🏆 From ruins to luxury: Baglioni Hotel Masseria Muzza now operating at 85% occupancy. This is what strategic investment looks like."
    ],
    'Market Analysis': [
      "📈 Puglia property market Q4 2024: 12% growth in hospitality sector. Tourism up 15% YoY. Download our full investment report at investinpuglia.eu",
      "🔍 Comparative analysis: Puglia offers 40% better value than Tuscany with similar tourism growth. Smart money is moving south.",
      "💡 2025 Forecast: Puglia set for 18% property value increase. New airport routes + EU funding = perfect investment storm."
    ],
    'EU Grants & Incentives': [
      "💰 ALERT: New PIA Turismo funding round open! Up to €2M available for hospitality developments. Application deadline: March 15, 2025.",
      "🎯 Grant success: We've secured €3.5M in EU funds for clients this month. Your project could be next. Free consultation available.",
      "📋 Tax incentive: 50% deduction for heritage property restoration in Southern Italy. Combined with grants = 70% project funding possible."
    ],
    'Lifestyle & Tourism': [
      "🏖️ Why Puglia? 800km pristine coastline, 4 UNESCO sites, 300 days of sunshine. Where investment meets Mediterranean lifestyle.",
      "✈️ Breaking: Ryanair announces 5 new routes to Puglia for Summer 2025. Property demand expected to surge 20%.",
      "🍷 Puglia named 'Best Value Destination 2025' by Lonely Planet. Your investment opportunity starts here."
    ]
  };

  const platforms = [
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'bg-blue-600' },
    { id: 'facebook', name: 'Facebook', icon: '👥', color: 'bg-blue-500' },
    { id: 'instagram', name: 'Instagram', icon: '📷', color: 'bg-gradient-to-br from-purple-600 to-pink-500' },
    { id: 'twitter', name: 'X', icon: '𝕏', color: 'bg-black' },
  ];

  const generateContent = () => {
    const templates = contentTemplates[selectedCategory] || [];
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    setPostContent(randomTemplate);
    setGeneratedContent(randomTemplate);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postContent);
    alert('Content copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <Globe className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Social Media Content Generator</h1>
              <p className="text-gray-500">InvestInPuglia.eu - AI-Powered Content Creation</p>
            </div>
          </div>
        </div>

        {/* Content Generator */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.keys(contentTemplates).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Content Area */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Post Content
                </label>
                <button
                  onClick={generateContent}
                  className="flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Generate</span>
                </button>
              </div>
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Click 'Generate' to create AI-powered content or write your own..."
              />
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-gray-500">{postContent.length} characters</span>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
                >
                  <Copy className="h-4 w-4" />
                  <span className="text-sm">Copy</span>
                </button>
              </div>
            </div>

            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Platforms
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => {
                      if (selectedPlatforms.includes(platform.id)) {
                        setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform.id));
                      } else {
                        setSelectedPlatforms([...selectedPlatforms, platform.id]);
                      }
                    }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedPlatforms.includes(platform.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <span className="text-2xl">{platform.icon}</span>
                      <span className="text-xs font-medium">{platform.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Hashtags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Suggested Hashtags
              </label>
              <div className="flex flex-wrap gap-2">
                {['#InvestInPuglia', '#ItalianRealEstate', '#PropertyInvestment', '#EUGrants', '#PugliaProperty', '#MediterraneanInvestment'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm cursor-pointer hover:bg-gray-200"
                    onClick={() => setPostContent(postContent + ' ' + tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                onClick={() => {
                  setPostContent('');
                  setSelectedPlatforms([]);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  if (!postContent || selectedPlatforms.length === 0) {
                    alert('Please write content and select at least one platform');
                    return;
                  }
                  alert(`Ready to post to: ${selectedPlatforms.join(', ')}\n\nContent: ${postContent}\n\nNote: This is a demo. Connect your social accounts to post automatically.`);
                }}
                disabled={!postContent || selectedPlatforms.length === 0}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Preview Post</span>
              </button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">📱 Full Dashboard Available</h3>
          <p className="text-blue-800 text-sm">
            This is a demo version. The full social media dashboard includes:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-blue-700">
            <li>• Automatic posting to 10+ platforms</li>
            <li>• Content calendar & scheduling</li>
            <li>• Analytics & performance tracking</li>
            <li>• Team collaboration features</li>
            <li>• API integration for all major platforms</li>
          </ul>
          <p className="mt-3 text-sm text-blue-800">
            Contact us at <span className="font-semibold">g.funaro@investinpuglia.eu</span> for full access.
          </p>
        </div>
      </div>
    </div>
  );
}