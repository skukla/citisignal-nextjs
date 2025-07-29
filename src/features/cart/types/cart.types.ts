import type { BaseComponentProps, BasePanelProps, BasePanelContextValue, CompoundComponent } from '@/types/ui';

// Cart item types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

// Context types
export interface CartContextValue extends BasePanelContextValue {
  items: readonly CartItem[];
  itemCount: number;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
}

// Component props
export interface CartRootProps extends BaseComponentProps {}
export interface CartIconProps extends BasePanelProps {}
export interface CartPanelProps extends BasePanelProps {}

// Compound component type
export type CartComponent = CompoundComponent<
  CartRootProps,
  CartIconProps,
  CartPanelProps
>; 