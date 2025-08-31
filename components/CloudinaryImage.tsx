'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: 'auto' | 'auto:best' | 'auto:good' | 'auto:eco' | 'auto:low' | number;
  crop?: 'fill' | 'fit' | 'limit' | 'pad' | 'scale' | 'thumb';
  gravity?: 'auto' | 'face' | 'faces' | 'center';
  responsive?: boolean;
  lazy?: boolean;
  placeholder?: 'blur' | 'empty' | 'tracedSVG';
}

// Map local paths to Cloudinary URLs
const imageMap: Record<string, string> = {
  "/projects/bb-blue-otranto-view.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/projects/bb-blue-otranto-view",
  "/projects/bb-blue-otranto-pool.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/projects/bb-blue-otranto-pool",
  "/projects/donna-menga-exterior.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/projects/donna-menga-exterior",
  "/projects/riva-marina-bar.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/projects/riva-marina-bar",
  "/projects/riva-marina-exterior.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/projects/riva-marina-exterior",
  "/projects/santa-lucia-pool.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/projects/santa-lucia-pool",
  "/projects/santa-lucia-wedding.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/projects/santa-lucia-wedding",
  "/projects/baglioni-pool.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/projects/baglioni-pool",
  "/projects/baglioni-room.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/projects/baglioni-room",
  "/EN_co_fundedvertical_RGB_POS.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/en_co_fundedvertical_rgb_pos",
  "/CAPITALIMPRESE-min.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/capitalimprese-min",
  "/Giuseppe Funaro 062025.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/giuseppe-funaro-062025",
  "/Hero_BG.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/hero_bg",
  "/LOGO-REGIONE-PUGLIA-PNG.webp": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/logo-regione-puglia-png",
  "/ITC-min.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/itc-min",
  "/Logo_InvestInPuglia_Black.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/logo_investinpuglia_black",
  "/Logo_InvestInPuglia_Morph.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/logo_investinpuglia_morph",
  "/Logo_InvestInPuglia_Teal.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/logo_investinpuglia_teal",
  "/Logo_InvestInPuglia_White.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/logo_investinpuglia_white",
  "/giuseppe-photo.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/giuseppe-photo",
  "/quarta-photo.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/quarta-photo",
  "/russo-photo.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/russo-photo",
  "/regione_puglia-Photoroom.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/regione_puglia-photoroom",
  "/capitalimprese_text.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/capitalimprese_text",
  "/og-image.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/og-image",
  "/images/industries/hotels-puglia.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/images/industries/hotels-puglia",
  "/images/industries/manufacturing-puglia.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/images/industries/manufacturing-puglia",
  "/images/industries/restaurants-puglia.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/images/industries/restaurants-puglia",
  "/images/industries/trulli-alberobello.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/images/industries/trulli-alberobello",
  "/images/locations/trulli-alberobello.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/images/locations/trulli-alberobello",
  "/images/locations/brindisi-thumb.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/images/locations/brindisi-thumb",
  "/images/locations/bari-thumb.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/images/locations/bari-thumb",
  "/images/locations/lecce-thumb.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/images/locations/lecce-thumb",
  "/images/locations/polignano-a-mare-thumb.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/images/locations/polignano-a-mare-thumb",
  "/images/locations/taranto-thumb.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/images/locations/taranto-thumb",
  "/images/locations/ostuni-thumb.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/images/locations/ostuni-thumb"
};

// Icon URLs with automatic optimization
const iconMap: Record<string, string> = {
  "/icon/Bell.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/bell",
  "/icon/Gavel.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/gavel",
  "/icon/Euro.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/euro",
  "/icon/HouseArrowUP.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/housearrowup",
  "/icon/Hammer.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/hammer",
  "/icon/Gear.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/gear",
  "/icon/MapPin.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/mappin",
  "/icon/MagnifyingGlass.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/magnifyingglass",
  "/icon/LockKeyhole.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/lockkeyhole",
  "/icon/SpeechBubble.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/speechbubble",
  "/icon/Shield.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/shield",
  "/icon/User.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/user",
  "/icon/UpwardArrow.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/upwardarrow",
  "/icon/TrulloHouse.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/trullohouse",
  "/icon/Speedometer.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/speedometer",
  "/icon/Villa.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/villa",
  "/icon/alert.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/alert",
  "/icon/calendar.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/calendar",
  "/icon/calculator.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/calculator",
  "/icon/check.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/check",
  "/icon/chart.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/chart",
  "/icon/crown.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/crown",
  "/icon/globe.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/globe",
  "/icon/document.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/document",
  "/icon/mail.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/mail",
  "/icon/smartphone.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/smartphone",
  "/icon/whatsapp.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/whatsapp",
  "/icon/triangularFlag.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_64/investinpuglia/investinpuglia/icon/triangularflag"
};

export function CloudinaryImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes,
  quality = 'auto:best',
  crop = 'fill',
  gravity = 'auto',
  responsive = true,
  lazy = !priority,
  placeholder = 'blur'
}: CloudinaryImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const [placeholderSrc, setPlaceholderSrc] = useState<string>('');
  
  // Get Cloudinary URL or use original
  const cloudinarySrc = imageMap[src] || iconMap[src] || src;
  
  // Simple optimization for Cloudinary URLs
  useEffect(() => {
    if (cloudinarySrc.includes('cloudinary.com')) {
      // Already a Cloudinary URL, use as is
      setCurrentSrc(cloudinarySrc);
    } else {
      // Use local image
      setCurrentSrc(cloudinarySrc);
    }
    
    // Generate simple placeholder
    if (placeholder === 'blur' && lazy) {
      setPlaceholderSrc('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2NjYyIvPjwvc3ZnPg==');
    }
  }, [cloudinarySrc, lazy, placeholder]);
  
  const imageProps = {
    src: currentSrc || cloudinarySrc,
    alt,
    priority,
    className: `
      duration-700 ease-in-out
      ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
    `,
    onLoad: () => setIsLoading(false),
    ...(placeholder === 'blur' && placeholderSrc && {
      placeholder: 'blur' as const,
      blurDataURL: placeholderSrc
    }),
    ...(lazy && !priority && { loading: 'lazy' as const })
  };

  return (
    <div className={`relative ${className}`}>
      {fill ? (
        <Image
          {...imageProps}
          fill
          sizes={sizes || "(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, (max-width: 1280px) 70vw, 60vw"}
        />
      ) : (
        <Image
          {...imageProps}
          width={width || 800}
          height={height || 600}
          sizes={sizes || "(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw"}
        />
      )}
    </div>
  );
}

export default CloudinaryImage;