// scripts/import-puglia-locations.js
// Import script for bulk creating location pages with AI-generated content

import { createClient } from '@sanity/client';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Sanity client
const sanityClient = createClient({
  projectId: 'trdbxmjo', // Your actual project ID from sanity.config.ts
  dataset: 'production',
  apiVersion: '2025-07-27',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate SEO content using OpenAI
async function generateSEOContent(cityData) {
  const { city, province, population, mainIndustries, gdpPerCapita, businessCount } = cityData;
  
  try {
    // Generate meta title
    const titleResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an SEO expert specializing in investment promotion. Create compelling, keyword-rich meta titles (max 65 chars) that drive clicks."
        },
        {
          role: "user",
          content: `Create a meta title for a page about investing in ${city}, ${province}, Italy. Focus on business opportunities and incentives. Max 65 characters.`
        }
      ],
      temperature: 0.7,
      max_tokens: 50,
    });

    // Generate meta description
    const descriptionResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an SEO expert. Create compelling meta descriptions that include specific data and benefits."
        },
        {
          role: "user",
          content: `Create a meta description for investing in ${city}, ${province}. Include: population ${population}, main industries: ${mainIndustries}, GDP per capita €${gdpPerCapita}. Max 155 characters.`
        }
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    // Generate hero content
    const heroResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a copywriter for an investment promotion agency. Create compelling, professional content."
        },
        {
          role: "user",
          content: `Write a compelling hero section paragraph (100 words) for ${city}, highlighting why it's perfect for business investment. Mention ${mainIndustries} sectors and ${businessCount} existing businesses.`
        }
      ],
      temperature: 0.8,
      max_tokens: 150,
    });

    // Generate unique selling points
    const uspResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `List 5 unique investment advantages for ${city}, ${province}. Consider: ${mainIndustries} industries, population ${population}, strategic location. Format as JSON array of strings.`
        }
      ],
      temperature: 0.8,
      max_tokens: 200,
    });

    return {
      metaTitle: titleResponse.choices[0].message.content.trim(),
      metaDescription: descriptionResponse.choices[0].message.content.trim(),
      heroContent: heroResponse.choices[0].message.content.trim(),
      uniqueSellingPoints: JSON.parse(uspResponse.choices[0].message.content),
    };
  } catch (error) {
    console.error(`Error generating content for ${city}:`, error);
    // Fallback content if AI fails
    return {
      metaTitle: `Invest in ${city}, ${province} - Business Opportunities`,
      metaDescription: `Discover investment opportunities in ${city}. Population: ${population}. Key industries: ${mainIndustries}. Strategic location in Puglia.`,
      heroContent: `${city} offers exceptional investment opportunities with a thriving economy and strategic location.`,
      uniqueSellingPoints: [
        `Population of ${population} providing skilled workforce`,
        `Key industries: ${mainIndustries}`,
        `Strategic location in ${province}`,
        `Competitive business costs`,
        `EU investment incentives available`
      ],
    };
  }
}

