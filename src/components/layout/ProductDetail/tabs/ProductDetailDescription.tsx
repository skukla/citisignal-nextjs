import { useProductDetail } from '../providers/ProductDetailContext';
import type { ProductDetailDescriptionProps } from '../types';

/**
 * ProductDetailDescription component
 * Displays product description
 * Placeholder for Phase 4 implementation
 */
export function ProductDetailDescription({ className }: ProductDetailDescriptionProps) {
  const { product } = useProductDetail();

  if (!product?.description) {
    return null;
  }

  return (
    <div className={className}>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Description</h2>
      <div
        className="prose prose-sm text-gray-600"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
    </div>
  );
}
