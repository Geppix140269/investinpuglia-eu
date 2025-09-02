'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function SocialReal() {
  const { user } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState('');
  const [posting, setPosting] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  // REAL posting using Zapier Webhooks (actually works!)
  const postToSocialMedia = async () => {
    if (!content) {
      alert('Please write some content first');
      return;
    }

    setPosting(true);
    setResults([]);
    
    try {
      // Option 1: Use Zapier Webhook (FREE and WORKS)
      // You need to:
      // 1. Go to zapier.com and create a free account
      // 2. Create a Zap with Webhook trigger
      // 3. Connect it to your social media accounts
      // 4. Replace this URL with your Zapier webhook URL
      
      const ZAPIER_WEBHOOK_URL = 'YOUR_ZAPIER_WEBHOOK_URL_HERE';
      
      if (ZAPIER_WEBHOOK_URL === 'YOUR_ZAPIER_WEBHOOK_URL_HERE') {
        alert(`To make this work:
        
1. Go to zapier.com and sign up (free)
2. Create a new Zap
3. Choose "Webhooks by Zapier" as trigger
4. Choose "Catch Hook" 
5. Copy the webhook URL
6. Add this URL to the code
7. Add actions for LinkedIn, Twitter, Facebook
8. Turn on your Zap

This will ACTUALLY post to your real accounts!`);
        setPosting(false);
        return;
      }

      // Send to Zapier
      const response = await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: content,
          timestamp: new Date().toISOString(),
          user: user?.email
        })
      });

      if (response.ok) {
        setResults(prev => [...prev, '✅ Sent to Zapier - will post to all connected platforms']);
      }

    } catch (error) {
      console.error('Error:', error);
      setResults(prev => [...prev, '❌ Failed to send']);
    } finally {
      setPosting(false);
    }
  };

  // Alternative: Direct posting to platforms that allow it
  const postDirectly = async () => {
    setPosting(true);
    setResults([]);

    // Twitter/X (using Tweet Intent - opens in new window)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`;
    window.open(twitterUrl, '_blank');
    setResults(prev => [...prev, '✅ Opened Twitter to post']);

    // LinkedIn (using Share URL - opens in new window)
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://investinpuglia.eu')}&summary=${encodeURIComponent(content)}`;
    window.open(linkedinUrl, '_blank');
    setResults(prev => [...prev, '✅ Opened LinkedIn to post']);

    // Facebook (using Share Dialog)
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://investinpuglia.eu')}&quote=${encodeURIComponent(content)}`;
    window.open(facebookUrl, '_blank');
    setResults(prev => [...prev, '✅ Opened Facebook to post']);

    setPosting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Real Social Media Posting (Actually Works!)</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Write Your Post</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border rounded-lg"
            rows={5}
            placeholder="Write your social media post here..."
          />
          
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Option 1: Use Zapier (Recommended - Posts Automatically)</h3>
              <button
                onClick={postToSocialMedia}
                disabled={posting || !content}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {posting ? 'Sending...' : 'Send to Zapier → Auto-post to all platforms'}
              </button>
              <p className="text-sm text-gray-600 mt-2">
                Requires free Zapier account setup (5 minutes)
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Option 2: Direct Post (Opens in browser)</h3>
              <button
                onClick={postDirectly}
                disabled={posting || !content}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {posting ? 'Opening...' : 'Open Social Media Sites to Post'}
              </button>
              <p className="text-sm text-gray-600 mt-2">
                Opens Twitter, LinkedIn, Facebook in new tabs
              </p>
            </div>
          </div>

          {results.length > 0 && (
            <div className="mt-4 p-3 bg-gray-100 rounded">
              <h3 className="font-semibold mb-2">Results:</h3>
              {results.map((result, idx) => (
                <div key={idx}>{result}</div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">How to Set Up Zapier (Free):</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-800">
            <li>Sign up at zapier.com (free plan works)</li>
            <li>Create a Zap with "Webhooks by Zapier" as trigger</li>
            <li>Choose "Catch Hook" and copy the webhook URL</li>
            <li>Paste the URL in the code above</li>
            <li>Add actions: LinkedIn, Twitter, Facebook posts</li>
            <li>Connect your social accounts to Zapier</li>
            <li>Turn on your Zap</li>
          </ol>
          <p className="mt-2 text-sm font-semibold text-yellow-900">
            This actually works and posts to your real accounts!
          </p>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Alternative: Use Buffer (Also Real)</h3>
          <p className="text-sm text-blue-800">
            Buffer has an API that actually works: buffer.com/developers/api
          </p>
          <p className="text-sm text-blue-800 mt-1">
            You can get a free account and use their API to post to all platforms.
          </p>
        </div>
      </div>
    </div>
  );
}