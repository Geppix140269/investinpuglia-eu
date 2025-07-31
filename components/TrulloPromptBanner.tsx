// components/TrulloPromptBanner.tsx
import Icon from '@/lib/iconMappings'

interface TrulloPromptBannerProps {
  onClose: () => void
}

export default function TrulloPromptBanner({ onClose }: TrulloPromptBannerProps) {
  const openTrullo = () => {
    const trulloButton = document.querySelector('button[aria-label="Open chat"]') as HTMLButtonElement
    if (trulloButton) {
      trulloButton.click()
    }
    onClose()
  }

  return (
    <div className="fixed top-20 left-0 right-0 z-50 px-4 animate-slideDown">
      <div className="max-w-lg mx-auto bg-gradient-to-r from-purple-600 to-emerald-600 rounded-full shadow-2xl p-1">
        <div className="bg-white rounded-full px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">🏛️</span>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Meet Trullo - Your EU Grants Assistant</p>
              <p className="text-xs text-gray-600">Available in 6 languages • Get instant grant estimates</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={openTrullo}
              className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:shadow-lg transition-all"
            >
              Chat Now
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
