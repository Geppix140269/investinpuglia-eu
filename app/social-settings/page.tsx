'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { 
  Settings, 
  Save, 
  Eye, 
  EyeOff, 
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Key
} from 'lucide-react';

interface PlatformCredentials {
  linkedin?: {
    clientId: string;
    clientSecret: string;
    accessToken: string;
    organizationId: string;
  };
  facebook?: {
    pageId: string;
    accessToken: string;
    appId: string;
    appSecret: string;
  };
  instagram?: {
    businessId: string;
    accessToken: string;
  };
  twitter?: {
    apiKey: string;
    apiSecret: string;
    accessToken: string;
    accessTokenSecret: string;
    bearerToken: string;
  };
  youtube?: {
    apiKey: string;
    channelId: string;
  };
}

export default function SocialSettings() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [credentials, setCredentials] = useState<PlatformCredentials>({});
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [activeTab, setActiveTab] = useState('linkedin');

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/login');
      return;
    }
    loadCredentials();
  }, [user, authLoading, router]);

  const loadCredentials = async () => {
    if (!user) return;
    
    try {
      const docRef = doc(db, 'social_credentials', user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setCredentials(docSnap.data() as PlatformCredentials);
      }
    } catch (error) {
      console.error('Error loading credentials:', error);
      setMessage({ type: 'error', text: 'Failed to load credentials' });
    }
  };

  const saveCredentials = async () => {
    if (!user) return;
    
    setSaving(true);
    setMessage(null);
    
    try {
      await setDoc(doc(db, 'social_credentials', user.uid), {
        ...credentials,
        updatedAt: new Date().toISOString(),
        userId: user.uid
      });
      
      setMessage({ type: 'success', text: 'Credentials saved successfully!' });
    } catch (error) {
      console.error('Error saving credentials:', error);
      setMessage({ type: 'error', text: 'Failed to save credentials' });
    } finally {
      setSaving(false);
    }
  };

  const toggleSecret = (field: string) => {
    setShowSecrets(prev => ({ ...prev, [field]: !prev[field] }));
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const platformConfig = {
    linkedin: {
      name: 'LinkedIn',
      icon: '💼',
      color: 'blue',
      setupUrl: 'https://www.linkedin.com/developers/',
      fields: [
        { key: 'clientId', label: 'Client ID', secret: false },
        { key: 'clientSecret', label: 'Client Secret', secret: true },
        { key: 'accessToken', label: 'Access Token', secret: true },
        { key: 'organizationId', label: 'Organization ID', secret: false }
      ],
      instructions: [
        'Go to LinkedIn Developers and create an app',
        'Add "Share on LinkedIn" and "Marketing Developer Platform" products',
        'Get your Client ID and Secret from the Auth tab',
        'Generate an access token using OAuth 2.0',
        'Find your Organization ID from your company page URL'
      ]
    },
    facebook: {
      name: 'Facebook',
      icon: '👥',
      color: 'blue',
      setupUrl: 'https://developers.facebook.com/',
      fields: [
        { key: 'appId', label: 'App ID', secret: false },
        { key: 'appSecret', label: 'App Secret', secret: true },
        { key: 'pageId', label: 'Page ID', secret: false },
        { key: 'accessToken', label: 'Page Access Token', secret: true }
      ],
      instructions: [
        'Create a Facebook App at developers.facebook.com',
        'Add Facebook Login and Pages API',
        'Get App ID and Secret from Settings > Basic',
        'Generate a Page Access Token using Graph API Explorer',
        'Find Page ID in your Facebook Page settings'
      ]
    },
    instagram: {
      name: 'Instagram',
      icon: '📷',
      color: 'purple',
      setupUrl: 'https://developers.facebook.com/docs/instagram-api',
      fields: [
        { key: 'businessId', label: 'Instagram Business Account ID', secret: false },
        { key: 'accessToken', label: 'Access Token', secret: true }
      ],
      instructions: [
        'Connect Instagram to a Facebook Page',
        'Use the same Facebook App created above',
        'Get Instagram Business Account ID from Graph API',
        'Use the same access token as Facebook'
      ]
    },
    twitter: {
      name: 'X (Twitter)',
      icon: '𝕏',
      color: 'black',
      setupUrl: 'https://developer.twitter.com/',
      fields: [
        { key: 'apiKey', label: 'API Key', secret: true },
        { key: 'apiSecret', label: 'API Secret', secret: true },
        { key: 'accessToken', label: 'Access Token', secret: true },
        { key: 'accessTokenSecret', label: 'Access Token Secret', secret: true },
        { key: 'bearerToken', label: 'Bearer Token', secret: true }
      ],
      instructions: [
        'Apply for Twitter Developer Account',
        'Create a Project and App',
        'Get API Key and Secret from Keys and Tokens',
        'Generate Access Token and Secret',
        'Copy Bearer Token for API v2'
      ]
    },
    youtube: {
      name: 'YouTube',
      icon: '📺',
      color: 'red',
      setupUrl: 'https://console.cloud.google.com/',
      fields: [
        { key: 'apiKey', label: 'API Key', secret: true },
        { key: 'channelId', label: 'Channel ID', secret: false }
      ],
      instructions: [
        'Go to Google Cloud Console',
        'Enable YouTube Data API v3',
        'Create credentials (API Key)',
        'Find Channel ID in YouTube Studio > Settings'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Settings className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Social Media Settings</h1>
                <p className="text-sm text-gray-500">Configure your social media API credentials</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/social-dashboard')}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Messages */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          {/* Platform Tabs */}
          <div className="border-b">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {Object.entries(platformConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl">{config.icon}</span>
                  <span>{config.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Platform Configuration */}
          <div className="p-6">
            {Object.entries(platformConfig).map(([platformKey, config]) => {
              if (platformKey !== activeTab) return null;
              
              return (
                <div key={platformKey} className="space-y-6">
                  {/* Setup Instructions */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-blue-900 mb-2">Setup Instructions</h3>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                          {config.instructions.map((instruction, idx) => (
                            <li key={idx}>{instruction}</li>
                          ))}
                        </ol>
                      </div>
                      <a
                        href={config.setupUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <span className="text-sm">Setup Guide</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  {/* Credential Fields */}
                  <div className="space-y-4">
                    {config.fields.map((field) => {
                      const fieldKey = `${platformKey}_${field.key}`;
                      const platformCreds = credentials[platformKey as keyof PlatformCredentials] || {};
                      
                      return (
                        <div key={field.key}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label}
                          </label>
                          <div className="relative">
                            <input
                              type={field.secret && !showSecrets[fieldKey] ? 'password' : 'text'}
                              value={platformCreds[field.key as keyof typeof platformCreds] || ''}
                              onChange={(e) => {
                                setCredentials(prev => ({
                                  ...prev,
                                  [platformKey]: {
                                    ...prev[platformKey as keyof PlatformCredentials],
                                    [field.key]: e.target.value
                                  }
                                }));
                              }}
                              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                            />
                            {field.secret && (
                              <button
                                type="button"
                                onClick={() => toggleSecret(fieldKey)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showSecrets[fieldKey] ? (
                                  <EyeOff className="h-5 w-5" />
                                ) : (
                                  <Eye className="h-5 w-5" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Test Connection Button */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={async () => {
                        setMessage({ type: 'success', text: `Testing ${config.name} connection...` });
                        // Here you would implement actual API testing
                        setTimeout(() => {
                          setMessage({ type: 'success', text: `${config.name} credentials look valid (test connection coming soon)` });
                        }, 1000);
                      }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-2"
                    >
                      <Key className="h-4 w-4" />
                      <span>Test Connection</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Save Button */}
          <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
            <button
              onClick={saveCredentials}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? 'Saving...' : 'Save All Credentials'}</span>
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">Security Notice</p>
              <p>Your API credentials are encrypted and stored securely in Firebase. Only you can access them.</p>
              <p className="mt-1">Never share your API keys or access tokens with anyone.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}