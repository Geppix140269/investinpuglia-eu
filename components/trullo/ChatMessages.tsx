// PATH: components/trullo/ChatMessages.tsx
import React, { useRef, useEffect } from 'react';
import { Message } from './types';

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
}

export default function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              message.role === 'user'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                : 'bg-white text-gray-800 shadow-sm border border-gray-100'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            <p className={`text-xs mt-1 ${
              message.role === 'user' ? 'text-purple-200' : 'text-gray-500'
            }`}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      ))}
      
      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
}
