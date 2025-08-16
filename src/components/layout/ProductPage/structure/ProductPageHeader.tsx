'use client';

import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import PageHeader from '@/components/ui/layout/PageHeader';
import { useProductFilters } from '../providers/ProductFilterContext';

export function ProductPageHeader() {
  const { pageData } = useProductFilters();
  const { title, description, icon = ShoppingBagIcon } = pageData.pageHeader;
  
  // Use PageHeader which is now always composable (no auto-wrapping)
  return (
    <PageHeader
      title={title}
      description={description}
      icon={icon}
    />
  );
}