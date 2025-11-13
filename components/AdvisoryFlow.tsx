/**
 * AdvisoryFlow.tsx
 *
 * Production-ready animated 3-phase advisory flow component.
 * Displays strategic engagement phases with animated connectors and expandable details.
 *
 * Features:
 * - Animated nodes with staggered entrance
 * - SVG path drawing animation for connectors
 * - Expandable node details with popovers
 * - Two display variants: graph (visual flow) and cards (stacked)
 * - Full keyboard navigation and ARIA support
 * - Respects prefers-reduced-motion
 *
 * @example
 * <AdvisoryFlow variant="graph" onPhaseSelect={(id) => console.log(id)} />
 */

'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import {
  User,
  Home,
  Check,
  ChevronRight,
  ChevronDown,
  X
} from 'lucide-react'

// ============================================================================
// Types & Data
// ============================================================================

interface PhaseData {
  id: string
  number: number
  title: string
  subtitle: string
  price: string
  icon: React.ComponentType<{ className?: string }>
  bullets: string[]
  payment: string
  optional?: boolean
}

const PHASES: PhaseData[] = [
  {
    id: 'phase-1',
    number: 1,
    title: 'Strategic Engagement & Kick-Off',
    subtitle: 'Foundation & Assessment',
    price: '',
    icon: User,
    bullets: [
      'Representation with property owners, agents, and local professionals',
      'Eligibility assessment (Mini PIA / PIA Turismo / ZES Unica)',
      'Support in negotiations, due diligence, and partner selection (architect, engineer, accountant, notary)',
      'Business case, investment summary, financial feasibility'
    ],
    payment: 'Payment at engagement'
  },
  {
    id: 'phase-2',
    number: 2,
    title: 'Project Structuring & Preliminary Agreement',
    subtitle: 'Legal & Financial Setup',
    price: '',
    icon: Home,
    bullets: [
      'Company vehicle setup/reorg (S.r.l.), shareholder/cooperation agreements',
      'Coordination of accredited accountant (grant submission) and engineer/architect (technical docs)',
      'Business & investment plans prepared for CUP (Codice Unico Progetto)',
      'Bank coordination and signing of the Preliminary Agreement (roles, timing, financing path)'
    ],
    payment: 'Payment upon signing the Preliminary Agreement'
  },
  {
    id: 'phase-3',
    number: 3,
    title: 'Optional Project Coordination & Delivery',
    subtitle: 'Execution & Oversight',
    price: '',
    icon: Check,
    optional: true,
    bullets: [
      'Liaison with accountant, bank, contractors; oversight of works, budgets, compliance',
      'Representation in meetings; verification of progress, invoices, deliverables',
      'Regular reporting; final compliance and delivery'
    ],
    payment: 'Optional; success fee % agreed per project'
  }
]

// ============================================================================
// Props Interface
// ============================================================================

interface AdvisoryFlowProps {
  variant?: 'graph' | 'cards' | 'circle'
  onPhaseSelect?: (phaseId: string) => void
  className?: string
  compact?: boolean
}

// ============================================================================
// Main Component
// ============================================================================

