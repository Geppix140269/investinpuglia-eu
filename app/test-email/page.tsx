'use client';

import { useState } from 'react';
import { coldOutreachTemplates } from '@/lib/email-campaigns/cold-outreach-templates';

export default function TestEmailPage() {
  const [status, setStatus] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('introduction-mini-pia');
  const [recipientEmail, setRecipientEmail] = useState('g.funaro@1402celsius.com');
  const [recipientName, setRecipientName] = useState('Giuseppe');

  const sendTestEmail = async () => {
    setStatus('Sending email via Resend...');
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: selectedTemplate,
          recipientEmail,
          recipientName
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus(`✅ Email sent successfully to: ${recipientEmail}`);
      } else {
        setStatus(`❌ Failed to send email: ${data.details || data.error}`);
      }
    } catch (error) {
      setStatus('❌ Error: ' + error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Email Campaign Test System</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Send Test Email via Resend</h2>
          
          <div className="space-y-4">
            {/* Template Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Email Template
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {coldOutreachTemplates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Recipient Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Email
              </label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="g.funaro@1402celsius.com"
              />
            </div>
            
            {/* Recipient Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Name
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Giuseppe"
              />
            </div>
            
            {/* Selected Template Info */}
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">
                <strong>Subject:</strong> {coldOutreachTemplates.find(t => t.id === selectedTemplate)?.subject}
              </p>
            </div>
            
            <button
              onClick={sendTestEmail}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 w-full"
            >
              Send Test Email via Resend
            </button>
            
            {status && (
              <div className={`mt-4 p-4 rounded ${
                status.includes('✅') ? 'bg-green-50 text-green-800' : 
                status.includes('❌') ? 'bg-red-50 text-red-800' : 
                'bg-gray-100 text-gray-800'
              }`}>
                <p>{status}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Important:</strong> Make sure you have set up your RESEND_API_KEY in the .env.local file 
            and verified your sending domain in Resend dashboard.
          </p>
          <p className="text-sm text-blue-800 mt-2">
            The email will be sent from: <strong>invest@investinpuglia.eu</strong>
          </p>
        </div>
      </div>
    </div>
  );
}