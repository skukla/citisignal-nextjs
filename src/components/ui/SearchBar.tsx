'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

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
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchValue);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-700 hover:text-purple-600 transition-colors"
        aria-label="Toggle search"
      >
        <MagnifyingGlassIcon className="w-6 h-6" />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <form onSubmit={handleSubmit} className="p-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={placeholder}
                className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${className}`}
                autoFocus={autoFocus}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 