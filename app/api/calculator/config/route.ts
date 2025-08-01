// Path: app/api/calculator/config/route.ts
// Fixed version without dynamic server usage

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Force dynamic rendering

export async function GET() {
  try {
    // Return your config data here
    // This is a placeholder - replace with your actual config
    const config = {
      version: '1.0',
      // Add your actual config here
    };

    return NextResponse.json(config);
  } catch (error) {
    console.error('Error fetching config:', error);
    return NextResponse.json(
      { error: 'Failed to fetch config' },
      { status: 500 }
    );
  }
}
