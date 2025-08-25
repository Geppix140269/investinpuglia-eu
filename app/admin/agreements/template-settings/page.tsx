// PATH: app/admin/agreements/template-settings/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { FileText, Save, CheckCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TemplateSettingsPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<string[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    // List all PDFs in the docs folder
    const availableTemplates = [
      'Project_Management_Agreement_Editable.pdf',
      // Add more template names here as you add them
    ];
    
    setTemplates(availableTemplates);
    
    // Load current config
    try {
      const response = await fetch('/api/agreements/template-config');
      if (response.ok) {
        const data = await response.json();
        setCurrentTemplate(data.templateFile);
      }
    } catch {
      setCurrentTemplate('Project_Management_Agreement_Editable.pdf');
    }
  };

  const saveTemplate = async () => {
    setLoading(true);
    setSaved(false);
    
    try {
      const response = await fetch('/api/agreements/template-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateFile: currentTemplate,
          lastUpdated: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      alert('Failed to save template settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <button
              onClick={() => router.push('/admin/agreements')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Agreements
            </button>
          </div>

          <h1 className="text-2xl font-bold mb-2">Template Settings</h1>
          <p className="text-gray-600 mb-8">
            Choose which PDF template to use for client agreements
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Template
              </label>
              <select
                value={currentTemplate}
                onChange={(e) => setCurrentTemplate(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {templates.map(template => (
                  <option key={template} value={template}>
                    {template}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">How to add new templates:</h3>
              <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
                <li>Save your PDF file in the <code className="font-mono bg-white px-1">docs</code> folder</li>
                <li>Refresh this page</li>
                <li>Select your new template from the dropdown</li>
                <li>Click Save</li>
              </ol>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-700">
                <FileText className="w-5 h-5" />
                <span className="font-medium">Template Location:</span>
              </div>
              <code className="text-sm text-gray-600 font-mono">
                C:\Development\investinpuglia-live\docs\{currentTemplate}
              </code>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={saveTemplate}
                disabled={loading}
                className="flex-1 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  'Saving...'
                ) : saved ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Template Choice
                  </>
                )}
              </button>
            </div>

            {saved && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                Template settings saved! All new shares will use this template.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}