export default function AdvisoryFlow({
  variant = 'graph',
  onPhaseSelect,
  className = '',
  compact = false
}: AdvisoryFlowProps) {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handlePhaseClick = (phaseId: string) => {
    setSelectedPhase(selectedPhase === phaseId ? null : phaseId)
    onPhaseSelect?.(phaseId)
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Header - Hide in compact mode */}
      {!compact && (
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 text-center lg:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">
            Project Development & Advisory (Puglia)
          </h2>
          <p className="text-lg text-stone-600">
            From opportunity to funded project — strategy, structuring, delivery.
          </p>
        </motion.div>
      )}

      {/* Flow Visualization */}
      {variant === 'circle' ? (
        <CircleView
          phases={PHASES}
          hoveredPhase={hoveredPhase}
          onPhaseHover={setHoveredPhase}
          onPhaseClick={handlePhaseClick}
        />
      ) : variant === 'graph' ? (
        <GraphView
          phases={PHASES}
          selectedPhase={selectedPhase}
          onPhaseClick={handlePhaseClick}
          isClient={isClient}
        />
      ) : (
        <CardsView
          phases={PHASES}
          selectedPhase={selectedPhase}
          onPhaseClick={handlePhaseClick}
        />
      )}

      {/* Modal for mobile */}
      <AnimatePresence>
        {selectedPhase && (
          <PhaseModal
            phase={PHASES.find(p => p.id === selectedPhase)!}
            onClose={() => setSelectedPhase(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================================================
// Graph View (Visual Flow with Connectors)
// ============================================================================

function GraphView({
  phases,
  selectedPhase,
  onPhaseClick,
  isClient
}: {
  phases: PhaseData[]
  selectedPhase: string | null
  onPhaseClick: (id: string) => void
  isClient: boolean
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="relative">
      {/* Desktop: Horizontal Flow */}
      <div className="hidden lg:block">
        <div className="relative flex items-start justify-between gap-4">
          {phases.map((phase, index) => (
            <div key={phase.id} className="flex items-center flex-1">
              {/* Node */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.8,
                  delay: shouldReduceMotion ? 0 : 0.3 + index * 0.3,
                  ease: "easeOut"
                }}
                className="flex-1"
              >
                <PhaseNode
                  phase={phase}
                  isSelected={selectedPhase === phase.id}
                  onClick={() => onPhaseClick(phase.id)}
                  variant="graph"
                />
              </motion.div>

              {/* Connector Arrow */}
              {index < phases.length - 1 && (
                <motion.div
                  initial={shouldReduceMotion ? {} : { opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 1.0,
                    delay: shouldReduceMotion ? 0 : 0.8 + index * 0.3,
                    ease: "easeInOut"
                  }}
                  className="flex items-center justify-center px-2 origin-left"
                >
                  <svg
                    width="60"
                    height="40"
                    viewBox="0 0 60 40"
                    className="text-stone-400"
                    fill="none"
                  >
                    <motion.path
                      d="M 5 20 L 50 20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={shouldReduceMotion ? {} : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 1.2,
                        delay: shouldReduceMotion ? 0 : 0.9 + index * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.path
                      d="M 45 15 L 50 20 L 45 25"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={shouldReduceMotion ? {} : { pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.5,
                        delay: shouldReduceMotion ? 0 : 1.8 + index * 0.3,
                        ease: "easeOut"
                      }}
                    />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet: Vertical Flow */}
      <div className="lg:hidden space-y-4">
        {phases.map((phase, index) => (
          <div key={phase.id}>
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.7,
                delay: shouldReduceMotion ? 0 : 0.2 + index * 0.25,
                ease: "easeOut"
              }}
            >
              <PhaseNode
                phase={phase}
                isSelected={selectedPhase === phase.id}
                onClick={() => onPhaseClick(phase.id)}
                variant="cards"
              />
            </motion.div>

            {index < phases.length - 1 && (
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, scaleY: 0, y: -20 }}
                animate={{ opacity: 1, scaleY: 1, y: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.6,
                  delay: shouldReduceMotion ? 0 : 0.7 + index * 0.25,
                  ease: "easeOut"
                }}
                className="flex justify-center py-2 origin-top"
              >
                <ChevronDown className="w-6 h-6 text-stone-400" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// Cards View (Stacked Expandable Cards)
// ============================================================================

function CardsView({
  phases,
  selectedPhase,
  onPhaseClick
}: {
  phases: PhaseData[]
  selectedPhase: string | null
  onPhaseClick: (id: string) => void
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="space-y-4">
      {phases.map((phase, index) => (
        <motion.div
          key={phase.id}
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.4,
            delay: shouldReduceMotion ? 0 : index * 0.1
          }}
        >
          <ExpandableCard
            phase={phase}
            isExpanded={selectedPhase === phase.id}
            onToggle={() => onPhaseClick(phase.id)}
          />
        </motion.div>
      ))}
    </div>
  )
}

// ============================================================================
// Circle View (Interactive Pie Chart)
// ============================================================================

function CircleView({
  phases,
  hoveredPhase,
  onPhaseHover,
  onPhaseClick
}: {
  phases: PhaseData[]
  hoveredPhase: string | null
  onPhaseHover: (id: string | null) => void
  onPhaseClick: (id: string) => void
}) {
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setIsClient(true)
    // Detect if device is mobile/touch-enabled
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  // Create pie chart path for each segment
  const createPieSlice = (startAngle: number, endAngle: number, radius: number = 45) => {
    const start = polarToCartesian(50, 50, radius, endAngle)
    const end = polarToCartesian(50, 50, radius, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

    return [
      `M 50 50`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
      'Z'
    ].join(' ')
  }

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    }
  }

  // Calculate label position for each segment
  const getLabelPosition = (startAngle: number, endAngle: number) => {
    const midAngle = (startAngle + endAngle) / 2
    const radius = 30
    return polarToCartesian(50, 50, radius, midAngle)
  }

  // Colors for each phase
  const colors = [
    { base: '#78716c', hover: '#57534e', light: '#d6d3d1' }, // stone-500, stone-600, stone-300
    { base: '#57534e', hover: '#44403c', light: '#a8a29e' }, // stone-600, stone-700, stone-400
    { base: '#f59e0b', hover: '#d97706', light: '#fde047' }  // amber-500, amber-600, amber-300 (optional)
  ]

  // Divide circle into 3 equal parts (120 degrees each)
  const anglePerSegment = 360 / phases.length

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Title above pie chart */}
      <h3 className="text-xl md:text-2xl font-bold text-stone-900 text-center mb-6">
        InvestInPuglia Value Added Service
      </h3>

      {!isClient ? (
        <div className="aspect-square flex items-center justify-center bg-stone-100 rounded-full">
          <div className="text-center">
            <div className="text-sm text-stone-600">Loading chart...</div>
          </div>
        </div>
      ) : (
      <>
      <div
        className="aspect-square relative"
        onClick={(e) => {
          // Close tooltip when clicking the background on mobile
          if (isMobile && e.target === e.currentTarget && hoveredPhase) {
            onPhaseHover(null)
          }
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Pie chart segments */}
        {phases.map((phase, index) => {
          const startAngle = index * anglePerSegment
          const endAngle = (index + 1) * anglePerSegment
          const path = createPieSlice(startAngle, endAngle)
          const Icon = phase.icon
          const labelPos = getLabelPosition(startAngle, endAngle)
          const isHovered = hoveredPhase === phase.id
          const color = colors[index]

          return (
            <g key={phase.id}>
              {/* Pie slice */}
              <path
                d={path}
                fill={isHovered ? color.hover : color.base}
                stroke="white"
                strokeWidth="1"
                className="cursor-pointer transition-all duration-300 hover:opacity-90"
                style={{
                  transformOrigin: '50% 50%',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseEnter={() => !isMobile && onPhaseHover(phase.id)}
                onMouseLeave={() => !isMobile && onPhaseHover(null)}
                onClick={() => {
                  if (isMobile) {
                    // On mobile: toggle hover state with tap
                    onPhaseHover(hoveredPhase === phase.id ? null : phase.id)
                  } else {
                    // On desktop: navigate to advisory page
                    onPhaseClick(phase.id)
                  }
                }}
                role="button"
                aria-label={`${phase.title}. Click for details.`}
              />

              {/* Phase label in center of slice */}
              <g
                className="pointer-events-none"
                opacity={isHovered ? 1 : 0.9}
              >
                {/* Phase number circle */}
                <circle
                  cx={labelPos.x}
                  cy={labelPos.y - 3}
                  r="6"
                  fill="white"
                  opacity="0.9"
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  className="text-[6px] font-bold"
                  fill={color.base}
                >
                  {phase.number}
                </text>
              </g>
            </g>
          )
        })}

        {/* Center circle with logo */}
        <circle
          cx="50"
          cy="50"
          r="18"
          fill="white"
          className="drop-shadow-lg"
        />

        {/* Logo - Simple design */}
        <g>
          {/* Stylized IP letters */}
          <text
            x="50"
            y="48"
            textAnchor="middle"
            className="text-[8px] font-bold fill-stone-900"
            style={{ fontFamily: 'serif' }}
          >
            IP
          </text>
          <text
            x="50"
            y="55"
            textAnchor="middle"
            className="text-[2.5px] fill-stone-600"
          >
            Puglia
          </text>
        </g>
      </svg>

      {/* Hover text overlay - shows phase info on the pie slice */}
      {hoveredPhase && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {(() => {
            const phase = phases.find(p => p.id === hoveredPhase)
            if (!phase) return null

            return (
              <div className="bg-white/95 backdrop-blur-sm px-6 py-4 rounded-xl shadow-2xl border-2 border-stone-300 max-w-[80%] text-center">
                <div className={`text-lg font-bold mb-1 ${phase.optional ? 'text-amber-600' : 'text-stone-900'}`}>
                  Phase {phase.number}
                </div>
                <div className="text-sm font-semibold text-stone-800 mb-2">
                  {phase.title}
                </div>
                <div className="text-xs text-stone-600">
                  {phase.subtitle}
                </div>
              </div>
            )
          })()}
        </div>
      )}
        </div>

        {/* Hover tooltip - positioned outside the SVG */}
        <AnimatePresence>
          {hoveredPhase && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-6 p-6 bg-stone-900 text-white rounded-xl shadow-2xl w-96 max-w-[95vw] z-50"
            >
              {/* Close button for mobile */}
              {isMobile && (
                <button
                  onClick={() => onPhaseHover(null)}
                  className="absolute top-2 right-2 p-1 hover:bg-stone-800 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            {(() => {
              const phase = phases.find(p => p.id === hoveredPhase)
              if (!phase) return null

              return (
                <>
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4 pb-4 border-b border-stone-700">
                    <div className={`p-3 rounded-lg ${phase.optional ? 'bg-amber-500' : 'bg-stone-600'}`}>
                      <phase.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${phase.optional ? 'bg-amber-500/20 text-amber-300' : 'bg-stone-700 text-stone-200'}`}>
                          Phase {phase.number}
                        </span>
                        {phase.optional && (
                          <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-xs font-semibold rounded">
                            Optional
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold leading-tight mb-1">{phase.title}</h4>
                      <p className="text-xs text-stone-300">{phase.subtitle}</p>
                    </div>
                  </div>

                  {/* Deliverables & Components */}
                  <div className="mb-4">
                    <h5 className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-3">
                      Key Deliverables & Components
                    </h5>
                    <ul className="space-y-2.5" role="list">
                      {phase.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-stone-200">
                          <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5 text-stone-400" aria-hidden="true" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Payment Terms */}
                  <div className="pt-4 border-t border-stone-700">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                      <div>
                        <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide block mb-1">
                          Payment Terms
                        </span>
                        <p className="text-sm text-stone-200 font-medium">{phase.payment}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tooltip arrow */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-stone-900 rotate-45" />
                </>
              )
            })()}
          </motion.div>
        )}
        </AnimatePresence>

        {/* Legend below pie chart */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {phases.map((phase, index) => {
          const color = colors[index]
          const Icon = phase.icon

          return (
            <button
              key={phase.id}
              onClick={() => {
                if (isMobile) {
                  // On mobile: toggle hover state with tap
                  onPhaseHover(hoveredPhase === phase.id ? null : phase.id)
                } else {
                  // On desktop: navigate to advisory page
                  onPhaseClick(phase.id)
                }
              }}
              onMouseEnter={() => !isMobile && onPhaseHover(phase.id)}
              onMouseLeave={() => !isMobile && onPhaseHover(null)}
              className="flex items-center gap-2 p-3 rounded-lg bg-white border-2 border-stone-200 hover:border-stone-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              <div
                className="w-4 h-4 rounded-sm flex-shrink-0"
                style={{ backgroundColor: color.base }}
              />
              <div className="text-left flex-1 min-w-0">
                <div className="text-xs font-bold text-stone-900 truncate">
                  Phase {phase.number}
                </div>
                <div className="text-[10px] text-stone-600 truncate">
                  {phase.subtitle}
                </div>
              </div>
            </button>
          )
        })}
        </div>
      </>
      )}
    </div>
  )
}

// ============================================================================
// Phase Node Component
// ============================================================================

interface PhaseNodeProps {
  phase: PhaseData
  isSelected: boolean
  onClick: () => void
  variant: 'graph' | 'cards'
}

function PhaseNode({ phase, isSelected, onClick, variant }: PhaseNodeProps) {
  const Icon = phase.icon
  const shouldReduceMotion = useReducedMotion()

  return (
    <button
      onClick={onClick}
      aria-expanded={isSelected}
      aria-label={`${phase.title}. Click to view details.`}
      className={`
        group relative w-full
        bg-white rounded-2xl shadow-md hover:shadow-xl
        transition-all duration-300
        border-2 border-transparent
        hover:border-stone-300
        focus:outline-none focus:ring-4 focus:ring-stone-400 focus:ring-offset-2
        ${isSelected ? 'ring-4 ring-stone-400 border-stone-400' : ''}
        ${phase.optional ? 'border-dashed border-stone-300' : ''}
      `}
    >
      <div className="p-6">
        {/* Icon & Number Badge */}
        <div className="flex items-center justify-between mb-4">
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 5 }}
            className={`
              p-3 rounded-xl
              ${phase.optional
                ? 'bg-amber-50 text-amber-600'
                : 'bg-stone-100 text-stone-700'
              }
              group-hover:shadow-lg transition-shadow
            `}
          >
            <Icon className="w-8 h-8" aria-hidden="true" />
          </motion.div>
          <div
            className={`
              px-3 py-1 rounded-full text-sm font-bold
              ${phase.optional
                ? 'bg-amber-100 text-amber-700'
                : 'bg-stone-200 text-stone-700'
              }
            `}
          >
            Phase {phase.number}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-stone-900 mb-2 text-left">
          {phase.title}
        </h3>
        <p className="text-sm text-stone-600 mb-3 text-left">{phase.subtitle}</p>

        {/* Price */}
        {phase.price ? (
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-stone-900">{phase.price}</span>
            <ChevronRight
              className={`
                w-5 h-5 text-stone-400
                transition-transform duration-300
                ${isSelected ? 'rotate-90' : 'group-hover:translate-x-1'}
              `}
              aria-hidden="true"
            />
          </div>
        ) : (
          <div className="flex items-center justify-end">
            <ChevronRight
              className={`
                w-5 h-5 text-stone-400
                transition-transform duration-300
                ${isSelected ? 'rotate-90' : 'group-hover:translate-x-1'}
              `}
              aria-hidden="true"
            />
          </div>
        )}

        {/* Optional Badge */}
        {phase.optional && (
          <div className="mt-4 pt-4 border-t border-stone-200">
            <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full">
              Optional Phase
            </span>
          </div>
        )}
      </div>

      {/* Hover Glow Effect */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-stone-200/50 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
    </button>
  )
}

// ============================================================================
// Expandable Card Component
// ============================================================================

interface ExpandableCardProps {
  phase: PhaseData
  isExpanded: boolean
  onToggle: () => void
}

function ExpandableCard({ phase, isExpanded, onToggle }: ExpandableCardProps) {
  const Icon = phase.icon

  return (
    <div
      className={`
        bg-white rounded-2xl shadow-md border-2
        transition-all duration-300
        ${isExpanded ? 'border-stone-400 shadow-xl' : 'border-transparent hover:border-stone-300 hover:shadow-lg'}
        ${phase.optional ? 'border-dashed' : ''}
      `}
    >
      {/* Header - Always Visible */}
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`${phase.id}-content`}
        className="w-full p-6 text-left focus:outline-none focus:ring-4 focus:ring-stone-400 focus:ring-offset-2 rounded-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div
              className={`
                p-3 rounded-xl flex-shrink-0
                ${phase.optional
                  ? 'bg-amber-50 text-amber-600'
                  : 'bg-stone-100 text-stone-700'
                }
              `}
            >
              <Icon className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`
                    px-2 py-0.5 rounded-full text-xs font-bold
                    ${phase.optional
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-stone-200 text-stone-700'
                    }
                  `}
                >
                  Phase {phase.number}
                </span>
                {phase.optional && (
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full">
                    Optional
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-1">
                {phase.title}
              </h3>
              <p className="text-sm text-stone-600">{phase.subtitle}</p>
              {phase.price && (
                <p className="text-xl font-bold text-stone-900 mt-2">{phase.price}</p>
              )}
            </div>
          </div>
          <ChevronDown
            className={`
              w-6 h-6 text-stone-400 flex-shrink-0 transition-transform duration-300
              ${isExpanded ? 'rotate-180' : ''}
            `}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`${phase.id}-content`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-stone-200">
              <ul className="space-y-3 mb-4" role="list">
                {phase.bullets.map((bullet, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="flex items-start gap-3 text-stone-700"
                  >
                    <ChevronRight className="w-5 h-5 text-stone-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm leading-relaxed">{bullet}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="pt-4 border-t border-stone-200">
                <p className="text-sm font-semibold text-stone-900">{phase.payment}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================================================
// Phase Modal (Mobile Detail View)
// ============================================================================

interface PhaseModalProps {
  phase: PhaseData
  onClose: () => void
}

function PhaseModal({ phase, onClose }: PhaseModalProps) {
  const Icon = phase.icon
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
      className="fixed inset-0 z-50 flex items-end justify-center lg:hidden bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${phase.id}-modal-title`}
    >
      <motion.div
        initial={shouldReduceMotion ? {} : { y: '100%' }}
        animate={{ y: 0 }}
        exit={shouldReduceMotion ? {} : { y: '100%' }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeOut' }}
        className="bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-stone-200 p-6 rounded-t-3xl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div
                className={`
                  p-3 rounded-xl
                  ${phase.optional
                    ? 'bg-amber-50 text-amber-600'
                    : 'bg-stone-100 text-stone-700'
                  }
                `}
              >
                <Icon className="w-7 h-7" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`
                      px-2 py-1 rounded-full text-xs font-bold
                      ${phase.optional
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-stone-200 text-stone-700'
                      }
                    `}
                  >
                    Phase {phase.number}
                  </span>
                  {phase.optional && (
                    <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full">
                      Optional
                    </span>
                  )}
                </div>
                <h3 id={`${phase.id}-modal-title`} className="text-xl font-bold text-stone-900 mb-1">
                  {phase.title}
                </h3>
                <p className="text-sm text-stone-600">{phase.subtitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close details"
              className="p-2 rounded-lg hover:bg-stone-100 focus:outline-none focus:ring-4 focus:ring-stone-400 transition-colors"
            >
              <X className="w-6 h-6 text-stone-600" />
            </button>
          </div>
          {phase.price && (
            <div className="mt-4">
              <p className="text-2xl font-bold text-stone-900">{phase.price}</p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <ul className="space-y-4 mb-6" role="list">
            {phase.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3 text-stone-700">
                <ChevronRight className="w-5 h-5 text-stone-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="pt-4 border-t border-stone-200">
            <p className="text-sm font-semibold text-stone-900">{phase.payment}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
