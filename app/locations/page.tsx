// app/locations/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@sanity/client'
import { groq } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'trdbxmjo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

type Location = {
  _id: string
  city: string
  province: string
  slug: { current: string }
  metaTitle?: string
  metaDescription?: string
}

const locationsQuery = groq`*[_type == "locationPage"] | order(city asc) {
  _id,
  city,
  province,
  slug,
  metaTitle,
  metaDescription
}`

export const metadata: Metadata = {
  title: 'Investment Locations in Puglia | Invest in Puglia',
  description: 'Explore prime investment locations across Puglia with up to 55% grants.',
}

export default async function LocationsPage() {
  const locations = await client.fetch<Location[]>(locationsQuery)

  const locationsByProvince = locations.reduce((acc, location) => {
    const province = location.province || 'Other'
    if (!acc[province]) acc[province] = []
    acc[province].push(location)
    return acc
  }, {} as Record<string, Location[]>)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="bg-gradient-to-br from-blue-900 to-emerald-800 text-white py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Investment Locations in Puglia
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-blue-100">
            Discover prime locations for your investment with Mini PIA grants up to 55%
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {Object.entries(locationsByProvince).map(([province, provinceLocations]) => (
            <div key={province} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">
                {province} Province
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {provinceLocations.map((location) => (
                  <Link
                    key={location._id}
                    href={`/locations/${location.slug.current}`}
                    className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600">
                        {location.city}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {location.metaDescription || `Explore investment in ${location.city}`}
                      </p>
                      <span className="text-blue-600 font-semibold">
                        Explore →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
