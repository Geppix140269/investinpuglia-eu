'use client';

import { useState, useEffect } from 'react';
import { 
  Mail, Users, Tag, Send, AlertCircle, CheckCircle, 
  User, Database, Loader2, FileText, Eye, Edit,
  Download, Upload, Copy, RefreshCw
} from 'lucide-react';
import { extractNameFromEmail, batchExtractNames } from '@/lib/email-utils/name-extractor';
import { investorEmails } from '@/lib/mailing-list-data';
import { coldOutreachTemplates } from '@/lib/email-campaigns/cold-outreach-templates';
import { collection, addDoc, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';

interface ProcessedEmail {
  email: string;
  extractedName: string;
  confidence: string;
  salutation: string;
  status: 'pending' | 'sent' | 'failed';
  tags: string[];
}

export default function EmailCampaignPage() {
  const [emails, setEmails] = useState<ProcessedEmail[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState(coldOutreachTemplates[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    withNames: 0,
    highConfidence: 0,
    mediumConfidence: 0,
    lowConfidence: 0,
    noName: 0
  });
  const [sendProgress, setSendProgress] = useState({
    sent: 0,
    failed: 0,
    total: 0
  });
  const [previewEmail, setPreviewEmail] = useState<ProcessedEmail | null>(null);

  // Load and process emails on mount
  useEffect(() => {
    processEmails();
  }, []);

  const processEmails = async () => {
    setIsProcessing(true);
    
    try {
      // Extract names from all emails
      const processedList: ProcessedEmail[] = investorEmails.map(item => {
        const result = extractNameFromEmail(item.email);
        return {
          email: item.email,
          extractedName: result.firstName,
          confidence: result.confidence,
          salutation: result.salutation,
          status: 'pending' as const,
          tags: item.tags || ['investor', 'puglia_property']
        };
      });

      setEmails(processedList);

      // Calculate statistics
      const withNames = processedList.filter(e => e.extractedName).length;
      const highConf = processedList.filter(e => e.confidence === 'high').length;
      const medConf = processedList.filter(e => e.confidence === 'medium').length;
      const lowConf = processedList.filter(e => e.confidence === 'low').length;
      const noName = processedList.filter(e => e.confidence === 'none').length;

      setStats({
        total: processedList.length,
        withNames,
        highConfidence: highConf,
        mediumConfidence: medConf,
        lowConfidence: lowConf,
        noName
      });

      toast.success(`Processed ${processedList.length} emails successfully!`);
    } catch (error) {
      console.error('Error processing emails:', error);
      toast.error('Failed to process emails');
    } finally {
      setIsProcessing(false);
    }
  };

  const saveToFirebase = async () => {
    setIsProcessing(true);
    
    try {
      const mailingListRef = collection(db, 'mailing_list');
      
      for (const item of emails) {
        // Check if email already exists
        const q = query(mailingListRef, where('email', '==', item.email));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          // Add new record
          await addDoc(mailingListRef, {
            email: item.email,
            name: item.extractedName,
            tags: item.tags,
            confidence: item.confidence,
            salutation: item.salutation,
            status: 'active',
            source: 'imported',
            createdAt: new Date(),
            lastUpdated: new Date()
          });
        } else {
          // Update existing record with extracted name
          const docRef = doc(db, 'mailing_list', querySnapshot.docs[0].id);
          await updateDoc(docRef, {
            name: item.extractedName,
            confidence: item.confidence,
            salutation: item.salutation,
            lastUpdated: new Date()
          });
        }
      }
      
      toast.success('Successfully saved to Firebase!');
    } catch (error) {
      console.error('Error saving to Firebase:', error);
      toast.error('Failed to save to database');
    } finally {
      setIsProcessing(false);
    }
  };

  const sendTestEmail = async (email: ProcessedEmail) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email.email,
          subject: selectedTemplate.subject,
          html: personalizeTemplate(selectedTemplate.html, email),
          test: true
        })
      });

      if (!response.ok) throw new Error('Failed to send test email');
      
      toast.success(`Test email sent to ${email.email}`);
    } catch (error) {
      console.error('Error sending test email:', error);
      toast.error('Failed to send test email');
    }
  };

  const sendCampaign = async () => {
    if (!confirm('Are you sure you want to send this campaign to all 287 contacts?')) {
      return;
    }

    setIsSending(true);
    setSendProgress({ sent: 0, failed: 0, total: emails.length });

    try {
      // Send in batches to avoid rate limiting
      const batchSize = 10;
      const delay = 2000; // 2 seconds between batches

      for (let i = 0; i < emails.length; i += batchSize) {
        const batch = emails.slice(i, i + batchSize);
        
        await Promise.all(batch.map(async (email) => {
          try {
            const response = await fetch('/api/send-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                to: email.email,
                subject: selectedTemplate.subject,
                html: personalizeTemplate(selectedTemplate.html, email),
                campaignId: 'mini-pia-introduction',
                tags: email.tags
              })
            });

            if (!response.ok) throw new Error('Failed to send');
            
            setSendProgress(prev => ({ ...prev, sent: prev.sent + 1 }));
            
            // Update status in local state
            setEmails(prev => prev.map(e => 
              e.email === email.email ? { ...e, status: 'sent' } : e
            ));
            
          } catch (error) {
            console.error(`Failed to send to ${email.email}:`, error);
            setSendProgress(prev => ({ ...prev, failed: prev.failed + 1 }));
            
            setEmails(prev => prev.map(e => 
              e.email === email.email ? { ...e, status: 'failed' } : e
            ));
          }
        }));

        // Wait before next batch
        if (i + batchSize < emails.length) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }

      toast.success(`Campaign sent! ${sendProgress.sent} successful, ${sendProgress.failed} failed.`);
    } catch (error) {
      console.error('Campaign send error:', error);
      toast.error('Campaign sending failed');
    } finally {
      setIsSending(false);
    }
  };

  const personalizeTemplate = (template: string, email: ProcessedEmail): string => {
    let html = template;
    html = html.replace(/\[Name\]/g, email.extractedName || 'Friend');
    html = html.replace(/\[Greeting\]/g, email.salutation);
    html = html.replace(/\[Email\]/g, email.email);
    return html;
  };

  const exportCSV = () => {
    const csv = [
      ['Email', 'Extracted Name', 'Confidence', 'Salutation', 'Tags'].join(','),
      ...emails.map(e => [
        e.email,
        e.extractedName,
        e.confidence,
        e.salutation,
        e.tags.join(';')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mailing-list-with-names.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-purple-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Email Campaign Manager</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {stats.total} contacts loaded
              </span>
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-6 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Emails</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{stats.withNames}</div>
              <div className="text-sm text-gray-600">With Names</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600">{stats.highConfidence}</div>
              <div className="text-sm text-gray-600">High Confidence</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600">{stats.mediumConfidence}</div>
              <div className="text-sm text-gray-600">Medium Conf.</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600">{stats.lowConfidence}</div>
              <div className="text-sm text-gray-600">Low Confidence</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600">{stats.noName}</div>
              <div className="text-sm text-gray-600">No Name</div>
            </div>
          </div>
        </div>

        {/* Template Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-purple-600" />
            Email Template
          </h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Template
            </label>
            <select 
              className="w-full p-2 border rounded-lg"
              value={selectedTemplate.id}
              onChange={(e) => {
                const template = coldOutreachTemplates.find(t => t.id === e.target.value);
                if (template) setSelectedTemplate(template);
              }}
            >
              {coldOutreachTemplates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-700 mb-1">Subject:</div>
            <div className="text-gray-900 mb-3">{selectedTemplate.subject}</div>
            <div className="text-sm font-medium text-gray-700 mb-1">Preheader:</div>
            <div className="text-gray-600">{selectedTemplate.preheader}</div>
          </div>
        </div>

        {/* Email List Preview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-600" />
              Processed Email List
            </h2>
            <div className="flex gap-2">
              <button
                onClick={processEmails}
                disabled={isProcessing}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                Reprocess Names
              </button>
              <button
                onClick={saveToFirebase}
                disabled={isProcessing || emails.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
                Save to Firebase
              </button>
            </div>
          </div>

          {/* Sample of processed emails */}
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-700 font-medium">
                  <th className="pb-2">Email</th>
                  <th className="pb-2">Extracted Name</th>
                  <th className="pb-2">Confidence</th>
                  <th className="pb-2">Salutation</th>
                  <th className="pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {emails.slice(0, 20).map((email, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2">{email.email}</td>
                    <td className="py-2">
                      {email.extractedName || <span className="text-gray-400">-</span>}
                    </td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        email.confidence === 'high' ? 'bg-green-100 text-green-800' :
                        email.confidence === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        email.confidence === 'low' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {email.confidence}
                      </span>
                    </td>
                    <td className="py-2">{email.salutation}</td>
                    <td className="py-2">
                      <div className="flex gap-1">
                        <button
                          onClick={() => setPreviewEmail(email)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => sendTestEmail(email)}
                          className="p-1 text-purple-600 hover:bg-purple-50 rounded"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {emails.length > 20 && (
              <div className="text-center mt-4 text-gray-500 text-sm">
                ... and {emails.length - 20} more emails
              </div>
            )}
          </div>
        </div>

        {/* Send Campaign */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Send className="h-5 w-5 mr-2 text-purple-600" />
            Send Campaign
          </h2>

          {isSending && (
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600 mr-2" />
                <span className="font-medium">Sending campaign...</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(sendProgress.sent / sendProgress.total) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Sent: {sendProgress.sent} | Failed: {sendProgress.failed} | Total: {sendProgress.total}
              </div>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
              <div>
                <div className="font-medium text-yellow-800 mb-1">Before Sending:</div>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>✓ All names have been extracted and reviewed</li>
                  <li>✓ Template has been selected and personalized</li>
                  <li>✓ Test emails have been sent and verified</li>
                  <li>✓ Firebase database has been updated</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-gray-600">
              Ready to send to <strong>{emails.length}</strong> contacts
            </div>
            <button
              onClick={sendCampaign}
              disabled={isSending || emails.length === 0}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 font-medium"
            >
              <Send className="h-5 w-5" />
              Send Campaign to All
            </button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewEmail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Email Preview</h3>
                <button
                  onClick={() => setPreviewEmail(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className="text-sm text-gray-600">To:</div>
                <div className="font-medium">{previewEmail.email}</div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-600">Subject:</div>
                <div className="font-medium">{selectedTemplate.subject}</div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-600">Preview:</div>
                <div 
                  className="border rounded-lg p-4 bg-gray-50"
                  dangerouslySetInnerHTML={{ 
                    __html: personalizeTemplate(selectedTemplate.html, previewEmail) 
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}