'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useCartWithStorage } from '@/hooks/useCartWithStorage';
import type { CartContextValue } from './Cart.types';

// Create the cart context
const CartContext = createContext<CartContextValue | undefined>(undefined);

interface UnifiedCartProviderProps {
  children: ReactNode;
}

/**
 * Unified cart context provider that manages global cart state with localStorage persistence.
 * This replaces both the old CartProvider and useCart hook inconsistencies.
 *
 * Features:
 * - Automatic localStorage persistence
 * - Support for configurable products with options
 * - Consistent API across all components
 * - Auto-open cart on item addition
 *
 * @param {Object} props - Provider props
 * @param {ReactNode} props.children - Child components
 * @example
 * <UnifiedCartProvider>
 *   <App />
 * </UnifiedCartProvider>
 */
export function UnifiedCartProvider({ children }: UnifiedCartProviderProps) {
  const cartState = useCartWithStorage();

  const value: CartContextValue = {
    // Cart state
    items: cartState.items,
    isOpen: cartState.isOpen,
    itemCount: cartState.itemCount,
    subtotal: cartState.subtotal,

    // Cart actions
    addItem: cartState.addItem,
    updateQuantity: cartState.updateQuantity,
    removeItem: cartState.removeItem,
    clearCart: cartState.clearCart,

    // Cart UI actions
    openCart: cartState.openCart,
    closeCart: cartState.closeCart,
    toggleCart: cartState.toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Hook to access the unified cart context.
 * Must be used within a UnifiedCartProvider.
 *
 * @returns {CartContextValue} Cart state and actions
 * @throws {Error} If used outside UnifiedCartProvider
 * @example
 * const {
 *   items,
 *   itemCount,
 *   addItem,
 *   removeItem,
 *   isOpen,
 *   toggleCart
 * } = useUnifiedCart();
 *
 * return (
 *   <button onClick={() => addItem(product)}>
 *     Add to Cart ({itemCount})
 *   </button>
 * );
 */
export function useUnifiedCart(): CartContextValue {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useUnifiedCart must be used within a UnifiedCartProvider');
  }

  return context;
}

// Export for backward compatibility and gradual migration
export { useUnifiedCart as useCart };
