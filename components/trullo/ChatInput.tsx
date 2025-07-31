// PATH: components/trullo/ChatInput.tsx
import React, { useState } from 'react';
import { Language } from './types';
import { translations } from './constants/translations';

interface ChatInputProps {
  language: Language;
  isTyping: boolean;
  onSend: (message: string) => void;
  onLeaveMessage: () => void;
  disabled?: boolean;
}

export default function ChatInput({ language, isTyping, onSend, onLeaveMessage, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('');
  const t = translations[language];

  const handleSend = () => {
    if (input.trim() && !isTyping && !disabled) {
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
    <div className="p-4 border-t">
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={disabled ? t.authRequired || "Please sign in to continue" : t.placeholder}
          disabled={isTyping || disabled}
          className={`
            flex-1 p-2 border rounded-lg resize-none
            focus:outline-none focus:ring-2 focus:ring-purple-500
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          `}
          rows={1}
          style={{
            minHeight: '40px',
            maxHeight: '120px'
          }}
        />
        <button
          onClick={handleSend}
          disabled={isTyping || !input.trim() || disabled}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all
            ${isTyping || !input.trim() || disabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-emerald-600 text-white hover:shadow-lg'
            }
          `}
        >
          {isTyping ? '...' : t.send}
        </button>
        <button
          onClick={onLeaveMessage}
          disabled={disabled}
          className={`
            px-4 py-2 border border-gray-300 rounded-lg transition-all
            ${disabled
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'hover:bg-gray-50'
            }
          `}
          title={t.messageForm.title}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
