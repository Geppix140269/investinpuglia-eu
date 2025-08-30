'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, Code, FileText, Image as ImageIcon, Type, List, Square } from 'lucide-react'

function PageEditorContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const slug = searchParams?.get('slug') || '/'
  
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'advanced'>('content')
  const [saving, setSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  
  // Page content state
  const [pageTitle, setPageTitle] = useState('')
  const [heroTitle, setHeroTitle] = useState('')
  const [heroSubtitle, setHeroSubtitle] = useState('')
  const [sections, setSections] = useState<any[]>([])
  
  // SEO state
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [metaKeywords, setMetaKeywords] = useState('')
  const [ogImage, setOgImage] = useState('')
  
  // Load page data based on slug
  useEffect(() => {
    loadPageData(slug)
  }, [slug])
  
  const loadPageData = (pageSlug: string) => {
    // In production, this would fetch from API
    // For now, we'll set some example data based on the slug
    if (pageSlug === '/renovation-expertise') {
      setPageTitle('Renovation & Restructuring Expertise')
      setHeroTitle('Puglia Renovation & Restructuring Excellence')
      setHeroSubtitle('Engineer Architect Cataldo Russo - Transforming Puglia\'s Heritage into Premium Investments')
      setMetaTitle('Renovation & Restructuring Expertise | Engineer Architect Cataldo Russo | InvestInPuglia')
      setMetaDescription('Discover our exceptional renovation and restructuring projects in Puglia.')
      setMetaKeywords('Puglia renovation, restructuring projects Italy, restoration expertise')
      setSections([
        { type: 'statistics', title: 'Key Metrics', data: { projects: '50+', value: '€95M+', roi: '30%' } },
        { type: 'portfolio', title: 'Featured Projects', data: [] },
        { type: 'expertise', title: 'Our Expertise', data: [] }
      ])
    } else {
      setPageTitle('Page Title')
      setHeroTitle('Hero Section Title')
      setHeroSubtitle('Hero subtitle text')
      setSections([])
    }
  }
  
  const handleSave = async () => {
    setSaving(true)
    
    // Prepare page data
    const pageData = {
      slug,
      title: pageTitle,
      hero: {
        title: heroTitle,
        subtitle: heroSubtitle
      },
      sections,
      seo: {
        title: metaTitle,
        description: metaDescription,
        keywords: metaKeywords,
        ogImage
      }
    }
    
    // In production, this would call an API to save
    console.log('Saving page data:', pageData)
    
    // Simulate save
    setTimeout(() => {
      setSaving(false)
      alert('Page saved successfully!')
    }, 1000)
  }
  
  const addSection = (type: string) => {
    const newSection = {
      id: Date.now().toString(),
      type,
      title: '',
      content: '',
      data: {}
    }
    setSections([...sections, newSection])
  }
  
  const updateSection = (id: string, updates: any) => {
    setSections(sections.map(s => s.id === id ? { ...s, ...updates } : s))
  }
  
  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/pages"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-lg font-semibold">Edit Page</h1>
                <p className="text-sm text-gray-500">{slug}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                {previewMode ? 'Edit' : 'Preview'}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b">
            <nav className="flex -mb-px">
              {['content', 'seo', 'advanced'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-6 py-3 text-sm font-medium capitalize ${
                    activeTab === tab
                      ? 'border-b-2 border-purple-500 text-purple-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {/* Content Tab */}
            {activeTab === 'content' && !previewMode && (
              <div className="space-y-6">
                {/* Page Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Title
                  </label>
                  <input
                    type="text"
                    value={pageTitle}
                    onChange={(e) => setPageTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                {/* Hero Section */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-medium mb-4">Hero Section</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hero Title
                      </label>
                      <input
                        type="text"
                        value={heroTitle}
                        onChange={(e) => setHeroTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hero Subtitle
                      </label>
                      <textarea
                        value={heroSubtitle}
                        onChange={(e) => setHeroSubtitle(e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Content Sections */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Content Sections</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addSection('text')}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="Add text section"
                      >
                        <Type className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => addSection('image')}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="Add image section"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => addSection('list')}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="Add list section"
                      >
                        <List className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => addSection('card')}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="Add cards section"
                      >
                        <Square className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {sections.map((section, index) => (
                      <div key={section.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium capitalize">{section.type} Section</span>
                          <button
                            onClick={() => removeSection(section.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Section title"
                          value={section.title}
                          onChange={(e) => updateSection(section.id, { title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                        />
                        {section.type === 'text' && (
                          <textarea
                            placeholder="Section content"
                            value={section.content}
                            onChange={(e) => updateSection(section.id, { content: e.target.value })}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* SEO Tab */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Page title for search engines"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {metaTitle.length}/60 characters
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Page description for search engines"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {metaDescription.length}/160 characters
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords
                  </label>
                  <input
                    type="text"
                    value={metaKeywords}
                    onChange={(e) => setMetaKeywords(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Comma-separated keywords"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Open Graph Image URL
                  </label>
                  <input
                    type="text"
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            )}
            
            {/* Advanced Tab */}
            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Advanced Settings</strong><br />
                    Custom code injection, redirects, and other advanced settings will be available here.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom CSS
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                    placeholder="/* Add custom CSS for this page */"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom JavaScript
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                    placeholder="// Add custom JavaScript for this page"
                  />
                </div>
              </div>
            )}
            
            {/* Preview Mode */}
            {previewMode && (
              <div className="prose max-w-none">
                <h1>{heroTitle}</h1>
                <p className="lead">{heroSubtitle}</p>
                {sections.map(section => (
                  <div key={section.id}>
                    <h2>{section.title}</h2>
                    <p>{section.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PageEditor() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageEditorContent />
    </Suspense>
  )
}