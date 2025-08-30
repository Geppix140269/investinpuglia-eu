'use client';
import dynamic from 'next/dynamic';

const TrulloChatbot = dynamic(() => import('@/components/trullo/TrulloChatbot'), { ssr: false });

export default function TrulloTestPage() {
  return (
    <div style={{ padding: '40px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Trullo Test Page</h1>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>Test Instructions:</h2>
        <ol>
          <li>Click the purple chat button at bottom-right</li>
          <li>Sign in with Google first</li>
          <li>Type: My name is John Smith</li>
          <li>Type: My email is john@example.com</li>
          <li>Type: I have 500k to invest</li>
          <li>Press F12 to see console logs</li>
        </ol>
      </div>
      <div style={{ backgroundColor: '#fef3c7', padding: '15px', borderRadius: '8px' }}>
        <p><strong>Test Mode Active</strong> - Check browser console for extraction logs</p>
      </div>
      <TrulloChatbot />
    </div>
  );
}
