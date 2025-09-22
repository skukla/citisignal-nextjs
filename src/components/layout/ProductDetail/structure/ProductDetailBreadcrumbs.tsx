import { useProductDetail } from '../providers/ProductDetailContext';
import Breadcrumb from '@/components/ui/layout/Breadcrumb';
import type { ProductDetailBreadcrumbsProps } from '../types';

/**
 * ProductDetailBreadcrumbs component
 * Reuses existing Breadcrumb component, displays breadcrumbs from product data
 * Consistent with catalog page breadcrumb styling and positioning
 */
export function ProductDetailBreadcrumbs({ className }: ProductDetailBreadcrumbsProps) {
  const { product, loading } = useProductDetail();

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
    <div className={`pt-6 sm:pt-8 lg:pt-10 ${className || ''}`.trim()}>
      <Breadcrumb items={breadcrumbItems} dataSource="commerce" />
    </div>
  );
}
