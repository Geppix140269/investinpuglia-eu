// app/api/get-locations/route.ts
import { createClient } from '@sanity/client'
import { groq } from 'next-sanity'
import { NextResponse } from 'next/server'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'trdbxmjo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export async function GET() {
  try {
    const locations = await client.fetch(
      groq`*[_type == "locationPage"] | order(city asc) {
        _id,
        city,
        province,
        slug
      }`
    )
    
    return NextResponse.json(locations)
  } catch (error) {
    console.error('Error fetching locations:', error)
    return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 })
  }
}