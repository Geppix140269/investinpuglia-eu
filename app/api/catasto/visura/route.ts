// app/api/catasto/visura/route.ts
// API route to fetch cadastral certificates

import { NextRequest, NextResponse } from 'next/server';
import { catastoService } from '@/lib/services/catasto.service';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { foglio, particella, subalterno, comune, provincia } = body;

    // Validate input
    if (!foglio || !particella || !comune || !provincia) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate cadastral data format
    const isValid = catastoService.validateCadastralData({
      foglio,
      particella,
      subalterno,
      comune,
      provincia
    });

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid cadastral data format' },
        { status: 400 }
      );
    }

    // Log the request in database for tracking
    await supabase.from('catasto_requests').insert({
      user_id: user.id,
      request_type: 'visura',
      property_data: { foglio, particella, subalterno, comune, provincia },
      created_at: new Date().toISOString()
    });

    // Fetch visura from Catasto API
    const visura = await catastoService.getVisuraCatastale({
      foglio,
      particella,
      subalterno,
      comune,
      provincia
    });

    // Convert blob to base64 for response
    const buffer = await visura.data.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    return NextResponse.json({
      success: true,
      document: {
        type: visura.type,
        format: visura.format,
        data: base64,
        generatedAt: visura.generatedAt
      }
    });

  } catch (error) {
    console.error('Error in visura API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cadastral certificate' },
      { status: 500 }
    );
  }
}

// ============================================
// app/api/catasto/search/route.ts
// API route to search properties by owner

import { NextRequest, NextResponse } from 'next/server';
import { catastoService } from '@/lib/services/catasto.service';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get search params
    const searchParams = request.nextUrl.searchParams;
    const fiscalCode = searchParams.get('fiscal_code');
    const provincia = searchParams.get('provincia');

    if (!fiscalCode) {
      return NextResponse.json(
        { error: 'Fiscal code is required' },
        { status: 400 }
      );
    }

    // Validate fiscal code format (Italian CF)
    const cfRegex = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;
    if (!cfRegex.test(fiscalCode.toUpperCase())) {
      return NextResponse.json(
        { error: 'Invalid fiscal code format' },
        { status: 400 }
      );
    }

    // Log the search request
    await supabase.from('catasto_requests').insert({
      user_id: user.id,
      request_type: 'search',
      search_params: { fiscal_code: fiscalCode, provincia },
      created_at: new Date().toISOString()
    });

    // Search properties
    const properties = await catastoService.searchByOwner(
      fiscalCode.toUpperCase(),
      provincia || undefined
    );

    return NextResponse.json({
      success: true,
      properties,
      count: properties.length
    });

  } catch (error) {
    console.error('Error in property search:', error);
    return NextResponse.json(
      { error: 'Failed to search properties' },
      { status: 500 }
    );
  }
}

// ============================================
// app/api/catasto/map/route.ts
// API route to fetch property maps

import { NextRequest, NextResponse } from 'next/server';
import { catastoService } from '@/lib/services/catasto.service';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { foglio, particella, subalterno, comune, provincia } = body;

    // Validate input
    if (!foglio || !particella || !comune || !provincia) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log the request
    await supabase.from('catasto_requests').insert({
      user_id: user.id,
      request_type: 'map',
      property_data: { foglio, particella, subalterno, comune, provincia },
      created_at: new Date().toISOString()
    });

    // Fetch map from Catasto API
    const map = await catastoService.getPropertyMap({
      foglio,
      particella,
      subalterno,
      comune,
      provincia
    });

    // Convert blob to base64
    const buffer = await map.data.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    return NextResponse.json({
      success: true,
      document: {
        type: map.type,
        format: map.format,
        data: base64,
        generatedAt: map.generatedAt
      }
    });

  } catch (error) {
    console.error('Error fetching property map:', error);
    return NextResponse.json(
      { error: 'Failed to fetch property map' },
      { status: 500 }
    );
  }
}
