export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "InvestInPuglia",
    "description": "Premium investment advisory firm specializing in EU grants and investment management for foreign investors in Puglia, Italy",
    "url": "https://investinpuglia.eu",
    "telephone": "+393514001402",
    "email": "info@investinpuglia.eu",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bari",
      "addressRegion": "Puglia",
      "addressCountry": "IT"
    },
    "priceRange": "€€€",
    "serviceType": ["Investment Advisory", "EU Grant Consulting", "Project Management"],
    "areaServed": {
      "@type": "Place",
      "name": "Puglia, Italy"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Investment Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "EU Grant Application",
            "description": "35-50% non-repayable grants up to €2.25M"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Investment Advisory",
            "description": "Complete project management from €2,500 per phase"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}