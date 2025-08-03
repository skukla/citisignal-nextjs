'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Input from '@/components/ui/Input';
import type { SearchInputProps } from './Search.types';
import { useSearchContext } from './SearchRoot';

/**
 * Search input field component with auto-focus.
 * Uses the Input component for consistency.
 *
 * @example
 * <Search.Input placeholder="Search products..." />
 */
export function SearchInput({ className, placeholder = "Search phones, plans, accessories...", ...props }: SearchInputProps) {
  const { query, setQuery } = useSearchContext();

  return (
    <Input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder={placeholder}
      leftIcon={MagnifyingGlassIcon}
      className={className}
      autoFocus
      {...props}
    />
  );
}