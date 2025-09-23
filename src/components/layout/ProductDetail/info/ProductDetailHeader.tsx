import { useRef } from 'react';
import { useProductDetail } from '../providers/ProductDetailContext';
import { useDataSource } from '@/hooks/inspector/useInspectorTracking';
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
  const elementRef = useRef<HTMLDivElement>(null);

  // Register with Demo Inspector - dynamic source based on variant selection
  useDataSource({
    componentName: 'ProductDetailHeader',
    source: 'catalog', // Primary source
    elementRef,
    dynamicSource: () => (selectedVariant && allAttributesSelected ? 'commerce' : 'catalog'),
    fieldMappings: {
      manufacturer: 'catalog',
      name: 'catalog',
      sku: selectedVariant && allAttributesSelected ? 'commerce' : 'catalog',
    },
    dependencies: [selectedVariant, allAttributesSelected],
  });

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
    <div ref={elementRef} className={className}>
      <div className="space-y-3">
        {/* Manufacturer - slightly more prominent */}
        {product.manufacturer && (
          <p
            className="text-sm font-medium text-gray-600 uppercase tracking-wide"
            data-inspector-field="manufacturer"
            data-inspector-source="catalog"
          >
            {product.manufacturer}
          </p>
        )}

        {/* Product name - primary heading with better spacing */}
        <div className="space-y-2">
          <h1
            className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-4xl leading-tight"
            data-inspector-field="name"
            data-inspector-source="catalog"
          >
            {product.name}
          </h1>

          {/* SKU - positioned closer to product name for better grouping */}
          <div
            className="text-sm font-normal transition-all duration-300 ease-in-out"
            data-inspector-field="sku"
            data-inspector-source={
              selectedVariant && allAttributesSelected ? 'commerce' : 'catalog'
            }
            data-inspector-variant={selectedVariant && allAttributesSelected ? 'true' : 'false'}
          >
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
        <div
          className="flex items-center gap-3 pt-4"
          data-inspector-field="stock"
          data-inspector-source={selectedVariant && allAttributesSelected ? 'commerce' : 'catalog'}
        >
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
