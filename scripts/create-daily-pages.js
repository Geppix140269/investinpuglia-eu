// scripts/create-daily-pages.js
import { config } from 'dotenv';
import { createClient } from '@sanity/client';
import OpenAI from 'openai';

config({ path: '.env.local' });

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Additional content types to create
const contentStrategies = [
  {
    type: 'propertyType',
    examples: [
      { name: 'Boutique Hotels', slug: 'boutique-hotels-puglia' },
      { name: 'Agriturismos', slug: 'agriturismo-investment-puglia' },
      { name: 'Beach Resorts', slug: 'beach-resort-investment-puglia' },
      { name: 'Historic Palazzos', slug: 'historic-palazzo-puglia' },
      { name: 'Vacation Rentals', slug: 'vacation-rental-investment-puglia' },
      { name: 'Wine Estates', slug: 'wine-estate-investment-puglia' },
      { name: 'Olive Farms', slug: 'olive-farm-investment-puglia' },
      { name: 'Luxury Villas', slug: 'luxury-villa-investment-puglia' },
      { name: 'Commercial Centers', slug: 'commercial-center-puglia' },
      { name: 'Marina Properties', slug: 'marina-property-investment-puglia' },
    ]
  },
  {
    type: 'grantType',
    examples: [
      { name: 'PIA Turismo', slug: 'pia-turismo-grants-puglia' },
      { name: 'NIDI Grants', slug: 'nidi-grants-puglia' },
      { name: 'Cultura Crea 2.0', slug: 'cultura-crea-grants-puglia' },
      { name: 'Resto al Sud', slug: 'resto-al-sud-puglia' },
      { name: 'Digital Transformation', slug: 'digital-transformation-grants-puglia' },
    ]
  },
  {
    type: 'process',
    examples: [
      { name: 'Due Diligence Guide', slug: 'due-diligence-puglia-property' },
      { name: 'Legal Requirements', slug: 'legal-requirements-puglia-investment' },
      { name: 'Tax Benefits Guide', slug: 'tax-benefits-puglia-property' },
      { name: 'Financing Options', slug: 'financing-options-puglia' },
      { name: 'ROI Calculator Guide', slug: 'roi-calculator-puglia-investment' },
    ]
  }
];

// Track what's been created
async function getExistingPages() {
  const pages = await sanityClient.fetch(`*[_type in ["locationPage", "industryPage"]] { slug }`);
  return pages.map(p => p.slug.current);
}

async function createPropertyTypePage(property) {
  const prompt = `Create SEO content for property type investment page: "${property.name}" in Puglia, Italy.

Include:
1. Hero title (60 chars max) targeting "${property.name} investment Puglia"
2. Hero description (150 words)
3. Investment overview
4. Average prices and ROI
5. Best locations in Puglia for this property type
6. Available grants and incentives
7. Key advantages
8. Investment process

Format as JSON with these exact fields:
{
  "heroTitle": "",
  "heroDescription": "",
  "overview": "",
  "averagePrice": "",
  "expectedROI": "",
  "bestLocations": [""],
  "grants": [{"name": "", "amount": "", "description": ""}],
  "advantages": [""],
  "process": [""]
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  let content = response.choices[0].message.content;
  content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
  return JSON.parse(content);
}

async function selectAndCreatePages() {
  const existingPages = await getExistingPages();
  const pagesToCreate = [];
  
  // Select 5 pages that haven't been created yet
  for (const strategy of contentStrategies) {
    for (const example of strategy.examples) {
      if (!existingPages.includes(example.slug) && pagesToCreate.length < 5) {
        pagesToCreate.push({ ...example, type: strategy.type });
      }
    }
  }

  // Create the selected pages
  for (const page of pagesToCreate) {
    try {
      console.log(`Creating ${page.type} page: ${page.name}`);
      
      if (page.type === 'propertyType') {
        const content = await createPropertyTypePage(page);
        
        // Create as a location page (reusing existing schema)
        await sanityClient.create({
          _type: 'locationPage',
          city: page.name,
          province: 'Investment Type',
          slug: { current: page.slug },
          seo: {
            metaTitle: content.heroTitle,
            metaDescription: content.heroDescription.substring(0, 160),
            keywords: [
              `${page.name} Puglia`,
              `invest in ${page.name}`,
              `${page.name} opportunities Puglia`,
            ],
          },
          heroTitle: content.heroTitle,
          heroDescription: content.heroDescription,
          population: 0, // Not applicable
          gdpPerCapita: content.averagePrice,
          mainIndustries: content.bestLocations,
          investmentIncentives: content.grants,
          keyStatistics: {
            businesses: 0,
            airports: 0,
            universities: 0,
            exports: content.expectedROI,
          },
        });
        
        console.log(`✅ Created: ${page.name}`);
      }
      
      // Add delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`❌ Error creating ${page.name}:`, error.message);
    }
  }
  
  console.log(`✅ Created ${pagesToCreate.length} new pages`);
  return pagesToCreate;
}

// Run the script
selectAndCreatePages()
  .then(pages => {
    console.log('✅ Daily page creation complete');
    console.log('Created pages:', pages.map(p => p.name).join(', '));
  })
  .catch(console.error);
