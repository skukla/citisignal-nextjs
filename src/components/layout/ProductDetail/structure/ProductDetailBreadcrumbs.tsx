import { useProductDetail } from '../providers/ProductDetailContext';
// import Breadcrumb from '@/components/ui/layout/Breadcrumb';
import type { ProductDetailBreadcrumbsProps } from '../types';

/**
 * ProductDetailBreadcrumbs component
 * Reuses existing Breadcrumb component, displays breadcrumbs from product data
 */
export function ProductDetailBreadcrumbs({ className }: ProductDetailBreadcrumbsProps) {
  const { product, loading } = useProductDetail();

  // Don't render during loading or if no breadcrumbs
  if (loading || !product?.breadcrumbs?.items?.length) {
    return null;
  }

  return (
    <nav className={className}>
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        {product.breadcrumbs.items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            <span>{item.name}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
