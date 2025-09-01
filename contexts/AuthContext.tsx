// contexts/AuthContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, googleProvider, db } from '@/lib/firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

type AuthContextType = {
  user: User | null
  loading: boolean
  error: string | null
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      
      // If user is logged in, sync with Firebase Firestore
      if (firebaseUser) {
        try {
          // Sync user data with Firestore
          await setDoc(doc(db, 'users', firebaseUser.uid), {
            email: firebaseUser.email,
            name: firebaseUser.displayName,
            avatar_url: firebaseUser.photoURL,
            provider: firebaseUser.providerData[0]?.providerId || 'google',
            last_login: serverTimestamp(),
            updated_at: serverTimestamp()
          }, { merge: true })
        } catch (err) {
          console.error('Database sync error:', err)
        }
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    setError(null)
    try {
      // This will show invest-in-puglia-eu.firebaseapp.com
      const result = await signInWithPopup(auth, googleProvider)
      
      // Sync with Firebase Firestore
      if (result.user) {
        try {
          await setDoc(doc(db, 'users', result.user.uid), {
            email: result.user.email,
            name: result.user.displayName,
            avatar_url: result.user.photoURL,
            provider: 'google',
            created_at: serverTimestamp(),
            updated_at: serverTimestamp()
          }, { merge: true })
        } catch (dbError) {
          console.error('Database error:', dbError)
        }
      }
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message || 'Failed to sign in with Google')
      throw err
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (err: any) {
      console.error('Sign out error:', err)
      setError(err.message || 'Failed to sign out')
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    error,
    signInWithGoogle,
    signOut: handleSignOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}