import { useProductDetail } from '../providers/ProductDetailContext';
import Badge from '@/components/ui/foundations/Badge';
import type { ProductDetailHeaderProps } from '../types';

/**
 * ProductDetailHeader component
 * Displays product name, manufacturer, and stock status
 * Reuses existing Badge component for stock indicators
 */
export function ProductDetailHeader({ className }: ProductDetailHeaderProps) {
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
        {/* Manufacturer */}
        {product.manufacturer && (
          <p className="text-sm font-medium text-gray-600">{product.manufacturer}</p>
        )}

        {/* Product name */}
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>

        {/* Stock status */}
        <div className="flex items-center gap-2">
          {product.inStock ? (
            <Badge variant="success" size="sm">
              In Stock
            </Badge>
          ) : (
            <Badge variant="error" size="sm">
              Out of Stock
            </Badge>
          )}

          {/* Stock level if available */}
          {product.stockLevel && product.stockLevel > 0 && product.stockLevel <= 10 && (
            <Badge variant="warning" size="sm">
              Only {product.stockLevel} left
            </Badge>
          )}
        </div>

        {/* Short description */}
        {product.shortDescription && <p className="text-gray-600">{product.shortDescription}</p>}
      </div>
    </div>
  );
}
