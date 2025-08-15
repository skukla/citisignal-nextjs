'use client';

import EmptyState from '@/components/ui/feedback/EmptyState';
import { useProductPage } from './ProductPageContext';

export default function ProductPageEmpty() {
  const { pageData, clearFilters } = useProductPage();
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