// PATH: components/TrulloChatbot.tsx
'use client'
import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface TrulloChatbotProps {
  language?: 'en' | 'it';
}

// System prompt for Trullo - Invest in Puglia focus
const SYSTEM_PROMPT = `You are Trullo, a friendly and knowledgeable AI assistant for Invest in Puglia, a platform helping international investors access EU grants and investment opportunities in Puglia, Italy.

Your personality:
- Warm, helpful, and professional
- Expert in EU funding and grants
- Encouraging but realistic about requirements
- Use emojis sparingly for friendliness

Your expertise includes:
- PIA Turismo grants (up to 50% funding)
- EU funding programs and eligibility
- Investment procedures in Puglia
- Tax benefits and incentives (flat tax 7%, etc.)
- Property investment opportunities
- Business setup in Italy
- Legal and bureaucratic requirements
- Regional advantages of Puglia

Key information to share:
- PIA Turismo: 50% grant for tourism projects
- Tax benefits: 7% flat tax for retirees, 70% tax reduction for new residents
- Investment sectors: Tourism, Agriculture, Renewable Energy, Real Estate
- Minimum investments and requirements
- Timeline and application processes

Always:
- Be concise but thorough
- Mention specific grant percentages and benefits
- Suggest scheduling a consultation when appropriate
- Ask follow-up questions to understand investment goals
- Provide practical, actionable advice
- Reference investinpuglia.eu resources

Never:
- Give specific legal or tax advice without disclaimers
- Guarantee grant approval
- Make promises about ROI without context
- Share confidential application strategies`;

export default function TrulloChatbot({ language = 'en' }: TrulloChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: language === 'en' 
        ? `Ciao! I'm Trullo, your EU grants and investment assistant for Puglia 🇪🇺 I can help you discover funding opportunities up to 50% for your project. How can I assist you today?`
        : `Ciao! Sono Trullo, il tuo assistente per fondi UE e investimenti in Puglia 🇪🇺 Posso aiutarti a scoprire opportunità di finanziamento fino al 50% per il tuo progetto. Come posso assisterti?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Call our API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          system: SYSTEM_PROMPT,
          language: language
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: language === 'en' 
          ? `I'm having trouble connecting right now. Please try again in a moment, or contact us directly at info@investinpuglia.eu`
          : `Ho problemi di connessione al momento. Riprova tra poco o contattaci direttamente a info@investinpuglia.eu`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-xl transition-all duration-300 ${
          isOpen 
            ? 'bg-gray-600 hover:bg-gray-700' 
            : 'bg-gradient-to-r from-purple-600 to-emerald-600 hover:shadow-2xl hover:scale-110'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <img 
              src="/Trullo.png" 
              alt="Chat with Trullo"
              className="w-8 h-8 object-contain"
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-emerald-600 p-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 shadow-md">
                <img 
                  src="/Trullo.png" 
                  alt="Trullo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">Trullo</h3>
                <p className="text-sm text-white/80">
                  {language === 'en' ? 'Your EU Grants & Investment Assistant' : 'Il tuo assistente per fondi UE'}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
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

          {/* Input */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === 'en' ? 'Ask about EU grants...' : 'Chiedi sui fondi UE...'}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                disabled={isTyping}
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
              {language === 'en' 
                ? 'Powered by AI • Expert in EU Grants' 
                : 'Powered by AI • Esperto in fondi UE'
              }
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export { SYSTEM_PROMPT };
