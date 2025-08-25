// PATH: app/agreement/[token]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Shield, FileCheck, Lock, Download, Edit3, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Script from 'next/script';

interface AgreementData {
  clientName: string;
  clientEmail: string;
  projectDescription: string;
  totalInvestment: string;
  grantAmount: string;
  serviceFee: string;
  startDate: string;
  completionDate: string;
  status: 'pending' | 'viewed' | 'edited' | 'signed' | 'completed';
  clientSignature?: string;
  clientSignedAt?: string;
  giuseppeSignature?: string;
  giuseppeSignedAt?: string;
}

export default function AgreementPortal() {
  const params = useParams();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreementData, setAgreementData] = useState<AgreementData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  
  // Check if token is valid and load agreement data
  useEffect(() => {
    if (isAuthenticated) {
      loadAgreementData();
    }
  }, [isAuthenticated]);

  const loadAgreementData = async () => {
    if (!params?.token) {
      setError('Invalid agreement link');
      return;
    }
    try {
      const response = await fetch(`/api/agreements/${params?.token}`);
      if (response.ok) {
        const data = await response.json();
        setAgreementData(data);
      } else {
        setError('Agreement not found');
      }
    } catch (err) {
      setError('Failed to load agreement');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/agreements/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          token: params?.token,
          password 
        })
      });

      if (response.ok) {
        setIsAuthenticated(true);
        // Track access
        await fetch('/api/agreements/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: params?.token,
            action: 'accessed',
            timestamp: new Date().toISOString()
          })
        });
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/agreements/${params?.token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agreementData)
      });

      if (response.ok) {
        setIsEditing(false);
        // Track edit
        await fetch('/api/agreements/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: params?.token,
            action: 'edited',
            timestamp: new Date().toISOString()
          })
        });
      }
    } catch (err) {
      setError('Failed to save changes');
    } finally {
      setLoading(false);
    }
  };

  const handleDigitalSignature = async () => {
    setShowSignature(true);
    // This would integrate with DocuSign or HelloSign API
  };

  const initiateDocuSign = async () => {
    try {
      const response = await fetch('/api/agreements/docusign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: params?.token,
          agreementData
        })
      });

      if (response.ok) {
        const { signingUrl } = await response.json();
        window.location.href = signingUrl;
      }
    } catch (err) {
      setError('Failed to initiate signing process');
    }
  };

  const downloadPDF = async () => {
    try {
      const response = await fetch(`/api/agreements/${params?.token}/download`, {
        method: 'GET',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `PMA_${agreementData?.clientName.replace(/\s/g, '_')}.pdf`;
        a.click();
      }
    } catch (err) {
      setError('Failed to download PDF');
    }
  };

  // Password Entry Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                <Lock className="w-8 h-8 text-teal-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Project Management Agreement
              </h1>
              <p className="text-gray-600 mt-2">
                Enter your password to access your agreement
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Access Agreement'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Need help? Contact us at</p>
              <a href="mailto:info@investinpuglia.eu" className="text-teal-600 hover:underline">
                info@investinpuglia.eu
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Agreement View/Edit Screen
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@docusign/docusign-esign@5.10.0/dist/docusign-esign.min.js"
        strategy="lazyOnload"
      />
      
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-t-2xl shadow-lg px-8 py-6 border-b">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Project Management Agreement
                </h1>
                <p className="text-gray-600 mt-1">
                  Client: {agreementData?.clientName}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {agreementData?.status === 'completed' ? (
                  <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                    <CheckCircle className="w-5 h-5" />
                    Fully Executed
                  </span>
                ) : agreementData?.clientSignature ? (
                  <span className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full">
                    <FileCheck className="w-5 h-5" />
                    Awaiting Counter-signature
                  </span>
                ) : (
                  <span className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                    <Edit3 className="w-5 h-5" />
                    Draft
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Document Content */}
          <div className="bg-white shadow-lg px-8 py-6">
            <div className="prose max-w-none">
              <h2 className="text-xl font-bold mb-4">Agreement Details</h2>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value={agreementData?.clientName || ''}
                      onChange={(e) => setAgreementData({...agreementData!, clientName: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Description
                    </label>
                    <textarea
                      value={agreementData?.projectDescription || ''}
                      onChange={(e) => setAgreementData({...agreementData!, projectDescription: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Total Investment
                      </label>
                      <input
                        type="text"
                        value={agreementData?.totalInvestment || ''}
                        onChange={(e) => setAgreementData({...agreementData!, totalInvestment: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Grant Amount
                      </label>
                      <input
                        type="text"
                        value={agreementData?.grantAmount || ''}
                        onChange={(e) => setAgreementData({...agreementData!, grantAmount: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={agreementData?.startDate || ''}
                        onChange={(e) => setAgreementData({...agreementData!, startDate: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Completion Date
                      </label>
                      <input
                        type="date"
                        value={agreementData?.completionDate || ''}
                        onChange={(e) => setAgreementData({...agreementData!, completionDate: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Fee
                    </label>
                    <input
                      type="text"
                      value={agreementData?.serviceFee || ''}
                      onChange={(e) => setAgreementData({...agreementData!, serviceFee: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-700">Client Name</h3>
                      <p>{agreementData?.clientName}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Client Email</h3>
                      <p>{agreementData?.clientEmail}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-700">Project Description</h3>
                    <p>{agreementData?.projectDescription}</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-700">Total Investment</h3>
                      <p className="text-xl font-bold text-teal-600">€{agreementData?.totalInvestment}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Grant Amount</h3>
                      <p className="text-xl font-bold text-green-600">€{agreementData?.grantAmount}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Service Fee</h3>
                      <p className="text-xl font-bold text-blue-600">€{agreementData?.serviceFee}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-700">Start Date</h3>
                      <p>{new Date(agreementData?.startDate || '').toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Completion Date</h3>
                      <p>{new Date(agreementData?.completionDate || '').toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="mt-8 pt-8 border-t">
                <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>1. <strong>Scope of Services:</strong> Invest in Puglia will provide comprehensive project management services including grant application, project coordination, and stakeholder management.</p>
                  <p>2. <strong>Payment Terms:</strong> Service fee is payable upon successful grant approval. 50% upon approval notification, 50% upon fund disbursement.</p>
                  <p>3. <strong>Client Obligations:</strong> Client agrees to provide all necessary documentation and information in a timely manner.</p>
                  <p>4. <strong>Confidentiality:</strong> Both parties agree to maintain confidentiality of all proprietary information.</p>
                  <p>5. <strong>Termination:</strong> Either party may terminate with 30 days written notice. Fees for completed work remain payable.</p>
                  <p>6. <strong>Governing Law:</strong> This agreement is governed by Italian law and EU regulations.</p>
                </div>
              </div>

              {/* Signature Section */}
              {agreementData?.status !== 'completed' && (
                <div className="mt-8 pt-8 border-t">
                  <h2 className="text-xl font-bold mb-4">Digital Signatures</h2>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-700 mb-2">Client Signature</h3>
                      {agreementData?.clientSignature ? (
                        <div>
                          <p className="font-bold">{agreementData.clientSignature}</p>
                          <p className="text-sm text-gray-600">
                            Signed on: {new Date(agreementData.clientSignedAt!).toLocaleString()}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-400">Awaiting signature</p>
                      )}
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-700 mb-2">Giuseppe Funaro</h3>
                      {agreementData?.giuseppeSignature ? (
                        <div>
                          <p className="font-bold">{agreementData.giuseppeSignature}</p>
                          <p className="text-sm text-gray-600">
                            Signed on: {new Date(agreementData.giuseppeSignedAt!).toLocaleString()}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-400">Awaiting signature</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-b-2xl shadow-lg px-8 py-6 border-t">
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                {!agreementData?.clientSignature && (
                  <>
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSaveChanges}
                          disabled={loading}
                          className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Save Changes
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit3 className="w-5 h-5" />
                        Edit Agreement
                      </button>
                    )}
                  </>
                )}
                
                {!isEditing && !agreementData?.clientSignature && (
                  <button
                    onClick={initiateDocuSign}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                    Sign with DocuSign
                  </button>
                )}
              </div>
              
              <button
                onClick={downloadPDF}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              Secured with 256-bit encryption • Legally binding digital signatures
            </div>
          </div>
        </div>
      </div>
    </>
  );
}