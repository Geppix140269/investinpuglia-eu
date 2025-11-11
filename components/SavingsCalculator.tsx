/**
 * SavingsCalculator.tsx
 *
 * Interactive savings calculator demonstrating how advisory fees are offset
 * by negotiated savings in purchase price, professional fees, and grant coverage.
 *
 * Features:
 * - Multiple input fields with sensible defaults and tooltips
 * - Real-time calculations with visual breakdowns
 * - Animated number counting (respects prefers-reduced-motion)
 * - Green/red net gain indicator
 * - "Use Example Case" preset button
 * - Full keyboard navigation and ARIA labels
 * - Responsive mobile-first design
 *
 * @example
 * <SavingsCalculator defaultValues={{ askingPrice: 600000 }} />
 */

'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion, animate, AnimatePresence } from 'framer-motion'
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  Info,
  RotateCcw,
  Home,
  Check,
  User,
  FileText,
  Star
} from 'lucide-react'

// ============================================================================
// Types & Interfaces
// ============================================================================

interface CalculatorValues {
  askingPrice: number
  negotiatedPrice: number
  renovationBudget: number
  architectStdPercent: number
  architectNegPercent: number
  financialStdPercent: number
  financialNegPercent: number
  grantEligiblePercent: number
  phase1Fee: number
  phase2Fee: number
  phase3FeePercent: number
  financedPortion?: number
}

interface CalculatedResults {
  purchaseSaving: number
  architectSaving: number
  financialSaving: number
  totalProfessionalSavings: number
  grantEligibleOffset: number
  myFeesTotal: number
  netGain: number
}

interface SavingsCalculatorProps {
  className?: string
  defaultValues?: Partial<CalculatorValues>
}

// ============================================================================
// Default Values
// ============================================================================

const DEFAULT_VALUES: CalculatorValues = {
  askingPrice: 500000,
  negotiatedPrice: 400000,
  renovationBudget: 500000,
  architectStdPercent: 12.5,
  architectNegPercent: 7,
  financialStdPercent: 5,
  financialNegPercent: 3,
  grantEligiblePercent: 50,
  phase1Fee: 5000,
  phase2Fee: 5000,
  phase3FeePercent: 0,
  financedPortion: undefined
}

const EXAMPLE_CASE: CalculatorValues = {
  askingPrice: 500000,
  negotiatedPrice: 400000,
  renovationBudget: 500000,
  architectStdPercent: 12.5,
  architectNegPercent: 7,
  financialStdPercent: 5,
  financialNegPercent: 3,
  grantEligiblePercent: 50,
  phase1Fee: 5000,
  phase2Fee: 5000,
  phase3FeePercent: 0,
  financedPortion: 500000
}

// ============================================================================
// Utility Hooks
// ============================================================================

function useAnimatedNumber(value: number, duration = 0.5): number {
  const [displayValue, setDisplayValue] = useState(value)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value)
      return
    }

    const controls = animate(displayValue, value, {
      duration,
      onUpdate: (latest) => setDisplayValue(latest)
    })

    return () => controls.stop()
  }, [value, duration, shouldReduceMotion, displayValue])

  return displayValue
}

// ============================================================================
// Format Utilities
// ============================================================================

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

// ============================================================================
// Main Component
// ============================================================================

