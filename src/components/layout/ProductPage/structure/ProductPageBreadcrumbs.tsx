'use client';

import Breadcrumb from '@/components/ui/layout/Breadcrumb';
import { useProductFilters } from '../providers/ProductFilterContext';
import { useCategoryBreadcrumbs } from '@/hooks/navigation';
import { useMemo } from 'react';

export function ProductPageBreadcrumbs() {
  const { pageData, category } = useProductFilters();
  
  // Use dynamic breadcrumbs from API if category is provided
  const { data: dynamicBreadcrumbs, loading } = useCategoryBreadcrumbs({ 
    categoryUrlKey: category || '' 
  });
  
  // Use API breadcrumbs as single source of truth when category is provided
  const breadcrumbItems = useMemo(() => {
    // If we have a category, always use API data (or show loading)
    if (category) {
      if (loading) {
        // Could return skeleton items here if desired
        return [];
      }
      if (dynamicBreadcrumbs?.items?.length > 0) {
        return dynamicBreadcrumbs.items.map(item => ({
          name: item.name,
          href: item.urlPath === '/' ? undefined : item.urlPath
        }));
      }
      // API loaded but no breadcrumbs - show minimal trail
      return [{ name: 'Home', href: '/' }, { name: 'Shop', href: '/shop' }];
    }
    // No category specified - use static breadcrumbs (for non-shop pages)
    return pageData.breadcrumbs;
  }, [category, dynamicBreadcrumbs, loading, pageData.breadcrumbs]);
  
  // Breadcrumbs come from Commerce API when we have a category
  const dataSource = category && !loading && dynamicBreadcrumbs?.items?.length > 0 ? 'commerce' : 'static';
  
  return <Breadcrumb items={breadcrumbItems} dataSource={dataSource} />;
}