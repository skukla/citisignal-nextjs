'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/ui/layout/Cart/useCart';
import { useWishlist } from '@/components/ui/cards/ProductCard/useWishlist';
import type { BaseProduct } from '@/types/commerce';

export interface UseProductActionsReturn {
  viewProduct: (productId: string) => void;
  addToCart: (product: BaseProduct) => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

/**
 * Business logic hook for product-related actions.
 * Handles product navigation, cart operations, and wishlist.
 *
 * @returns {Object} Product action handlers
 * @example
 * const { viewProduct, addToCart, toggleWishlist } = useProductActions();
 */
export function useProductActions(): UseProductActionsReturn {
  const router = useRouter();
  const { addItem } = useCart();
  const { toggleWishlist: toggleWishlistState, isWishlisted } = useWishlist();

  /**
   * Navigate to product details page
   */
  const viewProduct = useCallback(
    (productId: string) => {
      router.push(`/${productId}`);
    },
    [router]
  );

  /**
   * Add product to cart with proper cart item structure
   */
  const addToCart = useCallback(
    (product: BaseProduct) => {
      addItem({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price) || 0,
        imageUrl: product.image?.url || '',
      });
    },
    [addItem]
  );

  /**
   * Toggle product wishlist status
   */
  const toggleWishlist = useCallback(
    (productId: string) => {
      toggleWishlistState(productId);
    },
    [toggleWishlistState]
  );

  return {
    viewProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
  };
}
