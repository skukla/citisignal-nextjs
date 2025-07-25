'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface UseGlobalSearchReturn {
  handleSearch: (value: string) => void;
  isSearching: boolean;
}

export function useGlobalSearch(): UseGlobalSearchReturn {
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSearch = (value: string) => {
    if (!value.trim()) return;

    setIsSearching(true);
    // TODO: Implement actual search logic
    // For now, just navigate to a search results page
    router.push(`/search?q=${encodeURIComponent(value)}`);
    setIsSearching(false);
  };

  return {
    handleSearch,
    isSearching
  };
} 