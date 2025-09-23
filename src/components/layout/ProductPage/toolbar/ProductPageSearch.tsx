'use client';

import { useState, useEffect, useCallback } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Input from '@/components/ui/foundations/Input';
import { useProductFilters } from '../providers/ProductFilterContext';

// Debounce delay in milliseconds
const SEARCH_DEBOUNCE_MS = 500;

export function ProductPageSearch() {
  const { searchQuery, setSearchQuery, pageData } = useProductFilters();
  const [localValue, setLocalValue] = useState(searchQuery);

  // Update local value when URL changes (e.g., back/forward navigation)
  useEffect(() => {
    setLocalValue(searchQuery);
  }, [searchQuery]);

  // Debounced search update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== searchQuery) {
        setSearchQuery(localValue);
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [localValue, searchQuery, setSearchQuery]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  }, []);

  // Clear search function
  const handleClearSearch = useCallback(() => {
    setLocalValue('');
    setSearchQuery('');
  }, [setSearchQuery]);

  // Create a clear button component when there's a search term
  const ClearButton = useCallback(() => {
    if (!localValue.trim()) return null;

    return (
      <button
        type="button"
        onClick={handleClearSearch}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer z-10"
        aria-label="Clear search"
        title="Clear search"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    );
  }, [localValue, handleClearSearch]);

  return (
    <div className="flex-1" data-inspector-source="search" data-inspector-type="search-bar">
      <div className="relative">
        <Input
          type="text"
          placeholder={pageData.search.placeholder || 'Search...'}
          value={localValue}
          onChange={handleChange}
          leftIcon={MagnifyingGlassIcon}
          className="py-3 border-2 border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm pr-10"
        />
        <ClearButton />
      </div>
    </div>
  );
}
