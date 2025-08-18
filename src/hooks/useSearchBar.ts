'use client';

import { useState, useRef, useEffect } from 'react';

interface UseSearchBarProps {
  onSearch?: (value: string) => void;
}

/**
 * Manages search bar state and behavior with debouncing.
 * @param {Object} props - Hook configuration
 * @param {Function} [props.onSearch] - Callback when search value changes
 * @returns {Object} Search state and handlers
 */
export function useSearchBar({ onSearch }: UseSearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchValue);
  };

  const toggleSearch = () => setIsOpen(!isOpen);

  return {
    isOpen,
    searchValue,
    containerRef,
    setSearchValue,
    handleSubmit,
    toggleSearch
  };
} 