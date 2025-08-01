// Path: app/api/professionals/[id]/route.ts
// Note: API routes do NOT use 'use client' - they run on the server

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// PUT - Update specific professional
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const professionalData = {
      ...body,
      languages: Array.isArray(body.languages) ? body.languages : [],
      specialties: Array.isArray(body.specialties) ? body.specialties : [],
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('professionals')
      .update(professionalData)
      .eq('id', params.id)
      .select();

    if (error) {
      console.error('Error updating professional:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Professional not found' }, { status: 404 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete specific professional
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('professionals')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Error deleting professional:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Professional deleted successfully' });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
