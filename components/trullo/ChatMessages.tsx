// PATH: components/trullo/ChatMessages.tsx
import React, { useRef, useEffect } from 'react';
import { Message } from './types';

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
}

// Function to convert URLs in text to clickable links
function linkifyText(text: string): React.ReactNode {
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800 break-all"
          onClick={(e) => e.stopPropagation()} // Prevent any parent click handlers
        >
          {part}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
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
            <div className="text-sm whitespace-pre-wrap">
              {message.role === 'user' ? (
                message.content
              ) : (
                // For assistant messages, convert URLs to clickable links
                message.content.split('\n').map((line, lineIndex) => (
                  <React.Fragment key={lineIndex}>
                    {lineIndex > 0 && <br />}
                    {linkifyText(line)}
                  </React.Fragment>
                ))
              )}
            </div>
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


