import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET,
  useCdn: false, // Disabled CDN for immediate publishing updates
  apiVersion: '2023-07-09',
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
})
