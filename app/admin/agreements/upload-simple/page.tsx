// PATH: app/admin/agreements/upload-template/simple.tsx
'use client';

import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

export default function SimpleUploadPage() {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleDirectUpload = async () => {
    setUploading(true);
    setError('');
    setResult(null);
    
    try {
      const response = await fetch('/api/agreements/upload-template', {
        method: 'POST'
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.details || data.error || 'Upload failed');
      }
    } catch (err) {
      setError('Network error: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  const checkTemplate = async () => {
    try {
      const response = await fetch('/api/agreements/upload-template');
      const data = await response.json();
      
      if (data.exists) {
        setResult({ url: data.url, message: 'Template already exists!' });
      } else {
        setError('No template found');
      }
    } catch (err) {
      setError('Failed to check template');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6">Quick Template Upload</h1>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                This will upload the PDF from:<br />
                <code className="font-mono">docs/Project_Management_Agreement_Editable.pdf</code>
              </p>
            </div>

            {error && (
              <div className="p-4 bg-red-50 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900">Error:</p>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {result && (
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="font-semibold text-green-900">Success!</p>
                </div>
                <p className="text-sm text-green-700">{result.message}</p>
                {result.url && (
                  <a 
                    href={result.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                  >
                    View uploaded PDF
                  </a>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleDirectUpload}
                disabled={uploading}
                className="flex-1 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload Template Now
                  </>
                )}
              </button>

              <button
                onClick={checkTemplate}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Check Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}