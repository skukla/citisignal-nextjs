'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Input from '@/components/ui/foundations/Input';
import { useProductFilters } from '../providers/ProductFilterContext';

export function ProductPageSearch() {
  const { searchQuery, setSearchQuery, pageData } = useProductFilters();
  
  return (
    <div className="flex-1">
      <Input
        type="text"
        placeholder={pageData.search.placeholder || 'Search...'}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        leftIcon={MagnifyingGlassIcon}
        className="py-3 border-2 border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
      />
    </div>
  );
}