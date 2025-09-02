// hooks/usePageMetadata.ts
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PageMetadata, subscribeToPageMetadata, getPageMetadata } from '@/lib/metadata-manager';

export function usePageMetadata() {
  const pathname = usePathname();
  const [metadata, setMetadata] = useState<PageMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // First, fetch the initial metadata
    if (pathname) {
      getPageMetadata(pathname)
        .then(data => {
          setMetadata(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching metadata:', err);
          setError('Failed to fetch metadata');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }

    // Then subscribe to real-time updates
    let unsubscribe: (() => void) | undefined;
    if (pathname) {
      unsubscribe = subscribeToPageMetadata(pathname, (updatedMetadata) => {
        setMetadata(updatedMetadata);
        setLoading(false);
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [pathname]);

  return { metadata, loading, error };
}

// Hook for admin to manage all metadata
export function useAllPageMetadata() {
  const [metadata, setMetadata] = useState<PageMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        const { getAllPageMetadata } = await import('@/lib/metadata-manager');
        const data = await getAllPageMetadata();
        setMetadata(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching all metadata:', err);
        setError('Failed to fetch metadata');
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  const refetch = async () => {
    const { getAllPageMetadata } = await import('@/lib/metadata-manager');
    const data = await getAllPageMetadata();
    setMetadata(data);
  };

  return { metadata, loading, error, refetch };
}