// components/LatestBlogPosts.tsx
import Link from 'next/link'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import type { BlogPost } from '@/lib/sanity/blog'

interface LatestBlogPostsProps {
  posts: BlogPost[]
}

export default function LatestBlogPosts({ posts }: LatestBlogPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-neutral-50 via-white to-primary-50/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-gradient-to-r from-purple-600 to-emerald-600 text-white font-sans text-xs font-bold px-6 py-2 rounded-full uppercase tracking-wide shadow-lg mb-4">
            📝 Latest Insights
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-primary-700 leading-tight">
            Investment Insights & Market Updates
          </h2>
          <p className="font-sans text-base md:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest news, guides, and expert analysis on investing in Puglia
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {posts.slice(0, 3).map((post) => (
            <Link
              href={`/blog/${post.slug.current}`}
              key={post._id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              {post.mainImage?.asset?.url && (
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-purple-100 to-emerald-100">
                  <CloudinaryImage
                    src={post.mainImage.asset.url}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-3 text-xs text-neutral-500">
                  {post.publishedAt && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                  {post.body && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{getReadingTime(post.body)} min read</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-navy-900 mb-3 leading-tight group-hover:text-purple-700 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="font-sans text-sm text-neutral-600 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {/* Read More Link */}
                <div className="flex items-center gap-2 text-purple-600 font-sans text-sm font-semibold group-hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/blog"
            className="relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 rounded-full font-sans text-sm font-bold uppercase tracking-wide hover:scale-105 transition-all text-gray-800 border-2 border-white/40 hover:border-white/60"
            style={{
              background: 'rgba(74, 144, 226, 0.25)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(74, 144, 226, 0.5), 0 4px 12px rgba(74, 144, 226, 0.3), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.2)'
            }}
          >
            <span className="relative z-10">View All Articles</span>
            <ArrowRight className="h-5 w-5 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          </Link>
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
