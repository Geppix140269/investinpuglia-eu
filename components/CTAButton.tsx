'use client'
import React from 'react'
import Link from 'next/link'
import { trackCTAClick } from '@/lib/database'

interface CTAButtonProps {
  variant: 'calculator' | 'consultation' | 'bookCall' | 'whatsapp' | 'custom'
  href?: string
  text?: string
  icon?: React.ReactNode
  onClick?: () => void
  className?: string
  showIcon?: boolean
  location?: string
  metadata?: Record<string, any>
}

const CTAButton: React.FC<CTAButtonProps> = ({
  variant,
  href,
  text,
  icon,
  onClick,
  className = '',
  showIcon = false,
  location = 'unknown',
  metadata
}) => {
  // Default configurations for each variant
  const variantConfigs = {
    calculator: {
      text: 'Get Expert Guidance',
      href: '/contact',
      className: 'inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
      isExternal: false
    },
    consultation: {
      text: 'Get Expert Guidance',
      href: '/contact',
      className: 'inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
      isExternal: false
    },
    bookCall: {
      text: 'Book Strategy Call',
      href: 'https://calendly.com/investinpuglia/30min',
      className: 'inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
      isExternal: true
    },
    whatsapp: {
      text: 'WhatsApp Support',
      href: 'https://wa.me/393514001402?text=Hi%2C%20I%27m%20interested%20in%20Puglia%20property%20investment%20and%20grants',
      className: 'inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
      isExternal: true
    },
    custom: {
      text: text || '',
      href: href || '#',
      className: className,
      isExternal: href?.startsWith('http') || false
    }
  }

  const config = variantConfigs[variant] || variantConfigs.custom
  const finalText = text || config.text
  const finalHref = href || config.href
  const finalClassName = variant === 'custom' ? className : `${config.className} ${className}`
  const isExternal = config.isExternal

  const handleClick = async (e: React.MouseEvent) => {
    if (onClick) {
      onClick()
    }
    
    // Track the click
    try {
      await trackCTAClick({
        variant,
        location,
        href: finalHref,
        text: finalText,
        metadata
      })
    } catch (error) {
      console.error('Error tracking CTA click:', error)
    }
  }

  // Default icons for variants
  const defaultIcons = {
    consultation: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    bookCall: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    whatsapp: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    ),
    custom: null
  }

  const displayIcon = icon || (showIcon && defaultIcons[variant])

  if (isExternal) {
    return (
      
        href={finalHref}
        target="_blank"
        rel="noopener noreferrer"
        className={finalClassName}
        onClick={handleClick}
      >
        {finalText}
        {displayIcon}
      </a>
    )
  }

  return (
    <Link
      href={finalHref}
      className={finalClassName}
      onClick={handleClick}
    >
      {finalText}
      {displayIcon}
    </Link>
  )
}

export default CTAButton

