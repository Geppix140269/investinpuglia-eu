import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import ShareButtons from '@/components/ShareButtons'

// FIXED: Changed to "post" - matching what's in your Sanity Studio
const ARTICLE_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  body,
  publishedAt,
  mainImage,
  "author": author->name,
  "categories": categories[]->title
}`

// FIXED: Changed to "post"
const ARTICLES_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)][].slug.current`

interface ArticlePageProps {
  params: {
    slug: string
  }
}

// Generate metadata for each article
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await client.fetch(ARTICLE_QUERY, { slug: params.slug })
  
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  const imageUrl = article.mainImage 
    ? urlFor(article.mainImage).width(1200).height(630).url()
    : '/og-image.png'

  return {
    title: article.title,
    description: article.excerpt || 'Read more insights about investment opportunities in Puglia',
    openGraph: {
      title: article.title,
      description: article.excerpt || 'Read more insights about investment opportunities in Puglia',
      type: 'article',
      publishedTime: article.publishedAt,
      authors: article.author ? [article.author] : [],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || 'Read more insights about investment opportunities in Puglia',
      images: [imageUrl],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await client.fetch(ARTICLE_QUERY, { slug: params.slug })

  if (!article) {
    notFound()
  }

  // Format the published date
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Generate the full URL for this article
  const articleUrl = `https://investinpuglia.eu/insights/${article.slug.current}`

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        
        <div className="text-gray-600 mb-4">
          <time dateTime={article.publishedAt}>{formattedDate}</time>
          {article.author && (
            <span> • By {article.author}</span>
          )}
        </div>

        {article.categories && article.categories.length > 0 && (
          <div className="flex gap-2 mb-6">
            {article.categories.map((category: string, index: number) => (
              <span 
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {/* Main Image */}
        {article.mainImage && (
          <div className="mb-8">
            <img
              src={urlFor(article.mainImage).width(800).height(400).url()}
              alt={article.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}
      </header>

      {/* Share Buttons Component */}
      <ShareButtons 
        url={articleUrl}
        title={article.title}
        description={article.excerpt}
      />

      {/* Article Body */}
      <div className="max-w-none">
        {article.body && (
          <PortableText
            value={article.body}
            components={{
              block: {
                h1: ({children}) => <h1 className="text-4xl font-bold mt-12 mb-6 text-gray-900">{children}</h1>,
                h2: ({children}) => <h2 className="text-3xl font-bold mt-10 mb-4 text-gray-900">{children}</h2>,
                h3: ({children}) => <h3 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">{children}</h3>,
                h4: ({children}) => <h4 className="text-xl font-semibold mt-6 mb-2 text-gray-800">{children}</h4>,
                h5: ({children}) => <h5 className="text-lg font-semibold mt-4 mb-2 text-gray-700">{children}</h5>,
                h6: ({children}) => <h6 className="text-base font-semibold mt-3 mb-2 text-gray-700">{children}</h6>,
                normal: ({children}) => <p className="text-lg leading-relaxed mb-6 text-gray-700">{children}</p>,
                blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-6 my-6 text-lg italic text-gray-800 bg-blue-50 py-4 rounded-r-lg">{children}</blockquote>,
              },
              marks: {
                strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
                em: ({children}) => <em className="italic text-gray-800">{children}</em>,
                code: ({children}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600">{children}</code>,
                link: ({children, value}) => {
                  const rel = !value?.href?.startsWith('/') ? 'noreferrer noopener' : undefined
                  return (
                    <a
                      href={value?.href}
                      rel={rel}
                      target={value?.href?.startsWith('http') ? '_blank' : undefined}
                      className="text-blue-600 font-semibold hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-500 transition-colors"
                    >
                      {children}
                    </a>
                  )
                },
              },
              list: {
                bullet: ({children}) => <ul className="list-disc list-outside mb-6 space-y-3 text-lg leading-relaxed ml-6">{children}</ul>,
                number: ({children}) => <ol className="list-decimal list-outside mb-6 space-y-3 text-lg leading-relaxed ml-6">{children}</ol>,
              },
              listItem: {
                bullet: ({children}) => <li className="mb-2 pl-2">{children}</li>,
                number: ({children}) => <li className="mb-2 pl-2">{children}</li>,
              },
              types: {
                // Handle any custom block types if needed
                break: () => <br className="my-4" />,
              },
            }}
          />
        )}
      </div>

      {/* Share Buttons at the bottom too */}
      <div className="mt-12 pt-8 border-t">
        <ShareButtons 
          url={articleUrl}
          title={article.title}
          description={article.excerpt}
        />
      </div>
    </article>
  )
}

// Generate static params for all articles
export async function generateStaticParams() {
  const slugs = await client.fetch(ARTICLES_SLUGS_QUERY)
  
  return slugs.map((slug: string) => ({
    slug: slug,
  }))
}
