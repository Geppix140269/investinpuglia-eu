'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Building2,
  TrendingUp,
  Shield,
  Users,
  MapPin,
  Award,
  ArrowRight,
  Check,
  Sparkles,
  ChevronDown,
  Euro,
  Calculator,
  FileText,
  Briefcase
} from 'lucide-react'

export default function ModernLandingPage() {
  const { scrollYProgress } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%'])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Dynamic Background Effects */}
      <DynamicBackground mousePosition={mousePosition} />

      {/* Hero Section */}
      <HeroSection textY={textY} />

      {/* Stats Section with Glassmorphism */}
      <StatsSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Investment Opportunities */}
      <OpportunitiesSection />

      {/* Why Puglia */}
      <WhyPugliaSection />

      {/* Advisory Process */}
      <AdvisorySection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}

// Dynamic Animated Background
function DynamicBackground({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Gradient Orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl"
        animate={{
          x: mousePosition.x / 20,
          y: mousePosition.y / 20,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ top: '10%', left: '10%' }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl"
        animate={{
          x: -mousePosition.x / 30,
          y: -mousePosition.y / 30,
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ bottom: '10%', right: '10%' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-emerald-500/25 to-green-500/25 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ top: '50%', left: '50%' }}
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  )
}

// Hero Section
function HeroSection({ textY }: { textY: any }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center relative z-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white mb-8"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">Premium Investment Advisory</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            style={{ y: textY }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight"
          >
            Invest in Puglia's
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text">
              Golden Future
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Unlock <span className="text-emerald-400 font-semibold">€2.75M+</span> in EU grants
            with our expert advisory. From property acquisition to project delivery.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/consultation"
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white font-semibold overflow-hidden hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              href="/portfolio"
              className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-semibold hover:bg-white/20 transition-all duration-300"
            >
              View Portfolio
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-white/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Stats Section with Glassmorphism
function StatsSection() {
  const stats = [
    { label: 'Investment Volume', value: '€50M+', icon: Euro },
    { label: 'Success Rate', value: '95%', icon: TrendingUp },
    { label: 'Active Projects', value: '40+', icon: Building2 },
    { label: 'Happy Clients', value: '120+', icon: Users },
  ]

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {/* Glassmorphism Card */}
              <div className="relative p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                <stat.icon className="w-8 h-8 text-purple-400 mb-4" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">
                  {stat.label}
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Services Section
function ServicesSection() {
  const services = [
    {
      icon: Briefcase,
      title: 'Strategic Engagement',
      description: 'Expert representation with property owners and local professionals',
      features: ['Eligibility Assessment', 'Partner Selection', 'Due Diligence'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: FileText,
      title: 'Project Structuring',
      description: 'Complete legal and financial setup for your investment',
      features: ['Company Setup', 'Grant Coordination', 'Bank Relations'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Project Delivery',
      description: 'Ongoing oversight and compliance management',
      features: ['Contractor Liaison', 'Progress Monitoring', 'Final Compliance'],
      gradient: 'from-emerald-500 to-green-500'
    },
  ]

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            End-to-end investment advisory tailored to your success
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-500 h-full">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} p-4 mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-white/70 mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-white/80">
                      <Check className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover Glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Opportunities Section
function OpportunitiesSection() {
  const opportunities = [
    {
      title: 'Luxury Resort Salento',
      location: 'Lecce, Puglia',
      investment: '€2.5M',
      grant: '€1.2M',
      gradient: 'from-purple-600 via-pink-500 to-orange-400',
      type: 'Tourism'
    },
    {
      title: 'Boutique Hotel Marina',
      location: 'Monopoli',
      investment: '€1.8M',
      grant: '€900K',
      gradient: 'from-blue-600 via-cyan-500 to-teal-400',
      type: 'Hospitality'
    },
    {
      title: 'Vineyard Estate',
      location: 'Valle d\'Itria',
      investment: '€3.2M',
      grant: '€1.5M',
      gradient: 'from-emerald-600 via-green-500 to-lime-400',
      type: 'Agriculture'
    },
  ]

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Featured <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Opportunities</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Exclusive investment opportunities with EU grant potential
          </p>
        </motion.div>

        {/* Opportunities Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {opportunities.map((opp, index) => (
            <motion.div
              key={opp.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl"
            >
              {/* Gradient Background */}
              <div className="relative h-96 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${opp.gradient} group-hover:scale-110 transition-transform duration-700`} />

                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px'
                }} />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-block px-3 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full text-xs text-white mb-3">
                  {opp.type}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {opp.title}
                </h3>
                <div className="flex items-center gap-2 text-white/80 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{opp.location}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-white/60">Investment</div>
                    <div className="text-lg font-bold text-white">{opp.investment}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60">EU Grant</div>
                    <div className="text-lg font-bold text-emerald-400">{opp.grant}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Why Puglia Section
function WhyPugliaSection() {
  const benefits = [
    { icon: Euro, title: 'EU Grants', description: 'Up to €2.75M in non-refundable grants' },
    { icon: TrendingUp, title: 'High ROI', description: 'Average 12-15% annual returns' },
    { icon: Shield, title: 'Tax Benefits', description: 'Favorable tax regime for investors' },
    { icon: Award, title: 'Quality of Life', description: 'Mediterranean lifestyle & culture' },
  ]

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Why <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Puglia?</span>
            </h2>
            <p className="text-xl text-white/70 mb-10">
              Italy's fastest-growing investment destination with unmatched incentives
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden h-96">
              {/* Beautiful Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400" />

              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '30px 30px'
              }} />

              {/* Floating Shapes */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/10 backdrop-blur-xl"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl"
              />

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-white">€50M+</div>
                    <div className="text-sm text-white/70">Total Investments</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-emerald-400">95%</div>
                    <div className="text-sm text-white/70">Success Rate</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Advisory Section
function AdvisorySection() {
  const phases = [
    { number: 1, title: 'Discovery', description: 'Understand your goals and opportunities' },
    { number: 2, title: 'Structuring', description: 'Legal setup and grant coordination' },
    { number: 3, title: 'Delivery', description: 'Project execution and compliance' },
  ]

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black/20">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Process</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            A proven 3-phase approach to investment success
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">
                  {phase.number}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {phase.title}
                </h3>
                <p className="text-white/70">
                  {phase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Marco R.',
      role: 'Hotel Owner',
      content: 'Giuseppe helped us secure €1.2M in grants for our boutique hotel renovation. Professional and reliable.',
      rating: 5
    },
    {
      name: 'Sarah M.',
      role: 'Real Estate Investor',
      content: 'The advisory team made the complex grant process simple. Highly recommend for anyone investing in Puglia.',
      rating: 5
    },
    {
      name: 'Giovanni L.',
      role: 'Agriturismo Developer',
      content: 'From property selection to grant approval, InvestInPuglia guided us every step of the way.',
      rating: 5
    },
  ]

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Client <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Success</span>
          </h2>
          <p className="text-xl text-white/70">
            Hear from our satisfied investors
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Award key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-white/80 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-sm text-white/60">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }} />
          </div>

          {/* Content */}
          <div className="relative text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Schedule a free consultation and discover how we can help you unlock Puglia's investment potential.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/consultation"
                className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-semibold hover:bg-white/90 transition-all hover:scale-105"
              >
                Book Free Consultation
              </Link>
              <Link
                href="/property-calculator"
                className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl font-semibold hover:bg-white/20 transition-all"
              >
                Calculate Your Returns
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-10 w-20 h-20 border-2 border-white/20 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 left-10 w-16 h-16 border-2 border-white/20 rounded-full"
          />
        </motion.div>
      </div>
    </section>
  )
}
