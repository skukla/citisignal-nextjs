import { useProductDetail } from '../providers/ProductDetailContext';
import { calculateDiscountPercentage } from '@/lib/pricing';
import type { ProductDetailPriceProps } from '../types';

/**
 * ProductDetailPrice component
 * Displays product pricing with sale indicators
 * Reuses the same pricing logic as ProductCard
 */
export function ProductDetailPrice({ className, selectedVariant }: ProductDetailPriceProps) {
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

  // Use variant price if available and complete selection, otherwise use product price
  const currentPrice = selectedVariant?.price || product.price;
  const originalPrice = selectedVariant?.originalPrice || product.originalPrice;
  const isOnSale = originalPrice && originalPrice !== currentPrice;

  // Calculate discount percentage for variant if needed
  const discountPercent =
    selectedVariant && selectedVariant.originalPrice && selectedVariant.price
      ? calculateDiscountPercentage(selectedVariant.originalPrice, selectedVariant.price)
      : product.discountPercent;

  return (
    <div className={className}>
      <div className="space-y-3">
        {/* Current price - enhanced hierarchy */}
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-gray-900 tracking-tight">{currentPrice}</span>

          {/* Original price if on sale */}
          {isOnSale && (
            <span className="text-xl text-gray-500 line-through font-medium">{originalPrice}</span>
          )}
        </div>

        {/* Discount percentage - improved styling */}
        {discountPercent && discountPercent > 0 && (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800">
              Save {discountPercent}%
            </span>
            {isOnSale && (
              <span className="text-sm text-gray-600">
                You save {/* Calculate savings amount if needed */}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
