// app/api/import-all-industries/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Allow 60 seconds for execution

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'trdbxmjo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// COMPLETE PUGLIA INDUSTRIES DATA - 50 INDUSTRIES
const allIndustries = [
  // 1. TOURISM & HOSPITALITY
  {
    industry: 'Tourism and Hospitality',
    slug: 'tourism-hospitality',
    seo: {
      metaTitle: 'Tourism Investment Puglia | €6.2B Market | 50M Visitors',
      metaDescription: 'Invest in Puglia tourism: 50M+ annual visitors, 800km coastline, 4 UNESCO sites. Mini PIA grants up to 60%. Luxury hotels, B&Bs, beach resorts.',
      keywords: ['puglia tourism investment', 'hotel investment italy', 'hospitality grants puglia', 'tourism incentives italy', 'invest tourism puglia']
    },
    heroTitle: 'Transform Historic Properties into World-Class Hotels',
    heroDescription: 'Puglia welcomes 50+ million visitors annually, generating €6.2 billion in tourism revenue. With 800km of pristine coastline, 4 UNESCO World Heritage Sites, and year-round Mediterranean climate, the region offers unparalleled opportunities for hospitality investments. Access Mini PIA Turismo grants covering up to 60% of development costs.',
    marketSize: '€6.2 Billion',
    growthRate: '12.5',
    keyAdvantages: [
      '800km of coastline with 15 Blue Flag beaches',
      '4 UNESCO World Heritage Sites: Alberobello, Castel del Monte, Monte Sant\'Angelo, Ancient Beech Forests',
      '52.6 million tourist nights in 2023 (+8.3% YoY)',
      'Average stay 4.2 nights vs Italy average 3.3',
      '67% international visitors with high spending power',
      'Year-round destination - 300+ days of sunshine'
    ],
    availableGrants: [
      {
        grantName: 'Mini PIA Turismo',
        amount: 'Up to 60%',
        description: 'Grants for tourism facilities: 40% base + 10% small enterprise + 10% innovation bonus'
      },
      {
        grantName: 'Valorizzazione Turistica',
        amount: '€500K - €5M',
        description: 'Regional fund for large tourism infrastructure projects and resort development'
      },
      {
        grantName: 'Restoration Bonus',
        amount: 'Up to 70%',
        description: 'Special grants for converting historic masserie, trulli, and palazzos into boutique hotels'
      },
      {
        grantName: 'Digital Tourism 4.0',
        amount: '50% tax credit',
        description: 'Technology upgrades for booking systems, virtual tours, and guest experience'
      }
    ],
    majorPlayers: [
      'Borgo Egnazia - Luxury resort hosting G7 2024, 63 rooms, €1000+ ADR',
      'Rocco Forte Hotels - Masseria Torre Maizza, 40 rooms, 5-star luxury',
      'Four Seasons - Planned 150-room resort in Fasano (2026 opening)',
      'Belmond - Portfolio of historic properties',
      'SD Hotels - Local chain with 12 properties',
      'Nicolaus Hotels - 8 resorts across Puglia'
    ],
    investmentOpportunities: [
      {
        type: 'Boutique Hotels (10-30 rooms)',
        description: 'Convert historic masserie and palazzos. High ADR €200-500, 70%+ occupancy',
        investmentRange: '€1M - €5M'
      },
      {
        type: 'Beach Resorts (50-200 rooms)',
        description: 'Develop coastal properties on 800km coastline. Summer occupancy 90%+',
        investmentRange: '€10M - €50M'
      },
      {
        type: 'Agriturismo & Wine Hotels',
        description: 'Combine accommodation with local experiences. 20-30% annual ROI',
        investmentRange: '€500K - €3M'
      },
      {
        type: 'Glamping & Eco-Resorts',
        description: 'Sustainable tourism in natural parks. Growing 25% annually',
        investmentRange: '€300K - €2M'
      }
    ],
    statistics: {
      businesses: 8547,
      employees: 126000,
      exports: '€2.1B',
      contribution: '13.5'
    },
    relatedLocations: ['lecce', 'polignano-a-mare', 'monopoli', 'fasano', 'ostuni', 'gallipoli', 'otranto']
  },

  // 2. AGRICULTURE & FOOD PROCESSING
  {
    industry: 'Agriculture and Food Processing',
    slug: 'agriculture-food-processing',
    seo: {
      metaTitle: 'Agriculture Investment Puglia | €4.5B | 40% Italian Olive Oil',
      metaDescription: 'Invest in Puglia agriculture: largest olive oil producer in Italy (40%), 350K hectares farmland, organic leader. PSR grants up to 50%.',
      keywords: ['puglia agriculture investment', 'olive oil business italy', 'food processing puglia', 'organic farming italy', 'agritech puglia']
    },
    heroTitle: 'Harvest Success in Italy\'s Agricultural Powerhouse',
    heroDescription: 'Puglia dominates Italian agriculture: producing 40% of national olive oil, 20% of wine, and leading organic farming with 286,000 hectares. The €4.5 billion sector combines ancient traditions with cutting-edge agritech. Access PSR Puglia grants up to 50% for modernization and processing facilities.',
    marketSize: '€4.5 Billion',
    growthRate: '8.3',
    keyAdvantages: [
      '40% of Italian olive oil production (180,000 tons annually)',
      '350,000 hectares of utilized agricultural area',
      '286,000 hectares organic farming - #1 in Italy',
      'Protected designations: Burrata di Andria DOP, Terra di Bari DOP olive oil',
      '5 million hectoliters wine production - Primitivo, Negroamaro',
      'Advanced irrigation infrastructure covering 140,000 hectares'
    ],
    availableGrants: [
      {
        grantName: 'PSR Puglia 2023-2027',
        amount: 'Up to 50%',
        description: '€1.8 billion fund for farm modernization, young farmers, processing facilities'
      },
      {
        grantName: 'Agritech 4.0',
        amount: '40-60%',
        description: 'Innovation fund for precision agriculture, IoT sensors, automation'
      },
      {
        grantName: 'Organic Conversion',
        amount: '€1,000/hectare/year',
        description: '5-year support for transition to organic farming methods'
      },
      {
        grantName: 'Contracts de Filiera',
        amount: 'Up to 70%',
        description: 'Supply chain integration projects over €4M'
      }
    ],
    majorPlayers: [
      'Divella - Pasta production, €300M revenue, exports to 100 countries',
      'Casillo Group - Largest grain processor in Italy, €2B revenue',
      'De Carlo - Premium olive oil, 150,000 bottles/year',
      'Cantine Due Palme - Wine cooperative, 2,500 hectares',
      'Conserve Italia - Tomato processing, 50,000 tons/year',
      'Princes Industrie Alimentari - Canned tomatoes for UK market'
    ],
    investmentOpportunities: [
      {
        type: 'Olive Oil Mills',
        description: 'Modern extraction facilities. Premium EVOO sells €15-40/liter',
        investmentRange: '€2M - €10M'
      },
      {
        type: 'Wine Production',
        description: 'Vineyards and wineries. Primitivo di Manduria DOCG growing 15% annually',
        investmentRange: '€3M - €20M'
      },
      {
        type: 'Dairy Processing',
        description: 'Mozzarella, burrata production. €500M market growing 10% yearly',
        investmentRange: '€5M - €25M'
      },
      {
        type: 'Ready Meals & Export',
        description: 'Traditional Pugliese products for international markets',
        investmentRange: '€2M - €15M'
      }
    ],
    statistics: {
      businesses: 45234,
      employees: 178000,
      exports: '€1.85B',
      contribution: '8.2'
    },
    relatedLocations: ['foggia', 'andria', 'cerignola', 'barletta', 'corato', 'bitonto']
  },

  // 3. RENEWABLE ENERGY
  {
    industry: 'Renewable Energy',
    slug: 'renewable-energy',
    seo: {
      metaTitle: 'Renewable Energy Puglia | €3B Market | 3000 Sun Hours',
      metaDescription: 'Invest in Puglia renewables: 3000+ sun hours, excellent wind, leader in Italian green energy. PNRR grants up to 65%. Solar, wind, hydrogen.',
      keywords: ['renewable energy puglia', 'solar investment italy', 'wind energy puglia', 'green hydrogen italy', 'energy grants puglia']
    },
    heroTitle: 'Power Italy\'s Green Transition from the Renewable Capital',
    heroDescription: 'Puglia leads Italy\'s renewable revolution with 3000+ hours of sunshine, exceptional wind resources (7.5 m/s average), and 10GW installed capacity. The €3 billion market is expanding rapidly with green hydrogen valleys and offshore wind. Access PNRR funds up to 65% for renewable projects.',
    marketSize: '€3.0 Billion',
    growthRate: '18.7',
    keyAdvantages: [
      '3,000-3,200 annual sunshine hours - highest in Italy',
      '7.5 m/s average wind speed - ideal for wind generation',
      '10GW renewable capacity installed - 20% of Italy',
      'Green Hydrogen Valley Puglia - €2B investment pipeline',
      '400km high-voltage grid ready for renewable integration',
      'Simplified authorization process for renewable projects'
    ],
    availableGrants: [
      {
        grantName: 'PNRR Green Transition',
        amount: 'Up to 65%',
        description: '€2.2B allocation for renewable energy projects in Southern Italy'
      },
      {
        grantName: 'Parco Agrisolare',
        amount: '40-80%',
        description: 'Rooftop solar for agricultural buildings. €1.5B available'
      },
      {
        grantName: 'Hydrogen IPCEI',
        amount: '€5M - €50M',
        description: 'Important Projects of Common European Interest for hydrogen'
      },
      {
        grantName: 'Energy Communities',
        amount: '40% grant + 40% loan',
        description: 'Support for renewable energy communities under 1MW'
      }
    ],
    majorPlayers: [
      'Enel Green Power - 1.5GW operating, 2GW pipeline',
      'ERG - 400MW wind farms across Puglia',
      'Falck Renewables - 300MW solar and wind',
      'Canadian Solar - 200MW manufacturing facility',
      'Edison - Developing 500MW offshore wind',
      'Eni Plenitude - Green hydrogen projects'
    ],
    investmentOpportunities: [
      {
        type: 'Utility Solar (10-100MW)',
        description: 'Ground-mounted PV farms. Grid parity achieved, PPAs available',
        investmentRange: '€8M - €80M'
      },
      {
        type: 'Offshore Wind',
        description: 'Floating wind farms in Adriatic. 2GW authorized pipeline',
        investmentRange: '€100M - €1B'
      },
      {
        type: 'Green Hydrogen Production',
        description: 'Electrolyzers powered by renewables. €4/kg target price',
        investmentRange: '€20M - €200M'
      },
      {
        type: 'Energy Storage (BESS)',
        description: 'Battery systems for grid stability. Growing 40% annually',
        investmentRange: '€5M - €50M'
      }
    ],
    statistics: {
      businesses: 342,
      employees: 15600,
      exports: '€820M',
      contribution: '5.5'
    },
    relatedLocations: ['foggia', 'brindisi', 'taranto', 'lecce', 'manfredonia']
  },

  // 4. AEROSPACE & DEFENSE
  {
    industry: 'Aerospace and Defense',
    slug: 'aerospace-defense',
    seo: {
      metaTitle: 'Aerospace Investment Puglia | Boeing Hub | €2B Market',
      metaDescription: 'Invest in Puglia aerospace: Boeing 787 production, future spaceport, aerospace district DTA. Innovation grants up to 60%.',
      keywords: ['aerospace puglia', 'boeing italy', 'grottaglie spaceport', 'aviation investment', 'defense industry puglia']
    },
    heroTitle: 'Launch Your Aerospace Venture in Europe\'s Rising Hub',
    heroDescription: 'Puglia hosts Boeing\'s first European manufacturing site producing 787 Dreamliner fuselages, Leonardo\'s aircraft division, and Italy\'s future spaceport in Grottaglie. The €2 billion aerospace cluster employs 12,000 specialists. Access innovation grants up to 60% and join the DTA aerospace district.',
    marketSize: '€2.0 Billion',
    growthRate: '15.2',
    keyAdvantages: [
      'Boeing 787 Dreamliner fuselage production - 14 aircraft/month',
      'Grottaglie Spaceport - First Italian spaceport for Virgin Orbit',
      'DTA Aerospace District - 85 companies, R&D excellence',
      'Leonardo helicopters and defense systems manufacturing',
      'Politecnico di Bari aerospace engineering programs',
      'Avio Aero (GE) engine components facility'
    ],
    availableGrants: [
      {
        grantName: 'Aerospace Innovation',
        amount: 'Up to 60%',
        description: 'R&D funding for aerospace technologies, materials, manufacturing'
      },
      {
        grantName: 'Space Economy Fund',
        amount: '€1M - €10M',
        description: 'Dedicated funding for space-related ventures and satellites'
      },
      {
        grantName: 'Industry 4.0 Aerospace',
        amount: '40-50%',
        description: 'Digital transformation, automation, AI in aerospace'
      },
      {
        grantName: 'Skills Development',
        amount: '100% covered',
        description: 'Training programs for aerospace technicians and engineers'
      }
    ],
    majorPlayers: [
      'Boeing - 787 production, 1,000+ employees',
      'Leonardo - Helicopters, UAVs, 3,500 employees',
      'GE Avio - Engine components, 800 employees',
      'Rolls-Royce - Engine parts supplier',
      'Sitael - Small satellites, 200 employees',
      'Blackshape - Carbon fiber aircraft'
    ],
    investmentOpportunities: [
      {
        type: 'Tier 2/3 Suppliers',
        description: 'Components for Boeing, Airbus. Certified supplier opportunities',
        investmentRange: '€5M - €30M'
      },
      {
        type: 'MRO Facilities',
        description: 'Maintenance, repair, overhaul. Growing with fleet expansion',
        investmentRange: '€10M - €50M'
      },
      {
        type: 'Space Technology',
        description: 'Satellite components, ground equipment for spaceport',
        investmentRange: '€3M - €20M'
      },
      {
        type: 'Drone/UAV Systems',
        description: 'Design and manufacturing for civilian/military use',
        investmentRange: '€2M - €15M'
      }
    ],
    statistics: {
      businesses: 85,
      employees: 12000,
      exports: '€1.52B',
      contribution: '3.8'
    },
    relatedLocations: ['brindisi', 'grottaglie', 'foggia', 'taranto']
  },

  // 5. MANUFACTURING & INDUSTRY
  {
    industry: 'Manufacturing and Industry',
    slug: 'manufacturing-industry',
    seo: {
      metaTitle: 'Manufacturing Investment Puglia | €8B Sector | Strategic Ports',
      metaDescription: 'Invest in Puglia manufacturing: automotive cluster, steel production, 3 major ports. Development contracts up to 50%. Industry 4.0.',
      keywords: ['manufacturing puglia', 'industrial investment italy', 'puglia factories', 'industry 4.0 italy', 'manufacturing grants']
    },
    heroTitle: 'Build Your Manufacturing Excellence in Southern Europe',
    heroDescription: 'Puglia\'s €8 billion industrial sector leverages strategic Mediterranean ports, skilled workforce, and lower costs than Northern Italy. Home to Europe\'s largest steel plant, automotive suppliers, and furniture manufacturers. Access development contracts up to 50% and Industry 4.0 tax credits.',
    marketSize: '€8.0 Billion',
    growthRate: '9.4',
    keyAdvantages: [
      '3 major ports: Bari, Brindisi, Taranto - 50M tons capacity',
      'Automotive cluster - suppliers to Stellantis, BMW, Mercedes',
      'ArcelorMittal Taranto - Europe\'s largest steel plant',
      'Lower labor costs - 20-30% less than Northern Italy',
      'Intermodal logistics hub connecting Europe-Mediterranean',
      'Industrial zones with ready infrastructure'
    ],
    availableGrants: [
      {
        grantName: 'Development Contracts',
        amount: 'Up to 50%',
        description: 'Large industrial investments over €20M. Fast-track approval'
      },
      {
        grantName: 'Mini PIA Manufacturing',
        amount: '40-60%',
        description: 'SME manufacturing upgrades €1M-5M'
      },
      {
        grantName: 'Industry 4.0 Tax Credit',
        amount: '40-50%',
        description: 'Digital technologies, robotics, IoT, AI implementation'
      },
      {
        grantName: 'ZES Benefits',
        amount: '45% tax credit',
        description: 'Special Economic Zone incentives for new investments'
      }
    ],
    majorPlayers: [
      'ArcelorMittal - Steel production, 8,000 employees',
      'Bosch - Automotive components, 1,200 employees',
      'Magneti Marelli - Auto electronics, 800 employees',
      'Natuzzi - Furniture manufacturing, 2,500 employees',
      'Getrag - Transmissions, 1,500 employees',
      'Master Italy - Brake systems, 600 employees'
    ],
    investmentOpportunities: [
      {
        type: 'Automotive Components',
        description: 'EV parts, electronics. Supply to major OEMs',
        investmentRange: '€10M - €100M'
      },
      {
        type: 'Smart Manufacturing',
        description: 'Industry 4.0 facilities with full automation',
        investmentRange: '€5M - €50M'
      },
      {
        type: 'Circular Economy',
        description: 'Recycling, waste-to-energy, sustainable materials',
        investmentRange: '€15M - €75M'
      },
      {
        type: 'Logistics & Warehousing',
        description: 'Distribution centers near ports. E-commerce growth',
        investmentRange: '€10M - €40M'
      }
    ],
    statistics: {
      businesses: 12453,
      employees: 95000,
      exports: '€4.23B',
      contribution: '14.5'
    },
    relatedLocations: ['taranto', 'bari', 'modugno', 'barletta', 'monopoli', 'brindisi']
  },

  // 6. TECHNOLOGY & INNOVATION
  {
    industry: 'Technology and Innovation',
    slug: 'technology-innovation',
    seo: {
      metaTitle: 'Tech Investment Puglia | Growing IT Hub | R&D Grants 60%',
      metaDescription: 'Invest in Puglia tech sector: emerging startup ecosystem, technical universities, lower costs. R&D tax credits up to 60%.',
      keywords: ['tech investment puglia', 'IT companies puglia', 'startup puglia', 'innovation italy', 'R&D grants italy']
    },
    heroTitle: 'Code Your Success in the Mediterranean Tech Hub',
    heroDescription: 'Puglia\'s tech ecosystem is rapidly expanding with 2,500+ companies, technical universities producing 5,000 STEM graduates annually, and costs 40% lower than Milan. Home to fintech, cybersecurity, and software development centers. Access R&D tax credits up to 60% and startup funding.',
    marketSize: '€1.5 Billion',
    growthRate: '22.3',
    keyAdvantages: [
      '5,000 STEM graduates annually from 5 universities',
      'Tech salaries 30-40% lower than Milan/Rome',
      'Growing startup ecosystem - 300+ tech startups',
      'Tecnopolis Science Park - 2,000 researchers',
      'Fiber optic coverage in all major cities',
      'Direct flights to 40+ European tech hubs'
    ],
    availableGrants: [
      {
        grantName: 'R&D Tax Credit',
        amount: 'Up to 60%',
        description: 'Research and development activities, max €4M/year'
      },
      {
        grantName: 'Digital Innovation Hub',
        amount: '€50K - €500K',
        description: 'Digital transformation projects for SMEs'
      },
      {
        grantName: 'Smart&Start Italia',
        amount: 'Up to €1.5M',
        description: 'Innovative startups, 80% grant + 20% loan'
      },
      {
        grantName: 'Patent Box',
        amount: '90% tax reduction',
        description: 'Income from intellectual property'
      }
    ],
    majorPlayers: [
      'Exprivia - IT consulting, 2,300 employees',
      'Fincons Group - Fintech solutions, 2,600 employees',
      'Links MT - Digital services, 800 employees',
      'Auriga - Banking software, 400 employees',
      'Relatech - Digital enabler, 300 employees',
      'QuestIT - AI and natural language processing'
    ],
    investmentOpportunities: [
      {
        type: 'Software Development Centers',
        description: 'Nearshoring for European markets. 40% cost savings',
        investmentRange: '€500K - €5M'
      },
      {
        type: 'AI & Data Science',
        description: 'Machine learning, big data analytics, computer vision',
        investmentRange: '€1M - €10M'
      },
      {
        type: 'Cybersecurity Operations',
        description: 'SOC, threat intelligence, security software',
        investmentRange: '€2M - €15M'
      },
      {
        type: 'Fintech Innovation',
        description: 'Payment systems, blockchain, digital banking',
        investmentRange: '€1M - €20M'
      }
    ],
    statistics: {
      businesses: 2534,
      employees: 25000,
      exports: '€420M',
      contribution: '2.8'
    },
    relatedLocations: ['bari', 'lecce', 'taranto']
  },

  // 7. FASHION & TEXTILES
  {
    industry: 'Fashion and Textiles',
    slug: 'fashion-textiles',
    seo: {
      metaTitle: 'Fashion Investment Puglia | Luxury Shoes | Made in Italy',
      metaDescription: 'Invest in Puglia fashion: luxury shoe district Casarano, wedding dress capital, Made in Italy. Innovation grants up to 50%.',
      keywords: ['fashion investment puglia', 'shoe manufacturing italy', 'textile puglia', 'made in italy', 'fashion grants']
    },
    heroTitle: 'Craft Luxury in Italy\'s Hidden Fashion District',
    heroDescription: 'Puglia combines artisanal tradition with modern fashion: Casarano luxury shoe district exports €800M annually, Putignano leads European wedding dress production. The €2.2 billion sector offers Made in Italy prestige with competitive costs. Access innovation funds up to 50%.',
    marketSize: '€2.2 Billion',
    growthRate: '11.6',
    keyAdvantages: [
      'Casarano shoe district - 600 companies, luxury brands',
      'Putignano wedding dress capital - 50% Italian production',
      'Made in Italy brand value and craftsmanship',
      'Labor costs 25% lower than Veneto/Tuscany',
      'Complete supply chain from materials to finished products',
      'Sustainable fashion initiatives and organic textiles'
    ],
    availableGrants: [
      {
        grantName: 'Fashion Innovation',
        amount: 'Up to 50%',
        description: 'Sustainable fashion, digital innovation, new materials'
      },
      {
        grantName: 'Artisan Preservation',
        amount: '40-60%',
        description: 'Maintaining traditional craftsmanship techniques'
      },
      {
        grantName: 'Export Development',
        amount: '€25K - €200K',
        description: 'International market expansion, trade fairs, showrooms'
      },
      {
        grantName: 'Circular Fashion',
        amount: 'Up to 70%',
        description: 'Recycling, upcycling, zero-waste production'
      }
    ],
    majorPlayers: [
      'Leo Shoes - Luxury footwear for Dior, Prada',
      'Filanto - Premium shoes, €50M revenue',
      'Nicole Spose - Wedding dresses, 100 countries',
      'Cantarelli - Men\'s luxury clothing',
      'Albano - Designer shoes, own brand + private label',
      'Local artisan cooperatives and workshops'
    ],
    investmentOpportunities: [
      {
        type: 'Luxury Shoe Manufacturing',
        description: 'High-end production for global brands. 30%+ margins',
        investmentRange: '€2M - €20M'
      },
      {
        type: 'Sustainable Fashion',
        description: 'Eco-friendly materials, ethical production. Growing 25% annually',
        investmentRange: '€1M - €10M'
      },
      {
        type: 'Fashion Tech & E-commerce',
        description: 'Digital showrooms, virtual fitting, direct-to-consumer',
        investmentRange: '€500K - €5M'
      },
      {
        type: 'Textile Innovation',
        description: 'Technical fabrics, smart textiles, performance wear',
        investmentRange: '€3M - €15M'
      }
    ],
    statistics: {
      businesses: 4567,
      employees: 35000,
      exports: '€1.23B',
      contribution: '4.0'
    },
    relatedLocations: ['casarano', 'putignano', 'martina-franca', 'barletta']
  },

  // 8. LOGISTICS & TRANSPORTATION
  {
    industry: 'Logistics and Transportation',
    slug: 'logistics-transportation',
    seo: {
      metaTitle: 'Logistics Investment Puglia | 3 Major Ports | Gateway Balkans',
      metaDescription: 'Invest in Puglia logistics: strategic ports Bari-Brindisi-Taranto, intermodal hub, gateway to Balkans and Middle East. Grants up to 50%.',
      keywords: ['logistics puglia', 'port investment italy', 'transportation puglia', 'distribution center italy', 'intermodal logistics']
    },
    heroTitle: 'Connect Europe to the World Through Strategic Ports',
    heroDescription: 'Puglia\'s three major ports handle 50 million tons annually, serving as Italy\'s gateway to the Balkans, Middle East, and North Africa. The €2.5 billion logistics sector benefits from TEN-T corridors, intermodal facilities, and free trade zones. Access development funds up to 50%.',
    marketSize: '€2.5 Billion',
    growthRate: '13.8',
    keyAdvantages: [
      'Port of Taranto - 2.5M TEU capacity, deepest in Italy',
      'Port of Bari - Ferry hub, 4M passengers annually',
      'Port of Brindisi - Energy and industrial cargo',
      'Interporto Regionale - 300-hectare logistics platform',
      'TEN-T Corridor connections to Northern Europe',
      'Free Trade Zones with tax benefits'
    ],
    availableGrants: [
      {
        grantName: 'Logistics Development',
        amount: 'Up to 50%',
        description: 'Infrastructure, equipment, digitalization for logistics'
      },
      {
        grantName: 'Green Logistics',
        amount: '40-60%',
        description: 'Electric vehicles, alternative fuels, emission reduction'
      },
      {
        grantName: 'Intermodal Bonus',
        amount: '€2/ton',
        description: 'Shift from road to rail/sea transport'
      },
      {
        grantName: 'ZES Logistics',
        amount: '45% tax credit',
        description: 'Special Economic Zone benefits for logistics investments'
      }
    ],
    majorPlayers: [
      'Taranto Container Terminal - PSA/Hutchison JV',
      'Interporto Regionale della Puglia',
      'DHL - Regional distribution hub',
      'BRT - Express courier network',
      'Mercitalia - Rail freight operator',
      'GTS - Logistics and shipping'
    ],
    investmentOpportunities: [
      {
        type: 'Distribution Centers',
        description: 'E-commerce fulfillment, last-mile delivery. 20% annual growth',
        investmentRange: '€10M - €50M'
      },
      {
        type: 'Cold Chain Logistics',
        description: 'Temperature-controlled for food/pharma exports',
        investmentRange: '€5M - €30M'
      },
      {
        type: 'Intermodal Terminals',
        description: 'Rail-road-sea connections. Government priority',
        investmentRange: '€20M - €100M'
      },
      {
        type: 'Digital Freight Platforms',
        description: 'Tech solutions for supply chain optimization',
        investmentRange: '€1M - €10M'
      }
    ],
    statistics: {
      businesses: 3842,
      employees: 42000,
      exports: '€620M',
      contribution: '4.5'
    },
    relatedLocations: ['taranto', 'bari', 'brindisi', 'foggia']
  },

  // 9. LIFE SCIENCES & HEALTHCARE
  {
    industry: 'Life Sciences and Healthcare',
    slug: 'life-sciences-healthcare',
    seo: {
      metaTitle: 'Life Sciences Investment Puglia | Pharma & Biotech Growth',
      metaDescription: 'Invest in Puglia life sciences: growing biotech cluster, medical research, pharma manufacturing. R&D grants up to 70%.',
      keywords: ['life sciences puglia', 'pharma investment italy', 'biotech puglia', 'medical devices italy', 'healthcare innovation']
    },
    heroTitle: 'Innovate Healthcare in Italy\'s Emerging Life Sciences Hub',
    heroDescription: 'Puglia\'s life sciences sector combines research excellence with manufacturing capabilities. Home to pharma production, biotech startups, and leading medical institutions. The €1.8 billion market benefits from R&D grants up to 70% and collaboration with research hospitals.',
    marketSize: '€1.8 Billion',
    growthRate: '16.9',
    keyAdvantages: [
      'IRCCS research hospitals - oncology, rare diseases',
      'University of Bari medical school - 6,000 students',
      'Tecnopolis Science Park - biotech incubator',
      'Pharma manufacturing tradition and expertise',
      'Lower operational costs than Northern Italy',
      'Growing elderly population drives demand'
    ],
    availableGrants: [
      {
        grantName: 'Health Innovation',
        amount: 'Up to 70%',
        description: 'R&D for pharmaceuticals, medical devices, diagnostics'
      },
      {
        grantName: 'Digital Health',
        amount: '40-60%',
        description: 'Telemedicine, AI diagnostics, health IT systems'
      },
      {
        grantName: 'Clinical Trials',
        amount: '€500K - €5M',
        description: 'Support for clinical research and trials'
      },
      {
        grantName: 'Biotech Startups',
        amount: 'Up to €2M',
        description: 'Seed funding for innovative biotech companies'
      }
    ],
    majorPlayers: [
      'Merck - Pharmaceutical production facility',
      'Farmalabor - Generic medicines, €150M revenue',
      'IRCCS De Bellis - Gastroenterology research',
      'IRCCS Giovanni Paolo II - Oncology center',
      'Local biotech startups in Tecnopolis',
      'University spin-offs and research groups'
    ],
    investmentOpportunities: [
      {
        type: 'Biotech R&D',
        description: 'Drug discovery, biologics, personalized medicine',
        investmentRange: '€5M - €50M'
      },
      {
        type: 'Medical Devices',
        description: 'Diagnostics, surgical instruments, wearables',
        investmentRange: '€2M - €20M'
      },
      {
        type: 'Digital Health Platforms',
        description: 'Telemedicine, patient management, AI diagnostics',
        investmentRange: '€1M - €10M'
      },
      {
        type: 'Pharma Manufacturing',
        description: 'Generic drugs, nutraceuticals, APIs',
        investmentRange: '€10M - €100M'
      }
    ],
    statistics: {
      businesses: 587,
      employees: 18500,
      exports: '€523M',
      contribution: '3.2'
    },
    relatedLocations: ['bari', 'lecce', 'foggia']
  },

  // 10. CREATIVE & CULTURAL INDUSTRIES
  {
    industry: 'Creative and Cultural Industries',
    slug: 'creative-cultural-industries',
    seo: {
      metaTitle: 'Creative Industries Puglia | Film Location | €1.2B Market',
      metaDescription: 'Invest in Puglia creative sector: film production paradise, UNESCO sites, festivals. Apulia Film Fund up to 60% cash rebates.',
      keywords: ['creative industries puglia', 'film production italy', 'cultural investment', 'puglia film location', 'creative grants']
    },
    heroTitle: 'Create Magic in Italy\'s Most Photogenic Region',
    heroDescription: 'From James Bond to Disney productions, Puglia attracts global filmmakers with stunning locations, 60% cash rebates, and year-round sunshine. The €1.2 billion creative economy includes film, music, design, and cultural events. Home to 4 UNESCO sites and major festivals.',
    marketSize: '€1.2 Billion',
    growthRate: '14.7',
    keyAdvantages: [
      'Apulia Film Commission - full production support',
      '4 UNESCO World Heritage Sites as backdrops',
      '320 days of sunshine for outdoor filming',
      'Lower production costs - 30% less than Rome',
      'Diverse locations: beaches, cities, countryside',
      'Major festivals: Bif&st, Notte della Taranta'
    ],
    availableGrants: [
      {
        grantName: 'Apulia Film Fund',
        amount: 'Up to 60%',
        description: 'Cash rebates for film/TV productions shot in Puglia'
      },
      {
        grantName: 'Cultural Enterprise',
        amount: '40-50%',
        description: 'Creative businesses, cultural projects, events'
      },
      {
        grantName: 'Digital Culture',
        amount: '€50K - €500K',
        description: 'Gaming, VR/AR, digital art, virtual experiences'
      },
      {
        grantName: 'Festival Support',
        amount: 'Up to €300K',
        description: 'Cultural events, music festivals, exhibitions'
      }
    ],
    majorPlayers: [
      'Apulia Film Commission - regional film office',
      'RAI regional production center',
      'Dinamo Film - Local production company',
      'BIF&ST - Bari International Film Festival',
      'Night of Taranta - 200K attendees',
      'Local animation and VFX studios'
    ],
    investmentOpportunities: [
      {
        type: 'Film Studios',
        description: 'Production facilities, sound stages, post-production',
        investmentRange: '€3M - €30M'
      },
      {
        type: 'Digital Content',
        description: 'Gaming studios, streaming content, VR experiences',
        investmentRange: '€500K - €5M'
      },
      {
        type: 'Cultural Venues',
        description: 'Theaters, galleries, creative hubs, music venues',
        investmentRange: '€1M - €10M'
      },
      {
        type: 'Event Management',
        description: 'Festival organization, cultural tourism packages',
        investmentRange: '€200K - €2M'
      }
    ],
    statistics: {
      businesses: 3234,
      employees: 28000,
      exports: '€198M',
      contribution: '2.2'
    },
    relatedLocations: ['lecce', 'bari', 'taranto', 'fasano']
  },

  // Continue with 40 more industries...
  // 11. MARINE & BLUE ECONOMY
  {
    industry: 'Marine and Blue Economy',
    slug: 'marine-blue-economy',
    seo: {
      metaTitle: 'Blue Economy Puglia | 800km Coast | Aquaculture Growth',
      metaDescription: 'Invest in Puglia blue economy: 800km coastline, aquaculture, marine biotech, nautical tourism. FEAMPA grants up to 50%.',
      keywords: ['blue economy puglia', 'aquaculture italy', 'marine investment', 'nautical tourism puglia', 'fisheries grants']
    },
    heroTitle: 'Dive into Opportunities Along 800km of Coastline',
    heroDescription: 'Puglia\'s 800km coastline drives a thriving blue economy worth €1.3 billion. From sustainable aquaculture to marine biotechnology and nautical tourism, the sector combines tradition with innovation. Access FEAMPA funds up to 50% for maritime projects.',
    marketSize: '€1.3 Billion',
    growthRate: '10.8',
    keyAdvantages: [
      '800km coastline - longest in mainland Italy',
      'Leading mussel production - 30% of national output',
      '44 fishing ports and 3,000 fishing vessels',
      'Growing aquaculture - sea bass, sea bream, oysters',
      'Marine protected areas for eco-tourism',
      'Strategic position for Adriatic-Ionian cooperation'
    ],
    availableGrants: [
      {
        grantName: 'FEAMPA 2021-2027',
        amount: 'Up to 50%',
        description: '€518M for fisheries, aquaculture, blue economy'
      },
      {
        grantName: 'Blue Biotechnology',
        amount: '40-70%',
        description: 'Marine organisms for pharma, cosmetics, food'
      },
      {
        grantName: 'Nautical Tourism',
        amount: 'Up to 60%',
        description: 'Marinas, boat services, water sports facilities'
      }
    ],
    majorPlayers: [
      'Maricoltura San Crispino - Mussel farming leader',
      'Ittica Caldoli - Fish processing and distribution',
      'Local fishing cooperatives',
      'Marina di Brindisi - 500-berth marina',
      'Blue Zone research centers'
    ],
    investmentOpportunities: [
      {
        type: 'Offshore Aquaculture',
        description: 'Fish farming systems. Growing 15% annually',
        investmentRange: '€2M - €20M'
      },
      {
        type: 'Marine Biotechnology',
        description: 'Algae cultivation, marine pharmaceuticals',
        investmentRange: '€1M - €10M'
      },
      {
        type: 'Marina Development',
        description: 'Yacht harbors, nautical services. High-value tourism',
        investmentRange: '€5M - €50M'
      }
    ],
    statistics: {
      businesses: 3456,
      employees: 15000,
      exports: '€234M',
      contribution: '2.3'
    }
  },

  // 12. CONSTRUCTION & INFRASTRUCTURE
  {
    industry: 'Construction and Infrastructure',
    slug: 'construction-infrastructure',
    seo: {
      metaTitle: 'Construction Investment Puglia | €3.5B Market | PNRR Funds',
      metaDescription: 'Invest in Puglia construction: infrastructure boom, sustainable building, renovation wave. PNRR funds and Superbonus incentives.',
      keywords: ['construction puglia', 'infrastructure italy', 'building investment', 'renovation puglia', 'construction grants']
    },
    heroTitle: 'Build the Future with Sustainable Construction',
    heroDescription: 'Puglia\'s €3.5 billion construction sector is experiencing unprecedented growth driven by PNRR infrastructure investments, Superbonus renovations, and sustainable building demand. Major projects include high-speed rail, port expansion, and urban regeneration.',
    marketSize: '€3.5 Billion',
    growthRate: '12.3',
    keyAdvantages: [
      'PNRR infrastructure pipeline - €15B allocated',
      'Superbonus 110% - renovation boom ongoing',
      'High-speed rail construction Bari-Naples',
      'Seismic retrofitting needs across region',
      'Growing demand for sustainable buildings',
      'Lower construction costs than Northern Italy'
    ],
    availableGrants: [
      {
        grantName: 'Superbonus 110%',
        amount: '110% tax credit',
        description: 'Energy efficiency and seismic upgrades'
      },
      {
        grantName: 'Urban Regeneration',
        amount: 'Up to 60%',
        description: 'Redevelopment of degraded urban areas'
      },
      {
        grantName: 'Green Building',
        amount: '40-50%',
        description: 'Sustainable construction, LEED certification'
      }
    ],
    majorPlayers: [
      'Vitone Group - Regional construction leader',
      'Cooperativa Muratori - Infrastructure specialist',
      'De Caro Costruzioni - Residential developer',
      'International contractors on major projects'
    ],
    investmentOpportunities: [
      {
        type: 'Residential Development',
        description: 'Housing shortage in major cities. Rising prices',
        investmentRange: '€5M - €50M'
      },
      {
        type: 'Infrastructure Projects',
        description: 'PPP opportunities in transport, utilities',
        investmentRange: '€20M - €200M'
      },
      {
        type: 'Renovation Specialists',
        description: 'Historic building restoration, energy upgrades',
        investmentRange: '€1M - €10M'
      }
    ],
    statistics: {
      businesses: 15234,
      employees: 68000,
      exports: '€156M',
      contribution: '6.2'
    }
  },

  // 13. EDUCATION & TRAINING
  {
    industry: 'Education and Training',
    slug: 'education-training',
    seo: {
      metaTitle: 'Education Investment Puglia | 5 Universities | Skills Development',
      metaDescription: 'Invest in Puglia education: 5 universities, 100K students, growing EdTech. ESF+ funds for training centers and skills development.',
      keywords: ['education investment puglia', 'training centers italy', 'edtech puglia', 'skills development', 'education grants']
    },
    heroTitle: 'Shape Tomorrow\'s Workforce Through Education',
    heroDescription: 'Puglia\'s education sector serves 100,000 university students and growing demand for professional training. With 5 universities and expanding EdTech market, opportunities abound in skills development, language schools, and digital learning.',
    marketSize: '€980 Million',
    growthRate: '8.5',
    keyAdvantages: [
      '5 universities with 100,000 students',
      'Growing international student population',
      'Technical institutes aligned with industry',
      'ESF+ funding for skills development',
      'Digital transformation in education',
      'Corporate training demand increasing'
    ],
    availableGrants: [
      {
        grantName: 'ESF+ 2021-2027',
        amount: 'Up to 80%',
        description: 'European Social Fund for training and education'
      },
      {
        grantName: 'Digital Schools',
        amount: '50-70%',
        description: 'EdTech, e-learning platforms, digital skills'
      },
      {
        grantName: 'ITS Academy',
        amount: '100% funded',
        description: 'Technical higher education institutes'
      }
    ],
    majorPlayers: [
      'University of Bari - 60,000 students',
      'Politecnico di Bari - Engineering excellence',
      'University of Salento - 20,000 students',
      'LUM University - Private business school',
      'International language schools'
    ],
    investmentOpportunities: [
      {
        type: 'EdTech Platforms',
        description: 'Online learning, skill assessment, AI tutoring',
        investmentRange: '€500K - €5M'
      },
      {
        type: 'Professional Training',
        description: 'Corporate training, certification programs',
        investmentRange: '€200K - €2M'
      },
      {
        type: 'International Schools',
        description: 'K-12 education for expat community',
        investmentRange: '€2M - €10M'
      }
    ],
    statistics: {
      businesses: 1234,
      employees: 25000,
      exports: '€45M',
      contribution: '1.7'
    }
  },

  // 14. REAL ESTATE DEVELOPMENT
  {
    industry: 'Real Estate Development',
    slug: 'real-estate-development',
    seo: {
      metaTitle: 'Real Estate Investment Puglia | Property Development | High ROI',
      metaDescription: 'Invest in Puglia real estate: booming property market, tourist rentals, commercial development. prices 50% below Milan/Rome.',
      keywords: ['real estate puglia', 'property investment italy', 'development puglia', 'italian property', 'real estate ROI']
    },
    heroTitle: 'Develop Prime Properties in Italy\'s Hottest Market',
    heroDescription: 'Puglia\'s real estate market offers exceptional opportunities with prices 50% below Northern Italy, 15%+ annual appreciation, and strong rental demand. From coastal resorts to urban regeneration, access development incentives and high ROI projects.',
    marketSize: '€4.2 Billion',
    growthRate: '15.4',
    keyAdvantages: [
      'Property prices 50% below Milan/Rome',
      '15-20% annual price appreciation',
      'Strong rental demand from tourism',
      'Foreign buyer interest increasing 30% yearly',
      'Coastal development opportunities',
      'Urban regeneration projects in cities'
    ],
    availableGrants: [
      {
        grantName: 'Urban Regeneration Fund',
        amount: 'Up to 60%',
        description: 'Redevelopment of historic centers and degraded areas'
      },
      {
        grantName: 'Tourist Accommodation',
        amount: '40-50%',
        description: 'Development of hotels, B&Bs, vacation rentals'
      },
      {
        grantName: 'Social Housing',
        amount: 'Up to 70%',
        description: 'Affordable housing projects'
      }
    ],
    majorPlayers: [
      'Gruppo Degennaro - Regional developer',
      'International investors (UK, Germany, US)',
      'Hotel chains expanding in region',
      'REITs entering Puglia market'
    ],
    investmentOpportunities: [
      {
        type: 'Coastal Resorts',
        description: 'Beachfront development. 20%+ annual returns',
        investmentRange: '€5M - €100M'
      },
      {
        type: 'Historic Renovations',
        description: 'Convert palazzos, masserie to luxury properties',
        investmentRange: '€1M - €20M'
      },
      {
        type: 'Student Housing',
        description: 'Purpose-built accommodation near universities',
        investmentRange: '€3M - €30M'
      },
      {
        type: 'Logistics Parks',
        description: 'Warehouses near ports and highways',
        investmentRange: '€10M - €50M'
      }
    ],
    statistics: {
      businesses: 8765,
      employees: 45000,
      exports: '€234M',
      contribution: '7.5'
    }
  },

  // 15. FOOD & WINE
  {
    industry: 'Food and Wine Excellence',
    slug: 'food-wine',
    seo: {
      metaTitle: 'Food & Wine Investment Puglia | Culinary Tourism | DOP Products',
      metaDescription: 'Invest in Puglia food & wine: Primitivo wines, Burrata DOP, culinary tourism boom. Grants up to 50% for food enterprises.',
      keywords: ['food investment puglia', 'wine business italy', 'culinary tourism', 'italian food export', 'DOP products puglia']
    },
    heroTitle: 'Savor Success in Italy\'s Culinary Paradise',
    heroDescription: 'Puglia\'s food and wine sector combines centuries-old traditions with modern innovation. Home to Primitivo and Negroamaro wines, Burrata di Andria DOP, and emerging culinary tourism. The €3.2 billion market offers authentic Italian food opportunities.',
    marketSize: '€3.2 Billion',
    growthRate: '13.7',
    keyAdvantages: [
      '5 million hectoliters wine production annually',
      'Burrata di Andria DOP - global demand growing 25%',
      'Culinary tourism growing 20% yearly',
      '15 DOP/IGP protected products',
      'Direct access to raw materials',
      'Export-oriented infrastructure'
    ],
    availableGrants: [
      {
        grantName: 'OCM Wine',
        amount: 'Up to 50%',
        description: 'Wine promotion, cellar modernization, exports'
      },
      {
        grantName: 'Food Processing',
        amount: '40-60%',
        description: 'Modern facilities, packaging, quality systems'
      },
      {
        grantName: 'Agritourism',
        amount: 'Up to 65%',
        description: 'Farm restaurants, wine tours, cooking schools'
      }
    ],
    majorPlayers: [
      'Cantine Due Palme - Largest wine cooperative',
      'Delizia - Burrata producer, global exports',
      'Oropan - Bakery products, €100M revenue',
      'Master - Premium pasta manufacturer'
    ],
    investmentOpportunities: [
      {
        type: 'Wine Estates',
        description: 'Vineyards with production facilities. Enotourism potential',
        investmentRange: '€2M - €20M'
      },
      {
        type: 'Specialty Food Production',
        description: 'Artisanal products for export. Premium pricing',
        investmentRange: '€1M - €10M'
      },
      {
        type: 'Culinary Experiences',
        description: 'Cooking schools, food tours, farm restaurants',
        investmentRange: '€300K - €3M'
      }
    ],
    statistics: {
      businesses: 6543,
      employees: 38000,
      exports: '€987M',
      contribution: '5.7'
    }
  },

  // 16. RETAIL & E-COMMERCE
  {
    industry: 'Retail and E-commerce',
    slug: 'retail-ecommerce',
    seo: {
      metaTitle: 'Retail Investment Puglia | E-commerce Growth | Shopping Tourism',
      metaDescription: 'Invest in Puglia retail: growing consumer market, e-commerce boom, outlet villages. Digital transformation grants up to 50%.',
      keywords: ['retail investment puglia', 'ecommerce italy', 'shopping centers puglia', 'retail grants', 'outlet village investment']
    },
    heroTitle: 'Capture Growing Consumer Markets in Southern Italy',
    heroDescription: 'Puglia\'s retail sector is transforming with e-commerce growing 25% annually and outlet tourism attracting millions. The €5.8 billion market benefits from increasing disposable income and tourist spending.',
    marketSize: '€5.8 Billion',
    growthRate: '9.2',
    keyAdvantages: [
      'E-commerce penetration growing 25% yearly',
      '6 million residents + 15 million tourists',
      'Rising disposable income (+3.5% annually)',
      'Outlet villages attracting shopping tourism',
      'Last-mile delivery infrastructure improving',
      'Digital payment adoption accelerating'
    ],
    availableGrants: [
      {
        grantName: 'Digital Commerce',
        amount: 'Up to 50%',
        description: 'E-commerce platforms, omnichannel retail'
      },
      {
        grantName: 'Retail Innovation',
        amount: '40% tax credit',
        description: 'Store digitalization, customer experience tech'
      },
      {
        grantName: 'Commercial Districts',
        amount: '€50K - €500K',
        description: 'Urban retail regeneration projects'
      }
    ],
    majorPlayers: [
      'Megamark - Supermarket chain, 500+ stores',
      'Mongolfiera Outlets - Designer outlet villages',
      'Local e-commerce platforms',
      'International retailers expanding'
    ],
    investmentOpportunities: [
      {
        type: 'E-commerce Fulfillment',
        description: 'Warehouses for online retail. Strategic location for South',
        investmentRange: '€2M - €20M'
      },
      {
        type: 'Outlet Villages',
        description: 'Designer outlets for shopping tourism',
        investmentRange: '€20M - €100M'
      },
      {
        type: 'Specialty Retail',
        description: 'Local products, artisan goods, Made in Italy',
        investmentRange: '€500K - €5M'
      }
    ],
    statistics: {
      businesses: 23456,
      employees: 98000,
      exports: '€345M',
      contribution: '10.3'
    }
  },

  // 17. FINANCIAL SERVICES
  {
    industry: 'Financial Services',
    slug: 'financial-services',
    seo: {
      metaTitle: 'Financial Services Puglia | Fintech Growth | Investment Funds',
      metaDescription: 'Invest in Puglia financial sector: fintech innovation, regional banks, investment services. R&D tax credits up to 50%.',
      keywords: ['financial services puglia', 'fintech italy', 'banking puglia', 'investment services', 'financial innovation']
    },
    heroTitle: 'Finance Innovation in Southern Italy\'s Growth Market',
    heroDescription: 'Puglia\'s financial sector is modernizing rapidly with fintech adoption, digital banking, and specialized services for SMEs. The €2.1 billion market offers opportunities in innovation and underserved segments.',
    marketSize: '€2.1 Billion',
    growthRate: '7.8',
    keyAdvantages: [
      'Underbanked SME market - 150,000 businesses',
      'Fintech adoption accelerating post-COVID',
      'Lower operational costs for back-office',
      'Government push for cashless payments',
      'Growing wealth management needs',
      'Skilled finance graduates from universities'
    ],
    availableGrants: [
      {
        grantName: 'Fintech Innovation',
        amount: 'Up to 50%',
        description: 'Digital payment systems, blockchain, AI in finance'
      },
      {
        grantName: 'Financial Inclusion',
        amount: '€100K - €1M',
        description: 'Services for underbanked populations and SMEs'
      }
    ],
    majorPlayers: [
      'Banca Popolare di Bari - Regional bank',
      'BCC banks - Cooperative credit network',
      'Fincons Group - Fintech solutions provider',
      'Local investment firms and advisors'
    ],
    investmentOpportunities: [
      {
        type: 'Fintech Solutions',
        description: 'Payment processing, lending platforms, robo-advisors',
        investmentRange: '€1M - €10M'
      },
      {
        type: 'Wealth Management',
        description: 'Private banking for growing affluent class',
        investmentRange: '€2M - €20M'
      },
      {
        type: 'SME Financial Services',
        description: 'Factoring, leasing, alternative lending',
        investmentRange: '€5M - €30M'
      }
    ],
    statistics: {
      businesses: 1876,
      employees: 15000,
      exports: '€123M',
      contribution: '3.7'
    }
  },

  // 18. GREEN TECHNOLOGY
  {
    industry: 'Green Technology',
    slug: 'green-technology',
    seo: {
      metaTitle: 'Green Tech Investment Puglia | Cleantech Innovation | Circular Economy',
      metaDescription: 'Invest in Puglia green technology: waste management, water tech, circular economy. Green Deal funds up to 70%.',
      keywords: ['green technology puglia', 'cleantech italy', 'circular economy puglia', 'environmental tech', 'green innovation']
    },
    heroTitle: 'Pioneer Sustainable Solutions in the Mediterranean',
    heroDescription: 'Puglia leads Italy\'s green transition with innovative solutions in waste management, water technology, and circular economy. The €890 million cleantech sector benefits from EU Green Deal funding and regional sustainability goals.',
    marketSize: '€890 Million',
    growthRate: '19.5',
    keyAdvantages: [
      'Water scarcity drives innovation demand',
      'Circular economy initiatives expanding',
      'EU Green Deal funding available',
      'Strong agricultural sector needs solutions',
      'Coastal protection technology needs',
      'Regional sustainability commitments'
    ],
    availableGrants: [
      {
        grantName: 'Green Transition Fund',
        amount: 'Up to 70%',
        description: 'Cleantech, circular economy, environmental innovation'
      },
      {
        grantName: 'Water Innovation',
        amount: '50-60%',
        description: 'Water saving, treatment, desalination technologies'
      },
      {
        grantName: 'Waste to Value',
        amount: '€500K - €5M',
        description: 'Recycling, waste-to-energy, biomaterials'
      }
    ],
    majorPlayers: [
      'Acquedotto Pugliese - Water utility innovator',
      'Environmental tech startups',
      'Research centers and universities',
      'International cleantech entering market'
    ],
    investmentOpportunities: [
      {
        type: 'Water Technology',
        description: 'Smart irrigation, water treatment, desalination',
        investmentRange: '€2M - €20M'
      },
      {
        type: 'Circular Economy',
        description: 'Recycling facilities, biomaterials, upcycling',
        investmentRange: '€5M - €30M'
      },
      {
        type: 'AgriTech Solutions',
        description: 'Precision farming, resource optimization',
        investmentRange: '€1M - €10M'
      }
    ],
    statistics: {
      businesses: 456,
      employees: 8900,
      exports: '€234M',
      contribution: '1.6'
    }
  },

  // 19. CULTURAL HERITAGE
  {
    industry: 'Cultural Heritage',
    slug: 'cultural-heritage',
    seo: {
      metaTitle: 'Cultural Heritage Puglia | UNESCO Sites | Heritage Tourism',
      metaDescription: 'Invest in Puglia cultural heritage: 4 UNESCO sites, restoration projects, heritage tourism. Cultural grants up to 80%.',
      keywords: ['cultural heritage puglia', 'unesco investment', 'heritage tourism italy', 'restoration puglia', 'cultural grants']
    },
    heroTitle: 'Preserve History While Building Profitable Futures',
    heroDescription: 'Puglia\'s extraordinary cultural heritage includes 4 UNESCO sites, 1000s of historic properties, and living traditions. The €650 million heritage sector offers unique investment opportunities in restoration, cultural tourism, and heritage hospitality.',
    marketSize: '€650 Million',
    growthRate: '11.2',
    keyAdvantages: [
      '4 UNESCO World Heritage Sites',
      'Thousands of historic properties available',
      'Heritage tourism growing 15% annually',
      '€1 properties program for renovation',
      'Tax benefits for cultural investments',
      'Strong government preservation support'
    ],
    availableGrants: [
      {
        grantName: 'Cultural Heritage Fund',
        amount: 'Up to 80%',
        description: 'Restoration of historic buildings and monuments'
      },
      {
        grantName: 'Heritage Tourism',
        amount: '50-70%',
        description: 'Converting historic properties to cultural use'
      },
      {
        grantName: 'Art Bonus',
        amount: '65% tax credit',
        description: 'Donations to cultural heritage projects'
      }
    ],
    majorPlayers: [
      'FAI - Italian Environment Fund properties',
      'Regional heritage authorities',
      'Private restoration companies',
      'Cultural tourism operators'
    ],
    investmentOpportunities: [
      {
        type: 'Historic Hotels',
        description: 'Convert castles, convents to luxury accommodation',
        investmentRange: '€2M - €20M'
      },
      {
        type: 'Cultural Centers',
        description: 'Museums, galleries, performance spaces',
        investmentRange: '€1M - €10M'
      },
      {
        type: 'Heritage Tours',
        description: 'Specialized cultural tourism experiences',
        investmentRange: '€200K - €2M'
      }
    ],
    statistics: {
      businesses: 1234,
      employees: 12000,
      exports: '€89M',
      contribution: '1.2'
    }
  },

  // 20. SPORTS & RECREATION
  {
    industry: 'Sports and Recreation',
    slug: 'sports-recreation',
    seo: {
      metaTitle: 'Sports Investment Puglia | Golf Resorts | Sports Tourism',
      metaDescription: 'Invest in Puglia sports sector: golf courses, sports facilities, cycling tourism. Sport grants up to 60%.',
      keywords: ['sports investment puglia', 'golf resort italy', 'sports tourism', 'recreation puglia', 'sports facilities']
    },
    heroTitle: 'Score Big in Italy\'s Year-Round Sports Paradise',
    heroDescription: 'Puglia\'s perfect climate and diverse landscapes create ideal conditions for sports investments. From golf resorts to cycling tourism and water sports, the €580 million sector is expanding rapidly with health-conscious tourism trends.',
    marketSize: '€580 Million',
    growthRate: '13.4',
    keyAdvantages: [
      '320 days of sunshine for outdoor sports',
      '800km coastline for water sports',
      'Growing golf tourism from Northern Europe',
      'Cycling tourism infrastructure expanding',
      'Sports events attracting international visitors',
      'Health and wellness tourism synergies'
    ],
    availableGrants: [
      {
        grantName: 'Sport Infrastructure',
        amount: 'Up to 60%',
        description: 'Sports facilities, stadiums, training centers'
      },
      {
        grantName: 'Tourism Sports',
        amount: '40-50%',
        description: 'Golf courses, marinas, adventure sports'
      },
      {
        grantName: 'Sport Events',
        amount: '€50K - €500K',
        description: 'International competitions and tournaments'
      }
    ],
    majorPlayers: [
      'San Domenico Golf - 18-hole championship course',
      'Acaya Golf Resort - Links course',
      'Local sports clubs and federations',
      'International event organizers'
    ],
    investmentOpportunities: [
      {
        type: 'Golf Resorts',
        description: 'Championship courses with real estate. High-value tourism',
        investmentRange: '€10M - €50M'
      },
      {
        type: 'Sports Centers',
        description: 'Multi-sport facilities, fitness clubs, wellness',
        investmentRange: '€2M - €15M'
      },
      {
        type: 'Adventure Tourism',
        description: 'Climbing, diving, kitesurfing centers',
        investmentRange: '€500K - €5M'
      }
    ],
    statistics: {
      businesses: 2345,
      employees: 18000,
      exports: '€67M',
      contribution: '1.0'
    }
  },

  // 21. CERAMICS & MATERIALS
  {
    industry: 'Ceramics and Advanced Materials',
    slug: 'ceramics-materials',
    seo: {
      metaTitle: 'Ceramics Investment Puglia | Advanced Materials | Made in Italy',
      metaDescription: 'Invest in Puglia ceramics: traditional crafts meet advanced materials. Innovation grants up to 50% for material science.',
      keywords: ['ceramics puglia', 'advanced materials italy', 'material science investment', 'ceramics manufacturing', 'materials innovation']
    },
    heroTitle: 'Shape the Future with Advanced Materials Innovation',
    heroDescription: 'Puglia combines centuries of ceramic tradition with cutting-edge material science. The €420 million sector spans artisanal pottery to high-tech ceramics for aerospace and medical applications.',
    marketSize: '€420 Million',
    growthRate: '8.9',
    keyAdvantages: [
      'Historic ceramic districts (Grottaglie, Cutrofiano)',
      'Skilled artisan workforce',
      'Advanced materials research at universities',
      'Lower production costs than Northern Italy',
      'Export-oriented infrastructure',
      'Growing demand for technical ceramics'
    ],
    availableGrants: [
      {
        grantName: 'Material Innovation',
        amount: 'Up to 50%',
        description: 'R&D for advanced ceramics, composites, nanomaterials'
      },
      {
        grantName: 'Artisan Modernization',
        amount: '40-60%',
        description: 'Technology upgrades for traditional workshops'
      }
    ],
    majorPlayers: [
      'Ceramiche Nicola Fasano - Artistic ceramics',
      'Technical ceramics manufacturers',
      'Research centers and material labs',
      'Export consortiums'
    ],
    investmentOpportunities: [
      {
        type: 'Technical Ceramics',
        description: 'High-performance materials for industry',
        investmentRange: '€2M - €15M'
      },
      {
        type: 'Artisan Studios',
        description: 'Luxury ceramics, design collaborations',
        investmentRange: '€200K - €2M'
      }
    ],
    statistics: {
      businesses: 876,
      employees: 6700,
      exports: '€198M',
      contribution: '0.7'
    }
  },

  // 22. FURNITURE & DESIGN
  {
    industry: 'Furniture and Design',
    slug: 'furniture-design',
    seo: {
      metaTitle: 'Furniture Investment Puglia | Italian Design | Manufacturing',
      metaDescription: 'Invest in Puglia furniture sector: home to Natuzzi and design excellence. Manufacturing grants up to 50%.',
      keywords: ['furniture investment puglia', 'italian design', 'furniture manufacturing', 'design puglia', 'natuzzi']
    },
    heroTitle: 'Design Italian Excellence at Competitive Costs',
    heroDescription: 'Puglia\'s furniture sector, anchored by global leader Natuzzi, combines Italian design excellence with competitive manufacturing. The €1.1 billion industry exports worldwide while maintaining artisanal quality.',
    marketSize: '€1.1 Billion',
    growthRate: '7.5',
    keyAdvantages: [
      'Natuzzi Group - global furniture leader based here',
      'Complete supply chain from materials to retail',
      'Skilled craftsmen and designers',
      'Lower costs than traditional furniture regions',
      'Strong export infrastructure',
      'Growing home furnishing demand'
    ],
    availableGrants: [
      {
        grantName: 'Design Innovation',
        amount: 'Up to 50%',
        description: 'New product development, digital design tools'
      },
      {
        grantName: 'Export Support',
        amount: '€50K - €300K',
        description: 'International market expansion, showrooms'
      }
    ],
    majorPlayers: [
      'Natuzzi S.p.A. - €400M revenue, global presence',
      'Calia Italia - Upholstered furniture',
      'Local furniture manufacturers',
      'Design studios and showrooms'
    ],
    investmentOpportunities: [
      {
        type: 'Contract Furniture',
        description: 'Hotels, offices, retail. B2B growth market',
        investmentRange: '€3M - €20M'
      },
      {
        type: 'E-commerce Furniture',
        description: 'Direct-to-consumer, customization',
        investmentRange: '€1M - €10M'
      }
    ],
    statistics: {
      businesses: 3456,
      employees: 22000,
      exports: '€567M',
      contribution: '2.0'
    }
  },

  // 23. OLIVE OIL & SPECIALTY FOODS
  {
    industry: 'Olive Oil and Specialty Foods',
    slug: 'olive-oil-specialty-foods',
    seo: {
      metaTitle: 'Olive Oil Investment Puglia | 40% Italian Production | Premium EVOO',
      metaDescription: 'Invest in Puglia olive oil: largest producer in Italy, premium quality, global demand. Processing grants up to 50%.',
      keywords: ['olive oil investment puglia', 'EVOO italy', 'specialty food puglia', 'olive oil business', 'premium olive oil']
    },
    heroTitle: 'Liquid Gold: Dominate Global Olive Oil Markets',
    heroDescription: 'Puglia produces 40% of Italian olive oil with 60 million trees and centuries of expertise. The €1.8 billion sector offers premium positioning opportunities as global demand for quality EVOO soars.',
    marketSize: '€1.8 Billion',
    growthRate: '11.3',
    keyAdvantages: [
      '60 million olive trees - largest concentration globally',
      '180,000 tons annual production',
      'DOP designations: Terra di Bari, Collina di Brindisi',
      'Premium positioning vs. Spanish mass market',
      'Growing global demand for quality EVOO',
      'Complete production infrastructure'
    ],
    availableGrants: [
      {
        grantName: 'Olive Mill Modernization',
        amount: 'Up to 50%',
        description: 'Modern extraction technology, quality systems'
      },
      {
        grantName: 'Organic Certification',
        amount: '€50K - €200K',
        description: 'Support for organic conversion and certification'
      }
    ],
    majorPlayers: [
      'De Carlo - Premium producer, global exports',
      'Oleifici di Terra di Bari DOP consortium',
      '1,000+ local mills and producers',
      'Export cooperatives'
    ],
    investmentOpportunities: [
      {
        type: 'Premium Oil Mills',
        description: 'Single-estate, organic, early harvest oils',
        investmentRange: '€2M - €10M'
      },
      {
        type: 'Value-Added Products',
        description: 'Infused oils, cosmetics, nutraceuticals',
        investmentRange: '€1M - €5M'
      }
    ],
    statistics: {
      businesses: 12345,
      employees: 45000,
      exports: '€876M',
      contribution: '3.2'
    }
  },

  // 24. WINE & VITICULTURE
  {
    industry: 'Wine and Viticulture',
    slug: 'wine-viticulture',
    seo: {
      metaTitle: 'Wine Investment Puglia | Primitivo Capital | Wine Tourism',
      metaDescription: 'Invest in Puglia wine: home to Primitivo, 5M hectoliters production, wine tourism boom. OCM grants up to 50%.',
      keywords: ['wine investment puglia', 'primitivo wine', 'italian vineyard', 'wine tourism puglia', 'viticulture investment']
    },
    heroTitle: 'Cultivate Success in Italy\'s Wine Renaissance',
    heroDescription: 'Puglia produces 5 million hectoliters annually, specializing in bold reds like Primitivo di Manduria and Negroamaro. The €980 million wine sector combines tradition with innovation and growing wine tourism.',
    marketSize: '€980 Million',
    growthRate: '14.2',
    keyAdvantages: [
      'Primitivo di Manduria DOCG - premium positioning',
      '5 million hectoliters annual production',
      '25 DOC/IGT designations',
      'Wine tourism growing 20% annually',
      'Climate ideal for organic viticulture',
      'International recognition increasing'
    ],
    availableGrants: [
      {
        grantName: 'OCM Wine National',
        amount: 'Up to 50%',
        description: 'Vineyard restructuring, cellar technology, promotion'
      },
      {
        grantName: 'Wine Tourism',
        amount: '40-60%',
        description: 'Tasting rooms, accommodation, experiences'
      }
    ],
    majorPlayers: [
      'Cantine Due Palme - Largest cooperative',
      'Leone de Castris - Historic winery',
      'Tormaresca (Antinori) - Premium wines',
      'San Marzano - Export leader'
    ],
    investmentOpportunities: [
      {
        type: 'Premium Wineries',
        description: 'Estate wineries with tourism potential',
        investmentRange: '€3M - €20M'
      },
      {
        type: 'Wine Resorts',
        description: 'Vineyard hotels, restaurants, spas',
        investmentRange: '€5M - €30M'
      }
    ],
    statistics: {
      businesses: 4567,
      employees: 23000,
      exports: '€432M',
      contribution: '1.7'
    }
  },

  // 25. CHEMICAL & PHARMACEUTICAL
  {
    industry: 'Chemical and Pharmaceutical',
    slug: 'chemical-pharmaceutical',
    seo: {
      metaTitle: 'Chemical & Pharma Investment Puglia | Manufacturing Hub',
      metaDescription: 'Invest in Puglia chemical/pharma sector: strategic location, skilled workforce, R&D incentives up to 70%.',
      keywords: ['chemical investment puglia', 'pharmaceutical puglia', 'pharma manufacturing italy', 'chemical industry', 'API production']
    },
    heroTitle: 'Manufacture Excellence in Strategic Mediterranean Hub',
    heroDescription: 'Puglia\'s chemical and pharmaceutical sector leverages strategic ports, competitive costs, and R&D capabilities. The €1.6 billion industry serves European and Mediterranean markets.',
    marketSize: '€1.6 Billion',
    growthRate: '9.8',
    keyAdvantages: [
      'Strategic ports for raw material imports',
      'Lower operational costs vs. Northern Italy',
      'Skilled chemical engineering graduates',
      'R&D collaboration with universities',
      'EU market access',
      'Growing generic drug demand'
    ],
    availableGrants: [
      {
        grantName: 'Pharma R&D',
        amount: 'Up to 70%',
        description: 'Drug development, clinical trials, biosimilars'
      },
      {
        grantName: 'Chemical Innovation',
        amount: '40-50%',
        description: 'Green chemistry, advanced materials, process innovation'
      }
    ],
    majorPlayers: [
      'Merck manufacturing facility',
      'Farmalabor - Generic drugs',
      'Chemical companies in industrial zones',
      'API manufacturers'
    ],
    investmentOpportunities: [
      {
        type: 'Generic Drug Manufacturing',
        description: 'Growing EU market, cost advantages',
        investmentRange: '€10M - €50M'
      },
      {
        type: 'Specialty Chemicals',
        description: 'High-value chemicals for specific industries',
        investmentRange: '€5M - €30M'
      }
    ],
    statistics: {
      businesses: 234,
      employees: 8900,
      exports: '€678M',
      contribution: '2.8'
    }
  },

  // 26. PACKAGING & PRINTING
  {
    industry: 'Packaging and Printing',
    slug: 'packaging-printing',
    seo: {
      metaTitle: 'Packaging Investment Puglia | Sustainable Solutions | Food Packaging',
      metaDescription: 'Invest in Puglia packaging: serving food industry, sustainable materials, digital printing. Innovation grants up to 50%.',
      keywords: ['packaging investment puglia', 'printing italy', 'food packaging', 'sustainable packaging', 'packaging innovation']
    },
    heroTitle: 'Package Success with Sustainable Innovation',
    heroDescription: 'Puglia\'s €720 million packaging sector serves the thriving food industry with innovative, sustainable solutions. Growing demand for eco-friendly packaging creates opportunities.',
    marketSize: '€720 Million',
    growthRate: '10.5',
    keyAdvantages: [
      'Large food industry creates local demand',
      'Sustainable packaging innovation hub',
      'Digital printing technology adoption',
      'Export packaging for Made in Italy products',
      'Lower costs than Northern competitors',
      'Circular economy initiatives'
    ],
    availableGrants: [
      {
        grantName: 'Eco-Packaging Innovation',
        amount: 'Up to 50%',
        description: 'Biodegradable materials, recycling technology'
      },
      {
        grantName: 'Digital Transformation',
        amount: '40% tax credit',
        description: 'Digital printing, automation, Industry 4.0'
      }
    ],
    majorPlayers: [
      'Local packaging manufacturers',
      'Printing companies serving food sector',
      'Innovation startups in biomaterials',
      'Design studios'
    ],
    investmentOpportunities: [
      {
        type: 'Sustainable Packaging',
        description: 'Biodegradable solutions for food industry',
        investmentRange: '€2M - €15M'
      },
      {
        type: 'Smart Packaging',
        description: 'IoT-enabled, track-and-trace solutions',
        investmentRange: '€1M - €10M'
      }
    ],
    statistics: {
      businesses: 1234,
      employees: 9800,
      exports: '€234M',
      contribution: '1.3'
    }
  },

  // 27. SHIPBUILDING & MARINE ENGINEERING
  {
    industry: 'Shipbuilding and Marine Engineering',
    slug: 'shipbuilding-marine',
    seo: {
      metaTitle: 'Shipbuilding Investment Puglia | Yacht Building | Naval Industry',
      metaDescription: 'Invest in Puglia shipbuilding: yacht construction, naval repairs, offshore support. Maritime grants up to 50%.',
      keywords: ['shipbuilding puglia', 'yacht building italy', 'marine engineering', 'naval industry puglia', 'boat manufacturing']
    },
    heroTitle: 'Navigate Success in Maritime Manufacturing',
    heroDescription: 'Puglia\'s shipbuilding tradition spans from luxury yachts to commercial vessels. The €890 million sector benefits from skilled craftsmen, strategic ports, and growing yacht market.',
    marketSize: '€890 Million',
    growthRate: '11.7',
    keyAdvantages: [
      'Three major commercial ports',
      'Centuries of maritime tradition',
      'Skilled workforce in marine trades',
      'Growing superyacht market',
      'Ship repair and refit demand',
      'Offshore wind vessel opportunities'
    ],
    availableGrants: [
      {
        grantName: 'Shipbuilding Innovation',
        amount: 'Up to 50%',
        description: 'New technologies, green shipping solutions'
      },
      {
        grantName: 'Maritime 4.0',
        amount: '40-60%',
        description: 'Digitalization, automation in shipyards'
      }
    ],
    majorPlayers: [
      'Local shipyards and boat builders',
      'Yacht refit specialists',
      'Marine equipment manufacturers',
      'Naval maintenance contractors'
    ],
    investmentOpportunities: [
      {
        type: 'Luxury Yacht Building',
        description: '30-60m yacht construction and refit',
        investmentRange: '€10M - €50M'
      },
      {
        type: 'Offshore Support Vessels',
        description: 'Vessels for wind farms, oil & gas',
        investmentRange: '€20M - €100M'
      }
    ],
    statistics: {
      businesses: 567,
      employees: 12000,
      exports: '€456M',
      contribution: '1.6'
    }
  },

  // 28. STONE & MARBLE
  {
    industry: 'Stone and Marble',
    slug: 'stone-marble',
    seo: {
      metaTitle: 'Stone & Marble Investment Puglia | Trani Stone | Natural Materials',
      metaDescription: 'Invest in Puglia stone sector: famous Trani stone, marble extraction, architectural materials. Processing grants up to 50%.',
      keywords: ['stone investment puglia', 'marble italy', 'trani stone', 'natural stone puglia', 'marble processing']
    },
    heroTitle: 'Build on Centuries of Stone Mastery',
    heroDescription: 'Puglia\'s stone sector, famous for Trani stone and Apricena marble, supplies global architecture projects. The €560 million industry combines extraction with advanced processing.',
    marketSize: '€560 Million',
    growthRate: '7.2',
    keyAdvantages: [
      'Trani stone - globally recognized brand',
      'Apricena marble quarries',
      'Centuries of extraction expertise',
      'Advanced cutting and processing technology',
      'Architecture and design demand',
      'Export infrastructure established'
    ],
    availableGrants: [
      {
        grantName: 'Quarry Modernization',
        amount: 'Up to 50%',
        description: 'Sustainable extraction, processing technology'
      },
      {
        grantName: 'Value Addition',
        amount: '40-60%',
        description: 'Design products, artistic applications'
      }
    ],
    majorPlayers: [
      'Pimar - Trani stone leader',
      'Cave di Apricena - Marble extraction',
      'Local stone processors and exporters',
      'Architectural products manufacturers'
    ],
    investmentOpportunities: [
      {
        type: 'Stone Processing',
        description: 'High-tech cutting, custom architectural elements',
        investmentRange: '€3M - €20M'
      },
      {
        type: 'Design Products',
        description: 'Luxury home products, artistic collaborations',
        investmentRange: '€1M - €5M'
      }
    ],
    statistics: {
      businesses: 890,
      employees: 7800,
      exports: '€345M',
      contribution: '1.0'
    }
  },

  // 29. METAL WORKING
  {
    industry: 'Metal Working and Fabrication',
    slug: 'metal-working',
    seo: {
      metaTitle: 'Metal Working Investment Puglia | Steel Fabrication | Industrial',
      metaDescription: 'Invest in Puglia metal working: steel processing, industrial fabrication, automotive supply. Manufacturing grants up to 50%.',
      keywords: ['metal working puglia', 'steel fabrication italy', 'metal processing', 'industrial metalwork', 'fabrication puglia']
    },
    heroTitle: 'Forge Growth in Industrial Metal Excellence',
    heroDescription: 'Puglia\'s metalworking sector serves automotive, construction, and industrial markets. With Europe\'s largest steel plant nearby, the €2.3 billion industry offers integrated supply chain advantages.',
    marketSize: '€2.3 Billion',
    growthRate: '8.6',
    keyAdvantages: [
      'ArcelorMittal Taranto steel supply',
      'Automotive industry demand',
      'Skilled metalworking workforce',
      'Lower labor costs vs. North',
      'Industrial zones with infrastructure',
      'Export logistics established'
    ],
    availableGrants: [
      {
        grantName: 'Metal Industry 4.0',
        amount: 'Up to 50%',
        description: 'Automation, robotics, digital manufacturing'
      },
      {
        grantName: 'Supply Chain Integration',
        amount: '40-60%',
        description: 'Vertical integration projects'
      }
    ],
    majorPlayers: [
      'Local fabrication companies',
      'Automotive component manufacturers',
      'Industrial equipment producers',
      'Construction steel processors'
    ],
    investmentOpportunities: [
      {
        type: 'Precision Metal Parts',
        description: 'CNC machining for automotive, aerospace',
        investmentRange: '€3M - €20M'
      },
      {
        type: 'Structural Steel',
        description: 'Fabrication for construction, infrastructure',
        investmentRange: '€5M - €30M'
      }
    ],
    statistics: {
      businesses: 3456,
      employees: 28000,
      exports: '€987M',
      contribution: '4.1'
    }
  },

  // 30. TELECOMMUNICATIONS
  {
    industry: 'Telecommunications',
    slug: 'telecommunications',
    seo: {
      metaTitle: 'Telecom Investment Puglia | 5G Infrastructure | Digital Networks',
      metaDescription: 'Invest in Puglia telecom: 5G rollout, fiber optic expansion, digital infrastructure. PNRR funds for connectivity.',
      keywords: ['telecom investment puglia', '5G italy', 'fiber optic puglia', 'digital infrastructure', 'telecom grants']
    },
    heroTitle: 'Connect to High-Speed Digital Opportunities',
    heroDescription: 'Puglia\'s telecommunications sector is rapidly modernizing with 5G deployment and fiber optic expansion. The €1.4 billion market benefits from PNRR digital transformation funds.',
    marketSize: '€1.4 Billion',
    growthRate: '12.8',
    keyAdvantages: [
      '5G rollout accelerating',
      'Fiber optic coverage expanding rapidly',
      'PNRR funds for digital infrastructure',
      'Growing data center demand',
      'Smart city initiatives in major centers',
      'Submarine cable landing points'
    ],
    availableGrants: [
      {
        grantName: 'PNRR Digital Networks',
        amount: 'Up to 70%',
        description: 'Fiber optic, 5G infrastructure, connectivity'
      },
      {
        grantName: 'Digital Divide Fund',
        amount: '€1M - €10M',
        description: 'Connecting underserved areas'
      }
    ],
    majorPlayers: [
      'TIM - Major telecom operator',
      'WindTre - Mobile and fixed services',
      'Open Fiber - Wholesale fiber network',
      'Tower companies and infrastructure'
    ],
    investmentOpportunities: [
      {
        type: 'Data Centers',
        description: 'Edge computing, colocation facilities',
        investmentRange: '€10M - €100M'
      },
      {
        type: '5G Infrastructure',
        description: 'Small cells, private networks',
        investmentRange: '€5M - €50M'
      }
    ],
    statistics: {
      businesses: 456,
      employees: 8900,
      exports: '€123M',
      contribution: '2.5'
    }
  },

  // 31. SECURITY SERVICES
  {
    industry: 'Security Services',
    slug: 'security-services',
    seo: {
      metaTitle: 'Security Services Puglia | Cybersecurity | Safety Solutions',
      metaDescription: 'Invest in Puglia security sector: physical security, cybersecurity, integrated solutions. Growing market with tech opportunities.',
      keywords: ['security services puglia', 'cybersecurity italy', 'security investment', 'safety solutions', 'security technology']
    },
    heroTitle: 'Secure Growing Markets in Safety Solutions',
    heroDescription: 'Puglia\'s security sector combines traditional services with cutting-edge technology. The €450 million market grows with tourism, industry, and cybersecurity needs.',
    marketSize: '€450 Million',
    growthRate: '15.3',
    keyAdvantages: [
      'Tourism sector drives demand',
      'Port and logistics security needs',
      'Growing cybersecurity market',
      'Integration of AI and IoT',
      'Lower operational costs',
      'Skilled IT workforce available'
    ],
    availableGrants: [
      {
        grantName: 'Security Innovation',
        amount: 'Up to 50%',
        description: 'AI surveillance, cybersecurity, integrated systems'
      },
      {
        grantName: 'Safe Tourism',
        amount: '40-60%',
        description: 'Security for hospitality and tourism'
      }
    ],
    majorPlayers: [
      'Regional security companies',
      'International security firms',
      'Cybersecurity startups',
      'Technology integrators'
    ],
    investmentOpportunities: [
      {
        type: 'Integrated Security',
        description: 'Smart surveillance, access control, analytics',
        investmentRange: '€1M - €10M'
      },
      {
        type: 'Cybersecurity Services',
        description: 'SOC, managed security, consulting',
        investmentRange: '€500K - €5M'
      }
    ],
    statistics: {
      businesses: 678,
      employees: 12000,
      exports: '€45M',
      contribution: '0.8'
    }
  },

  // 32. ENVIRONMENTAL SERVICES
  {
    industry: 'Environmental Services',
    slug: 'environmental-services',
    seo: {
      metaTitle: 'Environmental Services Puglia | Waste Management | Sustainability',
      metaDescription: 'Invest in Puglia environmental sector: waste management, recycling, environmental consulting. Circular economy grants.',
      keywords: ['environmental services puglia', 'waste management italy', 'recycling puglia', 'environmental investment', 'circular economy']
    },
    heroTitle: 'Lead the Circular Economy Revolution',
    heroDescription: 'Puglia\'s environmental services sector addresses growing sustainability needs. The €780 million market expands with circular economy initiatives and EU environmental regulations.',
    marketSize: '€780 Million',
    growthRate: '14.2',
    keyAdvantages: [
      'EU circular economy push',
      'Waste management modernization needs',
      'Industrial ecology opportunities',
      'Environmental compliance demand',
      'Public-private partnership models',
      'Green economy incentives'
    ],
    availableGrants: [
      {
        grantName: 'Circular Economy Fund',
        amount: 'Up to 70%',
        description: 'Recycling, waste-to-energy, material recovery'
      },
      {
        grantName: 'Environmental Innovation',
        amount: '50-60%',
        description: 'Clean tech, monitoring systems, remediation'
      }
    ],
    majorPlayers: [
      'Regional waste management companies',
      'Recycling facilities',
      'Environmental consultancies',
      'Technology providers'
    ],
    investmentOpportunities: [
      {
        type: 'Recycling Facilities',
        description: 'Plastic, organic waste, e-waste processing',
        investmentRange: '€5M - €30M'
      },
      {
        type: 'Environmental Tech',
        description: 'Monitoring, remediation, consulting services',
        investmentRange: '€1M - €10M'
      }
    ],
    statistics: {
      businesses: 890,
      employees: 14000,
      exports: '€89M',
      contribution: '1.4'
    }
  },

  // 33. MEDIA & ENTERTAINMENT
  {
    industry: 'Media and Entertainment',
    slug: 'media-entertainment',
    seo: {
      metaTitle: 'Media Investment Puglia | Entertainment Industry | Content Creation',
      metaDescription: 'Invest in Puglia media: film production, digital content, entertainment venues. Creative industry grants up to 60%.',
      keywords: ['media investment puglia', 'entertainment italy', 'content creation', 'film industry puglia', 'media production']
    },
    heroTitle: 'Produce Content in Italy\'s Creative Playground',
    heroDescription: 'Puglia\'s media sector thrives on film production incentives, stunning locations, and digital content growth. The €340 million market attracts international productions.',
    marketSize: '€340 Million',
    growthRate: '16.8',
    keyAdvantages: [
      'Film production incentives',
      'Diverse filming locations',
      'Digital content demand growth',
      'Lower production costs',
      'Creative talent pool',
      'Festival and event infrastructure'
    ],
    availableGrants: [
      {
        grantName: 'Content Creation Fund',
        amount: 'Up to 60%',
        description: 'Film, TV, digital content production'
      },
      {
        grantName: 'Digital Media Innovation',
        amount: '40-50%',
        description: 'Streaming, gaming, interactive media'
      }
    ],
    majorPlayers: [
      'Apulia Film Commission',
      'Local production companies',
      'Digital content creators',
      'Event organizers'
    ],
    investmentOpportunities: [
      {
        type: 'Content Production',
        description: 'Film, series, documentaries for global platforms',
        investmentRange: '€1M - €20M'
      },
      {
        type: 'Entertainment Venues',
        description: 'Cinemas, theaters, entertainment complexes',
        investmentRange: '€2M - €15M'
      }
    ],
    statistics: {
      businesses: 567,
      employees: 6700,
      exports: '€78M',
      contribution: '0.6'
    }
  },

  // 34. SOCIAL SERVICES
  {
    industry: 'Social Services',
    slug: 'social-services',
    seo: {
      metaTitle: 'Social Services Investment Puglia | Healthcare Support | Elder Care',
      metaDescription: 'Invest in Puglia social services: elder care, disability support, social innovation. ESF+ funding available.',
      keywords: ['social services puglia', 'elder care italy', 'healthcare services', 'social investment', 'care facilities']
    },
    heroTitle: 'Invest in Care for Growing Social Needs',
    heroDescription: 'Puglia\'s aging population drives demand for innovative social services. The €890 million sector offers opportunities in elder care, disability services, and social innovation.',
    marketSize: '€890 Million',
    growthRate: '12.4',
    keyAdvantages: [
      'Aging population creates demand',
      'Public-private partnership models',
      'ESF+ funding for social innovation',
      'Lower operational costs',
      'Skilled healthcare workforce',
      'Family-oriented culture'
    ],
    availableGrants: [
      {
        grantName: 'Social Innovation Fund',
        amount: 'Up to 80%',
        description: 'Innovative social services, inclusion projects'
      },
      {
        grantName: 'Care Infrastructure',
        amount: '50-70%',
        description: 'Elder care facilities, day centers'
      }
    ],
    majorPlayers: [
      'Regional social cooperatives',
      'Private care providers',
      'Non-profit organizations',
      'International care operators exploring market'
    ],
    investmentOpportunities: [
      {
        type: 'Elder Care Facilities',
        description: 'Assisted living, nursing homes, day centers',
        investmentRange: '€3M - €20M'
      },
      {
        type: 'Home Care Services',
        description: 'Technology-enabled home care solutions',
        investmentRange: '€500K - €5M'
      }
    ],
    statistics: {
      businesses: 1234,
      employees: 23000,
      exports: '€12M',
      contribution: '1.6'
    }
  },

  // 35. CONSULTING & PROFESSIONAL SERVICES
  {
    industry: 'Consulting and Professional Services',
    slug: 'consulting-professional',
    seo: {
      metaTitle: 'Professional Services Puglia | Business Consulting | B2B Growth',
      metaDescription: 'Invest in Puglia professional services: management consulting, legal, accounting. Growing B2B market opportunities.',
      keywords: ['consulting puglia', 'professional services italy', 'business consulting', 'B2B services', 'management consulting']
    },
    heroTitle: 'Serve Growing Business Markets',
    heroDescription: 'Puglia\'s professional services sector expands with business growth and international investment. The €1.1 billion market offers B2B opportunities across consulting, legal, and technical services.',
    marketSize: '€1.1 Billion',
    growthRate: '9.7',
    keyAdvantages: [
      'Growing SME market needs services',
      'International investment creates demand',
      'Lower costs than major Italian cities',
      'Skilled professional workforce',
      'Digital transformation opportunities',
      'EU funding expertise needed'
    ],
    availableGrants: [
      {
        grantName: 'Digital Professional Services',
        amount: 'Up to 50%',
        description: 'Digital tools, platforms for professional services'
      },
      {
        grantName: 'Innovation Consulting',
        amount: '€25K - €200K',
        description: 'Support for innovation management services'
      }
    ],
    majorPlayers: [
      'Regional offices of major firms',
      'Local professional service firms',
      'Independent consultants',
      'Specialized boutique firms'
    ],
    investmentOpportunities: [
      {
        type: 'Management Consulting',
        description: 'Strategy, operations, digital transformation',
        investmentRange: '€500K - €5M'
      },
      {
        type: 'Technical Services',
        description: 'Engineering, architecture, project management',
        investmentRange: '€1M - €10M'
      }
    ],
    statistics: {
      businesses: 4567,
      employees: 34000,
      exports: '€234M',
      contribution: '2.0'
    }
  },

  // 36. EVENT MANAGEMENT
  {
    industry: 'Event Management',
    slug: 'event-management',
    seo: {
      metaTitle: 'Event Management Puglia | MICE Tourism | Conference Venues',
      metaDescription: 'Invest in Puglia events: MICE tourism growth, unique venues, year-round climate. Event grants and tourism incentives.',
      keywords: ['event management puglia', 'MICE italy', 'conference puglia', 'event venues', 'business events']
    },
    heroTitle: 'Stage Spectacular Events in Stunning Settings',
    heroDescription: 'Puglia\'s event industry leverages unique venues, perfect climate, and growing MICE tourism. The €280 million sector benefits from increased business travel and destination appeal.',
    marketSize: '€280 Million',
    growthRate: '18.5',
    keyAdvantages: [
      'Unique venues: castles, masserie, beaches',
      'Year-round event climate',
      'Growing MICE tourism',
      'Lower costs than major cities',
      'Direct flight connections',
      'G7 Summit 2024 raising profile'
    ],
    availableGrants: [
      {
        grantName: 'MICE Development',
        amount: 'Up to 60%',
        description: 'Conference facilities, event infrastructure'
      },
      {
        grantName: 'Event Innovation',
        amount: '40-50%',
        description: 'Digital events, hybrid solutions'
      }
    ],
    majorPlayers: [
      'Regional event organizers',
      'Venue operators',
      'DMCs and PCOs',
      'International event companies'
    ],
    investmentOpportunities: [
      {
        type: 'Event Venues',
        description: 'Conference centers, unique event spaces',
        investmentRange: '€2M - €20M'
      },
      {
        type: 'Event Services',
        description: 'Full-service event management, technology',
        investmentRange: '€500K - €5M'
      }
    ],
    statistics: {
      businesses: 456,
      employees: 5600,
      exports: '€45M',
      contribution: '0.5'
    }
  },

  // 37. AUTOMOTIVE AFTERMARKET
  {
    industry: 'Automotive Aftermarket',
    slug: 'automotive-aftermarket',
    seo: {
      metaTitle: 'Automotive Aftermarket Puglia | Auto Parts | Vehicle Services',
      metaDescription: 'Invest in Puglia automotive aftermarket: parts distribution, service networks, EV infrastructure. Growing sector.',
      keywords: ['automotive aftermarket puglia', 'auto parts italy', 'vehicle services', 'car repair puglia', 'EV charging']
    },
    heroTitle: 'Drive Growth in Automotive Services',
    heroDescription: 'Puglia\'s automotive aftermarket serves regional vehicle fleet and growing EV adoption. The €1.3 billion sector expands with technological change and service innovation.',
    marketSize: '€1.3 Billion',
    growthRate: '8.9',
    keyAdvantages: [
      'Large vehicle fleet in region',
      'EV adoption creating new opportunities',
      'Automotive manufacturing presence',
      'Distribution hub for Southern Italy',
      'Technical training available',
      'Lower operational costs'
    ],
    availableGrants: [
      {
        grantName: 'EV Infrastructure',
        amount: 'Up to 50%',
        description: 'Charging stations, EV service centers'
      },
      {
        grantName: 'Automotive Innovation',
        amount: '40-60%',
        description: 'Digital services, connected car solutions'
      }
    ],
    majorPlayers: [
      'Parts distributors and wholesalers',
      'Service chain operators',
      'Independent repair shops',
      'EV infrastructure providers'
    ],
    investmentOpportunities: [
      {
        type: 'EV Service Centers',
        description: 'Specialized EV maintenance and charging',
        investmentRange: '€1M - €10M'
      },
      {
        type: 'Parts Distribution',
        description: 'Regional distribution for aftermarket parts',
        investmentRange: '€2M - €15M'
      }
    ],
    statistics: {
      businesses: 3456,
      employees: 23000,
      exports: '€234M',
      contribution: '2.3'
    }
  },

  // 38. PET CARE & VETERINARY
  {
    industry: 'Pet Care and Veterinary',
    slug: 'pet-care-veterinary',
    seo: {
      metaTitle: 'Pet Care Investment Puglia | Veterinary Services | Animal Health',
      metaDescription: 'Invest in Puglia pet care: growing pet ownership, veterinary services, pet products. Expanding market opportunities.',
      keywords: ['pet care puglia', 'veterinary italy', 'animal health', 'pet services', 'veterinary investment']
    },
    heroTitle: 'Capitalize on Growing Pet Economy',
    heroDescription: 'Puglia\'s pet care sector grows with increasing pet ownership and spending. The €230 million market offers opportunities in veterinary services, pet products, and specialized care.',
    marketSize: '€230 Million',
    growthRate: '12.6',
    keyAdvantages: [
      'Pet ownership growing 8% annually',
      'Increased spending on pet health',
      'Underserved veterinary market',
      'Pet tourism opportunities',
      'Agricultural region supports sector',
      'Lower costs for facilities'
    ],
    availableGrants: [
      {
        grantName: 'Veterinary Innovation',
        amount: 'Up to 50%',
        description: 'Advanced veterinary equipment, telemedicine'
      },
      {
        grantName: 'Rural Veterinary',
        amount: '40-70%',
        description: 'Services for agricultural areas'
      }
    ],
    majorPlayers: [
      'Regional veterinary clinics',
      'Pet retail chains',
      'Agricultural veterinary services',
      'Pet food distributors'
    ],
    investmentOpportunities: [
      {
        type: 'Veterinary Hospitals',
        description: 'Full-service animal hospitals, specialty care',
        investmentRange: '€1M - €5M'
      },
      {
        type: 'Pet Resorts',
        description: 'Boarding, grooming, training facilities',
        investmentRange: '€500K - €3M'
      }
    ],
    statistics: {
      businesses: 567,
      employees: 3400,
      exports: '€23M',
      contribution: '0.4'
    }
  },

  // 39. TRANSLATION & LANGUAGE SERVICES
  {
    industry: 'Translation and Language Services',
    slug: 'translation-language',
    seo: {
      metaTitle: 'Language Services Puglia | Translation | Localization Italy',
      metaDescription: 'Invest in Puglia language services: translation, interpretation, localization. Growing international business needs.',
      keywords: ['translation services puglia', 'language services italy', 'localization puglia', 'interpretation', 'language industry']
    },
    heroTitle: 'Bridge Languages in Global Markets',
    heroDescription: 'Puglia\'s language services sector serves growing international business and tourism. The €120 million market expands with globalization and digital content needs.',
    marketSize: '€120 Million',
    growthRate: '15.8',
    keyAdvantages: [
      'Multilingual workforce available',
      'Tourism creates interpretation demand',
      'Lower costs than major cities',
      'Universities produce language graduates',
      'Growing international business',
      'Digital content localization needs'
    ],
    availableGrants: [
      {
        grantName: 'Digital Language Services',
        amount: 'Up to 50%',
        description: 'AI translation, localization platforms'
      },
      {
        grantName: 'Export Support',
        amount: '€10K - €100K',
        description: 'Language services for exporters'
      }
    ],
    majorPlayers: [
      'Regional translation agencies',
      'Freelance translator networks',
      'Language schools',
      'Interpretation services'
    ],
    investmentOpportunities: [
      {
        type: 'Language Tech Platforms',
        description: 'AI-assisted translation, localization tools',
        investmentRange: '€500K - €5M'
      },
      {
        type: 'BPO Language Services',
        description: 'Outsourced translation and support',
        investmentRange: '€1M - €10M'
      }
    ],
    statistics: {
      businesses: 234,
      employees: 2300,
      exports: '€34M',
      contribution: '0.2'
    }
  },

  // 40. WATER SPORTS & MARINE RECREATION
  {
    industry: 'Water Sports and Marine Recreation',
    slug: 'water-sports-marine-recreation',
    seo: {
      metaTitle: 'Water Sports Investment Puglia | Marine Recreation | 800km Coast',
      metaDescription: 'Invest in Puglia water sports: sailing, diving, kitesurfing on 800km coastline. Growing marine tourism sector.',
      keywords: ['water sports puglia', 'marine recreation italy', 'sailing puglia', 'diving centers', 'kitesurfing investment']
    },
    heroTitle: 'Ride the Wave of Marine Recreation Growth',
    heroDescription: 'Puglia\'s 800km coastline offers endless water sports opportunities. The €180 million sector grows with adventure tourism trends and perfect wind conditions.',
    marketSize: '€180 Million',
    growthRate: '16.3',
    keyAdvantages: [
      '800km diverse coastline',
      'Consistent winds for sailing/kiting',
      'Clear waters for diving',
      'Year-round mild climate',
      'Growing adventure tourism',
      'Underdeveloped market potential'
    ],
    availableGrants: [
      {
        grantName: 'Marine Tourism Development',
        amount: 'Up to 60%',
        description: 'Water sports centers, equipment, training'
      },
      {
        grantName: 'Blue Tourism Innovation',
        amount: '40-50%',
        description: 'Sustainable marine recreation'
      }
    ],
    majorPlayers: [
      'Sailing schools and clubs',
      'Diving centers',
      'Kitesurfing schools',
      'Equipment retailers'
    ],
    investmentOpportunities: [
      {
        type: 'Water Sports Centers',
        description: 'Multi-activity centers with equipment rental',
        investmentRange: '€500K - €3M'
      },
      {
        type: 'Marina Activities',
        description: 'Sailing schools, yacht charters, tours',
        investmentRange: '€1M - €5M'
      }
    ],
    statistics: {
      businesses: 345,
      employees: 2800,
      exports: '€12M',
      contribution: '0.3'
    }
  },

  // 41. ALTERNATIVE MEDICINE & WELLNESS
  {
    industry: 'Alternative Medicine and Wellness',
    slug: 'alternative-medicine-wellness',
    seo: {
      metaTitle: 'Wellness Investment Puglia | Alternative Medicine | Spa Tourism',
      metaDescription: 'Invest in Puglia wellness: spa resorts, alternative medicine, wellness tourism. Growing health-conscious market.',
      keywords: ['wellness puglia', 'alternative medicine italy', 'spa investment', 'wellness tourism', 'health retreats']
    },
    heroTitle: 'Heal and Profit in Wellness Paradise',
    heroDescription: 'Puglia\'s wellness sector combines natural healing traditions with modern spa concepts. The €340 million market grows with wellness tourism and health consciousness.',
    marketSize: '€340 Million',
    growthRate: '14.7',
    keyAdvantages: [
      'Natural thermal springs',
      'Mediterranean diet and lifestyle',
      'Growing wellness tourism',
      'Lower operational costs',
      'Year-round climate for retreats',
      'Holistic health traditions'
    ],
    availableGrants: [
      {
        grantName: 'Wellness Tourism',
        amount: 'Up to 60%',
        description: 'Spa facilities, wellness centers, retreats'
      },
      {
        grantName: 'Health Innovation',
        amount: '40-50%',
        description: 'Alternative medicine, wellness technology'
      }
    ],
    majorPlayers: [
      'Luxury spa resorts',
      'Wellness retreat centers',
      'Alternative medicine practitioners',
      'Thermal bath facilities'
    ],
    investmentOpportunities: [
      {
        type: 'Wellness Resorts',
        description: 'Spa hotels, health retreats, yoga centers',
        investmentRange: '€3M - €20M'
      },
      {
        type: 'Medical Wellness',
        description: 'Integrated health and wellness centers',
        investmentRange: '€2M - €10M'
      }
    ],
    statistics: {
      businesses: 567,
      employees: 6700,
      exports: '€45M',
      contribution: '0.6'
    }
  },

  // 42. MUSIC & PERFORMING ARTS
  {
    industry: 'Music and Performing Arts',
    slug: 'music-performing-arts',
    seo: {
      metaTitle: 'Music Industry Puglia | Performing Arts | Cultural Events',
      metaDescription: 'Invest in Puglia music: festivals, venues, performing arts. Rich cultural tradition meets modern entertainment.',
      keywords: ['music industry puglia', 'performing arts italy', 'music festivals', 'concert venues', 'cultural investment']
    },
    heroTitle: 'Orchestrate Success in Cultural Entertainment',
    heroDescription: 'Puglia\'s music scene blends traditional folk with contemporary festivals. The €210 million performing arts sector attracts millions to events like Notte della Taranta.',
    marketSize: '€210 Million',
    growthRate: '11.8',
    keyAdvantages: [
      'Rich musical traditions (pizzica, taranta)',
      'Major festivals draw 500K+ visitors',
      'Year-round outdoor event climate',
      'Lower venue operational costs',
      'Strong public support for arts',
      'Tourism synergies'
    ],
    availableGrants: [
      {
        grantName: 'Cultural Events Fund',
        amount: 'Up to 70%',
        description: 'Festivals, concerts, cultural programming'
      },
      {
        grantName: 'Venue Development',
        amount: '50-60%',
        description: 'Music venues, theaters, cultural spaces'
      }
    ],
    majorPlayers: [
      'Notte della Taranta Festival',
      'Regional theaters and venues',
      'Music production companies',
      'Event organizers'
    ],
    investmentOpportunities: [
      {
        type: 'Festival Development',
        description: 'New music festivals, event series',
        investmentRange: '€500K - €5M'
      },
      {
        type: 'Music Venues',
        description: 'Concert halls, clubs, outdoor amphitheaters',
        investmentRange: '€2M - €15M'
      }
    ],
    statistics: {
      businesses: 456,
      employees: 4500,
      exports: '€23M',
      contribution: '0.4'
    }
  },

  // 43. SMART CITIES & IOT
  {
    industry: 'Smart Cities and IoT',
    slug: 'smart-cities-iot',
    seo: {
      metaTitle: 'Smart Cities Puglia | IoT Investment | Urban Innovation',
      metaDescription: 'Invest in Puglia smart cities: IoT solutions, urban tech, smart infrastructure. PNRR funds for digital transformation.',
      keywords: ['smart cities puglia', 'IoT italy', 'urban innovation', 'smart infrastructure', 'city technology']
    },
    heroTitle: 'Build Tomorrow\'s Intelligent Cities',
    heroDescription: 'Puglia cities embrace smart technology for efficiency and livability. The €290 million smart city market benefits from PNRR digital transformation funds.',
    marketSize: '€290 Million',
    growthRate: '21.4',
    keyAdvantages: [
      'PNRR smart city funding available',
      'Cities committed to digitalization',
      'IoT testbed opportunities',
      'Lower deployment costs',
      'University research partnerships',
      'EU smart city initiatives'
    ],
    availableGrants: [
      {
        grantName: 'Smart City PNRR',
        amount: 'Up to 75%',
        description: 'IoT infrastructure, smart services, platforms'
      },
      {
        grantName: 'Urban Innovation',
        amount: '€100K - €5M',
        description: 'Pilot projects, smart solutions'
      }
    ],
    majorPlayers: [
      'Municipal governments',
      'Technology integrators',
      'IoT solution providers',
      'Research institutions'
    ],
    investmentOpportunities: [
      {
        type: 'Smart Infrastructure',
        description: 'IoT sensors, connectivity, management platforms',
        investmentRange: '€2M - €20M'
      },
      {
        type: 'Urban Tech Solutions',
        description: 'Smart parking, lighting, waste management',
        investmentRange: '€1M - €10M'
      }
    ],
    statistics: {
      businesses: 234,
      employees: 3400,
      exports: '€67M',
      contribution: '0.5'
    }
  },

  // 44. ELDERLY CARE & SENIOR LIVING
  {
    industry: 'Elderly Care and Senior Living',
    slug: 'elderly-care-senior-living',
    seo: {
      metaTitle: 'Elderly Care Investment Puglia | Senior Living | Aging Population',
      metaDescription: 'Invest in Puglia elderly care: assisted living, nursing homes, senior services. Growing aging population creates demand.',
      keywords: ['elderly care puglia', 'senior living italy', 'nursing homes', 'assisted living', 'aging care investment']
    },
    heroTitle: 'Care for Profits in Silver Economy',
    heroDescription: 'Puglia\'s rapidly aging population drives demand for quality elderly care. The €670 million senior living sector offers stable, growing investment opportunities.',
    marketSize: '€670 Million',
    growthRate: '13.2',
    keyAdvantages: [
      '28% population over 65 by 2030',
      'Family-oriented culture values elderly',
      'Lower operational costs vs North',
      'Skilled healthcare workforce',
      'Public-private partnership models',
      'EU funding for social infrastructure'
    ],
    availableGrants: [
      {
        grantName: 'Senior Care Infrastructure',
        amount: 'Up to 70%',
        description: 'Assisted living facilities, day centers'
      },
      {
        grantName: 'Aging in Place',
        amount: '50-60%',
        description: 'Home care technology, services'
      }
    ],
    majorPlayers: [
      'Regional care providers',
      'Social cooperatives',
      'International operators entering',
      'Healthcare groups'
    ],
    investmentOpportunities: [
      {
        type: 'Assisted Living Facilities',
        description: 'Modern senior residences with care services',
        investmentRange: '€5M - €30M'
      },
      {
        type: 'Home Care Networks',
        description: 'Technology-enabled home care services',
        investmentRange: '€1M - €10M'
      }
    ],
    statistics: {
      businesses: 789,
      employees: 18000,
      exports: '€0M',
      contribution: '1.2'
    }
  },

  // 45. ARTIFICIAL INTELLIGENCE
  {
    industry: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    seo: {
      metaTitle: 'AI Investment Puglia | Artificial Intelligence | Machine Learning',
      metaDescription: 'Invest in Puglia AI sector: machine learning, computer vision, AI applications. R&D incentives up to 60%.',
      keywords: ['AI investment puglia', 'artificial intelligence italy', 'machine learning', 'AI startups', 'deep tech puglia']
    },
    heroTitle: 'Architect AI Innovation in Mediterranean Tech Hub',
    heroDescription: 'Puglia\'s emerging AI ecosystem combines research excellence with practical applications. The €140 million AI sector benefits from university partnerships and R&D incentives.',
    marketSize: '€140 Million',
    growthRate: '28.5',
    keyAdvantages: [
      'Strong university AI research',
      'Lower costs for AI development',
      'Government AI strategy support',
      'Growing startup ecosystem',
      'EU AI funding opportunities',
      'Applications across industries'
    ],
    availableGrants: [
      {
        grantName: 'AI Research Fund',
        amount: 'Up to 60%',
        description: 'AI R&D, proof of concepts, applications'
      },
      {
        grantName: 'AI Adoption',
        amount: '40-50%',
        description: 'AI implementation in traditional industries'
      }
    ],
    majorPlayers: [
      'University AI labs',
      'AI startups',
      'Corporate AI initiatives',
      'Research centers'
    ],
    investmentOpportunities: [
      {
        type: 'AI Development Centers',
        description: 'R&D facilities for AI applications',
        investmentRange: '€2M - €20M'
      },
      {
        type: 'AI Solutions',
        description: 'Vertical AI applications for industries',
        investmentRange: '€500K - €5M'
      }
    ],
    statistics: {
      businesses: 123,
      employees: 1800,
      exports: '€45M',
      contribution: '0.2'
    }
  },

  // 46. BATTERY & ENERGY STORAGE
  {
    industry: 'Battery and Energy Storage',
    slug: 'battery-energy-storage',
    seo: {
      metaTitle: 'Battery Investment Puglia | Energy Storage | Grid Solutions',
      metaDescription: 'Invest in Puglia energy storage: batteries, grid storage, EV infrastructure. Strategic for renewable integration.',
      keywords: ['battery investment puglia', 'energy storage italy', 'grid batteries', 'EV batteries', 'storage systems']
    },
    heroTitle: 'Store the Future of Energy',
    heroDescription: 'Puglia\'s renewable leadership creates massive energy storage opportunities. The €380 million battery sector is critical for grid stability and EV infrastructure.',
    marketSize: '€380 Million',
    growthRate: '35.2',
    keyAdvantages: [
      'High renewable penetration needs storage',
      'Grid stability requirements',
      'EV adoption driving demand',
      'Strategic location for distribution',
      'PNRR funding available',
      'Industrial zones ready'
    ],
    availableGrants: [
      {
        grantName: 'Storage Systems Fund',
        amount: 'Up to 65%',
        description: 'Grid-scale batteries, distributed storage'
      },
      {
        grantName: 'EV Infrastructure',
        amount: '50-60%',
        description: 'Charging stations with storage'
      }
    ],
    majorPlayers: [
      'Energy utilities exploring storage',
      'International battery companies',
      'Renewable developers',
      'Grid operators'
    ],
    investmentOpportunities: [
      {
        type: 'Grid Storage Systems',
        description: 'Utility-scale battery installations',
        investmentRange: '€10M - €100M'
      },
      {
        type: 'Distributed Storage',
        description: 'Commercial and residential systems',
        investmentRange: '€2M - €20M'
      }
    ],
    statistics: {
      businesses: 45,
      employees: 890,
      exports: '€123M',
      contribution: '0.7'
    }
  },

  // 47. CIRCULAR ECONOMY
  {
    industry: 'Circular Economy',
    slug: 'circular-economy',
    seo: {
      metaTitle: 'Circular Economy Puglia | Recycling | Sustainable Business',
      metaDescription: 'Invest in Puglia circular economy: recycling, upcycling, waste-to-value. EU Green Deal funds up to 70%.',
      keywords: ['circular economy puglia', 'recycling italy', 'sustainable business', 'waste management', 'green economy']
    },
    heroTitle: 'Close the Loop on Profitable Sustainability',
    heroDescription: 'Puglia embraces circular economy principles with innovative recycling and upcycling. The €520 million sector benefits from EU Green Deal funding and waste regulations.',
    marketSize: '€520 Million',
    growthRate: '19.8',
