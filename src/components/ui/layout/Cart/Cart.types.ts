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
  price: number;
  quantity: number;
  imageUrl?: string;
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
