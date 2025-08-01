// app/admin/email-templates/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function EmailTemplatesAdmin() {
  const [templates, setTemplates] = useState<any[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setTemplates(data)
  }

  const saveTemplate = async () => {
    const { error } = await supabase
      .from('email_templates')
      .update({
        subject: selectedTemplate.subject,
        html_content: selectedTemplate.html_content,
        updated_at: new Date().toISOString()
      })
      .eq('id', selectedTemplate.id)

    if (!error) {
      alert('Template saved!')
      setIsEditing(false)
      loadTemplates()
    }
  }

  const testEmail = async () => {
    const testEmail = prompt('Enter test email address:')
    if (!testEmail) return

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template: selectedTemplate.name,
          email: testEmail
        })
      })
      
      if (response.ok) {
        alert('Test email sent!')
      }
    } catch (error) {
      alert('Error sending test email')
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Email Template Manager</h1>
      
      <div className="grid grid-cols-3 gap-6">
        {/* Template List */}
        <div className="col-span-1 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Templates</h2>
          <ul className="space-y-2">
            {templates.map(template => (
              <li 
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className={`p-3 rounded cursor-pointer ${
                  selectedTemplate?.id === template.id 
                    ? 'bg-blue-100 border-blue-500' 
                    : 'bg-white hover:bg-gray-100'
                } border`}
              >
                <div className="font-medium">{template.name}</div>
                <div className="text-sm text-gray-600">{template.language}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Template Editor */}
        {selectedTemplate && (
          <div className="col-span-2 bg-white p-6 rounded-lg border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{selectedTemplate.name}</h2>
              <div className="space-x-2">
                <button
                  onClick={testEmail}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Send Test
                </button>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
                {isEditing && (
                  <button
                    onClick={saveTemplate}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                value={selectedTemplate.subject}
                onChange={(e) => setSelectedTemplate({
                  ...selectedTemplate,
                  subject: e.target.value
                })}
                disabled={!isEditing}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Variables */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Variables</label>
              <div className="flex flex-wrap gap-2">
                {selectedTemplate.variables?.map((variable: string) => (
                  <span 
                    key={variable}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    [{variable}]
                  </span>
                ))}
              </div>
            </div>

            {/* HTML Content */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">HTML Content</label>
              {isEditing ? (
                <textarea
                  value={selectedTemplate.html_content}
                  onChange={(e) => setSelectedTemplate({
                    ...selectedTemplate,
                    html_content: e.target.value
                  })}
                  className="w-full h-96 p-2 border rounded font-mono text-sm"
                />
              ) : (
                <div className="border rounded p-4 h-96 overflow-auto">
                  <iframe
                    srcDoc={selectedTemplate.html_content}
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>

            {/* Metadata */}
            <div className="text-sm text-gray-600">
              <p>Version: {selectedTemplate.version}</p>
              <p>Updated: {new Date(selectedTemplate.updated_at).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
