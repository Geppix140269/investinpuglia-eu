// PATH: pages/api/auth/callback.ts
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query

  if (code) {
    try {
      const supabase = createPagesServerClient({ req, res })
      const { error } = await supabase.auth.exchangeCodeForSession(String(code))
      
      if (error) {
        console.error('Session exchange error:', error)
        return res.status(400).json({ error: error.message })
      }
      
      // Set cookie header for the session
      res.setHeader('Set-Cookie', res.getHeader('Set-Cookie') || '')
    } catch (error) {
      console.error('Auth callback error:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  // Redirect back to the main page
  return res.redirect('/')
}
