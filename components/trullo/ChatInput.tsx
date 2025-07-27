// PATH: components/trullo/ChatInput.tsx
import React, { useState } from 'react';
import { Language } from './types';
import { translations } from './constants/translations';

interface ChatInputProps {
  language: Language;
  isTyping: boolean;
  onSend: (message: string) => void;
  onLeaveMessage: () => void;
}

export default function ChatInput({ language, isTyping, onSend, onLeaveMessage }: ChatInputProps) {
  const [input, setInput] = useState('');
  const t = translations[language];

  const handleSend = () => {
    if (input.trim() && !isTyping) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="flex items-center space-x-2 mb-2">
        <button
          onClick={onLeaveMessage}
          className="px-4 py-2 text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-all"
        >
          📝 {t.leaveMessage}
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t.placeholder}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
          disabled={isTyping}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className={`p-2 rounded-full transition-all duration-200 ${
            input.trim() && !isTyping
              ? 'bg-gradient-to-r from-purple-600 to-emerald-600 text-white hover:shadow-lg hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        {t.poweredBy}
      </p>
    </div>
  );
}
