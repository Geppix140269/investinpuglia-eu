'use client';

import { useState, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';

interface FloatingCalendlyButtonProps {
  showAfterScroll?: number; // Pixels to scroll before showing
  hideOnPages?: string[]; // Pages where button should be hidden
}

export default function FloatingCalendlyButton({
  showAfterScroll = 300,
  hideOnPages = ['/consultation', '/book-consultation', '/consultation-success']
}: FloatingCalendlyButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    // Check if we're on a page where button should be hidden
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const hide = hideOnPages.some(page => currentPath.startsWith(page));
      setShouldHide(hide);

      // Check if user previously dismissed the button (session storage)
      const dismissed = sessionStorage.getItem('calendly_button_dismissed');
      if (dismissed === 'true') {
        setIsDismissed(true);
      }
    }

    const handleScroll = () => {
      if (window.scrollY > showAfterScroll && !isDismissed && !shouldHide) {
        setIsVisible(true);
      } else if (window.scrollY <= showAfterScroll) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterScroll, isDismissed, shouldHide, hideOnPages]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDismissed(true);
    sessionStorage.setItem('calendly_button_dismissed', 'true');

    // Track dismissal
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'floating_button_dismissed', {
        event_category: 'consultation',
        event_label: 'floating_cta'
      });
    }
  };

  const handleClick = () => {
    // Track click
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'floating_button_click', {
        event_category: 'consultation',
        event_label: 'floating_cta'
      });
    }
  };

  if (shouldHide || isDismissed) {
    return null;
  }

  return (
    <>
      {/* Desktop Version - Bottom Right */}
      <div
        className={`hidden lg:block fixed bottom-8 right-8 z-50 transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative group">
          {/* Dismiss Button */}
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Dismiss"
          >
            <X className="h-3 w-3" />
          </button>

          {/* Main Button */}
          <a
            href="https://calendly.com/investinpuglia/30min?utm_source=website&utm_medium=floating_button&utm_campaign=persistent_cta"
            onClick={handleClick}
            className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-bold"
          >
            <Calendar className="h-6 w-6" />
            <span className="whitespace-nowrap">Book FREE Consultation</span>
          </a>

          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20" />
        </div>
      </div>

      {/* Mobile Version - Bottom Center */}
      <div
        className={`lg:hidden fixed bottom-4 left-4 right-4 z-50 transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative">
          {/* Dismiss Button */}
          <button
            onClick={handleDismiss}
            className="absolute -top-3 -right-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full p-1.5 shadow-lg z-10"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Main Button */}
          <a
            href="https://calendly.com/investinpuglia/30min?utm_source=website&utm_medium=floating_button_mobile&utm_campaign=persistent_cta"
            onClick={handleClick}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-4 rounded-full shadow-2xl transition-all duration-300 font-bold text-center w-full"
          >
            <Calendar className="h-5 w-5" />
            <span>Book FREE Consultation</span>
          </a>
        </div>
      </div>
    </>
  );
}
