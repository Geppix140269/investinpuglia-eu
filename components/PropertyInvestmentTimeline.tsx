// components/PropertyInvestmentTimeline.tsx
'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Icon from '@/lib/iconMappings';

const PropertyInvestmentTimeline = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showMiniPIA, setShowMiniPIA] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Standard property investment process
  const standardSteps = [
    {
      id: 1,
      title: "Initial Consultation",
      duration: "1-2 days",
      description: "Free assessment of your investment goals and property requirements",
      icon: "MessageCircle",
      critical: false,
      whyImportant: "",
      details: [
        "Discuss investment objectives",
        "Review budget and financing",
        "Identify target locations",
        "Explain Italian property law"
      ]
    },
    {
      id: 2,
      title: "Fiscal Code (Codice Fiscale)",
      duration: "2-3 days",
      description: "Essential Italian tax identification number - gateway to all transactions",
      icon: "UserCheck",
      critical: true,
      whyImportant: "Without a Codice Fiscale, you cannot: open bank accounts, sign contracts, purchase property, or conduct any official business in Italy. We handle the entire application process remotely.",
      details: [
        "Required for ALL property transactions",
        "Needed before opening bank accounts",
        "We obtain it without you traveling to Italy",
        "Valid for lifetime"
      ]
    },
    {
      id: 3,
      title: "Italian Bank Account",
      duration: "5-7 days",
      description: "Open Italian bank account for seamless transactions and lower fees",
      icon: "Building",
      critical: true,
      whyImportant: "Italian banks are required for: property purchases, utility payments, tax payments, and receiving rental income. International transfers for property are complex - we simplify this process.",
      details: [
        "Required by notaries for property purchase",
        "Avoid high international transfer fees",
        "Needed for utility connections",
        "We assist with remote opening procedures"
      ]
    },
    {
      id: 4,
      title: "Property Search & Selection",
      duration: "2-4 weeks",
      description: "Curated property options matching your criteria",
      icon: "Search",
      critical: false,
      whyImportant: "",
      details: [
        "Access off-market properties",
        "Virtual tours available",
        "Detailed investment analysis",
        "ROI projections"
      ]
    },
    {
      id: 5,
      title: "Due Diligence Survey",
      duration: "7-10 days",
      description: "Comprehensive legal, technical, and financial verification",
      icon: "ClipboardList",
      critical: false,
      whyImportant: "",
      details: [
        "Title deed verification",
        "Urban planning compliance",
        "Structural assessment",
        "Market value appraisal"
      ]
    },
    {
      id: 6,
      title: "Price Negotiation",
      duration: "3-5 days",
      description: "Expert negotiation to secure best terms",
      icon: "Euro",
      critical: false,
      whyImportant: "",
      details: [
        "Market analysis",
        "Negotiation strategy",
        "Terms optimization",
        "Deposit arrangement"
      ]
    },
    {
      id: 7,
      title: "Preliminary Contract",
      duration: "1-2 days",
      description: "Compromesso - binding agreement with deposit",
      icon: "FileText",
      critical: false,
      whyImportant: "",
      details: [
        "Contract review",
        "Deposit payment (10-30%)",
        "Terms finalization",
        "Timeline agreement"
      ]
    },
    {
      id: 8,
      title: "Final Deed (Rogito)",
      duration: "1 day",
      description: "Official property transfer at notary",
      icon: "Building2",
      critical: false,
      whyImportant: "",
      details: [
        "Notary appointment",
        "Final payment",
        "Property registration",
        "Key handover"
      ]
    },
    {
      id: 9,
      title: "Post-Purchase Support",
      duration: "Ongoing",
      description: "Utilities, renovations, and property management",
      icon: "Wrench",
      critical: false,
      whyImportant: "",
      details: [
        "Utility connections",
        "Renovation planning",
        "Property management",
        "Rental assistance"
      ]
    }
  ];

  // Mini PIA grant process (branches off after step 5)
  const miniPIASteps = [
    {
      id: 'mp1',
      title: "Grant Eligibility Check",
      duration: "2-3 days",
      description: "Verify property qualifies for Mini PIA funding",
      icon: "Check",
      critical: false,
      whyImportant: "",
      details: [
        "Location verification",
        "Investment size check",
        "Business plan outline",
        "Funding calculation"
      ]
    },
    {
      id: 'mp2',
      title: "Business Plan Development",
      duration: "2-3 weeks",
      description: "Comprehensive investment plan for grant application",
      icon: "BarChart3",
      critical: false,
      whyImportant: "",
      details: [
        "5-year financial projections",
        "Job creation targets",
        "Innovation elements",
        "Sustainability measures"
      ]
    },
    {
      id: 'mp3',
      title: "Technical Documentation",
      duration: "2 weeks",
      description: "Gather all required technical and legal documents",
      icon: "FolderOpen",
      critical: false,
      whyImportant: "",
      details: [
        "Architectural plans",
        "Engineering reports",
        "Environmental compliance",
        "Financial statements"
      ]
    },
    {
      id: 'mp4',
      title: "Grant Application",
      duration: "1 week",
      description: "Submit complete application to regional authorities",
      icon: "Upload",
      critical: true,
      whyImportant: "Application deadlines are strict and missing documents can result in automatic rejection. We ensure 100% compliance with all requirements.",
      details: [
        "Digital submission",
        "Document verification",
        "Tracking number",
        "Confirmation receipt"
      ]
    },
    {
      id: 'mp5',
      title: "Evaluation Period",
      duration: "8-12 weeks",
      description: "Regional committee reviews and scores application",
      icon: "Clock",
      critical: false,
      whyImportant: "",
      details: [
        "Technical evaluation",
        "Financial assessment",
        "Innovation scoring",
        "Ranking process"
      ]
    },
    {
      id: 'mp6',
      title: "Grant Approval",
      duration: "1-2 weeks",
      description: "Receive official approval and funding agreement",
      icon: "Award",
      critical: false,
      whyImportant: "",
      details: [
        "Approval notification",
        "Grant agreement",
        "Funding timeline",
        "Compliance requirements"
      ]
    },
    {
      id: 'mp7',
      title: "Property Purchase",
      duration: "2-4 weeks",
      description: "Complete property acquisition with grant funding secured",
      icon: "Home",
      critical: false,
      whyImportant: "",
      details: [
        "Purchase completion",
        "Grant integration",
        "Fund disbursement",
        "Project initiation"
      ]
    }
  ];

  // Handle step progression
  useEffect(() => {
    const timer = setInterval(() => {
      const maxSteps = showMiniPIA ? miniPIASteps.length : standardSteps.length;
      setActiveStep((prev) => (prev + 1) % maxSteps);
    }, 5000);
    return () => clearInterval(timer);
  }, [showMiniPIA]);

  const currentSteps = showMiniPIA ? miniPIASteps : standardSteps;
  const currentStep = currentSteps[activeStep];

  // Mobile Timeline Component
  const MobileTimeline = () => (
    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md mx-auto">
      {/* Header */}
      <h3 className="text-2xl font-bold mb-4 text-center">Investment Timeline</h3>
      
      {/* Path Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setShowMiniPIA(false)}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
            !showMiniPIA 
              ? 'bg-emerald-600 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Standard
        </button>
        <button
          onClick={() => setShowMiniPIA(true)}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
            showMiniPIA 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          With Grant
        </button>
      </div>

      {/* Current Step */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
            <Icon name={currentStep.icon} size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold">{currentStep.title}</h4>
            <p className="text-sm text-gray-600">{currentStep.duration}</p>
          </div>
        </div>
        <p className="text-sm text-gray-700">{currentStep.description}</p>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mb-6">
        {currentSteps.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeStep ? 'bg-emerald-600 w-6' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6 text-center">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600">Timeline</p>
          <p className={`font-bold ${showMiniPIA ? 'text-purple-600' : 'text-emerald-600'}`}>
            {showMiniPIA ? '4-6 mo' : '6-10 wk'}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600">Support</p>
          <p className={`font-bold ${showMiniPIA ? 'text-purple-600' : 'text-emerald-600'}`}>
            {showMiniPIA ? '€2.25M' : 'Full'}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600">Success</p>
          <p className={`font-bold ${showMiniPIA ? 'text-purple-600' : 'text-emerald-600'}`}>
            100%
          </p>
        </div>
      </div>

      {/* CTA */}
      <button className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-full text-sm">
        Schedule Free Consultation →
      </button>
    </div>
  );

  // Desktop Timeline Component (your original design)
  const DesktopTimeline = () => (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-3xl shadow-2xl max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Your Property Investment Journey in Italy
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Navigate the complete process with confidence - from initial consultation to property ownership
        </p>
        
        {/* Path Toggle */}
        <div className="inline-flex bg-white rounded-full shadow-lg p-1 mb-8">
          <button
            onClick={() => setShowMiniPIA(false)}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              !showMiniPIA 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Standard Purchase
          </button>
          <button
            onClick={() => setShowMiniPIA(true)}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              showMiniPIA 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            With Mini PIA Grant
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative mb-12">
        {/* Progress Bar */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 rounded-full">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${
              showMiniPIA ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'bg-gradient-to-r from-emerald-600 to-teal-600'
            }`}
            style={{ width: `${((activeStep + 1) / currentSteps.length) * 100}%` }}
          />
        </div>

        {/* Step Circles */}
        <div className="relative flex justify-between">
          {currentSteps.map((step, index) => {
            const isActive = index === activeStep;
            const isPast = index < activeStep;
            const isCritical = 'critical' in step ? step.critical : false;
            
            return (
              <div 
                key={step.id} 
                className="relative z-10 cursor-pointer"
                onClick={() => setActiveStep(index)}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isActive 
                      ? showMiniPIA 
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-xl scale-125' 
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-xl scale-125'
                      : isPast
                        ? 'bg-gray-400'
                        : 'bg-white border-2 border-gray-300'
                  } ${isCritical && isActive ? 'ring-4 ring-red-200' : ''}`}
                >
                  <Icon 
                    name={step.icon} 
                    size={isActive ? 32 : 24} 
                    className={isActive || isPast ? 'text-white' : 'text-gray-400'}
                  />
                </div>
                <p className={`text-center mt-2 text-xs font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                  Step {index + 1}
                </p>
                <p className={`text-xs mt-1 max-w-[100px] ${index === activeStep ? 'text-gray-700' : 'text-gray-400'}`}>
                  {step.title}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Current Step Details */}
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <div className="flex items-start gap-6">
          <div className={`p-4 rounded-2xl ${showMiniPIA ? 'bg-purple-100' : 'bg-emerald-100'} ${currentStep.critical ? 'animate-pulse' : ''}`}>
            <Icon 
              name={currentStep.icon} 
              size={48} 
              className={showMiniPIA ? 'text-purple-600' : 'text-emerald-600'}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-2xl font-bold">{currentStep.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                showMiniPIA ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {currentStep.duration}
              </span>
              {currentStep.critical && (
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Critical Step
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mb-4">{currentStep.description}</p>
            
            {currentStep.whyImportant && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Why This Is Critical
                </h4>
                <p className="text-amber-800 text-sm">{currentStep.whyImportant}</p>
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-3">
              {currentStep.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-sm text-gray-700">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Summary */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 text-center">
          <h4 className="font-bold text-lg mb-2">Total Timeline</h4>
          <p className={`text-3xl font-bold ${showMiniPIA ? 'text-purple-600' : 'text-emerald-600'}`}>
            {showMiniPIA ? '4-6 months' : '6-10 weeks'}
          </p>
          <p className="text-sm text-gray-600 mt-1">from start to ownership</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 text-center">
          <h4 className="font-bold text-lg mb-2">Investment Support</h4>
          <p className={`text-3xl font-bold ${showMiniPIA ? 'text-purple-600' : 'text-emerald-600'}`}>
            {showMiniPIA ? 'Up to €2.25M' : 'Full Service'}
          </p>
          <p className="text-sm text-gray-600 mt-1">{showMiniPIA ? 'in grants available' : 'end-to-end support'}</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 text-center">
          <h4 className="font-bold text-lg mb-2">Success Rate</h4>
          <p className={`text-3xl font-bold ${showMiniPIA ? 'text-purple-600' : 'text-emerald-600'}`}>
            100%
          </p>
          <p className="text-sm text-gray-600 mt-1">client satisfaction</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">
          Ready to start your property investment journey in Italy?
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-full hover:shadow-xl transform hover:-translate-y-1 transition-all">
          Schedule Free Consultation →
        </button>
      </div>
    </div>
  );

  // Render based on screen size
  return isMobile ? <MobileTimeline /> : <DesktopTimeline />;
};

export default PropertyInvestmentTimeline;
