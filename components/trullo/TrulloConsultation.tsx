// components/trullo/TrulloConsultation.tsx
'use client'

import { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    trullo?: {
      open: () => void;
      close: () => void;
      sendMessage: (message: string) => void;
      onQualificationComplete?: (data: any) => void;
      onCalendlyRedirect?: () => void;
    };
    Calendly?: any;
  }
}

export default function TrulloConsultation() {
  useEffect(() => {
    // Set up Trullo configuration for consultation flow
    if (typeof window !== 'undefined') {
      window.trullo = window.trullo || {
        open: () => console.log('Opening Trullo'),
        close: () => console.log('Closing Trullo'),
        sendMessage: (msg: string) => console.log('Sending message:', msg)
      };

      // Handle qualification completion
      window.trullo.onQualificationComplete = (qualificationData) => {
        console.log('Qualification complete:', qualificationData);
        
        // Store qualification data
        if (qualificationData) {
          localStorage.setItem('consultation-qualification', JSON.stringify(qualificationData));
          localStorage.setItem('consultation-questions-answered', 'true');
          
          // Check if qualified (budget >= €200K and timeline <= 12 months)
          const isQualified = 
            qualificationData.budget !== 'Still determining budget' &&
            qualificationData.timeline !== 'Just exploring options';
          
          if (isQualified) {
            // Redirect to Calendly with pre-filled data
            redirectToCalendly(qualificationData);
          } else {
            // Show nurture message
            showNurtureOptions();
          }
        }
      };

      // Handle direct Calendly redirect
      window.trullo.onCalendlyRedirect = () => {
        const storedData = localStorage.getItem('consultation-qualification');
        const qualificationData = storedData ? JSON.parse(storedData) : {};
        redirectToCalendly(qualificationData);
      };
    }
  }, []);

  const redirectToCalendly = (data: any) => {
    // Build Calendly URL with UTM parameters and pre-filled data
    const calendlyUrl = new URL('https://calendly.com/investinpuglia/30min');
    
    // Add tracking parameters
    calendlyUrl.searchParams.append('utm_source', 'trullo_chat');
    calendlyUrl.searchParams.append('utm_medium', 'consultation_flow');
    calendlyUrl.searchParams.append('utm_campaign', 'free_consultation');
    
    // Add qualification data as custom questions (if supported by Calendly)
    if (data.budget) {
      calendlyUrl.searchParams.append('a1', data.budget); // Answer 1: Budget
    }
    if (data.timeline) {
      calendlyUrl.searchParams.append('a2', data.timeline); // Answer 2: Timeline
    }
    if (data.propertyType) {
      calendlyUrl.searchParams.append('a3', data.propertyType); // Answer 3: Property Type
    }
    if (data.location) {
      calendlyUrl.searchParams.append('a4', data.location); // Answer 4: Location
    }
    
    // Open Calendly in a new tab or embed
    if (window.Calendly) {
      // Use Calendly widget if available
      window.Calendly.initPopupWidget({
        url: calendlyUrl.toString()
      });
    } else {
      // Fallback to direct redirect
      window.open(calendlyUrl.toString(), '_blank');
    }
  };

  const showNurtureOptions = () => {
    // Send nurture message through Trullo
    if (window.trullo) {
      window.trullo.sendMessage(`
        Thank you for your interest! While you're still in the exploration phase, here are some resources to help you:
        
        📧 Join our investor newsletter for market updates
        📱 Download our Free Investment Guide
        🎯 Review our portfolio of success stories
        
        Your FREE consultation will be available whenever you're ready to move forward.
        
        Would you like to receive our investment guide via email?
      `);
    }
  };

  return (
    <>
      {/* Calendly Widget Script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Calendly widget loaded');
        }}
      />
      
      {/* Calendly Styles */}
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      
      {/* Hidden div for Calendly popup */}
      <div
        id="calendly-popup"
        style={{ display: 'none' }}
        data-url="https://calendly.com/investinpuglia/30min"
      />
    </>
  );
}