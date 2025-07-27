// PATH: app/about/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About InvestInPuglia | Property & Investment Advisory in Puglia, Italy',
  description: 'Learn about InvestInPuglia, your trusted partner for property investment and business development in Puglia. Expert advisory services for international investors since 2024.',
  keywords: 'Puglia investment advisor, Italian property consultant, business development Puglia, investment management Italy, real estate advisory Puglia',
  openGraph: {
    title: 'About InvestInPuglia - Your Investment Partner in Southern Italy',
    description: 'Discover how InvestInPuglia helps international investors navigate property and business opportunities in Puglia with expert local knowledge and comprehensive advisory services.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'it_IT',
    siteName: 'InvestInPuglia',
    images: [
      {
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'InvestInPuglia Investment Advisory Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About InvestInPuglia | Investment Advisory Services',
    description: 'Your trusted partner for property and business investments in Puglia, Italy',
    images: ['/og-about.jpg'],
  },
  alternates: {
    canonical: 'https://investinpuglia.com/about',
    languages: {
      'en': 'https://investinpuglia.com/en/about',
      'it': 'https://investinpuglia.com/it/about',
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-terracotta to-terracotta-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            About InvestInPuglia
          </h1>
          <p className="text-xl text-terracotta-light max-w-2xl mx-auto">
            Your strategic partner for property investment and business development in the heart of Southern Italy
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">Our Story</h2>
            <div className="prose prose-stone max-w-none">
              <p className="text-stone-700 mb-4">
                InvestInPuglia emerged from a deep understanding of the untapped potential in Southern Italy&apos;s most dynamic region. Founded in 2024 by 1402 Celsius Ltd, we recognized that while Puglia offers exceptional investment opportunities – from historic properties to innovative business ventures – international investors often struggle to navigate the local landscape.
              </p>
              <p className="text-stone-700 mb-4">
                Our founders, combining decades of experience in international real estate, business consultancy, and Italian market expertise, created InvestInPuglia to bridge this gap. We provide comprehensive investment advisory services that go beyond traditional property consultancy, encompassing business development, project management, and strategic partnerships.
              </p>
              <p className="text-stone-700 mb-4">
                Today, we serve as the trusted advisor for international investors seeking to capitalize on Puglia&apos;s economic renaissance, whether through property acquisition, business ventures, or strategic investments in the region&apos;s growing sectors like tourism, agriculture, renewable energy, and technology.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-stone-800 mb-3 flex items-center">
                  <span className="text-2xl mr-3">🌍</span>
                  For International Investors
                </h3>
                <p className="text-stone-700 mb-4">
                  We transform complex investment opportunities into clear, actionable strategies. Our deep local knowledge and international perspective ensure that every investment decision is informed, strategic, and aligned with your goals.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-stone-800 mb-3 flex items-center">
                  <span className="text-2xl mr-3">🚀</span>
                  For Business Development
                </h3>
                <p className="text-stone-700 mb-4">
                  We facilitate business growth and expansion in Puglia, connecting international companies with local opportunities, managing projects from conception to completion, and ensuring sustainable success in the Italian market.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">Our Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-terracotta pl-4">
                <h3 className="font-semibold text-stone-800 mb-2">Property Investment Advisory</h3>
                <p className="text-stone-600 text-sm">
                  Comprehensive guidance on property acquisition, from initial market analysis to post-purchase management and renovation project oversight.
                </p>
              </div>
              <div className="border-l-4 border-sea pl-4">
                <h3 className="font-semibold text-stone-800 mb-2">Business Consultancy</h3>
                <p className="text-stone-600 text-sm">
                  Strategic advice for establishing and growing businesses in Puglia, including market entry strategies and regulatory compliance.
                </p>
              </div>
              <div className="border-l-4 border-olive pl-4">
                <h3 className="font-semibold text-stone-800 mb-2">Project Management</h3>
                <p className="text-stone-600 text-sm">
                  End-to-end management of investment projects, ensuring timely delivery, budget control, and quality outcomes.
                </p>
              </div>
              <div className="border-l-4 border-warm pl-4">
                <h3 className="font-semibold text-stone-800 mb-2">Investment Analysis</h3>
                <p className="text-stone-600 text-sm">
                  Detailed feasibility studies, ROI projections, and risk assessments for all types of investments in the region.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-terracotta/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold text-stone-800 mb-2">Strategic Excellence</h3>
                <p className="text-stone-600 text-sm">
                  Every recommendation is backed by thorough analysis, market intelligence, and strategic thinking tailored to your objectives.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-sea/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-semibold text-stone-800 mb-2">Trust &amp; Integrity</h3>
                <p className="text-stone-600 text-sm">
                  We build lasting relationships based on transparency, honesty, and a commitment to your success in every transaction.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-olive/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="font-semibold text-stone-800 mb-2">Sustainable Growth</h3>
                <p className="text-stone-600 text-sm">
                  We focus on investments that create lasting value for our clients while contributing positively to Puglia&apos;s development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Puglia */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-sea/5 to-white rounded-xl p-8">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">Why Invest in Puglia?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-stone-800 mb-3">Economic Growth</h3>
                <ul className="list-disc list-inside text-stone-700 space-y-2">
                  <li>Fastest growing region in Southern Italy</li>
                  <li>Strategic location for Mediterranean trade</li>
                  <li>Government incentives for foreign investment</li>
                  <li>Growing tech and innovation sectors</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-stone-800 mb-3">Investment Opportunities</h3>
                <ul className="list-disc list-inside text-stone-700 space-y-2">
                  <li>Undervalued real estate with high appreciation potential</li>
                  <li>Booming tourism and hospitality sector</li>
                  <li>Agricultural and food production excellence</li>
                  <li>Renewable energy initiatives</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
