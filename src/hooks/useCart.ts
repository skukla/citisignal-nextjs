import { useState, useCallback } from 'react';

interface UseCartReturn {
  itemCount: number;
  addToCart: (productId: string | number) => void;
  removeFromCart: (productId: string | number) => void;
  clearCart: () => void;
}

export default function useCart(): UseCartReturn {
  // In a real app, this would likely use localStorage or a global state management solution
  const [itemCount, setItemCount] = useState(0);

  const addToCart = useCallback((productId: string | number) => {
    setItemCount(prev => prev + 1);
    // Additional cart logic would go here
  }, []);

  const removeFromCart = useCallback((productId: string | number) => {
    setItemCount(prev => Math.max(0, prev - 1));
    // Additional cart logic would go here
  }, []);

  const clearCart = useCallback(() => {
    setItemCount(0);
    // Additional cart logic would go here
  }, []);

  return {
    itemCount,
    addToCart,
    removeFromCart,
    clearCart
  };
} 