// PATH: components/VisitorTracker.tsx
'use client';

import { useVisitorTracking } from '@/hooks/useVisitorTracking';

export default function VisitorTracker() {
  // This component just initializes the tracking hook
  useVisitorTracking();
  
  // Return null as this is an invisible tracking component
  return null;
}