'use client';

import { createContext, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { 
  SearchContextValue, 
  BaseSearchProps,
  SearchComponent 
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

// Individual components
export const SearchRoot = ({ children, className }: BaseSearchProps) => {
  const searchState = useSearch();

  return (
    <SearchContext.Provider value={searchState}>
      <div className={className}>
        {children}
      </div>
    </SearchContext.Provider>
  );
};

export const SearchTrigger = ({ className }: BaseSearchProps) => {
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

export const SearchPanel = ({ children, className }: BaseSearchProps) => {
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

export const SearchInput = ({ className }: BaseSearchProps) => {
  const { query, setQuery } = useSearchContext();

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search phones, plans, accessories..."
      className={twMerge(
        'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-700',
        className
      )}
      autoFocus
    />
  );
};

export const SearchResults = ({ className }: BaseSearchProps) => {
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

// Create compound component
const Search: SearchComponent = {
  Root: SearchRoot,
  Trigger: SearchTrigger,
  Panel: SearchPanel,
  Input: SearchInput,
  Results: SearchResults
};

// Export
export default Search; 