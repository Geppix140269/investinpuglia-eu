// PATH: pages/test-auth.tsx
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function TestAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event)
      console.log('Session:', session)
      setUser(session?.user || null)
    })

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Auth Test Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <p>✅ Logged in as: {user.email}</p>
          <p>User ID: {user.id}</p>
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        </div>
      ) : (
        <div>
          <p>❌ Not logged in</p>
          <button onClick={async () => {
            const { error } = await supabase.auth.signInWithOAuth({
              provider: 'google',
              options: {
                redirectTo: 'https://investinpuglia.eu/api/auth/callback'
              }
            })
            if (error) console.error('Auth error:', error)
          }}>
            Sign In with Google
          </button>
        </div>
      )}
    </div>
  )
}

