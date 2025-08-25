// PATH: app/agreement/firebase/[token]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Shield, FileCheck, Lock, Download, Edit3, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

interface AgreementData {
  client_name: string;
  client_email: string;
  project_description: string;
  total_investment: number;
  grant_amount: number;
  service_fee: number;
  start_date: string;
  completion_date: string;
  status: string;
  client_signature?: string;
  client_signed_at?: any;
  giuseppe_signature?: string;
  giuseppe_signed_at?: any;
  pdf_url?: string;
  signed_pdf_url?: string;
  payment_terms?: string;
  special_conditions?: string;
}

export default function AgreementPortal() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreementData, setAgreementData] = useState<AgreementData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [signatureName, setSignatureName] = useState('');
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  
  // Load agreement data after authentication
  useEffect(() => {
    if (isAuthenticated && token) {
      loadAgreementData();
    }
  }, [isAuthenticated, token]);
  
  const loadAgreementData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/agreements/firebase/${token}`);
      if (response.ok) {
        const data = await response.json();
        setAgreementData(data);
      } else {
        setError('Agreement not found');
      }
    } catch (err) {
      setError('Failed to load agreement');
    } finally {
      setLoading(false);
    }
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/agreements/firebase/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          action: 'verify'
        })
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        const data = await response.json();
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      setError('Authentication failed');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSaveChanges = async () => {
    if (!agreementData) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/agreements/firebase/${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agreementData)
      });
      
      if (response.ok) {
        setIsEditing(false);
        alert('Changes saved successfully');
      } else {
        throw new Error('Failed to save changes');
      }
    } catch (err) {
      setError('Failed to save changes');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDigitalSignature = async () => {
    if (!signatureName.trim()) {
      alert('Please enter your full name to sign');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`/api/agreements/firebase/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sign',
          signerType: 'client',
          signatureData: signatureName,
          password // Include password for verification
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setShowSignatureModal(false);
        alert('Agreement signed successfully!');
        
        // Reload agreement data
        await loadAgreementData();
        
        // If fully signed, offer to download
        if (data.signedPdfUrl) {
          window.open(data.signedPdfUrl, '_blank');
        }
      } else {
        throw new Error('Failed to sign agreement');
      }
    } catch (err) {
      setError('Failed to sign agreement');
    } finally {
      setLoading(false);
    }
  };
  
  const downloadPDF = () => {
    if (agreementData?.signed_pdf_url) {
      window.open(agreementData.signed_pdf_url, '_blank');
    } else if (agreementData?.pdf_url) {
      window.open(agreementData.pdf_url, '_blank');
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
                  disabled={loading}
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
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Access Agreement'
                )}
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
  
  // Loading state
  if (loading && !agreementData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }
  
  // Agreement not found
  if (!agreementData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Agreement Not Found</h2>
          <p className="text-gray-600 mt-2">Please check your access link and try again.</p>
        </div>
      </div>
    );
  }
  
  // Agreement View/Edit Screen
  return (
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
                Client: {agreementData.client_name}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {agreementData.status === 'completed' ? (
                <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                  <CheckCircle className="w-5 h-5" />
                  Fully Executed
                </span>
              ) : agreementData.client_signature ? (
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
                {/* Edit form fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Investment (€)
                    </label>
                    <input
                      type="number"
                      value={agreementData.total_investment}
                      onChange={(e) => setAgreementData({
                        ...agreementData,
                        total_investment: parseFloat(e.target.value)
                      })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Fee (€)
                    </label>
                    <input
                      type="number"
                      value={agreementData.service_fee}
                      onChange={(e) => setAgreementData({
                        ...agreementData,
                        service_fee: parseFloat(e.target.value)
                      })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                {/* Add more edit fields as needed */}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-700">Client Name</h3>
                    <p>{agreementData.client_name}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Client Email</h3>
                    <p>{agreementData.client_email}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Project Description</h3>
                  <p>{agreementData.project_description}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-700">Total Investment</h3>
                    <p className="text-xl font-bold text-teal-600">
                      €{agreementData.total_investment?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Grant Amount</h3>
                    <p className="text-xl font-bold text-green-600">
                      €{agreementData.grant_amount?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Service Fee</h3>
                    <p className="text-xl font-bold text-blue-600">
                      €{agreementData.service_fee?.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-700">Start Date</h3>
                    <p>{new Date(agreementData.start_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Completion Date</h3>
                    <p>{new Date(agreementData.completion_date).toLocaleDateString()}</p>
                  </div>
                </div>
                
                {agreementData.payment_terms && (
                  <div>
                    <h3 className="font-semibold text-gray-700">Payment Terms</h3>
                    <p>{agreementData.payment_terms}</p>
                  </div>
                )}
                
                {agreementData.special_conditions && (
                  <div>
                    <h3 className="font-semibold text-gray-700">Special Conditions</h3>
                    <p>{agreementData.special_conditions}</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Signature Section */}
            {agreementData.status !== 'completed' && (
              <div className="mt-8 pt-8 border-t">
                <h2 className="text-xl font-bold mb-4">Digital Signatures</h2>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-700 mb-2">Client Signature</h3>
                    {agreementData.client_signature ? (
                      <div>
                        <p className="font-bold">{agreementData.client_signature}</p>
                        <p className="text-sm text-gray-600">
                          Signed on: {new Date(agreementData.client_signed_at.seconds * 1000).toLocaleString()}
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowSignatureModal(true)}
                        className="text-teal-600 hover:text-teal-700 font-medium"
                      >
                        Click to sign
                      </button>
                    )}
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-700 mb-2">Giuseppe Funaro</h3>
                    {agreementData.giuseppe_signature ? (
                      <div>
                        <p className="font-bold">{agreementData.giuseppe_signature}</p>
                        <p className="text-sm text-gray-600">
                          Signed on: {new Date(agreementData.giuseppe_signed_at.seconds * 1000).toLocaleString()}
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
              {!agreementData.client_signature && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                  Request Changes
                </button>
              )}
              
              {isEditing && (
                <>
                  <button
                    onClick={handleSaveChanges}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </>
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
            Secured with Firebase • 256-bit encryption • Legally binding digital signatures
          </div>
        </div>
      </div>
      
      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Digital Signature</h3>
            <p className="text-gray-600 mb-4">
              By typing your full legal name below, you agree to sign this agreement digitally.
            </p>
            <input
              type="text"
              placeholder="Enter your full name"
              value={signatureName}
              onChange={(e) => setSignatureName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={handleDigitalSignature}
                disabled={!signatureName.trim() || loading}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Signing...' : 'Sign Agreement'}
              </button>
              <button
                onClick={() => setShowSignatureModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}