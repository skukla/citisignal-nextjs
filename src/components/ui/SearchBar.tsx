'use client';

import { twMerge } from 'tailwind-merge';
import Search from '@/features/search/components/Search';
import type { SearchBarProps } from '@/types/search';

/**
 * SearchBar component that provides a simple search interface.
 * Built on top of the Search feature component.
 */
export default function SearchBar({
  className,
  placeholder = 'Search...',
  size = 'md'
}: SearchBarProps) {
  return (
    <Search.Root>
      <div className="relative">
        <Search.Trigger />
        <Search.Panel className={twMerge(
          // Size variants - direct approach without constants
          size === 'sm' && 'w-64',
          size === 'md' && 'w-80', 
          size === 'lg' && 'w-96',
          className
        )}>
          <div className="p-4">
            <Search.Input placeholder={placeholder} />
          </div>
          <Search.Results />
        </Search.Panel>
      </div>
    </Search.Root>
  );
}