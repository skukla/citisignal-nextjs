'use client';

import { createContext, useContext } from 'react';
import type { SearchRootProps, SearchContextValue } from './Search.types';
import { useSearch } from './useSearch';

// Create context
const SearchContext = createContext<SearchContextValue | null>(null);

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('Search components must be used within Search.Root');
  }
  return context;
}

/**
 * Root component for the Search feature. Provides context and state management
 * for the search functionality.
 *
 * @example
 * <Search.Root>
 *   <Search.Trigger />
 *   <Search.Panel>
 *     <Search.Input />
 *     <Search.Results />
 *   </Search.Panel>
 * </Search.Root>
 */
export function SearchRoot({ children, className }: SearchRootProps) {
  const searchState = useSearch();

  return (
    <SearchContext.Provider value={searchState}>
      <div className={className}>
        {children}
      </div>
    </SearchContext.Provider>
  );
}