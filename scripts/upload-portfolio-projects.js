const { createClient } = require('@sanity/client')
const dotenv = require('dotenv')
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-07-09',
  token: process.env.SANITY_API_WRITE_TOKEN
})


// Portfolio projects data
const portfolioProjects = [
  // 5-Star Luxury Hotels & Masserias
  {
    title: "Masseria Donna Menga",
    slug: "masseria-donna-menga",
    category: "luxury-hotel",
    status: "completed",
    location: { city: "Nardò", province: "Lecce", region: "Puglia" },
    description: "Complete restoration of abandoned 18th-century masseria into exclusive 5-star luxury resort with spa, pool, and gourmet restaurant. Historic architecture preserved with modern luxury amenities.",
    mainImage: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
    investment: {
      amount: 2300000,
      roi: 35,
      completionYear: 2024
    },
    metrics: {
      rooms: 15,
      capacity: 30,
      occupancyRate: 92
    },
    featured: true,
    order: 1
  },
  {
    title: "Masseria Montelauro",
    slug: "masseria-montelauro",
    category: "luxury-hotel",
    status: "completed",
    location: { city: "Otranto", province: "Lecce", region: "Puglia" },
    description: "Transformation of historic masseria into boutique luxury hotel with panoramic views of the Adriatic coast. Combines traditional Puglian architecture with contemporary design.",
    investment: {
      amount: 3200000,
      roi: 42,
      completionYear: 2016
    },
    metrics: {
      rooms: 30,
      capacity: 60,
      occupancyRate: 88
    },
    featured: true,
    order: 2
  },
  {
    title: "Hotel Basiliani",
    slug: "hotel-basiliani",
    category: "luxury-hotel",
    status: "completed",
    location: { city: "Otranto", province: "Lecce", region: "Puglia" },
    description: "Boutique hotel in historic center, restored medieval monastery with luxury suites and rooftop terrace overlooking the sea.",
    investment: {
      amount: 1800000,
      roi: 38,
      completionYear: 2020
    },
    metrics: {
      rooms: 18,
      capacity: 36,
      occupancyRate: 85
    },
    order: 3
  },
  // Beach Resorts
  {
    title: "VOI Alimini Resort",
    slug: "voi-alimini-resort",
    category: "beach-resort",
    status: "completed",
    location: { city: "Otranto", province: "Lecce", region: "Puglia" },
    description: "Major beach resort development with 300+ rooms, multiple pools, sports facilities, and direct beach access. Part of VOI Hotels chain.",
    investment: {
      amount: 12000000,
      roi: 45,
      completionYear: 2018
    },
    metrics: {
      rooms: 320,
      capacity: 800,
      occupancyRate: 90
    },
    featured: true,
    order: 4
  },
  {
    title: "Baglioni Masseria Muzza",
    slug: "baglioni-masseria-muzza",
    category: "beach-resort",
    status: "completed",
    location: { city: "Otranto", province: "Lecce", region: "Puglia" },
    description: "Exclusive Baglioni Hotels property. Restored masseria with luxury spa, private beach club, and world-class dining.",
    investment: {
      amount: 8500000,
      roi: 48,
      completionYear: 2019
    },
    metrics: {
      rooms: 45,
      capacity: 90,
      occupancyRate: 94
    },
    order: 5
  },
  // Historic Restorations
  {
    title: "Torre Matta",
    slug: "torre-matta",
    category: "historic-restoration",
    status: "completed",
    location: { city: "Otranto", province: "Lecce", region: "Puglia" },
    description: "UNESCO heritage site restoration. 16th-century coastal watchtower transformed into cultural center and event venue.",
    investment: {
      amount: 600000,
      completionYear: 2016
    },
    metrics: {
      eventsPerYear: 120
    },
    featured: true,
    order: 6
  },
  {
    title: "Hypogeum Otranto",
    slug: "hypogeum-otranto",
    category: "historic-restoration",
    status: "completed",
    location: { city: "Otranto", province: "Lecce", region: "Puglia" },
    description: "Underground archaeological site restoration. Ancient oil mill and storage facilities now museum and event space.",
    investment: {
      amount: 450000,
      completionYear: 2017
    },
    order: 7
  },
  {
    title: "Palazzo Ducale Alessano",
    slug: "palazzo-ducale-alessano",
    category: "historic-restoration",
    status: "completed",
    location: { city: "Alessano", province: "Lecce", region: "Puglia" },
    description: "17th-century ducal palace restoration. Now luxury event venue and cultural center hosting weddings and corporate events.",
    investment: {
      amount: 2100000,
      completionYear: 2021
    },
    metrics: {
      eventsPerYear: 80,
      capacity: 200
    },
    order: 8
  },
  // Business Hotels
  {
    title: "Hotel Pietra Verde",
    slug: "hotel-pietra-verde",
    category: "business-hotel",
    status: "completed",
    location: { city: "Otranto", province: "Lecce", region: "Puglia" },
    description: "Modern 4-star business hotel with conference facilities, spa, and restaurant. Strategic location near Otranto business district.",
    investment: {
      amount: 3500000,
      roi: 32,
      completionYear: 2022
    },
    metrics: {
      rooms: 48,
      capacity: 96,
      occupancyRate: 82
    },
    order: 9
  },
  {
    title: "Hotel Petraria",
    slug: "hotel-petraria",
    category: "business-hotel",
    status: "completed",
    location: { city: "Lecce", province: "Lecce", region: "Puglia" },
    description: "Business hotel with meeting rooms and modern amenities. Ideal for corporate travelers and conferences.",
    investment: {
      amount: 2800000,
      roi: 30,
      completionYear: 2023
    },
    metrics: {
      rooms: 35,
      capacity: 70,
      occupancyRate: 78
    },
    order: 10
  }
]

async function uploadProjects() {
  console.log('Starting portfolio projects upload to Sanity...')
  
  for (const project of portfolioProjects) {
    try {
      // Check if project already exists
      const existing = await client.fetch(
        `*[_type == "renovationProject" && slug.current == $slug][0]`,
        { slug: project.slug }
      )
      
      if (existing) {
        console.log(`Project "${project.title}" already exists, skipping...`)
        continue
      }
      
      // Create the project document
      const doc = {
        _type: 'renovationProject',
        title: project.title,
        slug: { current: project.slug },
        category: project.category,
        status: project.status,
        location: project.location,
        description: project.description,
        investment: project.investment,
        metrics: project.metrics,
        featured: project.featured || false,
        order: project.order,
        architect: 'Engineer Architect Cataldo Russo',
        publishedAt: new Date().toISOString()
      }
      
      // If mainImage is provided as URL, we'll need to upload it separately
      // For now, we'll create the document without the image
      
      const result = await client.create(doc)
      console.log(`✓ Created project: ${project.title}`)
      
    } catch (error) {
      console.error(`Error creating project "${project.title}":`, error)
    }
  }
  
  console.log('Portfolio projects upload complete!')
}

uploadProjects().catch(console.error)