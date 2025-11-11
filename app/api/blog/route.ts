import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

function getWriteClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID

  if (!projectId) {
    throw new Error('Sanity project ID is not configured')
  }

  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production',
    apiVersion: '2023-05-03',
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
  })
}

export async function POST(request: NextRequest) {
  try {
    const { id, data, action } = await request.json()

    if (action === 'update') {
      const writeClient = getWriteClient()
      const result = await writeClient.patch(id).set(data).commit()
      return NextResponse.json({ success: true, result })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    console.error('API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}