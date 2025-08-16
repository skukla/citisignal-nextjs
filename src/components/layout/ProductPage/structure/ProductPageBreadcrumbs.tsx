'use client';

import Breadcrumb from '@/components/ui/layout/Breadcrumb';
import { useProductFilters } from '../providers/ProductFilterContext';

export function ProductPageBreadcrumbs() {
  const { pageData } = useProductFilters();
  
  return <Breadcrumb items={pageData.breadcrumbs} />;
}