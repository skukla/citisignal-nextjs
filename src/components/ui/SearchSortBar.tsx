'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Input from './Input';
import Select from './Select';

interface SortOption {
  value: string;
  label: string;
}

interface SearchSortBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  sortOptions: SortOption[];
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
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          leftIcon={MagnifyingGlassIcon}
          className="shadow-sm"
        />
      </div>
      <div className="flex items-center">
        <Select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          options={sortOptions}
          className="shadow-sm"
        />
      </div>
    </div>
  );
} 