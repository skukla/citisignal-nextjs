'use client';

import { useState, useCallback, useEffect } from 'react';
import { phones } from '@/data/pages/phones';
import type { SearchResult } from './Search.types';

export interface UseSearchLogicReturn {
  query: string;
  results: readonly SearchResult[];
  isLoading: boolean;
  setQuery: (query: string) => void;
  selectResult: (result: SearchResult) => void;
}

export function useSearchLogic(): UseSearchLogicReturn {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<readonly SearchResult[]>([]);

  const selectResult = useCallback((result: SearchResult) => {
    window.location.href = result.url;
  }, []);

  // Search effect
  useEffect(() => {
    if (!query) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    // Simple search implementation
    setIsLoading(true);
    const timer = setTimeout(() => {
      const searchResults = phones
        .filter(phone => 
          phone.name.toLowerCase().includes(query.toLowerCase()) ||
          (phone.description?.toLowerCase().includes(query.toLowerCase()) ?? false)
        )
        .map(phone => ({
          id: phone.id,
          title: phone.name,
          description: phone.description 
            ? `${phone.description} - Starting at $${phone.price}`
            : `Starting at $${phone.price}`,
          url: `/phones/${phone.url_key}`
        }));

      setIsLoading(false);
      setResults(searchResults);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return {
    query,
    results,
    isLoading,
    setQuery,
    selectResult
  };
} 