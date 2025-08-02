'use client';

import { createContext, useContext } from 'react';
import type { CartRootProps, CartContextValue } from './Cart.types';
import { useCart } from './useCart';

// Create context
const CartContext = createContext<CartContextValue | null>(null);

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Cart components must be used within Cart.Root');
  }
  return context;
}

/**
 * Root component for the Cart feature. Provides context and state management
 * for the shopping cart functionality.
 *
 * @example
 * <Cart.Root>
 *   <Cart.Icon />
 *   <Cart.Panel />
 * </Cart.Root>
 */
export function CartRoot({ children, className }: CartRootProps) {
  const cartState = useCart();

  return (
    <CartContext.Provider value={cartState}>
      <div className={className}>
        {children}
      </div>
    </CartContext.Provider>
  );
}