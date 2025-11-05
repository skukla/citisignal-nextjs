'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { CartItem } from '@/components/ui/layout/Cart/Cart.types';

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

/**
 * Cart context provider that manages global cart state.
 * Should be placed high in the component tree to provide cart access throughout the app.
 *
 * @param {Object} props - Provider props
 * @param {ReactNode} props.children - Child components
 * @example
 * <CartProvider>
 *   <App />
 * </CartProvider>
 */
export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.priceValue * item.quantity, 0);

  const addItem = useCallback((newItem: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === newItem.id);

      if (existingItem) {
        // Update quantity if item already exists
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      // Add new item with quantity 1
      return [...prev, { ...newItem, quantity: 1 }];
    });

    // Auto-open cart when item is added (common UX pattern)
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(id);
        return;
      }

      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setIsOpen(false);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const value: CartContextValue = {
    items,
    isOpen,
    itemCount,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Hook to access cart context.
 * Must be used within a CartProvider.
 *
 * @returns {Object} Cart state and actions
 * @throws {Error} If used outside CartProvider
 * @example
 * const {
 *   items,
 *   itemCount,
 *   addItem,
 *   removeItem,
 *   isOpen,
 *   toggleCart
 * } = useCartContext();
 *
 * return (
 *   <button onClick={() => addItem(product)}>
 *     Add to Cart ({itemCount})
 *   </button>
 * );
 */
export function useCartContext(): CartContextValue {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }

  return context;
}
