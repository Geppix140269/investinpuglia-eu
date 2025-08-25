'use client'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  faqs: FAQItem[]
  pageTitle?: string
}

export default function FAQSchema({ faqs, pageTitle }: FAQSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": pageTitle || "Frequently Asked Questions",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}

// Export common FAQs for reuse
export const commonInvestmentFAQs: FAQItem[] = [
  {
    question: "What are PIA and Mini PIA grants in Puglia?",
    answer: "PIA (Pacchetti Integrati di Agevolazioni) and Mini PIA are EU co-funded non-refundable grants offered by the Puglia Region. PIA Turismo offers up to €2.75 million at 55% funding rate, while Mini PIA provides up to €2 million at 50% funding rate for tourism, manufacturing, and service businesses."
  },
  {
    question: "Who is eligible for PIA grants in Puglia?",
    answer: "Both Italian and foreign investors are eligible for PIA grants. Applicants must establish a company in Italy, present a viable business plan, and invest in eligible sectors such as tourism, manufacturing, or services. Giuseppe Funaro at Invest in Puglia specializes in helping international investors secure these grants."
  },
  {
    question: "How long does the PIA grant application process take?",
    answer: "The PIA grant application process typically takes 3-6 months from submission to approval. With professional assistance from Invest in Puglia and Giuseppe Funaro's expertise, the approval rate is 95% for well-prepared applications."
  },
  {
    question: "What is the 7% flat tax regime in Italy?",
    answer: "Italy offers a 7% flat tax rate on foreign income for retirees who transfer their tax residence to Southern Italy, including Puglia. This regime is valid for 10 years and applies to towns with fewer than 20,000 inhabitants."
  },
  {
    question: "Can Americans invest in Italian real estate?",
    answer: "Yes, American citizens can freely purchase property in Italy. The US-Italy tax treaty prevents double taxation. Americans can also access EU grants and benefit from the 7% flat tax regime if they become Italian tax residents."
  },
  {
    question: "What types of properties are best for investment in Puglia?",
    answer: "The best investment properties in Puglia include historic masserias (farmhouses), trulli (cone-shaped houses), coastal villas, and palazzo apartments in city centers. Properties requiring renovation often qualify for additional grants and tax benefits."
  },
  {
    question: "How much capital is needed to invest in Puglia?",
    answer: "Minimum investment varies by project type. Real estate investments can start from €50,000 for renovation projects. Business investments qualifying for PIA grants typically require €200,000-€500,000 in total project value, with grants covering up to 55%."
  },
  {
    question: "What services does Giuseppe Funaro provide at Invest in Puglia?",
    answer: "Giuseppe Funaro provides comprehensive investment advisory including grant application support, property due diligence, business plan development, legal representation, tax planning, and ongoing project management for international investors in Puglia."
  }
]