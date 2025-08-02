// app/professionals/success/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [professionalData, setProfessionalData] = useState<any>(null);

  useEffect(() => {
    if (sessionId) {
      // Verify the payment was successful
      verifyPayment(sessionId);
    }
  }, [sessionId]);

  const verifyPayment = async (sessionId: string) => {
    try {
      // In a real implementation, you'd verify this server-side
      setLoading(false);
      setProfessionalData({
        name: 'Your Professional Profile',
        email: 'your-email@example.com'
      });
    } catch (error) {
      console.error('Error verifying payment:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome to the InvestInPuglia Professional Directory Premium membership. 
          Your profile is now live with enhanced features.
        </p>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
          <ul className="text-sm text-green-700 space-y-1 text-left">
            <li>• Your premium listing is now active</li>
            <li>• You'll receive email notifications for new leads</li>
            <li>• Access your analytics dashboard</li>
            <li>• Priority placement in search results</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link 
            href="/professionals"
            className="block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            View Your Listing
          </Link>
          <Link 
            href="/admin/professionals"
            className="block bg-gray-200 text-gray-700 px-6 py-3 rounded hover:bg-gray-300 transition"
          >
            Manage Your Profile
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          A confirmation email has been sent to your registered email address.
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
