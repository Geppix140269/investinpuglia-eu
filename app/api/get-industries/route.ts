// Path: app/api/get-industries/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'trdbxmjo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN for better performance
})

export async function GET() {
  try {
    // Fetch all industries, ordered alphabetically
    const industries = await sanityClient.fetch(`
      *[_type == "industry"] | order(name asc) {
        _id,
        name,
        slug
      }
    `)

    return NextResponse.json(industries)
  } catch (error) {
    console.error('Error fetching industries:', error)
    return NextResponse.json({ error: 'Failed to fetch industries' }, { status: 500 })
  }
}
