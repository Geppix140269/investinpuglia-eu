// PATH: app/admin/agreements/share/page.tsx
'use client';

import { useState } from 'react';
import { Send, Copy, CheckCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ShareTemplatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    projectType: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/agreements/share-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to share template');
      
      const data = await response.json();
      setResult(data);
      
    } catch (error) {
      console.error('Error sharing template:', error);
      alert('Failed to share template');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setFormData({ clientName: '', clientEmail: '', projectType: '' });
    setResult(null);
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Template Shared Successfully!</h1>
              <p className="text-gray-600 mt-2">The client has received an email with access instructions</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3">Client Details:</h3>
              <p className="text-sm text-gray-600">Name: {formData.clientName}</p>
              <p className="text-sm text-gray-600">Email: {formData.clientEmail}</p>
              <p className="text-sm text-gray-600">Project Type: {formData.projectType}</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3">Access Link:</h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={result.accessLink}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border rounded-lg text-sm"
                />
                <button
                  onClick={() => copyToClipboard(result.accessLink)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="text-sm text-blue-600 mt-2">Link expires in {result.expiresIn}</p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleReset}
                className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Share Another Template
              </button>
              
              <button
                onClick={() => router.push('/admin/agreements')}
                className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back to Agreements
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <button
              onClick={() => router.push('/admin/agreements')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Agreements
            </button>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Share Agreement Template</h1>
          <p className="text-gray-600 mb-8">
            Send the agreement template to a client. They will receive an email with a secure link to fill in their details.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                required
                value={formData.clientName}
                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="John Smith"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Email *
              </label>
              <input
                type="email"
                required
                value={formData.clientEmail}
                onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="client@company.com"
              />
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Type
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select project type...</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Tourism & Hospitality">Tourism & Hospitality</option>
                <option value="Agriculture & Food">Agriculture & Food</option>
                <option value="Technology & Innovation">Technology & Innovation</option>
                <option value="Real Estate Development">Real Estate Development</option>
                <option value="Renewable Energy">Renewable Energy</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
              <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
                <li>Client receives email with secure link and password</li>
                <li>They fill in their company and project details</li>
                <li>Agreement is automatically generated with their data</li>
                <li>Both parties can sign digitally</li>
                <li>You receive notification when completed</li>
              </ol>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Sending...' : (
                <>
                  <Send className="w-5 h-5" />
                  Send Template to Client
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}