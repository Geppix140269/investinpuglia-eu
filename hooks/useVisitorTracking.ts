// PATH: hooks/useVisitorTracking.ts
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface VisitorData {
  page: string;
  referrer: string;
  duration: number;
  timestamp: number;
  sessionId: string;
}

export function useVisitorTracking() {
  const pathname = usePathname();
  const startTime = useRef<number>(Date.now());
  const sessionId = useRef<string>('');
  const lastPage = useRef<string>('');
  
  useEffect(() => {
    // Generate or retrieve session ID
    if (!sessionId.current) {
      sessionId.current = localStorage.getItem('visitor_session_id') || 
                         `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('visitor_session_id', sessionId.current);
    }
    
    // Track page view
    const trackPageView = async () => {
      const duration = lastPage.current ? Math.round((Date.now() - startTime.current) / 1000) : 0;
      
      const visitorData: VisitorData = {
        page: pathname,
        referrer: document.referrer || 'Direct',
        duration,
        timestamp: Date.now(),
        sessionId: sessionId.current,
      };
      
      try {
        // Send to our tracking API
        await fetch('/api/visitor-tracking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(visitorData),
        });
        
        // Also send basic info to Trullo Telegram if it's a new session
        const isNewSession = !sessionStorage.getItem('trullo_session_tracked');
        if (isNewSession) {
          sessionStorage.setItem('trullo_session_tracked', 'true');
          
          // Get browser info
          const browserInfo = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screenResolution: `${screen.width}x${screen.height}`,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          };
          
          // Get device type
          const isMobile = /Mobile|Android|iPhone/i.test(navigator.userAgent);
          const isTablet = /Tablet|iPad/i.test(navigator.userAgent);
          const device = isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop';
          
          // Get browser name
          const getBrowser = () => {
            const ua = navigator.userAgent;
            if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
            if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
            if (ua.includes('Firefox')) return 'Firefox';
            if (ua.includes('Edg')) return 'Edge';
            if (ua.includes('Opera')) return 'Opera';
            return 'Other';
          };
          
          // Try to get location from IP (this will be done server-side)
          const locationResponse = await fetch('https://ipapi.co/json/');
          const locationData = await locationResponse.json();
          
          // Send enhanced session data to Trullo Telegram
          await fetch('/api/trullo-telegram', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'new_session',
              data: {
                sessionId: sessionId.current,
                currentPage: pathname,
                referrer: document.referrer || 'Direct',
                device,
                browser: getBrowser(),
                screenResolution: browserInfo.screenResolution,
                viewport: browserInfo.viewport,
                language: browserInfo.language,
                timezone: browserInfo.timezone,
                userAgent: browserInfo.userAgent,
                chatLanguage: localStorage.getItem('trullo_language') || 'en',
                started_at: new Date().toISOString(),
                // Location data from IP
                ip: locationData.ip || 'Unknown',
                city: locationData.city || 'Unknown',
                region: locationData.region || 'Unknown',
                country: locationData.country_name || 'Unknown',
                countryCode: locationData.country_code || 'XX',
                latitude: locationData.latitude || 0,
                longitude: locationData.longitude || 0,
              }
            }),
          });
        }
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
      
      // Update tracking variables
      lastPage.current = pathname;
      startTime.current = Date.now();
    };
    
    trackPageView();
    
    // Track time on page when leaving
    const handleBeforeUnload = () => {
      const duration = Math.round((Date.now() - startTime.current) / 1000);
      
      // Use sendBeacon for reliable tracking on page leave
      const data = JSON.stringify({
        page: pathname,
        referrer: document.referrer || 'Direct',
        duration,
        timestamp: Date.now(),
        sessionId: sessionId.current,
      });
      
      navigator.sendBeacon('/api/visitor-tracking', data);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);
  
  // Function to track custom events
  const trackEvent = async (eventName: string, eventData?: any) => {
    try {
      await fetch('/api/visitor-tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'event',
          event: eventName,
          data: eventData,
          page: pathname,
          sessionId: sessionId.current,
          timestamp: Date.now(),
        }),
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };
  
  return {
    trackEvent,
    sessionId: sessionId.current,
  };
}