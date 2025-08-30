'use client'

import PageFAQ from './PageFAQ'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface RelatedLink {
  href: string
  text: string
}

interface PageSEOSectionProps {
  pageKey: string
}

export default function PageSEOSection({ pageKey }: PageSEOSectionProps) {
  // Import FAQ content dynamically
  const { pageFAQs } = require('@/lib/faq-content')
  const pageData = pageFAQs[pageKey]
  
  if (!pageData) {
    return null
  }

  return (
    <>
      {/* FAQ Section */}
      <PageFAQ 
        faqs={pageData.faqs}
        title={pageData.title}
        description={pageData.description}
      />
      
      {/* Related Links Section for Internal Linking */}
      {pageData.relatedLinks && pageData.relatedLinks.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-purple-50 to-emerald-50 rounded-2xl p-8">
              <h3 className="text-2xl font-light text-gray-900 mb-6">
                Explore More Resources
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {pageData.relatedLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="group flex items-center justify-between bg-white rounded-lg p-4 hover:shadow-md transition-all duration-200"
                  >
                    <span className="text-gray-700 group-hover:text-purple-600 transition-colors">
                      {link.text}
                    </span>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
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