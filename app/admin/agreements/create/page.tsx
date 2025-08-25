// PATH: app/admin/agreements/create/page.tsx
'use client';

import React, { useState, useRef } from 'react';
import { FileText, Edit3, Send, Eye, Download, Save, ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AgreementFormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany: string;
  projectDescription: string;
  totalInvestment: string;
  grantAmount: string;
  serviceFee: string;
  startDate: string;
  completionDate: string;
  paymentTerms: string;
  specialConditions: string;
  notes: string;
}

export default function CreateAgreement() {
  const router = useRouter();
  const [step, setStep] = useState<'form' | 'preview' | 'edit'>('form');
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [draftId, setDraftId] = useState<string>('');
  const [editableContent, setEditableContent] = useState<string>('');
  
  const [formData, setFormData] = useState<AgreementFormData>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientCompany: '',
    projectDescription: '',
    totalInvestment: '',
    grantAmount: '',
    serviceFee: '',
    startDate: '',
    completionDate: '',
    paymentTerms: '50% upon grant approval, 50% upon fund disbursement',
    specialConditions: '',
    notes: ''
  });

  // Generate PDF preview
  const handleGeneratePreview = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/agreements/firebase/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setPdfUrl(data.pdfUrl);
        setDraftId(data.draftId);
        setEditableContent(data.content);
        setStep('preview');
      } else {
        alert('Failed to generate preview');
      }
    } catch (error) {
      alert('Error generating preview');
    } finally {
      setLoading(false);
    }
  };

  // Save draft
  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/agreements/firebase/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          draftId,
          status: 'draft'
        })
      });

      if (response.ok) {
        alert('Draft saved successfully');
      }
    } catch (error) {
      alert('Failed to save draft');
    } finally {
      setLoading(false);
    }
  };

  // Send to client
  const handleSendToClient = async () => {
    if (!window.confirm('Are you sure you want to send this agreement to the client? They will receive an email with access credentials.')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/agreements/firebase/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draftId
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Agreement sent successfully!\n\nAgreement ID: ${data.agreementId}\nAccess Link: ${data.accessLink}\n\nThe client has received an email with access credentials.`);
        router.push('/admin/agreements');
      } else {
        alert('Failed to send agreement');
      }
    } catch (error) {
      alert('Error sending agreement');
    } finally {
      setLoading(false);
    }
  };

  // Form Step
  if (step === 'form') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => router.push('/admin/agreements')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Agreements
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-6">Create New Agreement</h1>
            
            <form onSubmit={(e) => { e.preventDefault(); handleGeneratePreview(); }} className="space-y-6">
              {/* Client Information */}
              <div className="border-b pb-6">
                <h2 className="text-lg font-semibold mb-4">Client Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.clientCompany}
                      onChange={(e) => setFormData({...formData, clientCompany: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="border-b pb-6">
                <h2 className="text-lg font-semibold mb-4">Project Details</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Describe the project scope, location, and objectives..."
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Investment (€) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.totalInvestment}
                      onChange={(e) => setFormData({...formData, totalInvestment: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grant Amount (€) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.grantAmount}
                      onChange={(e) => setFormData({...formData, grantAmount: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Fee (€) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.serviceFee}
                      onChange={(e) => setFormData({...formData, serviceFee: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Completion Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.completionDate}
                      onChange={(e) => setFormData({...formData, completionDate: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Terms and Conditions</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Terms
                  </label>
                  <textarea
                    rows={2}
                    value={formData.paymentTerms}
                    onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Conditions
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialConditions}
                    onChange={(e) => setFormData({...formData, specialConditions: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Any special conditions or clauses..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Internal Notes (not shown to client)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Notes for internal reference..."
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => router.push('/admin/agreements')}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Preview Agreement
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Preview/Edit Step
  if (step === 'preview' || step === 'edit') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <button
              onClick={() => setStep('form')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Form
            </button>
            
            <div className="flex gap-3">
              <button
                onClick={handleSaveDraft}
                disabled={loading}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </button>
              
              {step === 'preview' ? (
                <button
                  onClick={() => setStep('edit')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Agreement
                </button>
              ) : (
                <button
                  onClick={() => setStep('preview')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview Mode
                </button>
              )}
              
              <button
                onClick={handleSendToClient}
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send to Client
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-6">
              {step === 'preview' ? 'Preview Agreement' : 'Edit Agreement'}
            </h1>
            
            {step === 'edit' ? (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h2 className="font-semibold mb-4">Edit Agreement Content</h2>
                <textarea
                  value={editableContent}
                  onChange={(e) => setEditableContent(e.target.value)}
                  className="w-full h-96 px-4 py-3 border rounded-lg font-mono text-sm"
                  placeholder="Edit the agreement content here..."
                />
                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={async () => {
                      // Update PDF with edited content
                      setLoading(true);
                      try {
                        const response = await fetch('/api/agreements/firebase/update-preview', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            draftId,
                            content: editableContent,
                            formData
                          })
                        });
                        
                        if (response.ok) {
                          const data = await response.json();
                          setPdfUrl(data.pdfUrl);
                          alert('PDF updated with your changes');
                          setStep('preview');
                        }
                      } catch (error) {
                        alert('Failed to update PDF');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                  >
                    Apply Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden" style={{ height: '800px' }}>
                <iframe
                  src={pdfUrl}
                  className="w-full h-full"
                  title="Agreement Preview"
                />
              </div>
            )}
            
            {/* Agreement Summary */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Agreement Summary</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Client:</span> {formData.clientName}
                </div>
                <div>
                  <span className="text-gray-600">Total Investment:</span> €{parseInt(formData.totalInvestment).toLocaleString()}
                </div>
                <div>
                  <span className="text-gray-600">Service Fee:</span> €{parseInt(formData.serviceFee).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}