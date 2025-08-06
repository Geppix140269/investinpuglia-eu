import React, { useState } from 'react';
import { Search, Download, MapPin, FileText, Loader2, AlertCircle } from 'lucide-react';

interface PropertyData {
  foglio: string;
  particella: string;
  subalterno?: string;
  comune: string;
  provincia: string;
}

const CatastoPropertySearch = () => {
  const [searchType, setSearchType] = useState<'property' | 'owner'>('property');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<PropertyData[]>([]);
  
  // Property search fields
  const [foglio, setFoglio] = useState('');
  const [particella, setParticella] = useState('');
  const [subalterno, setSubalterno] = useState('');
  const [comune, setComune] = useState('');
  const [provincia, setProvincia] = useState('');
  
  // Owner search fields
  const [fiscalCode, setFiscalCode] = useState('');
  
  // Document states
  const [visuraLoading, setVisuraLoading] = useState<string | null>(null);
  const [mapLoading, setMapLoading] = useState<string | null>(null);

  const pugliaProvinces = ['BA', 'BR', 'BT', 'FG', 'LE', 'TA'];
  
  const handlePropertySearch = async () => {
    if (!foglio || !particella || !comune || !provincia) {
      setError('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we'll simulate a search
      // In production, this would call your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResults([{
        foglio,
        particella,
        subalterno,
        comune,
        provincia
      }]);
    } catch (err) {
      setError('Failed to search property. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleOwnerSearch = async () => {
    if (!fiscalCode) {
      setError('Please enter a fiscal code');
      return;
    }
    
    // Validate fiscal code format
    const cfRegex = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;
    if (!cfRegex.test(fiscalCode.toUpperCase())) {
      setError('Invalid fiscal code format');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/catasto/search?fiscal_code=${fiscalCode.toUpperCase()}&provincia=${provincia}`);
      const data = await response.json();
      
      if (data.success) {
        setResults(data.properties);
      } else {
        setError(data.error || 'Search failed');
      }
    } catch (err) {
      setError('Failed to search properties. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const downloadVisura = async (property: PropertyData) => {
    const key = `${property.foglio}-${property.particella}`;
    setVisuraLoading(key);
    
    try {
      const response = await fetch('/api/catasto/visura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(property)
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Create download link
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${data.document.data}`;
        link.download = `visura_${property.foglio}_${property.particella}.pdf`;
        link.click();
      } else {
        setError('Failed to download visura');
      }
    } catch (err) {
      setError('Failed to download document');
    } finally {
      setVisuraLoading(null);
    }
  };
  
  const downloadMap = async (property: PropertyData) => {
    const key = `${property.foglio}-${property.particella}`;
    setMapLoading(key);
    
    try {
      const response = await fetch('/api/catasto/map', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(property)
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Create download link
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${data.document.data}`;
        link.download = `mappa_${property.foglio}_${property.particella}.pdf`;
        link.click();
      } else {
        setError('Failed to download map');
      }
    } catch (err) {
      setError('Failed to download map');
    } finally {
      setMapLoading(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Italian Property Registry Search (Catasto)
        </h2>
        
        {/* Search Type Selector */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSearchType('property')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              searchType === 'property'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Search by Property Data
          </button>
          <button
            onClick={() => setSearchType('owner')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              searchType === 'owner'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Search by Owner (Fiscal Code)
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Property Search Form */}
        {searchType === 'property' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foglio (Sheet) *
              </label>
              <input
                type="text"
                value={foglio}
                onChange={(e) => setFoglio(e.target.value)}
                placeholder="e.g., 123"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={4}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Particella (Parcel) *
              </label>
              <input
                type="text"
                value={particella}
                onChange={(e) => setParticella(e.target.value)}
                placeholder="e.g., 456"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={5}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subalterno (Sub-unit)
              </label>
              <input
                type="text"
                value={subalterno}
                onChange={(e) => setSubalterno(e.target.value)}
                placeholder="Optional"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={4}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comune (Municipality) *
              </label>
              <input
                type="text"
                value={comune}
                onChange={(e) => setComune(e.target.value)}
                placeholder="e.g., Bari"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provincia (Province) *
              </label>
              <select
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Province</option>
                {pugliaProvinces.map(prov => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={handlePropertySearch}
                disabled={loading}
                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                Search Property
              </button>
            </div>
          </div>
        )}

        {/* Owner Search Form */}
        {searchType === 'owner' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fiscal Code *
              </label>
              <input
                type="text"
                value={fiscalCode}
                onChange={(e) => setFiscalCode(e.target.value.toUpperCase())}
                placeholder="e.g., RSSMRA80A01H501A"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                maxLength={16}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Province (Optional)
              </label>
              <select
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Provinces</option>
                {pugliaProvinces.map(prov => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2">
              <button
                onClick={handleOwnerSearch}
                disabled={loading}
                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                Search by Owner
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Search Results ({results.length} properties found)
            </h3>
            
            <div className="space-y-4">
              {results.map((property, index) => {
                const key = `${property.foglio}-${property.particella}`;
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="w-5 h-5 text-gray-500" />
                          <h4 className="font-semibold text-lg">
                            {property.comune}, {property.provincia}
                          </h4>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Foglio:</span>
                            <span className="ml-2 font-medium">{property.foglio}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Particella:</span>
                            <span className="ml-2 font-medium">{property.particella}</span>
                          </div>
                          {property.subalterno && (
                            <div>
                              <span className="text-gray-500">Subalterno:</span>
                              <span className="ml-2 font-medium">{property.subalterno}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => downloadVisura(property)}
                          disabled={visuraLoading === key}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                          {visuraLoading === key ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <FileText className="w-4 h-4" />
                          )}
                          Visura
                        </button>
                        
                        <button
                          onClick={() => downloadMap(property)}
                          disabled={mapLoading === key}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                          {mapLoading === key ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <MapPin className="w-4 h-4" />
                          )}
                          Map
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatastoPropertySearch;
