'use client';

import { useRouter } from 'next/navigation';

interface UseGlobalSearchReturn {
  handleSearch: (value: string) => void;
}

export function useGlobalSearch(): UseGlobalSearchReturn {
  const router = useRouter();

  const handleSearch = (value: string) => {
    if (!value.trim()) return;
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  return {
    handleSearch
  };
} 