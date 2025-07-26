// lib/database.ts
import { createClient } from './supabase'

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
    const supabase = createClient()
    const { error } = await supabase
      .from('cta_clicks')
      .insert([{
        variant,
        location,
        metadata,
        user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null
      }])
    
    if (error) throw error
  } catch (error) {
    console.error('Error tracking CTA click:', error)
  }
}

// EXPORT THIS TOO
export async function trackPageView(page_path: string) {
  try {
    const supabase = createClient()
    const { error } = await supabase
      .from('page_views')
      .insert([{
        page_path,
        session_id: getSessionId(),
        referrer: typeof document !== 'undefined' ? document.referrer : null,
        user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null
      }])
    
    if (error) throw error
  } catch (error) {
    console.error('Error tracking page view:', error)
  }
}
