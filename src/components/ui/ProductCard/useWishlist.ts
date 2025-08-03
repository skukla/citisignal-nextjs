import { useState, useCallback } from 'react';

/**
 * Return type for useWishlist hook
 */
export interface UseWishlistReturn {
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
}

export function useWishlist(): UseWishlistReturn {
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