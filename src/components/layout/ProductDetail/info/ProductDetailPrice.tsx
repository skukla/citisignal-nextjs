import { useProductDetail } from '../providers/ProductDetailContext';
import type { ProductDetailPriceProps } from '../types';

/**
 * ProductDetailPrice component
 * Displays product pricing with sale indicators
 * Reuses the same pricing logic as ProductCard
 */
export function ProductDetailPrice({ className }: ProductDetailPriceProps) {
  const { product, loading } = useProductDetail();

  if (loading) {
    return (
      <div className={className}>
        <div className="space-y-2">
          <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const isOnSale = product.originalPrice && product.originalPrice !== product.price;

  return (
    <div className={className}>
      <div className="space-y-2">
        {/* Current price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">{product.price}</span>

          {/* Original price if on sale */}
          {isOnSale && (
            <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
          )}
        </div>

        {/* Discount percentage */}
        {product.discountPercent && product.discountPercent > 0 && (
          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
            Save {product.discountPercent}%
          </span>
        )}
      </div>
    </div>
  );
}
