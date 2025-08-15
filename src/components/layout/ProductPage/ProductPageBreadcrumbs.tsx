'use client';

import Breadcrumb from '@/components/ui/layout/Breadcrumb';
import { useProductPage } from './ProductPageContext';

export function ProductPageBreadcrumbs() {
  const { pageData } = useProductPage();
  
  return <Breadcrumb items={pageData.breadcrumbs} />;
}