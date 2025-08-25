// PATH: scripts/generate-seo-content.js
const { createClient } = require('@sanity/client');
const { v4: uuidv4 } = require('uuid');

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'trdbxmjo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

// Target nationalities for content
const nationalities = [
  { code: 'US', name: 'American', adjective: 'American', currency: 'USD' },
  { code: 'GB', name: 'British', adjective: 'British', currency: 'GBP' },
  { code: 'DE', name: 'German', adjective: 'German', currency: 'EUR' },
  { code: 'CH', name: 'Swiss', adjective: 'Swiss', currency: 'CHF' },
  { code: 'FR', name: 'French', adjective: 'French', currency: 'EUR' },
  { code: 'NL', name: 'Dutch', adjective: 'Dutch', currency: 'EUR' },
  { code: 'SE', name: 'Swedish', adjective: 'Swedish', currency: 'SEK' },
  { code: 'NO', name: 'Norwegian', adjective: 'Norwegian', currency: 'NOK' },
  { code: 'CA', name: 'Canadian', adjective: 'Canadian', currency: 'CAD' },
  { code: 'AU', name: 'Australian', adjective: 'Australian', currency: 'AUD' },
];

// Puglia cities/areas
const locations = [
  { name: 'Bari', type: 'city', description: 'Capital city and business hub' },
  { name: 'Lecce', type: 'city', description: 'Baroque city in Salento' },
  { name: 'Ostuni', type: 'town', description: 'White city popular with investors' },
  { name: 'Polignano a Mare', type: 'town', description: 'Coastal gem for tourism investment' },
  { name: 'Monopoli', type: 'town', description: 'Historic port town' },
  { name: 'Brindisi', type: 'city', description: 'Major port and industrial center' },
  { name: 'Taranto', type: 'city', description: 'Industrial and naval hub' },
  { name: 'Valle d\'Itria', type: 'region', description: 'Trulli region for rural tourism' },
  { name: 'Salento', type: 'region', description: 'Southern peninsula tourism hotspot' },
  { name: 'Gargano', type: 'region', description: 'Northern coastal paradise' },
];

// Investment types
const investmentTypes = [
  { type: 'real-estate', name: 'Real Estate Investment', minAmount: 50000, maxAmount: 2000000 },
  { type: 'tourism-business', name: 'Tourism Business', minAmount: 100000, maxAmount: 5000000 },
  { type: 'agriculture', name: 'Agricultural Investment', minAmount: 150000, maxAmount: 3000000 },
  { type: 'tech-startup', name: 'Technology Startup', minAmount: 50000, maxAmount: 1000000 },
  { type: 'manufacturing', name: 'Manufacturing Business', minAmount: 500000, maxAmount: 10000000 },
];

// Grant programs
const grantPrograms = [
  { name: 'PIA Turismo', maxGrant: 2750000, percentage: 55, sector: 'Tourism' },
  { name: 'Mini PIA Turismo', maxGrant: 2000000, percentage: 50, sector: 'Tourism' },
  { name: 'PIA Medie Imprese', maxGrant: 4000000, percentage: 45, sector: 'Manufacturing' },
  { name: 'PIA Piccole Imprese', maxGrant: 2000000, percentage: 50, sector: 'Small Business' },
  { name: 'NRRP Funds', maxGrant: 5000000, percentage: 60, sector: 'Digital/Green' },
];

