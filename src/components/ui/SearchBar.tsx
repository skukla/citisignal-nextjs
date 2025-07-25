'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Input from './Input';
import Button from './Button';
import { useSearchBar } from '@/hooks/useSearchBar';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
  autoFocus?: boolean;
}

export default function SearchBar({
  placeholder = 'Search...',
  onSearch,
  className = '',
  autoFocus = false
}: SearchBarProps) {
  const {
    isOpen,
    searchValue,
    containerRef,
    setSearchValue,
    handleSubmit,
    toggleSearch
  } = useSearchBar({ onSearch });

  return (
    <div className="relative" ref={containerRef}>
      <Button
        onClick={toggleSearch}
        variant="ghost"
        size="sm"
        className="text-gray-700 hover:text-purple-600 hover:bg-transparent p-2"
        leftIcon={MagnifyingGlassIcon}
        aria-label="Toggle search"
      />
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <form onSubmit={handleSubmit} className="p-4">
            <Input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={placeholder}
              leftIcon={MagnifyingGlassIcon}
              autoFocus={autoFocus}
              className={className}
            />
          </form>
        </div>
      )}
    </div>
  );
} 