import { useProductDetail } from '../providers/ProductDetailContext';
import type { ProductDetailSpecificationsProps } from '../types';

/**
 * ProductDetailSpecifications component
 * Displays product attributes and specifications
 * Placeholder for Phase 4 implementation
 */
export function ProductDetailSpecifications({ className }: ProductDetailSpecificationsProps) {
  const { product } = useProductDetail();

  if (!product?.attributes?.length) {
    return null;
  }

  return (
    <div className={className}>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Specifications</h2>
      <div className="grid gap-3">
        {product.attributes.map((attribute) => (
          <div key={attribute.key} className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-sm font-medium text-gray-600">{attribute.label}</span>
            <span className="text-sm text-gray-900">{attribute.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
