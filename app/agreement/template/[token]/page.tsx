// PATH: app/agreement/template/[token]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Lock, FileText, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { storage } from '@/lib/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

export default function ClientAgreementAccess() {
  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;
  
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [templateUrl, setTemplateUrl] = useState('');

  const handleAuthenticate = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Verify with API
      const response = await fetch('/api/agreements/verify-template-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });
      
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Authentication failed');
        return;
      }
      
      const result = await response.json();
      
      // Get the PDF template URL from our API
      const pdfUrl = '/api/agreements/get-template';
      
      setTemplateUrl(pdfUrl);
      setAuthenticated(true);
      
      // Automatically redirect to PDF
      window.open(pdfUrl, '_blank');
      
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Authentication Step
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Access Your Agreement Template</h1>
            <p className="text-gray-600 mt-2">Enter your password to download the editable PDF</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
          
          <form onSubmit={(e) => { e.preventDefault(); handleAuthenticate(); }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
              required
              autoFocus
            />
            
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Verifying...' : 'Access PDF Template'}
            </button>
          </form>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              After entering your password, the editable PDF agreement will open automatically.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Success State (shown after authentication)
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Granted!</h1>
        <p className="text-gray-600 mb-8">
          Your agreement template should have opened in a new tab. If it didn't open automatically, click the button below.
        </p>
        
        <a
          href={templateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-lg font-medium"
        >
          <Download className="w-6 h-6" />
          Download Agreement Template (PDF)
        </a>
        
        <div className="mt-8 p-6 bg-blue-50 rounded-lg text-left">
          <h3 className="font-semibold mb-3 text-blue-900">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
            <li>Download and save the PDF to your computer</li>
            <li>Open it with Adobe Acrobat Reader or similar PDF editor</li>
            <li>Fill in all the required fields with your company information</li>
            <li>Save the completed PDF</li>
            <li>Send the completed PDF back to <strong>g.funaro@investinpuglia.eu</strong></li>
          </ol>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Need help? Contact Giuseppe Funaro at{' '}
            <a href="mailto:g.funaro@investinpuglia.eu" className="text-teal-600 hover:underline">
              g.funaro@investinpuglia.eu
            </a>
            {' '}or call +39 351 400 1402
          </p>
        </div>
      </div>
    </div>
  );
}