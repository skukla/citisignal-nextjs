'use client';

import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import PageHeader from '@/components/ui/layout/PageHeader';
import { useProductPage } from './ProductPageContext';

export function ProductPageHeader() {
  const { pageData } = useProductPage();
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