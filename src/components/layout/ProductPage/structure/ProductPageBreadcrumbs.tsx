'use client';

import Breadcrumb from '@/components/ui/layout/Breadcrumb';
import { useProductFilters } from '../providers/ProductFilterContext';
import { useCategoryBreadcrumbs } from '@/hooks/navigation';
import { useNavigation } from '@/contexts/NavigationContext';
import { formatCategoryName } from '@/utils/url-state';
import { useMemo } from 'react';

export function ProductPageBreadcrumbs() {
  const { category } = useProductFilters();
  const { breadcrumbs: contextBreadcrumbs } = useNavigation();

  // Check if we have breadcrumbs from NavigationContext
  const hasContextBreadcrumbs = (contextBreadcrumbs?.items?.length ?? 0) > 0;

  // Only fetch dynamic breadcrumbs if we don't already have breadcrumbs from context and have a category
  const shouldFetchBreadcrumbs = !hasContextBreadcrumbs && category;
  const { data: dynamicBreadcrumbs } = useCategoryBreadcrumbs({
    categoryUrlKey: shouldFetchBreadcrumbs ? category : '',
  });

  // Use API breadcrumbs as single source of truth when category is provided
  const breadcrumbItems = useMemo(() => {
    // Check if we have fresh breadcrumbs that match the current category
    const contextMatchesCategory = contextBreadcrumbs?.items?.some((item) =>
      item.urlPath?.includes(category || '')
    );
    const dynamicMatchesCategory = dynamicBreadcrumbs?.items?.some((item) =>
      item.urlPath?.includes(category || '')
    );

    // First priority: breadcrumbs from NavigationContext if they match current category
    if (hasContextBreadcrumbs && contextBreadcrumbs && contextMatchesCategory) {
      return contextBreadcrumbs.items.map((item) => ({
        name: item.name,
        href: item.urlPath === '/' ? undefined : item.urlPath,
      }));
    }

    // Second priority: dynamically fetched breadcrumbs if they match
    if (category && dynamicBreadcrumbs?.items?.length > 0 && dynamicMatchesCategory) {
      return dynamicBreadcrumbs.items.map((item) => ({
        name: item.name,
        href: item.urlPath === '/' ? undefined : item.urlPath,
      }));
    }

    // If we have a category, show a simple breadcrumb immediately
    // This prevents showing stale breadcrumbs during navigation
    if (category) {
      return [{ name: formatCategoryName(category) }];
    }

    // No category - return empty (home page or non-product pages)
    return [];
  }, [category, dynamicBreadcrumbs, hasContextBreadcrumbs, contextBreadcrumbs]);

  // Breadcrumbs come from Commerce API when we have a category
  const dataSource =
    hasContextBreadcrumbs || dynamicBreadcrumbs?.items?.length > 0 ? 'commerce' : 'static';

  return <Breadcrumb items={breadcrumbItems} dataSource={dataSource} />;
}
