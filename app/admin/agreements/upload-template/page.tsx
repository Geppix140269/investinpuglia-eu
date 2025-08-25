// PATH: app/admin/agreements/upload-template/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, FileText, CheckCircle, ArrowLeft, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';

export default function UploadTemplatePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [templateUrl, setTemplateUrl] = useState('');
  const [existingTemplates, setExistingTemplates] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const loadExistingTemplates = async () => {
    try {
      const templatesRef = ref(storage, 'templates/agreements');
      const result = await listAll(templatesRef);
      
      const templates = await Promise.all(
        result.items.map(async (item) => ({
          name: item.name,
          url: await getDownloadURL(item)
        }))
      );
      
      setExistingTemplates(templates);
      if (templates.length > 0) {
        setTemplateUrl(templates[0].url);
      }
    } catch (error) {
      console.log('No existing templates found');
    }
  };

  // Load existing templates on mount
  useEffect(() => {
    loadExistingTemplates();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a PDF file');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    setUploading(true);
    try {
      // Upload to Firebase Storage
      const templateRef = ref(storage, `templates/agreements/Project_Management_Agreement_Template.pdf`);
      
      const snapshot = await uploadBytes(templateRef, selectedFile, {
        contentType: 'application/pdf',
        customMetadata: {
          uploadedBy: 'Giuseppe Funaro',
          uploadedAt: new Date().toISOString(),
          type: 'agreement_template'
        }
      });

      // Get download URL
      const downloadUrl = await getDownloadURL(snapshot.ref);
      setTemplateUrl(downloadUrl);
      
      alert('Template uploaded successfully!');
      await loadExistingTemplates();
      
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload template');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
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

          <h1 className="text-3xl font-bold mb-2">Agreement Template Management</h1>
          <p className="text-gray-600 mb-8">
            Upload your Project Management Agreement PDF template that clients will download and fill.
          </p>

          {/* Current Template */}
          {existingTemplates.length > 0 && (
            <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h2 className="text-lg font-semibold mb-4 text-blue-900">Current Template</h2>
              {existingTemplates.map((template, index) => (
                <div key={index} className="flex items-center justify-between mb-3 p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">{template.name}</span>
                  </div>
                  <a
                    href={template.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="mb-4">
              <Upload className="w-12 h-12 text-gray-400 mx-auto" />
            </div>

            <h3 className="text-lg font-semibold mb-2">Upload PDF Template</h3>
            <p className="text-sm text-gray-600 mb-4">
              Select your Project Management Agreement PDF template
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
            />

            {selectedFile ? (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mb-4 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Select PDF File
              </button>
            )}

            {selectedFile && (
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload Template'}
              </button>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-3">How it works:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>Upload your PDF template here (the one at C:\Development\investinpuglia-live\docs\Project_Management_Agreement_Editable.pdf)</li>
              <li>When you share with clients, they receive a link to download this template</li>
              <li>Clients fill in their details in the PDF</li>
              <li>They upload the completed PDF back to you</li>
              <li>Both parties can sign digitally</li>
            </ol>
          </div>

          {/* Test Section */}
          {templateUrl && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-900">Template Ready!</h3>
              </div>
              <p className="text-sm text-green-700 mb-3">
                Your template is uploaded and ready to share with clients.
              </p>
              <button
                onClick={() => router.push('/admin/agreements/share')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Share with Client
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}