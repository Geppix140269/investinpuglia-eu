// app/admin/page.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [seoTitle, setSeoTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [tags, setTags] = useState('')
  const [geoFocus, setGeoFocus] = useState('')
  const [mainImage, setMainImage] = useState<File | null>(null)
  const [altText, setAltText] = useState('')
  const [caption, setCaption] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('body', body)
    formData.append('seoTitle', seoTitle)
    formData.append('metaDescription', metaDescription)
    formData.append('tags', tags)
    formData.append('geoFocus', geoFocus)
    formData.append('altText', altText)
    formData.append('caption', caption)
    if (mainImage) formData.append('mainImage', mainImage)

    const res = await fetch('/api/createPost', {
      method: 'POST',
      body: formData
    })

    const result = await res.json()
    setSubmitting(false)
    alert(result.message)
    if (res.ok) router.refresh()
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
        <textarea placeholder="Body" value={body} onChange={e => setBody(e.target.value)} className="w-full p-2 border rounded h-40" required />
        <input type="text" placeholder="SEO Title" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Meta Description" value={metaDescription} onChange={e => setMetaDescription(e.target.value)} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Geo Focus" value={geoFocus} onChange={e => setGeoFocus(e.target.value)} className="w-full p-2 border rounded" />
        <input type="file" accept="image/*" onChange={e => setMainImage(e.target.files?.[0] || null)} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Image Alt Text" value={altText} onChange={e => setAltText(e.target.value)} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Image Caption" value={caption} onChange={e => setCaption(e.target.value)} className="w-full p-2 border rounded" />
        <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-4 py-2 rounded">
          {submitting ? 'Submitting…' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
