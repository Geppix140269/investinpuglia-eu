'use client'

import { useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { TrendingDown, Calculator, RotateCcw } from 'lucide-react'

interface SavingsInputs {
  askingPrice: number
  negotiatedPrice: number
  renovationBudget: number
  architectStandardPct: number
  architectNegotiatedPct: number
  finConsultantStandardPct: number
  finConsultantNegotiatedPct: number
  grantEligiblePct: number
}

const defaultInputs: SavingsInputs = {
  askingPrice: 500000,
  negotiatedPrice: 400000,
  renovationBudget: 500000,
  architectStandardPct: 12.5,
  architectNegotiatedPct: 7,
  finConsultantStandardPct: 5,
  finConsultantNegotiatedPct: 3,
  grantEligiblePct: 50
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

function AnimatedNumber({ value, shouldAnimate }: { value: number; shouldAnimate: boolean }) {
  const [displayValue, setDisplayValue] = useState(value)

  if (!shouldAnimate) {
    return <>{formatCurrency(value)}</>
  }

  // Simple count-up animation
  if (displayValue !== value) {
    const step = (value - displayValue) / 10
    setTimeout(() => {
      setDisplayValue(prev => {
        const next = prev + step
        return Math.abs(value - next) < Math.abs(step) ? value : next
      })
    }, 20)
  }

  return <>{formatCurrency(displayValue)}</>
}

export default function CostSavingsVisualizer() {
  const [inputs, setInputs] = useState<SavingsInputs>(defaultInputs)
  const shouldReduceMotion = useReducedMotion()

  const updateInput = (key: keyof SavingsInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }))
  }

  const resetToDefaults = () => {
    setInputs(defaultInputs)
  }

  // Calculations
  const purchaseSaving = inputs.askingPrice - inputs.negotiatedPrice

  const architectStandard = inputs.renovationBudget * (inputs.architectStandardPct / 100)
  const architectNegotiated = inputs.renovationBudget * (inputs.architectNegotiatedPct / 100)
  const architectSaving = architectStandard - architectNegotiated

  const finStandard = inputs.renovationBudget * (inputs.finConsultantStandardPct / 100)
  const finNegotiated = inputs.renovationBudget * (inputs.finConsultantNegotiatedPct / 100)
  const finSaving = finStandard - finNegotiated

  const totalProfessionalSavings = architectSaving + finSaving

  const eligibleOffset = (inputs.grantEligiblePct / 100) * (architectNegotiated + finNegotiated)

  const totalSavings = purchaseSaving + totalProfessionalSavings

  const savingsData = [
    { label: 'Purchase Negotiation', value: purchaseSaving, color: 'bg-blue-500' },
    { label: 'Professional Fee Optimization', value: totalProfessionalSavings, color: 'bg-green-500' },
    { label: 'Grant-Eligible Offset', value: eligibleOffset, color: 'bg-cyan-500' }
  ]

  const maxValue = Math.max(...savingsData.map(d => d.value))

  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
          How Investors Typically Recover Their Advisory Investment
        </h3>
        <p className="font-sans text-sm text-gray-600 leading-relaxed mb-4">
          Our role is not only to structure and coordinate the project, but also to reduce overall costs. We do this mainly through:
        </p>
        <ul className="space-y-2 mb-4">
          <li className="flex items-start gap-2 font-sans text-sm text-gray-700">
            <span className="text-[#4A90E2] font-bold">•</span>
            Negotiating a better purchase price
          </li>
          <li className="flex items-start gap-2 font-sans text-sm text-gray-700">
            <span className="text-[#4A90E2] font-bold">•</span>
            Optimising professional fees (architect, engineer, consultants)
          </li>
          <li className="flex items-start gap-2 font-sans text-sm text-gray-700">
            <span className="text-[#4A90E2] font-bold">•</span>
            Ensuring that a significant share of those fees is eligible under co-funded grant programs
          </li>
        </ul>
      </div>

      {/* Interactive Inputs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4A90E2] to-[#34d399] rounded-lg flex items-center justify-center">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <h4 className="font-display text-lg font-bold text-gray-900">
              Scenario Calculator
            </h4>
          </div>
          <button
            onClick={resetToDefaults}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-sans text-sm font-medium text-gray-700"
            aria-label="Reset to example scenario"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Use Example Scenario</span>
          </button>
        </div>

        <div className="space-y-6">
          {/* Purchase Price */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="asking-price" className="block font-sans text-sm font-semibold text-gray-700 mb-2">
                Asking Price
              </label>
              <input
                id="asking-price"
                type="number"
                value={inputs.askingPrice}
                onChange={(e) => updateInput('askingPrice', Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                min="0"
                step="10000"
                aria-describedby="asking-price-help"
              />
              <p id="asking-price-help" className="sr-only">Enter the initial asking price for the property</p>
            </div>
            <div>
              <label htmlFor="negotiated-price" className="block font-sans text-sm font-semibold text-gray-700 mb-2">
                Negotiated Price
              </label>
              <input
                id="negotiated-price"
                type="number"
                value={inputs.negotiatedPrice}
                onChange={(e) => updateInput('negotiatedPrice', Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                min="0"
                step="10000"
                aria-describedby="negotiated-price-help"
              />
              <p id="negotiated-price-help" className="sr-only">Enter the negotiated purchase price</p>
            </div>
          </div>

          {/* Renovation Budget */}
          <div>
            <label htmlFor="renovation-budget" className="block font-sans text-sm font-semibold text-gray-700 mb-2">
              Renovation Budget: {formatCurrency(inputs.renovationBudget)}
            </label>
            <input
              id="renovation-budget"
              type="range"
              min="100000"
              max="2000000"
              step="50000"
              value={inputs.renovationBudget}
              onChange={(e) => updateInput('renovationBudget', Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4A90E2]"
              aria-describedby="renovation-budget-help"
            />
            <div className="flex justify-between font-sans text-xs text-gray-500 mt-1">
              <span>€100K</span>
              <span>€2M</span>
            </div>
            <p id="renovation-budget-help" className="sr-only">Adjust the total renovation budget using the slider</p>
          </div>

          {/* Architect Fees */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="architect-standard" className="block font-sans text-sm font-semibold text-gray-700 mb-2">
                Architect Standard Fee: {inputs.architectStandardPct}%
              </label>
              <input
                id="architect-standard"
                type="range"
                min="5"
                max="20"
                step="0.5"
                value={inputs.architectStandardPct}
                onChange={(e) => updateInput('architectStandardPct', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-400"
              />
            </div>
            <div>
              <label htmlFor="architect-negotiated" className="block font-sans text-sm font-semibold text-gray-700 mb-2">
                Architect Negotiated Fee: {inputs.architectNegotiatedPct}%
              </label>
              <input
                id="architect-negotiated"
                type="range"
                min="3"
                max="15"
                step="0.5"
                value={inputs.architectNegotiatedPct}
                onChange={(e) => updateInput('architectNegotiatedPct', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4A90E2]"
              />
            </div>
          </div>

          {/* Financial Consultant Fees */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fin-standard" className="block font-sans text-sm font-semibold text-gray-700 mb-2">
                Financial Consultant Standard: {inputs.finConsultantStandardPct}%
              </label>
              <input
                id="fin-standard"
                type="range"
                min="2"
                max="10"
                step="0.5"
                value={inputs.finConsultantStandardPct}
                onChange={(e) => updateInput('finConsultantStandardPct', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-400"
              />
            </div>
            <div>
              <label htmlFor="fin-negotiated" className="block font-sans text-sm font-semibold text-gray-700 mb-2">
                Financial Consultant Negotiated: {inputs.finConsultantNegotiatedPct}%
              </label>
              <input
                id="fin-negotiated"
                type="range"
                min="1"
                max="8"
                step="0.5"
                value={inputs.finConsultantNegotiatedPct}
                onChange={(e) => updateInput('finConsultantNegotiatedPct', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4A90E2]"
              />
            </div>
          </div>

          {/* Grant Eligible Coverage */}
          <div>
            <label htmlFor="grant-eligible" className="block font-sans text-sm font-semibold text-gray-700 mb-2">
              Grant-Eligible Coverage of Professional Fees: {inputs.grantEligiblePct}%
            </label>
            <input
              id="grant-eligible"
              type="range"
              min="0"
              max="100"
              step="5"
              value={inputs.grantEligiblePct}
              onChange={(e) => updateInput('grantEligiblePct', Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#34d399]"
            />
          </div>
        </div>
      </div>

      {/* Savings Visualization */}
      <motion.div
        className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 border border-blue-100"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <TrendingDown className="h-6 w-6 text-[#4A90E2]" />
          <h4 className="font-display text-xl font-bold text-gray-900">
            Potential Savings Breakdown
          </h4>
        </div>

        <div className="space-y-6 mb-8">
          <AnimatePresence>
            {savingsData.map((item, index) => (
              <motion.div
                key={item.label}
                className="space-y-2"
                initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : {
                  delay: index * 0.1,
                  duration: 0.3
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-sans text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="font-display text-lg font-bold text-gray-900">
                    <AnimatedNumber value={item.value} shouldAnimate={!shouldReduceMotion} />
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-full ${item.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / maxValue) * 100}%` }}
                    transition={shouldReduceMotion ? { duration: 0 } : {
                      delay: index * 0.1 + 0.2,
                      duration: 0.5,
                      ease: 'easeOut'
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Total Summary */}
        <div className="bg-white rounded-lg p-6 border-2 border-[#4A90E2]">
          <p className="font-sans text-sm text-gray-600 mb-3">
            In this scenario, the combined effect of negotiation and professional optimisation generates approximately:
          </p>
          <div className="font-display text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#34d399]">
            <AnimatedNumber value={totalSavings + eligibleOffset} shouldAnimate={!shouldReduceMotion} />
          </div>
          <p className="font-sans text-xs text-gray-500 mt-2">
            in potential savings before considering grant coverage
          </p>
        </div>

        {/* Disclaimer */}
        <p className="font-sans text-xs text-gray-500 mt-6 italic leading-relaxed">
          Values are indicative examples based on typical structures. Actual figures depend on the specific asset, market conditions, and grant rules.
        </p>
      </motion.div>
    </div>
  )
}
