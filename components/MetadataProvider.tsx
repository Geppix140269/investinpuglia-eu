// components/MetadataProvider.tsx
'use client';

import { useEffect } from 'react';
import { usePageMetadata } from '@/hooks/usePageMetadata';

export default function MetadataProvider() {
  const { metadata } = usePageMetadata();

  useEffect(() => {
    if (!metadata) return;

    // Update document title
    if (metadata.title) {
      document.title = metadata.title;
    }

    // Update meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attrName = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attrName}="${property}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, property);
        document.head.appendChild(element);
      }
      
      element.content = content;
    };

    // Standard meta tags
    if (metadata.description) {
      updateMetaTag('description', metadata.description);
    }
    
    if (metadata.keywords && metadata.keywords.length > 0) {
      updateMetaTag('keywords', metadata.keywords.join(', '));
    }

    // Open Graph meta tags
    if (metadata.ogTitle) {
      updateMetaTag('og:title', metadata.ogTitle, true);
    }
    
    if (metadata.ogDescription) {
      updateMetaTag('og:description', metadata.ogDescription, true);
    }
    
    if (metadata.ogImage) {
      updateMetaTag('og:image', metadata.ogImage, true);
      updateMetaTag('og:image:width', '1200', true);
      updateMetaTag('og:image:height', '630', true);
    }

    // Twitter meta tags
    if (metadata.twitterTitle) {
      updateMetaTag('twitter:title', metadata.twitterTitle);
    }
    
    if (metadata.twitterDescription) {
      updateMetaTag('twitter:description', metadata.twitterDescription);
    }
    
    if (metadata.twitterImage) {
      updateMetaTag('twitter:image', metadata.twitterImage);
    }
    
    updateMetaTag('twitter:card', 'summary_large_image');

    // Canonical URL
    if (metadata.canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = metadata.canonical;
    }

    // Structured data
    if (metadata.structuredData) {
      let script = document.querySelector('script[type="application/ld+json"].dynamic-metadata') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.className = 'dynamic-metadata';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(metadata.structuredData);
    }

    // Custom headers/meta tags
    if (metadata.customHeaders) {
      Object.entries(metadata.customHeaders).forEach(([name, content]) => {
        updateMetaTag(name, content);
      });
    }

  }, [metadata]);

  return null; // This component doesn't render anything
}