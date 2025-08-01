'use client';

import { createContext, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { 
  SearchContextValue,
  SearchComponent,
  SearchRootProps,
  SearchTriggerProps,
  SearchPanelProps,
  SearchInputProps,
  SearchResultsProps
} from '../types/search.types';
import { useSearch } from '../hooks/useSearch';

// Create context
const SearchContext = createContext<SearchContextValue | null>(null);

function useSearchContext() {
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
export const SearchRoot = ({ children, className }: SearchRootProps) => {
  const searchState = useSearch();

  return (
    <SearchContext.Provider value={searchState}>
      <div className={className}>
        {children}
      </div>
    </SearchContext.Provider>
  );
};

/**
 * Trigger button for opening the search panel.
 * Renders a magnifying glass icon with hover effects.
 *
 * @example
 * <Search.Trigger aria-label="Search products" />
 */
export const SearchTrigger = ({ className }: SearchTriggerProps) => {
  const { toggle } = useSearchContext();

  return (
    <button
      onClick={toggle}
      className={twMerge(
        'p-2 text-gray-700 hover:text-purple-600 transition-colors',
        className
      )}
    >
      <MagnifyingGlassIcon className="w-6 h-6" />
    </button>
  );
};

/**
 * Panel component that displays the search interface.
 * Handles positioning and click-outside behavior.
 *
 * @example
 * <Search.Panel>
 *   <Search.Input />
 *   <Search.Results />
 * </Search.Panel>
 */
export const SearchPanel = ({ children, className }: SearchPanelProps) => {
  const { isOpen, panelRef } = useSearchContext();

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className={twMerge(
        'absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden',
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

/**
 * Search input field component with auto-focus.
 * Provides real-time search functionality.
 *
 * @example
 * <Search.Input placeholder="Search products..." />
 */
export const SearchInput = ({ className, placeholder = "Search phones, plans, accessories..." }: SearchInputProps) => {
  const { query, setQuery } = useSearchContext();

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder={placeholder}
      className={twMerge(
        'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-700',
        className
      )}
      autoFocus
    />
  );
};

/**
 * Results list component that displays search results.
 * Handles loading states and empty results.
 *
 * @example
 * <Search.Results />
 */
export const SearchResults = ({ className }: SearchResultsProps) => {
  const { results, isLoading, selectResult } = useSearchContext();

  if (isLoading) {
    return <div className="p-4 text-gray-700">Searching...</div>;
  }

  if (results.length === 0) {
    return <div className="p-4 text-gray-700">No results found</div>;
  }

  return (
    <div className={twMerge('max-h-96 overflow-y-auto divide-y divide-gray-100', className)}>
      {results.map((result) => (
        <button
          key={result.id}
          onClick={() => selectResult(result)}
          className="w-full p-4 text-left hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <div className="font-medium text-gray-900">{result.title}</div>
          <div className="text-sm text-gray-700 mt-1">{result.description}</div>
        </button>
      ))}
    </div>
  );
};

/**
 * Search compound component for building search functionality.
 * Provides a complete search interface with trigger, panel, input, and results.
 *
 * @example
 * <Search.Root>
 *   <Search.Trigger aria-label="Search products" />
 *   <Search.Panel>
 *     <Search.Input />
 *     <Search.Results />
 *   </Search.Panel>
 * </Search.Root>
 */
const Search: SearchComponent = {
  Root: SearchRoot,
  Trigger: SearchTrigger,
  Panel: SearchPanel,
  Input: SearchInput,
  Results: SearchResults
};

// Export
export default Search; 