// Function to create location document
async function createLocationDocument(cityData, aiContent) {
  const slug = `invest-in-${cityData.city}-${cityData.province}`
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  const document = {
    _id: `location-${slug}`,
    _type: 'locationPage',
    city: cityData.city,
    province: cityData.province,
    slug: {
      current: slug,
    },
    seo: {
      metaTitle: aiContent.metaTitle,
      metaDescription: aiContent.metaDescription,
      focusKeyword: `invest in ${cityData.city}`,
      keywords: [
        `${cityData.city} business`,
        `${cityData.province} investment`,
        `${cityData.city} incentives`,
        ...cityData.mainIndustries.split(',').map(i => `${i.trim()} ${cityData.city}`),
      ],
    },
    heroTitle: `Investment Opportunities in ${cityData.city}`,
    heroDescription: aiContent.heroContent,
    population: parseInt(cityData.population),
    gdpPerCapita: parseFloat(cityData.gdpPerCapita),
    coordinates: {
      lat: parseFloat(cityData.latitude),
      lng: parseFloat(cityData.longitude),
    },
    mainIndustries: cityData.mainIndustries.split(',').map(i => i.trim()),
    uniqueSellingPoints: aiContent.uniqueSellingPoints,
    keyStatistics: {
      businessCount: parseInt(cityData.businessCount),
      unemploymentRate: parseFloat(cityData.unemploymentRate),
      averageRent: parseFloat(cityData.averageRent),
      skillsAvailability: cityData.skillsAvailability,
    },
    investmentIncentives: [
      {
        _key: 'regional-tax',
        title: 'Regional Tax Credit',
        description: 'Up to 40% tax credit for investments in machinery and equipment',
        percentage: 40,
      },
      {
        _key: 'employment-grant',
        title: 'Employment Incentives',
        description: 'Grants up to €8,000 per employee for new hires',
        percentage: 30,
      },
      {
        _key: 'rd-bonus',
        title: 'R&D Tax Bonus',
        description: 'Additional 20% tax credit for research and development activities',
        percentage: 20,
      },
    ],
    transportLinks: [
      {
        _key: `airport-${cityData.city}`,
        type: 'Airport',
        name: cityData.nearestAirport,
        distance: cityData.airportDistance,
      },
      {
        _key: `port-${cityData.city}`,
        type: 'Port',
        name: cityData.nearestPort,
        distance: cityData.portDistance,
      },
    ],
    publishedAt: new Date().toISOString(),
  };

  return document;
}

// Main import function
async function importLocations() {
  console.log('🚀 Starting Puglia locations import...\n');

  // Read CSV file
  const csvPath = path.join(process.cwd(), 'data', 'puglia-cities.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  
  // Parse CSV
  const locations = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });

  console.log(`📊 Found ${locations.length} locations to import\n`);

  // Process in batches to avoid rate limits
  const batchSize = 5;
  const batches = [];
  
  for (let i = 0; i < locations.length; i += batchSize) {
    batches.push(locations.slice(i, i + batchSize));
  }

  let successCount = 0;
  let errorCount = 0;

  // Process each batch
  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    console.log(`\n📦 Processing batch ${batchIndex + 1}/${batches.length}`);

    const batchPromises = batch.map(async (location) => {
      try {
        // Generate AI content
        console.log(`🤖 Generating content for ${location.city}...`);
        const aiContent = await generateSEOContent(location);
        
        // Create document
        const document = await createLocationDocument(location, aiContent);
        
        // Upload to Sanity
        await sanityClient.createOrReplace(document);
        
        console.log(`✅ Successfully imported: ${location.city}, ${location.province}`);
        successCount++;
        
        return { success: true, city: location.city };
      } catch (error) {
        console.error(`❌ Error importing ${location.city}:`, error.message);
        errorCount++;
        return { success: false, city: location.city, error: error.message };
      }
    });

    // Wait for batch to complete
    await Promise.all(batchPromises);
    
    // Add delay between batches to respect rate limits
    if (batchIndex < batches.length - 1) {
      console.log('\n⏳ Waiting 5 seconds before next batch...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  console.log('\n📊 Import Summary:');
  console.log(`✅ Successfully imported: ${successCount} locations`);
  console.log(`❌ Failed imports: ${errorCount} locations`);
  console.log('\n🎉 Import process completed!');
}

// Run the import
importLocations().catch(console.error);

// Instructions for running this script:
/*
1. Save the CSV file as 'data/puglia-cities.csv' in your project root
2. Make sure you have these environment variables set:
   - OPENAI_API_KEY
   - SANITY_PROJECT_ID
   - SANITY_DATASET
   - SANITY_API_WRITE_TOKEN
3. Install required dependencies:
   npm install openai csv-parse dotenv
4. Run the script:
   node scripts/import-puglia-locations.js
*/
