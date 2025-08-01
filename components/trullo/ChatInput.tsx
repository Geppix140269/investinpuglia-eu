// PATH: components/trullo/ChatInput.tsx
import React, { useState } from 'react';
import { Language } from './types';
import { translations } from './constants/translations';

interface ChatInputProps {
  language: Language;
  isTyping: boolean;
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ language, isTyping, onSend, disabled = false }: ChatInputProps) {
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
      </div>
    </div>
  );
}
