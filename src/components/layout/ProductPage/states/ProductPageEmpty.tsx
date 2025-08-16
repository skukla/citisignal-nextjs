'use client';

import EmptyState from '@/components/ui/feedback/EmptyState';
import { useProductFilters } from '../providers/ProductFilterContext';

export default function ProductPageEmpty() {
  const { pageData, clearFilters } = useProductFilters();
  const { icon, title, description, actionLabel } = pageData.emptyState;
  
  return (
    <EmptyState
      icon={icon}
      title={title}
      description={description}
      actionLabel={actionLabel}
      onAction={clearFilters}
    />
  );
}