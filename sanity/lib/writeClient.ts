import { createClient } from '@sanity/client'

export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false, // Don't use CDN for write operations
})