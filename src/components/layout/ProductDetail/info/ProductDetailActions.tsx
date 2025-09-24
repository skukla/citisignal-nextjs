import { useRef } from 'react';
import { useProductDetail } from '../providers/ProductDetailContext';
import { useDataSource } from '@/hooks/inspector/useInspectorTracking';
import { useCart } from '@/components/ui/layout/Cart/CartProvider';
import {
  generateVariantId,
  formatCartItemName,
  getVariantCartImage,
  getVariantPrice,
  getVariantPriceValue,
} from '@/components/ui/layout/Cart/Cart.types';
import Button from '@/components/ui/foundations/Button';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import type { ProductDetailActionsProps } from '../types';
import type { CartItemOption } from '@/components/ui/layout/Cart/Cart.types';

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
  const { addItem } = useCart();
  const elementRef = useRef<HTMLDivElement>(null);

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

  // Convert selectedOptions to CartItemOption format
  const cartItemOptions: CartItemOption[] = Object.entries(selectedOptions).map(
    ([attributeCode, value]) => {
      // Find the option details from product's configurable_options
      const configurableOption = product.configurable_options?.find(
        (opt) => opt.attribute_code === attributeCode
      );
      const optionValue = configurableOption?.values.find((val) => val.value === value);

      return {
        attributeCode,
        label: configurableOption?.label || attributeCode,
        value: value as string,
        valueLabel: optionValue?.label || (value as string),
      };
    }
  );

  // Helper function to find the matching variant for selected options
  const findMatchingVariant = () => {
    if (!product?.variants || cartItemOptions.length === 0) {
      return null;
    }

    return product.variants.find((variant) => {
      if (!variant.attributes) return false;
      // Check if all selected options match this variant's attributes
      return cartItemOptions.every(
        (option) => variant.attributes?.[option.attributeCode] === option.value
      );
    });
  };

  // Actual cart functionality
  const handleAddToCart = () => {
    if (!product || isAddToCartDisabled) return;

    const variantId = generateVariantId(product.id, cartItemOptions);
    const displayName = formatCartItemName(product.name, cartItemOptions);

    // Get both formatted display price and raw numeric price
    const variantDisplayPrice = getVariantPrice(product, cartItemOptions);
    const variantNumericPrice = getVariantPriceValue(product, cartItemOptions);

    // For configurable products, we need the variant's SKU for Adobe Commerce
    const matchingVariant = findMatchingVariant();
    const productSku = matchingVariant?.sku || product.sku;

    addItem({
      id: productSku, // Use variant SKU for Adobe Commerce compatibility
      name: displayName,
      price: variantDisplayPrice, // Formatted: "$1,199.99"
      priceValue: variantNumericPrice, // Raw: 1199.99
      // Use variant-specific thumbnail, fall back to product thumbnail
      imageUrl: getVariantCartImage(product, cartItemOptions),
      selectedOptions: cartItemOptions.length > 0 ? cartItemOptions : undefined,
      variantId,
    });
  };

  // Mock wishlist for now
  const isWishlistedProduct = false;
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
