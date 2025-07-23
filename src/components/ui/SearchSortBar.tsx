'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SortOption } from '@/lib/constants';

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
      <div className="flex items-center">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="appearance-none w-48 px-4 pr-10 py-3 border-2 border-gray-300 rounded-lg bg-white shadow-sm focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 focus:border-purple-500 focus:outline-none transition-all duration-200 text-gray-900 cursor-pointer"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
} 