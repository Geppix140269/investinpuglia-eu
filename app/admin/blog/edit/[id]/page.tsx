'use client'

import { useState, useEffect } from 'react'
import { client } from '@/sanity/lib/client'
import { useRouter } from 'next/navigation'
import { urlFor } from '@/sanity/lib/image'

export default function EditBlogPost({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    mainImage: null as File | null,
  })

  useEffect(() => {
    fetchPost()
  }, [params.id])

  const fetchPost = async () => {
    try {
      const post = await client.fetch(`*[_type == "post" && _id == $id][0]`, { id: params.id })
      if (post) {
        let fullContent = ''
        if (post.body && Array.isArray(post.body)) {
          fullContent = post.body
            .map((block: any) => {
              if (block._type === 'block' && block.children) {
                return block.children
                  .map((child: any) => child.text || '')
                  .join('')
              }
              return ''
            })
            .join('\n\n')
        }
        
        setFormData({
          title: post.title || '',
          excerpt: post.excerpt || '',
          content: fullContent,
          mainImage: null
        })
        
        if (post.mainImage) {
          setCurrentImageUrl(urlFor(post.mainImage).width(800).url())
        }
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      alert('Error loading post')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Convert content back to Sanity block format
      const paragraphs = formData.content.split('\n\n').filter(p => p.trim())
      const bodyBlocks = paragraphs.map((paragraph, index) => ({
        _type: 'block',
        _key: `block-${Date.now()}-${index}`, // Use timestamp for unique keys
        style: 'normal',
        markDefs: [],
        children: [{
          _type: 'span',
          _key: `span-${Date.now()}-${index}`,
          text: paragraph.trim(),
          marks: []
        }]
      }))
      
      // First update text content
      const patchQuery = client.patch(params.id)
        .set({
          title: formData.title,
          excerpt: formData.excerpt,
          body: bodyBlocks
        })
      
      // Handle image upload if new image selected
      if (formData.mainImage) {
        try {
          const imageAsset = await client.assets.upload('image', formData.mainImage)
          patchQuery.set({
            mainImage: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageAsset._id
              }
            }
          })
        } catch (imageError) {
          console.error('Error uploading image:', imageError)
          // Continue with text update even if image fails
        }
      }
      
      await patchQuery.commit()
      
      alert('Post updated successfully!')
      router.push('/admin/blog')
    } catch (error: any) {
      console.error('Error updating post:', error)
      // Show more specific error message
      const errorMessage = error.message || 'Unknown error occurred'
      alert(`Error updating post: ${errorMessage}\n\nPlease check the console for details.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-gray-500">Loading post...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-light text-gray-900">Edit Blog Post</h1>
          <button
            onClick={() => router.push('/admin/blog')}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt <span className="text-gray-400">(Brief summary for listings)</span>
            </label>
            <textarea
              rows={3}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              maxLength={200}
            />
            <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/200 characters</p>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
            {currentImageUrl && !formData.mainImage && (
              <div className="mb-3">
                <img src={currentImageUrl} alt="Current featured image" className="w-48 h-32 object-cover rounded" />
                <p className="text-sm text-gray-500 mt-1">Current image (upload new to replace)</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, mainImage: e.target.files?.[0] || null })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            />
            {formData.mainImage && (
              <p className="text-sm text-emerald-600 mt-1">New image selected: {formData.mainImage.name}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content <span className="text-gray-400">(Separate paragraphs with blank lines)</span>
            </label>
            <textarea
              rows={25}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 font-mono text-sm"
              placeholder="Write your blog post content here...

Separate paragraphs with blank lines for proper formatting."
              required
            />
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push('/admin/blog')}
              className="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Updating...' : 'Update Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}