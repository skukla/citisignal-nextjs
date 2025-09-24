import { ReactNode } from 'react';
import type { BaseComponentProps } from '@/types/ui';

// Selected options for configurable products
export interface CartItemOption {
  attributeCode: string;
  label: string;
  value: string;
  valueLabel: string;
}

// Cart Item type with support for configurable products
export interface CartItem {
  id: string;
  name: string;
  price: string; // Formatted display price: "$1,199.99"
  priceValue: number; // Raw numeric price: 1199.99 (for calculations)
  quantity: number;
  imageUrl?: string; // Cart-optimized image URL (prefer thumbnail role)
  // For configurable products
  selectedOptions?: CartItemOption[];
  // Unique identifier including options (e.g., "product-123-color-red-size-large")
  variantId?: string;
}

// Context types for unified cart system
export interface CartContextValue {
  // Cart state
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  isLoading: boolean;

  // Cart actions
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;

  // Cart UI actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

// Component props
export interface CartRootProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export interface CartHeaderProps extends BaseComponentProps {
  title?: string;
}

export interface CartBodyProps extends BaseComponentProps {
  emptyStateIcon?: React.ElementType;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
}

export interface CartItemProps extends BaseComponentProps {
  item: CartItem;
}

export interface CartFooterProps extends BaseComponentProps {
  showShippingNote?: boolean;
  checkoutLabel?: string;
}

// Utility functions
export function generateVariantId(productId: string, selectedOptions?: CartItemOption[]): string {
  if (!selectedOptions || selectedOptions.length === 0) {
    return productId;
  }

  const optionString = selectedOptions
    .sort((a, b) => a.attributeCode.localeCompare(b.attributeCode))
    .map((option) => `${option.attributeCode}-${option.value}`)
    .join('-');

  return `${productId}-${optionString}`;
}

export function formatCartItemName(name: string, selectedOptions?: CartItemOption[]): string {
  if (!selectedOptions || selectedOptions.length === 0) {
    return name;
  }

  const optionsText = selectedOptions.map((option) => option.valueLabel).join(', ');

  return `${name} (${optionsText})`;
}

// Type guards
export function isCartItem(item: unknown): item is CartItem {
  return (
    typeof item === 'object' &&
    item !== null &&
    'id' in item &&
    'name' in item &&
    'price' in item &&
    'quantity' in item
  );
}

export function isValidCartItemOption(option: unknown): option is CartItemOption {
  return (
    typeof option === 'object' &&
    option !== null &&
    'attributeCode' in option &&
    'label' in option &&
    'value' in option &&
    'valueLabel' in option
  );
}

/**
 * Find the best cart image for a configurable product with selected options
 * Looks for matching variant image, falls back to configurable product image
 * @param {object} product - Product with variants and configurable options
 * @param {array} selectedOptions - Selected variant options
 * @returns {string|undefined} Best cart image URL
 */
export function getVariantCartImage(
  product: unknown,
  selectedOptions: CartItemOption[]
): string | undefined {
  const productData = product as {
    thumbnail?: { url: string };
    image?: { url: string };
    variants?: Array<{
      attributes?: Record<string, string>;
      image?: { url: string };
    }>;
  };

  if (!productData || !selectedOptions || selectedOptions.length === 0) {
    return productData?.thumbnail?.url || productData?.image?.url;
  }

  // Try to find matching variant based on selected options
  const matchingVariant = productData.variants?.find((variant) => {
    if (!variant.attributes) return false;

    // Check if all selected options match this variant's attributes
    return selectedOptions.every(
      (option) => variant.attributes?.[option.attributeCode] === option.value
    );
  });

  // Return variant's thumbnail, or fall back to product's thumbnail
  return matchingVariant?.image?.url || productData?.thumbnail?.url || productData?.image?.url;
}

/**
 * Parse price string and convert to number, handling commas and currency symbols
 * @param {string} priceString - Price string like "$1,199.99" or "1199.99"
 * @returns {number} Numeric price value
 */
function parsePrice(priceString: string): number {
  if (!priceString) return 0;

  // Remove currency symbols and commas, then parse
  const cleanPrice = priceString.replace(/[\$,]/g, '');
  return parseFloat(cleanPrice) || 0;
}

/**
 * Get the raw numeric price for a specific variant based on selected options
 * Looks for matching variant price, falls back to configurable product price
 * @param {object} product - Product with variants and configurable options
 * @param {array} selectedOptions - Selected variant options
 * @returns {number} Variant price as number (for calculations)
 */
export function getVariantPriceValue(product: unknown, selectedOptions: CartItemOption[]): number {
  const productData = product as {
    priceValue?: number;
    price?: string;
    variants?: Array<{
      attributes?: Record<string, string>;
      priceValue?: number;
      price?: string;
    }>;
  };

  // Prefer raw numeric field, fall back to parsing display string
  const fallbackPrice = productData?.priceValue ?? parsePrice(productData?.price || '0');

  if (!productData || !selectedOptions || selectedOptions.length === 0) {
    return fallbackPrice;
  }

  // Try to find matching variant based on selected options
  const matchingVariant = productData.variants?.find((variant) => {
    if (!variant.attributes) return false;

    // Check if all selected options match this variant's attributes
    return selectedOptions.every(
      (option) => variant.attributes?.[option.attributeCode] === option.value
    );
  });

  // Return variant's price (prefer raw number, fall back to parsing display string)
  if (matchingVariant) {
    return matchingVariant.priceValue ?? parsePrice(matchingVariant.price || '0');
  }

  return fallbackPrice;
}

/**
 * Get the formatted display price for a specific variant based on selected options
 * Looks for matching variant price, falls back to configurable product price
 * @param {object} product - Product with variants and configurable options
 * @param {array} selectedOptions - Selected variant options
 * @returns {string} Variant price as formatted string (for display)
 */
export function getVariantPrice(product: unknown, selectedOptions: CartItemOption[]): string {
  const productData = product as {
    price?: string;
    variants?: Array<{
      attributes?: Record<string, string>;
      price?: string;
    }>;
  };

  // Prefer formatted display string, fall back to product's formatted price
  const fallbackPrice = productData?.price || '$0.00';

  if (!productData || !selectedOptions || selectedOptions.length === 0) {
    return fallbackPrice;
  }

  // Try to find matching variant based on selected options
  const matchingVariant = productData.variants?.find((variant) => {
    if (!variant.attributes) return false;

    // Check if all selected options match this variant's attributes
    return selectedOptions.every(
      (option) => variant.attributes?.[option.attributeCode] === option.value
    );
  });

  // Return variant's formatted price, or fall back to product's formatted price
  if (matchingVariant?.price) {
    return matchingVariant.price;
  }

  return fallbackPrice;
}
