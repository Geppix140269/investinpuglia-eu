// Path: app/admin/blog/new/page.tsx
'use client'

import { useState } from 'react'
import { client } from '@/sanity/lib/client'
import { writeClient } from '@/sanity/lib/writeClient'
import { useRouter } from 'next/navigation'
import slugify from 'slugify'

export default function NewBlogPost() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'investment',
    mainImage: null as File | null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Upload image if exists
      let imageAsset = null
      if (formData.mainImage) {
        imageAsset = await writeClient.assets.upload('image', formData.mainImage)
      }

      // Create the post
      const slug = slugify(formData.title, { lower: true, strict: true })
      
      const doc = {
        _type: 'post',
        title: formData.title,
        slug: {
          _type: 'slug',
          current: slug
        },
        excerpt: formData.excerpt,
        body: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: formData.content,
                marks: []
              }
            ]
          }
        ],
        mainImage: imageAsset ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        } : undefined,
        publishedAt: new Date().toISOString(),
        author: {
          _type: 'reference',
          _ref: 'your-author-id' // Replace with actual author ID
        }
      }

      await writeClient.create(doc)
      router.push('/admin/blog')
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Error creating post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900">Create New Blog Post</h1>
          <p className="text-gray-600 mt-2">Write your investment insights</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          {/* Excerpt */}
          <div className="mb-6">
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt (Brief summary)
            </label>
            <textarea
              id="excerpt"
              rows={2}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              maxLength={200}
              required
            />
            <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/200 characters</p>
          </div>

          {/* Main Image */}
          <div className="mb-6">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, mainImage: e.target.files?.[0] || null })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="investment">Investment</option>
              <option value="grants">Grants</option>
              <option value="tax">Tax Benefits</option>
              <option value="real-estate">Real Estate</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
          </div>

          {/* Content */}
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <div className="border border-gray-300 rounded-md">
              <div className="flex items-center gap-2 p-2 border-b border-gray-300 bg-gray-50">
                <button
                  type="button"
                  className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded"
                  onClick={() => {
                    const textarea = document.getElementById('content') as HTMLTextAreaElement
                    const start = textarea.selectionStart
                    const end = textarea.selectionEnd
                    const text = formData.content
                    const newText = text.substring(0, start) + '**' + text.substring(start, end) + '**' + text.substring(end)
                    setFormData({ ...formData, content: newText })
                  }}
                >
                  <strong>B</strong>
                </button>
                <button
                  type="button"
                  className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded italic"
                  onClick={() => {
                    const textarea = document.getElementById('content') as HTMLTextAreaElement
                    const start = textarea.selectionStart
                    const end = textarea.selectionEnd
                    const text = formData.content
                    const newText = text.substring(0, start) + '*' + text.substring(start, end) + '*' + text.substring(end)
                    setFormData({ ...formData, content: newText })
                  }}
                >
                  I
                </button>
                <span className="text-xs text-gray-500 ml-auto">Markdown supported</span>
              </div>
              <textarea
                id="content"
                rows={20}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Write your blog post content here...

You can use Markdown:
- **Bold text**
- *Italic text*
- # Headings
- [Links](https://example.com)
- Lists and more..."
                required
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-between">
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
              {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
