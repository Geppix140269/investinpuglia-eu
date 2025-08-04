import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

async function getPosts() {
  const posts = await client.fetch(`
    *[_type == "post" && publishedAt < now()] | order(publishedAt desc) {
      _id,
      title,
      slug,
      author->{name, image},
      mainImage,
      categories[]->{title},
      publishedAt,
      excerpt,
      "autoExcerpt": array::join(string::split((pt::text(body)), "")[0..255], "") + "...",
      "readTime": round(length(pt::text(body)) / 5 / 180 )
    }
  `)
  return posts
}

export default async function InsightsPage() {
  const posts = await getPosts()
  
  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)

  return (
    <main className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            Investment Insights
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Expert perspectives on Italian investment opportunities, EU grants, and strategies for international investors in Puglia
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {featuredPost && (
            <div className="mb-16">
              <h2 className="text-2xl font-light text-gray-900 mb-8 flex items-center">
                <span className="bg-emerald-600 w-1 h-8 mr-4"></span>
                Featured Insight
              </h2>
              <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="grid md:grid-cols-2">
                  {featuredPost.mainImage && (
                    <Link href={`/insights/${featuredPost.slug.current}`} className="relative overflow-hidden">
                      <img
                        src={urlFor(featuredPost.mainImage).width(1200).height(800).url()}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  )}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    {featuredPost.categories && (
                      <div className="flex gap-2 mb-4">
                        {featuredPost.categories.map((category: any) => (
                          <span key={category.title} className="text-xs font-semibold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
                            {category.title}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <h3 className="text-3xl font-semibold mb-4 group-hover:text-emerald-600 transition-colors">
                      <Link href={`/insights/${featuredPost.slug.current}`}>
                        {featuredPost.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-6 text-lg line-clamp-3">
                      {featuredPost.excerpt || featuredPost.autoExcerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {featuredPost.author?.image && (
                          <img 
                            src={urlFor(featuredPost.author.image).width(40).height(40).url()}
                            alt={featuredPost.author.name}
                            className="w-10 h-10 rounded-full"
                          />
                        )}
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{featuredPost.author?.name || 'Giuseppe Funaro'}</p>
                          <p className="text-gray-500">{new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                      </div>
                      {featuredPost.readTime && (
                        <span className="text-sm text-gray-500">{featuredPost.readTime} min read</span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          )}

          {otherPosts.length > 0 && (
            <>
              <h2 className="text-2xl font-light text-gray-900 mb-8 flex items-center">
                <span className="bg-emerald-600 w-1 h-8 mr-4"></span>
                Latest Articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map((post: any) => (
                  <article 
                    key={post._id} 
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                  >
                    {post.mainImage && (
                      <Link href={`/insights/${post.slug.current}`} className="relative block overflow-hidden h-48">
                        <img
                          src={urlFor(post.mainImage).width(800).height(450).url()}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    )}
                    
                    <div className="p-6">
                      {post.categories && (
                        <div className="flex gap-2 mb-3">
                          {post.categories.slice(0, 2).map((category: any) => (
                            <span key={category.title} className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                              {category.title}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        <Link href={`/insights/${post.slug.current}`}>
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                        {post.excerpt || post.autoExcerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          {post.author?.image && (
                            <img 
                              src={urlFor(post.author.image).width(24).height(24).url()}
                              alt={post.author.name}
                              className="w-6 h-6 rounded-full"
                            />
                          )}
                          <span>{post.author?.name || 'Giuseppe Funaro'}</span>
                        </div>
                        {post.readTime && (
                          <span>{post.readTime} min</span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {posts.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-2">No insights published yet</h3>
              <p className="text-gray-500">Check back soon for expert investment insights and analysis.</p>
            </div>
          )}

          <div className="mt-20 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 md:p-12 text-white text-center">
            <h3 className="text-3xl font-light mb-4">Stay Updated on Investment Opportunities</h3>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
              Get exclusive insights on Puglia grants, tax benefits, and investment strategies delivered to your inbox.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-white text-emerald-700 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              Subscribe to Newsletter →
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}