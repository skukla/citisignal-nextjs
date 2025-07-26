'use client';

import { useState, useCallback } from 'react';

interface UseWishlistProps {
  productId: string | number;
  onWishlistChange?: (productId: string | number, isWishlisted: boolean) => void;
}

interface UseWishlistResult {
  isWishlisted: boolean;
  toggleWishlist: () => void;
  addToWishlist: () => void;
  removeFromWishlist: () => void;
}

export default function useWishlist({
  productId,
  onWishlistChange
}: UseWishlistProps): UseWishlistResult {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const updateWishlist = useCallback((newState: boolean) => {
    setIsWishlisted(newState);
    onWishlistChange?.(productId, newState);
  }, [productId, onWishlistChange]);

  const toggleWishlist = useCallback(() => {
    updateWishlist(!isWishlisted);
  }, [isWishlisted, updateWishlist]);

  const addToWishlist = useCallback(() => {
    updateWishlist(true);
  }, [updateWishlist]);

  const removeFromWishlist = useCallback(() => {
    updateWishlist(false);
  }, [updateWishlist]);

  return {
    isWishlisted,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist
  };
} 