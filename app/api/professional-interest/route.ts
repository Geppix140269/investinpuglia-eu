import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const { error } = await supabase
      .from('professional_interests')
      .insert(data);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging professional interest:', error);
    return NextResponse.json(
      { error: 'Failed to log interest' },
      { status: 500 }
    );
  }
}
