'use client'

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Globe, User, Mail, Phone } from 'lucide-react';
import { auth, googleProvider } from '@/lib/firebase';
import { onAuthStateChanged, signInWithPopup, User as FirebaseUser } from 'firebase/auth';
import Image from 'next/image';

type Language = 'en' | 'it' | 'fr' | 'de' | 'ar' | 'zh' | 'es';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'trullo';
  timestamp: Date;
  language?: Language;
}

const translations = {
  en: {
    welcome: "👋 Welcome! I'm Trullo, your AI investment assistant for Puglia.",
    loginPrompt: "To provide personalized assistance, please sign in:",
    whatsappCTA: "💬 Continue on WhatsApp",
    emailSummary: "📧 Email conversation summary",
    typing: "Trullo is typing...",
    placeholder: "Ask about investments, grants, properties...",
    signIn: "Sign in with Google",
    signOut: "Sign out",
    languages: "Languages",
    sendEmail: "Send Summary to Email",
    startChat: "Start a conversation about your investment plans"
  },
  it: {
    welcome: "👋 Benvenuto! Sono Trullo, il tuo assistente AI per gli investimenti in Puglia.",
    loginPrompt: "Per un'assistenza personalizzata, accedi:",
    whatsappCTA: "💬 Continua su WhatsApp",
    emailSummary: "📧 Email riassunto conversazione",
    typing: "Trullo sta scrivendo...",
    placeholder: "Chiedi su investimenti, sovvenzioni, proprietà...",
    signIn: "Accedi con Google",
    signOut: "Esci",
    languages: "Lingue",
    sendEmail: "Invia Riassunto via Email",
    startChat: "Inizia una conversazione sui tuoi piani di investimento"
  },
  es: {
    welcome: "👋 ¡Bienvenido! Soy Trullo, tu asistente de IA para inversiones en Puglia.",
    loginPrompt: "Para asistencia personalizada, inicia sesión:",
    whatsappCTA: "💬 Continuar en WhatsApp",
    emailSummary: "📧 Enviar resumen por correo",
    typing: "Trullo está escribiendo...",
    placeholder: "Pregunta sobre inversiones, subvenciones, propiedades...",
    signIn: "Iniciar sesión con Google",
    signOut: "Cerrar sesión",
    languages: "Idiomas",
    sendEmail: "Enviar Resumen por Correo",
    startChat: "Comienza una conversación sobre tus planes de inversión"
  },
  fr: {
    welcome: "👋 Bienvenue! Je suis Trullo, votre assistant IA pour les investissements en Puglia.",
    loginPrompt: "Pour une assistance personnalisée, connectez-vous:",
    whatsappCTA: "💬 Continuer sur WhatsApp",
    emailSummary: "📧 Envoyer le résumé par email",
    typing: "Trullo écrit...",
    placeholder: "Demandez sur les investissements, subventions, propriétés...",
    signIn: "Se connecter avec Google",
    signOut: "Se déconnecter",
    languages: "Langues",
    sendEmail: "Envoyer le Résumé par Email",
    startChat: "Commencez une conversation sur vos projets d'investissement"
  },
  de: {
    welcome: "👋 Willkommen! Ich bin Trullo, Ihr KI-Investitionsassistent für Apulien.",
    loginPrompt: "Für personalisierte Unterstützung melden Sie sich an:",
    whatsappCTA: "💬 Auf WhatsApp fortfahren",
    emailSummary: "📧 Zusammenfassung per E-Mail",
    typing: "Trullo schreibt...",
    placeholder: "Fragen zu Investitionen, Zuschüssen, Immobilien...",
    signIn: "Mit Google anmelden",
    signOut: "Abmelden",
    languages: "Sprachen",
    sendEmail: "Zusammenfassung per E-Mail senden",
    startChat: "Beginnen Sie ein Gespräch über Ihre Investitionspläne"
  },
  ar: {
    welcome: "👋 مرحباً! أنا ترولو، مساعدك الذكي للاستثمار في بوليا.",
    loginPrompt: "للحصول على مساعدة شخصية، يرجى تسجيل الدخول:",
    whatsappCTA: "💬 المتابعة على واتساب",
    emailSummary: "📧 إرسال الملخص بالبريد الإلكتروني",
    typing: "ترولو يكتب...",
    placeholder: "اسأل عن الاستثمارات والمنح والعقارات...",
    signIn: "تسجيل الدخول مع جوجل",
    signOut: "تسجيل الخروج",
    languages: "اللغات",
    sendEmail: "إرسال الملخص بالبريد الإلكتروني",
    startChat: "ابدأ محادثة حول خطط الاستثمار الخاصة بك"
  },
  zh: {
    welcome: "👋 欢迎！我是Trullo，您在普利亚的AI投资助手。",
    loginPrompt: "要获得个性化帮助，请登录：",
    whatsappCTA: "💬 在WhatsApp上继续",
    emailSummary: "📧 通过电子邮件发送摘要",
    typing: "Trullo正在输入...",
    placeholder: "询问投资、补助、房产...",
    signIn: "使用Google登录",
    signOut: "退出",
    languages: "语言",
    sendEmail: "通过电子邮件发送摘要",
    startChat: "开始关于您投资计划的对话"
  }
};

