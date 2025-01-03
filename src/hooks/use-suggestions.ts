import { useState, useEffect, useCallback } from 'react';
import { fetchSuggestions } from '@/lib/suggestions-api';
import { useDebounce } from '@/hooks/use-debounce';

export function useSuggestions(initialQuery: string = '') {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 150); // Reduced debounce time for faster response

  const fetchSuggestionsData = useCallback(async () => {
    if (debouncedQuery.trim().length >= 1) {
      setIsLoading(true);
      try {
        const results = await fetchSuggestions(debouncedQuery);
        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  const handleKeyNav = useCallback((direction: 'up' | 'down') => {
    if (direction === 'up') {
      setActiveIndex(prev => 
        prev <= 0 ? suggestions.length - 1 : prev - 1
      );
    } else {
      setActiveIndex(prev => 
        prev >= suggestions.length - 1 ? 0 : prev + 1
      );
    }
  }, [suggestions.length]);

  useEffect(() => {
    fetchSuggestionsData();
  }, [fetchSuggestionsData]);

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  return {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    activeIndex,
    handleKeyNav,
    isLoading
  };
}