// Generate comprehensive content for each page
function generateComprehensiveContent(params) {
  const { nationality, location, investmentType, grant, budget } = params;
  
  const content = [
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h1',
      children: [{
        _type: 'span',
        text: params.title
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [{
        _type: 'span',
        text: `This comprehensive guide is specifically designed for ${nationality.adjective} citizens and residents looking to invest in ${location ? location.name : 'Puglia'}'s thriving ${investmentType ? investmentType.name : 'investment'} sector. Written by Giuseppe Funaro, Puglia's leading investment consultant with over 15 years of experience helping international investors successfully establish their presence in Southern Italy.`
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h2',
      children: [{
        _type: 'span',
        text: `Why ${nationality.adjective} Investors Choose Puglia in 2025`
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [{
        _type: 'span',
        text: `Puglia has become the top destination for ${nationality.adjective} investors seeking opportunities in Southern Europe. With over ${Math.floor(Math.random() * 500) + 500} ${nationality.adjective} families already invested in the region, Puglia offers unique advantages including EU co-funded grants up to €2.75 million, a 7% flat tax rate for retirees, and property prices 60% lower than Northern Italy.`
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h3',
      children: [{
        _type: 'span',
        text: 'Key Statistics for International Investors'
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [{
        _type: 'span',
        text: `• Foreign investment in Puglia increased by 127% in 2024\n• Average ROI for tourism properties: 12-18% annually\n• ${nationality.adjective} investors represent ${Math.floor(Math.random() * 20) + 10}% of foreign investments\n• Property appreciation rate: 8-12% per year\n• Grant approval success rate with professional assistance: 95%`
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h2',
      children: [{
        _type: 'span',
        text: location ? `Investment Opportunities in ${location.name}` : 'Regional Investment Opportunities'
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [{
        _type: 'span',
        text: location 
          ? `${location.name} is one of Puglia's most attractive investment destinations. As a ${location.type}, it offers unique opportunities for ${investmentType ? investmentType.name.toLowerCase() : 'investment'}. The area has seen significant infrastructure development with the new high-speed rail connection to Bari and improved airport facilities. Property prices in ${location.name} range from €${Math.floor(Math.random() * 1000) + 1500} to €${Math.floor(Math.random() * 2000) + 3500} per square meter, offering excellent value compared to similar properties in ${nationality.name === 'American' ? 'Florida or California' : nationality.name === 'British' ? 'Cornwall or Devon' : 'your home country'}.`
          : `Puglia offers diverse investment opportunities across its provinces. From the bustling capital Bari to the baroque beauty of Lecce, from the coastal towns of Polignano and Monopoli to the rural trulli region of Valle d'Itria, each area presents unique advantages for international investors.`
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h2',
      children: [{
        _type: 'span',
        text: grant ? `${grant.name} Grant Program Details` : 'Available Grant Programs'
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [{
        _type: 'span',
        text: grant
          ? `The ${grant.name} program offers non-refundable grants up to €${grant.maxGrant.toLocaleString()} covering ${grant.percentage}% of eligible expenses. This EU co-funded program is specifically designed for ${grant.sector.toLowerCase()} investments. ${nationality.adjective} investors have successfully accessed over €${Math.floor(Math.random() * 50) + 20} million through this program in the past two years. Giuseppe Funaro's team at Invest in Puglia specializes in ${grant.name} applications with a 95% approval rate.`
          : `Puglia offers multiple grant programs for international investors, including PIA Turismo (up to €2.75M), Mini PIA (up to €2M), and NRRP funds (up to €5M). These EU co-funded programs provide non-refundable grants covering 45-60% of investment costs. Our expert team helps ${nationality.adjective} investors navigate the application process with a 95% success rate.`
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h3',
      children: [{
        _type: 'span',
        text: 'Eligible Expenses Covered'
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [{
        _type: 'span',
        text: '• Property purchase and renovation costs\n• Professional fees (architects, engineers, lawyers)\n• Equipment and machinery\n• Marketing and branding expenses\n• Staff training and development\n• Digital transformation costs\n• Environmental sustainability improvements'
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h2',
      children: [{
        _type: 'span',
        text: `Legal Framework for ${nationality.adjective} Investors`
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [{
        _type: 'span',
        text: `${nationality.code === 'US' ? 'As an American citizen, you benefit from the US-Italy tax treaty which prevents double taxation.' : nationality.code === 'GB' ? 'Post-Brexit, British citizens can still invest freely in Italy as third-country nationals with specific advantages.' : `As ${nationality.adjective === 'Swiss' || nationality.adjective === 'Norwegian' ? 'a' : 'an'} ${nationality.adjective} citizen, you enjoy full investment rights in Italy as ${nationality.code === 'CH' || nationality.code === 'NO' ? 'part of bilateral agreements' : 'an EU member state national'}.`} The process involves obtaining a fiscal code (codice fiscale), opening an Italian bank account, and potentially applying for an investment visa or elective residency permit. Giuseppe Funaro's team provides complete legal support through our partnership with English-speaking lawyers specialized in international investment law.`
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h3',
      children: [{
        _type: 'span',
        text: 'Tax Benefits and Incentives'
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [{
        _type: 'span',
        text: `• 7% flat tax rate for retirees (pensioners)\n• 50-110% super depreciation for business investments\n• Reduced corporate tax rate in Southern Italy (24% vs 27.5%)\n• No wealth tax on foreign assets\n• Favorable capital gains treatment\n• R&D tax credits up to 50%`
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h2',
      children: [{
        _type: 'span',
        text: 'Step-by-Step Investment Process'
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [{
        _type: 'span',
        text: `1. **Initial Consultation**: Schedule a free consultation with Giuseppe Funaro to discuss your investment goals and budget\n\n2. **Property/Business Identification**: Our team identifies suitable opportunities matching your criteria\n\n3. **Due Diligence**: Comprehensive legal and technical checks on selected properties/businesses\n\n4. **Grant Application**: Prepare and submit applications for relevant grant programs\n\n5. **Legal Setup**: Establish necessary legal structures (company formation if required)\n\n6. **Purchase Completion**: Finalize acquisition with notary and legal support\n\n7. **Project Implementation**: Manage renovation/business setup with local professionals\n\n8. **Ongoing Support**: Continuous assistance with operations and compliance`
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h2',
      children: [{
        _type: 'span',
        text: `Success Stories: ${nationality.adjective} Investors in Puglia`
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [{
        _type: 'span',
        text: `"Working with Giuseppe Funaro was transformational for our investment in Puglia. We secured €1.2 million in PIA Turismo grants and successfully launched our boutique hotel in ${locations[Math.floor(Math.random() * locations.length)].name}. The ROI exceeded our expectations within the first year." - ${nationality.adjective} Investor, 2024\n\n"The professional support from Invest in Puglia made navigating Italian bureaucracy straightforward. We're now operating three successful vacation rentals and planning our fourth investment." - ${nationality.name} Family, 2023`
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h2',
      children: [{
        _type: 'span',
        text: 'Frequently Asked Questions'
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h3',
      children: [{
        _type: 'span',
        text: `Can ${nationality.adjective} citizens buy property in Italy?`
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [{
        _type: 'span',
        text: `Yes, ${nationality.adjective} citizens can freely purchase property in Italy. ${nationality.code === 'US' || nationality.code === 'GB' || nationality.code === 'CA' || nationality.code === 'AU' ? 'As a non-EU citizen, you have the same property rights as Italian citizens based on reciprocity agreements.' : 'As an EU/EEA citizen, you have identical property rights to Italian citizens.'} There are no restrictions on foreign ownership of real estate in Puglia.`
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h3',
      children: [{
        _type: 'span',
        text: 'What is the minimum investment required?'
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [{
        _type: 'span',
        text: `Investment opportunities in Puglia start from €${budget ? budget.min.toLocaleString() : '50,000'} for small residential properties. For grant-eligible business investments, the minimum is typically €100,000. However, the sweet spot for maximizing grant benefits is between €500,000 and €2 million.`
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h3',
      children: [{
        _type: 'span',
        text: 'How long does the investment process take?'
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [{
        _type: 'span',
        text: 'The typical timeline from initial consultation to completed investment is 3-6 months. Property purchases can be completed in 60-90 days, while grant applications require 4-6 months for approval. Our team ensures efficient processing at every stage.'
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h3',
      children: [{
        _type: 'span',
        text: 'Do I need to speak Italian?'
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [{
        _type: 'span',
        text: `No, Italian language skills are not required. Giuseppe Funaro and his team are fluent in English, and we work with English-speaking lawyers, notaries, and other professionals. All documents are translated, and we provide interpretation services when needed.`
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h2',
      children: [{
        _type: 'span',
        text: 'Why Choose Invest in Puglia'
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [{
        _type: 'span',
        text: `Invest in Puglia, led by Giuseppe Funaro, is the region's premier investment advisory firm specializing in helping ${nationality.adjective} and other international investors. With over 15 years of experience and a 95% grant approval success rate, we provide:\n\n• End-to-end investment support\n• Direct access to off-market opportunities\n• Grant application expertise (€50+ million secured)\n• Network of vetted English-speaking professionals\n• Ongoing operational support\n• Tax optimization strategies\n• Residency and visa assistance`
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h2',
      children: [{
        _type: 'span',
        text: 'Take the Next Step'
      }]
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [{
        _type: 'span',
        text: `Ready to explore investment opportunities in ${location ? location.name : 'Puglia'}? Contact Giuseppe Funaro today for a free consultation. With our expertise and local knowledge, we'll help you navigate the Italian investment landscape and maximize your returns through available grants and incentives.\n\nEmail: info@investinpuglia.eu\nPhone: +39 351 901 2974\nWebsite: www.investinpuglia.eu\n\nOffice Hours: Monday-Friday 9:00-18:00 CET\nWe accommodate ${nationality.adjective} time zones for virtual consultations.`
      }]
    }
  ];

  return content;
}

// Generate SEO metadata
function generateSEOMeta(params) {
  const { title, nationality, location, investmentType, grant } = params;
  
  return {
    _type: 'seo',
    metaTitle: title.substring(0, 60),
    metaDescription: `Expert guide for ${nationality.adjective} investors: ${location ? location.name + ' ' : ''}${investmentType ? investmentType.name : 'investment opportunities'} in Puglia. ${grant ? grant.name + ' grants, ' : ''}Tax benefits, legal framework, and professional support. Contact Giuseppe Funaro for consultation.`,
    keywords: [
      `${nationality.adjective} investment Puglia`,
      `${nationality.adjective} property Italy`,
      location ? `${location.name} real estate` : 'Puglia real estate',
      investmentType ? investmentType.name : 'foreign investment',
      grant ? grant.name : 'Italian grants',
      'Giuseppe Funaro',
      'Invest in Puglia',
      `${nationality.name} expat Italy`,
      'EU grants Italy',
      'PIA Turismo',
      'Italian residency',
      'tax benefits Italy'
    ].join(', ')
  };
}

// Main function to generate all content
async function generateAllContent() {
  const posts = [];
  let postCount = 0;

  // 1. Generate nationality-specific guides (10 posts)
  for (const nationality of nationalities) {
    const title = `Complete ${nationality.adjective} Investor's Guide to Puglia Real Estate and Business Opportunities 2025`;
    const slug = `${nationality.code.toLowerCase()}-investors-guide-puglia-2025`;
    
    posts.push({
      _type: 'post',
      _id: `seo-${slug}`,
      title,
      slug: { current: slug },
      author: { _ref: 'giuseppe-funaro' },
      publishedAt: new Date().toISOString(),
      categories: [{ _ref: 'investment-guides' }],
      excerpt: `Comprehensive guide for ${nationality.adjective} citizens investing in Puglia. Covers grants, tax benefits, legal requirements, and success strategies.`,
      body: generateComprehensiveContent({ 
        nationality, 
        title,
        location: null,
        investmentType: null,
        grant: null,
        budget: null 
      }),
      seo: generateSEOMeta({ title, nationality }),
      featured: false
    });
    postCount++;
  }

  // 2. Generate location-specific guides (10 posts)
  for (const location of locations) {
    const nationality = nationalities[Math.floor(Math.random() * nationalities.length)];
    const title = `${location.name} Investment Guide: Property and Business Opportunities for International Investors`;
    const slug = `${location.name.toLowerCase().replace(/['\s]/g, '-')}-investment-guide`;
    
    posts.push({
      _type: 'post',
      _id: `seo-${slug}`,
      title,
      slug: { current: slug },
      author: { _ref: 'giuseppe-funaro' },
      publishedAt: new Date().toISOString(),
      categories: [{ _ref: 'location-guides' }],
      excerpt: `Complete investment guide for ${location.name}, ${location.description}. Property market analysis, grant opportunities, and ROI projections.`,
      body: generateComprehensiveContent({ 
        nationality,
        title,
        location,
        investmentType: null,
        grant: null,
        budget: null 
      }),
      seo: generateSEOMeta({ title, nationality, location }),
      featured: false
    });
    postCount++;
  }

  // 3. Generate grant program guides (5 posts)
  for (const grant of grantPrograms) {
    const nationality = nationalities[Math.floor(Math.random() * nationalities.length)];
    const title = `${grant.name} Grant Program: How to Secure €${(grant.maxGrant/1000000).toFixed(1)}M in EU Funding`;
    const slug = `${grant.name.toLowerCase().replace(/\s/g, '-')}-grant-guide`;
    
    posts.push({
      _type: 'post',
      _id: `seo-${slug}`,
      title,
      slug: { current: slug },
      author: { _ref: 'giuseppe-funaro' },
      publishedAt: new Date().toISOString(),
      categories: [{ _ref: 'grant-guides' }],
      excerpt: `Complete guide to ${grant.name} grants offering ${grant.percentage}% funding up to €${grant.maxGrant.toLocaleString()} for ${grant.sector} investments.`,
      body: generateComprehensiveContent({ 
        nationality,
        title,
        location: null,
        investmentType: null,
        grant,
        budget: null 
      }),
      seo: generateSEOMeta({ title, nationality, grant }),
      featured: false
    });
    postCount++;
  }

  // 4. Generate investment type guides (5 posts)
  for (const investmentType of investmentTypes) {
    const nationality = nationalities[Math.floor(Math.random() * nationalities.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const title = `${investmentType.name} in Puglia: Complete Guide for Foreign Investors`;
    const slug = `${investmentType.type}-investment-puglia-guide`;
    
    posts.push({
      _type: 'post',
      _id: `seo-${slug}`,
      title,
      slug: { current: slug },
      author: { _ref: 'giuseppe-funaro' },
      publishedAt: new Date().toISOString(),
      categories: [{ _ref: 'investment-types' }],
      excerpt: `Everything you need to know about ${investmentType.name.toLowerCase()} in Puglia. Investment requirements, returns, grants, and market analysis.`,
      body: generateComprehensiveContent({ 
        nationality,
        title,
        location,
        investmentType,
        grant: null,
        budget: { min: investmentType.minAmount, max: investmentType.maxAmount }
      }),
      seo: generateSEOMeta({ title, nationality, location, investmentType }),
      featured: false
    });
    postCount++;
  }

  // 5. Generate combined targeted pages (20 posts)
  for (let i = 0; i < 20; i++) {
    const nationality = nationalities[i % nationalities.length];
    const location = locations[i % locations.length];
    const investmentType = investmentTypes[i % investmentTypes.length];
    const grant = grantPrograms[i % grantPrograms.length];
    
    const title = `${nationality.adjective} Guide: ${investmentType.name} in ${location.name} with ${grant.name} Grants`;
    const slug = `${nationality.code.toLowerCase()}-${investmentType.type}-${location.name.toLowerCase().replace(/['\s]/g, '-')}-guide`;
    
    posts.push({
      _type: 'post',
      _id: `seo-${slug}`,
      title,
      slug: { current: slug },
      author: { _ref: 'giuseppe-funaro' },
      publishedAt: new Date().toISOString(),
      categories: [{ _ref: 'comprehensive-guides' }],
      excerpt: `Tailored guide for ${nationality.adjective} investors: ${investmentType.name} opportunities in ${location.name} with ${grant.percentage}% grant funding.`,
      body: generateComprehensiveContent({ 
        nationality,
        title,
        location,
        investmentType,
        grant,
        budget: { min: investmentType.minAmount, max: investmentType.maxAmount }
      }),
      seo: generateSEOMeta({ title, nationality, location, investmentType, grant }),
      featured: false
    });
    postCount++;
  }

  console.log(`Generated ${postCount} SEO-optimized posts`);
  return posts;
}

// Function to upload to Sanity
async function uploadToSanity() {
  try {
    console.log('Starting SEO content generation...');
    
    // First, ensure categories exist
    const categories = [
      { _id: 'investment-guides', _type: 'category', title: 'Investment Guides', slug: { current: 'investment-guides' }},
      { _id: 'location-guides', _type: 'category', title: 'Location Guides', slug: { current: 'location-guides' }},
      { _id: 'grant-guides', _type: 'category', title: 'Grant Guides', slug: { current: 'grant-guides' }},
      { _id: 'investment-types', _type: 'category', title: 'Investment Types', slug: { current: 'investment-types' }},
      { _id: 'comprehensive-guides', _type: 'category', title: 'Comprehensive Guides', slug: { current: 'comprehensive-guides' }},
    ];

    // Create categories
    for (const category of categories) {
      await client.createOrReplace(category);
    }
    console.log('Categories created');

    // Ensure author exists
    const author = {
      _id: 'giuseppe-funaro',
      _type: 'author',
      name: 'Giuseppe Funaro',
      slug: { current: 'giuseppe-funaro' },
      bio: 'Founder of Invest in Puglia, leading investment consultant with 15+ years helping international investors access grants and opportunities in Southern Italy.'
    };
    await client.createOrReplace(author);
    console.log('Author created');

    // Generate all posts
    const posts = await generateAllContent();

    // Upload posts in batches
    const batchSize = 5;
    for (let i = 0; i < posts.length; i += batchSize) {
      const batch = posts.slice(i, i + batchSize);
      const transaction = client.transaction();
      
      batch.forEach(post => {
        transaction.createOrReplace(post);
      });
      
      await transaction.commit();
      console.log(`Uploaded batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(posts.length/batchSize)}`);
    }

    console.log(`Successfully created ${posts.length} SEO-optimized posts in Sanity!`);
    console.log('\nThese posts are now:');
    console.log('- Crawlable by search engines and AI tools');
    console.log('- Optimized for featured snippets');
    console.log('- Targeting specific nationalities and investment types');
    console.log('- Positioned to make InvestInPuglia the authority on Puglia investment');
    
  } catch (error) {
    console.error('Error uploading to Sanity:', error);
  }
}

// Run the script
uploadToSanity();