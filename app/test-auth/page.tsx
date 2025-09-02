'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export default function TestAuth() {
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log('Test Auth Page - Loading:', loading);
    console.log('Test Auth Page - User:', user);
    console.log('Test Auth Page - User Email:', user?.email);
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Test Page</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Test Page</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
          
          <div className="space-y-2">
            <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
            <p><strong>User Logged In:</strong> {user ? 'Yes' : 'No'}</p>
            <p><strong>User Email:</strong> {user?.email || 'Not logged in'}</p>
            <p><strong>User Name:</strong> {user?.displayName || 'N/A'}</p>
            <p><strong>User ID:</strong> {user?.uid || 'N/A'}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Navigation Links</h2>
          
          <div className="space-y-2">
            <a href="/login" className="block text-blue-600 hover:underline">
              → Go to Login Page
            </a>
            <a href="/social-dashboard" className="block text-blue-600 hover:underline">
              → Go to Social Dashboard (requires login)
            </a>
            <a href="/social-demo" className="block text-blue-600 hover:underline">
              → Go to Social Demo (no login required)
            </a>
            <a href="/" className="block text-blue-600 hover:underline">
              → Go to Home Page
            </a>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Debug Info:</strong> Check the browser console for authentication logs.
          </p>
        </div>
      </div>
    </div>
  );
}