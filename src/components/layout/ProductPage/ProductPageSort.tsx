'use client';

import Select from '@/components/ui/foundations/Select';
import { SORT_OPTIONS, type SortOption } from '@/lib/constants';
import { useProductPage } from './ProductPageContext';

export function ProductPageSort() {
  const { sortBy, setSortBy } = useProductPage();
  
  return (
    <Select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value as SortOption)}
      options={SORT_OPTIONS}
      containerClassName="w-48"
    />
  );
}