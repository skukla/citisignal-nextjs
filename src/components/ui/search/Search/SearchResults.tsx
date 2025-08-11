'use client';

import { twMerge } from 'tailwind-merge';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Spinner from '@/components/ui/foundations/Spinner';
import EmptyState from '@/components/ui/feedback/EmptyState';
import Button from '@/components/ui/foundations/Button';
import type { SearchResultsProps } from './Search.types';
import { useSearchContext } from './SearchRoot';

/**
 * Results list component that displays search results.
 * Uses Spinner and EmptyState components for consistent UI.
 *
 * @example
 * <Search.Results />
 */
export function SearchResults({ className }: SearchResultsProps) {
  const { results, isLoading, selectResult } = useSearchContext();

  if (isLoading) {
    return (
      <div className="p-4 flex items-center justify-center">
        <Spinner size="sm" />
        <span className="ml-2 text-gray-700">Searching...</span>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <EmptyState
        icon={MagnifyingGlassIcon}
        title="No results found"
        description="Try adjusting your search terms"
      />
    );
  }

  return (
    <div className={twMerge('max-h-96 overflow-y-auto divide-y divide-gray-100', className)}>
      {results.map((result) => (
        <Button
          key={result.id}
          onClick={() => selectResult(result)}
          variant="ghost"
          className="w-full p-4 text-left hover:bg-gray-50 transition-colors justify-start h-auto"
        >
          <div>
            <div className="font-medium text-gray-900">{result.title}</div>
            <div className="text-sm text-gray-700 mt-1">{result.description}</div>
          </div>
        </Button>
      ))}
    </div>
  );
}