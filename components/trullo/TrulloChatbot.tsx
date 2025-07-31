// PATH: components/trullo/TrulloChatbot.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Language, TrulloChatbotProps, Message } from './types';
import { translations } from './constants/translations';
import { useChat } from './hooks/useChat';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import ContactForm from './ContactForm';
import { sendEmailMessage, saveContactRequest } from './utils/api';

export default function TrulloChatbot({ language = 'en' }: TrulloChatbotProps) {
  // Check if mobile on mount
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(language);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false); // For button entrance animation
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  
  // Swipe handling refs
  const chatRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  
  // Load user preference on mount
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('trullo-chat-state');
      if (savedState === 'open') {
        setIsOpen(true);
      }
      
      // Show button with animation after a short delay
      setTimeout(() => {
        setIsButtonVisible(true);
      }, 500);
    }
  }, []);
  
  // Save user preference when state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('trullo-chat-state', isOpen ? 'open' : 'closed');
    }
  }, [isOpen]);
  
  // Detect mobile/desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Handle swipe to close on mobile
  useEffect(() => {
    if (!isMobile || !isOpen || !chatRef.current) return;
    
    const element = chatRef.current;
    let startY = 0;
    let currentY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      touchStartY.current = startY;
      setIsDragging(true);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      
      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      
      // Only allow downward swipe
      if (deltaY > 0) {
        setDragOffset(deltaY);
      }
    };
    
    const handleTouchEnd = () => {
      setIsDragging(false);
      
      // Close if swiped down more than 100px
      if (dragOffset > 100) {
        setIsOpen(false);
      }
      
      setDragOffset(0);
    };
    
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, isOpen, isDragging, dragOffset]);
  
  const {
    messages,
    isTyping,
    sessionId,
    conversationId,
    authState,
    sendMessage,
    closeChat
  } = useChat(isOpen, currentLang);

  const t = translations[currentLang];

  // Handle automated email sending
  useEffect(() => {
    const handleAutoEmail = async (event: CustomEvent) => {
      const { name, email, message } = event.detail;
      
      try {
        console.log('Sending automated email for:', name, email);
        
        // Get conversation history
        const conversationHistory = messages.map(m => 
          `${m.role === 'user' ? 'User' : 'Trullo'}: ${m.content}`
        ).join('\n\n');

        // Save to Supabase
        if (conversationId) {
          await saveContactRequest(conversationId, {
            name,
            email,
            phone: '',
            message
          }, currentLang);
        }

        // Send email
        await sendEmailMessage({
          name,
          email,
          phone: '',
          message: `Automated message from chat:\n\n${message}\n\n---\nFull conversation:\n${conversationHistory}`
        }, currentLang);

        console.log('Automated email sent successfully!');
      } catch (error) {
        console.error('Failed to send automated email:', error);
      }
    };

    // Properly typed event listener wrapper
    const eventListener = (event: Event) => {
      handleAutoEmail(event as CustomEvent);
    };

    window.addEventListener('trullo-auto-email', eventListener);
    return () => {
      window.removeEventListener('trullo-auto-email', eventListener);
    };
  }, [conversationId, currentLang, messages]);

  const handleCloseChat = () => {
    closeChat();
    setIsOpen(false);
  };

  const handleContactFormSuccess = () => {
    const successMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: t.messageForm.success,
      timestamp: new Date()
    };
    
    // Add success message to chat (this will trigger re-render with updated messages)
    setShowMessageForm(false);
  };

  return (
    <>
      {/* Chat Button - Only show when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`
            fixed z-50 rounded-full shadow-xl transition-all duration-300 
            bg-gradient-to-r from-purple-600 to-emerald-600 
            hover:shadow-2xl hover:scale-110 active:scale-95
            ${isMobile 
              ? 'bottom-4 right-4 p-3' 
              : 'bottom-8 right-8 p-4'
            }
            ${isButtonVisible 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-0 translate-y-10'
            }
          `}
          aria-label="Open chat"
          style={{
            transition: 'opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
          }}
        >
          <div className="relative">
            <img 
              src="/trullo.png" 
              alt="Chat with Trullo"
              className={`object-contain ${isMobile ? 'w-10 h-10' : 'w-8 h-8'}`}
              onError={(e) => {
                // Fallback if image doesn't load
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `
                  <svg class="${isMobile ? 'w-10 h-10' : 'w-8 h-8'} text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                `;
              }}
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </button>
      )}

      {/* Chat Window - Responsive positioning */}
      {isOpen && (
        <div 
          ref={chatRef}
          className={`
            fixed z-50 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden 
            transition-all duration-300
            ${currentLang === 'ar' ? 'rtl' : 'ltr'}
            ${isMobile 
              ? 'inset-x-4 bottom-0 h-[70vh] rounded-b-none' 
              : 'bottom-4 left-1/2 transform -translate-x-1/2 w-96 h-[500px]'
            }
            ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          `}
          style={{
            transform: isMobile 
              ? `translateY(${dragOffset}px)` 
              : 'translateX(-50%)',
            transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Swipe Indicator for Mobile */}
          {isMobile && (
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full" />
          )}
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-emerald-600 p-4 md:p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className={`bg-white rounded-full flex items-center justify-center shadow-md ${isMobile ? 'w-10 h-10 p-1' : 'w-12 h-12 p-1'}`}>
                  <img 
                    src="/trullo.png" 
                    alt="Trullo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '🤖';
                    }}
                  />
                </div>
                <div>
                  <h3 className={`font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>{t.title}</h3>
                  <p className={`text-white/80 ${isMobile ? 'text-xs hidden' : 'text-sm'}`}>
                    {t.subtitle}
                    {authState.isGiuseppe && (
                      <span className="block text-xs text-yellow-300 mt-1">
                        👑 Boss Mode Active
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Close/Minimize Button - Larger on mobile */}
                <button
                  onClick={() => setIsOpen(false)}
                  className={`
                    bg-white/20 hover:bg-white/30 rounded-full transition-colors
                    ${isMobile ? 'p-2' : 'p-1'}
                  `}
                  aria-label="Close chat"
                >
                  <svg className={`text-white ${isMobile ? 'w-6 h-6' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobile ? (
                      // X icon for mobile (close)
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      // Chevron down for desktop (minimize)
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    )}
                  </svg>
                </button>
                {/* Language Selector - Hidden on mobile in header */}
                {!isMobile && (
                  <select
                    value={currentLang}
                    onChange={(e) => setCurrentLang(e.target.value as Language)}
                    className="bg-white/20 text-white border border-white/30 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="en">🇬🇧 EN</option>
                    <option value="it">🇮🇹 IT</option>
                    <option value="es">🇪🇸 ES</option>
                    <option value="fr">🇫🇷 FR</option>
                    <option value="de">🇩🇪 DE</option>
                    <option value="ar">🇸🇦 AR</option>
                    <option value="zh">🇨🇳 ZH</option>
                  </select>
                )}
              </div>
            </div>
            
            {/* Mobile Language Selector - Below header */}
            {isMobile && (
              <div className="mt-3">
                <select
                  value={currentLang}
                  onChange={(e) => setCurrentLang(e.target.value as Language)}
                  className="w-full bg-white/20 text-white border border-white/30 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="en">🇬🇧 English</option>
                  <option value="it">🇮🇹 Italiano</option>
                  <option value="es">🇪🇸 Español</option>
                  <option value="fr">🇫🇷 Français</option>
                  <option value="de">🇩🇪 Deutsch</option>
                  <option value="ar">🇸🇦 العربية</option>
                  <option value="zh">🇨🇳 中文</option>
                </select>
              </div>
            )}
          </div>

          {/* Messages or Contact Form */}
          {showMessageForm ? (
            <ContactForm
              language={currentLang}
              conversationId={conversationId}
              onSuccess={handleContactFormSuccess}
              onCancel={() => setShowMessageForm(false)}
            />
          ) : (
            <>
              <ChatMessages 
                messages={messages} 
                isTyping={isTyping} 
              />
              
              <ChatInput
                language={currentLang}
                isTyping={isTyping}
                onSend={sendMessage}
                onLeaveMessage={() => setShowMessageForm(true)}
              />
            </>
          )}
          
          {/* Mobile Safe Area Bottom Padding */}
          {isMobile && (
            <div className="h-safe-area-inset-bottom bg-white" />
          )}
        </div>
      )}
    </>
  );
}
