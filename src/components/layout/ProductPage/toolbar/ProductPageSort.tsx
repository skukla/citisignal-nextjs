'use client';

import Select from '@/components/ui/foundations/Select';
import { useProductFilters } from '../providers/ProductFilterContext';
import { SORT_OPTIONS } from '../hooks/useProductPageParams';

export function ProductPageSort() {
  const { sortBy, setSortBy } = useProductFilters();

  const options = SORT_OPTIONS.map((opt) => ({
    value: opt.value,
    label: opt.label,
  }));

  return (
    <div>
      <Select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        options={options}
        containerClassName="w-48"
      />
    </div>
  );
}
