// scripts/professional-crawler/crawler.js
require('dotenv').config({ path: '../../.env.local' });
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs').promises;

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Professional categories to search
const CATEGORIES = [
  'lawyer',
  'avvocato',
  'notary',
  'notaio',
  'real estate agent',
  'agente immobiliare',
  'architect',
  'architetto',
  'accountant',
  'commercialista',
  'tax advisor',
  'consulente fiscale',
  'engineer',
  'ingegnere',
  'surveyor',
  'geometra'
];

// Puglia cities to search
const PUGLIA_CITIES = [
  'Bari', 'Lecce', 'Brindisi', 'Taranto', 'Foggia',
  'Andria', 'Barletta', 'Trani', 'Monopoli', 'Ostuni',
  'Gallipoli', 'Otranto', 'Polignano a Mare', 'Alberobello',
  'Martina Franca', 'Fasano', 'Manduria', 'Nardò'
];

// CSV Writer setup
const csvWriter = createObjectCsvWriter({
  path: 'professionals.csv',
  header: [
    { id: 'name', title: 'Name' },
    { id: 'email', title: 'Email' },
    { id: 'phone', title: 'Phone' },
    { id: 'profession', title: 'Profession' },
    { id: 'business_name', title: 'Business Name' },
    { id: 'address', title: 'Address' },
    { id: 'city', title: 'City' },
    { id: 'website', title: 'Website' },
    { id: 'source', title: 'Source' }
  ]
});

class ProfessionalCrawler {
  constructor() {
    this.professionals = [];
    this.browser = null;
  }

