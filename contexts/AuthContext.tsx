// app/contexts/AuthContext.tsx
'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  error: string | null
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    // Check active session
    checkUser()
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event)
        
        if (session?.user) {
          setUser(session.user)
          setError(null)
        } else {
          setUser(null)
        }
        
        if (event === 'SIGNED_IN') {
          // Redirect to the page they were trying to access, or dashboard
          const redirectTo = sessionStorage.getItem('redirectAfterLogin') || '/dashboard'
          sessionStorage.removeItem('redirectAfterLogin')
          router.push(redirectTo)
        } else if (event === 'SIGNED_OUT') {
          router.push('/')
        }
      }
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [router])
  async function checkUser() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
    } catch (error) {
      console.error('Error checking auth:', error)
      setError('Failed to check authentication status')
    } finally {
      setLoading(false)
    }
  }
  const signInWithGoogle = async () => {
    try {
      setError(null)
      
      // Store the current path to redirect back after login
      if (pathname !== '/login') {
        sessionStorage.setItem('redirectAfterLogin', pathname)
      }
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://investinpuglia.eu/auth/callback',
        },
      })
      
      if (error) throw error
    } catch (error: any) {
      console.error('Error signing in:', error)
      setError(error.message || 'Failed to sign in')
    }
  }
  const signOut = async () => {
    try {
      setError(null)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error: any) {
      console.error('Error signing out:', error)
      setError(error.message || 'Failed to sign out')
    }
  }
  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut, error }}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
