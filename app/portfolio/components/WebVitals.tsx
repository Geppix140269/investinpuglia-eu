'use client'

import { useReportWebVitals } from 'next/web-vitals'

export default function WebVitals() {
  useReportWebVitals((metric) => {
    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vitals:', metric)
    }
    
    // Send to analytics service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to Google Analytics, Vercel Analytics, etc.
      // gtag('event', metric.name, {
      //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      //   event_label: metric.id,
      //   non_interaction: true,
      // })
    }
  })

  return null
}