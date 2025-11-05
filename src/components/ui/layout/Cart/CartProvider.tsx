'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAdobeCommerceCart } from '@/hooks/cart/useAdobeCommerceCart';
import type { CartContextValue } from './Cart.types';

// Create the cart context
const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

/**
 * Cart context provider that manages global cart state with Adobe Commerce API.
 *
 * Features:
 * - Adobe Commerce GraphQL API integration
 * - Cart persistence across sessions
 * - Support for configurable products with options
 * - Consistent API across all components
 * - Auto-open cart on item addition
 *
 * @param {Object} props - Provider props
 * @param {ReactNode} props.children - Child components
 * @example
 * <CartProvider>
 *   <App />
 * </CartProvider>
 */
export function CartProvider({ children }: CartProviderProps) {
  const cartState = useAdobeCommerceCart();

  const value: CartContextValue = {
    // Cart state
    items: cartState.items,
    isOpen: cartState.isOpen,
    itemCount: cartState.itemCount,
    subtotal: cartState.subtotal,
    isLoading: cartState.isLoading,

    // Cart actions
    addItem: cartState.addItem,
    updateQuantity: cartState.updateQuantity,
    removeItem: cartState.removeItem,
    clearCart: cartState.clearCart,

    // Cart UI actions
    openCart: () => cartState.setIsOpen(true),
    closeCart: cartState.closeCart,
    toggleCart: cartState.toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Hook to access the cart context.
 * Must be used within a CartProvider.
 *
 * @returns {CartContextValue} Cart state and actions
 * @throws {Error} If used outside CartProvider
 * @example
 * const {
 *   items,
 *   itemCount,
 *   addItem,
 *   removeItem,
 *   isOpen,
 *   toggleCart
 * } = useCart();
 *
 * return (
 *   <button onClick={() => addItem(product)}>
 *     Add to Cart ({itemCount})
 *   </button>
 * );
 */
export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
