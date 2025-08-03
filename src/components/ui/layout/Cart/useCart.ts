'use client';

import { useState, useCallback } from 'react';
import { useCartPanel } from './useCartPanel';
import type { CartContextValue, CartItem } from './Cart.types';

/**
 * Return type for useCart hook
 */
export type UseCartReturn = CartContextValue;

export function useCart(): UseCartReturn {
  const [items, setItems] = useState<readonly CartItem[]>([]);
  const { isOpen, toggle, close, panelRef } = useCartPanel();

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeItem]);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return {
    items,
    itemCount,
    isOpen,
    toggle,
    close,
    addItem,
    removeItem,
    updateQuantity,
    panelRef
  };
} 