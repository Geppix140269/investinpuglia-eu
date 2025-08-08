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
import { isIPBlocked, getBlockedMessage } from './utils/ipBlocker';
// Import Firebase auth from your existing setup
import { auth, googleProvider } from '@/lib/firebase';
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';

export default function TrulloChatbot({ language = 'en' }: TrulloChatbotProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(language);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const chatRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const touchStartTime = useRef<number>(0);

  // Check Firebase authentication status on mount and when chat opens
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          console.log('Redirect login successful:', result.user.email);
          setIsAuthenticated(true);
          setUserEmail(result.user.email || undefined);
        }
      } catch (error) {
        console.error('Redirect result error:', error);
      }
    };

    checkRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user?.email || 'not authenticated');
      if (user) {
        setIsAuthenticated(true);
        setUserEmail(user.email || undefined);
        setAuthError(null);
      } else {
        setIsAuthenticated(false);
        setUserEmail(undefined);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Load user preference and auto-open on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasUserClosed = localStorage.getItem('trullo-user-closed') === 'true';
      const savedState = localStorage.getItem('trullo-chat-state');

      if (!hasUserClosed && window.location.pathname === '/') {
        setTimeout(() => {
          setIsOpen(true);
        }, 3000);
      } else if (savedState === 'open') {
        setIsOpen(true);
      }

      setTimeout(() => {
        setIsButtonVisible(true);
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('trullo-chat-state', isOpen ? 'open' : 'closed');
    }
  }, [isOpen]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Swipe to close handler (unchanged)
  useEffect(() => {
    if (!isMobile || !isOpen || !chatRef.current) return;

    const element = chatRef.current;
    let startY = 0;
    let currentY = 0;
    let startedInHeader = false;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect = element.getBoundingClientRect();
      const relativeY = touch.clientY - rect.top;
      
      if (relativeY <= 80) {
        startedInHeader = true;
        startY = touch.clientY;
        touchStartY.current = startY;
        touchStartTime.current = Date.now();
        setIsDragging(true);
      } else {
        startedInHeader = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !startedInHeader) return;
      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      if (deltaY > 0) {
        const resistance = 0.8;
        setDragOffset(deltaY * resistance);
      }
    };

    const handleTouchEnd = () => {
      if (!startedInHeader) {
        setIsDragging(false);
        return;
      }

      setIsDragging(false);
      const swipeDuration = Date.now() - touchStartTime.current;
      const swipeVelocity = dragOffset / swipeDuration;

      if (dragOffset > 150 || (dragOffset > 50 && swipeVelocity > 0.5)) {
        handleUserClose();
      }

      setDragOffset(0);
      startedInHeader = false;
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

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

  // Initialize session and visitor tracking (unchanged)
  useEffect(() => {
    if (isOpen && !sessionId) {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const getVisitorInfo = async () => {
        try {
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();
          
          sessionStorage.setItem('userIP', data.ip || 'Unknown');
          sessionStorage.setItem('userCity', data.city || 'Unknown');
          sessionStorage.setItem('userCountry', data.country_name || 'Unknown');
          
          if (isIPBlocked && isIPBlocked(data.ip)) {
            setIsBlocked(true);
            await fetch('/api/trullo-telegram', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'bot_detected',
                data: {
                  ip: data.ip,
                  city: data.city || 'Unknown',
                  country: data.country_name || 'Unknown',
                  score: 10,
                  reasons: ['IP is on blocklist', 'Access denied']
                }
              })
            });
            return;
          }
          
          await fetch('/api/trullo-telegram', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'new_session',
              data: {
                sessionId: newSessionId,
                ip: data.ip,
                city: data.city,
                region: data.region,
                country: data.country_name,
                countryCode: data.country,
                timezone: data.timezone,
                device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
                browser: getBrowserName(),
                screenResolution: `${window.screen.width}x${window.screen.height}`,
                viewport: `${window.innerWidth}x${window.innerHeight}`,
                chatLanguage: currentLang,
                language: navigator.language,
                currentPage: window.location.pathname,
                referrer: document.referrer || 'Direct',
                started_at: new Date().toISOString(),
                userAgent: navigator.userAgent
              }
            })
          });
        } catch (error) {
          console.error('Failed to get visitor info:', error);
          sessionStorage.setItem('userIP', 'Unknown');
          sessionStorage.setItem('userCity', 'Unknown');
          sessionStorage.setItem('userCountry', 'Unknown');
        }
      };
      
      getVisitorInfo();
    }
  }, [isOpen, sessionId, currentLang]);

  // Handle automated email sending (unchanged)
  useEffect(() => {
    const handleAutoEmail = async (event: CustomEvent) => {
      const { name, email, message } = event.detail;

      try {
        console.log('Sending automated email for:', name, email);
        const conversationHistory = messages.map(m =>
          `${m.role === 'user' ? 'User' : 'Trullo'}: ${m.content}`
        ).join('\n\n');

        if (conversationId) {
          await saveContactRequest(conversationId, {
            name,
            email,
            phone: '',
            message
          }, currentLang);
        }

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
    setIsBlocked(false);
  };

  const handleUserClose = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('trullo-user-closed', 'true');
    }
  };

  const handleContactFormSuccess = () => {
    const successMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: t.messageForm.success,
      timestamp: new Date()
    };
    
    setShowMessageForm(false);
  };

  function getBrowserName() {
    const agent = navigator.userAgent;
    if (agent.indexOf('Chrome') > -1) return 'Chrome';
    if (agent.indexOf('Safari') > -1) return 'Safari';
    if (agent.indexOf('Firefox') > -1) return 'Firefox';
    if (agent.indexOf('Edge') > -1) return 'Edge';
    return 'Other';
  }

  const getWindowOpacity = () => {
    if (!isDragging || dragOffset <= 0) return 1;
    const opacity = Math.max(0, 1 - (dragOffset - 50) / 150);
    return opacity;
  };

  const handleGoogleLogin = async () => {
    try {
      setAuthError(null);
      setAuthLoading(true);
      
      // Try popup first (better UX on desktop)
      if (!isMobile) {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          console.log('Popup login successful:', result.user.email);
          setIsAuthenticated(true);
          setUserEmail(result.user.email || undefined);
        } catch (popupError: any) {
          // If popup blocked, fall back to redirect
          if (popupError.code === 'auth/popup-blocked' || 
              popupError.code === 'auth/cancelled-popup-request') {
            console.log('Popup blocked, using redirect...');
            await signInWithRedirect(auth, googleProvider);
          } else {
            throw popupError;
          }
        }
      } else {
        // Use redirect for mobile (more reliable)
        await signInWithRedirect(auth, googleProvider);
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setAuthError(error.message || 'Authentication failed. Please try again.');
      setAuthLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`
            fixed z-50 rounded-full shadow-xl transition-all duration-300
            bg-gradient-to-r from-purple-600 to-emerald-600
            hover:shadow-2xl hover:scale-110 active:scale-95
            ${isMobile ? 'bottom-4 right-4 p-3' : 'bottom-8 right-8 p-4'}
            ${isButtonVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-0 translate-y-10'}
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

      {isOpen && (
        <div
          ref={chatRef}
          className={`
            fixed z-50 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden
            transition-all duration-300
            ${currentLang === 'ar' ? 'rtl' : 'ltr'}
            ${isMobile ? 'inset-x-4 bottom-0 h-[70vh] rounded-b-none' : 'bottom-4 left-1/2 transform -translate-x-1/2 w-[480px] h-[500px]'}
            ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          `}
          style={{
            transform: isMobile ? `translateY(${dragOffset}px)` : 'translateX(-50%)',
            opacity: getWindowOpacity(),
            transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {isMobile && (
            <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center bg-gradient-to-b from-gray-100 to-transparent pointer-events-none">
              <div className="w-16 h-1.5 bg-gray-400 rounded-full shadow-sm" />
            </div>
          )}

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
                    {isAuthenticated && userEmail && (
                      <span className="block text-xs text-green-300 mt-1">
                        ✓ {userEmail}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUserClose}
                  className={`
                    bg-white/20 hover:bg-white/30 rounded-full transition-colors
                    ${isMobile ? 'p-2' : 'p-1'}
                  `}
                  aria-label="Close chat"
                >
                  <svg className={`text-white ${isMobile ? 'w-6 h-6' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobile ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    )}
                  </svg>
                </button>
                {!isMobile && (
                  <select
                    value={currentLang}
                    onChange={(e) => setCurrentLang(e.target.value as Language)}
                    className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 hover:bg-gray-600 cursor-pointer"
                    style={{ backgroundColor: '#374151', color: 'white' }}
                  >
                    <option value="en" style={{ backgroundColor: '#374151', color: 'white' }}>🇬🇧 EN</option>
                    <option value="it" style={{ backgroundColor: '#374151', color: 'white' }}>🇮🇹 IT</option>
                    <option value="es" style={{ backgroundColor: '#374151', color: 'white' }}>🇪🇸 ES</option>
                    <option value="fr" style={{ backgroundColor: '#374151', color: 'white' }}>🇫🇷 FR</option>
                    <option value="de" style={{ backgroundColor: '#374151', color: 'white' }}>🇩🇪 DE</option>
                    <option value="ar" style={{ backgroundColor: '#374151', color: 'white' }}>🇸🇦 AR</option>
                    <option value="zh" style={{ backgroundColor: '#374151', color: 'white' }}>🇨🇳 ZH</option>
                  </select>
                )}
              </div>
            </div>

            {isMobile && (
              <div className="mt-3">
                <select
                  value={currentLang}
                  onChange={(e) => setCurrentLang(e.target.value as Language)}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  style={{ backgroundColor: '#374151', color: 'white' }}
                >
                  <option value="en" style={{ backgroundColor: '#374151', color: 'white' }}>🇬🇧 English</option>
                  <option value="it" style={{ backgroundColor: '#374151', color: 'white' }}>🇮🇹 Italiano</option>
                  <option value="es" style={{ backgroundColor: '#374151', color: 'white' }}>🇪🇸 Español</option>
                  <option value="fr" style={{ backgroundColor: '#374151', color: 'white' }}>🇫🇷 Français</option>
                  <option value="de" style={{ backgroundColor: '#374151', color: 'white' }}>🇩🇪 Deutsch</option>
                  <option value="ar" style={{ backgroundColor: '#374151', color: 'white' }}>🇸🇦 العربية</option>
                  <option value="zh" style={{ backgroundColor: '#374151', color: 'white' }}>🇨🇳 中文</option>
                </select>
              </div>
            )}
          </div>

          {isBlocked ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <div className="text-6xl mb-4">🚫</div>
                <p className="text-gray-700 text-lg">{getBlockedMessage ? getBlockedMessage(currentLang) : 'Access restricted.'}</p>
                <p className="text-gray-500 text-sm mt-2">support@investinpuglia.eu</p>
              </div>
            </div>
          ) : showMessageForm ? (
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

              {/* Authentication Overlay - ALWAYS VISIBLE WHEN NOT AUTHENTICATED */}
              {!isAuthenticated && !authLoading && (
                <div className="absolute inset-0 bg-white/98 backdrop-blur-sm flex items-center justify-center z-20 rounded-2xl">
                  <div className="text-center p-8 max-w-sm">
                    <div className="mb-6">
                      <img 
                        src="/trullo.png" 
                        alt="Trullo" 
                        className="w-20 h-20 mx-auto mb-4"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = '🏛️';
                        }}
                      />
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {currentLang === 'en' ? 'Welcome to Premium Investment Advisory' : 
                         currentLang === 'it' ? 'Benvenuto nella Consulenza Premium' :
                         currentLang === 'es' ? 'Bienvenido a la Asesoría Premium' :
                         currentLang === 'fr' ? 'Bienvenue au Conseil Premium' :
                         currentLang === 'de' ? 'Willkommen bei Premium-Beratung' :
                         currentLang === 'ar' ? 'مرحباً بك في الاستشارات المتميزة' :
                         currentLang === 'zh' ? '欢迎来到高级投资咨询' :
                         'Welcome'}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {translations[currentLang].authRequired}
                      </p>
                    </div>
                    
                    {authError && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{authError}</p>
                      </div>
                    )}
                    
                    <button
                      onClick={handleGoogleLogin}
                      disabled={authLoading}
                      className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-6 rounded-lg border border-gray-300 transition-all transform hover:scale-105 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center justify-center gap-3">
                        {authLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                            <span>Authenticating...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            <span>
                              {currentLang === 'en' ? 'Continue with Google' : 
                               currentLang === 'it' ? 'Continua con Google' :
                               currentLang === 'es' ? 'Continuar con Google' :
                               currentLang === 'fr' ? 'Continuer avec Google' :
                               currentLang === 'de' ? 'Mit Google fortfahren' :
                               currentLang === 'ar' ? 'تابع مع Google' :
                               currentLang === 'zh' ? '使用Google继续' :
                               'Continue with Google'}
                            </span>
                          </>
                        )}
                      </div>
                    </button>
                    
                    <p className="text-xs text-gray-500 mt-4">
                      {currentLang === 'en' ? '🔒 Your data is secure and never shared' : 
                       currentLang === 'it' ? '🔒 I tuoi dati sono sicuri e mai condivisi' :
                       currentLang === 'es' ? '🔒 Tus datos están seguros' :
                       currentLang === 'fr' ? '🔒 Vos données sont sécurisées' :
                       currentLang === 'de' ? '🔒 Ihre Daten sind sicher' :
                       currentLang === 'ar' ? '🔒 بياناتك آمنة' :
                       currentLang === 'zh' ? '🔒 您的数据是安全的' :
                       '🔒 Secure & Private'}
                    </p>
                  </div>
                </div>
              )}

              {/* Loading overlay while checking auth */}
              {authLoading && (
                <div className="absolute inset-0 bg-white/98 backdrop-blur-sm flex items-center justify-center z-20 rounded-2xl">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Checking authentication...</p>
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 p-2 bg-white">
                <button
                  onClick={() => setShowMessageForm(true)}
                  className="w-full px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all flex items-center justify-center gap-2"
                  disabled={!isAuthenticated}
                >
                  📝 {t.leaveMessage || 'Leave a Message'}
                </button>
              </div>

              <ChatInput
                language={currentLang}
                isTyping={isTyping}
                onSend={sendMessage}
                disabled={!isAuthenticated}
              />

              {isMobile && (
                <div className="h-safe-area-inset-bottom bg-white" />
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
