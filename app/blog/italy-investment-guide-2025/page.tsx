import { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, Euro, MapPin, Building2, Users, Award, BarChart3, Globe, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Italy Investment Guide 2025: Facts, Figures & Opportunities | EU Grants Available',
  description: 'Complete guide to investing in Italy in 2025. Discover key statistics, market trends, ROI data, and how to access €200K-€2M in EU grants for tourism and industrial projects in Puglia.',
  keywords: ['Italy investment 2025', 'Puglia real estate', 'EU grants Italy', 'Italian property investment', 'Mini PIA grants', 'invest in Southern Italy'],
  openGraph: {
    title: 'Italy Investment Guide 2025: Everything You Need to Know',
    description: 'Market data, ROI figures, and EU grant opportunities for investing in Italy. €200K-€2M available for qualified projects.',
    type: 'article',
    publishedTime: '2025-10-31T00:00:00Z',
  }
};

export default function ItalyInvestmentGuide2025() {
  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-700 via-blue-700 to-purple-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold">
              📊 DATA-DRIVEN INSIGHTS
            </span>
            <span className="text-green-100 text-sm">Updated October 2025</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Italy Investment Guide 2025
            <br />
            <span className="text-green-300">Facts, Figures & Real Opportunities</span>
          </h1>

          <p className="text-2xl text-green-50 mb-8 max-w-4xl">
            Everything you need to know about investing in Italy—backed by data, market research, and 30 years of experience helping investors access €200K-€2M in EU grants.
          </p>

          <a
            href="https://calendly.com/investinpuglia/30min"
            className="inline-flex items-center gap-3 bg-white text-green-700 px-8 py-4 rounded-full font-bold text-xl hover:bg-green-50 transition-all shadow-2xl hover:scale-105"
          >
            Get Your FREE Investment Assessment
            <ArrowRight className="h-6 w-6" />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Key Statistics Overview */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <BarChart3 className="h-10 w-10 text-green-600" />
            Italy by the Numbers: 2025 Edition
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
              <div className="text-4xl font-bold text-green-700 mb-2">€2.1T</div>
              <div className="text-gray-700 font-semibold">GDP (2024)</div>
              <div className="text-sm text-gray-600 mt-1">8th largest economy globally</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
              <div className="text-4xl font-bold text-blue-700 mb-2">60M</div>
              <div className="text-gray-700 font-semibold">Population</div>
              <div className="text-sm text-gray-600 mt-1">Strong domestic market</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
              <div className="text-4xl font-bold text-purple-700 mb-2">134M</div>
              <div className="text-gray-700 font-semibold">Annual Tourists</div>
              <div className="text-sm text-gray-600 mt-1">5th most visited country</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
              <div className="text-4xl font-bold text-orange-700 mb-2">€230B</div>
              <div className="text-gray-700 font-semibold">Tourism Revenue</div>
              <div className="text-sm text-gray-600 mt-1">Pre-pandemic peak: 2019</div>
            </div>
          </div>
        </section>

        {/* Why Italy? */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Why Italy Remains a Top Investment Destination
          </h2>

          <div className="bg-blue-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  Economic Stability
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>EU Member State</strong> since 1957 (founding member)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Eurozone</strong> - stable currency, no exchange risk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>GDP Growth:</strong> +0.9% (2024), projected +1.2% (2025)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Inflation:</strong> 5.7% (2023) → 1.2% (2024) - stabilizing</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe className="h-6 w-6 text-blue-600" />
                  Strategic Location
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Mediterranean Hub</strong> - access to EU, Middle East, North Africa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>7,600km coastline</strong> - maritime trade advantage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Major ports:</strong> Genoa, Naples, Trieste, Gioia Tauro</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Transport infrastructure:</strong> €191.5B PNRR investment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Real Estate Market Data */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Building2 className="h-10 w-10 text-purple-600" />
            Italian Real Estate Market: The Numbers
          </h2>

          <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
              <h3 className="text-2xl font-bold">2024 Market Overview</h3>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-700 mb-2">€178B</div>
                  <div className="text-gray-700 font-semibold">Total Market Value</div>
                  <div className="text-sm text-gray-600 mt-1">Residential sector</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-700 mb-2">+3.2%</div>
                  <div className="text-gray-700 font-semibold">Price Growth (YoY)</div>
                  <div className="text-sm text-gray-600 mt-1">Major cities average</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-700 mb-2">592K</div>
                  <div className="text-gray-700 font-semibold">Transactions (2023)</div>
                  <div className="text-sm text-gray-600 mt-1">+7.8% vs 2022</div>
                </div>
              </div>

              <h4 className="text-xl font-bold text-gray-900 mb-4">Average Property Prices by Region (€/m²)</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-900">Milan (Lombardy)</span>
                  <span className="text-2xl font-bold text-purple-700">€5,100/m²</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-900">Rome (Lazio)</span>
                  <span className="text-2xl font-bold text-purple-700">€4,200/m²</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-900">Florence (Tuscany)</span>
                  <span className="text-2xl font-bold text-purple-700">€4,000/m²</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-300">
                  <span className="font-semibold text-gray-900">Bari (Puglia) ⭐</span>
                  <span className="text-2xl font-bold text-green-700">€1,800/m²</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-300">
                  <span className="font-semibold text-gray-900">Lecce (Puglia) ⭐</span>
                  <span className="text-2xl font-bold text-green-700">€1,500/m²</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg border-2 border-green-300">
                <p className="text-gray-700">
                  <strong className="text-green-700">💡 Investment Insight:</strong> Puglia offers 60-70% lower acquisition costs than Northern Italy with similar tourism demand growth. Entry prices create superior ROI potential.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tourism Market Data */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Users className="h-10 w-10 text-blue-600" />
            Tourism Industry: Explosive Growth Potential
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">National Tourism Statistics</h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-gray-700 font-semibold">Annual Arrivals</span>
                    <span className="text-3xl font-bold text-blue-700">134M</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{width: '95%'}}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Recovering to 2019 levels (141M)</p>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-gray-700 font-semibold">Tourism Revenue</span>
                    <span className="text-3xl font-bold text-purple-700">€230B</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-purple-600 h-3 rounded-full" style={{width: '88%'}}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">13% of GDP (2024)</p>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-gray-700 font-semibold">Tourism Jobs</span>
                    <span className="text-3xl font-bold text-green-700">3.2M</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">14.7% of total employment</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg border-2 border-blue-300">
                <p className="text-sm text-gray-700">
                  <strong>Growth Projection:</strong> Italian tourism expected to reach €260B by 2027 (+13% from 2024)
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 border-2 border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Puglia Tourism Boom 🚀</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                  <span className="font-semibold text-gray-700">Annual Visitors</span>
                  <span className="text-2xl font-bold text-green-700">15.8M</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                  <span className="font-semibold text-gray-700">Growth Rate (2023)</span>
                  <span className="text-2xl font-bold text-blue-700">+18.5%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                  <span className="font-semibold text-gray-700">Avg Stay Duration</span>
                  <span className="text-2xl font-bold text-purple-700">5.2 days</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                  <span className="font-semibold text-gray-700">Tourism Revenue</span>
                  <span className="text-2xl font-bold text-orange-700">€6.8B</span>
                </div>
              </div>

              <div className="p-4 bg-green-100 rounded-lg border-2 border-green-400">
                <p className="font-bold text-green-800 mb-2">Why Puglia is Outperforming:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>✓ Fastest-growing region for international tourism</li>
                  <li>✓ Lower saturation vs Tuscany/Veneto</li>
                  <li>✓ Strong airlift: 12 international airports within 200km</li>
                  <li>✓ Year-round climate (avg 300 sunny days/year)</li>
                  <li>✓ UNESCO sites + pristine beaches + authentic culture</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-300">
            <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Award className="h-6 w-6 text-yellow-600" />
              Occupancy & Revenue Data for Puglia Hospitality
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="text-gray-600 text-sm mb-1">Average Occupancy Rate</div>
                <div className="text-3xl font-bold text-yellow-700">72%</div>
                <div className="text-xs text-gray-600">Peak season: 95%+</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-gray-600 text-sm mb-1">Avg Daily Rate (ADR)</div>
                <div className="text-3xl font-bold text-yellow-700">€145</div>
                <div className="text-xs text-gray-600">4-star properties</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-gray-600 text-sm mb-1">RevPAR Growth</div>
                <div className="text-3xl font-bold text-green-700">+22%</div>
                <div className="text-xs text-gray-600">YoY (2023 vs 2022)</div>
              </div>
            </div>
          </div>
        </section>

        {/* EU Grants & Incentives */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Euro className="h-10 w-10 text-green-600" />
            EU Grants & Government Incentives: The Real Numbers
          </h2>

          <div className="bg-gradient-to-br from-green-600 to-blue-700 text-white rounded-2xl p-8 mb-8">
            <h3 className="text-3xl font-bold mb-6">Italy's PNRR (Recovery Fund) Allocation</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-5xl font-bold mb-2">€191.5B</div>
                <div className="text-xl text-green-100">Total EU Recovery Fund</div>
                <p className="text-green-50 mt-2 text-sm">Largest allocation in Europe</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">€69B</div>
                <div className="text-xl text-green-100">Grants (Non-Refundable)</div>
                <p className="text-green-50 mt-2 text-sm">Pure capital, no repayment</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Mini PIA & PIA Grant Programs (Puglia-Specific)</h3>

            <div className="space-y-6">
              <div className="border-l-4 border-green-600 pl-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Mini PIA Turismo</h4>
                <div className="grid md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-gray-600">Grant Amount</div>
                    <div className="text-2xl font-bold text-green-700">€200K - €800K</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Co-Funding Rate</div>
                    <div className="text-2xl font-bold text-blue-700">55%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Min Investment</div>
                    <div className="text-2xl font-bold text-purple-700">€364K</div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  For tourism accommodation (hotels, B&Bs, agriturismos, resorts) - renovation, expansion, or new construction
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Mini PIA Industriale</h4>
                <div className="grid md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-gray-600">Grant Amount</div>
                    <div className="text-2xl font-bold text-green-700">€200K - €1.5M</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Co-Funding Rate</div>
                    <div className="text-2xl font-bold text-blue-700">50%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Min Investment</div>
                    <div className="text-2xl font-bold text-purple-700">€400K</div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  For manufacturing, industrial, and commercial projects - machinery, equipment, facilities
                </p>
              </div>

              <div className="border-l-4 border-purple-600 pl-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">PIA Grande Impresa</h4>
                <div className="grid md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-gray-600">Grant Amount</div>
                    <div className="text-2xl font-bold text-green-700">Up to €2.75M</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Co-Funding Rate</div>
                    <div className="text-2xl font-bold text-blue-700">45-50%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Min Investment</div>
                    <div className="text-2xl font-bold text-purple-700">€3M+</div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  For large-scale tourism or industrial projects - major developments, landmark restorations
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-green-50 rounded-xl border-2 border-green-300">
              <div className="flex items-start gap-4">
                <Award className="h-12 w-12 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Our Track Record with These Grants</h4>
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <div className="text-3xl font-bold text-green-700">95%</div>
                      <div className="text-sm text-gray-700">Approval Rate</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-700">50+</div>
                      <div className="text-sm text-gray-700">Projects Funded</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-700">€45M+</div>
                      <div className="text-sm text-gray-700">Grants Secured</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Examples */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Real ROI Examples: The Math Behind Puglia Investments
          </h2>

          <div className="space-y-6">
            {/* Example 1: Boutique Hotel */}
            <div className="bg-white rounded-2xl border-2 border-blue-300 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <h3 className="text-2xl font-bold">Case Study #1: Boutique Hotel Lecce</h3>
                <p className="text-blue-100">Historical building conversion • 12 rooms • City center location</p>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Investment Breakdown</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Property Purchase</span>
                        <span className="font-bold text-gray-900">€450,000</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Renovation Costs</span>
                        <span className="font-bold text-gray-900">€350,000</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Furniture & Equipment</span>
                        <span className="font-bold text-gray-900">€80,000</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-300">
                        <span className="text-gray-700 font-semibold">Mini PIA Grant (55%)</span>
                        <span className="font-bold text-green-700">-€440,000</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-blue-100 rounded-lg border-2 border-blue-400">
                        <span className="text-lg font-bold text-gray-900">Your Net Investment</span>
                        <span className="text-2xl font-bold text-blue-700">€440,000</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Annual Revenue Model</h4>
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Avg Occupancy</span>
                        <span className="font-bold text-gray-900">68%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Avg Daily Rate</span>
                        <span className="font-bold text-gray-900">€165</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Gross Revenue</span>
                        <span className="font-bold text-gray-900">€492,000/yr</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Operating Costs (45%)</span>
                        <span className="font-bold text-gray-900">€221,400/yr</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-green-100 rounded-lg border-2 border-green-400">
                        <span className="text-lg font-bold text-gray-900">Net Operating Income</span>
                        <span className="text-2xl font-bold text-green-700">€270,600/yr</span>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-100 rounded-lg border-2 border-purple-400">
                      <div className="text-center">
                        <div className="text-sm text-gray-700 mb-1">ROI (Cash-on-Cash)</div>
                        <div className="text-4xl font-bold text-purple-700">61.5%</div>
                        <div className="text-sm text-gray-600 mt-1">Payback period: 1.6 years</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 2: Masseria Resort */}
            <div className="bg-white rounded-2xl border-2 border-green-300 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
                <h3 className="text-2xl font-bold">Case Study #2: Masseria Resort Valle d'Itria</h3>
                <p className="text-green-100">Luxury countryside estate • 8 suites + pool + restaurant • 2 hectares</p>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Investment Breakdown</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Property Purchase</span>
                        <span className="font-bold text-gray-900">€850,000</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Restoration & Build</span>
                        <span className="font-bold text-gray-900">€650,000</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Pool, Gardens, Equipment</span>
                        <span className="font-bold text-gray-900">€200,000</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-300">
                        <span className="text-gray-700 font-semibold">Mini PIA Grant (55%)</span>
                        <span className="font-bold text-green-700">-€800,000</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-blue-100 rounded-lg border-2 border-blue-400">
                        <span className="text-lg font-bold text-gray-900">Your Net Investment</span>
                        <span className="text-2xl font-bold text-blue-700">€900,000</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Annual Revenue Model</h4>
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Room Revenue</span>
                        <span className="font-bold text-gray-900">€420,000/yr</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Restaurant & Events</span>
                        <span className="font-bold text-gray-900">€180,000/yr</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Gross Revenue</span>
                        <span className="font-bold text-gray-900">€600,000/yr</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Operating Costs (40%)</span>
                        <span className="font-bold text-gray-900">€240,000/yr</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-green-100 rounded-lg border-2 border-green-400">
                        <span className="text-lg font-bold text-gray-900">Net Operating Income</span>
                        <span className="text-2xl font-bold text-green-700">€360,000/yr</span>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-100 rounded-lg border-2 border-purple-400">
                      <div className="text-center">
                        <div className="text-sm text-gray-700 mb-1">ROI (Cash-on-Cash)</div>
                        <div className="text-4xl font-bold text-purple-700">40%</div>
                        <div className="text-sm text-gray-600 mt-1">Payback period: 2.5 years</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-300">
            <p className="text-gray-700">
              <strong className="text-yellow-800">⚠️ Important Note:</strong> These are representative examples based on actual projects. ROI varies based on location, management quality, marketing effectiveness, and seasonality. All projections assume professional management and effective marketing strategies.
            </p>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Key Takeaways for Smart Investors
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 border-2 border-green-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
                Market Advantages
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Lowest entry costs in Italy</strong> - Puglia properties 60-70% cheaper than Tuscany/Lombardy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Tourism boom continues</strong> - +18.5% growth in 2023, no signs of slowing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>EU funding peak</strong> - PNRR allocation largest in Europe, active through 2026</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Supply-demand imbalance</strong> - Quality accommodation shortage vs. demand growth</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border-2 border-blue-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="h-8 w-8 text-blue-600" />
                Risk Mitigation
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Currency stability</strong> - Eurozone member, no exchange rate risk</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>EU legal framework</strong> - Strong property rights, transparent legal system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Grant funding reduces capital risk</strong> - 55% co-funding = less money at stake</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Diversified market</strong> - Domestic + international tourism provides stability</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-green-600 via-blue-700 to-purple-800 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Turn Data into Opportunity?
          </h2>

          <p className="text-2xl text-green-50 mb-8 max-w-3xl mx-auto">
            Get a FREE personalized investment assessment. We'll analyze your specific situation and show you exactly which grants you qualify for.
          </p>

          <div className="flex flex-col items-center gap-6">
            <a
              href="https://calendly.com/investinpuglia/30min?utm_source=blog&utm_medium=italy_guide&utm_campaign=free_consultation"
              className="inline-flex items-center gap-3 bg-white text-green-700 px-10 py-6 rounded-full font-bold text-2xl hover:bg-green-50 transition-all shadow-2xl hover:scale-105"
            >
              <Euro className="h-8 w-8" />
              Book Your FREE Consultation (30 sec)
              <ArrowRight className="h-7 w-7" />
            </a>

            <div className="flex items-center gap-8 text-green-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-sm">Approval Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm">Projects Funded</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">€45M+</div>
                <div className="text-sm">Grants Secured</div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-green-100 text-sm">
            No payment required • No obligation • Just expert advice backed by 30 years of experience
          </p>
        </section>

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-gray-300">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Data Sources & References</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Italian National Institute of Statistics (ISTAT) - 2024 Economic Data</p>
            <p>• Bank of Italy - Real Estate Market Report 2024</p>
            <p>• Ministry of Tourism - Tourism Statistics 2023-2024</p>
            <p>• Regione Puglia - PIA/Mini PIA Program Guidelines 2024</p>
            <p>• European Commission - PNRR Implementation Report 2024</p>
            <p>• STR Global - Italian Hotel Performance Data 2024</p>
            <p>• Nomisma - Property Market Analysis Q3 2024</p>
          </div>
        </section>
      </div>
    </article>
  );
}
