'use client';

import SearchSortBar from '@/components/ui/search/SearchSortBar';
import { SORT_OPTIONS, type SortOption } from '@/lib/constants';

export interface SearchAndSortProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
  searchPlaceholder?: string;
}

/**
 * Combined search and sort functionality.
 * Wraps SearchSortBar with SORT_OPTIONS and proper spacing.
 * 
 * @example
 * <SearchAndSort 
 *   searchQuery={searchQuery}
 *   onSearchChange={setSearchQuery}
 *   sortBy={sortBy}
 *   onSortChange={setSortBy}
 *   searchPlaceholder="Search plans..."
 * />
 */
export default function SearchAndSort({ 
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  searchPlaceholder = 'Search...'
}: SearchAndSortProps) {
  return (
    <SearchSortBar
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      sortBy={sortBy}
      onSortChange={onSortChange}
      sortOptions={SORT_OPTIONS}
      searchPlaceholder={searchPlaceholder}
    />
  );
}