import { Metadata } from 'next'
import Icon from '@/lib/iconMappings'

export const metadata: Metadata = {
  title: 'About InvestInPuglia | Property & Investment Advisory in Puglia, Italy',
  description: 'Learn about InvestInPuglia, your trusted partner for property investment and business development in Puglia. Expert advisory services for international investors since 2024.',
  keywords: 'Puglia investment advisor, Italian property consultant, business development Puglia, investment management Italy, real estate advisory Puglia',
  openGraph: {
    title: 'About InvestInPuglia - Your Investment Partner in Southern Italy',
    description: 'Discover how InvestInPuglia helps international investors navigate property and business opportunities in Puglia with expert local knowledge and comprehensive advisory services.',
    type: 'website',
    locale: 'en_US',
    url: 'https://investinpuglia.eu/about',
    siteName: 'InvestInPuglia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About InvestInPuglia | Investment Advisory',
    description: 'Expert investment advisory services for property and business opportunities in Puglia, Italy.',
  },
  alternates: {
    canonical: 'https://investinpuglia.eu/about'
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <section className="bg-gradient-to-br from-terracotta to-terracotta-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            About InvestInPuglia
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Your trusted partner for property investment and business development in Southern Italy's most dynamic region
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">Our Story</h2>
            <div className="prose prose-stone max-w-none">
              <p className="text-stone-600 mb-4">
                InvestInPuglia emerged from a deep understanding of the untapped potential in Southern Italy's most 
                dynamic region. Founded in 2024 by 1402 Celsius Ltd, we recognized that while Puglia offers 
                exceptional investment opportunities – from historic properties to innovative business ventures – 
                international investors often struggle to navigate the local landscape.
              </p>
              <p className="text-stone-600 mb-4">
                Our founders, combining decades of experience in international real estate, business consultancy, 
                and Italian market expertise, created InvestInPuglia to bridge this gap. We provide comprehensive 
                investment advisory services that go beyond traditional property consultancy, encompassing 
                business development, project management, and strategic partnerships.
              </p>
              <p className="text-stone-600">
                Today, we serve as the trusted advisor for international investors seeking to capitalize on Puglia's 
                economic renaissance, whether through property acquisition, business ventures, or strategic 
                investments in the region's growing sectors like tourism, agriculture, renewable energy, and 
                technology.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-stone-800 mb-3 flex items-center">
                  <Icon name="Globe" size={32} className="mr-3" />
                  For International Investors
                </h3>
                <p className="text-stone-600">
                  We transform complex investment opportunities into clear, actionable strategies. Our deep local 
                  knowledge and international perspective ensure that every investment decision is informed, 
                  strategic, and aligned with your goals.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-stone-800 mb-3 flex items-center">
                  <Icon name="TrendingUp" size={32} className="mr-3" />
                  For Business Development
                </h3>
                <p className="text-stone-600">
                  We facilitate business growth and expansion in Puglia, connecting international companies with 
                  local opportunities, managing projects from conception to completion, and ensuring sustainable 
                  success in the Italian market.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">Our Services</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-stone-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-stone-800 mb-2">Property Investment Advisory</h3>
                <p className="text-stone-600 text-sm">
                  Comprehensive guidance on property acquisition, from initial market analysis to post-purchase 
                  management and renovation project oversight.
                </p>
              </div>
              <div className="border border-stone-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-stone-800 mb-2">Business Consultancy</h3>
                <p className="text-stone-600 text-sm">
                  Strategic advice for establishing and growing businesses in Puglia, including market entry 
                  strategies and regulatory compliance.
                </p>
              </div>
              <div className="border border-stone-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-stone-800 mb-2">Project Management</h3>
                <p className="text-stone-600 text-sm">
                  End-to-end management of investment projects, ensuring timely delivery, budget control, and 
                  quality outcomes.
                </p>
              </div>
              <div className="border border-stone-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-stone-800 mb-2">Investment Analysis</h3>
                <p className="text-stone-600 text-sm">
                  Detailed feasibility studies, ROI projections, and risk assessments for all types of investments 
                  in the region.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Icon name="Shield" size={48} className="mx-auto mb-4" />
                <h3 className="font-semibold text-stone-800 mb-2">Integrity</h3>
                <p className="text-stone-600 text-sm">
                  Transparent, honest advice that puts your interests first, always maintaining the highest 
                  ethical standards.
                </p>
              </div>
              <div className="text-center">
                <Icon name="Users" size={48} className="mx-auto mb-4" />
                <h3 className="font-semibold text-stone-800 mb-2">Local Expertise</h3>
                <p className="text-stone-600 text-sm">
                  Deep understanding of Puglia's market dynamics, cultural nuances, and regulatory environment.
                </p>
              </div>
              <div className="text-center">
                <Icon name="Target" size={48} className="mx-auto mb-4" />
                <h3 className="font-semibold text-stone-800 mb-2">Results-Driven</h3>
                <p className="text-stone-600 text-sm">
                  Focused on delivering measurable outcomes and maximizing returns on your investments.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-terracotta/10 rounded-xl p-8 text-center">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-4">
              Ready to Invest in Puglia?
            </h2>
            <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
              Whether you're looking for property investments, business opportunities, or strategic partnerships 
              in Puglia, we're here to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-terracotta text-white font-semibold rounded-lg hover:bg-terracotta-dark transition-colors">
                Get Started
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </a>
              <a href="/how-it-works" className="inline-flex items-center justify-center px-6 py-3 border-2 border-terracotta text-terracotta font-semibold rounded-lg hover:bg-terracotta/10 transition-colors">
                Learn More
              </a>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">Legal Information</h2>
            <div className="prose prose-stone max-w-none text-sm">
              <p className="text-stone-600">
                <strong>Company:</strong> 1402 Celsius Ltd<br />
                <strong>Registration:</strong> 124 75013 <br />
                <strong>VAT:</strong> GB 343 1702 32 <br />
                <strong>Address:</strong> 20-22 Wenlock Road
N1 7GU, London
United Kingdom <br />
                <strong>Email:</strong> info@investinpuglia.eu<br />
                <strong>Phone:</strong> +39 351 400 1402
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}


Company Registration: 
VAT Number: 
