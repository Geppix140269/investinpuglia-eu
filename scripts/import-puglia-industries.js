// scripts/import-puglia-industries.js
import { config } from 'dotenv';
import { createClient } from '@sanity/client';
import OpenAI from 'openai';

config({ path: '.env.local' });

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'trdbxmjo',
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Industries to create pages for
const industries = [
  { name: 'Tourism and Hospitality', slug: 'tourism-hospitality' },
  { name: 'Renewable Energy', slug: 'renewable-energy' },
  { name: 'Agriculture and Agritech', slug: 'agriculture-agritech' },
  { name: 'Manufacturing', slug: 'manufacturing' },
  { name: 'Real Estate Development', slug: 'real-estate-development' },
  { name: 'Food and Wine', slug: 'food-wine' },
  { name: 'Logistics and Transportation', slug: 'logistics-transportation' },
  { name: 'Healthcare and Biotech', slug: 'healthcare-biotech' },
  { name: 'Technology and Startups', slug: 'technology-startups' },
  { name: 'Fashion and Textiles', slug: 'fashion-textiles' },
  { name: 'Marine and Blue Economy', slug: 'marine-blue-economy' },
  { name: 'Creative Industries', slug: 'creative-industries' },
  { name: 'Education and Training', slug: 'education-training' },
  { name: 'Aerospace and Defense', slug: 'aerospace-defense' },
  { name: 'Construction and Infrastructure', slug: 'construction-infrastructure' },
  { name: 'Retail and E-commerce', slug: 'retail-ecommerce' },
  { name: 'Financial Services', slug: 'financial-services' },
  { name: 'Green Technology', slug: 'green-technology' },
  { name: 'Cultural Heritage', slug: 'cultural-heritage' },
  { name: 'Sports and Recreation', slug: 'sports-recreation' },
  // Add more to reach 50...
];

async function generateIndustryContent(industry) {
  const prompt = `Generate detailed, SEO-optimized content for investing in the ${industry.name} sector in Puglia, Italy. 

Include:
1. A compelling hero title (60 chars max) targeting "${industry.name} investment Puglia"
2. Hero description (150 words) explaining why Puglia is ideal for ${industry.name} investments
3. Market size in euros
4. Annual growth rate percentage
5. 5 key advantages for investing in this sector in Puglia
6. 3-4 available grants/incentives with names, amounts, and descriptions
7. 3-5 major players or success stories in this sector
8. 3 specific investment opportunities with type, description, and investment range
9. Industry statistics: number of businesses, employees, annual exports, GDP contribution

Make it factual, specific to Puglia, and focused on attracting investors. Use real data where possible.

Format as JSON.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 2000,
  });

  // Clean up the response - remove markdown code blocks if present
  let content = response.choices[0].message.content;
  content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
  return JSON.parse(content);
}

async function createIndustryPage(industry) {
  try {
    console.log(`Generating content for ${industry.name}...`);
    const content = await generateIndustryContent(industry);
    
    const doc = {
      _type: 'industryPage',
      industry: industry.name,
      slug: { current: industry.slug },
      seo: {
        metaTitle: content.heroTitle,
        metaDescription: content.heroDescription.substring(0, 160),
        keywords: [
          `${industry.name} investment Puglia`,
          `invest in ${industry.name} Puglia`,
          `${industry.name} opportunities Puglia`,
          `Puglia ${industry.name} grants`,
          `${industry.name} business Puglia`,
        ],
      },
      heroTitle: content.heroTitle,
      heroDescription: content.heroDescription,
      marketSize: content.marketSize,
      growthRate: content.growthRate,
      keyAdvantages: content.keyAdvantages,
      availableGrants: content.availableGrants,
      majorPlayers: content.majorPlayers,
      investmentOpportunities: content.investmentOpportunities,
      statistics: content.statistics,
    };

    const result = await sanityClient.create(doc);
    console.log(`✅ Created industry page: ${industry.name}`);
    return result;
  } catch (error) {
    console.error(`❌ Error creating ${industry.name}:`, error.message);
    // Continue with next industry instead of stopping
    return null;
  }
}

async function importAllIndustries() {
  console.log('🚀 Starting industry pages import...');
  
  for (const industry of industries) {
    await createIndustryPage(industry);
    // Rate limiting - wait 2 seconds between API calls
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('✅ Import complete!');
}

// Run the import
importAllIndustries().catch(console.error);
