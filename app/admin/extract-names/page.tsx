'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Users, Zap, RefreshCw } from 'lucide-react';

interface NamePreview {
  email: string;
  currentName: string;
  extractedName: string;
  confidence: string;
  salutation: string;
}

export default function ExtractNamesPage() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<NamePreview[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [extractionResults, setExtractionResults] = useState<any>(null);
  const [error, setError] = useState('');

  // Load preview on mount
  useEffect(() => {
    loadPreview();
  }, []);

  const loadPreview = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/mailing-list/extract-names');
      const data = await response.json();
      
      if (response.ok) {
        setPreview(data.preview);
        setStats({
          totalWithoutNames: data.totalWithoutNames,
          totalInvestors: data.totalInvestors
        });
      } else {
        setError('Failed to load preview');
      }
    } catch (err) {
      setError('Error loading preview');
    } finally {
      setLoading(false);
    }
  };

  const executeExtraction = async () => {
    if (!confirm('This will update names for all investors with high-confidence matches. Continue?')) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/mailing-list/extract-names', {
        method: 'POST'
      });
      const data = await response.json();
      
      if (response.ok) {
        setExtractionResults(data);
        // Reload preview to show updated state
        await loadPreview();
      } else {
        setError('Failed to extract names');
      }
    } catch (err) {
      setError('Error during extraction');
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceBadge = (confidence: string) => {
    const colors = {
      high: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-orange-100 text-orange-800',
      none: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[confidence as keyof typeof colors] || colors.none}`}>
        {confidence}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Name Extraction</h1>
          <p className="text-gray-600">
            Automatically extract names from email addresses for better personalization
          </p>
        </div>

        {/* Statistics */}
        {stats && (
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Users className="h-10 w-10 text-blue-500 mr-4" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.totalInvestors}</div>
                  <div className="text-sm text-gray-600">Total Investors</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <AlertCircle className="h-10 w-10 text-yellow-500 mr-4" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.totalWithoutNames}</div>
                  <div className="text-sm text-gray-600">Missing Names</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <CheckCircle className="h-10 w-10 text-green-500 mr-4" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round((1 - stats.totalWithoutNames / stats.totalInvestors) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Have Names</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Extraction Results */}
        {extractionResults && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-900 mb-3">Extraction Complete!</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-green-800">
                  <strong>Processed:</strong> {extractionResults.stats.totalProcessed} emails
                </p>
                <p className="text-green-800">
                  <strong>Successfully Updated:</strong> {extractionResults.stats.successfullyUpdated} names
                </p>
              </div>
              <div>
                <p className="text-green-800">
                  <strong>High Confidence:</strong> {extractionResults.stats.highConfidence}
                </p>
                <p className="text-green-800">
                  <strong>Medium Confidence:</strong> {extractionResults.stats.mediumConfidence}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Preview Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Name Extraction Preview</h2>
            <div className="flex gap-2">
              <button
                onClick={loadPreview}
                disabled={loading}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 flex items-center"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={executeExtraction}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
              >
                <Zap className="h-4 w-4 mr-2" />
                Extract & Update Names
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Extracted Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confidence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salutation
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {preview.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.currentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.extractedName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {getConfidenceBadge(item.confidence)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.salutation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {preview.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              No investors without names found
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">How It Works</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Analyzes email patterns like firstname.lastname@, firstname_lastname@, etc.</li>
            <li>• Only updates names with HIGH confidence to avoid errors</li>
            <li>• Falls back to "Dear Investor" for unrecognizable patterns</li>
            <li>• Preserves any existing manually-entered names</li>
            <li>• Updates are immediate in Firebase database</li>
          </ul>
        </div>
      </div>
    </div>
  );
}