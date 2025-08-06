'use client';

import type { SearchContextValue, SearchResult } from './Search.types';
import { useSearchPanel } from './useSearchPanel';
import { useSearchLogic } from './useSearchLogic';

/**
 * Return type for useSearch hook
 */
export type UseSearchReturn = SearchContextValue;

/**
 * Provides search functionality for the search component.
 * Uses SearchContext to manage global search state.
 * @returns {Object} Search state and handlers
 * @example
 * const { query, setQuery, results } = useSearch();
 */
export function useSearch(): UseSearchReturn {
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