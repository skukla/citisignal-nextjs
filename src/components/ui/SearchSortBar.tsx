'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SortOption } from '@/lib/constants';
import Select from './Select';

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
}

export default function SearchSortBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOptions,
  searchPlaceholder = 'Search...'
}: SearchSortBarProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg bg-white shadow-sm focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 focus:border-purple-500 focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
        />
      </div>
      <Select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        options={sortOptions}
        containerClassName="w-48"
      />
    </div>
  );
} 