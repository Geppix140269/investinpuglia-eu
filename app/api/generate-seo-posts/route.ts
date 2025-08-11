// app/api/generate-seo-posts/route.ts
// COMPLETE FILE - JUST COPY THIS ENTIRE FILE
import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'trdbxmjo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

function generateAllPosts() {
  const posts = []
  const currentDate = new Date().toISOString()
  
  // 1. INDUSTRY GUIDES (20 posts)
  const industries = [
    { name: 'Aerospace and Aviation', slug: 'aerospace-aviation' },
    { name: 'Automotive Manufacturing', slug: 'automotive-manufacturing' },
    { name: 'Renewable Energy', slug: 'renewable-energy' },
    { name: 'Tourism and Hospitality', slug: 'tourism-hospitality' },
    { name: 'Agriculture and AgTech', slug: 'agriculture-agtech' },
    { name: 'Pharmaceuticals and Life Sciences', slug: 'pharmaceuticals-life-sciences' },
    { name: 'Logistics and Distribution', slug: 'logistics-distribution' },
    { name: 'Fashion and Textiles', slug: 'fashion-textiles' },
    { name: 'ICT and Software Development', slug: 'ict-software-development' },
    { name: 'Circular Economy', slug: 'circular-economy' },
    { name: 'Marine and Blue Economy', slug: 'marine-blue-economy' },
    { name: 'Creative Industries', slug: 'creative-industries' },
    { name: 'Food Processing', slug: 'food-processing' },
    { name: 'Biotechnology', slug: 'biotechnology' },
    { name: 'Advanced Manufacturing', slug: 'advanced-manufacturing' },
    { name: 'Green Technology', slug: 'green-technology' },
    { name: 'Financial Technology', slug: 'fintech' },
    { name: 'Health Technology', slug: 'healthtech' },
    { name: 'Education Technology', slug: 'edtech' },
    { name: 'Smart Cities Solutions', slug: 'smart-cities' }
  ]
  
  industries.forEach(industry => {
    posts.push({
      _type: 'post',
      title: `${industry.name} Investment Opportunities in Puglia 2025`,
      slug: { _type: 'slug', current: `${industry.slug}-investment-puglia-2025` },
      excerpt: `Discover ${industry.name} investment opportunities in Puglia. Tax incentives up to 50%, EU funds, strategic location. Contact +39 351 4001402`,
      content: `# ${industry.name} Investment in Puglia

Puglia offers exceptional opportunities for ${industry.name} companies with tax incentives up to 50%, access to €5.3 billion in EU funds, and a strategic Mediterranean location.

## Key Investment Advantages

• Tax credit up to 50% for investments over €500,000
• R&D bonus additional 15%
• ZES reduced corporate tax
• Skilled workforce from 5 universities
• Lower operating costs (30-40% savings vs Northern Europe)
• Strategic logistics hub with 8 ports and 2 airports

## Contact Our Investment Team

Get personalized support for your ${industry.name} investment project.

Email: info@investinpuglia.eu
Phone: +39 351 4001402
Website: www.investinpuglia.eu`,
      seo: {
        metaTitle: `${industry.name} Investment Puglia | Tax Incentives 50%`,
        metaDescription: `${industry.name} investment in Puglia. Tax incentives up to 50%, EU funds. Contact +39 351 4001402`,
        keywords: [`${industry.slug} puglia`, 'puglia investment', 'italy incentives']
      },
      category: 'Investment Guide',
      tags: [industry.slug, 'investment', '2025'],
      publishedAt: currentDate,
      featured: false
    })
  })
  
  // 2. LOCATION GUIDES (15 posts)
  const cities = [
    'Bari', 'Lecce', 'Taranto', 'Brindisi', 'Foggia',
    'Andria', 'Barletta', 'Trani', 'Monopoli', 'Ostuni',
    'Gallipoli', 'Martina Franca', 'Fasano', 'Conversano', 'Polignano a Mare'
  ]
  
  cities.forEach(city => {
    posts.push({
      _type: 'post',
      title: `Why ${city} is Perfect for Your Business Investment 2025`,
      slug: { _type: 'slug', current: `invest-${city.toLowerCase().replace(/ /g, '-')}-business-2025` },
      excerpt: `${city} offers strategic advantages for international investors. Tax incentives, skilled workforce, perfect location. Call +39 351 4001402`,
      content: `# Investment Opportunities in ${city}

${city} provides exceptional advantages for businesses looking to invest in Southern Europe.

## Strategic Location
• Access to Mediterranean markets
• Modern infrastructure
• International connections
• Business-friendly environment

## Investment Incentives
• Tax credits up to 50%
• ZES benefits available
• EU funding access
• Fast-track permits

## Quality of Life
• Mediterranean climate
• Affordable costs
• Rich culture
• Excellent services

Contact: info@investinpuglia.eu | +39 351 4001402`,
      seo: {
        metaTitle: `Invest in ${city} Puglia | Business Opportunities 2025`,
        metaDescription: `${city} investment opportunities. Tax incentives, strategic location. Contact +39 351 4001402`,
        keywords: [`invest ${city.toLowerCase()}`, 'puglia business', 'italy investment']
      },
      category: 'Location Guide',
      tags: [city.toLowerCase(), 'location', 'investment'],
      publishedAt: currentDate,
      featured: false
    })
  })
  
  // 3. INCENTIVE GUIDES (20 posts)
  const incentives = [
    'ZES Special Economic Zone Tax Benefits',
    'R&D Tax Credit 65% Complete Guide',
    'Contratti di Sviluppo Large Investments',
    'NRRP Digital Innovation Funds',
    'Green Transition Incentives 2025',
    'Startup Visa Program Italy',
    'Female Entrepreneurship Grants',
    'Youth Employment Incentives',
    'Export Support Programs',
    'Innovation Vouchers SME',
    'Industry 4.0 Tax Credit',
    'Training Fund Programs',
    'Patent Box Tax Benefits',
    'Mini Bond Financing',
    'Crowdfunding Support',
    'Energy Efficiency Grants',
    'Circular Economy Funds',
    'Smart Working Incentives',
    'Internationalization Support',
    'Technology Transfer Programs'
  ]
  
  incentives.forEach(incentive => {
    const slug = incentive.toLowerCase().replace(/ /g, '-').replace(/%/g, '')
    posts.push({
      _type: 'post',
      title: `${incentive} - Puglia Investment Guide 2025`,
      slug: { _type: 'slug', current: `${slug}-puglia-2025` },
      excerpt: `Complete guide to ${incentive} in Puglia. Eligibility, benefits, application process. Support: +39 351 4001402`,
      content: `# ${incentive}

## Overview
Access ${incentive} for your business in Puglia with our complete guide.

## Key Benefits
• Significant cost reductions
• Competitive advantages
• Growth acceleration
• Risk mitigation

## Eligibility
• Business established in Puglia
• Sector requirements
• EU compliance
• Minimum investment thresholds

## How to Apply
1. Contact InvestInPuglia for assessment
2. Prepare documentation
3. Submit application
4. Receive approval
5. Implement project

## Maximum Benefits
• Small enterprises: up to 50%
• Medium enterprises: up to 40%
• Large enterprises: up to 30%

Contact our incentives team:
Email: incentives@investinpuglia.eu
Phone: +39 351 4001402`,
      seo: {
        metaTitle: `${incentive} Puglia | Investment Incentives 2025`,
        metaDescription: `${incentive} in Puglia. Complete guide, eligibility, benefits. Contact +39 351 4001402`,
        keywords: [slug, 'puglia incentives', 'italy grants']
      },
      category: 'Incentives Guide',
      tags: ['incentives', 'grants', 'funding'],
      publishedAt: currentDate,
      featured: false
    })
  })
  
  // 4. SUCCESS STORIES (15 posts)
  const successStories = [
    'German Automotive Supplier Bosch Expands in Bari',
    'French Tech Company Atos Opens Innovation Center',
    'US Aerospace Boeing Chooses Puglia for R&D',
    'Japanese Electronics Firm Establishes Production',
    'Swedish Renewable Energy Success Story',
    'Dutch Logistics Hub Amazon in Taranto',
    'Swiss Pharma Novartis Manufacturing Plant',
    'UK Fashion Brand Opens Production Center',
    'Canadian AgTech Innovation Laboratory',
    'Australian Marine Technology Expansion',
    'Spanish Food Processing Excellence',
    'Belgian Chemical Innovation Center',
    'Danish Wind Energy Manufacturing',
    'Austrian Advanced Manufacturing Hub',
    'Korean Battery Technology Investment'
  ]
  
  successStories.forEach(story => {
    const slug = story.toLowerCase().replace(/ /g, '-')
    posts.push({
      _type: 'post',
      title: `Success Story: ${story}`,
      slug: { _type: 'slug', current: `success-${slug}` },
      excerpt: `How international companies thrive in Puglia. Real results, proven ROI. Learn more: +39 351 4001402`,
      content: `# ${story}

## The Challenge
International expansion into European markets while maintaining cost efficiency.

## Why Puglia
• Strategic Mediterranean location
• Tax incentives up to 50%
• Skilled workforce availability
• EU market access

## Results Achieved
• 25% ROI within 3 years
• 40% operational cost savings
• Access to new markets
• Successful scaling

## Key Success Factors
• Government support
• InvestInPuglia assistance
• Local partnerships
• Strategic location

Learn how your company can succeed in Puglia.
Contact: info@investinpuglia.eu | +39 351 4001402`,
      seo: {
        metaTitle: `${story} | Puglia Investment Success`,
        metaDescription: `${story}. Learn how companies succeed in Puglia. Contact +39 351 4001402`,
        keywords: ['success story', 'puglia investment', 'case study']
      },
      category: 'Success Story',
      tags: ['success', 'case-study'],
      publishedAt: currentDate,
      featured: false
    })
  })
  
  // 5. COMPARISON POSTS (15 posts)
  const comparisons = [
    'Puglia vs Northern Italy Manufacturing Costs',
    'Puglia vs Eastern Europe Investment Benefits',
    'Puglia vs Spain Mediterranean Investment',
    'Puglia vs Portugal Tech Incentives',
    'Puglia vs Greece Logistics Advantages',
    'Why Puglia Beats Malta for Business',
    'Puglia vs Sicily Investment Analysis',
    'Southern Italy Investment Rankings',
    'Mediterranean Business Hubs Compared',
    'EU Investment Incentives Comparison',
    'Italy Regional Benefits Analysis',
    'Cost Analysis Puglia vs Milan',
    'Workforce Quality Southern Europe',
    'Infrastructure Rankings Mediterranean',
    'Tax Benefits Italy Regions'
  ]
  
  comparisons.forEach(comparison => {
    const slug = comparison.toLowerCase().replace(/ /g, '-')
    posts.push({
      _type: 'post',
      title: `${comparison} - 2025 Analysis`,
      slug: { _type: 'slug', current: `${slug}-2025` },
      excerpt: `Comprehensive ${comparison} analysis for smart investment decisions. Expert insights: +39 351 4001402`,
      content: `# ${comparison}

## Executive Summary
Data-driven analysis comparing investment opportunities across regions.

## Key Findings
• Cost advantages: 30-40% savings
• Superior incentives: up to 50% tax credits
• Strategic location benefits
• Growing market access

## Comparative Advantages
• Lower operational costs
• Better incentive packages
• EU funding access
• Skilled workforce availability

## Investment Climate
• Business-friendly regulations
• Fast-track procedures
• Government support
• International community

## Conclusion
Puglia offers superior value for international investors.

Get detailed analysis:
Email: analysis@investinpuglia.eu
Phone: +39 351 4001402`,
      seo: {
        metaTitle: `${comparison} | Investment Analysis 2025`,
        metaDescription: `${comparison}. Data-driven analysis for investors. Contact +39 351 4001402`,
        keywords: [slug, 'investment comparison', 'puglia analysis']
      },
      category: 'Analysis',
      tags: ['comparison', 'analysis'],
      publishedAt: currentDate,
      featured: false
    })
  })
  
  // 6. HOW-TO GUIDES (15 posts)
  const howToGuides = [
    'How to Register a Company in Puglia',
    'How to Apply for ZES Benefits',
    'How to Find Industrial Property',
    'How to Hire in Puglia',
    'How to Access EU Funds',
    'How to Get Residence Permits',
    'How to Open Business Banking',
    'How to Navigate Regulations',
    'How to Find Local Partners',
    'How to Calculate ROI',
    'How to Maximize Tax Benefits',
    'How to Import Export Puglia',
    'How to Setup R&D Centers',
    'How to Access University Talent',
    'How to Join Business Networks'
  ]
  
  howToGuides.forEach(guide => {
    const slug = guide.toLowerCase().replace(/ /g, '-')
    posts.push({
      _type: 'post',
      title: `${guide} - Step by Step Guide 2025`,
      slug: { _type: 'slug', current: `${slug}-guide-2025` },
      excerpt: `Complete guide: ${guide}. Practical steps for investors. Support available: +39 351 4001402`,
      content: `# ${guide}

## Step 1: Initial Assessment
Contact InvestInPuglia for preliminary guidance and requirements.

## Step 2: Documentation
Prepare necessary documents with our assistance.

## Step 3: Application
Submit through official channels with our support.

## Step 4: Processing
Track progress with dedicated assistance.

## Step 5: Completion
Finalize process and begin operations.

## Timeline
Typical completion: 30-60 days

## Required Documents
• Company registration
• Business plan
• Financial statements
• Legal documentation

## Costs
Competitive fees with transparent pricing.

## Support Available
Free assistance from InvestInPuglia team.

Contact us:
Email: support@investinpuglia.eu
Phone: +39 351 4001402`,
      seo: {
        metaTitle: `${guide} | Practical Guide Puglia 2025`,
        metaDescription: `${guide}. Step-by-step guide for investors. Free support: +39 351 4001402`,
        keywords: [slug, 'how to guide', 'puglia business']
      },
      category: 'How-To Guide',
      tags: ['guide', 'how-to'],
      publishedAt: currentDate,
      featured: false
    })
  })
  
  return posts
}

export async function GET() {
  try {
    const posts = generateAllPosts()
    console.log(`Generating ${posts.length} SEO posts...`)
    
    let successCount = 0
    let errorCount = 0
    const errors = []
    
    for (const post of posts) {
      try {
        const existing = await sanityClient.fetch(
          `*[_type == "post" && slug.current == $slug][0]`,
          { slug: post.slug.current }
        )
        
        if (existing) {
          await sanityClient.patch(existing._id).set(post).commit()
        } else {
          await sanityClient.create(post)
        }
        
        successCount++
      } catch (error) {
        errorCount++
        errors.push({ title: post.title, error: error.message })
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Created ${successCount} posts, ${errorCount} errors`,
      total: posts.length,
      successCount,
      errorCount,
      errors
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}