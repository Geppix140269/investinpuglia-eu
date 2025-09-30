'use client'

import { useState, useEffect } from 'react'
import { FileText, Upload, Eye, Trash2, Copy, Check, Shield, ExternalLink } from 'lucide-react'

interface Document {
  id: string
  title: string
  description: string
  url: string
  contentType: 'pdf' | 'gamma' | 'iframe'
  enabled: boolean
  createdAt: string
}

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [uploading, setUploading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Form state for new document
  const [newDoc, setNewDoc] = useState({
    id: '',
    title: '',
    description: '',
    url: '',
    contentType: 'pdf' as 'pdf' | 'gamma' | 'iframe',
    enabled: true
  })

  useEffect(() => {
    // Load documents from localStorage
    const stored = localStorage.getItem('exclusive-documents')
    if (stored) {
      setDocuments(JSON.parse(stored))
    } else {
      // Initialize with default documents
      const defaultDocs: Document[] = [
        {
          id: 'investment-agreement-template',
          title: 'Investment Agreement Template',
          description: 'Standard investment agreement template for property investments in Puglia',
          url: 'https://res.cloudinary.com/dusubfxgo/raw/upload/v1/documents/investment-agreement.pdf',
          contentType: 'pdf',
          enabled: true,
          createdAt: new Date().toISOString()
        }
      ]
      setDocuments(defaultDocs)
      localStorage.setItem('exclusive-documents', JSON.stringify(defaultDocs))
    }
  }, [])

  const saveDocuments = (docs: Document[]) => {
    localStorage.setItem('exclusive-documents', JSON.stringify(docs))
    setDocuments(docs)
  }

  const generateId = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const handleAddDocument = () => {
    if (!newDoc.title || !newDoc.url) {
      alert('Please fill in title and URL')
      return
    }

    const docId = newDoc.id || generateId(newDoc.title)

    const doc: Document = {
      id: docId,
      title: newDoc.title,
      description: newDoc.description,
      url: newDoc.url,
      contentType: newDoc.contentType,
      enabled: newDoc.enabled,
      createdAt: new Date().toISOString()
    }

    saveDocuments([...documents, doc])

    // Reset form
    setNewDoc({
      id: '',
      title: '',
      description: '',
      url: '',
      contentType: 'pdf',
      enabled: true
    })
  }

  const handleDeleteDocument = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      saveDocuments(documents.filter(d => d.id !== id))
    }
  }

  const handleToggleEnabled = (id: string) => {
    saveDocuments(documents.map(d =>
      d.id === id ? { ...d, enabled: !d.enabled } : d
    ))
  }

  const copyAccessLink = (id: string) => {
    const link = `${window.location.origin}/exclusive/documents/${id}`
    navigator.clipboard.writeText(link)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file')
      return
    }

    setUploading(true)

    // Upload to Cloudinary
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'investinpuglia-documents') // You'll need to create this preset in Cloudinary
    formData.append('folder', 'investinpuglia/exclusive-documents')

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dusubfxgo/raw/upload`,
        {
          method: 'POST',
          body: formData
        }
      )

      const data = await response.json()

      if (data.secure_url) {
        setNewDoc({ ...newDoc, url: data.secure_url })
        alert('File uploaded successfully!')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed. You can manually enter the Cloudinary URL instead.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Exclusive Documents Management</h1>
          <p className="text-slate-300">
            Manage confidential documents with OTP-protected access
          </p>
        </div>

        {/* Add New Document Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Add New Document
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Document Title *
              </label>
              <input
                type="text"
                value={newDoc.title}
                onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                placeholder="e.g., Investment Agreement Template"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Document ID (optional)
              </label>
              <input
                type="text"
                value={newDoc.id}
                onChange={(e) => setNewDoc({ ...newDoc, id: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                placeholder="Auto-generated from title"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <textarea
              value={newDoc.description}
              onChange={(e) => setNewDoc({ ...newDoc, description: e.target.value })}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              rows={2}
              placeholder="Brief description of the document"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Content Type *
            </label>
            <select
              value={newDoc.contentType}
              onChange={(e) => setNewDoc({ ...newDoc, contentType: e.target.value as 'pdf' | 'gamma' | 'iframe' })}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="pdf">PDF Document</option>
              <option value="gamma">Gamma Presentation</option>
              <option value="iframe">Generic Iframe Content</option>
            </select>
            <p className="text-xs text-slate-400 mt-1">
              Select the type of content you're adding
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {newDoc.contentType === 'pdf' ? 'Upload PDF or Enter URL *' : 'Content URL *'}
            </label>
            {newDoc.contentType === 'pdf' ? (
              <div className="flex gap-4">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 disabled:opacity-50"
                />
                <span className="text-slate-400 self-center">OR</span>
                <input
                  type="url"
                  value={newDoc.url}
                  onChange={(e) => setNewDoc({ ...newDoc, url: e.target.value })}
                  className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="https://res.cloudinary.com/..."
                  disabled={uploading}
                />
              </div>
            ) : (
              <input
                type="url"
                value={newDoc.url}
                onChange={(e) => setNewDoc({ ...newDoc, url: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                placeholder={newDoc.contentType === 'gamma' ? 'https://gamma.app/docs/...' : 'https://...'}
              />
            )}
            {uploading && (
              <p className="text-emerald-400 text-sm mt-2">Uploading to Cloudinary...</p>
            )}
            {newDoc.contentType === 'gamma' && (
              <p className="text-xs text-slate-400 mt-1">
                Enter your Gamma presentation share URL (must allow embedding)
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={newDoc.enabled}
                onChange={(e) => setNewDoc({ ...newDoc, enabled: e.target.checked })}
                className="w-4 h-4 rounded bg-slate-900/50 border-slate-600"
              />
              <span className="text-sm">Enable access (document will be accessible with OTP)</span>
            </label>
          </div>

          <button
            onClick={handleAddDocument}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Add Document
          </button>
        </div>

        {/* Documents List */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Exclusive Documents ({documents.length})
          </h2>

          {documents.length === 0 ? (
            <p className="text-slate-400 text-center py-8">No documents yet. Add your first document above.</p>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <FileText className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-lg font-semibold text-white">{doc.title}</h3>
                        {doc.enabled ? (
                          <span className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full text-xs font-semibold">
                            Active
                          </span>
                        ) : (
                          <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-full text-xs font-semibold">
                            Disabled
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          doc.contentType === 'gamma' ? 'bg-purple-500/20 text-purple-300' :
                          doc.contentType === 'pdf' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-gray-500/20 text-gray-300'
                        }`}>
                          {doc.contentType === 'gamma' ? '📊 Gamma' : doc.contentType === 'pdf' ? '📄 PDF' : '🌐 Iframe'}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm mb-2">{doc.description}</p>
                      <p className="text-slate-500 text-xs">ID: {doc.id}</p>
                      <p className="text-slate-500 text-xs">Created: {new Date(doc.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => copyAccessLink(doc.id)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all"
                        title="Copy access link"
                      >
                        {copiedId === doc.id ? (
                          <Check className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>

                      <a
                        href={`/exclusive/documents/${doc.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all"
                        title="Preview document"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>

                      <button
                        onClick={() => handleToggleEnabled(doc.id)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all"
                        title={doc.enabled ? 'Disable access' : 'Enable access'}
                      >
                        <Eye className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
                        title="Delete document"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-300 mb-3">How to Use</h3>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
            <li>Upload a PDF document or enter a Cloudinary URL</li>
            <li>Each document gets a unique access link</li>
            <li>Users must verify with OTP/SMS to access the document</li>
            <li>Documents are protected: no download, copy, or print</li>
            <li>Share the access link with authorized users only</li>
            <li>Toggle documents on/off without deleting them</li>
          </ol>
        </div>
      </div>
    </div>
  )
}