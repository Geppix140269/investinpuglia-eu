// PATH: components/TrulloChatbotWrapper.tsx
'use client'
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Lazy load TrulloChatbot to avoid SSR issues
const TrulloChatbot = dynamic(
  () => import('./trullo/TrulloChatbot'),
  { ssr: false }
);

type Language = 'en' | 'it' | 'fr' | 'de' | 'ar' | 'zh' | 'es';

// Language detection based on browser, URL, or IP locationT
function detectUserLanguage(): Language {
  // Check URL subdomain first (en., it., fr., etc.)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];
    
    const subdomainMap: Record<string, Language> = {
      'en': 'en',
      'it': 'it',
      'es': 'es',
      'fr': 'fr',
      'de': 'de',
      'ar': 'ar',
      'zh': 'zh'
    };
    
    if (subdomainMap[subdomain]) {
      return subdomainMap[subdomain];
    }
    
    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    
    // Map browser languages to our supported languages
    if (browserLang.startsWith('it')) return 'it';
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('de')) return 'de';
    if (browserLang.startsWith('ar')) return 'ar';
    if (browserLang.startsWith('zh')) return 'zh';
    
    // Check common country-specific language codes
    const countryLangMap: Record<string, Language> = {
      'en-us': 'en',
      'en-gb': 'en',
      'en-ca': 'en',
      'en-au': 'en',
      'es-es': 'es',
      'es-mx': 'es',
      'es-ar': 'es',
      'es-co': 'es',
      'fr-fr': 'fr',
      'fr-ca': 'fr',
      'de-de': 'de',
      'de-at': 'de',
      'de-ch': 'de',
      'it-it': 'it',
      'ar-sa': 'ar',
      'ar-ae': 'ar',
      'ar-eg': 'ar',
      'zh-cn': 'zh',
      'zh-tw': 'zh',
      'zh-hk': 'zh'
    };
    
    const fullLang = browserLang.toLowerCase();
    if (countryLangMap[fullLang]) {
      return countryLangMap[fullLang];
    }
  }
  
  // Default to English
  return 'en';
}

export default function TrulloChatbotWrapper() {
  const [language, setLanguage] = useState<Language>('en');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only run on client side
    setIsClient(true);
    const detectedLang = detectUserLanguage();
    setLanguage(detectedLang);
    
    // Optional: Save preference to localStorage
    const savedLang = localStorage.getItem('trullo-language') as Language;
    if (savedLang && ['en', 'it', 'es', 'fr', 'de', 'ar', 'zh'].includes(savedLang)) {
      setLanguage(savedLang);
    } else {
      localStorage.setItem('trullo-language', detectedLang);
    }
  }, []);

  // Don't render anything on server side
  if (!isClient) return null;

  return <TrulloChatbot language={language} />;
}
