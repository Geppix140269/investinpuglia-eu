import { useState, useEffect, useCallback } from 'react';

interface TourismDataOptions {
  dataType?: string;
  period?: string;
  region?: string;
  startDate?: string;
  endDate?: string;
  indicators?: string[];
  autoFetch?: boolean;
}

interface TourismDataResponse {
  summary: {
    totalVisitors: number;
    internationalArrivals: number;
    averageStay: number;
    occupancyRate: number;
    revenue: number;
  };
  trends: {
    monthly: Array<{
      month: string;
      visitors: number;
      revenue: number;
    }>;
    seasonal: {
      spring: { visitors: number; growth: number };
      summer: { visitors: number; growth: number };
      autumn: { visitors: number; growth: number };
      winter: { visitors: number; growth: number };
    };
  };
  demographics: {
    domestic: number;
    international: number;
    ageGroups: Array<{ group: string; percentage: number }>;
    purposes: Array<{ purpose: string; percentage: number }>;
  };
  regions: Array<{
    name: string;
    visitors: number;
    hotels: number;
    occupancy: string;
  }>;
  attractions: Array<{
    name: string;
    visitors: number;
    rating: number;
  }>;
}

export const useTourismData = (options: TourismDataOptions = {}) => {
  const [data, setData] = useState<TourismDataResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  const {
    dataType = 'tourism',
    period = 'month',
    region = 'all',
    startDate,
    endDate,
    indicators = [],
    autoFetch = true
  } = options;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/tourism-data/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dataType,
          period,
          region,
          startDate,
          endDate,
          indicators
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setData(result.data);
        setLastFetch(new Date());
      } else {
        throw new Error(result.message || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Tourism data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [dataType, period, region, startDate, endDate, indicators]);

  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  const exportData = useCallback(async (format: 'csv' | 'xlsx' | 'pdf') => {
    try {
      const response = await fetch('/api/tourism-data/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          format,
          period,
          region,
          dataType
        })
      });

      if (!response.ok) {
        throw new Error(`Export failed: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tourism-data-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      return true;
    } catch (err) {
      console.error('Export error:', err);
      return false;
    }
  }, [period, region, dataType]);

  // Auto-fetch data on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch]); // Only run on mount when autoFetch is true

  // Calculate derived metrics
  const metrics = data ? {
    totalVisitorsFormatted: new Intl.NumberFormat('en-US', { 
      notation: 'compact', 
      maximumFractionDigits: 1 
    }).format(data.summary.totalVisitors),
    
    internationalPercentage: (
      (data.summary.internationalArrivals / data.summary.totalVisitors) * 100
    ).toFixed(1),
    
    revenuePerVisitor: Math.round(
      data.summary.revenue / data.summary.totalVisitors
    ),
    
    peakSeason: Object.entries(data.trends.seasonal)
      .reduce((peak, [season, stats]) => 
        stats.visitors > peak.visitors ? { season, ...stats } : peak,
        { season: '', visitors: 0, growth: 0 }
      ).season,
    
    topRegion: data.regions.reduce((top, region) => 
      region.visitors > top.visitors ? region : top,
      data.regions[0]
    ),
    
    topAttraction: data.attractions[0]
  } : null;

  return {
    data,
    loading,
    error,
    lastFetch,
    refetch,
    exportData,
    metrics
  };
};

export default useTourismData;