export default function SavingsCalculator({
  className = '',
  defaultValues
}: SavingsCalculatorProps) {
  const [values, setValues] = useState<CalculatorValues>({
    ...DEFAULT_VALUES,
    ...defaultValues
  })
  const [showAdvanced, setShowAdvanced] = useState(false)

  const results = calculateResults(values)

  const handleChange = (field: keyof CalculatorValues, value: number) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const loadExampleCase = () => {
    setValues(EXAMPLE_CASE)
  }

  return (
    <div className={`w-full ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-md border border-stone-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-stone-50 to-stone-100 p-6 border-b border-stone-200">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Calculator className="w-6 h-6 text-stone-700" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900">
                  Savings Calculator
                </h3>
                <p className="text-sm text-stone-600">
                  See how advisory fees pay for themselves
                </p>
              </div>
            </div>
            <button
              onClick={loadExampleCase}
              aria-label="Load example case with preset values"
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-50 text-stone-700 text-sm font-semibold rounded-lg border border-stone-300 transition-colors focus:outline-none focus:ring-4 focus:ring-stone-400"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Use Example Case</span>
              <span className="sm:hidden">Example</span>
            </button>
          </div>

          {/* Net Gain Display */}
          <NetGainBadge netGain={results.netGain} />
        </div>

        {/* Input Sections */}
        <div className="p-6 space-y-6">
          {/* Purchase Details */}
          <Section
            title="Purchase Details"
            icon={Home}
            description="Property acquisition prices"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Asking Price"
                value={values.askingPrice}
                onChange={(v) => handleChange('askingPrice', v)}
                type="currency"
                tooltip="Initial property asking price"
              />
              <InputField
                label="Negotiated Price"
                value={values.negotiatedPrice}
                onChange={(v) => handleChange('negotiatedPrice', v)}
                type="currency"
                tooltip="Final agreed purchase price"
                highlight={values.negotiatedPrice < values.askingPrice}
              />
            </div>
          </Section>

          {/* Renovation & Financing */}
          <Section
            title="Renovation & Financing"
            icon={Check}
            description="Project budget and financing"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Renovation Budget"
                value={values.renovationBudget}
                onChange={(v) => handleChange('renovationBudget', v)}
                type="currency"
                tooltip="Total renovation/construction budget"
              />
              {showAdvanced && (
                <InputField
                  label="Financed Portion"
                  value={values.financedPortion || values.renovationBudget}
                  onChange={(v) => handleChange('financedPortion', v)}
                  type="currency"
                  tooltip="Amount to be financed (defaults to renovation budget)"
                />
              )}
            </div>
          </Section>

          {/* Professional Fees */}
          <Section
            title="Professional Fees"
            icon={User}
            description="Architect and financial consultant percentages"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Architect Standard %"
                  value={values.architectStdPercent}
                  onChange={(v) => handleChange('architectStdPercent', v)}
                  type="percent"
                  tooltip="Standard market rate for architect (10-15%)"
                  min={0}
                  max={20}
                />
                <InputField
                  label="Architect Negotiated %"
                  value={values.architectNegPercent}
                  onChange={(v) => handleChange('architectNegPercent', v)}
                  type="percent"
                  tooltip="Negotiated architect rate (6-8%)"
                  min={0}
                  max={20}
                  highlight={values.architectNegPercent < values.architectStdPercent}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Financial Standard %"
                  value={values.financialStdPercent}
                  onChange={(v) => handleChange('financialStdPercent', v)}
                  type="percent"
                  tooltip="Standard financial consultant rate"
                  min={0}
                  max={10}
                />
                <InputField
                  label="Financial Negotiated %"
                  value={values.financialNegPercent}
                  onChange={(v) => handleChange('financialNegPercent', v)}
                  type="percent"
                  tooltip="Negotiated financial consultant rate"
                  min={0}
                  max={10}
                  highlight={values.financialNegPercent < values.financialStdPercent}
                />
              </div>
            </div>
          </Section>

          {/* Grant Eligibility & My Fees */}
          <Section
            title="Grant Eligibility & Advisory Fees"
            icon={FileText}
            description="Grant coverage and advisory phase fees"
          >
            <div className="space-y-4">
              <InputField
                label="Grant-Eligible Coverage %"
                value={values.grantEligiblePercent}
                onChange={(v) => handleChange('grantEligiblePercent', v)}
                type="percent"
                tooltip="Percentage of professional fees covered by grants (typically 50%)"
                min={0}
                max={100}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  label="Phase 1 Fee"
                  value={values.phase1Fee}
                  onChange={(v) => handleChange('phase1Fee', v)}
                  type="currency"
                  tooltip="Strategic Engagement & Kick-Off fee"
                />
                <InputField
                  label="Phase 2 Fee"
                  value={values.phase2Fee}
                  onChange={(v) => handleChange('phase2Fee', v)}
                  type="currency"
                  tooltip="Project Structuring & Preliminary Agreement fee"
                />
                <InputField
                  label="Phase 3 Fee %"
                  value={values.phase3FeePercent}
                  onChange={(v) => handleChange('phase3FeePercent', v)}
                  type="percent"
                  tooltip="Optional success fee as % of financed portion (leave 0 if not using)"
                  min={0}
                  max={10}
                />
              </div>
            </div>
          </Section>

          {/* Advanced Options Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-stone-600 hover:text-stone-900 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-stone-400 rounded px-2 py-1"
          >
            {showAdvanced ? '− Hide' : '+ Show'} Advanced Options
          </button>
        </div>

        {/* Results Breakdown */}
        <ResultsBreakdown results={results} values={values} />

        {/* Footer Note */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200">
          <p className="text-xs text-stone-600 flex items-start gap-2">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              Assumptions can be edited; results are indicative and should be verified
              with specific project details and professional quotes.
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

// ============================================================================
// Calculation Logic
// ============================================================================

function calculateResults(values: CalculatorValues): CalculatedResults {
  const financedPortion = values.financedPortion || values.renovationBudget

  // Purchase saving
  const purchaseSaving = values.askingPrice - values.negotiatedPrice

  // Architect saving
  const architectSaving =
    ((values.architectStdPercent - values.architectNegPercent) / 100) *
    values.renovationBudget

  // Financial consultant saving
  const financialSaving =
    ((values.financialStdPercent - values.financialNegPercent) / 100) *
    financedPortion

  // Total professional savings
  const totalProfessionalSavings = architectSaving + financialSaving

  // Grant-eligible offset
  const architectNegotiatedFee = (values.architectNegPercent / 100) * values.renovationBudget
  const accountantFee = (1.5 / 100) * financedPortion
  const financialNegotiatedFee = (values.financialNegPercent / 100) * financedPortion

  const totalEligibleFees = architectNegotiatedFee + accountantFee + financialNegotiatedFee
  const grantEligibleOffset = (values.grantEligiblePercent / 100) * totalEligibleFees

  // My fees total
  const phase3Fee = (values.phase3FeePercent / 100) * financedPortion
  const myFeesTotal = values.phase1Fee + values.phase2Fee + phase3Fee

  // Net gain
  const netGain =
    purchaseSaving + totalProfessionalSavings + grantEligibleOffset - myFeesTotal

  return {
    purchaseSaving,
    architectSaving,
    financialSaving,
    totalProfessionalSavings,
    grantEligibleOffset,
    myFeesTotal,
    netGain
  }
}

// ============================================================================
// Sub-Components
// ============================================================================

interface SectionProps {
  title: string
  icon: React.ComponentType<{ className?: string }>
  description?: string
  children: React.ReactNode
}

function Section({ title, icon: Icon, description, children }: SectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-stone-600" aria-hidden="true" />
        <div>
          <h4 className="text-sm font-bold text-stone-900">{title}</h4>
          {description && (
            <p className="text-xs text-stone-600">{description}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

// ============================================================================
// Input Field Component
// ============================================================================

interface InputFieldProps {
  label: string
  value: number
  onChange: (value: number) => void
  type: 'currency' | 'percent'
  tooltip?: string
  min?: number
  max?: number
  highlight?: boolean
}

function InputField({
  label,
  value,
  onChange,
  type,
  tooltip,
  min,
  max,
  highlight = false
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false)
  const inputId = `input-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className="relative">
      <label
        htmlFor={inputId}
        className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1"
      >
        {label}
        {tooltip && (
          <Tooltip text={tooltip}>
            <Info className="w-3.5 h-3.5 text-stone-400" aria-hidden="true" />
          </Tooltip>
        )}
      </label>
      <div className="relative">
        {type === 'currency' && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 text-sm pointer-events-none">
            €
          </span>
        )}
        <input
          id={inputId}
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          min={min}
          max={max}
          step={type === 'percent' ? 0.1 : 1000}
          aria-describedby={tooltip ? `${inputId}-tooltip` : undefined}
          className={`
            w-full px-3 py-2.5 rounded-lg border-2 text-sm font-medium
            transition-all duration-200
            focus:outline-none focus:ring-4 focus:ring-stone-400/50
            ${type === 'currency' ? 'pl-7' : ''}
            ${type === 'percent' ? 'pr-7' : ''}
            ${
              highlight
                ? 'border-green-300 bg-green-50 text-green-900 focus:border-green-400'
                : 'border-stone-300 bg-white text-stone-900 focus:border-stone-400'
            }
            ${isFocused ? 'shadow-md' : 'shadow-sm'}
          `}
        />
        {type === 'percent' && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 text-sm pointer-events-none">
            %
          </span>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// Tooltip Component
// ============================================================================

function Tooltip({
  text,
  children
}: {
  text: string
  children: React.ReactNode
}) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        aria-label={text}
        className="focus:outline-none focus:ring-2 focus:ring-stone-400 rounded"
      >
        {children}
      </button>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-stone-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-10 pointer-events-none"
            role="tooltip"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-stone-900 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================================================
// Net Gain Badge
// ============================================================================

function NetGainBadge({ netGain }: { netGain: number }) {
  const animatedValue = useAnimatedNumber(netGain, 0.8)
  const isPositive = netGain >= 0

  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      className={`
        inline-flex items-center gap-3 px-6 py-4 rounded-xl font-bold text-lg
        shadow-lg
        ${
          isPositive
            ? 'bg-gradient-to-br from-green-500 to-green-600 text-white'
            : 'bg-gradient-to-br from-red-500 to-red-600 text-white'
        }
      `}
      role="status"
      aria-live="polite"
    >
      {isPositive ? (
        <TrendingUp className="w-6 h-6" aria-hidden="true" />
      ) : (
        <TrendingDown className="w-6 h-6" aria-hidden="true" />
      )}
      <div>
        <div className="text-sm opacity-90 font-normal">
          {isPositive ? 'Net Gain' : 'Shortfall'}
        </div>
        <div className="text-2xl">
          {isPositive ? '+' : ''}
          {formatCurrency(animatedValue)}
        </div>
      </div>
      {isPositive && <Star className="w-5 h-5 opacity-75" aria-hidden="true" />}
    </motion.div>
  )
}

// ============================================================================
// Results Breakdown
// ============================================================================

interface ResultsBreakdownProps {
  results: CalculatedResults
  values: CalculatorValues
}

function ResultsBreakdown({ results, values }: ResultsBreakdownProps) {
  const shouldReduceMotion = useReducedMotion()

  const categories = [
    {
      label: 'Purchase Saving',
      value: results.purchaseSaving,
      description: `Negotiated price vs. asking price`,
      color: 'green'
    },
    {
      label: 'Architect Fee Saving',
      value: results.architectSaving,
      description: `Reduced from ${formatPercent(values.architectStdPercent)} to ${formatPercent(values.architectNegPercent)}`,
      color: 'green'
    },
    {
      label: 'Financial Consultant Saving',
      value: results.financialSaving,
      description: `Reduced from ${formatPercent(values.financialStdPercent)} to ${formatPercent(values.financialNegPercent)}`,
      color: 'green'
    },
    {
      label: 'Grant-Eligible Offset',
      value: results.grantEligibleOffset,
      description: `${formatPercent(values.grantEligiblePercent)} of eligible professional fees`,
      color: 'blue'
    },
    {
      label: 'My Advisory Fees',
      value: -results.myFeesTotal,
      description: `Phase 1 + Phase 2${values.phase3FeePercent > 0 ? ' + Phase 3' : ''}`,
      color: 'red'
    }
  ]

  return (
    <div className="px-6 py-6 bg-stone-50 border-t border-stone-200 space-y-3">
      <h4 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4" aria-hidden="true" />
        Savings Breakdown
      </h4>

      {categories.map((cat, index) => (
        <motion.div
          key={cat.label}
          initial={shouldReduceMotion ? {} : { opacity: 0, x: -40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : 0.6 + index * 0.1,
            ease: "easeOut"
          }}
        >
          <ResultRow {...cat} />
        </motion.div>
      ))}

      {/* Total Line */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.6,
          delay: shouldReduceMotion ? 0 : 1.2,
          ease: "easeOut"
        }}
        className="pt-4 mt-4 border-t-2 border-stone-300"
      >
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-stone-900">Total Net Gain</span>
          <span
            className={`text-xl font-bold ${
              results.netGain >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {results.netGain >= 0 ? '+' : ''}
            {formatCurrency(results.netGain)}
          </span>
        </div>
      </motion.div>
    </div>
  )
}

// ============================================================================
// Result Row Component
// ============================================================================

interface ResultRowProps {
  label: string
  value: number
  description: string
  color: 'green' | 'blue' | 'red'
}

function ResultRow({ label, value, description, color }: ResultRowProps) {
  const animatedValue = useAnimatedNumber(value, 0.5)

  const colorClasses = {
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-100 text-blue-700',
    red: 'bg-red-100 text-red-700'
  }

  return (
    <div className="flex items-center justify-between gap-4 p-3 bg-white rounded-lg border border-stone-200">
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-stone-900">{label}</div>
        <div className="text-xs text-stone-600 truncate">{description}</div>
      </div>
      <div
        className={`
          px-3 py-1.5 rounded-lg font-bold text-sm whitespace-nowrap
          ${colorClasses[color]}
        `}
      >
        {value >= 0 ? '+' : ''}
        {formatCurrency(animatedValue)}
      </div>
    </div>
  )
}
