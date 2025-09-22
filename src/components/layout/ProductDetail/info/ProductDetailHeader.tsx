import { useProductDetail } from '../providers/ProductDetailContext';
import Badge from '@/components/ui/foundations/Badge';
import type { ProductDetailHeaderProps } from '../types';

/**
 * ProductDetailHeader component
 * Displays product name, manufacturer, and stock status
 * Reuses existing Badge component for stock indicators
 */
export function ProductDetailHeader({
  className,
  selectedVariant,
  allAttributesSelected,
}: ProductDetailHeaderProps) {
  const { product, loading } = useProductDetail();

  if (loading) {
    return (
      <div className={className}>
        <div className="space-y-2">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className={className}>
      <div className="space-y-3">
        {/* Manufacturer - slightly more prominent */}
        {product.manufacturer && (
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {product.manufacturer}
          </p>
        )}

        {/* Product name - primary heading with better spacing */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-4xl leading-tight">
            {product.name}
          </h1>

          {/* SKU - positioned closer to product name for better grouping */}
          <div className="text-sm font-normal transition-all duration-300 ease-in-out">
            {selectedVariant && allAttributesSelected ? (
              <div className="text-gray-500">
                <span className="uppercase tracking-wider text-xs">SKU:</span>{' '}
                <span className="text-gray-700 font-medium ml-1">{selectedVariant.sku}</span>
              </div>
            ) : (
              <div className="text-gray-500">
                <span className="uppercase tracking-wider text-xs">SKU:</span>{' '}
                <span className="text-gray-700 font-medium ml-1">{product.sku}</span>
              </div>
            )}
          </div>
        </div>

        {/* Stock status - with more separation from product info */}
        <div className="flex items-center gap-3 pt-4">
          {product.inStock ? (
            <Badge variant="success" size="md">
              In Stock
            </Badge>
          ) : (
            <Badge variant="error" size="md">
              Out of Stock
            </Badge>
          )}

          {/* Stock level if available */}
          {product.stockLevel && product.stockLevel > 0 && product.stockLevel <= 10 && (
            <Badge variant="warning" size="md">
              Only {product.stockLevel} left
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
