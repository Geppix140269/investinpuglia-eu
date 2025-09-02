'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Calendar, 
  Send, 
  Clock, 
  TrendingUp, 
  Users, 
  BarChart3,
  Settings,
  Globe,
  MessageSquare,
  Hash,
  Image as ImageIcon,
  PlusCircle,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  where,
  serverTimestamp 
} from 'firebase/firestore';

interface SocialPost {
  id?: string;
  content: string;
  platforms: string[];
  category: string;
  hashtags: string[];
  mediaUrl?: string;
  scheduledTime?: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  analytics?: {
    likes: number;
    shares: number;
    views: number;
    engagement: number;
  };
  createdAt?: Date;
  publishedAt?: Date;
}

interface ContentTemplate {
  category: string;
  templates: string[];
  hashtags: string[];
}

export default function SocialDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [activeTab, setActiveTab] = useState('compose');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [postContent, setPostContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [analytics, setAnalytics] = useState<{
    followers: Record<string, number>;
    engagement: Record<string, number>;
    posts: Record<string, number>;
    totalReach?: number;
  } | null>(null);

  // Comprehensive content categories for 360-degree business view
  const contentCategories: ContentTemplate[] = [
    {
      category: 'Investment Opportunities',
      templates: [
        "New development opportunity in {location}: {property_type} with {ROI}% projected returns. EU grants available.",
        "Exclusive off-market deal: {size}m² commercial space in {city} center. Prime location for {business_type}.",
        "Investment alert: Coastal property portfolio available. {number} units, {price}€ total investment."
      ],
      hashtags: ['InvestInPuglia', 'RealEstateInvestment', 'ItalianProperty', 'ROI', 'PropertyPortfolio']
    },
    {
      category: 'Success Stories',
      templates: [
        "Client Spotlight: {investor_name} achieved {ROI}% returns in {timeframe} with our {property_type} development.",
        "From vision to reality: {project_name} now operating at {occupancy}% occupancy rate.",
        "Portfolio milestone: {amount}€ in successful exits for our international investors this quarter."
      ],
      hashtags: ['SuccessStory', 'ClientSuccess', 'PropertyDevelopment', 'InvestmentReturns']
    },
    {
      category: 'Market Analysis',
      templates: [
        "Puglia property market update: {percentage}% growth in {sector} sector. Download our full report.",
        "Tourism in Puglia reaches new heights: {number} million visitors in {year}. What this means for investors.",
        "Comparative analysis: Puglia vs {region} - Why smart money is moving south."
      ],
      hashtags: ['MarketAnalysis', 'PropertyMarket', 'InvestmentTrends', 'MarketReport', 'PugliaGrowth']
    },
    {
      category: 'EU Grants & Incentives',
      templates: [
        "New EU funding round open: Up to {amount}€ available for {sector} developments. Application deadline: {date}",
        "Grant success: We've secured {amount}€ in PIA Turismo funds for client projects this month.",
        "Tax incentive alert: {percentage}% deduction available for {property_type} investments in Southern Italy."
      ],
      hashtags: ['EUGrants', 'InvestmentIncentives', 'FundingOpportunity', 'PIATurismo', 'TaxBenefits']
    },
    {
      category: 'Team & Expertise',
      templates: [
        "Meet our expert: {name}, {title}, bringing {years} years of {expertise} to your investment journey.",
        "Behind every successful project: Our team of {number} specialists in law, architecture, and finance.",
        "Why experience matters: {achievement} completed by our senior team this quarter."
      ],
      hashtags: ['MeetTheTeam', 'PropertyExperts', 'InvestmentAdvisors', 'LocalExpertise']
    },
    {
      category: 'Events & Networking',
      templates: [
        "Join us at {event_name} on {date}. Exclusive investment opportunities presentation for qualified investors.",
        "Webinar announcement: '{webinar_title}' - Register now for insights on Puglia's property market.",
        "Thank you to all who attended {event}. Next networking session: {date} in {location}."
      ],
      hashtags: ['PropertyEvent', 'InvestmentWebinar', 'Networking', 'RealEstateEvent', 'PugliaInvestment']
    },
    {
      category: 'Property Showcase',
      templates: [
        "Featured property: {property_name} - {size}m², {features}. Investment from {price}€.",
        "Virtual tour now available: Explore {property_name} from anywhere in the world.",
        "Just listed: {property_type} with {unique_feature}. Limited availability for international investors."
      ],
      hashtags: ['PropertyShowcase', 'FeaturedProperty', 'PropertyListing', 'VirtualTour', 'ExclusiveProperty']
    },
    {
      category: 'Legal & Compliance',
      templates: [
        "New regulation update: {regulation} now in effect for foreign property investors. Here's what you need to know.",
        "Simplified process: We handle all {process_type} requirements for international buyers.",
        "Legal tip: {tip} when investing in Italian real estate. Free consultation available."
      ],
      hashtags: ['LegalUpdate', 'PropertyLaw', 'InvestmentCompliance', 'ItalianRegulations']
    },
    {
      category: 'Lifestyle & Tourism',
      templates: [
        "Why Puglia? {number} UNESCO sites, {number}km of coastline, and {percentage}% sunshine days annually.",
        "Living in Puglia: {city} named one of {publication}'s best places to live in {year}.",
        "Investment meets lifestyle: Properties that offer both returns and Mediterranean living."
      ],
      hashtags: ['PugliaLifestyle', 'MediterraneanLiving', 'TourismGrowth', 'QualityOfLife', 'ItalianLifestyle']
    },
    {
      category: 'Sustainability & Innovation',
      templates: [
        "Green investment: {project_name} achieves {certification} certification for sustainable development.",
        "Innovation in restoration: Using {technology} to preserve {property_type} while maximizing efficiency.",
        "ESG focus: How our developments contribute to Puglia's sustainable tourism goals."
      ],
      hashtags: ['SustainableInvestment', 'GreenBuilding', 'ESG', 'SustainableDevelopment', 'Innovation']
    }
  ];

  // All major social media platforms
  const platforms = [
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'bg-blue-600' },
    { id: 'facebook', name: 'Facebook', icon: '👥', color: 'bg-blue-500' },
    { id: 'instagram', name: 'Instagram', icon: '📷', color: 'bg-gradient-to-br from-purple-600 to-pink-500' },
    { id: 'twitter', name: 'X (Twitter)', icon: '𝕏', color: 'bg-black' },
    { id: 'youtube', name: 'YouTube', icon: '📺', color: 'bg-red-600' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'bg-black' },
    { id: 'pinterest', name: 'Pinterest', icon: '📌', color: 'bg-red-500' },
    { id: 'reddit', name: 'Reddit', icon: '🤖', color: 'bg-orange-600' },
    { id: 'whatsapp', name: 'WhatsApp Business', icon: '💬', color: 'bg-green-500' },
    { id: 'telegram', name: 'Telegram', icon: '✈️', color: 'bg-blue-400' }
  ];

  useEffect(() => {
    // Skip if still loading authentication
    if (authLoading) {
      console.log('Auth still loading...');
      return;
    }
    
    // Allow access for logged in users - you can be more restrictive later
    if (!user) {
      console.log('No user found, redirecting to login');
      router.push('/login');
      return;
    }
    
    // Optional: Add specific email check if needed
    // For now, allow any logged in user to access
    console.log('User logged in:', user.email);
    
    fetchPosts();
    fetchAnalytics();
  }, [user, authLoading, router]);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, 'socialPosts'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as SocialPost));
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchAnalytics = async () => {
    // Simulate fetching analytics data
    setAnalytics({
      followers: {
        linkedin: 12450,
        facebook: 8320,
        instagram: 15670,
        twitter: 3420
      },
      engagement: {
        linkedin: 8.7,
        facebook: 7.2,
        instagram: 12.3,
        twitter: 5.4
      },
      posts: {
        published: 124,
        scheduled: 18,
        draft: 6
      }
    });
  };

  const generateContent = () => {
    const category = contentCategories.find(c => c.category === selectedCategory);
    if (!category) return;

    const template = category.templates[Math.floor(Math.random() * category.templates.length)];
    
    // Replace placeholders with actual data
    const replacements: Record<string, string> = {
      location: 'Ostuni',
      property_type: 'luxury masseria',
      ROI: '12-15',
      size: '450',
      city: 'Lecce',
      business_type: 'boutique hotel',
      number: '5',
      price: '2.8M',
      investor_name: 'Swiss Family Office',
      timeframe: '24 months',
      project_name: 'Masseria del Mare',
      occupancy: '85',
      amount: '500,000',
      percentage: '12',
      sector: 'hospitality',
      region: 'Tuscany',
      date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      year: '2024',
      name: 'Arch. Cataldo Russo',
      title: 'Senior Development Director',
      years: '30',
      expertise: 'heritage restoration',
      achievement: '€5M in developments',
      event_name: 'Puglia Investment Summit 2024',
      webinar_title: 'Maximizing ROI in Southern Italian Real Estate',
      event: 'International Property Expo',
      features: 'sea view, private pool, 5 bedrooms',
      unique_feature: 'private beach access',
      regulation: 'Golden Visa requirements update',
      process_type: 'property registration and tax',
      tip: 'Always verify cadastral documentation',
      publication: 'Forbes',
      certification: 'LEED Gold',
      technology: 'AI-powered thermal imaging'
    };

    let content = template;
    Object.keys(replacements).forEach(key => {
      content = content.replace(new RegExp(`{${key}}`, 'g'), replacements[key]);
    });

    setPostContent(content);
  };

  const handleSchedulePost = async () => {
    if (!postContent || selectedPlatforms.length === 0) {
      alert('Please write content and select at least one platform');
      return;
    }

    setIsPosting(true);
    try {
      const category = contentCategories.find(c => c.category === selectedCategory);
      const newPost: Omit<SocialPost, 'id'> = {
        content: postContent,
        platforms: selectedPlatforms,
        category: selectedCategory,
        hashtags: category?.hashtags || [],
        scheduledTime: scheduledDate && scheduledTime 
          ? new Date(`${scheduledDate}T${scheduledTime}`) 
          : new Date(),
        status: scheduledDate ? 'scheduled' : 'published',
        createdAt: new Date()
      };

      await addDoc(collection(db, 'socialPosts'), {
        ...newPost,
        createdAt: serverTimestamp()
      });

      // Reset form
      setPostContent('');
      setSelectedPlatforms([]);
      setScheduledDate('');
      setScheduledTime('');
      
      await fetchPosts();
      alert('Post scheduled successfully!');
    } catch (error) {
      console.error('Error scheduling post:', error);
      alert('Failed to schedule post');
    } finally {
      setIsPosting(false);
    }
  };

  const handlePublishNow = async () => {
    setScheduledDate('');
    setScheduledTime('');
    await handleSchedulePost();
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  // If not logged in and not loading, will redirect via useEffect
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Globe className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Social Media Command Center</h1>
                <p className="text-sm text-gray-500">InvestInPuglia.eu - Complete Business Coverage</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Logged in as: {user?.email}</span>
              <button
                onClick={() => router.push('/admin')}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Back to Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Summary */}
      {analytics && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Published Posts</p>
                  <p className="text-2xl font-bold">{analytics?.posts?.published || 0}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Avg Engagement</p>
                  <p className="text-2xl font-bold">
                    {analytics ? `${(Object.values(analytics.engagement).reduce((a, b) => a + b, 0) / Object.keys(analytics.engagement).length).toFixed(1)}%` : '0%'}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Followers</p>
                  <p className="text-2xl font-bold">
                    {analytics ? Object.values(analytics.followers).reduce((a, b) => a + b, 0).toLocaleString() : '0'}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Scheduled Posts</p>
                  <p className="text-2xl font-bold">{analytics ? analytics.posts.scheduled : posts.filter(p => p.status === 'scheduled').length}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {['compose', 'scheduled', 'published', 'analytics', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'compose' && (
              <div className="space-y-6">
                {/* Content Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    {contentCategories.map((cat) => (
                      <option key={cat.category} value={cat.category}>
                        {cat.category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Content Composer */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Post Content
                    </label>
                    <button
                      onClick={generateContent}
                      className="flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>Generate Content</span>
                    </button>
                  </div>
                  <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write your post content here or click 'Generate Content' for AI-powered suggestions..."
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {postContent.length} characters
                    </span>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <ImageIcon className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Hash className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <MessageSquare className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Platform Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Platforms
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {platforms.map((platform) => (
                      <button
                        key={platform.id}
                        onClick={() => {
                          if (selectedPlatforms.includes(platform.id)) {
                            setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform.id));
                          } else {
                            setSelectedPlatforms([...selectedPlatforms, platform.id]);
                          }
                        }}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedPlatforms.includes(platform.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-1">
                          <span className="text-2xl">{platform.icon}</span>
                          <span className="text-xs font-medium">{platform.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scheduling Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule Post
                  </label>
                  <div className="flex space-x-4">
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      setPostContent('');
                      setSelectedPlatforms([]);
                      setScheduledDate('');
                      setScheduledTime('');
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleSchedulePost}
                    disabled={isPosting || !postContent || selectedPlatforms.length === 0}
                    className="px-6 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Clock className="h-4 w-4" />
                    <span>Schedule</span>
                  </button>
                  <button
                    onClick={handlePublishNow}
                    disabled={isPosting || !postContent || selectedPlatforms.length === 0}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isPosting ? 'Publishing...' : 'Publish Now'}</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'scheduled' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Scheduled Posts</h3>
                {posts.filter(p => p.status === 'scheduled').map((post) => (
                  <div key={post.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-gray-700">{post.content}</p>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.scheduledTime && new Date(post.scheduledTime).toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <Globe className="h-4 w-4 mr-1" />
                            {post.platforms.join(', ')}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                        <button className="text-red-600 hover:text-red-800">Cancel</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'published' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Published Posts</h3>
                {posts.filter(p => p.status === 'published').map((post) => (
                  <div key={post.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-gray-700">{post.content}</p>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                            Published
                          </span>
                          <span>
                            {post.publishedAt && new Date(post.publishedAt).toLocaleString()}
                          </span>
                          <span>{post.platforms.join(', ')}</span>
                        </div>
                        {post.analytics && (
                          <div className="mt-2 flex space-x-4 text-sm">
                            <span>👍 {post.analytics.likes}</span>
                            <span>🔄 {post.analytics.shares}</span>
                            <span>👁️ {post.analytics.views}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Platform Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(analytics?.followers || {}).map(([platform, count]) => (
                    <div key={platform} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold capitalize">{platform}</h4>
                        <span className="text-2xl font-bold">{(count as number).toLocaleString()}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Growth</span>
                          <span className="text-green-600">+12.5%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Engagement</span>
                          <span>8.3%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Reach</span>
                          <span>15.2K</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Platform Settings</h3>
                <div className="space-y-4">
                  {platforms.map((platform) => (
                    <div key={platform.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{platform.icon}</span>
                          <div>
                            <h4 className="font-semibold">{platform.name}</h4>
                            <p className="text-sm text-gray-500">
                              {platform.id === 'linkedin' ? 'Connected' : 'Not connected'}
                            </p>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          {platform.id === 'linkedin' ? 'Settings' : 'Connect'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-4">Posting Schedule</h4>
                  <div className="grid grid-cols-7 gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <div key={day} className="text-center">
                        <p className="text-sm font-medium mb-2">{day}</p>
                        <button className={`w-full p-2 rounded ${
                          ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day)
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day) ? '✓' : '-'}
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Posting Times</p>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">09:00</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">14:00</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">18:00</span>
                      <button className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-50">
                        + Add Time
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}