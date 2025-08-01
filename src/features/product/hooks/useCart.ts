import { useCallback } from 'react';

export function useCart() {
  const addToCart = useCallback((productId: string) => {
    // TODO: Implement cart logic when cart feature is developed
    console.log('Adding to cart:', productId);
  }, []);

  return { addToCart };
}