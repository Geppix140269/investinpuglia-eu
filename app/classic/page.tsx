'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { CalculatorConfigService } from '@/lib/services/calculatorConfigService'

// Extend Window interface for our custom functions
declare global {
  interface Window {
    showRegistrationModal: () => void;
    closeModal: () => void;
    handleRegistration: (event: any) => Promise<false>;
    sendWhatsAppDirect: () => void;
    supabase: any;
    emailjs: any;
    jspdf: any;
  }
}

export default function ClassicPage() {
  // Add state for dynamic config
  const [dynamicConfig, setDynamicConfig] = useState<any>(null)
  
  useEffect(() => {
    // Check access on mount
    const accessToken = localStorage.getItem('investiscope_access_token')
    const userEmail = localStorage.getItem('investiscope_user_email')
    
    if (!accessToken || !userEmail) {
      window.location.href = '/classic/register'
    }
    
    // Load dynamic configuration (but don't break if it fails)
    CalculatorConfigService.getActiveConfig()
      .then(config => {
        if (config) {
          console.log('Loaded dynamic config from Sanity')
          setDynamicConfig(config)
        }
      })
      .catch(err => {
        console.log('Using default config values')
      })
  }, [])

  // Use dynamic values or fallback to defaults
  const getConfigValue = (path: string, defaultValue: any) => {
    if (!dynamicConfig) return defaultValue
    
    try {
      const keys = path.split('.')
      let value = dynamicConfig
      for (const key of keys) {
        value = value[key]
      }
      return value !== undefined ? value : defaultValue
    } catch {
      return defaultValue
    }
  }

  return (
    <>
      {/* Load required libraries - EXACTLY AS BEFORE */}
      <Script 
        src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" 
        strategy="lazyOnload"
      />
      <Script 
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
        strategy="beforeInteractive"
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
        strategy="beforeInteractive"
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"
        strategy="lazyOnload"
      />

      <div className="classic-app-container">
        {/* ALL YOUR STYLES - EXACTLY AS BEFORE */}
        <style jsx global>{`
          /* Classic App Styles */
          .classic-app-container {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #0a0a0a;
            color: #ffffff;
            min-height: 100vh;
            overflow-x: hidden;
            padding-top: 0;
          }
          
          .gradient-bg {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #1a1f3a 0%, #2d1b3d 25%, #0f3a2a 75%, #0a2a1f 100%);
            background-size: 400% 400%;
            animation: gradientShift 20s ease infinite;
            z-index: -2;
          }
          
          .gradient-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at top right, rgba(102, 126, 234, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at bottom left, rgba(5, 150, 105, 0.05) 0%, transparent 50%);
            z-index: -1;
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .main-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
            position: relative;
            z-index: 1;
          }
          
          .premium-header {
            text-align: center;
            padding: 60px 20px 40px;
            position: relative;
          }
          
          .logo-badge {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            padding: 8px 24px;
            border-radius: 50px;
            font-size: 0.875rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            margin-bottom: 24px;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
            color: #ffffff;
          }
          
          .main-title {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 300;
            letter-spacing: -2px;
            margin-bottom: 16px;
            color: #ffffff;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          }
          
          .main-title strong {
            font-weight: 700;
          }
          
          .subtitle {
            font-size: 1.25rem;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 300;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          }
          
          .glass-card {
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-radius: 24px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 32px;
            margin-bottom: 24px;
            transition: all 0.3s ease;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          }
          
          .glass-card:hover {
            background: rgba(0, 0, 0, 0.4);
            border-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
          }
          
          .section-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 32px;
          }
          
          .section-icon {
            font-size: 2rem;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
          }
          
          .section-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #ffffff;
            letter-spacing: -0.5px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          }
          
          .slider-item {
            margin-bottom: 28px;
          }
          
          .slider-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          }
          
          .slider-label {
            font-size: 1rem;
            font-weight: 500;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .slider-value-display {
            font-size: 1.25rem;
            font-weight: 700;
            color: #60a5fa;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          }
          
          .slider-wrapper {
            position: relative;
            padding: 8px 0;
          }
          
          .modern-slider {
            width: 100%;
            height: 6px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
            outline: none;
            -webkit-appearance: none;
            appearance: none;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .modern-slider:hover {
            background: rgba(255, 255, 255, 0.3);
          }
          
          .modern-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(96, 165, 250, 0.6);
            border: 2px solid #ffffff;
          }
          
          .modern-slider::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 6px 20px rgba(96, 165, 250, 0.8);
          }
          
          .modern-slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid #ffffff;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(96, 165, 250, 0.6);
          }
          
          .slider-hint {
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.8);
            margin-top: 8px;
            font-style: italic;
          }
          
          .total-card {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%);
            border: 2px solid rgba(59, 130, 246, 0.3);
            border-radius: 16px;
            padding: 24px;
            margin: 24px 0;
            text-align: center;
            box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2);
          }
          
          .total-label {
            font-size: 1rem;
            color: #ffffff;
            margin-bottom: 8px;
            font-weight: 600;
          }
          
          .total-value {
            font-size: 2.5rem;
            font-weight: 700;
            color: #60a5fa;
            text-shadow: 0 2px 8px rgba(96, 165, 250, 0.5);
          }
          
          .component-explanation {
            background: rgba(224, 231, 255, 0.1);
            border: 1px solid rgba(165, 180, 252, 0.3);
            padding: 12px;
            border-radius: 8px;
            margin-top: 8px;
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.9);
          }
          
          .info-box {
            background: rgba(248, 250, 252, 0.1);
            border-left: 4px solid #3b82f6;
            padding: 16px;
            border-radius: 8px;
            margin: 20px 0;
            font-size: 0.875rem;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.9);
          }
          
          .percentage-suggestion {
            font-size: 0.8125rem;
            color: #10b981;
            font-style: italic;
            margin-top: 4px;
          }
          
          .calculation-note {
            background: rgba(254, 243, 199, 0.1);
            border: 1px solid rgba(251, 191, 36, 0.3);
            padding: 12px;
            border-radius: 8px;
            margin-top: 8px;
            font-size: 0.8125rem;
            color: rgba(255, 255, 255, 0.8);
          }
          
          .grant-info-box {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);
            border: 2px solid rgba(16, 185, 129, 0.3);
            padding: 20px;
            border-radius: 12px;
            margin: 20px 0;
            text-align: center;
          }
          
          .grant-info-text {
            font-size: 1rem;
            color: #10b981;
            font-weight: 600;
          }
          
          .non-eligible-section {
            margin-top: 40px;
            padding-top: 30px;
            border-top: 2px dashed rgba(239, 68, 68, 0.3);
          }
          
          .non-eligible-header {
            background: rgba(254, 242, 242, 0.1);
            border: 1px solid rgba(254, 202, 202, 0.3);
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 24px;
            text-align: center;
            color: #fca5a5;
            font-size: 1.125rem;
            font-weight: 600;
          }
          
          .enhancement-section {
            background: rgba(30, 41, 59, 0.5);
            border: 1px solid rgba(51, 65, 85, 0.5);
            border-radius: 16px;
            padding: 28px;
            margin-bottom: 24px;
            backdrop-filter: blur(10px);
          }
          
          .enhancement-section h3 {
            margin: 0 0 24px 0;
            color: #f1f5f9;
            font-size: 1.25rem;
            font-weight: 600;
          }
          
          .cost-grid {
            display: grid;
            gap: 16px;
            margin-bottom: 24px;
          }
          
          .cost-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid rgba(51, 65, 85, 0.5);
          }
          
          .cost-item label {
            display: flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;
            color: #cbd5e1;
            font-size: 0.95rem;
          }
          
          .cost-item input[type="checkbox"] {
            width: 18px;
            height: 18px;
            cursor: pointer;
          }
          
          .cost-value {
            font-weight: 600;
            color: #10b981;
            font-size: 1.125rem;
          }
          
          .cost-total {
            padding: 20px;
            background: rgba(15, 23, 42, 0.5);
            border-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 1.125rem;
            margin-top: 20px;
          }
          
          .cost-total strong {
            color: #f1f5f9;
          }
          
          .cost-total span {
            font-weight: 700;
            color: #ef4444;
            font-size: 1.5rem;
          }
          
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(10px);
            display: none;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
            overflow-y: auto;
            padding: 20px;
          }
          
          .modal-content {
            position: relative;
            margin: 20px auto;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 48px;
            max-width: 600px;
            width: 100%;
            animation: slideUp 0.4s ease;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideUp {
            from { 
              opacity: 0;
              transform: translateY(40px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .modal-header {
            text-align: center;
            margin-bottom: 32px;
          }
          
          .modal-title {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 12px;
            color: #ffffff;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          }
          
          .modal-subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 1.125rem;
          }
          
          .preview-stats {
            background: linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 32px;
            border: 1px solid rgba(96, 165, 250, 0.3);
          }
          
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-top: 20px;
          }
          
          .stat-item {
            text-align: center;
          }
          
          .stat-label {
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 4px;
          }
          
          .stat-value {
            font-size: 1.5rem;
            font-weight: 700;
            color: #10b981;
            text-shadow: 0 2px 4px rgba(16, 185, 129, 0.4);
          }
          
          .form-group {
            margin-bottom: 20px;
          }
          
          .form-label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.9);
          }
          
          .form-input {
            width: 100%;
            padding: 16px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 12px;
            color: white;
            font-size: 1rem;
            transition: all 0.3s ease;
          }
          
          .form-input:focus {
            outline: none;
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(96, 165, 250, 0.5);
          }
          
          .form-input::placeholder {
            color: rgba(255, 255, 255, 0.6);
          }
          
          .form-select {
            width: 100%;
            padding: 16px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 12px;
            color: white;
            font-size: 1rem;
            cursor: pointer;
          }
          
          .form-select option {
            background: #1e293b;
            color: white;
          }
          
          .submit-button {
            width: 100%;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 16px;
            border: none;
            border-radius: 12px;
            font-size: 1.125rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
          }
          
          .submit-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
          }
          
          .whatsapp-button {
            width: 100%;
            background: #25D366;
            color: white;
            padding: 16px;
            border: none;
            border-radius: 12px;
            font-size: 1.125rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            transition: all 0.3s ease;
            text-decoration: none;
            margin-top: 12px;
          }
          
          .whatsapp-button:hover {
            transform: translateY(-2px);
            background: #1fb855;
          }
          
          .privacy-note {
            text-align: center;
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.8);
            margin-top: 24px;
            line-height: 1.5;
          }
          
          .success-toast {
            position: fixed;
            top: 32px;
            right: 32px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 20px 32px;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
            display: none;
            animation: slideInRight 0.3s ease;
            z-index: 2000;
          }
          
          .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.8);
            font-size: 28px;
            cursor: pointer;
            padding: 10px;
            transition: all 0.3s ease;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
          }
          
          .modal-close:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            transform: rotate(90deg);
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .report-cta-section {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);
            border-radius: 24px;
            padding: 48px;
            text-align: center;
            margin-top: 60px;
            border: 2px solid rgba(16, 185, 129, 0.3);
            box-shadow: 0 8px 32px rgba(16, 185, 129, 0.1);
          }
          
          .report-cta-title {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 16px;
            color: #ffffff;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          }
          
          .report-cta-subtitle {
            font-size: 1.125rem;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 32px;
          }
          
          .cta-button {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 16px 40px;
            border: none;
            border-radius: 50px;
            font-size: 1.125rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
            display: inline-block;
            text-decoration: none;
          }
          
          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
          }
          
          .footer {
            text-align: center;
            color: rgba(255, 255, 255, 0.8);
            margin-top: 60px;
            padding: 40px 20px;
            font-size: 0.875rem;
          }
          
          @media (max-width: 768px) {
            .main-container {
              padding: 10px;
            }
            
            .premium-header {
              padding: 40px 20px 30px;
            }
            
            .glass-card {
              padding: 24px;
            }
            
            .stats-grid {
              grid-template-columns: 1fr;
            }
            
            .modal-content {
              padding: 32px 24px;
              margin: 10px auto;
            }
          }
        `}</style>

        <div className="gradient-bg"></div>
        <div className="gradient-overlay"></div>
        
        <div className="main-container">
          {/* Success Toast */}
          <div className="success-toast" id="successToast">
            ✅ PDF Report Generated! Check your downloads.
          </div>
          
          {/* Premium Header */}
          <header className="premium-header">
            <div className="logo-badge">AI-POWERED INVESTMENT ANALYSIS</div>
            <h1 className="main-title">InvestiScope<strong>™</strong> Classic</h1>
            <p className="subtitle">Advanced calculator for Mini PIA Turismo grants with detailed financial projections and ROI analysis</p>
          </header>
          
          {/* Project Costs Section */}
          <section className="glass-card">
            <div className="section-header">
              <span className="section-icon">📋</span>
              <h2 className="section-title">Mini PIA Turismo - Eligible Costs</h2>
            </div>
            
            {/* Property Purchase - WITH DYNAMIC CONFIG */}
            <div className="slider-item">
              <div className="slider-header">
                <span className="slider-label">🏠 Property Purchase</span>
                <span className="slider-value-display" id="propertyPurchaseValue">€800,000</span>
              </div>
              <div className="slider-wrapper">
                <input type="range" className="modern-slider" id="propertyPurchaseInput" 
                       min={getConfigValue('parameters.propertyValue.min', 100000)} 
                       max={getConfigValue('parameters.propertyValue.max', 3000000)} 
                       defaultValue="800000" 
                       step={getConfigValue('parameters.propertyValue.step', 10000)} />
              </div>
              <p className="slider-hint">Building acquisition (100% eligible)</p>
            </div>
            
            {/* Restructuring & Renovations - WITH DYNAMIC CONFIG */}
            <div className="slider-item">
              <div className="slider-header">
                <span className="slider-label">🔧 Restructuring & Renovations</span>
                <span className="slider-value-display" id="restructuringValue">€400,000</span>
              </div>
              <div className="slider-wrapper">
                <input type="range" className="modern-slider" id="restructuringInput" 
                       min={getConfigValue('parameters.renovationBudget.min', 50000)} 
                       max={getConfigValue('parameters.renovationBudget.max', 2000000)} 
                       defaultValue="400000" 
                       step={getConfigValue('parameters.renovationBudget.step', 10000)} />
              </div>
              <p className="slider-hint">Construction and building improvements (100% eligible)</p>
            </div>
            
            {/* ALL OTHER SLIDERS AND CONTENT - EXACTLY AS BEFORE */}
            {/* Fixtures & Fittings */}
            <div className="slider-item">
              <div className="slider-header">
                <span className="slider-label">🪑 Fixtures & Fittings</span>
                <span className="slider-value-display" id="fixturesValue">€150,000</span>
              </div>
              <div className="slider-wrapper">
                <input type="range" className="modern-slider" id="fixturesInput" 
                       min="10000" max="1000000" defaultValue="150000" step="5000" />
              </div>
              <p className="slider-hint">Equipment, furniture, and fittings for the property</p>
              <p className="percentage-suggestion" id="fixturesSuggestion">Suggested: 12.5% of civil works (€150,000)</p>
            </div>
            
            {/* Innovation Component */}
            <div className="slider-item">
              <div className="slider-header">
                <span className="slider-label">💡 Innovation Component</span>
                <span className="slider-value-display" id="innovationValue">€40,000</span>
              </div>
              <div className="slider-wrapper">
                <input type="range" className="modern-slider" id="innovationInput" 
                       min="0" max="500000" defaultValue="40000" step="1000" />
              </div>
              <p className="slider-hint">Technology and digital systems</p>
              <div className="component-explanation">
                Includes: Smart home systems, booking platforms, digital guest services, IoT devices, automated check-in systems
              </div>
              <p className="percentage-suggestion" id="innovationSuggestion">Suggested: 3-4% of civil works (€42,000)</p>
            </div>
            
            {/* Environmental Protection */}
            <div className="slider-item">
              <div className="slider-header">
                <span className="slider-label">🌱 Environmental Protection</span>
                <span className="slider-value-display" id="environmentalValue">€35,000</span>
              </div>
              <div className="slider-wrapper">
                <input type="range" className="modern-slider" id="environmentalInput" 
                       min="0" max="500000" defaultValue="35000" step="1000" />
              </div>
              <p className="slider-hint">Energy efficiency and sustainability measures</p>
              <div className="component-explanation">
                Includes: Solar panels, heat pumps, insulation upgrades, LED lighting, water recycling systems, green roofs
              </div>
              <p className="percentage-suggestion" id="environmentalSuggestion">Suggested: 2-3% of civil works (€30,000)</p>
            </div>
            
            {/* Integrated Components Info */}
            <div className="info-box">
              <strong>📊 Integrated Project Components Check</strong><br />
              Innovation + Environmental = <span id="integratedTotal">€75,000</span> 
              (<span id="integratedPercent">5.1%</span> of eligible costs)<br />
              <span id="integratedStatus" style={{ color: '#059669' }}>✓ Meets minimum 5% requirement</span>
            </div>
            
            {/* Design & Project Management */}
            <div className="slider-item">
              <div className="slider-header">
                <span className="slider-label">📐 Design & Project Management</span>
                <span className="slider-value-display" id="designPmValue">€24,000</span>
              </div>
              <p className="slider-hint">Calculated as 6% of renovation costs only</p>
              <div className="calculation-note" id="designPmNote">
                6% × €400,000 (renovations) = €24,000
              </div>
            </div>
            
            {/* Preliminary Studies */}
            <div className="slider-item">
              <div className="slider-header">
                <span className="slider-label">📊 Preliminary Studies & Technical Costs</span>
                <span className="slider-value-display" id="preliminaryStudiesValue">€20,655</span>
              </div>
              <p className="slider-hint">Calculated as 1.5% of total eligible costs</p>
              <div className="calculation-note">
                1.5% of final eligible total (includes all components above)
              </div>
            </div>
            
            {/* Grant Rate Selection */}
            <div className="slider-item">
              <div className="slider-header">
                <span className="slider-label">🎁 Mini PIA Non-Refundable Grant Rate</span>
                <span className="slider-value-display" id="grantRateValue">45%</span>
              </div>
              <div className="slider-wrapper">
                <input type="range" className="modern-slider" id="grantRateInput" 
                       min="45" max="50" defaultValue="45" step="1" />
              </div>
              <p className="slider-hint">Non-refundable grant: 45-50% of eligible costs</p>
            </div>
            
            {/* Total Eligible */}
            <div className="total-card">
              <div className="total-label">✅ TOTAL ELIGIBLE FOR MINI PIA</div>
              <div className="total-value" id="totalEligibleDisplay">€1,399,655</div>
            </div>
            
            {/* Grant Amount */}
            <div className="grant-info-box">
              <div className="grant-info-text">
                Non-refundable grant calculated at 45% of eligible costs<br />
                (45-50% range available based on project criteria)
              </div>
            </div>
            
            <div className="total-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)', borderColor: 'rgba(16, 185, 129, 0.5)' }}>
              <div className="total-label">🎁 NON-REFUNDABLE GRANT</div>
              <div className="total-value" id="miniPiaGrantDisplay" style={{ color: '#10b981' }}>€629,845</div>
            </div>
            
            {/* Tax Credit */}
            <div className="total-card" style={{ background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)', borderColor: 'rgba(96, 165, 250, 0.5)' }}>
              <div className="total-label">💰 TAX CREDIT (15%)</div>
              <div className="total-value" id="taxCreditDisplay" style={{ color: '#60a5fa' }}>€209,948</div>
            </div>
            
            {/* Total Benefit */}
            <div className="total-card" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)', borderColor: 'rgba(168, 85, 247, 0.5)' }}>
              <div className="total-label">🏆 TOTAL MINI PIA BENEFIT</div>
              <div className="total-value" id="totalBenefitDisplay" style={{ color: '#a855f7' }}>€839,793</div>
            </div>

            {/* Non-Eligible Costs Section */}
            <div className="non-eligible-section">
              <div className="non-eligible-header">
                ⚠️ Non-Eligible Costs (Not covered by Mini PIA)
              </div>
              
              {/* Agency Fees */}
              <div className="slider-item">
                <div className="slider-header">
                  <span className="slider-label">🏢 Agency Fees</span>
                  <span className="slider-value-display" id="agencyFeesValue">€24,000</span>
                </div>
                <div className="slider-wrapper">
                  <input type="range" className="modern-slider" id="agencyFeesInput" 
                         min="2" max="5" defaultValue="3" step="0.1" />
                </div>
                <p className="slider-hint">Rate: <span id="agencyRateDisplay">3.0%</span> of property value</p>
              </div>
              
              {/* Registration Tax */}
              <div className="slider-item">
                <div className="slider-header">
                  <span className="slider-label">📝 Registration Tax</span>
                  <span className="slider-value-display" id="registrationTaxValue">€72,000</span>
                </div>
                <p className="slider-hint">Auto-calculated: 9% of property purchase price</p>
              </div>
              
              {/* Notary Fees */}
              <div className="slider-item">
                <div className="slider-header">
                  <span className="slider-label">⚖️ Notary & Legal Fees</span>
                  <span className="slider-value-display" id="notaryFeesValue">€12,000</span>
                </div>
                <div className="slider-wrapper">
                  <input type="range" className="modern-slider" id="notaryFeesInput" 
                         min="5000" max="30000" defaultValue="12000" step="1000" />
                </div>
                <p className="slider-hint">Notary services for property transfer</p>
              </div>
              
              {/* Consulting Fees */}
              <div className="slider-item">
                <div className="slider-header">
                  <span className="slider-label">💼 Business Consulting (M&T)</span>
                  <span className="slider-value-display" id="consultingFeesValue">€25,000</span>
                </div>
                <div className="slider-wrapper">
                  <input type="range" className="modern-slider" id="consultingFeesInput" 
                         min="10000" max="50000" defaultValue="25000" step="2500" />
                </div>
                <p className="slider-hint">Grant application support and business planning</p>
              </div>
              
              {/* Total Non-Eligible */}
              <div className="total-card" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                <div className="total-label">❌ TOTAL NON-ELIGIBLE COSTS</div>
                <div className="total-value" id="totalNonEligibleDisplay" style={{ color: '#ef4444' }}>€133,000</div>
              </div>
            </div>

            {/* Grand Total */}
            <div className="total-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(79, 70, 229, 0.2) 100%)', borderColor: 'rgba(99, 102, 241, 0.5)', marginTop: '30px' }}>
              <div className="total-label">📊 TOTAL PROJECT INVESTMENT</div>
              <div className="total-value" id="totalProjectDisplay" style={{ color: '#6366f1' }}>€1,532,655</div>
            </div>
            
            {/* Your Net Investment */}
            <div className="total-card" style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.2) 100%)', borderColor: 'rgba(34, 197, 94, 0.5)' }}>
              <div className="total-label">💵 YOUR NET INVESTMENT (After Mini PIA)</div>
              <div className="total-value" id="netInvestmentDisplay" style={{ color: '#22c55e' }}>€692,862</div>
            </div>
          </section>

          {/* Professional Costs Enhancement Section */}
          <section className="glass-card enhancement-section">
            <h3>💼 Professional & Hidden Costs</h3>
            <div className="cost-grid">
              <div className="cost-item">
                <label><input type="checkbox" id="cost-notaryFees" defaultChecked /> Notary Fees (2%)</label>
                <span className="cost-value" id="value-notaryFees">€16,000</span>
              </div>
              <div className="cost-item">
                <label><input type="checkbox" id="cost-legalFees" defaultChecked /> Legal Assistance</label>
                <span className="cost-value" id="value-legalFees">€12,000</span>
              </div>
              <div className="cost-item">
                <label><input type="checkbox" id="cost-architectFees" defaultChecked /> Architect & Design (8%)</label>
                <span className="cost-value" id="value-architectFees">€32,000</span>
              </div>
              <div className="cost-item">
                <label><input type="checkbox" id="cost-permitCosts" defaultChecked /> Permits & Approvals</label>
                <span className="cost-value" id="value-permitCosts">€5,000</span>
              </div>
              <div className="cost-item">
                <label><input type="checkbox" id="cost-projectManagement" defaultChecked /> Project Management (5%)</label>
                <span className="cost-value" id="value-projectManagement">€20,000</span>
              </div>
            </div>
            <div className="cost-total">
              <strong>Total Professional Costs:</strong>
              <span id="total-professional-costs">€85,000</span>
            </div>
          </section>

          {/* Report CTA Section */}
          <section className="report-cta-section">
            <h3 className="report-cta-title">📊 Want a Professional PDF Report?</h3>
            <p className="report-cta-subtitle">Get your complete investment analysis delivered instantly!</p>
            <button className="cta-button" onClick={() => window.showRegistrationModal && window.showRegistrationModal()}>
              Get My Free Report
            </button>
          </section>

          <footer className="footer">
            <p>InvestiScope™ Classic - Professional Investment Analysis Tool</p>
            <p>© 2024 M&T International. All rights reserved.</p>
          </footer>
        </div>
        
        {/* Registration Modal - EXACTLY AS BEFORE */}
        <div className="modal-overlay" id="registrationOverlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => window.closeModal && window.closeModal()}>✕</button>
            
            <div className="modal-header">
              <h2 className="modal-title">Get Your Complete Investment Report</h2>
              <p className="modal-subtitle">Free • Instant • Professional Analysis</p>
            </div>
            
            <div className="preview-stats">
              <h3 style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>Your Personalized Report Includes:</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-label">Mini PIA Grant</div>
                  <div className="stat-value" id="previewGrant">€629,845</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Total Benefit</div>
                  <div className="stat-value" id="previewBenefit">€839,793</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Net Investment</div>
                  <div className="stat-value" id="previewNet">€692,862</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Project Total</div>
                  <div className="stat-value" id="previewTotal">€1,532,655</div>
                </div>
              </div>
            </div>
            
            <form id="reportForm" onSubmit={(e) => { e.preventDefault(); if (window.handleRegistration) window.handleRegistration(e.nativeEvent) }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input type="text" className="form-input" id="userName" required />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input type="email" className="form-input" id="userEmail" required />
              </div>
              
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="tel" className="form-input" id="userPhone" placeholder="+39 XXX XXX XXXX" />
              </div>
              
              <div className="form-group">
                <label className="form-label">Property Location in Italy</label>
                <input type="text" className="form-input" id="propertyLocation" placeholder="e.g., Puglia, Tuscany, Sicily" />
              </div>
              
              <div className="form-group">
                <label className="form-label">Investment Timeline</label>
                <select className="form-select" id="investmentTimeline">
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate (0-3 months)</option>
                  <option value="short">Short term (3-6 months)</option>
                  <option value="medium">Medium term (6-12 months)</option>
                  <option value="long">Long term (12+ months)</option>
                </select>
              </div>
              
              <button type="submit" className="submit-button">
                📊 Get My Free Report Now
              </button>
            </form>
            
            <button 
              type="button"
              className="whatsapp-button"
              onClick={() => window.sendWhatsAppDirect && window.sendWhatsAppDirect()}
              aria-label="Send Report via WhatsApp"
            >
              💬 Send Report via WhatsApp
            </button>
            
            <p className="privacy-note">
              🔒 Your information is secure and will only be used to send your report.<br />
              We respect your privacy and won&apos;t spam you.
            </p>
          </div>
        </div>
      </div>

      {/* Initialize the Classic App - WITH DYNAMIC CONFIG SUPPORT */}
      <Script id="classic-app-init" strategy="afterInteractive">{`
        // Configuration
        const SUPABASE_URL = 'https://kjyobkrjcmiuusijvrme.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqeW9ia3JqY21pdXVzaWp2cm1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NDM5NzMsImV4cCI6MjA2NjUxOTk3M30.2GxAUtXPal7ufxg7KgWMO7h15RXJOolBWt0-NPygj2I';
        const EMAILJS_SERVICE_ID = 'service_w6tghqr';
        const EMAILJS_TEMPLATE_ID = 'template_vztws4q';
        const EMAILJS_PUBLIC_KEY = 'wKn1_xMCtZssdZzpb';
        
        // Initialize services when window loads
        let supabase;
        let calculationResults = {};
        
        // Store dynamic config reference
        let dynamicConfig = ${JSON.stringify(dynamicConfig)};
        
        // Helper function to get config values
        function getConfigValue(path, defaultValue) {
          if (!dynamicConfig) return defaultValue;
          
          try {
            const keys = path.split('.');
            let value = dynamicConfig;
            for (const key of keys) {
              value = value[key];
            }
            return value !== undefined ? value : defaultValue;
          } catch {
            return defaultValue;
          }
        }
        
        window.addEventListener('load', function() {
          // Initialize Supabase
          if (window.supabase && window.supabase.createClient) {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('Supabase initialized successfully');
          }
          
          // Initialize EmailJS
          if (window.emailjs) {
            window.emailjs.init(EMAILJS_PUBLIC_KEY);
            console.log('EmailJS initialized successfully');
          } else {
            console.error('EmailJS library not loaded');
          }
          
          // Initialize calculations
          updateCalculations();
        });
        
        // Constants - Use dynamic values if available
        const DESIGN_PM_RATE = getConfigValue('parameters.costs.designAndPM.percent', 6) / 100;
        const PRELIMINARY_STUDIES_RATE = getConfigValue('parameters.costs.preliminaryStudies.percent', 1.5) / 100;
        const MIN_INTEGRATED_PERCENT = 0.05;
        const REGISTRATION_TAX_RATE = 0.09;
        
        // Get user data
        const userData = JSON.parse(localStorage.getItem('investiscope_user_data') || '{}');
        
        // Input elements
        const inputs = {
          propertyPurchase: document.getElementById('propertyPurchaseInput'),
          restructuring: document.getElementById('restructuringInput'),
          fixtures: document.getElementById('fixturesInput'),
          innovation: document.getElementById('innovationInput'),
          environmental: document.getElementById('environmentalInput'),
          grantRate: document.getElementById('grantRateInput'),
          agencyFees: document.getElementById('agencyFeesInput'),
          notaryFees: document.getElementById('notaryFeesInput'),
          consultingFees: document.getElementById('consultingFeesInput')
        };
        
        // Display elements
        const displays = {
          propertyPurchase: document.getElementById('propertyPurchaseValue'),
          restructuring: document.getElementById('restructuringValue'),
          fixtures: document.getElementById('fixturesValue'),
          innovation: document.getElementById('innovationValue'),
          environmental: document.getElementById('environmentalValue'),
          designPm: document.getElementById('designPmValue'),
          preliminaryStudies: document.getElementById('preliminaryStudiesValue'),
          grantRate: document.getElementById('grantRateValue'),
          integratedTotal: document.getElementById('integratedTotal'),
          integratedPercent: document.getElementById('integratedPercent'),
          integratedStatus: document.getElementById('integratedStatus'),
          totalEligible: document.getElementById('totalEligibleDisplay'),
          miniPiaGrant: document.getElementById('miniPiaGrantDisplay'),
          taxCredit: document.getElementById('taxCreditDisplay'),
          totalBenefit: document.getElementById('totalBenefitDisplay'),
          agencyFees: document.getElementById('agencyFeesValue'),
          agencyRate: document.getElementById('agencyRateDisplay'),
          registrationTax: document.getElementById('registrationTaxValue'),
          notaryFees: document.getElementById('notaryFeesValue'),
          consultingFees: document.getElementById('consultingFeesValue'),
          totalNonEligible: document.getElementById('totalNonEligibleDisplay'),
          totalProject: document.getElementById('totalProjectDisplay'),
          netInvestment: document.getElementById('netInvestmentDisplay')
        };
        
        // Add event listeners
        Object.values(inputs).forEach(input => {
          if (input) {
            input.addEventListener('input', updateCalculations);
          }
        });
        
        // Professional costs checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
          checkbox.addEventListener('change', updateCalculations);
        });
        
        function formatCurrency(value) {
          return '€' + Math.round(value).toLocaleString('en-US');
        }
        
        function updateCalculations() {
          // Get input values
          const propertyPurchase = parseFloat(inputs.propertyPurchase.value);
          const restructuring = parseFloat(inputs.restructuring.value);
          const fixtures = parseFloat(inputs.fixtures.value);
          const innovation = parseFloat(inputs.innovation.value);
          const environmental = parseFloat(inputs.environmental.value);
          const grantRate = parseFloat(inputs.grantRate.value) / 100;
          const agencyRate = parseFloat(inputs.agencyFees.value) / 100;
          
          // Update display values
          displays.propertyPurchase.textContent = formatCurrency(propertyPurchase);
          displays.restructuring.textContent = formatCurrency(restructuring);
          displays.fixtures.textContent = formatCurrency(fixtures);
          displays.innovation.textContent = formatCurrency(innovation);
          displays.environmental.textContent = formatCurrency(environmental);
          displays.grantRate.textContent = Math.round(grantRate * 100) + '%';
          
          // Calculate civil works
          const civilWorks = propertyPurchase + restructuring;
          
          // Calculate Design & PM (use dynamic rate)
          const designPmRate = getConfigValue('parameters.costs.designAndPM.percent', 6) / 100;
          const designPm = restructuring * designPmRate;
          displays.designPm.textContent = formatCurrency(designPm);
          
          // Update design PM note
          document.getElementById('designPmNote').textContent = 
            (designPmRate * 100) + '% × ' + formatCurrency(restructuring) + ' (renovations) = ' + formatCurrency(designPm);
          
          // Calculate integrated components
          const integratedTotal = innovation + environmental;
          displays.integratedTotal.textContent = formatCurrency(integratedTotal);
          
          // Calculate preliminary total (before preliminary studies)
          const preliminaryTotal = propertyPurchase + restructuring + fixtures + 
                                 innovation + environmental + designPm;
          
          // Calculate preliminary studies (use dynamic rate)
          const preliminaryRate = getConfigValue('parameters.costs.preliminaryStudies.percent', 1.5) / 100;
          const preliminaryStudies = (preliminaryTotal * preliminaryRate) / 
                                   (1 - preliminaryRate);
          displays.preliminaryStudies.textContent = formatCurrency(preliminaryStudies);
          
          // Calculate total eligible
          const totalEligible = preliminaryTotal + preliminaryStudies;
          displays.totalEligible.textContent = formatCurrency(totalEligible);
          
          // Calculate integrated percentage
          const integratedPercent = (integratedTotal / totalEligible) * 100;
          displays.integratedPercent.textContent = integratedPercent.toFixed(1) + '%';
          
          // Update integrated components status (use dynamic minimum if available)
          const minIntegrated = getConfigValue('parameters.components.innovation.minPercent', 2) + 
                               getConfigValue('parameters.components.sustainability.minPercent', 2);
          if (integratedPercent >= minIntegrated) {
            displays.integratedStatus.innerHTML = '✓ Meets minimum ' + minIntegrated + '% requirement';
            displays.integratedStatus.style.color = '#059669';
          } else {
            displays.integratedStatus.innerHTML = '✗ Below minimum ' + minIntegrated + '% requirement';
            displays.integratedStatus.style.color = '#dc2626';
          }
          
          // Calculate grant and tax credit
          const miniPiaGrant = totalEligible * grantRate;
          const taxCredit = totalEligible * 0.15; // 15% tax credit
          const totalBenefit = miniPiaGrant + taxCredit;
          
          // Update displays with proper rounding
          displays.miniPiaGrant.textContent = formatCurrency(miniPiaGrant);
          displays.taxCredit.textContent = formatCurrency(taxCredit);
          displays.totalBenefit.textContent = formatCurrency(totalBenefit);
          
          // Calculate non-eligible costs
          const agencyFees = propertyPurchase * agencyRate;
          const registrationTax = propertyPurchase * REGISTRATION_TAX_RATE;
          const notaryFeesBase = parseFloat(inputs.notaryFees.value);
          const consultingFees = parseFloat(inputs.consultingFees.value);
          
          displays.agencyFees.textContent = formatCurrency(agencyFees);
          displays.agencyRate.textContent = (agencyRate * 100).toFixed(1) + '%';
          displays.registrationTax.textContent = formatCurrency(registrationTax);
          displays.notaryFees.textContent = formatCurrency(notaryFeesBase);
          displays.consultingFees.textContent = formatCurrency(consultingFees);
          
          const totalNonEligible = agencyFees + registrationTax + notaryFeesBase + consultingFees;
          displays.totalNonEligible.textContent = formatCurrency(totalNonEligible);
          
          // Calculate professional costs
          calculateProfessionalCosts(propertyPurchase, restructuring);
          
          // Calculate total project and net investment
          const totalProject = totalEligible + totalNonEligible;
          const netInvestment = totalProject - totalBenefit;
          
          displays.totalProject.textContent = formatCurrency(totalProject);
          displays.netInvestment.textContent = formatCurrency(netInvestment);
          
          // Update suggested percentages dynamically
          const suggestedFixtures = civilWorks * 0.125;
          document.getElementById('fixturesSuggestion').textContent = 
            'Suggested: 12.5% of civil works (' + formatCurrency(suggestedFixtures) + ')';
          
          const suggestedInnovation = civilWorks * 0.035;
          document.getElementById('innovationSuggestion').textContent = 
            'Suggested: 3-4% of civil works (' + formatCurrency(suggestedInnovation) + ')';
          
          const suggestedEnvironmental = civilWorks * 0.025;
          document.getElementById('environmentalSuggestion').textContent = 
            'Suggested: 2-3% of civil works (' + formatCurrency(suggestedEnvironmental) + ')';
          
          // Store results for form submission
          calculationResults = {
            propertyPurchase,
            restructuring,
            fixtures,
            innovation,
            environmental,
            designPm,
            preliminaryStudies,
            totalEligible,
            miniPiaGrant,
            taxCredit,
            totalBenefit,
            totalNonEligible,
            totalProject,
            netInvestment,
            integratedPercent,
            agencyFees,
            registrationTax,
            notaryFees: notaryFeesBase,
            consultingFees
          };
          
          // Update preview values if modal is open
          if (document.getElementById('registrationOverlay').style.display === 'block') {
            updatePreviewValues();
          }
        }
        
        // ALL OTHER FUNCTIONS REMAIN EXACTLY THE SAME
        function calculateProfessionalCosts(propertyPrice, renovationBudget) {
          let total = 0;
          
          // Notary fees
          if (document.getElementById('cost-notaryFees').checked) {
            const cost = Math.min(Math.max(propertyPrice * 0.02, 1500), 15000);
            document.getElementById('value-notaryFees').textContent = formatCurrency(cost);
            total += cost;
          } else {
            document.getElementById('value-notaryFees').textContent = '€0';
          }
          
          // Legal fees
          if (document.getElementById('cost-legalFees').checked) {
            const cost = Math.min(Math.max(propertyPrice * 0.015, 2000), 10000);
            document.getElementById('value-legalFees').textContent = formatCurrency(cost);
            total += cost;
          } else {
            document.getElementById('value-legalFees').textContent = '€0';
          }
          
          // Architect fees
          if (document.getElementById('cost-architectFees').checked) {
            const cost = Math.max(renovationBudget * 0.08, 5000);
            document.getElementById('value-architectFees').textContent = formatCurrency(cost);
            total += cost;
          } else {
            document.getElementById('value-architectFees').textContent = '€0';
          }
          
          // Permits
          if (document.getElementById('cost-permitCosts').checked) {
            const cost = 5000;
            document.getElementById('value-permitCosts').textContent = formatCurrency(cost);
            total += cost;
          } else {
            document.getElementById('value-permitCosts').textContent = '€0';
          }
          
          // Project management
          if (document.getElementById('cost-projectManagement').checked) {
            const cost = Math.max(renovationBudget * 0.05, 5000);
            document.getElementById('value-projectManagement').textContent = formatCurrency(cost);
            total += cost;
          } else {
            document.getElementById('value-projectManagement').textContent = '€0';
          }
          
          document.getElementById('total-professional-costs').textContent = formatCurrency(total);
          calculationResults.professionalCosts = total;
        }
        
        // Show registration modal
        window.showRegistrationModal = function() {
          document.getElementById('registrationOverlay').style.display = 'block';
          document.body.style.overflow = 'hidden';
          updatePreviewValues();
        }
        
        // Close modal
        window.closeModal = function() {
          document.getElementById('registrationOverlay').style.display = 'none';
          document.body.style.overflow = 'auto';
        }
        
        // Update preview values
        function updatePreviewValues() {
          if (calculationResults.miniPiaGrant) {
            document.getElementById('previewGrant').textContent = formatCurrency(calculationResults.miniPiaGrant);
            document.getElementById('previewBenefit').textContent = formatCurrency(calculationResults.totalBenefit);
            document.getElementById('previewNet').textContent = formatCurrency(calculationResults.netInvestment);
            document.getElementById('previewTotal').textContent = formatCurrency(calculationResults.totalProject);
          }
        }
        
        // Send email report
        async function sendEmailReport(name, email, phone, location, timeline, results) {
          console.log('Sending email to:', email);
          
          const grantRate = ((results.miniPiaGrant / results.totalEligible) * 100).toFixed(0);
          
          // Prepare template parameters
          const templateParams = {
            // Personal info
            name: name,
            to_email: email,
            email: email,
            user_email: email,
            phone: phone || 'Not provided',
            location: location || 'Not specified',
            timeline: timeline || 'Not specified',
            
            // Investment Overview
            total_project_value: formatCurrency(results.totalProject),
            mini_pia_grant: formatCurrency(results.miniPiaGrant),
            grant_rate: grantRate,
            net_investment: formatCurrency(results.netInvestment),
            total_benefit: formatCurrency(results.totalBenefit),
            
            // Project Cost Breakdown
            property_purchase: formatCurrency(results.propertyPurchase),
            restructuring: formatCurrency(results.restructuring),
            equipment: formatCurrency(results.fixtures),
            innovation: formatCurrency(results.innovation),
            environmental: formatCurrency(results.environmental),
            design_pm: formatCurrency(results.designPm),
            preliminary_studies: formatCurrency(results.preliminaryStudies),
            investment_base: formatCurrency(results.totalEligible),
            
            // Non-Eligible Costs
            agency_fees: formatCurrency(results.agencyFees),
            registration_tax: formatCurrency(results.registrationTax),
            notary_legal: formatCurrency(results.notaryFees),
            consulting_fees: formatCurrency(results.consultingFees),
            total_professional: formatCurrency(results.totalNonEligible),
            
            // Additional details
            integrated_percent: results.integratedPercent.toFixed(1),
            tax_credit: formatCurrency(results.taxCredit),
            
            // Meta
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
          };
          
          console.log('Email template parameters:', templateParams);
          
          try {
            const response = await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
            console.log('Email sent successfully:', response);
            return response;
          } catch (error) {
            console.error('Email sending failed:', error);
            throw error;
          }
        }
        
        // Generate PDF Report
        function generatePDFReport(data) {
          // Check if jsPDF is loaded
          if (!window.jspdf || !window.jspdf.jsPDF) {
            console.error('jsPDF library not loaded');
            throw new Error('PDF library not available');
          }
          
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF();
          
          // Colors
          const primaryGreen = [16, 185, 129];
          const darkBlue = [30, 41, 59];
          const lightGray = [243, 244, 246];
          const white = [255, 255, 255];
          
          let yPos = 20;
          
          // Page 1 - Cover Page
          // Background
          doc.setFillColor(...darkBlue);
          doc.rect(0, 0, 210, 297, 'F');
          
          // Logo area
          doc.setFillColor(...primaryGreen);
          doc.rect(0, 40, 210, 80, 'F');
          
          // Title
          doc.setTextColor(...white);
          doc.setFontSize(36);
          doc.setFont('helvetica', 'bold');
          doc.text('InvestiScope™', 105, 70, { align: 'center' });
          
          doc.setFontSize(18);
          doc.setFont('helvetica', 'normal');
          doc.text('Professional Investment Analysis Report', 105, 85, { align: 'center' });
          doc.text('Mini PIA Turismo Grant Calculator', 105, 95, { align: 'center' });
          
          // Client Info Box
          doc.setFillColor(...white);
          doc.roundedRect(30, 140, 150, 60, 5, 5, 'F');
          
          doc.setTextColor(...darkBlue);
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold');
          doc.text('Prepared for:', 40, 155);
          
          doc.setFontSize(16);
          doc.text(data.name || 'Valued Investor', 40, 165);
          
          doc.setFontSize(11);
          doc.setFont('helvetica', 'normal');
          doc.text(data.email || '', 40, 173);
          if (data.location) {
            doc.text('Property Location: ' + data.location, 40, 181);
          }
          doc.text('Report Date: ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), 40, 189);
          
          // Key Highlights Box
          doc.setFillColor(...primaryGreen);
          doc.rect(0, 220, 210, 60, 'F');
          
          doc.setTextColor(...white);
          doc.setFontSize(20);
          doc.setFont('helvetica', 'bold');
          doc.text('Your Investment Opportunity', 105, 240, { align: 'center' });
          
          doc.setFontSize(28);
          doc.text('€' + Math.round(data.miniPiaGrant).toLocaleString(), 105, 255, { align: 'center' });
          
          doc.setFontSize(14);
          doc.setFont('helvetica', 'normal');
          doc.text('in Mini PIA Turismo Grants Available', 105, 265, { align: 'center' });
          
          // Page 2 - Executive Summary
          doc.addPage();
          doc.setFillColor(...white);
          doc.rect(0, 0, 210, 297, 'F');
          
          // Header
          doc.setFillColor(...primaryGreen);
          doc.rect(0, 0, 210, 30, 'F');
          doc.setTextColor(...white);
          doc.setFontSize(22);
          doc.setFont('helvetica', 'bold');
          doc.text('Executive Summary', 105, 20, { align: 'center' });
          
          yPos = 50;
          
          // Summary boxes
          const summaryData = [
            { label: 'Total Project Investment', value: data.totalProject, color: darkBlue },
            { label: 'Mini PIA Grant (45%)', value: data.miniPiaGrant, color: primaryGreen },
            { label: 'Tax Credit (15%)', value: data.taxCredit, color: [96, 165, 250] },
            { label: 'Your Net Investment', value: data.netInvestment, color: [34, 197, 94] }
          ];
          
          summaryData.forEach((item, index) => {
            const boxY = yPos + (index * 35);
            
            // Box
            doc.setFillColor(...lightGray);
            doc.roundedRect(20, boxY, 170, 30, 3, 3, 'F');
            
            // Colored accent
            doc.setFillColor(...item.color);
            doc.rect(20, boxY, 5, 30, 'F');
            
            // Text
            doc.setTextColor(...darkBlue);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text(item.label, 30, boxY + 12);
            
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('€' + Math.round(item.value).toLocaleString(), 180, boxY + 20, { align: 'right' });
          });
          
          yPos = 190;
          
          // Key Benefits Section
          doc.setFillColor(...darkBlue);
          doc.rect(20, yPos, 170, 8, 'F');
          doc.setTextColor(...white);
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold');
          doc.text('Key Investment Benefits', 105, yPos + 6, { align: 'center' });
          
          yPos += 20;
          
          doc.setTextColor(...darkBlue);
          doc.setFontSize(11);
          doc.setFont('helvetica', 'normal');
          
          const benefits = [
            '✓ ' + ((data.miniPiaGrant / data.totalEligible * 100).toFixed(0)) + '% non-refundable grant on eligible costs',
            '✓ Additional 15% tax credit on all eligible expenses',
            '✓ Total benefit of €' + Math.round(data.miniPiaGrant + data.taxCredit).toLocaleString(),
            '✓ Integrated components at ' + data.integratedPercent.toFixed(1) + '% (exceeds 5% minimum)',
            '✓ Professional support for grant application process'
          ];
          
          benefits.forEach(benefit => {
            doc.text(benefit, 25, yPos);
            yPos += 8;
          });
          
          // Page 3 - Detailed Cost Breakdown
          doc.addPage();
          
          // Header
          doc.setFillColor(...primaryGreen);
          doc.rect(0, 0, 210, 30, 'F');
          doc.setTextColor(...white);
          doc.setFontSize(22);
          doc.setFont('helvetica', 'bold');
          doc.text('Detailed Cost Analysis', 105, 20, { align: 'center' });
          
          yPos = 45;
          
          // Eligible Costs Section
          doc.setFillColor(...primaryGreen);
          doc.setTextColor(...white);
          doc.rect(20, yPos, 170, 10, 'F');
          doc.setFontSize(14);
          doc.text('ELIGIBLE COSTS (Qualify for Mini PIA)', 105, yPos + 7, { align: 'center' });
          
          yPos += 15;
          
          // Eligible costs table
          const eligibleCosts = [
            { item: 'Property Purchase', amount: data.propertyPurchase, note: '100% eligible' },
            { item: 'Restructuring & Renovations', amount: data.restructuring, note: '100% eligible' },
            { item: 'Fixtures & Fittings', amount: data.fixtures, note: 'Equipment and furniture' },
            { item: 'Innovation Component', amount: data.innovation, note: 'Digital systems & technology' },
            { item: 'Environmental Protection', amount: data.environmental, note: 'Energy efficiency measures' },
            { item: 'Design & Project Management', amount: data.designPm, note: '6% of renovation costs' },
            { item: 'Preliminary Studies', amount: data.preliminaryStudies, note: '1.5% of total eligible' }
          ];
          
          doc.setTextColor(...darkBlue);
          doc.setFontSize(11);
          
          eligibleCosts.forEach(cost => {
            doc.setFont('helvetica', 'normal');
            doc.text(cost.item, 25, yPos);
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text(cost.note, 25, yPos + 4);
            doc.setTextColor(...darkBlue);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text('€' + Math.round(cost.amount).toLocaleString(), 180, yPos, { align: 'right' });
            yPos += 12;
          });
          
          // Total Eligible
          doc.setDrawColor(...primaryGreen);
          doc.setLineWidth(0.5);
          doc.line(25, yPos - 3, 185, yPos - 3);
          doc.setFontSize(13);
          doc.setFont('helvetica', 'bold');
          doc.text('Total Eligible Costs', 25, yPos + 5);
          doc.setTextColor(...primaryGreen);
          doc.text('€' + Math.round(data.totalEligible).toLocaleString(), 180, yPos + 5, { align: 'right' });
          
          yPos += 20;
          
          // Non-Eligible Costs Section
          doc.setFillColor(239, 68, 68);
          doc.setTextColor(...white);
          doc.rect(20, yPos, 170, 10, 'F');
          doc.setFontSize(14);
          doc.text('NON-ELIGIBLE COSTS', 105, yPos + 7, { align: 'center' });
          
          yPos += 15;
          
          const nonEligibleCosts = [
            { item: 'Agency Fees', amount: data.agencyFees, note: '3% of property value' },
            { item: 'Registration Tax', amount: data.registrationTax, note: '9% of purchase price' },
            { item: 'Notary & Legal Fees', amount: data.notaryFees, note: 'Property transfer costs' },
            { item: 'Consulting Fees', amount: data.consultingFees, note: 'Grant application support' }
          ];
          
          doc.setTextColor(...darkBlue);
          doc.setFontSize(11);
          
          nonEligibleCosts.forEach(cost => {
            doc.setFont('helvetica', 'normal');
            doc.text(cost.item, 25, yPos);
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text(cost.note, 25, yPos + 4);
            doc.setTextColor(...darkBlue);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text('€' + Math.round(cost.amount).toLocaleString(), 180, yPos, { align: 'right' });
            yPos += 12;
          });
          
          // Total Non-Eligible
          doc.setDrawColor(239, 68, 68);
          doc.setLineWidth(0.5);
          doc.line(25, yPos - 3, 185, yPos - 3);
          doc.setFontSize(13);
          doc.setFont('helvetica', 'bold');
          doc.text('Total Non-Eligible Costs', 25, yPos + 5);
          doc.setTextColor(239, 68, 68);
          doc.text('€' + Math.round(data.totalNonEligible).toLocaleString(), 180, yPos + 5, { align: 'right' });
          
          // Page 4 - Grant Calculation Details
          doc.addPage();
          
          // Header
          doc.setFillColor(...primaryGreen);
          doc.rect(0, 0, 210, 30, 'F');
          doc.setTextColor(...white);
          doc.setFontSize(22);
          doc.setFont('helvetica', 'bold');
          doc.text('Mini PIA Grant Calculation', 105, 20, { align: 'center' });
          
          yPos = 50;
          
          // Grant Breakdown Box
          doc.setFillColor(240, 253, 244);
          doc.roundedRect(20, yPos, 170, 100, 5, 5, 'F');
          
          doc.setTextColor(...darkBlue);
          doc.setFontSize(16);
          doc.setFont('helvetica', 'bold');
          doc.text('Grant Calculation', 30, yPos + 15);
          
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          
          const grantCalc = [
            { label: 'Total Eligible Costs:', value: '€' + Math.round(data.totalEligible).toLocaleString() },
            { label: 'Grant Rate:', value: '45%' },
            { label: 'Mini PIA Grant:', value: '€' + Math.round(data.miniPiaGrant).toLocaleString(), bold: true },
            { label: 'Tax Credit (15%):', value: '€' + Math.round(data.taxCredit).toLocaleString() },
            { label: 'Total Benefit:', value: '€' + Math.round(data.miniPiaGrant + data.taxCredit).toLocaleString(), bold: true }
          ];
          
          let calcY = yPos + 30;
          grantCalc.forEach(item => {
            doc.setFont('helvetica', item.bold ? 'bold' : 'normal');
            doc.text(item.label, 35, calcY);
            doc.text(item.value, 165, calcY, { align: 'right' });
            calcY += 12;
          });
          
          yPos = 170;
          
          // Important Notes
          doc.setFillColor(...lightGray);
          doc.rect(20, yPos, 170, 80, 'F');
          
          doc.setTextColor(...darkBlue);
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold');
          doc.text('Important Information', 30, yPos + 15);
          
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          const notes = [
            '• Mini PIA grants are non-refundable (no repayment required)',
            '• Grants typically disbursed within 12-18 months of approval',
            '• Tax credits can be used over 5 years',
            '• Professional assistance recommended for application process',
            '• All amounts are estimates subject to final approval'
          ];
          
          let noteY = yPos + 25;
          notes.forEach(note => {
            doc.text(note, 30, noteY);
            noteY += 8;
          });
          
          // Page 5 - Next Steps
          doc.addPage();
          
          // Header
          doc.setFillColor(...primaryGreen);
          doc.rect(0, 0, 210, 30, 'F');
          doc.setTextColor(...white);
          doc.setFontSize(22);
          doc.setFont('helvetica', 'bold');
          doc.text('Next Steps & Contact', 105, 20, { align: 'center' });
          
          yPos = 50;
          
          doc.setTextColor(...darkBlue);
          doc.setFontSize(16);
          doc.setFont('helvetica', 'bold');
          doc.text('Your Investment Timeline', 25, yPos);
          
          yPos += 15;
          
          // Timeline
          const timeline = [
            { step: '1', title: 'Initial Consultation', desc: 'Review project details and grant eligibility' },
            { step: '2', title: 'Documentation', desc: 'Prepare all required documents and business plan' },
            { step: '3', title: 'Application Submission', desc: 'Submit complete Mini PIA application' },
            { step: '4', title: 'Approval Process', desc: 'Await evaluation (typically 3-6 months)' },
            { step: '5', title: 'Grant Disbursement', desc: 'Receive funds upon project milestones' }
          ];
          
          timeline.forEach((item, index) => {
            const stepY = yPos + (index * 25);
            
            // Circle
            doc.setFillColor(...primaryGreen);
            doc.circle(30, stepY, 8, 'F');
            doc.setTextColor(...white);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text(item.step, 30, stepY + 1, { align: 'center' });
            
            // Text
            doc.setTextColor(...darkBlue);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text(item.title, 45, stepY - 2);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(item.desc, 45, stepY + 4);
          });
          
          yPos = 190;
          
          // Contact Box
          doc.setFillColor(...darkBlue);
          doc.rect(20, yPos, 170, 70, 'F');
          
          doc.setTextColor(...white);
          doc.setFontSize(16);
          doc.setFont('helvetica', 'bold');
          doc.text('Ready to Start Your Investment?', 105, yPos + 15, { align: 'center' });
          
          doc.setFontSize(14);
          doc.setFont('helvetica', 'normal');
          doc.text('Contact M&T International', 105, yPos + 30, { align: 'center' });
          
          doc.setFontSize(12);
          doc.text('📧 info@marietrulli.com', 105, yPos + 42, { align: 'center' });
          doc.text('📱 +39 351 400 1402', 105, yPos + 52, { align: 'center' });
          
          // Footer on all pages
          const pageCount = doc.internal.getNumberOfPages();
          doc.setFontSize(8);
          doc.setTextColor(150, 150, 150);
          
          for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.text('© 2024 InvestiScope™ - Professional Investment Analysis', 105, 290, { align: 'center' });
            doc.text('Page ' + i + ' of ' + pageCount, 190, 290, { align: 'right' });
          }
          
          return doc;
        }
        
        // Handle registration
        window.handleRegistration = async function(event) {
          event.preventDefault();
          
          const name = document.getElementById('userName').value;
          const email = document.getElementById('userEmail').value;
          const phone = document.getElementById('userPhone').value;
          const location = document.getElementById('propertyLocation').value;
          const timeline = document.getElementById('investmentTimeline').value;
          
          try {
            // Save to Supabase if available (optional)
            if (supabase) {
              try {
                const { data: existingLead } = await supabase
                  .from('leads')
                  .select('id')
                  .eq('email', email)
                  .single();
                
                let leadId;
                
                if (!existingLead) {
                  const { data: newLead } = await supabase
                    .from('leads')
                    .insert({
                      email: email,
                      name: name,
                      phone: phone,
                      source: 'investiscope_classic',
                      property_location: location,
                      investment_timeline: timeline
                    })
                    .select()
                    .single();
                  
                  leadId = newLead.id;
                } else {
                  leadId = existingLead.id;
                  
                  await supabase
                    .from('leads')
                    .update({ 
                      name: name, 
                      phone: phone,
                      property_location: location,
                      investment_timeline: timeline
                    })
                    .eq('id', leadId);
                }
                
                // Save analysis
                await supabase
                  .from('analyses')
                  .insert({
                    lead_id: leadId,
                    analysis_type: 'classic_integrated',
                    property_value: calculationResults.propertyPurchase,
                    renovation_budget: calculationResults.restructuring,
                    grant_amount: calculationResults.miniPiaGrant,
                    total_investment: calculationResults.totalProject,
                    net_investment: calculationResults.netInvestment,
                    analysis_data: calculationResults
                  });
              } catch (dbError) {
                console.log('Database save failed, continuing with PDF generation:', dbError);
              }
            }
            
            // Skip email sending - go straight to PDF generation
            console.log('Generating PDF report...');
            
            // Check if jsPDF is available
            if (!window.jspdf || !window.jspdf.jsPDF) {
              console.error('jsPDF not loaded. Waiting for library...');
              // Try to load it dynamically
              await new Promise((resolve) => {
                const checkJsPDF = setInterval(() => {
                  if (window.jspdf && window.jspdf.jsPDF) {
                    clearInterval(checkJsPDF);
                    resolve();
                  }
                }, 100);
                // Timeout after 5 seconds
                setTimeout(() => {
                  clearInterval(checkJsPDF);
                  resolve();
                }, 5000);
              });
            }
            
            // Generate PDF
            const pdf = generatePDFReport({
              name: name,
              email: email,
              location: location,
              totalProject: calculationResults.totalProject,
              miniPiaGrant: calculationResults.miniPiaGrant,
              taxCredit: calculationResults.taxCredit,
              netInvestment: calculationResults.netInvestment,
              propertyPurchase: calculationResults.propertyPurchase,
              restructuring: calculationResults.restructuring,
              fixtures: calculationResults.fixtures,
              innovation: calculationResults.innovation,
              environmental: calculationResults.environmental,
              designPm: calculationResults.designPm,
              preliminaryStudies: calculationResults.preliminaryStudies,
              totalEligible: calculationResults.totalEligible,
              agencyFees: calculationResults.agencyFees,
              registrationTax: calculationResults.registrationTax,
              notaryFees: calculationResults.notaryFees,
              consultingFees: calculationResults.consultingFees,
              totalNonEligible: calculationResults.totalNonEligible,
              integratedPercent: calculationResults.integratedPercent,
              professionalCosts: calculationResults.professionalCosts || 0
            });

            // Download the PDF
            pdf.save('InvestiScope_Report_' + name.replace(/\\s+/g, '_') + '_' + new Date().toISOString().split('T')[0] + '.pdf');

            // Close modal and show success
            closeModal();
            document.getElementById('reportForm').reset();
            showSuccessToast();
            
          } catch (error) {
            console.error('Error:', error);
            if (error.message && error.message.includes('PDF')) {
              alert('The PDF generator is still loading. Please try again in a few seconds.');
            } else {
              alert('There was an error generating your PDF report. Please check the console for details and try again.');
            }
          }
          
          return false;
        }
        
        // Send WhatsApp report
        window.sendWhatsAppDirect = function() {
          if (!calculationResults.totalProject) {
            alert('Please wait for calculations to complete');
            return;
          }
          
          const message = '🏠 INVESTISCOPE™ CLASSIC REPORT\\n\\n' +
            '📊 PROJECT BREAKDOWN\\n' +
            'Total Project: ' + formatCurrency(calculationResults.totalProject) + '\\n' +
            '• Total Eligible: ' + formatCurrency(calculationResults.totalEligible) + '\\n' +
            '• Total Non-Eligible: ' + formatCurrency(calculationResults.totalNonEligible) + '\\n\\n' +
            '💰 MINI PIA BENEFITS\\n' +
            'Non-Refundable Grant: ' + formatCurrency(calculationResults.miniPiaGrant) + '\\n' +
            'Tax Credit: ' + formatCurrency(calculationResults.taxCredit) + '\\n' +
            'Total Benefit: ' + formatCurrency(calculationResults.totalBenefit) + '\\n\\n' +
            '💵 YOUR INVESTMENT\\n' +
            'Net Investment Required: ' + formatCurrency(calculationResults.netInvestment) + '\\n' +
            '(After Mini PIA benefits)\\n\\n' +
            '📋 ELIGIBLE COSTS DETAIL\\n' +
            '• Property Purchase: ' + formatCurrency(calculationResults.propertyPurchase) + '\\n' +
            '• Renovations: ' + formatCurrency(calculationResults.restructuring) + '\\n' +
            '• Fixtures & Fittings: ' + formatCurrency(calculationResults.fixtures) + '\\n' +
            '• Innovation: ' + formatCurrency(calculationResults.innovation) + '\\n' +
            '• Environmental: ' + formatCurrency(calculationResults.environmental) + '\\n' +
            '• Design & PM: ' + formatCurrency(calculationResults.designPm) + '\\n' +
            '• Studies: ' + formatCurrency(calculationResults.preliminaryStudies) + '\\n\\n' +
            '❌ NON-ELIGIBLE COSTS\\n' +
            '• Agency Fees: ' + formatCurrency(calculationResults.agencyFees) + '\\n' +
            '• Registration Tax: ' + formatCurrency(calculationResults.registrationTax) + '\\n' +
            '• Notary & Legal: ' + formatCurrency(calculationResults.notaryFees) + '\\n' +
            '• Consulting: ' + formatCurrency(calculationResults.consultingFees) + '\\n\\n' +
            '📈 KEY METRICS\\n' +
            '• Grant Rate: 45% of eligible costs\\n' +
            '• Tax Credit: 15% of eligible costs\\n' +
            '• Integrated Components: ' + calculationResults.integratedPercent.toFixed(1) + '%\\n' +
            '• Professional Costs: ' + formatCurrency(calculationResults.professionalCosts || 0) + '\\n\\n' +
            '📞 NEXT STEPS:\\n' +
            'Contact M&T International\\n' +
            '📧 info@marietrulli.com\\n' +
            '📱 +39 351 400 1402\\n\\n' +
            'Generated by InvestiScope™ Classic';
          
          window.open('https://wa.me/393514001402?text=' + encodeURIComponent(message), '_blank');
          
          closeModal();
          showSuccessToast();
        }
        
        // Show success toast
        function showSuccessToast() {
          const toast = document.getElementById('successToast');
          toast.style.display = 'block';
          setTimeout(() => {
            toast.style.display = 'none';
          }, 5000);
        }
        
        // Close modal when clicking outside
        document.getElementById('registrationOverlay').addEventListener('click', function(e) {
          if (e.target === this) {
            closeModal();
          }
        });
        
        // Prevent modal content from closing modal
        document.querySelector('.modal-content').addEventListener('click', function(e) {
          e.stopPropagation();
        });
      `}</Script>
    </>
  )
}
