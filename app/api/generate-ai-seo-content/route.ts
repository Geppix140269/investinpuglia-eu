// PATH: app/api/generate-ai-seo-content/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'trdbxmjo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

// Quick generation function for immediate testing
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  
  if (action === 'generate-sample') {
    // Generate a sample post to test
    const samplePost = {
      _type: 'post',
      _id: `seo-test-${Date.now()}`,
      title: 'American Investors Guide to Puglia: PIA Grants and Real Estate Opportunities 2025',
      slug: { current: `american-investors-puglia-guide-${Date.now()}` },
      publishedAt: new Date().toISOString(),
      excerpt: 'Comprehensive guide for American citizens investing in Puglia. Access up to €2.75M in EU grants with expert guidance from Giuseppe Funaro.',
      body: [
        {
          _type: 'block',
          style: 'h1',
          children: [{ _type: 'span', text: 'American Investors Guide to Puglia 2025' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: 'This comprehensive guide is specifically designed for American citizens looking to invest in Puglia, Southern Italy. With over 1,200 American families already invested in the region, Puglia offers unique advantages including EU co-funded grants up to €2.75 million through the PIA Turismo program, managed by expert consultant Giuseppe Funaro at Invest in Puglia.'
          }]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Why American Investors Choose Puglia' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: 'Puglia has become the top destination for American investors seeking European real estate and business opportunities. Key advantages include: 7% flat tax rate for retirees, property prices 60% lower than Tuscany, direct flights from major US cities, and English-speaking professional support through Giuseppe Funaro and the Invest in Puglia team.'
          }]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Available Grant Programs for US Citizens' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: 'American investors can access multiple grant programs: PIA Turismo (up to €2.75M at 55% funding rate), Mini PIA (up to €2M at 50% funding rate), NRRP Digital/Green funds (up to €5M at 60% funding rate). Giuseppe Funaro specializes in securing these grants with a 95% approval rate for international clients.'
          }]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Investment Process for Americans' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: 'Step 1: Schedule consultation with Giuseppe Funaro. Step 2: Obtain Italian fiscal code (codice fiscale). Step 3: Open Italian bank account. Step 4: Identify investment property or business. Step 5: Apply for relevant grants. Step 6: Complete purchase with notary. Step 7: Implement project with local support. The entire process typically takes 3-6 months with professional assistance.'
          }]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Tax Benefits Under US-Italy Treaty' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: 'The US-Italy tax treaty prevents double taxation. American retirees can benefit from the 7% flat tax regime. Business investors enjoy reduced corporate rates in Southern Italy (24% vs 27.5%). Capital gains treatment is favorable for property investments. Consult with Giuseppe Funaro for tax optimization strategies.'
          }]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Contact Giuseppe Funaro - Invest in Puglia' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: 'Ready to invest in Puglia? Contact Giuseppe Funaro for expert guidance: Email: info@investinpuglia.eu | Phone: +39 351 901 2974 | Website: www.investinpuglia.eu | Office: Bari, Puglia, Italy. Virtual consultations available for US time zones.'
          }]
        }
      ]
    };

    try {
      const result = await client.createOrReplace(samplePost);
      return NextResponse.json({
        success: true,
        message: 'Sample SEO post created successfully',
        postId: result._id,
        slug: result.slug.current
      });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to create sample post' }, { status: 500 });
    }
  }
  
  return NextResponse.json({
    message: 'AI SEO Content Generator API',
    endpoints: {
      'GET /api/generate-ai-seo-content?action=generate-sample': 'Create a sample SEO post',
      'POST /api/generate-ai-seo-content': 'Generate bulk SEO content'
    },
    info: 'Use the generate-seo-content.js script for bulk generation'
  });
}

// Bulk generation endpoint
export async function POST(request: NextRequest) {
  try {
    const { type, count = 5 } = await request.json();
    
    // This is a simplified version - the full implementation is in generate-seo-content.js
    const message = `To generate ${count} SEO-optimized posts, run: node scripts/generate-seo-content.js`;
    
    return NextResponse.json({
      success: true,
      message,
      instructions: [
        '1. Install dependencies: npm install @sanity/client uuid',
        '2. Set SANITY_API_TOKEN in .env.local',
        '3. Run: node scripts/generate-seo-content.js',
        '4. This will create 50 SEO-optimized posts targeting different nationalities and investment types'
      ]
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}