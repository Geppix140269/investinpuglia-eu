// PATH: components/FAQClient.tsx
'use client'
import { useState } from 'react'
import { ChevronDown, Search, Home, Building, FileText, Euro, Shield, Globe, Users } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
  category: string
}

export default function FAQClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openItems, setOpenItems] = useState<number[]>([])

  const categories = [
    { id: 'all', name: 'All Questions', icon: null },
    { id: 'property', name: 'Property Investment', icon: Home },
    { id: 'business', name: 'Business Investment', icon: Building },
    { id: 'process', name: 'Our Process', icon: Shield },
    { id: 'costs', name: 'Costs & ROI', icon: Euro },
    { id: 'legal', name: 'Legal & Tax', icon: FileText },
    { id: 'living', name: 'Living in Puglia', icon: Globe },
    { id: 'services', name: 'Our Services', icon: Users }
  ]

  const faqs: FAQItem[] = [
    // Property Investment
    {
      question: "What types of properties can I invest in through InvestInPuglia?",
      answer: "We assist with all property types including residential homes, commercial properties, historic trulli and masserie, agricultural estates, development land, and hospitality properties. Our expertise covers both renovation projects and new developments, with opportunities ranging from €150,000 to multi-million euro investments. We specialize in identifying properties with strong appreciation potential and rental income opportunities.",
      category: "property"
    },
    {
      question: "What are the best areas in Puglia for property investment?",
      answer: "Prime investment areas include the Valle d'Itria (Ostuni, Cisternino, Locorotondo) for traditional properties, coastal areas like Polignano a Mare and Monopoli for tourism potential, Lecce for urban investments, and the Gargano peninsula for nature-focused projects. Each area offers different investment profiles - we help match locations to your investment strategy, whether seeking rental yields, capital appreciation, or lifestyle investments.",
      category: "property"
    },
    {
      question: "How do property prices in Puglia compare to other Italian regions?",
      answer: "Puglia offers exceptional value compared to Tuscany, Umbria, or the Italian Lakes. Properties here are typically 30-50% less expensive than comparable properties in more established regions. A restored trullo that might cost €300,000 in Puglia could be €500,000+ in Tuscany. This price advantage, combined with growing tourism and infrastructure improvements, creates strong appreciation potential. We provide detailed comparative market analyses for informed decision-making.",
      category: "property"
    },
    {
      question: "What is the potential ROI for property investments in Puglia?",
      answer: "ROI varies by property type and location. Rental properties in tourist areas can yield 5-8% annually, with peak season weekly rates of €1,500-5,000. Property appreciation averages 3-5% annually, with renovated historic properties seeing higher gains. Commercial properties and hospitality ventures can yield 8-12%. We provide detailed ROI projections based on comparable properties and market trends.",
      category: "property"
    },
    
    // Business Investment
    {
      question: "What business investment opportunities exist in Puglia?",
      answer: "Puglia offers diverse business opportunities including hospitality (boutique hotels, B&Bs, restaurants), agricultural ventures (olive oil, wine, organic farming), tourism services (tours, experiences, transport), renewable energy projects, technology startups in growing tech hubs, and manufacturing leveraging local craftsmanship. We help identify opportunities matching your expertise and investment goals, with investments ranging from €50,000 for small ventures to multi-million euro projects.",
      category: "business"
    },
    {
      question: "How does InvestInPuglia support business investments?",
      answer: "We provide comprehensive support including market research and feasibility studies, business plan development, identifying local partners and suppliers, navigating Italian bureaucracy and regulations, accessing government incentives and EU funding, recruiting local talent, and ongoing business development support. Our network includes lawyers, accountants, and industry specialists to ensure your business venture succeeds.",
      category: "business"
    },
    {
      question: "What incentives are available for businesses in Puglia?",
      answer: "The Italian government and EU offer substantial incentives for businesses in Southern Italy, including tax credits up to 45% for investments, reduced corporate tax rates, grants for innovation and digitalization, subsidized loans and guarantees, and special economic zone benefits. Specific programs like 'Resto al Sud' offer up to €50,000 for young entrepreneurs. We help identify and apply for all available incentives.",
      category: "business"
    },
    {
      question: "Can I buy an existing business in Puglia?",
      answer: "Yes, we facilitate acquisitions of existing businesses. Opportunities include established hotels and restaurants, agricultural operations with land and equipment, retail businesses in prime locations, and manufacturing companies. We conduct thorough due diligence including financial analysis, legal compliance checks, and market positioning assessment. Purchase prices vary widely - small businesses from €100,000, established operations from €500,000+.",
      category: "business"
    },
    
    // Our Process
    {
      question: "How does the InvestInPuglia investment process work?",
      answer: "Our process includes: 1) Free initial consultation to understand your goals, 2) Market research to identify opportunities, 3) Detailed analysis and shortlisting, 4) Site visits and inspections (virtual options available), 5) Due diligence and risk assessment, 6) Negotiation support, 7) Transaction management, 8) Post-investment support. The timeline typically spans 3-4 months from initial consultation to completed investment, though this varies by investment complexity.",
      category: "process"
    },
    {
      question: "Do I need to visit Puglia before investing?",
      answer: "While we recommend at least one visit to understand the local market and view properties, it's not mandatory. We offer virtual property tours, detailed video walkthroughs, drone footage, and comprehensive photo documentation. Many clients make initial decisions remotely, then visit for final inspections. We can also act as your representative through power of attorney for the entire process.",
      category: "process"
    },
    {
      question: "How do you ensure the properties/businesses are legitimate?",
      answer: "We conduct rigorous due diligence including title searches and ownership verification, building permit and compliance checks, financial audits for businesses, technical inspections by qualified professionals, and legal review of all documentation. We only work with verified sellers and use reputable notaries for all transactions. Our reputation depends on successful, problem-free investments.",
      category: "process"
    },
    {
      question: "What happens after I make an investment?",
      answer: "Our support continues post-investment with property management coordination, renovation project oversight, business operations support, financial reporting and tax compliance assistance, and strategic advice for maximizing returns. We offer different service levels from light-touch monitoring to full management, ensuring your investment performs optimally while you focus on your goals.",
      category: "process"
    },
    
    // Costs & ROI
    {
      question: "What are InvestInPuglia's fees?",
      answer: "Our fee structure is transparent and success-based: Initial consultations are free. For property investments, we charge 3-5% of the purchase price upon successful completion. Business investments incur fees of 5-8% depending on complexity. Ongoing advisory services are available at €250-500/hour or monthly retainers from €2,000. All fees are clearly outlined upfront with no hidden costs.",
      category: "costs"
    },
    {
      question: "What are the total costs of buying property in Italy?",
      answer: "Beyond the purchase price, expect: Registration tax (2% for residents, 9% for non-residents), Notary fees (1-2%), Our advisory fee (3-5%), Legal fees if required (€2,000-5,000), Technical surveys (€1,500-3,000), and Translation costs (€500-1,000). Total additional costs typically amount to 10-15% of purchase price. We provide detailed cost breakdowns for accurate budgeting.",
      category: "costs"
    },
    {
      question: "How quickly can I expect returns on my investment?",
      answer: "Returns timeline varies by investment type. Rental properties can generate income immediately if move-in ready, or after 6-12 months for properties requiring renovation. Business investments typically need 12-24 months to reach profitability. Capital appreciation is a longer-term play, with significant gains typically seen over 3-5 years. We provide realistic projections based on comparable investments.",
      category: "costs"
    },
    {
      question: "Can InvestInPuglia help with investment financing?",
      answer: "Yes, we facilitate financing through our banking partners. Italian banks offer mortgages to foreigners, typically up to 50-60% LTV for non-residents. We assist with documentation, translations, income verification, and negotiations. Alternative financing includes seller financing, partner investors, and EU funding programs for businesses. Our relationships with multiple banks ensure competitive rates.",
      category: "costs"
    },
    
    // Legal & Tax
    {
      question: "What are the tax implications of investing in Italy?",
      answer: "Tax treatment depends on your residency status and investment type. Non-residents pay 21% tax on rental income and capital gains tax on sale. Residents benefit from lower taxes and deductions. Italy has tax treaties with many countries to avoid double taxation. Business taxes include IRES (corporate tax) at 24% and IRAP (regional tax) at 3.9%. We work with tax advisors to optimize your tax position legally.",
      category: "legal"
    },
    {
      question: "Do I need Italian residency to invest?",
      answer: "No, residency is not required for investment. However, residency offers benefits including lower property purchase taxes (2% vs 9%), access to resident mortgage rates, eligibility for certain business incentives, and access to Italy's healthcare system. EU citizens can obtain residency easily; non-EU citizens need to meet specific requirements. We advise on the best structure for your situation.",
      category: "legal"
    },
    {
      question: "How is property ownership structured in Italy?",
      answer: "Property can be owned individually, jointly, or through a company. Individual ownership is simplest for personal use. Company ownership can offer tax advantages for rental properties and easier succession planning. Italian SRL (limited company) or foreign company branches are options. Each structure has different tax and legal implications - we help determine the optimal approach for your goals.",
      category: "legal"
    },
    {
      question: "What legal protections exist for foreign investors?",
      answer: "Italy provides strong legal protections for foreign investors including EU law protections for property rights, bilateral investment treaties, transparent legal system, and established property registration. All property transactions go through a notary who ensures legal compliance. Title insurance is available. Italy's EU membership provides additional security and legal recourse. We ensure all investments follow proper legal procedures.",
      category: "legal"
    },
    
    // Living in Puglia
    {
      question: "What's the quality of life like in Puglia?",
      answer: "Puglia offers exceptional quality of life with 300+ days of sunshine, beautiful beaches and countryside, rich culture and history, excellent cuisine and wine, lower cost of living than Northern Europe, growing expat communities, good healthcare facilities, and improving infrastructure. The pace of life is relaxed yet the region is increasingly connected with international airports and high-speed internet. Many clients find it ideal for both lifestyle and investment.",
      category: "living"
    },
    {
      question: "How easy is it to integrate as a foreign resident?",
      answer: "Integration is increasingly easy, especially in areas like Ostuni, Lecce, and the Valle d'Itria with established expat communities. Many locals in tourist areas speak English. Italian language courses are widely available. The culture is welcoming to foreigners who show respect for local traditions. We connect clients with expat groups, language schools, and cultural organizations to ease transition.",
      category: "living"
    },
    {
      question: "What about healthcare and education in Puglia?",
      answer: "Italy's public healthcare system is excellent and available to residents. Major cities have modern hospitals; smaller towns have clinics. Private healthcare is also affordable. For education, there are good public schools, some international schools, and universities in Bari and Lecce. Many expat families successfully navigate the education system with proper support and language preparation.",
      category: "living"
    },
    
    // Our Services
    {
      question: "How is InvestInPuglia different from real estate agents?",
      answer: "Unlike traditional agents who focus on transactions, we provide comprehensive investment advisory services. We analyze investments from financial, legal, and strategic perspectives, offer ongoing support post-purchase, help with business development beyond property, provide market research and feasibility studies, and coordinate all professionals involved. Our success is tied to your investment performance, not just completing a sale.",
      category: "services"
    },
    {
      question: "Can InvestInPuglia help with property renovation?",
      answer: "Yes, we provide full renovation support including connecting you with architects and designers, obtaining permits and approvals, contractor selection and management, budget control and timeline management, and quality oversight. We work with trusted professionals who understand international standards while respecting local architecture. Renovation costs typically range from €500-1,500 per square meter depending on the scope.",
      category: "services"
    },
    {
      question: "Do you offer property management services?",
      answer: "We coordinate with trusted property management companies for rental management, maintenance, utility management, tax compliance, and guest services for tourist rentals. While we don't directly manage properties, we oversee management companies to ensure service quality. Management fees typically range from 15-25% of rental income depending on services required.",
      category: "services"
    }
  ]

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-terracotta to-terracotta-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-terracotta-light max-w-2xl mx-auto mb-8">
            Everything you need to know about investing in Puglia with InvestInPuglia
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 rounded-full text-stone-800 text-lg focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-stone-400" />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-terracotta text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {category.icon && <category.icon className="w-4 h-4" />}
                <span className="font-medium">{category.name}</span>
                <span className="text-sm opacity-75">
                  ({faqs.filter(faq => category.id === 'all' || faq.category === category.id).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-stone-600 text-lg">No questions found matching your search.</p>
              <p className="text-stone-500 mt-2">Try different keywords or browse by category.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left flex items-start justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-terracotta/20 rounded-lg"
                  >
                    <h3 className="font-semibold text-stone-800 text-lg pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-stone-400 flex-shrink-0 transition-transform ${
                        openItems.includes(index) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openItems.includes(index) && (
                    <div className="px-6 pb-4">
                      <p className="text-stone-600 leading-relaxed">
                        {faq.answer}
                      </p>
                      <div className="mt-4 pt-4 border-t border-stone-100">
                        <p className="text-sm text-stone-500">
                          Category: {categories.find(c => c.id === faq.category)?.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">
            Still Have Questions?
          </h2>
          <p className="text-lg text-stone-600 mb-8">
            Our investment experts are here to provide personalized answers and guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-terracotta text-white px-6 py-3 rounded-lg font-medium hover:bg-terracotta-dark transition-colors"
            >
              Contact Our Team
            </a>
            <a
              href="/schedule"
              className="bg-white text-terracotta border-2 border-terracotta px-6 py-3 rounded-lg font-medium hover:bg-terracotta/5 transition-colors"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
