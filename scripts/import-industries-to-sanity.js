// scripts/import-industries-to-sanity.js
const https = require('https');

// Configuration
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || 'trdbxmjo';
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
const SANITY_API_TOKEN = process.env.SANITY_API_WRITE_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Sanity API endpoint
const SANITY_API_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${SANITY_DATASET}`;

// Industries to create
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
];

// Make HTTPS request
function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

// Generate content using OpenAI
async function generateIndustryContent(industry) {
  const prompt = `Generate detailed content for investing in the ${industry.name} sector in Puglia, Italy. 

Return a valid JSON object with these exact fields:
{
  "heroTitle": "string (max 60 chars)",
  "heroDescription": "string (150 words)",
  "marketSize": "string (e.g. €2.5 Billion)",
  "growthRate": "string (number only, e.g. 12.5)",
  "keyAdvantages": ["array of 5 strings"],
  "availableGrants": [
    {
      "grantName": "string",
      "amount": "string",
      "description": "string"
    }
  ],
  "majorPlayers": ["array of 3-5 company names"],
  "investmentOpportunities": [
    {
      "type": "string",
      "description": "string",
      "investmentRange": "string"
    }
  ],
  "statistics": {
    "businesses": number,
    "employees": number,
    "exports": "string",
    "contribution": "string"
  }
}`;

  const data = JSON.stringify({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 2000
  });

  const options = {
    hostname: 'api.openai.com',
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Length': data.length
    }
  };

  try {
    const response = await makeRequest(options, data);
    let content = response.choices[0].message.content;
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error generating content for ${industry.name}:`, error.message);
    // Return fallback content
    return {
      heroTitle: `${industry.name} Investment Opportunities in Puglia`,
      heroDescription: `Discover exceptional investment opportunities in Puglia's ${industry.name} sector. With strategic location, skilled workforce, and generous incentives, Puglia offers the perfect environment for your business growth.`,
      marketSize: "€1.5 Billion",
      growthRate: "8.5",
      keyAdvantages: [
        "Strategic Mediterranean location",
        "Skilled and competitive workforce",
        "40-60% investment grants available",
        "Growing market with strong demand",
        "Excellent infrastructure and connectivity"
      ],
      availableGrants: [
        {
          grantName: "Regional Investment Grant",
          amount: "Up to 50%",
          description: "Support for new investments and business expansion"
        }
      ],
      majorPlayers: ["Local Industry Leaders"],
      investmentOpportunities: [
        {
          type: "Business Expansion",
          description: "Opportunities for growth in the regional market",
          investmentRange: "€1M - €10M"
        }
      ],
      statistics: {
        businesses: 1000,
        employees: 10000,
        exports: "€500M",
        contribution: "2.5"
      }
    };
  }
}

// Create industry in Sanity
async function createIndustryInSanity(industry, content) {
  const doc = {
    _type: 'industryPage',
    industry: industry.name,
    slug: { _type: 'slug', current: industry.slug },
    seo: {
      metaTitle: content.heroTitle,
      metaDescription: content.heroDescription.substring(0, 160),
      keywords: [
        `${industry.name} investment Puglia`,
        `invest in ${industry.name} Puglia`,
        `${industry.name} opportunities Puglia`
      ]
    },
    heroTitle: content.heroTitle,
    heroDescription: content.heroDescription,
    marketSize: content.marketSize,
    growthRate: content.growthRate,
    keyAdvantages: content.keyAdvantages,
    availableGrants: content.availableGrants,
    majorPlayers: content.majorPlayers,
    investmentOpportunities: content.investmentOpportunities,
    statistics: content.statistics
  };

  const mutation = {
    mutations: [{
      create: doc
    }]
  };

  const data = JSON.stringify(mutation);
  const options = {
    hostname: `${SANITY_PROJECT_ID}.api.sanity.io`,
    path: `/v1/data/mutate/${SANITY_DATASET}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SANITY_API_TOKEN}`,
      'Content-Length': data.length
    }
  };

  return makeRequest(options, data);
}

// Main function
async function importAllIndustries() {
  console.log('🚀 Starting industry pages import...');
  console.log(`Project ID: ${SANITY_PROJECT_ID}`);
  console.log(`Dataset: ${SANITY_DATASET}`);
  
  if (!SANITY_API_TOKEN) {
    throw new Error('SANITY_API_WRITE_TOKEN is not set');
  }
  
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set');
  }

  let successCount = 0;
  let errorCount = 0;

  for (const industry of industries) {
    try {
      console.log(`\nProcessing ${industry.name}...`);
      
      // Generate content
      console.log('  Generating content...');
      const content = await generateIndustryContent(industry);
      
      // Create in Sanity
      console.log('  Creating in Sanity...');
      await createIndustryInSanity(industry, content);
      
      console.log(`✅ Created: ${industry.name}`);
      successCount++;
      
      // Wait 2 seconds between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`❌ Error with ${industry.name}:`, error.message);
      errorCount++;
    }
  }

  console.log('\n=== Import Complete ===');
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
}

// Run the import
importAllIndustries()
  .then(() => {
    console.log('\nDone!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nFatal error:', error);
    process.exit(1);
  });
