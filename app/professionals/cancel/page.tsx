// app/professionals/cancel/page.tsx
import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="text-yellow-600 text-6xl mb-4">⚠️</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. No charges were made to your account.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-700">
            You can still complete your registration with a free listing, 
            or try again with a premium subscription.
          </p>
        </div>

        <div className="space-y-3">
          <Link 
            href="/register-professional"
            className="block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Try Again
          </Link>
          <Link 
            href="/professionals"
            className="block bg-gray-200 text-gray-700 px-6 py-3 rounded hover:bg-gray-300 transition"
          >
            View Directory
          </Link>
        </div>
      </div>
    </div>
  );
}
