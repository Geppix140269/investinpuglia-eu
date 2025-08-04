'use client'

import { useState, useEffect } from 'react'
import { client } from '@/sanity/lib/client'
import { useRouter } from 'next/navigation'
import { urlFor } from '@/sanity/lib/image'

export default function EditBlogPost({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
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
        const textContent = post.body?.[0]?.children?.[0]?.text || ''
        setFormData({
          title: post.title || '',
          excerpt: post.excerpt || '',
          content: textContent,
          mainImage: null
        })
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await client.patch(params.id).set({
        title: formData.title,
        excerpt: formData.excerpt,
        body: [{
          _type: 'block',
          children: [{ _type: 'span', text: formData.content }]
        }]
      }).commit()
      
      router.push('/admin/blog')
    } catch (error) {
      console.error('Error:', error)
      alert('Error updating post')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) return <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center"><div className="text-gray-500">Loading...</div></div>

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-light mb-8">Edit Blog Post</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
            <textarea
              rows={2}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              maxLength={200}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              rows={20}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
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