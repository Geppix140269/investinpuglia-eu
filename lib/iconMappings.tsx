// lib/iconMappings.tsx
'use client'

import React from 'react'
import Image from 'next/image'

// Map icon names to your actual PNG files in /public/icon/
// All files are lowercase in the directory
export const iconMap: Record<string, string> = {
  // Common UI Icons
  'Menu': '/icon/hammer.png', // Using hammer as menu fallback
  'X': '/icon/alert.png', // Temporary fallback
  'ChevronDown': '/icon/triangularflag.png', // Temporary fallback
  'ChevronRight': '/icon/triangularflag.png', // Temporary fallback
  'ArrowRight': '/icon/triangularflag.png', // Temporary fallback
  'ArrowDown': '/icon/triangularflag.png', // Temporary fallback
  'ExternalLink': '/icon/upwardarrow.png',
  
  // Form & Input Icons
  'Check': '/icon/check.png',
  'AlertCircle': '/icon/alert.png',
  'AlertTriangle': '/icon/alert.png',
  'Info': '/icon/speechbubble.png',
  'Search': '/icon/magnifyingglass.png',
  
  // Communication Icons
  'Mail': '/icon/mail.png',
  'Phone': '/icon/smartphone.png',
  'MessageCircle': '/icon/whatsapp.png',
  'Calendar': '/icon/calendar.png',
  
  // Business & Finance Icons
  'Calculator': '/icon/calculator.png',
  'DollarSign': '/icon/euro.png',
  'Euro': '/icon/euro.png',
  'TrendingUp': '/icon/chart.png',
  'BarChart3': '/icon/chart.png',
  'PieChart': '/icon/chart.png',
  'Banknote': '/icon/euro.png',
  
  // Location & Property Icons
  'MapPin': '/icon/mappin.png',
  'Home': '/icon/trullohouse.png',
  'Building': '/icon/villa.png',
  'Building2': '/icon/housearrowup.png',
  
  // People & User Icons
  'User': '/icon/user.png',
  'Users': '/icon/user.png', // Using single user as fallback
  'UserCheck': '/icon/user.png',
  
  // Tools & Features Icons
  'Settings': '/icon/gear.png',
  'Wrench': '/icon/hammer.png',
  'FileText': '/icon/document.png',
  'Globe': '/icon/globe.png',
  'Shield': '/icon/shield.png',
  'Award': '/icon/crown.png',
  'Trophy': '/icon/crown.png',
  'Target': '/icon/magnifyingglass.png', // Using magnifying glass as target fallback
  'Sparkles': '/icon/crown.png', // Using crown as sparkles fallback
  'Star': '/icon/crown.png', // Using crown as star fallback
  'Heart': '/icon/crown.png', // Using crown as heart fallback
  'ThumbsUp': '/icon/check.png', // Using check as thumbs up fallback
  'Gift': '/icon/crown.png',
  'Bell': '/icon/bell.png',
  'Clock': '/icon/speedometer.png',
  'Eye': '/icon/magnifyingglass.png',
  'Download': '/icon/triangularflag.png', // Temporary fallback
  'Upload': '/icon/upwardarrow.png',
  'RefreshCw': '/icon/gear.png', // Using gear as refresh fallback
  'Zap': '/icon/speedometer.png',
  'Lock': '/icon/lockkeyhole.png',
  'Unlock': '/icon/lockkeyhole.png',
  'Key': '/icon/lockkeyhole.png',
  'CreditCard': '/icon/euro.png',
  'ShoppingCart': '/icon/euro.png', // Using euro as cart fallback
  'Package': '/icon/housearrowup.png', // Using house as package fallback
  'Truck': '/icon/speedometer.png', // Using speedometer as truck fallback
  'Compass': '/icon/mappin.png',
  'Flag': '/icon/triangularflag.png',
  'Bookmark': '/icon/triangularflag.png',
  'Tag': '/icon/triangularflag.png',
  'Hash': '/icon/gear.png',
  'Link': '/icon/magnifyingglass.png',
  'Paperclip': '/icon/document.png',
  'Filter': '/icon/gear.png',
  'SortAsc': '/icon/chart.png',
  'MoreVertical': '/icon/gear.png',
  'Plus': '/icon/upwardarrow.png',
  'Minus': '/icon/triangularflag.png',
  'Loader': '/icon/speedometer.png',
  'Send': '/icon/upwardarrow.png',
  'Inbox': '/icon/mail.png',
  'Archive': '/icon/document.png',
  'Trash': '/icon/alert.png',
  'Edit': '/icon/document.png',
  'Copy': '/icon/document.png',
  'Share': '/icon/upwardarrow.png',
  'Save': '/icon/document.png',
  'Folder': '/icon/document.png',
  'FolderOpen': '/icon/document.png',
  'Grid': '/icon/gear.png',
  'List': '/icon/document.png',
  'LayoutGrid': '/icon/gear.png',
  'Layers': '/icon/document.png',
  'ZoomIn': '/icon/magnifyingglass.png',
  'ZoomOut': '/icon/magnifyingglass.png',
  'Maximize': '/icon/upwardarrow.png',
  'Minimize': '/icon/triangularflag.png',
  'Move': '/icon/gear.png',
  'ChevronUp': '/icon/upwardarrow.png',
  'ChevronLeft': '/icon/triangularflag.png',
  'ChevronsUp': '/icon/upwardarrow.png',
  'ChevronsDown': '/icon/triangularflag.png',
  'ChevronsLeft': '/icon/triangularflag.png',
  'ChevronsRight': '/icon/triangularflag.png',
  'ArrowUp': '/icon/upwardarrow.png',
  'ArrowLeft': '/icon/triangularflag.png',
  'ArrowUpRight': '/icon/upwardarrow.png',
  'ArrowDownRight': '/icon/triangularflag.png',
  'ArrowDownLeft': '/icon/triangularflag.png',
  'ArrowUpLeft': '/icon/upwardarrow.png',
  'RotateCw': '/icon/gear.png',
  'RotateCcw': '/icon/gear.png',
  'HelpCircle': '/icon/speechbubble.png',
  'AlertOctagon': '/icon/alert.png',
  'Handshake': '/icon/user.png',
  'ClipboardList': '/icon/document.png',
  'Briefcase': '/icon/document.png',
  'BookOpen': '/icon/document.png',
  'Lightbulb': '/icon/crown.png',
  'Brain': '/icon/crown.png',
  'Cpu': '/icon/gear.png',
  'Database': '/icon/document.png',
  'Server': '/icon/gear.png',
  'Wifi': '/icon/speedometer.png',
  'WifiOff': '/icon/alert.png',
  'Cloud': '/icon/crown.png',
  'CloudOff': '/icon/alert.png',
  'Sun': '/icon/crown.png',
  'Moon': '/icon/crown.png',
  'Sunrise': '/icon/upwardarrow.png',
  'Sunset': '/icon/triangularflag.png',
  'Wind': '/icon/speedometer.png',
  'Droplets': '/icon/speedometer.png',
  'Thermometer': '/icon/speedometer.png',
  'Umbrella': '/icon/shield.png',
  'Mountain': '/icon/villa.png',
  'Trees': '/icon/villa.png',
  'Waves': '/icon/speedometer.png',
  'Anchor': '/icon/mappin.png',
  'Plane': '/icon/upwardarrow.png',
  'Car': '/icon/speedometer.png',
  'Bike': '/icon/speedometer.png',
  'Train': '/icon/speedometer.png',
  'Ship': '/icon/speedometer.png',
  'Navigation': '/icon/mappin.png',
  'Milestone': '/icon/triangularflag.png',
  'MapPinOff': '/icon/alert.png',
  'Route': '/icon/mappin.png',
  'Signpost': '/icon/triangularflag.png',
  'Camera': '/icon/magnifyingglass.png',
  'Image': '/icon/document.png',
  'Images': '/icon/document.png',
  'Film': '/icon/document.png',
  'Video': '/icon/document.png',
  'Tv': '/icon/gear.png',
  'Monitor': '/icon/gear.png',
  'Smartphone': '/icon/smartphone.png',
  'Tablet': '/icon/smartphone.png',
  'Laptop': '/icon/gear.png',
  'HardDrive': '/icon/gear.png',
  'Usb': '/icon/gear.png',
  'Battery': '/icon/speedometer.png',
  'BatteryCharging': '/icon/speedometer.png',
  'Plug': '/icon/gear.png',
  'Headphones': '/icon/bell.png',
  'Speaker': '/icon/bell.png',
  'Volume': '/icon/bell.png',
  'VolumeX': '/icon/alert.png',
  'Mic': '/icon/speechbubble.png',
  'MicOff': '/icon/alert.png',
  'Palette': '/icon/crown.png',
  'Brush': '/icon/hammer.png',
  'Pen': '/icon/document.png',
  'PenTool': '/icon/document.png',
  'Eraser': '/icon/alert.png',
  'Ruler': '/icon/gear.png',
  'Scissors': '/icon/gear.png',
  'Printer': '/icon/document.png',
  'Coffee': '/icon/crown.png',
  'Pizza': '/icon/crown.png',
  'Apple': '/icon/crown.png',
  'Cherry': '/icon/crown.png',
  'Cake': '/icon/crown.png',
}

// Define props interface for the Icon component
interface IconProps {
  name: string
  size?: number
  className?: string
  alt?: string
}

// Custom Icon component to replace Lucide icons
export default function Icon({ 
  name, 
  size = 24, 
  className = '', 
  alt = '' 
}: IconProps) {
  const iconPath = iconMap[name] || '/icon/alert.png' // Using alert.png as default fallback
  
  return (
    <Image
      src={iconPath}
      alt={alt || name}
      width={size}
      height={size}
      className={className}
      priority={true} // Add priority to prevent loading issues
    />
  )
}

// Also export as named export for compatibility
export { Icon }

// Helper function to get icon path
export const getIconPath = (name: string): string => {
  return iconMap[name] || '/icon/alert.png'
}
