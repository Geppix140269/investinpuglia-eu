import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  query, 
  where,
  serverTimestamp 
} from 'firebase/firestore';

// Platform API configurations
const PLATFORM_APIS = {
  linkedin: {
    baseUrl: 'https://api.linkedin.com/v2',
    auth: process.env.LINKEDIN_ACCESS_TOKEN,
    orgId: process.env.LINKEDIN_ORG_ID
  },
  facebook: {
    baseUrl: 'https://graph.facebook.com/v18.0',
    pageId: process.env.FACEBOOK_PAGE_ID,
    token: process.env.FACEBOOK_ACCESS_TOKEN
  },
  instagram: {
    baseUrl: 'https://graph.facebook.com/v18.0',
    businessId: process.env.INSTAGRAM_BUSINESS_ID,
    token: process.env.INSTAGRAM_ACCESS_TOKEN
  },
  twitter: {
    baseUrl: 'https://api.twitter.com/2',
    bearerToken: process.env.TWITTER_BEARER_TOKEN
  },
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY,
    channelId: process.env.YOUTUBE_CHANNEL_ID
  },
  tiktok: {
    appId: process.env.TIKTOK_APP_ID,
    appSecret: process.env.TIKTOK_APP_SECRET
  },
  pinterest: {
    appId: process.env.PINTEREST_APP_ID,
    token: process.env.PINTEREST_ACCESS_TOKEN
  },
  whatsapp: {
    phoneId: process.env.WHATSAPP_PHONE_ID,
    token: process.env.WHATSAPP_TOKEN
  }
};

// Post to LinkedIn
async function postToLinkedIn(content: string, mediaUrl?: string) {
  const { baseUrl, auth, orgId } = PLATFORM_APIS.linkedin;
  
  if (!auth || !orgId) {
    throw new Error('LinkedIn credentials not configured');
  }

  const postData = {
    author: `urn:li:organization:${orgId}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: content
        },
        shareMediaCategory: mediaUrl ? 'IMAGE' : 'NONE',
        media: mediaUrl ? [{
          status: 'READY',
          originalUrl: mediaUrl
        }] : []
      }
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
    }
  };

  const response = await fetch(`${baseUrl}/ugcPosts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${auth}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0'
    },
    body: JSON.stringify(postData)
  });

  if (!response.ok) {
    throw new Error(`LinkedIn API error: ${response.status}`);
  }

  return await response.json();
}

// Post to Facebook
async function postToFacebook(content: string, mediaUrl?: string) {
  const { baseUrl, pageId, token } = PLATFORM_APIS.facebook;
  
  if (!token || !pageId) {
    throw new Error('Facebook credentials not configured');
  }

  const params = new URLSearchParams({
    message: content,
    access_token: token
  });

  if (mediaUrl) {
    params.append('link', mediaUrl);
  }

  const response = await fetch(`${baseUrl}/${pageId}/feed?${params}`, {
    method: 'POST'
  });

  if (!response.ok) {
    throw new Error(`Facebook API error: ${response.status}`);
  }

  return await response.json();
}

// Post to Instagram
async function postToInstagram(content: string, mediaUrl: string) {
  const { baseUrl, businessId, token } = PLATFORM_APIS.instagram;
  
  if (!token || !businessId || !mediaUrl) {
    throw new Error('Instagram requires credentials and media');
  }

  // Step 1: Create media container
  const containerParams = new URLSearchParams({
    image_url: mediaUrl,
    caption: content,
    access_token: token
  });

  const containerResponse = await fetch(
    `${baseUrl}/${businessId}/media?${containerParams}`,
    { method: 'POST' }
  );

  if (!containerResponse.ok) {
    throw new Error(`Instagram container error: ${containerResponse.status}`);
  }

  const { id: containerId } = await containerResponse.json();

  // Step 2: Publish the container
  const publishParams = new URLSearchParams({
    creation_id: containerId,
    access_token: token
  });

  const publishResponse = await fetch(
    `${baseUrl}/${businessId}/media_publish?${publishParams}`,
    { method: 'POST' }
  );

  if (!publishResponse.ok) {
    throw new Error(`Instagram publish error: ${publishResponse.status}`);
  }

  return await publishResponse.json();
}

// Post to Twitter/X
async function postToTwitter(content: string) {
  const { baseUrl, bearerToken } = PLATFORM_APIS.twitter;
  
  if (!bearerToken) {
    throw new Error('Twitter credentials not configured');
  }

  const response = await fetch(`${baseUrl}/tweets`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: content })
  });

  if (!response.ok) {
    throw new Error(`Twitter API error: ${response.status}`);
  }

  return await response.json();
}

// Main API handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, platforms, category, hashtags, mediaUrl, scheduledTime } = body;

    // If scheduled for future, save to database
    if (scheduledTime && new Date(scheduledTime) > new Date()) {
      const post = await addDoc(collection(db, 'socialPosts'), {
        content,
        platforms,
        category,
        hashtags,
        mediaUrl,
        scheduledTime: new Date(scheduledTime),
        status: 'scheduled',
        createdAt: serverTimestamp()
      });

      return NextResponse.json({ 
        success: true, 
        message: 'Post scheduled successfully',
        postId: post.id 
      });
    }

    // Publish immediately to selected platforms
    const results: Record<string, any> = {};
    const errors: Record<string, string> = {};

    for (const platform of platforms) {
      try {
        switch (platform) {
          case 'linkedin':
            results.linkedin = await postToLinkedIn(content, mediaUrl);
            break;
          case 'facebook':
            results.facebook = await postToFacebook(content, mediaUrl);
            break;
          case 'instagram':
            if (mediaUrl) {
              results.instagram = await postToInstagram(content, mediaUrl);
            } else {
              errors.instagram = 'Instagram requires an image';
            }
            break;
          case 'twitter':
            results.twitter = await postToTwitter(content);
            break;
          default:
            errors[platform] = 'Platform not yet implemented';
        }
      } catch (error: any) {
        errors[platform] = error.message;
      }
    }

    // Save published post to database
    await addDoc(collection(db, 'socialPosts'), {
      content,
      platforms,
      category,
      hashtags,
      mediaUrl,
      status: 'published',
      publishedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      results,
      errors
    });

    return NextResponse.json({
      success: true,
      message: 'Post published successfully',
      results,
      errors
    });

  } catch (error: any) {
    console.error('Social media API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process social media post' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch scheduled posts and trigger publishing
export async function GET(request: NextRequest) {
  try {
    // Check for posts that need to be published
    const now = new Date();
    const q = query(
      collection(db, 'socialPosts'),
      where('status', '==', 'scheduled'),
      where('scheduledTime', '<=', now)
    );

    const snapshot = await getDocs(q);
    const postsToPublish = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Publish each scheduled post
    for (const post of postsToPublish) {
      // Trigger publishing logic
      await POST(new NextRequest(request.url, {
        method: 'POST',
        body: JSON.stringify({
          content: post.content,
          platforms: post.platforms,
          category: post.category,
          hashtags: post.hashtags,
          mediaUrl: post.mediaUrl
        })
      }));

      // Update post status
      await updateDoc(doc(db, 'socialPosts', post.id), {
        status: 'published',
        publishedAt: serverTimestamp()
      });
    }

    return NextResponse.json({
      success: true,
      published: postsToPublish.length
    });

  } catch (error: any) {
    console.error('Error processing scheduled posts:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process scheduled posts' },
      { status: 500 }
    );
  }
}