  async initialize() {
    console.log('🚀 Starting Professional Crawler for Puglia...');
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  // Google Maps crawler
  async crawlGoogleMaps(category, city) {
    console.log(`🔍 Searching Google Maps for ${category} in ${city}...`);
    const page = await this.browser.newPage();
    
    try {
      const searchQuery = `${category} ${city} Puglia Italy`;
      const url = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
      
      await page.goto(url, { waitUntil: 'networkidle0' });
      await page.waitForTimeout(3000);

      // Scroll to load more results
      const scrollContainer = 'div[role="feed"]';
      await page.waitForSelector(scrollContainer);
      
      for (let i = 0; i < 5; i++) {
        await page.evaluate((selector) => {
          const element = document.querySelector(selector);
          if (element) element.scrollTop = element.scrollHeight;
        }, scrollContainer);
        await page.waitForTimeout(2000);
      }

      // Extract business information
      const results = await page.evaluate(() => {
        const businesses = [];
        const cards = document.querySelectorAll('div[role="feed"] > div > div[jsaction]');
        
        cards.forEach(card => {
          try {
            const name = card.querySelector('div[role="heading"]')?.textContent || '';
            const address = card.querySelector('span[jsan*="address"]')?.textContent || '';
            const phone = card.querySelector('span[jsan*="phone"]')?.textContent || '';
            const website = card.querySelector('a[data-value*="website"]')?.href || '';
            
            if (name && (phone || website)) {
              businesses.push({
                name: name.trim(),
                address: address.trim(),
                phone: phone.trim(),
                website: website.trim()
              });
            }
          } catch (e) {
            // Skip invalid entries
          }
        });
        
        return businesses;
      });

      // Process and add to our list
      results.forEach(business => {
        this.professionals.push({
          name: this.extractPersonName(business.name),
          email: '', // Will be enriched later
          phone: business.phone,
          profession: this.mapProfession(category),
          business_name: business.name,
          address: business.address,
          city: city,
          website: business.website,
          source: 'Google Maps'
        });
      });

      console.log(`✅ Found ${results.length} professionals`);
    } catch (error) {
      console.error(`❌ Error crawling Google Maps: ${error.message}`);
    } finally {
      await page.close();
    }
  }

  // Italian Yellow Pages crawler
  async crawlPagineGialle(category, city) {
    console.log(`🔍 Searching PagineGialle for ${category} in ${city}...`);
    
    try {
      const searchQuery = category.includes('avvocato') || category.includes('notaio') 
        ? category 
        : this.translateToItalian(category);
      
      const url = `https://www.paginegialle.it/ricerca/${encodeURIComponent(searchQuery)}/${encodeURIComponent(city)}`;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      
      $('.vcard').each((index, element) => {
        const name = $(element).find('.org').text().trim();
        const phone = $(element).find('.phone').text().trim();
        const address = $(element).find('.street-address').text().trim();
        const website = $(element).find('.web a').attr('href') || '';
        
        if (name && phone) {
          this.professionals.push({
            name: this.extractPersonName(name),
            email: '', // Will be enriched later
            phone: phone,
            profession: this.mapProfession(category),
            business_name: name,
            address: address,
            city: city,
            website: website,
            source: 'PagineGialle'
          });
        }
      });
      
      console.log(`✅ Found ${$('.vcard').length} professionals`);
    } catch (error) {
      console.error(`❌ Error crawling PagineGialle: ${error.message}`);
    }
  }

  // LinkedIn scraper (limited due to restrictions)
  async searchLinkedIn(category, city) {
    console.log(`🔍 Searching LinkedIn for ${category} in ${city}...`);
    
    try {
      // Use Google to find LinkedIn profiles
      const searchQuery = `site:linkedin.com/in "${category}" "${city}" Puglia`;
      const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      const $ = cheerio.load(response.data);
      const profiles = [];
      
      $('a[href*="linkedin.com/in/"]').each((index, element) => {
        const href = $(element).attr('href');
        if (href && !profiles.includes(href)) {
          profiles.push(href);
        }
      });
      
      console.log(`✅ Found ${profiles.length} LinkedIn profiles`);
      // Note: Full profile scraping would require authentication
    } catch (error) {
      console.error(`❌ Error searching LinkedIn: ${error.message}`);
    }
  }

  // Helper functions
  extractPersonName(businessName) {
    // Extract person name from business name patterns
    const patterns = [
      /^(?:Studio\s+)?(?:Legale\s+)?(?:Avv\.?\s+)?(.+?)$/i,
      /^(?:Dott\.?\s+)?(?:Arch\.?\s+)?(?:Ing\.?\s+)?(.+?)$/i,
      /^(.+?)\s+(?:Studio|Office|Associati).*$/i
    ];
    
    for (const pattern of patterns) {
      const match = businessName.match(pattern);
      if (match) return match[1].trim();
    }
    
    return businessName;
  }

  translateToItalian(category) {
    const translations = {
      'lawyer': 'avvocato',
      'notary': 'notaio',
      'real estate agent': 'agente immobiliare',
      'architect': 'architetto',
      'accountant': 'commercialista',
      'tax advisor': 'consulente fiscale',
      'engineer': 'ingegnere',
      'surveyor': 'geometra'
    };
    
    return translations[category] || category;
  }

  mapProfession(category) {
    const professionMap = {
      'lawyer': 'Legal Services',
      'avvocato': 'Legal Services',
      'notary': 'Legal Services',
      'notaio': 'Legal Services',
      'real estate agent': 'Real Estate',
      'agente immobiliare': 'Real Estate',
      'architect': 'Architecture & Design',
      'architetto': 'Architecture & Design',
      'accountant': 'Finance & Tax',
      'commercialista': 'Finance & Tax',
      'tax advisor': 'Finance & Tax',
      'consulente fiscale': 'Finance & Tax',
      'engineer': 'Engineering',
      'ingegnere': 'Engineering',
      'surveyor': 'Engineering',
      'geometra': 'Engineering'
    };
    
    return professionMap[category] || 'Other';
  }

  // Save to database
  async saveToSupabase() {
    console.log('💾 Saving professionals to database...');
    
    const uniqueProfessionals = this.removeDuplicates();
    let saved = 0;
    let errors = 0;
    
    for (const prof of uniqueProfessionals) {
      try {
        // Check if already exists
        const { data: existing } = await supabase
          .from('professionals')
          .select('id')
          .or(`phone.eq.${prof.phone},business_name.eq.${prof.business_name}`)
          .single();
        
        if (!existing) {
          // Create pre-registration
          const { data, error } = await supabase
            .from('professionals')
            .insert({
              name: prof.name,
              email: prof.email || null,
              phone: prof.phone,
              profession: prof.profession,
              business_name: prof.business_name,
              address: prof.address,
              city: prof.city,
              website: prof.website,
              description: `Professional ${prof.profession} services in ${prof.city}`,
              languages: ['Italian', 'English'],
              status: 'pending',
              source: prof.source
            })
            .select()
            .single();
          
          if (!error) {
            saved++;
            console.log(`✅ Saved: ${prof.name}`);
          } else {
            errors++;
            console.error(`❌ Error saving ${prof.name}: ${error.message}`);
          }
        }
      } catch (error) {
        errors++;
        console.error(`❌ Error: ${error.message}`);
      }
    }
    
    console.log(`\n📊 Summary: ${saved} saved, ${errors} errors, ${uniqueProfessionals.length} total`);
  }

  removeDuplicates() {
    const seen = new Set();
    const unique = [];
    
    this.professionals.forEach(prof => {
      const key = `${prof.phone}-${prof.business_name}`.toLowerCase();
      if (!seen.has(key) && prof.phone) {
        seen.add(key);
        unique.push(prof);
      }
    });
    
    return unique;
  }

  async saveToCsv() {
    console.log('📄 Saving to CSV file...');
    await csvWriter.writeRecords(this.removeDuplicates());
    console.log('✅ CSV file saved: professionals.csv');
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async run() {
    try {
      await this.initialize();
      
      // Crawl each category in each city
      for (const city of PUGLIA_CITIES) {
        for (const category of CATEGORIES) {
          // Google Maps
          await this.crawlGoogleMaps(category, city);
          await this.sleep(2000); // Rate limiting
          
          // PagineGialle (Italian professionals)
          if (category.includes('avvocato') || category.includes('notaio')) {
            await this.crawlPagineGialle(category, city);
            await this.sleep(2000);
          }
        }
        
        // Save progress after each city
        await this.saveToCsv();
      }
      
      // Save to database
      await this.saveToSupabase();
      
      console.log(`\n🎉 Crawling complete! Found ${this.professionals.length} professionals.`);
    } catch (error) {
      console.error('Fatal error:', error);
    } finally {
      await this.cleanup();
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run crawler
if (require.main === module) {
  const crawler = new ProfessionalCrawler();
  crawler.run();
}

module.exports = ProfessionalCrawler;
