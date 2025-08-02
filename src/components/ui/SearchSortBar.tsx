'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SortOption } from '@/lib/constants';
import Select from './Select';
import Input from './Input';

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
      <div className="flex-1">
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          leftIcon={MagnifyingGlassIcon}
          className="py-3 border-2 border-gray-300 shadow-sm focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 focus:border-purple-500 text-gray-900 placeholder-gray-400"
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