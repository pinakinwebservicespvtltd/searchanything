import { useState, useEffect } from 'react';
import { fetchTrendingSearches } from '@/lib/trending-api';

interface TrendingItem {
  query: string;
  region: string;
}

export function useTrending() {
  const [trending, setTrending] = useState<TrendingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTrending() {
      try {
        const searches = await fetchTrendingSearches();
        setTrending(searches);
      } catch (error) {
        console.error('Failed to fetch trending searches:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadTrending();
  }, []);

  return { trending, isLoading };
}