// Path: app/api/calculator/stats/route.ts
// Fixed version without dynamic server usage

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Force dynamic rendering

export async function GET() {
  try {
    // Return your stats data here
    // This is a placeholder - replace with your actual stats logic
    const stats = {
      totalCalculations: 0,
      averageSavings: 0,
      // Add your actual stats here
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
