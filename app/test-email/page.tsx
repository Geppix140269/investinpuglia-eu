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
        <h1 className="text-3xl font-bold mb-8">Test Email System</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Send Test Email to Giuseppe Funaro</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 mb-2">Recipient: g.funaro@1402celsius.com</p>
              <p className="text-gray-600 mb-2">Template: Introduction - Mini PIA Grant Opportunity</p>
              <p className="text-gray-600 mb-4">Subject: Access 45% EU Grant Funding for Your Italian Investment</p>
            </div>
            
            <button
              onClick={sendTestEmail}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Send Test Email
            </button>
            
            {status && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <p>{status}</p>
              </div>
            )}
            
            {previewUrl && (
              <div className="mt-4">
                <a 
                  href={previewUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Email Preview →
                </a>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Since we haven't configured an email service provider yet (SendGrid, Mailchimp, etc.), 
            this creates an HTML preview of the email. To actually send emails, we need to integrate with an email service.
          </p>
        </div>
      </div>
    </div>
  );
}