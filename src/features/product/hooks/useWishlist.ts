import { useState, useCallback } from 'react';

export function useWishlist() {
  const [wishlisted, setWishlisted] = useState<Record<string, boolean>>({});
  
  const toggleWishlist = useCallback((productId: string) => {
    setWishlisted(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  }, []);

  const isWishlisted = useCallback((productId: string) => {
    return wishlisted[productId] || false;
  }, [wishlisted]);

  return { isWishlisted, toggleWishlist };
}