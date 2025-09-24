'use client';

import { useState, useCallback, useEffect } from 'react';
import type { CartItem, CartItemOption } from '@/components/ui/layout/Cart/Cart.types';
import { generateVariantId } from '@/components/ui/layout/Cart/Cart.types';

const CART_STORAGE_KEY = 'citisignal-cart';

// Hook for cart with localStorage persistence
export function useCartWithStorage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        }
      }
    } catch (error) {
      console.warn('Failed to load cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.warn('Failed to save cart to localStorage:', error);
    }
  }, [items]);

  // Computed values
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  // Helper to manage loading state
  const withLoadingState = useCallback(async (operation: () => void | Promise<void>) => {
    setIsLoading(true);
    try {
      await operation();
      // Small delay to show loading feedback
      await new Promise((resolve) => setTimeout(resolve, 300));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add item to cart with loading state
  const addItem = useCallback(
    (newItem: Omit<CartItem, 'quantity'>) => {
      withLoadingState(() => {
        const variantId =
          newItem.variantId || generateVariantId(newItem.id, newItem.selectedOptions);

        setItems((prev) => {
          const existingItem = prev.find(
            (item) =>
              (item.variantId || generateVariantId(item.id, item.selectedOptions)) === variantId
          );

          if (existingItem) {
            // Update quantity if item already exists
            return prev.map((item) =>
              (item.variantId || generateVariantId(item.id, item.selectedOptions)) === variantId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }

          // Add new item with quantity 1 and ensure variantId is set
          return [
            ...prev,
            {
              ...newItem,
              quantity: 1,
              variantId: variantId,
            },
          ];
        });

        // Auto-open cart when item is added (common UX pattern)
        setIsOpen(true);
      });
    },
    [withLoadingState]
  );

  // Update quantity for a specific variant with loading state
  const updateQuantity = useCallback(
    (variantId: string, quantity: number) => {
      withLoadingState(() => {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          setItems((prev) =>
            prev.filter(
              (item) =>
                (item.variantId || generateVariantId(item.id, item.selectedOptions)) !== variantId
            )
          );
          return;
        }

        setItems((prev) =>
          prev.map((item) =>
            (item.variantId || generateVariantId(item.id, item.selectedOptions)) === variantId
              ? { ...item, quantity }
              : item
          )
        );
      });
    },
    [withLoadingState]
  );

  // Remove item from cart with loading state
  const removeItem = useCallback(
    (variantId: string) => {
      withLoadingState(() => {
        setItems((prev) =>
          prev.filter(
            (item) =>
              (item.variantId || generateVariantId(item.id, item.selectedOptions)) !== variantId
          )
        );
      });
    },
    [withLoadingState]
  );

  // Clear entire cart
  const clearCart = useCallback(() => {
    setItems([]);
    setIsOpen(false);
  }, []);

  // Cart UI controls
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  // Helper function to add item with options (for configurable products)
  const addItemWithOptions = useCallback(
    (
      productId: string,
      name: string,
      price: number,
      imageUrl: string | undefined,
      selectedOptions?: CartItemOption[]
    ) => {
      const variantId = generateVariantId(productId, selectedOptions);

      addItem({
        id: productId,
        name,
        price,
        imageUrl,
        selectedOptions,
        variantId,
      });
    },
    [addItem]
  );

  return {
    // State
    items,
    isOpen,
    itemCount,
    subtotal,
    isLoading,

    // Actions
    addItem,
    addItemWithOptions,
    updateQuantity,
    removeItem,
    clearCart,

    // UI Controls
    openCart,
    closeCart,
    toggleCart,
  };
}
