// scripts/init-metadata.ts
// Run this script to initialize metadata for all pages: npx tsx scripts/init-metadata.ts

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { PageMetadata, upsertPageMetadata } from '../lib/metadata-manager';
import { PAGE_OG_IMAGES, generateOGImageUrl } from '../lib/og-images';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD5W53Mh-RqugrgyaALsf4ERPKHNiEF4BM",
  authDomain: "invest-in-puglia-eu.firebaseapp.com",
  projectId: "invest-in-puglia-eu",
  storageBucket: "invest-in-puglia-eu.firebasestorage.app",
  messagingSenderId: "515052973978",
  appId: "1:515052973978:web:68df8862710f9b89df5423",
  measurementId: "G-B6V5FJ4ECZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Define initial metadata for main pages
const initialMetadata: PageMetadata[] = [
  {
    path: '/',
    title: 'PIA & Mini PIA Grants Puglia - EU Co-Funded Non-Refundable Grants | Invest in Puglia',
    description: 'Expert advisory for PIA and Mini PIA non-refundable grants. EU co-funded Puglia Regional Development programmes offering up to 55% funding (max €2.75M) for international businesses.',
    keywords: ['PIA grants puglia', 'Mini PIA grants', 'PIA Turismo', 'non refundable grants italy', 'EU co-funded puglia'],
    ogTitle: 'PIA & Mini PIA Non-Refundable Grants - EU Co-Funded Puglia Regional Development',
    ogDescription: 'Access PIA and Mini PIA non-refundable grants through EU co-funded Puglia Regional Development programmes. Up to 55% funding (max €2.75M) for international businesses.',
    ogImage: generateOGImageUrl({
      imageId: PAGE_OG_IMAGES.home.imageId,
      title: PAGE_OG_IMAGES.home.title,
      description: PAGE_OG_IMAGES.home.description,
      watermark: true
    }),
    published: true
  },
  {
    path: '/about',
    title: 'About Us - Leadership Team | Invest in Puglia',
    description: 'Meet the InvestInPuglia leadership team. Giuseppe Funaro (CEO), Dott. Ing. Cataldo Russo (CTO), Antonio Quarta (CFO), Sabine van Putten (Strategic Partnerships). 29+ years of excellence.',
    keywords: ['InvestInPuglia team', 'Giuseppe Funaro CEO', 'Cataldo Russo CTO', 'Sabine van Putten', 'Puglia investment experts'],
    ogTitle: 'Meet Our Leadership Team',
    ogDescription: '29+ years of excellence in Italian real estate and tourism development. Expert team dedicated to your investment success.',
    ogImage: generateOGImageUrl({
      imageId: PAGE_OG_IMAGES.about.imageId,
      title: PAGE_OG_IMAGES.about.title,
      description: PAGE_OG_IMAGES.about.description,
      watermark: true
    }),
    published: true
  },
  {
    path: '/portfolio',
    title: 'Portfolio - €100M+ Projects | Invest in Puglia',
    description: 'Explore our portfolio of €100M+ successful projects and €25M+ secured grants. From luxury resorts to historic palazzo restorations in Puglia.',
    keywords: ['Puglia investment portfolio', 'luxury resorts Italy', 'historic restoration projects', 'PIA grant success stories'],
    ogTitle: 'Portfolio - €100M+ in Successful Projects',
    ogDescription: 'Discover our track record: €100M+ in projects, €25M+ grants secured, 30 years of excellence in Puglia real estate.',
    ogImage: generateOGImageUrl({
      imageId: PAGE_OG_IMAGES.portfolio.imageId,
      title: PAGE_OG_IMAGES.portfolio.title,
      description: PAGE_OG_IMAGES.portfolio.description,
      watermark: true
    }),
    published: true
  },
  {
    path: '/services',
    title: 'Services - Complete Investment Support | Invest in Puglia',
    description: 'Comprehensive investment services: PIA & Mini PIA grants, property acquisition, renovation management, legal support, and tourism development in Puglia.',
    keywords: ['PIA grant consulting', 'Puglia property services', 'Italian investment advisory', 'renovation management Italy'],
    ogTitle: 'Our Services - Complete Investment Support',
    ogDescription: 'From grant applications to property management - your complete investment partner in Puglia.',
    ogImage: generateOGImageUrl({
      imageId: PAGE_OG_IMAGES.services.imageId,
      title: PAGE_OG_IMAGES.services.title,
      description: PAGE_OG_IMAGES.services.description,
      watermark: true
    }),
    published: true
  },
  {
    path: '/properties',
    title: 'Investment Properties in Puglia | Invest in Puglia',
    description: 'Exclusive investment properties in Puglia: luxury masserias, historic palazzos, coastal resorts. Pre-qualified for PIA grants with guaranteed ROI.',
    keywords: ['Puglia properties for sale', 'masseria investment', 'luxury real estate Italy', 'PIA eligible properties'],
    ogTitle: 'Luxury Investment Properties in Puglia',
    ogDescription: 'Handpicked investment opportunities: masserias, palazzos, coastal properties. All pre-qualified for grants.',
    ogImage: generateOGImageUrl({
      imageId: PAGE_OG_IMAGES.properties.imageId,
      title: PAGE_OG_IMAGES.properties.title,
      description: PAGE_OG_IMAGES.properties.description,
      watermark: true
    }),
    published: true
  },
  {
    path: '/contact',
    title: 'Contact Us - Start Your Investment Journey | Invest in Puglia',
    description: 'Contact our investment experts for a free consultation. WhatsApp, email, or schedule a call. Available in English, Italian, German, French, Spanish.',
    keywords: ['contact InvestInPuglia', 'investment consultation', 'Giuseppe Funaro contact', 'Puglia investment advisor'],
    ogTitle: 'Contact Us - Start Your Investment Journey',
    ogDescription: 'Get expert advice on PIA grants and Puglia investments. Free consultation available in multiple languages.',
    ogImage: generateOGImageUrl({
      imageId: PAGE_OG_IMAGES.contact.imageId,
      title: PAGE_OG_IMAGES.contact.title,
      description: PAGE_OG_IMAGES.contact.description,
      watermark: true
    }),
    published: true
  },
  {
    path: '/blog',
    title: 'Blog - Investment Insights & News | Invest in Puglia',
    description: 'Latest insights on PIA grants, Puglia real estate trends, investment opportunities, and success stories from our portfolio.',
    keywords: ['Puglia investment blog', 'PIA grant news', 'Italian real estate insights', 'investment opportunities Italy'],
    ogTitle: 'Investment Insights & News',
    ogDescription: 'Stay informed with the latest PIA grant updates, market trends, and investment opportunities in Puglia.',
    ogImage: generateOGImageUrl({
      imageId: PAGE_OG_IMAGES.portfolio.imageId,
      title: 'Investment Insights',
      description: 'Latest news and opportunities in Puglia',
      watermark: true
    }),
    published: true
  },
  {
    path: '/locations',
    title: 'Investment Locations in Puglia | Invest in Puglia',
    description: 'Explore prime investment locations across Puglia: Bari, Lecce, Brindisi, Valle d\'Itria, Salento coast. Each with unique opportunities.',
    keywords: ['Puglia investment locations', 'Bari real estate', 'Lecce properties', 'Valle d\'Itria investment', 'Salento coast'],
    ogTitle: 'Prime Investment Locations in Puglia',
    ogDescription: 'Discover the best investment locations across Puglia, from coastal resorts to historic city centers.',
    ogImage: generateOGImageUrl({
      imageId: PAGE_OG_IMAGES.puglia.imageId,
      title: PAGE_OG_IMAGES.puglia.title,
      description: PAGE_OG_IMAGES.puglia.description,
      watermark: true
    }),
    published: true
  },
  {
    path: '/how-it-works',
    title: 'How It Works - Investment Process | Invest in Puglia',
    description: 'Simple 5-step process: consultation, property selection, grant application, renovation, and management. Complete support at every stage.',
    keywords: ['investment process Italy', 'PIA grant application process', 'property investment steps', 'Puglia investment guide'],
    ogTitle: 'How It Works - Your Investment Journey',
    ogDescription: 'From initial consultation to property management - discover our proven 5-step investment process.',
    ogImage: generateOGImageUrl({
      imageId: PAGE_OG_IMAGES.services.imageId,
      title: 'Investment Process',
      description: 'Your journey from vision to success',
      watermark: true
    }),
    published: true
  },
  {
    path: '/mini-pia-guide',
    title: 'Mini PIA Grant Guide - Complete Information | Invest in Puglia',
    description: 'Complete guide to Mini PIA grants: eligibility, funding amounts, application process, timelines. Up to 55% non-refundable funding.',
    keywords: ['Mini PIA guide', 'Mini PIA requirements', 'Mini PIA funding', 'small business grants Puglia', 'Mini PIA application'],
    ogTitle: 'Mini PIA Grant - Complete Guide',
    ogDescription: 'Everything you need to know about Mini PIA grants: up to 55% funding for small and medium enterprises.',
    ogImage: generateOGImageUrl({
      imageId: PAGE_OG_IMAGES.grants.imageId,
      title: 'Mini PIA Grants',
      description: 'Up to 55% non-refundable funding',
      watermark: true
    }),
    published: true
  },
  {
    path: '/faq',
    title: 'FAQ - Frequently Asked Questions | Invest in Puglia',
    description: 'Answers to common questions about PIA grants, investment process, property ownership, taxes, and residency requirements in Italy.',
    keywords: ['PIA grants FAQ', 'Italy investment questions', 'Puglia property FAQ', 'Italian residency requirements'],
    ogTitle: 'Frequently Asked Questions',
    ogDescription: 'Get answers to common questions about investing in Puglia and PIA grant applications.',
    ogImage: generateOGImageUrl({
      imageId: PAGE_OG_IMAGES.services.imageId,
      title: 'FAQ',
      description: 'Your questions answered',
      watermark: true
    }),
    published: true
  },
  {
    path: '/tools',
    title: 'Investment Tools & Calculators | Invest in Puglia',
    description: 'Free tools: PIA grant calculator, ROI calculator, property comparison tool, and investment timeline planner for Puglia investments.',
    keywords: ['PIA grant calculator', 'ROI calculator Italy', 'investment tools', 'property comparison tool'],
    ogTitle: 'Investment Tools & Calculators',
    ogDescription: 'Free tools to plan and calculate your Puglia investment: grant eligibility, ROI, and more.',
    ogImage: generateOGImageUrl({
      imageId: PAGE_OG_IMAGES.services.imageId,
      title: 'Investment Tools',
      description: 'Calculate your investment potential',
      watermark: true
    }),
    published: true
  }
];

async function initializeMetadata() {
  console.log('🚀 Starting metadata initialization...');
  
  for (const metadata of initialMetadata) {
    try {
      const id = await upsertPageMetadata(metadata);
      console.log(`✅ Initialized metadata for ${metadata.path}`);
    } catch (error) {
      console.error(`❌ Failed to initialize metadata for ${metadata.path}:`, error);
    }
  }
  
  console.log('✨ Metadata initialization complete!');
  process.exit(0);
}

// Run the initialization
initializeMetadata().catch(console.error);