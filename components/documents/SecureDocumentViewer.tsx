'use client'

import { useState, useEffect } from 'react'
import { Shield, FileText, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'

interface SecureDocumentViewerProps {
  documentUrl: string
  documentTitle: string
  documentDescription?: string
  contentType?: 'pdf' | 'gamma' | 'iframe'
}

export default function SecureDocumentViewer({
  documentUrl,
  documentTitle,
  documentDescription,
  contentType = 'pdf'
}: SecureDocumentViewerProps) {
  const [showWarning, setShowWarning] = useState(true)

  // Disable right-click context menu
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault()
      return false
    }

    // Disable keyboard shortcuts for copying
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+C, Ctrl+A, Ctrl+P, Ctrl+S, F12, Ctrl+Shift+I
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'a' || e.key === 'p' || e.key === 's')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault()
        return false
      }
    }

    // Disable printing
    const handleBeforePrint = (e: Event) => {
      e.preventDefault()
      alert('Printing is disabled for confidential documents.')
      return false
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('beforeprint', handleBeforePrint)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('selectstart', handleSelectStart)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('beforeprint', handleBeforePrint)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Security Warning Banner */}
      {showWarning && (
        <div className="bg-amber-500 text-black px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5" />
              <div className="text-sm font-semibold">
                <span className="font-bold">CONFIDENTIAL DOCUMENT:</span> This document is protected.
                Copying, downloading, printing, and screenshots are disabled. Unauthorized distribution is prohibited.
              </div>
            </div>
            <button
              onClick={() => setShowWarning(false)}
              className="text-black hover:text-gray-700 font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-emerald-500 p-2 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{documentTitle}</h1>
                  {documentDescription && (
                    <p className="text-slate-300 text-sm mt-1">{documentDescription}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold">
                  <Eye className="w-3 h-3" />
                  View Only
                </div>
                <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-semibold">
                  <EyeOff className="w-3 h-3" />
                  No Download
                </div>
                <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-semibold">
                  <Lock className="w-3 h-3" />
                  No Copy
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Protection Notice */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-slate-300">
              <p className="font-semibold text-white mb-1">Document Protection Active</p>
              <ul className="space-y-1 text-xs">
                <li>• Right-click is disabled to prevent saving</li>
                <li>• Text selection and copying are blocked</li>
                <li>• Printing is restricted</li>
                <li>• Keyboard shortcuts for copying are disabled</li>
                <li>• This document is for viewing purposes only</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Document Viewer */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
          <div
            className="relative w-full"
            style={{
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none'
            }}
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* Watermark Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
              <div
                className="text-white/5 font-bold transform -rotate-45 text-6xl whitespace-nowrap"
                style={{ userSelect: 'none' }}
              >
                CONFIDENTIAL • VIEW ONLY • CONFIDENTIAL
              </div>
            </div>

            {/* Content Viewer based on type */}
            {contentType === 'gamma' ? (
              /* Gamma Presentation Viewer */
              <iframe
                src={documentUrl}
                className="w-full h-[800px]"
                title={documentTitle}
                style={{
                  border: 'none',
                  userSelect: 'none',
                  pointerEvents: 'auto'
                }}
                // Security attributes
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                allow="fullscreen"
                // Prevent download attempts
                onContextMenu={(e) => e.preventDefault()}
              />
            ) : contentType === 'iframe' ? (
              /* Generic iframe content */
              <iframe
                src={documentUrl}
                className="w-full h-[800px]"
                title={documentTitle}
                style={{
                  border: 'none',
                  userSelect: 'none',
                  pointerEvents: 'auto'
                }}
                sandbox="allow-same-origin allow-scripts"
                onContextMenu={(e) => e.preventDefault()}
              />
            ) : (
              /* PDF Viewer using iframe with enhanced security */
              <iframe
                src={`${documentUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                className="w-full h-[800px]"
                title={documentTitle}
                style={{
                  border: 'none',
                  userSelect: 'none',
                  pointerEvents: 'auto'
                }}
                // Security attributes
                sandbox="allow-same-origin allow-scripts"
                // Prevent download attempts
                onContextMenu={(e) => e.preventDefault()}
              />
            )}
          </div>
        </div>

        {/* Footer Notice */}
        <div className="mt-6 text-center text-slate-400 text-sm">
          <p className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            This document is confidential and protected. Unauthorized sharing or distribution is prohibited.
          </p>
        </div>
      </div>
    </div>
  )
}