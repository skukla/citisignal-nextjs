'use client';

import Select from '@/components/ui/foundations/Select';
import { useProductFilters } from '../providers/ProductFilterContext';
import { SORT_OPTIONS } from '../hooks/useProductPageParams';
import { useActiveProductService } from '@/hooks/products/useActiveProductService';

export function ProductPageSort() {
  const { sortBy, setSortBy } = useProductFilters();
  
  // Map sort options to Select format - use value directly
  const options = SORT_OPTIONS.map(opt => ({
    value: opt.value,
    label: opt.label
  }));
  
  // Hook determines which service handles sorting
  const dataSource = useActiveProductService();
  
  return (
    <div data-inspector-source={dataSource} data-inspector-type="sort-dropdown">
      <Select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        options={options}
        containerClassName="w-48"
      />
    </div>
  );
}