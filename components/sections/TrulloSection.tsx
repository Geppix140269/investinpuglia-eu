// components/sections/TrulloSection.tsx
'use client'

import { useState } from 'react'
import Icon from '@/lib/iconMappings'

export default function TrulloSection() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: 'SpeechBubble',
      title: 'Instant Answers',
      description: 'Get immediate responses about EU grants, investment processes, and property requirements in your preferred language.'
    },
    {
      icon: 'globe',
      title: '7 Languages',
      description: 'Trullo speaks English, Italian, Spanish, French, German, Arabic, and Chinese to serve our global investor community.'
    },
    {
      icon: 'mail',
      title: 'Lead Capture',
      description: 'Never miss an opportunity. Trullo collects visitor information and sends you detailed summaries of every conversation.'
    },
    {
      icon: 'Shield',
      title: '24/7 Availability',
      description: 'Your dedicated assistant is always ready to help, ensuring no investor question goes unanswered, day or night.'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-5 py-2 rounded-full text-sm font-semibold mb-6">
            <img src="/trullo.png" alt="Trullo" className="w-5 h-5 object-contain" />
            AI-POWERED ASSISTANT
          </div>
          <h2 className="text-4xl md:text-6xl font-light text-white mb-6">
            Meet <strong className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Trullo</strong>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Your intelligent investment advisor, available 24/7 to guide you through 
            every step of your Puglia property journey
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Trullo Visual */}
          <div className="relative">
            <div className="relative mx-auto max-w-md">
              {/* Glowing effect behind Trullo */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-50 animate-pulse"></div>
              
              {/* Trullo Image/Icon */}
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <img 
                  src="/trullo.png" 
                  alt="Trullo AI Assistant" 
                  className="w-48 h-48 mx-auto object-contain"
                />
                
                {/* Animated chat bubbles */}
                <div className="absolute -right-4 top-8 bg-white/20 backdrop-blur-lg rounded-2xl px-4 py-2 animate-bounce">
                  <p className="text-sm">Ciao! How can I help? 👋</p>
                </div>
                <div className="absolute -left-4 bottom-8 bg-white/20 backdrop-blur-lg rounded-2xl px-4 py-2 animate-bounce delay-300">
                  <p className="text-sm">¡Hola! ¿Cómo puedo ayudar? 🇪🇸</p>
                </div>
              </div>

              {/* Live indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-xs text-green-300">Online Now</span>
              </div>
            </div>
          </div>

          {/* Right: Features */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  activeFeature === index 
                    ? 'bg-white/20 border-white/40 scale-105' 
                    : 'bg-white/10 border-white/20 hover:bg-white/15'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Icon name={feature.icon} size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-white/80">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats/Capabilities */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold mb-2">10,000+</div>
            <div className="text-sm text-white/70">Questions Answered</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold mb-2">7</div>
            <div className="text-sm text-white/70">Languages Supported</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-sm text-white/70">Always Available</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold mb-2">&lt; 3s</div>
            <div className="text-sm text-white/70">Response Time</div>
          </div>
        </div>

        {/* What Trullo Can Do */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            What Can Trullo Help You With?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Euro" size={32} />
              </div>
              <h4 className="font-semibold mb-2">Grant Information</h4>
              <p className="text-sm text-white/70">
                Instant calculations and eligibility checks for Mini PIA and other EU grants
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="HouseArrowUP" size={32} />
              </div>
              <h4 className="font-semibold mb-2">Property Guidance</h4>
              <p className="text-sm text-white/70">
                Location insights, investment tips, and property type recommendations
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="document" size={32} />
              </div>
              <h4 className="font-semibold mb-2">Process Support</h4>
              <p className="text-sm text-white/70">
                Step-by-step guidance through permits, contracts, and legal requirements
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-xl mb-6 text-white/80">
            Experience the future of investment advisory
          </p>
          <button
            onClick={() => {
              // Trigger Trullo chat opening
              const trulloButton = document.querySelector('[data-trullo-trigger]') as HTMLElement
              if (trulloButton) trulloButton.click()
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3"
          >
            <span className="text-2xl">💬</span>
            Chat with Trullo Now
          </button>
          <p className="text-sm text-white/60 mt-4">
            No registration required • Instant responses • Your data is secure
          </p>
        </div>
      </div>
    </section>
  )
}
