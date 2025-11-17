'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, FileText, Building, Rocket } from 'lucide-react'

interface Phase {
  id: number
  title: string
  subtitle: string
  icon: typeof FileText
  bullets: string[]
}

const phases: Phase[] = [
  {
    id: 1,
    title: 'Phase 1',
    subtitle: 'Kick-Off & Strategic Setup',
    icon: FileText,
    bullets: [
      'Representation in initial dealings with property owners, real-estate agents, and local professionals',
      'Preliminary assessment of project eligibility for public funding (Mini PIA / PIA Turismo / ZES Unica)',
      'Definition of the investment model, business case, and preliminary financial outline',
      'Identification of the architect, engineer, accountant, and notary best suited to the case',
      'Delivery of a written summary and roadmap for the next phase'
    ]
  },
  {
    id: 2,
    title: 'Phase 2',
    subtitle: 'Project Structuring & Development Framework',
    icon: Building,
    bullets: [
      'Support in setting up or reorganising the Italian S.r.l. (company vehicle)',
      'Coordination of accredited accountant (grant submission) and engineer/architect (technical design)',
      'Preparation of business and investment plans required to obtain CUP (Codice Unico Progetto)',
      'Alignment with the selected bank and signing of a Preliminary Agreement defining timing, responsibilities, and financing path'
    ]
  },
  {
    id: 3,
    title: 'Phase 3',
    subtitle: 'Project Coordination & Delivery (Optional)',
    icon: Rocket,
    bullets: [
      'Liaison with accountant, bank, contractors, and suppliers during financing and implementation',
      'Oversight of works, budgets, and compliance with grant and regulatory requirements',
      'Representation in meetings and verification of progress, invoices, and deliverables',
      'Regular reporting and final validation of delivery'
    ]
  }
]

interface ThreePhaseFlowProps {
  initialPhase?: number
  onPhaseChange?: (phaseId: number) => void
}

export default function ThreePhaseFlow({ initialPhase = 1, onPhaseChange }: ThreePhaseFlowProps) {
  const [activePhase, setActivePhase] = useState(initialPhase)
  const shouldReduceMotion = useReducedMotion()

  const handlePhaseClick = (phaseId: number) => {
    setActivePhase(phaseId)
    onPhaseChange?.(phaseId)
  }

  const handleKeyDown = (e: React.KeyboardEvent, phaseId: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePhaseClick(phaseId)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      const nextPhase = phaseId < 3 ? phaseId + 1 : phaseId
      handlePhaseClick(nextPhase)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      const prevPhase = phaseId > 1 ? phaseId - 1 : phaseId
      handlePhaseClick(prevPhase)
    }
  }

  const activePhaseData = phases.find(p => p.id === activePhase)

  return (
    <div className="w-full">
      {/* Phase Stepper */}
      <div
        className="flex items-center justify-between mb-12 relative"
        role="tablist"
        aria-label="Project phases"
      >
        {/* Progress Bar Background */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 -z-10" />

        {/* Active Progress Bar */}
        <motion.div
          className="absolute top-8 left-0 h-1 bg-gradient-to-r from-[#4A90E2] to-[#34d399] -z-10"
          initial={shouldReduceMotion ? { width: '0%' } : { width: '0%' }}
          animate={{
            width: activePhase === 1 ? '0%' : activePhase === 2 ? '50%' : '100%'
          }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeInOut' }}
        />

        {phases.map((phase, index) => {
          const isActive = phase.id === activePhase
          const isCompleted = phase.id < activePhase
          const Icon = phase.icon

          return (
            <motion.button
              key={phase.id}
              onClick={() => handlePhaseClick(phase.id)}
              onKeyDown={(e) => handleKeyDown(e, phase.id)}
              className={`flex flex-col items-center gap-3 relative z-10 flex-1 transition-all ${
                isActive ? 'scale-100' : 'scale-95'
              }`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`phase-panel-${phase.id}`}
              id={`phase-tab-${phase.id}`}
              tabIndex={isActive ? 0 : -1}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : {
                delay: index * 0.1,
                duration: 0.3
              }}
            >
              {/* Circle with Icon */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-gradient-to-br from-[#4A90E2] to-[#34d399] shadow-lg scale-110'
                    : isCompleted
                    ? 'bg-gradient-to-br from-[#4A90E2] to-[#34d399]'
                    : 'bg-white border-2 border-gray-300'
                }`}
              >
                {isCompleted ? (
                  <Check className="h-8 w-8 text-white" />
                ) : (
                  <Icon className={`h-8 w-8 ${isActive || isCompleted ? 'text-white' : 'text-gray-400'}`} />
                )}
              </div>

              {/* Label */}
              <div className="text-center">
                <div className={`font-sans text-sm font-bold ${isActive ? 'text-[#4A90E2]' : 'text-gray-600'}`}>
                  {phase.title}
                </div>
                <div className="font-sans text-xs text-gray-500 max-w-[120px] mt-1 hidden md:block">
                  {phase.subtitle}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Active Phase Details */}
      {activePhaseData && (
        <motion.div
          key={activePhase}
          role="tabpanel"
          id={`phase-panel-${activePhase}`}
          aria-labelledby={`phase-tab-${activePhase}`}
          className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#4A90E2] to-[#34d399] rounded-lg flex items-center justify-center flex-shrink-0">
              <activePhaseData.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-1">
                {activePhaseData.subtitle}
              </h3>
              <p className="font-sans text-sm text-gray-600">
                {activePhaseData.title}
              </p>
            </div>
          </div>

          <ul className="space-y-3">
            {activePhaseData.bullets.map((bullet, idx) => (
              <motion.li
                key={idx}
                className="flex items-start gap-3"
                initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : {
                  delay: idx * 0.05,
                  duration: 0.2
                }}
              >
                <Check className="h-5 w-5 text-[#34d399] flex-shrink-0 mt-0.5" />
                <span className="font-sans text-sm text-gray-700 leading-relaxed">
                  {bullet}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  )
}
