// lib/database.ts
import { db } from './firebase'
import { collection, addDoc } from 'firebase/firestore'

// Generate a simple session ID
function getSessionId() {
  if (typeof window !== 'undefined') {
    let sessionId = localStorage.getItem('session_id')
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('session_id', sessionId)
    }
    return sessionId
  }
  return 'server_session'
}

// EXPORT THIS FUNCTION!!!
export async function trackCTAClick(
  variant: string,
  location: string,
  metadata?: Record<string, any>
) {
  try {
    await addDoc(collection(db, 'cta_clicks'), {
      variant,
      location,
      metadata,
      user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
      created_at: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error tracking CTA click:', error)
  }
}

// EXPORT THIS TOO
export async function trackPageView(page_path: string) {
  try {
    await addDoc(collection(db, 'page_views'), {
      page_path,
      session_id: getSessionId(),
      referrer: typeof document !== 'undefined' ? document.referrer : null,
      user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
      created_at: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error tracking page view:', error)
  }
}
