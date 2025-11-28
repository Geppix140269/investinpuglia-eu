// components/InsightsSection.tsx
import Link from 'next/link'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react'
import type { BlogPost } from '@/lib/sanity/blog'

interface InsightsSectionProps {
  post: BlogPost
}

export default function InsightsSection({ post }: InsightsSectionProps) {
  // Safety check: ensure post has a valid slug
  if (!post || !post.slug || !post.slug.current) {
    return null
  }

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-gradient-to-r from-purple-600 to-emerald-600 text-white font-sans text-xs font-bold px-6 py-2 rounded-full uppercase tracking-wide shadow-lg mb-4">
            💡 Latest Insights
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-primary-700 leading-tight">
            Insights
          </h2>
        </div>

        {/* Featured Post */}
        <div className="glass-card overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Side */}
            {post.mainImage?.asset?.url && (
              <div className="relative h-96 lg:h-auto min-h-[400px] overflow-hidden bg-gradient-to-br from-purple-100 to-emerald-100">
                <CloudinaryImage
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            )}

            {/* Content Side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
              {/* Meta Info */}
              <div className="flex items-center gap-4 mb-4 text-sm text-neutral-500">
                {post.publishedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                )}
                {post.body && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{getReadingTime(post.body)} min read</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 mb-6 leading-tight">
                {post.title}
              </h3>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="font-sans text-base lg:text-lg text-neutral-600 mb-8 leading-relaxed line-clamp-4">
                  {post.excerpt}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-sans text-sm font-bold uppercase tracking-wide hover:scale-105 transition-all text-white border-2 border-white/40 hover:border-white/60"
                  style={{
                    background: 'rgba(147, 51, 234, 0.85)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(147, 51, 234, 0.5), 0 4px 12px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.2)'
                  }}
                >
                  <span className="relative z-10">Read Article</span>
                  <ArrowRight className="h-5 w-5 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                </Link>

                <Link
                  href="/blog"
                  className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-sans text-sm font-bold uppercase tracking-wide hover:scale-105 transition-all text-gray-800 border-2 border-gray-300 hover:border-gray-400"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  }}
                >
                  <span className="relative z-10">All Insights</span>
                  <BookOpen className="h-5 w-5 relative z-10" />
                </Link>
              </div>

              {/* Categories if available */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-neutral-200">
                  {post.categories.map((category) => (
                    <span
                      key={category.slug.current}
                      className="px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Helper function to calculate reading time
function getReadingTime(body: any[]): number {
  if (!body || !Array.isArray(body)) return 1

  const text = body
    .filter(block => block._type === 'block')
    .map(block => block.children?.map((child: any) => child.text).join('') || '')
    .join(' ')

  const wordsPerMinute = 200
  const words = text.split(' ').length
  const readingTime = Math.ceil(words / wordsPerMinute)

  return readingTime < 1 ? 1 : readingTime
}
