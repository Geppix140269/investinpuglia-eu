import { createClient } from '@sanity/client'

// Get Sanity configuration from environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production'

// Create Sanity client only if projectId is configured
export const sanity = projectId ? createClient({
  projectId,
  dataset,
  useCdn: false, // Disabled CDN for immediate publishing updates
  apiVersion: '2023-07-09',
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
}) : null

// Helper to check if Sanity is configured
export const isSanityConfigured = () => !!sanity
