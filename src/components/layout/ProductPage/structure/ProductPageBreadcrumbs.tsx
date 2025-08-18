'use client';

import Breadcrumb from '@/components/ui/layout/Breadcrumb';
import { useProductFilters } from '../providers/ProductFilterContext';
import { useCategoryBreadcrumbs } from '@/hooks/navigation';
import { useNavigation } from '@/contexts/NavigationContext';
import { useDemoInspector } from '@/contexts/DemoInspectorContext';
import { useMemo } from 'react';

export function ProductPageBreadcrumbs() {
  const { pageData, category } = useProductFilters();
  const { breadcrumbs: contextBreadcrumbs, isLoadingFromUnified } = useNavigation();
  const { singleQueryMode } = useDemoInspector();
  
  // Check if we have breadcrumbs from NavigationContext (set by unified query)
  const hasContextBreadcrumbs = contextBreadcrumbs?.items?.length > 0;
  
  // Check if pageData already has breadcrumbs from unified query
  const hasBreadcrumbsInPageData = pageData.breadcrumbs && 
    Array.isArray(pageData.breadcrumbs) && 
    pageData.breadcrumbs.length > 0 &&
    pageData.breadcrumbs[0].label; // Unified query provides label/href format
  
  // Only fetch dynamic breadcrumbs if:
  // 1. Not loading from unified query
  // 2. Not in single query mode (which will provide breadcrumbs via context)
  // 3. Don't already have breadcrumbs from context or pageData
  // 4. Have a category to fetch for
  const shouldFetchBreadcrumbs = !isLoadingFromUnified && !singleQueryMode && !hasContextBreadcrumbs && !hasBreadcrumbsInPageData && category;
  const { data: dynamicBreadcrumbs, loading } = useCategoryBreadcrumbs({ 
    categoryUrlKey: shouldFetchBreadcrumbs ? category : ''
  });
  
  // Use API breadcrumbs as single source of truth when category is provided
  const breadcrumbItems = useMemo(() => {
    // First priority: breadcrumbs from NavigationContext (unified query)
    if (hasContextBreadcrumbs) {
      return contextBreadcrumbs.items.map(item => ({
        name: item.name,
        href: item.urlPath === '/' ? undefined : item.urlPath
      }));
    }
    
    // Second priority: breadcrumbs in pageData from unified query
    if (hasBreadcrumbsInPageData) {
      return pageData.breadcrumbs.map(item => ({
        name: item.label,
        href: item.href
      }));
    }
    
    // Third priority: dynamically fetched breadcrumbs
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
  }, [category, dynamicBreadcrumbs, loading, pageData.breadcrumbs, hasBreadcrumbsInPageData, hasContextBreadcrumbs, contextBreadcrumbs]);
  
  // Breadcrumbs come from Commerce API when we have a category
  const dataSource = hasContextBreadcrumbs || hasBreadcrumbsInPageData ? 'commerce' : 
    (category && !loading && dynamicBreadcrumbs?.items?.length > 0 ? 'commerce' : 'static');
  
  return <Breadcrumb items={breadcrumbItems} dataSource={dataSource} />;
}