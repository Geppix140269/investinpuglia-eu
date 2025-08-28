'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TestEmailSendPage() {
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const sendTestEmail = async () => {
    setIsSending(true);
    setError('');
    setResult(null);

    try {
      // Sample email data for testing
      const testData = {
        to: 'g.funaro@1402celsius.com',
        subject: '[TEST] Access 50% EU Grant Funding for Your Italian Investment',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">TEST EMAIL - Mini PIA Grants</h1>
                <p style="color: #e0e7ff; margin: 10px 0 0 0;">Testing Email Campaign System</p>
              </div>
              
              <!-- Body -->
              <div style="padding: 30px;">
                <p style="font-size: 16px; margin-bottom: 20px;">Dear Giuseppe,</p>
                
                <p style="font-size: 16px; margin-bottom: 20px;">
                  This is a <strong>TEST EMAIL</strong> to verify that the email campaign system is working correctly.
                </p>
                
                <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0;">
                  <h2 style="color: #1e40af; margin: 0 0 10px 0; font-size: 20px;">System Check</h2>
                  <ul style="margin: 10px 0;">
                    <li>✅ Email template rendering: Working</li>
                    <li>✅ Resend API integration: Working</li>
                    <li>✅ HTML formatting: Working</li>
                    <li>✅ Personalization tokens: [Name] = Giuseppe</li>
                    <li>✅ Campaign tracking: mini-pia-introduction</li>
                  </ul>
                </div>
                
                <p style="font-size: 16px; margin-bottom: 20px;">
                  <strong>Next Steps:</strong>
                </p>
                <ul style="margin-bottom: 20px;">
                  <li>Review email formatting and content</li>
                  <li>Check spam score and deliverability</li>
                  <li>Verify all links work correctly</li>
                  <li>Confirm personalization is working</li>
                </ul>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://investinpuglia.eu/admin/email-campaign" 
                     style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                            color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; 
                            font-weight: bold;">
                    Go to Campaign Manager
                  </a>
                </div>
                
                <p style="font-size: 14px; color: #666; margin-top: 30px;">
                  This test email was sent on: ${new Date().toLocaleString()}
                </p>
              </div>
              
              <!-- Footer -->
              <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; font-size: 14px; color: #6b7280;">
                  InvestInPuglia | Via Example 123, Bari, Italy
                </p>
                <p style="margin: 10px 0 0 0; font-size: 12px; color: #9ca3af;">
                  This is a test email. No action required.
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
        test: true,
        campaignId: 'test-campaign',
        tags: ['test', 'system-check']
      };

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      setResult(data);
      toast.success('Test email sent successfully!');
      
    } catch (err) {
      console.error('Error sending test email:', err);
      setError(err instanceof Error ? err.message : 'Failed to send test email');
      toast.error('Failed to send test email');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Test System</h1>
          <p className="text-gray-600 mb-8">
            Send a test email to verify the campaign system is working correctly.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <div>
                <p className="text-blue-900 font-medium">Test Email Details:</p>
                <ul className="text-sm text-blue-800 mt-1">
                  <li>• Recipient: g.funaro@1402celsius.com</li>
                  <li>• Subject: [TEST] Access 50% EU Grant Funding...</li>
                  <li>• Template: Mini PIA Introduction</li>
                  <li>• From: Giuseppe Funaro &lt;giuseppe@investinpuglia.eu&gt;</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={sendTestEmail}
            disabled={isSending}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {isSending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending Test Email...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Send Test Email to Giuseppe
              </>
            )}
          </button>

          {result && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <div className="flex-1">
                  <p className="text-green-900 font-medium">Success!</p>
                  <p className="text-sm text-green-800 mt-1">{result.message}</p>
                  {result.data && (
                    <div className="mt-2 p-2 bg-white rounded border border-green-200">
                      <pre className="text-xs text-gray-600 overflow-x-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                <div>
                  <p className="text-red-900 font-medium">Error</p>
                  <p className="text-sm text-red-800 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="/admin/email-campaign"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Go to Campaign Manager
              </a>
              <a
                href="/api/send-email"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                View API Endpoint
              </a>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-900">
              <strong>Note:</strong> Make sure RESEND_API_KEY is configured in your environment variables. 
              The email will be sent from giuseppe@investinpuglia.eu to g.funaro@1402celsius.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}