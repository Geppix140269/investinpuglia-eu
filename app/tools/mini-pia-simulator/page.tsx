'use client'

import { useState, useEffect } from 'react'
import { Calculator, Euro, TrendingUp, Download, Info, Building, Wrench, Package, Lightbulb, Users, DollarSign, PieChart, BarChart } from 'lucide-react'

export default function MiniPIASimulator() {
  // State for all inputs
  const [propertyPurchase, setPropertyPurchase] = useState(800000)
  const [restructuring, setRestructuring] = useState(400000)
  const [fixtures, setFixtures] = useState(150000)
  const [innovation, setInnovation] = useState(40000)
  const [personnel, setPersonnel] = useState(60000)
  const [marketing, setMarketing] = useState(25000)
  const [otherCosts, setOtherCosts] = useState(25000)
  
  // Calculated values
  const [results, setResults] = useState({
    totalInvestment: 0,
    maxGrant: 0,
    personalInvestment: 0,
    roi: 0,
    breakEven: 0,
    yearlyRevenue: 0,
    propertyValue: 0
  })

  // Constants
  const GRANT_PERCENTAGE = 55
  const MAX_GRANT_AMOUNT = 2750000
  const PROPERTY_APPRECIATION = 0.05
  const OCCUPANCY_RATE = 0.70
  const AVERAGE_DAILY_RATE = 150

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  // Calculate results whenever inputs change
  useEffect(() => {
    const totalInvestment = propertyPurchase + restructuring + fixtures + innovation + personnel + marketing + otherCosts
    const calculatedGrant = Math.min(totalInvestment * (GRANT_PERCENTAGE / 100), MAX_GRANT_AMOUNT)
    const personalInvestment = totalInvestment - calculatedGrant
    
    // Revenue calculations (simplified)
    const rooms = Math.floor(propertyPurchase / 80000) // Rough estimate: 1 room per 80k investment
    const yearlyRevenue = rooms * 365 * OCCUPANCY_RATE * AVERAGE_DAILY_RATE
    
    // Property value after renovation
    const propertyValue = (propertyPurchase + restructuring) * (1 + PROPERTY_APPRECIATION * 3)
    
    // ROI calculation
    const totalReturn = propertyValue + (yearlyRevenue * 3) - personalInvestment
    const roi = (totalReturn / personalInvestment) * 100
    
    // Break-even (simplified)
    const yearlyProfit = yearlyRevenue * 0.3 // Assuming 30% profit margin
    const breakEven = personalInvestment / yearlyProfit

    setResults({
      totalInvestment,
      maxGrant: calculatedGrant,
      personalInvestment,
      roi,
      breakEven,
      yearlyRevenue,
      propertyValue
    })
  }, [propertyPurchase, restructuring, fixtures, innovation, personnel, marketing, otherCosts])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-900 to-emerald-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Calculator className="h-5 w-5" />
            <span className="text-sm font-semibold">AI-POWERED INVESTMENT ANALYSIS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mini PIA Simulator
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Advanced calculator for Mini PIA Turismo grants with detailed financial projections and ROI analysis
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Costs Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Building className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Mini PIA Turismo - Eligible Costs</h2>
              </div>

              {/* Property Purchase */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <Building className="h-4 w-4" />
                    Property Purchase
                  </label>
                  <span className="text-xl font-bold text-purple-600">{formatCurrency(propertyPurchase)}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="3000000"
                  step="10000"
                  value={propertyPurchase}
                  onChange={(e) => setPropertyPurchase(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <p className="text-sm text-gray-500 mt-1">Building acquisition (100% eligible)</p>
              </div>

              {/* Restructuring & Renovations */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <Wrench className="h-4 w-4" />
                    Restructuring & Renovations
                  </label>
                  <span className="text-xl font-bold text-purple-600">{formatCurrency(restructuring)}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="2000000"
                  step="10000"
                  value={restructuring}
                  onChange={(e) => setRestructuring(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <p className="text-sm text-gray-500 mt-1">Construction and building improvements (100% eligible)</p>
              </div>

              {/* Fixtures & Fittings */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <Package className="h-4 w-4" />
                    Fixtures & Fittings
                  </label>
                  <span className="text-xl font-bold text-purple-600">{formatCurrency(fixtures)}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="1000000"
                  step="5000"
                  value={fixtures}
                  onChange={(e) => setFixtures(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <p className="text-sm text-gray-500 mt-1">Equipment, furniture, and fittings for the property</p>
                <p className="text-xs text-emerald-600 mt-1">
                  Suggested: 12.5% of civil works ({formatCurrency((propertyPurchase + restructuring) * 0.125)})
                </p>
              </div>

              {/* Innovation Component */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <Lightbulb className="h-4 w-4" />
                    Innovation Component
                  </label>
                  <span className="text-xl font-bold text-purple-600">{formatCurrency(innovation)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="1000"
                  value={innovation}
                  onChange={(e) => setInnovation(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <p className="text-sm text-gray-500 mt-1">Technology and digital systems</p>
                <div className="bg-blue-50 p-3 rounded-lg mt-2">
                  <p className="text-xs text-blue-700">
                    <strong>Innovation bonus:</strong> 5% extra grant for projects with 3%+ innovation component
                  </p>
                </div>
              </div>

              {/* Personnel Costs */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <Users className="h-4 w-4" />
                    Personnel Costs (Year 1)
                  </label>
                  <span className="text-xl font-bold text-purple-600">{formatCurrency(personnel)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="5000"
                  value={personnel}
                  onChange={(e) => setPersonnel(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <p className="text-sm text-gray-500 mt-1">Salaries for new hires (first year)</p>
              </div>

              {/* Marketing & Promotion */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <TrendingUp className="h-4 w-4" />
                    Marketing & Promotion
                  </label>
                  <span className="text-xl font-bold text-purple-600">{formatCurrency(marketing)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="1000"
                  value={marketing}
                  onChange={(e) => setMarketing(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <p className="text-sm text-gray-500 mt-1">Marketing and promotional activities</p>
              </div>

              {/* Other Eligible Costs */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <DollarSign className="h-4 w-4" />
                    Other Eligible Costs
                  </label>
                  <span className="text-xl font-bold text-purple-600">{formatCurrency(otherCosts)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="1000"
                  value={otherCosts}
                  onChange={(e) => setOtherCosts(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <p className="text-sm text-gray-500 mt-1">Professional fees, studies, certifications</p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Grant Calculation */}
            <div className="bg-gradient-to-br from-purple-600 to-emerald-600 rounded-2xl shadow-lg p-6 text-white sticky top-24">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Euro className="h-5 w-5" />
                Grant Calculation
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm opacity-90">Total Investment</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.totalInvestment)}</p>
                </div>
                
                <div className="border-t border-white/20 pt-4">
                  <p className="text-sm opacity-90">Grant Amount (55%)</p>
                  <p className="text-3xl font-bold text-yellow-300">{formatCurrency(results.maxGrant)}</p>
                </div>
                
                <div>
                  <p className="text-sm opacity-90">Your Investment</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.personalInvestment)}</p>
                </div>
              </div>
            </div>

            {/* ROI Analysis */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                <BarChart className="h-5 w-5 text-emerald-600" />
                ROI Analysis
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ROI (3 Years)</span>
                  <span className="text-xl font-bold text-emerald-600">{results.roi.toFixed(1)}%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Break-even</span>
                  <span className="text-xl font-bold text-blue-600">{results.breakEven.toFixed(1)} years</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Annual Revenue</span>
                  <span className="text-xl font-bold text-purple-600">{formatCurrency(results.yearlyRevenue)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Property Value (3yr)</span>
                  <span className="text-xl font-bold text-gray-800">{formatCurrency(results.propertyValue)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                <Download className="h-5 w-5" />
                Download PDF Report
              </button>
              
              <button className="w-full bg-white border-2 border-purple-600 text-purple-600 py-3 px-6 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                Schedule Consultation
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">Important Note:</p>
                  <p>This is a simplified calculator. Actual grant amounts depend on official evaluation and regional approval.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}