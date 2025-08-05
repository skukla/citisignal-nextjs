import { ReactNode } from 'react';
import type { BaseComponentProps } from '@/types/ui';

// Cart Item type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

// Context types
export interface CartContextValue {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  subtotal: number;
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
  onCheckout?: () => void;
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