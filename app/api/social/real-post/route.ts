import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

// Real LinkedIn posting
async function postToLinkedIn(content: string, credentials: any, mediaUrl?: string) {
  if (!credentials?.accessToken || !credentials?.organizationId) {
    throw new Error('LinkedIn credentials not configured');
  }

  const postData = {
    author: `urn:li:organization:${credentials.organizationId}`,
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

  const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${credentials.accessToken}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0'
    },
    body: JSON.stringify(postData)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`LinkedIn API error: ${response.status} - ${error}`);
  }

  return await response.json();
}

// Real Facebook posting
async function postToFacebook(content: string, credentials: any, mediaUrl?: string) {
  if (!credentials?.accessToken || !credentials?.pageId) {
    throw new Error('Facebook credentials not configured');
  }

  const params = new URLSearchParams({
    message: content,
    access_token: credentials.accessToken
  });

  if (mediaUrl) {
    params.append('link', mediaUrl);
  }

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${credentials.pageId}/feed?${params}`,
    { method: 'POST' }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Facebook API error: ${response.status} - ${error}`);
  }

  return await response.json();
}

// Real Twitter/X posting
async function postToTwitter(content: string, credentials: any) {
  if (!credentials?.bearerToken) {
    throw new Error('Twitter credentials not configured');
  }

  const response = await fetch('https://api.twitter.com/2/tweets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${credentials.bearerToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: content })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Twitter API error: ${response.status} - ${error}`);
  }

  return await response.json();
}

// Real Instagram posting (requires media)
async function postToInstagram(content: string, credentials: any, mediaUrl: string) {
  if (!credentials?.accessToken || !credentials?.businessId || !mediaUrl) {
    throw new Error('Instagram requires credentials and media');
  }

  // Step 1: Create media container
  const containerParams = new URLSearchParams({
    image_url: mediaUrl,
    caption: content,
    access_token: credentials.accessToken
  });

  const containerResponse = await fetch(
    `https://graph.facebook.com/v18.0/${credentials.businessId}/media?${containerParams}`,
    { method: 'POST' }
  );

  if (!containerResponse.ok) {
    const error = await containerResponse.text();
    throw new Error(`Instagram container error: ${containerResponse.status} - ${error}`);
  }

  const { id: containerId } = await containerResponse.json();

  // Wait a moment for container to be ready
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Step 2: Publish the container
  const publishParams = new URLSearchParams({
    creation_id: containerId,
    access_token: credentials.accessToken
  });

  const publishResponse = await fetch(
    `https://graph.facebook.com/v18.0/${credentials.businessId}/media_publish?${publishParams}`,
    { method: 'POST' }
  );

  if (!publishResponse.ok) {
    const error = await publishResponse.text();
    throw new Error(`Instagram publish error: ${publishResponse.status} - ${error}`);
  }

  return await publishResponse.json();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, platforms, mediaUrl, userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 401 }
      );
    }

    // Get user's credentials from Firebase
    const credentialsDoc = await getDoc(doc(db, 'social_credentials', userId));
    
    if (!credentialsDoc.exists()) {
      return NextResponse.json(
        { error: 'No credentials configured. Please go to Settings to add your API keys.' },
        { status: 400 }
      );
    }

    const credentials = credentialsDoc.data();
    const results: Record<string, any> = {};
    const errors: Record<string, string> = {};

    // Post to each selected platform
    for (const platform of platforms) {
      try {
        switch (platform) {
          case 'linkedin':
            if (credentials.linkedin) {
              results.linkedin = await postToLinkedIn(content, credentials.linkedin, mediaUrl);
            } else {
              errors.linkedin = 'LinkedIn credentials not configured';
            }
            break;

          case 'facebook':
            if (credentials.facebook) {
              results.facebook = await postToFacebook(content, credentials.facebook, mediaUrl);
            } else {
              errors.facebook = 'Facebook credentials not configured';
            }
            break;

          case 'twitter':
            if (credentials.twitter) {
              results.twitter = await postToTwitter(content, credentials.twitter);
            } else {
              errors.twitter = 'Twitter credentials not configured';
            }
            break;

          case 'instagram':
            if (credentials.instagram && mediaUrl) {
              results.instagram = await postToInstagram(content, credentials.instagram, mediaUrl);
            } else if (!mediaUrl) {
              errors.instagram = 'Instagram requires an image';
            } else {
              errors.instagram = 'Instagram credentials not configured';
            }
            break;

          default:
            errors[platform] = `Platform ${platform} not yet implemented`;
        }
      } catch (error: any) {
        console.error(`Error posting to ${platform}:`, error);
        errors[platform] = error.message;
      }
    }

    // Return results
    if (Object.keys(results).length === 0 && Object.keys(errors).length > 0) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Failed to post to any platform',
          errors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Posted successfully to ${Object.keys(results).length} platform(s)`,
      results,
      errors: Object.keys(errors).length > 0 ? errors : undefined
    });

  } catch (error: any) {
    console.error('Social media posting error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process social media post' },
      { status: 500 }
    );
  }
}