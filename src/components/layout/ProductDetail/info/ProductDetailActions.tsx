import { useRef } from 'react';
import { useProductDetail } from '../providers/ProductDetailContext';
import { useDataSource } from '@/hooks/inspector/useInspectorTracking';
// import { useProductActions } from '@/hooks/useProductActions';
import Button from '@/components/ui/foundations/Button';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import type { ProductDetailActionsProps } from '../types';

/**
 * ProductDetailActions component
 * Add to cart and wishlist actions with attribute validation
 * Reuses existing hooks and Button component
 */
export function ProductDetailActions({
  className,
  selectedOptions = {},
  allAttributesSelected = true,
}: ProductDetailActionsProps) {
  const { product, loading } = useProductDetail();
  const elementRef = useRef<HTMLDivElement>(null);
  // TODO: Uncomment when hooks are available
  // const { addToCart, toggleWishlist, isWishlisted } = useProductActions();

  // Register with Demo Inspector - actions based on stock/variant selection
  useDataSource({
    componentName: 'ProductDetailActions',
    source: 'catalog', // Primary source for stock status
    elementRef,
    dynamicSource: () => (allAttributesSelected ? 'commerce' : 'catalog'),
    fieldMappings: {
      'add-to-cart': allAttributesSelected ? 'commerce' : 'catalog',
      'stock-status': allAttributesSelected ? 'commerce' : 'catalog',
      wishlist: 'catalog', // Wishlist action is always catalog-based
    },
    dependencies: [allAttributesSelected],
  });

  if (loading) {
    return (
      <div className={className}>
        <div className="space-y-3">
          <div className="h-12 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  // Mock functions for testing
  const isWishlistedProduct = false;
  const handleAddToCart = () => {
    console.log('Add to cart:', {
      productId: product.id,
      selectedOptions,
    });
  };
  const handleToggleWishlist = () => console.log('Toggle wishlist:', product.id);

  // Check if product has configurable options
  const hasConfigurableOptions =
    product.configurable_options && product.configurable_options.length > 0;

  // Determine if Add to Cart should be disabled
  const isAddToCartDisabled =
    !product.inStock || (hasConfigurableOptions && !allAttributesSelected);

  // Determine button text
  const getButtonText = () => {
    if (!product.inStock) return 'Out of Stock';
    return 'Add to Cart';
  };

  return (
    <div ref={elementRef} className={className}>
      <div className="space-y-3">
        {/* Add to Cart */}
        <Button
          onClick={handleAddToCart}
          disabled={isAddToCartDisabled}
          variant="primary"
          size="lg"
          className="w-full"
          data-inspector-field="add-to-cart"
          data-inspector-source={allAttributesSelected ? 'commerce' : 'catalog'}
          data-inspector-variant-selected={allAttributesSelected ? 'true' : 'false'}
        >
          {getButtonText()}
        </Button>

        {/* Wishlist */}
        <Button
          onClick={handleToggleWishlist}
          variant="secondary"
          size="md"
          className="w-full"
          data-inspector-field="wishlist"
          data-inspector-source="catalog"
        >
          {isWishlistedProduct ? (
            <>
              <HeartIconSolid className="h-5 w-5 text-red-500" />
              Remove from Wishlist
            </>
          ) : (
            <>
              <HeartIcon className="h-5 w-5" />
              Add to Wishlist
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
