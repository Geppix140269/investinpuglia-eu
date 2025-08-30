import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import PageFAQ from './PageFAQ'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface SanityPageSEOProps {
  pageKey: string
}

async function getFAQs(pageKey: string) {
  const faqs = await client.fetch(
    groq`*[_type == "faq" && isActive == true && ($pageKey in pages || "all" in pages)] | order(order asc, _createdAt asc) {
      question,
      answer,
      category
    }`,
    { pageKey }
  )
  return faqs
}

async function getPageLinks(pageKey: string) {
  const pageData = await client.fetch(
    groq`*[_type == "pageLinks" && page == $pageKey][0] {
      relatedLinks,
      seoTitle
    }`,
    { pageKey }
  )
  return pageData
}

export default async function SanityPageSEO({ pageKey }: SanityPageSEOProps) {
  const [faqs, pageData] = await Promise.all([
    getFAQs(pageKey),
    getPageLinks(pageKey)
  ])

  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <>
      {/* FAQ Section */}
      <PageFAQ 
        faqs={faqs}
        title="Frequently Asked Questions"
        description="Find answers to common questions about investing in Puglia"
      />
      
      {/* Related Links Section for Internal Linking */}
      {pageData?.relatedLinks && pageData.relatedLinks.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-purple-50 to-emerald-50 rounded-2xl p-8">
              <h3 className="text-2xl font-light text-gray-900 mb-6">
                {pageData.seoTitle || 'Explore More Resources'}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {pageData.relatedLinks.map((link: any, index: number) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="group flex items-center justify-between bg-white rounded-lg p-4 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex-1">
                      <span className="text-gray-700 group-hover:text-purple-600 transition-colors block">
                        {link.text}
                      </span>
                      {link.description && (
                        <span className="text-sm text-gray-500 mt-1 block">
                          {link.description}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all ml-4 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}