import type { BaseComponentProps, BasePanelProps, BasePanelContextValue } from '@/types/ui';

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
export type CartRootProps = BaseComponentProps;
export type CartIconProps = BasePanelProps;
export type CartPanelProps = BasePanelProps;

// Compound component type
export interface CartComponent {
  Root: React.FC<CartRootProps>;
  Icon: React.FC<CartIconProps>;
  Panel: React.FC<CartPanelProps>;
} 