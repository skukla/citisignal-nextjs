'use client';

import { SortOption } from '@/lib/constants';
import SearchInput from './SearchInput';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface SearchSortBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  sortOptions: ReadonlyArray<{
    readonly value: SortOption;
    readonly label: string;
  }>;
  searchPlaceholder?: string;
  color?: 'purple' | 'yellow' | 'blue';
}

export default function SearchSortBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOptions,
  searchPlaceholder = 'Search...',
  color = 'blue'
}: SearchSortBarProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          color={color}
        />
      </div>
      <div className="flex items-center relative">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className={clsx(
            'input-base w-48 pr-10 appearance-none',
            color === 'purple' && 'input-purple',
            color === 'yellow' && 'input-yellow',
            color === 'blue' && 'input-blue'
          )}
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-0 flex items-center px-4 text-gray-500">
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
} 