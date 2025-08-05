'use client';

import { createContext, useContext, useMemo } from 'react';
import type { CartContextValue } from './Cart.types';
import { useCart } from './useCart';

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function CartProvider({ isOpen, onClose, children }: CartProviderProps) {
  const { items, updateQuantity, removeItem, getSubtotal } = useCart();

  const value = useMemo(() => ({
    isOpen,
    onClose,
    items,
    updateQuantity,
    removeItem,
    subtotal: getSubtotal()
  }), [isOpen, onClose, items, updateQuantity, removeItem, getSubtotal]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}