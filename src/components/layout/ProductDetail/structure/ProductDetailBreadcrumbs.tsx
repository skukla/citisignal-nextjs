import { useRef } from 'react';
import { useProductDetail } from '../providers/ProductDetailContext';
import { useDataSource } from '@/hooks/inspector/useInspectorTracking';
import Breadcrumb from '@/components/ui/layout/Breadcrumb';
import type { ProductDetailBreadcrumbsProps } from '../types';

/**
 * ProductDetailBreadcrumbs component
 * Reuses existing Breadcrumb component, displays breadcrumbs from product data
 * Consistent with catalog page breadcrumb styling and positioning
 */
export function ProductDetailBreadcrumbs({ className }: ProductDetailBreadcrumbsProps) {
  const { product, loading } = useProductDetail();
  const elementRef = useRef<HTMLDivElement>(null);

  // Register with Demo Inspector - breadcrumbs from Commerce GraphQL categories
  useDataSource({
    componentName: 'ProductDetailBreadcrumbs',
    source: 'commerce', // Actual category data from Commerce GraphQL
    elementRef,
    fieldMappings: {
      breadcrumb: 'commerce',
    },
  });

  // Don't render during loading or if no breadcrumbs
  if (loading || !product?.breadcrumbs?.items?.length) {
    return null;
  }

  // Transform product breadcrumbs to match Breadcrumb component interface
  const breadcrumbItems = product.breadcrumbs.items.map((item) => ({
    name: item.name,
    href: item.urlPath === '/' ? undefined : item.urlPath,
  }));

  return (
    <div ref={elementRef} className={className}>
      <Breadcrumb
        items={breadcrumbItems}
        dataSource="commerce"
        data-inspector-field="breadcrumb"
        data-inspector-source="commerce"
      />
    </div>
  );
}
