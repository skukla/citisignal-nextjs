'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/ui/layout/Cart/useCart';
import { useWishlist } from '@/components/ui/cards/ProductCard/useWishlist';
import type { Phone, Watch, Accessory } from '@/types/commerce';

type Product = Phone | Watch | Accessory;

export interface UseProductActionsReturn {
  viewProduct: (productId: string, category: string) => void;
  addToCart: (product: Product) => void;
  toggleWishlist: (productId: string, isCurrentlyWishlisted: boolean) => void;
  quickView: (productId: string) => void;
  compare: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

/**
 * Business logic hook for product-related actions.
 * Handles product navigation, cart operations, wishlist, and comparison.
 * 
 * @returns {Object} Product action handlers
 * @example
 * const {
 *   viewProduct,
 *   addToCart,
 *   toggleWishlist,
 *   quickView,
 *   compare
 * } = useProductActions();
 * 
 * <ProductGrid
 *   products={products}
 *   onViewProduct={(id) => viewProduct(id, 'phones')}
 *   onAddToCart={addToCart}
 *   onWishlistToggle={toggleWishlist}
 * />
 */
export function useProductActions(): UseProductActionsReturn {
  const router = useRouter();
  const { addItem } = useCart();
  const { toggleWishlist: toggleWishlistState, isWishlisted } = useWishlist();

  /**
   * Navigate to product details page
   */
  const viewProduct = useCallback((productId: string, category: string) => {
    router.push(`/${category}/${productId}`);
  }, [router]);

  /**
   * Add product to cart with proper cart item structure
   */
  const addToCart = useCallback((product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.images?.[0]?.url || ''
    });
    
    // Business logic for cart addition
    console.log(`${product.name} added to cart`);
    
    // TODO: In a real app, you might want to:
    // - Show cart slide-out animation  
    // - Display success toast notification
    // - Track analytics event
    // - Check stock availability
    // - Suggest related products
  }, [addItem]);

  /**
   * Toggle product wishlist status
   */
  const toggleWishlist = useCallback((productId: string, isCurrentlyWishlisted: boolean) => {
    toggleWishlistState(productId);
    
    const action = isCurrentlyWishlisted ? 'removed from' : 'added to';
    console.log(`Product ${productId} ${action} wishlist`);
    
    // TODO: In a real app, you might want to:
    // - Sync with backend API
    // - Show notification toast
    // - Track user engagement analytics
    // - Update user preferences
  }, [toggleWishlistState]);

  /**
   * Open product quick view modal
   */
  const quickView = useCallback((productId: string) => {
    // TODO: Implement quick view modal logic
    console.log(`Opening quick view for product ${productId}`);
    
    // Business logic for quick view:
    // - Fetch detailed product data
    // - Open modal with product details
    // - Track quick view analytics
  }, []);

  /**
   * Add product to comparison list
   */
  const compare = useCallback((productId: string) => {
    // TODO: Implement product comparison logic
    console.log(`Adding product ${productId} to comparison`);
    
    // Business logic for comparison:
    // - Add to comparison state
    // - Validate comparison limits (max 3-4 items)
    // - Show comparison indicator
    // - Navigate to comparison page if requested
  }, []);

  return {
    viewProduct,
    addToCart,
    toggleWishlist,
    quickView,
    compare,
    isWishlisted
  };
}