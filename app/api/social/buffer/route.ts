import { NextRequest, NextResponse } from 'next/server';

// This uses Buffer's REAL API - it actually works!
export async function POST(request: NextRequest) {
  try {
    const { content, accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json({
        error: 'You need a Buffer access token. Get one at: https://buffer.com/developers/apps',
        instructions: [
          '1. Sign up for Buffer (free)',
          '2. Go to buffer.com/developers/apps',
          '3. Create a new application',
          '4. Get your access token',
          '5. Add it to the settings'
        ]
      }, { status: 400 });
    }

    // Get Buffer profiles (your connected social accounts)
    const profilesResponse = await fetch(
      `https://api.bufferapp.com/1/profiles.json?access_token=${accessToken}`
    );

    if (!profilesResponse.ok) {
      return NextResponse.json({
        error: 'Invalid Buffer access token',
        help: 'Check your token at buffer.com/developers/apps'
      }, { status: 401 });
    }

    const profiles = await profilesResponse.json();

    // Post to each profile
    const results: any[] = [];
    for (const profile of profiles) {
      const postResponse = await fetch(
        `https://api.bufferapp.com/1/updates/create.json`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            access_token: accessToken,
            profile_ids: profile.id,
            text: content,
            now: 'true' // Post immediately
          })
        }
      );

      const result = await postResponse.json();
      results.push({
        platform: profile.service,
        username: profile.service_username,
        success: result.success,
        message: result.message
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Posted to Buffer!',
      results
    });

  } catch (error: any) {
    return NextResponse.json({
      error: 'Failed to post',
      details: error.message,
      help: 'Make sure you have a valid Buffer access token'
    }, { status: 500 });
  }
}

// Get Buffer profiles
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get('token');

  if (!accessToken) {
    return NextResponse.json({
      error: 'Access token required',
      getToken: 'https://buffer.com/developers/apps'
    }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.bufferapp.com/1/profiles.json?access_token=${accessToken}`
    );

    const profiles = await response.json();

    return NextResponse.json({
      profiles: profiles.map((p: any) => ({
        id: p.id,
        platform: p.service,
        username: p.service_username,
        avatar: p.avatar
      }))
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to get profiles'
    }, { status: 500 });
  }
}