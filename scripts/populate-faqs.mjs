import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'trdbxmjo',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skKkuzBcFyUvQUZPfXLxY1nFkVb6MkhWzxPzpr4ubmSqceLQXfceOMMcd7nR3S9DgQqO1lSD8gat258cYUwznOtOwru4QzWnQYclkO4HpNOKgnQLyuMo0SDXCiekakuTR5IUe098wmng2DTGMsijyVprXSkzVvRtQ0zO6C14dOQhoAs9CKnd'
})

const faqs = [
  // Homepage FAQs
  {
    _type: 'faq',
    question: "What is InvestInPuglia and how can it help me invest in Italy?",
    answer: "InvestInPuglia is a specialized consultancy that helps international investors access EU grants (up to €2.5M) and navigate property investments in Puglia, Italy. We provide end-to-end support including property search, legal assistance, grant applications, and renovation management.",
    category: 'general',
    pages: ['home', 'about'],
    order: 1,
    isActive: true
  },
  {
    _type: 'faq',
    question: "How much grant funding can I receive for my investment in Puglia?",
    answer: "Through the Mini PIA program, you can receive 45-55% non-refundable grants on eligible investments ranging from €50,000 to €5 million. The maximum grant amount is €2.5 million. Historic properties like Trulli can qualify for up to 55% funding.",
    category: 'grants',
    pages: ['home', 'miniPiaGuide', 'services'],
    order: 2,
    isActive: true
  },
  {
    _type: 'faq',
    question: "Do I need to speak Italian to invest in Puglia?",
    answer: "No, you don't need to speak Italian. Our team provides full support in English and other languages. We handle all communications with local authorities, contractors, and government agencies on your behalf.",
    category: 'general',
    pages: ['home', 'about', 'contact'],
    order: 3,
    isActive: true
  },
  {
    _type: 'faq',
    question: "What types of properties qualify for EU grants in Puglia?",
    answer: "Eligible properties include hotels, B&Bs, agriturismos, restaurants, historic buildings (especially Trulli), and properties for tourism or manufacturing use. The property must be used for business purposes to qualify for grants.",
    category: 'properties',
    pages: ['home', 'properties', 'miniPiaGuide'],
    order: 4,
    isActive: true
  },
  {
    _type: 'faq',
    question: "How long does the entire investment process take?",
    answer: "The typical timeline is 18-24 months from initial consultation to operational business. This includes 3-6 months for preparation, 2-3 months for grant application review, and 12-18 months for property renovation and setup.",
    category: 'process',
    pages: ['home', 'investmentProcess', 'services'],
    order: 5,
    isActive: true
  },
  // Services FAQs
  {
    _type: 'faq',
    question: "What services does InvestInPuglia provide?",
    answer: "We offer comprehensive services including property search and due diligence, grant application preparation, company formation, legal and tax advisory, renovation project management, and operational support. Our services cover every aspect of your investment journey.",
    category: 'services',
    pages: ['services', 'about'],
    order: 6,
    isActive: true
  },
  {
    _type: 'faq',
    question: "How much do your services cost?",
    answer: "Our services start from €1,500 for property search and range up to full project management at 5-8% of the grant amount. We offer transparent pricing with no hidden fees. Many clients recover our fees through the grants we help them secure.",
    category: 'services',
    pages: ['services', 'bookConsultation'],
    order: 7,
    isActive: true
  },
  // Properties FAQs
  {
    _type: 'faq',
    question: "Can foreigners buy property in Italy?",
    answer: "Yes, EU citizens can buy property freely in Italy. Non-EU citizens can also purchase property, though some reciprocity agreements apply. We help navigate all legal requirements for international buyers.",
    category: 'legal',
    pages: ['properties', 'investmentProcess'],
    order: 8,
    isActive: true
  },
  {
    _type: 'faq',
    question: "What is the average ROI on Puglia property investments?",
    answer: "Tourism properties in Puglia typically generate 15-25% annual ROI, with some achieving 30%+ when combined with EU grants. The region has seen 74% growth in foreign tourism demand over 4 years.",
    category: 'properties',
    pages: ['properties', 'portfolio'],
    order: 9,
    isActive: true
  },
  // Grant FAQs
  {
    _type: 'faq',
    question: "What is the Mini PIA grant program?",
    answer: "Mini PIA (Piccoli Investimenti Aziendali) is a regional grant program offering 45-55% non-refundable funding for business investments in Puglia. It's co-funded by the EU and designed to stimulate economic development in the region.",
    category: 'grants',
    pages: ['miniPiaGuide', 'tools'],
    order: 10,
    isActive: true
  }
]

const pageLinks = [
  {
    _type: 'pageLinks',
    page: 'home',
    seoTitle: 'Discover More About Investing in Puglia',
    relatedLinks: [
      { href: '/mini-pia-guide', text: 'Complete Mini PIA Grant Guide', description: 'Learn how to access up to €2.5M in grants' },
      { href: '/properties', text: 'Browse Investment Properties', description: 'Explore available properties in Puglia' },
      { href: '/services', text: 'Professional Investment Services', description: 'End-to-end support for your investment' },
      { href: '/book-consultation', text: 'Free Investment Consultation', description: 'Speak with our experts today' }
    ]
  },
  {
    _type: 'pageLinks',
    page: 'services',
    seoTitle: 'Related Investment Resources',
    relatedLinks: [
      { href: '/mini-pia-guide', text: 'Mini PIA Grant Information', description: 'Detailed grant program guide' },
      { href: '/investment-process', text: 'Investment Process Overview', description: 'Step-by-step investment journey' },
      { href: '/portfolio', text: 'Success Stories & Portfolio', description: 'See our completed projects' },
      { href: '/sign-agreement', text: 'Start Your Investment', description: 'Begin your Puglia investment today' }
    ]
  },
  {
    _type: 'pageLinks',
    page: 'properties',
    seoTitle: 'Property Investment Resources',
    relatedLinks: [
      { href: '/locations', text: 'Puglia Investment Locations', description: 'Explore different areas of Puglia' },
      { href: '/renovation-expertise', text: 'Renovation & Development', description: 'Professional renovation services' },
      { href: '/tools/mini-pia-calculator', text: 'Grant Calculator', description: 'Calculate your potential funding' },
      { href: '/contact', text: 'Property Inquiries', description: 'Get help finding the perfect property' }
    ]
  },
  {
    _type: 'pageLinks',
    page: 'miniPiaGuide',
    seoTitle: 'Grant Resources & Tools',
    relatedLinks: [
      { href: '/tools/mini-pia-calculator', text: 'Calculate Your Grant', description: 'Estimate your funding amount' },
      { href: '/services', text: 'Grant Application Services', description: 'Professional grant assistance' },
      { href: '/industries', text: 'Eligible Business Sectors', description: 'Qualifying industries for grants' },
      { href: '/book-consultation', text: 'Grant Consultation', description: 'Discuss your grant eligibility' }
    ]
  }
]

async function populateFAQs() {
  console.log('🚀 Starting FAQ population...')
  
  try {
    // Create FAQs
    for (const faq of faqs) {
      const result = await client.create(faq)
      console.log(`✅ Created FAQ: ${result.question.substring(0, 50)}...`)
    }
    
    // Create Page Links
    for (const linkSet of pageLinks) {
      const result = await client.create(linkSet)
      console.log(`✅ Created page links for: ${result.page}`)
    }
    
    console.log('✨ Successfully populated all FAQs and page links!')
  } catch (error) {
    console.error('❌ Error populating FAQs:', error)
  }
}

populateFAQs()