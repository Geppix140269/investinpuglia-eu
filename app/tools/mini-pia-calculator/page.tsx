'use client'

import { useState, useEffect } from 'react'
import { Calculator, Euro, TrendingUp, Download, Info, Building, Wrench, Package, Lightbulb, Leaf, FileText, Users, DollarSign, AlertCircle, Mail, MessageCircle, Check, X } from 'lucide-react'
import { db } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { toast } from 'react-hot-toast'

export default function MiniPIACalculator() {
  // State for all inputs - matching classic calculator
  const [propertyPurchase, setPropertyPurchase] = useState(800000)
  const [restructuring, setRestructuring] = useState(400000)
  const [fixtures, setFixtures] = useState(150000)
  const [innovation, setInnovation] = useState(40000)
  const [environmental, setEnvironmental] = useState(35000)
  const [grantRate, setGrantRate] = useState(50) // 45-55% range
  
  // Non-eligible costs
  const [agencyRate, setAgencyRate] = useState(3) // percentage
  const [notaryFees, setNotaryFees] = useState(12000)
  const [consultingFees, setConsultingFees] = useState(25000)
  
  // Professional costs toggles
  const [professionalCosts, setProfessionalCosts] = useState({
    notary: true,
    legal: true,
    architect: true,
    permits: true,
    projectManagement: true
  })
  
  // Modal state
  const [showReportModal, setShowReportModal] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    timeline: ''
  })
  
  // Calculated values
  const [results, setResults] = useState({
    designPm: 0,
    preliminaryStudies: 0,
    totalEligible: 0,
    miniPiaGrant: 0,
    taxCredit: 0,
    totalBenefit: 0,
    agencyFees: 0,
    registrationTax: 0,
    totalNonEligible: 0,
    totalProject: 0,
    netInvestment: 0,
    integratedPercent: 0,
    integratedStatus: true,
    professionalCostsTotal: 0
  })

  // Format currency without euro symbol (as per classic fix)
  const formatCurrency = (amount: number) => {
    return Math.round(amount).toLocaleString('en-US')
  }

  // Calculate professional costs
  const calculateProfessionalCosts = () => {
    let total = 0
    
    if (professionalCosts.notary) {
      total += Math.min(Math.max(propertyPurchase * 0.02, 1500), 15000)
    }
    if (professionalCosts.legal) {
      total += Math.min(Math.max(propertyPurchase * 0.015, 2000), 10000)
    }
    if (professionalCosts.architect) {
      total += Math.max(restructuring * 0.08, 5000)
    }
    if (professionalCosts.permits) {
      total += 5000
    }
    if (professionalCosts.projectManagement) {
      total += Math.max(restructuring * 0.05, 5000)
    }
    
    return total
  }

  // Main calculation logic
  useEffect(() => {
    // Design & PM (6% of renovations only)
    const designPm = restructuring * 0.06
    
    // Calculate preliminary total (before preliminary studies)
    const preliminaryTotal = propertyPurchase + restructuring + fixtures + innovation + environmental + designPm
    
    // Preliminary studies (1.5% of total including studies)
    const preliminaryStudies = (preliminaryTotal * 0.015) / (1 - 0.015)
    
    // Total eligible
    const totalEligible = preliminaryTotal + preliminaryStudies
    
    // Integrated components percentage
    const integratedTotal = innovation + environmental
    const integratedPercent = (integratedTotal / totalEligible) * 100
    const integratedStatus = integratedPercent >= 5
    
    // Grant and tax credit
    const miniPiaGrant = totalEligible * (grantRate / 100)
    const taxCredit = totalEligible * 0.15
    const totalBenefit = miniPiaGrant + taxCredit
    
    // Non-eligible costs
    const agencyFees = propertyPurchase * (agencyRate / 100)
    const registrationTax = propertyPurchase * 0.09
    const totalNonEligible = agencyFees + registrationTax + notaryFees + consultingFees
    
    // Totals
    const totalProject = totalEligible + totalNonEligible
    const netInvestment = totalProject - totalBenefit
    
    // Professional costs
    const professionalCostsTotal = calculateProfessionalCosts()
    
    setResults({
      designPm,
      preliminaryStudies,
      totalEligible,
      miniPiaGrant,
      taxCredit,
      totalBenefit,
      agencyFees,
      registrationTax,
      totalNonEligible,
      totalProject,
      netInvestment,
      integratedPercent,
      integratedStatus,
      professionalCostsTotal
    })
  }, [propertyPurchase, restructuring, fixtures, innovation, environmental, grantRate, agencyRate, notaryFees, consultingFees, professionalCosts])

  // Handle report generation
  const handleReportGeneration = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Save to Firebase
      await addDoc(collection(db, 'calculator_leads'), {
        ...userData,
        calculations: results,
        timestamp: new Date().toISOString(),
        source: 'mini-pia-calculator'
      })
      
      // Generate simple text report
      const reportText = `INVESTISCOPE CLASSIC REPORT
==============================
Date: ${new Date().toLocaleDateString()}
Prepared for: ${userData.name}
Email: ${userData.email}

PROJECT SUMMARY (All amounts in EUR)
====================================
Total Project Investment: ${formatCurrency(results.totalProject)}
Total Eligible Costs: ${formatCurrency(results.totalEligible)}
Total Non-Eligible Costs: ${formatCurrency(results.totalNonEligible)}

MINI PIA BENEFITS
=================
Non-Refundable Grant: ${formatCurrency(results.miniPiaGrant)}
Tax Credit (15%): ${formatCurrency(results.taxCredit)}
Total Benefit: ${formatCurrency(results.totalBenefit)}

YOUR NET INVESTMENT
==================
Net Investment Required: ${formatCurrency(results.netInvestment)}

Contact: info@investinpuglia.eu
Generated by InvestiScope Classic - InvestInPuglia.eu`

      // Download report
      const blob = new Blob([reportText], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `InvestiScope_Report_${userData.name.replace(/\s+/g, '_')}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      
      toast.success('Report generated and saved!')
      setShowReportModal(false)
    } catch (error) {
      console.error('Error generating report:', error)
      toast.error('Error generating report. Please try again.')
    }
  }

  // Send WhatsApp message
  const sendWhatsApp = () => {
    const message = `INVESTISCOPE CLASSIC REPORT
(All amounts in EUR)

PROJECT BREAKDOWN
Total Project: ${formatCurrency(results.totalProject)}
Total Eligible: ${formatCurrency(results.totalEligible)}
Total Non-Eligible: ${formatCurrency(results.totalNonEligible)}

MINI PIA BENEFITS
Grant: ${formatCurrency(results.miniPiaGrant)}
Tax Credit: ${formatCurrency(results.taxCredit)}
Total Benefit: ${formatCurrency(results.totalBenefit)}

NET INVESTMENT: ${formatCurrency(results.netInvestment)}

Contact: info@investinpuglia.eu`

    window.open(`https://wa.me/393514001402?text=${encodeURIComponent(message)}`, '_blank')
  }

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
            InvestiScope™ Classic
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Advanced calculator for Mini PIA Turismo grants with detailed financial projections and ROI analysis
          </p>
          
          {/* Currency Notice */}
          <div className="bg-yellow-400/20 border border-yellow-400/50 rounded-lg px-4 py-2 mt-6 inline-block">
            <p className="font-semibold">📌 ALL AMOUNTS DISPLAYED ARE IN EUROS (EUR)</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Eligible Costs Card */}
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

              {/* Restructuring */}
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

              {/* Fixtures */}
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
                <p className="text-sm text-gray-500 mt-1">Equipment, furniture, and fittings</p>
                <p className="text-xs text-emerald-600 mt-1">
                  Suggested: 12.5% of civil works ({formatCurrency((propertyPurchase + restructuring) * 0.125)})
                </p>
              </div>

              {/* Innovation */}
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
              </div>

              {/* Environmental */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <Leaf className="h-4 w-4" />
                    Environmental Protection
                  </label>
                  <span className="text-xl font-bold text-purple-600">{formatCurrency(environmental)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="1000"
                  value={environmental}
                  onChange={(e) => setEnvironmental(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <p className="text-sm text-gray-500 mt-1">Energy efficiency and sustainability measures</p>
              </div>

              {/* Integrated Components Check */}
              <div className={`p-4 rounded-lg mb-6 ${results.integratedStatus ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-center gap-2">
                  {results.integratedStatus ? <Check className="h-5 w-5 text-green-600" /> : <X className="h-5 w-5 text-red-600" />}
                  <p className={`font-semibold ${results.integratedStatus ? 'text-green-800' : 'text-red-800'}`}>
                    Integrated Components: {results.integratedPercent.toFixed(1)}% of eligible costs
                  </p>
                </div>
                <p className={`text-sm mt-1 ${results.integratedStatus ? 'text-green-700' : 'text-red-700'}`}>
                  {results.integratedStatus ? 'YES - Meets minimum 5% requirement' : 'NO - Below minimum 5% requirement'}
                </p>
              </div>

              {/* Calculated Costs */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">📐 Design & Project Management</span>
                  <span className="font-bold text-gray-900">{formatCurrency(results.designPm)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">📋 Preliminary Studies & Technical Costs</span>
                  <span className="font-bold text-gray-900">{formatCurrency(results.preliminaryStudies)}</span>
                </div>
              </div>

              {/* Grant Rate Selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <Euro className="h-4 w-4" />
                    Mini PIA Grant Rate
                  </label>
                  <span className="text-xl font-bold text-purple-600">{grantRate}%</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="55"
                  step="1"
                  value={grantRate}
                  onChange={(e) => setGrantRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <p className="text-sm text-gray-500 mt-1">Non-refundable grant: 45-55% of eligible costs</p>
              </div>
            </div>

            {/* Non-Eligible Costs Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="h-6 w-6 text-red-600" />
                <h2 className="text-2xl font-bold text-gray-900">Non-Eligible Costs</h2>
              </div>

              {/* Agency Fees */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-medium text-gray-700">Agency Fees</label>
                  <span className="text-xl font-bold text-red-600">{formatCurrency(results.agencyFees)}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="5"
                  step="0.1"
                  value={agencyRate}
                  onChange={(e) => setAgencyRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <p className="text-sm text-gray-500 mt-1">Rate: {agencyRate.toFixed(1)}% of property value</p>
              </div>

              {/* Registration Tax */}
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg mb-4">
                <span className="text-gray-700">Registration Tax (9%)</span>
                <span className="font-bold text-red-600">{formatCurrency(results.registrationTax)}</span>
              </div>

              {/* Other Fees */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-gray-700">Notary & Legal Fees</label>
                    <span className="font-bold text-red-600">{formatCurrency(notaryFees)}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="30000"
                    step="1000"
                    value={notaryFees}
                    onChange={(e) => setNotaryFees(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-gray-700">Business Consulting</label>
                    <span className="font-bold text-red-600">{formatCurrency(consultingFees)}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="50000"
                    step="2500"
                    value={consultingFees}
                    onChange={(e) => setConsultingFees(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                </div>
              </div>
            </div>

            {/* Professional Costs Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Professional & Hidden Costs</h2>
              </div>

              <div className="space-y-3">
                {Object.entries({
                  notary: 'Notary Fees (2%)',
                  legal: 'Legal Assistance',
                  architect: 'Architect & Design (8%)',
                  permits: 'Permits & Approvals',
                  projectManagement: 'Project Management (5%)'
                }).map(([key, label]) => (
                  <label key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={professionalCosts[key as keyof typeof professionalCosts]}
                        onChange={(e) => setProfessionalCosts({...professionalCosts, [key]: e.target.checked})}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{label}</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {professionalCosts[key as keyof typeof professionalCosts] ? 
                        formatCurrency(
                          key === 'notary' ? Math.min(Math.max(propertyPurchase * 0.02, 1500), 15000) :
                          key === 'legal' ? Math.min(Math.max(propertyPurchase * 0.015, 2000), 10000) :
                          key === 'architect' ? Math.max(restructuring * 0.08, 5000) :
                          key === 'permits' ? 5000 :
                          Math.max(restructuring * 0.05, 5000)
                        ) : '0'
                      }
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-blue-900">Total Professional Costs:</span>
                  <span className="text-xl font-bold text-blue-600">{formatCurrency(results.professionalCostsTotal)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Main Results Card */}
            <div className="bg-gradient-to-br from-purple-600 to-emerald-600 rounded-2xl shadow-lg p-6 text-white sticky top-24">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Euro className="h-5 w-5" />
                Financial Summary
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm opacity-90">Total Eligible for Mini PIA</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.totalEligible)}</p>
                </div>
                
                <div className="border-t border-white/20 pt-4">
                  <p className="text-sm opacity-90">Non-Refundable Grant ({grantRate}%)</p>
                  <p className="text-3xl font-bold text-green-300">{formatCurrency(results.miniPiaGrant)}</p>
                </div>
                
                <div>
                  <p className="text-sm opacity-90">Tax Credit (15%)</p>
                  <p className="text-2xl font-bold text-blue-300">{formatCurrency(results.taxCredit)}</p>
                </div>
                
                <div className="border-t border-white/20 pt-4">
                  <p className="text-sm opacity-90">Total Mini PIA Benefit</p>
                  <p className="text-3xl font-bold text-yellow-300">{formatCurrency(results.totalBenefit)}</p>
                </div>

                <div className="border-t border-white/20 pt-4">
                  <p className="text-sm opacity-90">Total Non-Eligible Costs</p>
                  <p className="text-xl font-bold text-red-300">{formatCurrency(results.totalNonEligible)}</p>
                </div>

                <div className="border-t border-white/20 pt-4">
                  <p className="text-sm opacity-90">Total Project Investment</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.totalProject)}</p>
                </div>

                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm opacity-90 mb-1">Your Net Investment</p>
                  <p className="text-3xl font-bold text-green-300">{formatCurrency(results.netInvestment)}</p>
                  <p className="text-xs opacity-75 mt-1">(After Mini PIA benefits)</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button 
                onClick={() => setShowReportModal(true)}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="h-5 w-5" />
                Get My Free Report
              </button>
              
              <button 
                onClick={sendWhatsApp}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Send via WhatsApp
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">Important Note:</p>
                  <p>This calculator provides estimates. Actual grant amounts depend on official evaluation and regional approval.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Get Your Investment Report</h3>
              <button 
                onClick={() => setShowReportModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleReportGeneration} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={userData.email}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => setUserData({...userData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="+39 XXX XXX XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Location</label>
                <input
                  type="text"
                  value={userData.location}
                  onChange={(e) => setUserData({...userData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., Puglia, Tuscany, Sicily"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Investment Timeline</label>
                <select
                  value={userData.timeline}
                  onChange={(e) => setUserData({...userData, timeline: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate (0-3 months)</option>
                  <option value="short">Short term (3-6 months)</option>
                  <option value="medium">Medium term (6-12 months)</option>
                  <option value="long">Long term (12+ months)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                📧 Get My Free Report Now
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Your information is secure and will only be used to send your report.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}