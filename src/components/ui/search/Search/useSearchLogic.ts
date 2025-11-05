'use client';

import { useState, useCallback, useEffect } from 'react';
import { phonesPageData } from '@/data/route-groups/products/phones';
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
      const searchResults = phonesPageData.products
        .filter((phone) => phone.name.toLowerCase().includes(query.toLowerCase()))
        .map((phone) => ({
          id: phone.id,
          title: phone.name,
          description: `Starting at ${phone.price}`,
          url: `/phones/${phone.urlKey}`,
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
    selectResult,
  };
}
