'use client';

import type { SearchContextValue, SearchResult } from '../types/search.types';
import { useSearchPanel } from './useSearchPanel';
import { useSearchLogic } from './useSearchLogic';

export function useSearch(): SearchContextValue {
  const { isOpen, toggle, close, panelRef } = useSearchPanel();
  const { query, results, isLoading, setQuery, selectResult } = useSearchLogic();

  // Compose the hooks and handle cross-cutting concerns
  const handleSelectResult = (result: SearchResult) => {
    selectResult(result);
    close();
    setQuery('');
  };

  return {
    isOpen,
    query,
    results,
    isLoading,
    toggle,
    close,
    setQuery,
    selectResult: handleSelectResult,
    panelRef
  };
} 