const WHATSAPP_NUMBER = '447862140269'; // Twilio WhatsApp Business number

export default function TrulloEnhanced() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Auto-open after delay - wait for auth to be checked
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted && !isOpen) {
        setIsOpen(true);
        addWelcomeMessage();
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [user]); // Re-run when user state changes

  // Detect language
  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('it')) setCurrentLang('it');
    else if (browserLang.startsWith('es')) setCurrentLang('es');
    else if (browserLang.startsWith('fr')) setCurrentLang('fr');
    else if (browserLang.startsWith('de')) setCurrentLang('de');
    else if (browserLang.startsWith('ar')) setCurrentLang('ar');
    else if (browserLang.startsWith('zh')) setCurrentLang('zh');
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addWelcomeMessage = () => {
    const welcomeMsg: Message = {
      id: Date.now().toString(),
      text: translations[currentLang].welcome,
      sender: 'trullo',
      timestamp: new Date()
    };
    
    setMessages([welcomeMsg]);
    
    // Only show login prompt if auth has loaded AND user is not logged in
    if (!authLoading && !user) {
      setTimeout(() => {
        const loginMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: translations[currentLang].loginPrompt,
          sender: 'trullo',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, loginMsg]);
      }, 1500);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      language: currentLang
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Call OpenAI API
    try {
      const response = await fetch('/api/trullo/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputText,
          language: currentLang,
          userId: user?.uid,
          userEmail: user?.email,
          conversationHistory: messages.slice(-10)
        })
      });

      const data = await response.json();
      
      const trulloMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'trullo',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, trulloMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const sendEmailSummary = async () => {
    if (!user?.email) return;

    try {
      await fetch('/api/trullo/email-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: user.email,
          conversation: messages,
          language: currentLang
        })
      });
      alert('Conversation summary sent to your email!');
    } catch (error) {
      console.error('Error sending email summary:', error);
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(`Hi, I'd like to continue our conversation about investing in Puglia.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Main Chat Button - Always Visible */}
      <div className={`fixed bottom-6 right-6 z-50 ${isOpen ? 'hidden' : 'block'}`}>
        <button
          onClick={() => {
            setIsOpen(true);
            setHasInteracted(true);
            if (messages.length === 0) addWelcomeMessage();
          }}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
          7
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={openWhatsApp}
          className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2"
        >
          <Image src="/icon/whatsapp.png" alt="WhatsApp" width={32} height={32} />
          <span className="hidden md:block font-semibold">Chat on WhatsApp</span>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Trullo AI Assistant</h3>
                <p className="text-xs opacity-90">Speaks 7 languages</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <Globe className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Language Menu */}
          {showLanguageMenu && (
            <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-2 z-60">
              {Object.keys(translations).map(lang => (
                <button
                  key={lang}
                  onClick={() => {
                    setCurrentLang(lang as Language);
                    setShowLanguageMenu(false);
                  }}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 rounded ${
                    currentLang === lang ? 'bg-green-50 text-green-600' : ''
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          {/* User Status Bar */}
          {user && (
            <div className="bg-green-50 px-4 py-2 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">{user.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                {translations[currentLang].signOut}
              </button>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl">
                  <p className="text-sm italic">{translations[currentLang].typing}</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Login Prompt */}
          {!user && (
            <div className="p-4 bg-yellow-50 border-t">
              <button
                onClick={handleSignIn}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Image src="/icon/google.png" alt="Google" width={20} height={20} />
                {translations[currentLang].signIn}
              </button>
            </div>
          )}

          {/* Input Area */}
          {user && (
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder={translations[currentLang].placeholder}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={sendMessage}
                  className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={openWhatsApp}
                  className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-green-600 transition flex items-center justify-center gap-1"
                >
                  <Phone className="w-4 h-4" />
                  {translations[currentLang].whatsappCTA}
                </button>
                <button
                  onClick={sendEmailSummary}
                  className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-600 transition flex items-center justify-center gap-1"
                >
                  <Mail className="w-4 h-4" />
                  {translations[currentLang].sendEmail}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}