'use client';

import { useState, useCallback, useEffect } from 'react';
import useSWR, { mutate as swrMutate } from 'swr';
import type { CartItem } from '@/components/ui/layout/Cart/Cart.types';
import { generateVariantId } from '@/components/ui/layout/Cart/Cart.types';
import { graphqlFetcher } from '@/lib/graphql-fetcher';

// Import GraphQL operations (following working pattern from useProductDetail)
import GET_CART from '@/graphql/queries/GetCart.graphql';
import ADD_TO_CART from '@/graphql/mutations/AddToCart.graphql';
import UPDATE_CART_ITEM from '@/graphql/mutations/UpdateCartItem.graphql';
import REMOVE_FROM_CART from '@/graphql/mutations/RemoveFromCart.graphql';
import CLEAR_CART from '@/graphql/mutations/ClearCart.graphql';

// Cart ID management
const CART_ID_STORAGE_KEY = 'adobe-cart-id';

// Helper to create GraphQL request options with cart ID header
const createCartRequestOptions = (cartId: string | null) => ({
  headers: { 'x-cart-id': cartId || '' },
});

interface AdobeCartItem {
  id: string;
  productId: string;
  sku: string;
  name: string;
  quantity: number;
  priceValue: number;
  priceDisplay: string;
  totalValue: number;
  totalDisplay: string;
  image?: {
    url: string;
    altText?: string;
  };
  selectedOptions?: Array<{
    label: string;
    value: string;
    attributeCode: string;
  }>;
  variantDisplay?: string;
}

interface AdobeCart {
  id: string;
  itemCount: number;
  totalValue: number;
  totalDisplay: string;
  isEmpty: boolean;
  items: AdobeCartItem[];
}

interface CartOperationResult {
  success: boolean;
  cart: AdobeCart | null;
  errors?: string[];
  _debug?: string;
}

// Helper to transform Adobe Commerce cart item to local CartItem type
function transformAdobeCartItemToLocal(adobeItem: AdobeCartItem): CartItem {
  return {
    id: adobeItem.id,
    name: adobeItem.name,
    quantity: adobeItem.quantity,
    price: adobeItem.priceDisplay,
    priceValue: adobeItem.priceValue,
    imageUrl: adobeItem.image?.url,
    selectedOptions: adobeItem.selectedOptions?.map((opt) => ({
      attributeCode: opt.attributeCode,
      value: opt.value,
      label: opt.label,
      valueLabel: opt.value, // Map value to valueLabel for compatibility
    })),
    variantId: generateVariantId(
      adobeItem.productId,
      adobeItem.selectedOptions?.map((opt) => ({
        attributeCode: opt.attributeCode,
        value: opt.value,
        label: opt.label,
        valueLabel: opt.value,
      })) || []
    ),
  };
}

// Hook for Adobe Commerce cart operations (following useProductDetail pattern)
export function useAdobeCommerceCart() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartId, _setCartId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(CART_ID_STORAGE_KEY);
    }
    return null;
  });

  const setCartId = useCallback((newCartId: string | null) => {
    if (typeof window !== 'undefined') {
      if (newCartId) {
        localStorage.setItem(CART_ID_STORAGE_KEY, newCartId);
      } else {
        localStorage.removeItem(CART_ID_STORAGE_KEY);
      }
    }
    _setCartId(newCartId);
  }, []);

  // SWR hook for cart data (following exact pattern from useProductDetail)
  const key = cartId ? ['cart', cartId] : null;

  const { data, error, mutate } = useSWR(
    key,
    () => graphqlFetcher(GET_CART, {}, createCartRequestOptions(cartId)),
    {
      revalidateOnFocus: false,
      dedupingInterval: 5 * 60 * 1000,
    }
  );

  // Extract cart from GraphQL response (following useProductDetail pattern)
  const adobeCart = (data as { Citisignal_cart: AdobeCart | null })?.Citisignal_cart || null;
  const subtotal = adobeCart?.totalValue || 0;

  // Clear loading state when cart data changes
  useEffect(() => {
    if (adobeCart) {
      setIsLoading(false);
    }
  }, [adobeCart]);

  // Transform cart data for display
  const items = adobeCart?.items.map(transformAdobeCartItemToLocal) || [];
  const isEmpty = adobeCart?.isEmpty ?? true;

  // Helper function to execute mutations with loading state
  const withLoadingState = useCallback(async <T>(operation: () => Promise<T>): Promise<T> => {
    setIsLoading(true);
    try {
      const result = await operation();
      // Don't clear loading immediately - wait for SWR to update
      // Loading will be cleared by the useEffect when cart data changes
      return result;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, []);

  // Add item to cart
  const addItem = useCallback(
    async (item: Omit<CartItem, 'quantity'>) => {
      // Open cart immediately for better UX
      setIsOpen(true);

      return withLoadingState(async () => {
        try {
          const input = {
            productId: item.id, // For Adobe Commerce, this should be the variant SKU
            sku: item.id, // The item.id now contains the correct variant SKU
            quantity: 1,
            selectedOptions:
              item.selectedOptions?.map((opt) => ({
                attributeCode: opt.attributeCode,
                value: opt.value,
              })) || [],
          };

          const result = await graphqlFetcher<{ Citisignal_addToCart: CartOperationResult }>(
            ADD_TO_CART,
            { input },
            createCartRequestOptions(cartId)
          );

          if (result.Citisignal_addToCart.success && result.Citisignal_addToCart.cart) {
            const newCartData = { Citisignal_cart: result.Citisignal_addToCart.cart };

            // Store the cart ID first
            if (result.Citisignal_addToCart.cart.id) {
              setCartId(result.Citisignal_addToCart.cart.id);
            }

            // Force cache refresh with explicit key and data
            // CRITICAL FIX: Use the NEW cart ID from the mutation result, not the stale state
            const newCartId = result.Citisignal_addToCart.cart.id;
            const cacheKey = newCartId ? ['cart', newCartId] : null;

            if (cacheKey) {
              await swrMutate(cacheKey, newCartData, { revalidate: true });
            }
          } else {
            throw new Error(
              result.Citisignal_addToCart.errors?.[0] || 'Failed to add item to cart'
            );
          }
        } catch (error) {
          console.error('Add to cart error:', error);
          throw error;
        }
      });
    },
    [withLoadingState, setCartId, cartId]
  );

  // Update item quantity
  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      return withLoadingState(async () => {
        try {
          const input = {
            cartItemId: itemId,
            quantity,
          };
          const result = await graphqlFetcher<{ Citisignal_updateCartItem: CartOperationResult }>(
            UPDATE_CART_ITEM,
            { input },
            createCartRequestOptions(cartId)
          );
          if (result.Citisignal_updateCartItem.success) {
            // Force cache refresh with explicit key and data
            const newCartData = { Citisignal_cart: result.Citisignal_updateCartItem.cart };
            const cacheKey = cartId ? ['cart', cartId] : null;
            if (cacheKey) {
              await swrMutate(cacheKey, newCartData, { revalidate: true });
            }
          } else {
            throw new Error(
              result.Citisignal_updateCartItem.errors?.[0] || 'Failed to update cart item'
            );
          }
        } catch (error) {
          console.error('Update quantity error:', error);
          throw error;
        }
      });
    },
    [withLoadingState, cartId]
  );

  // Remove item from cart
  const removeItem = useCallback(
    async (itemId: string) => {
      return withLoadingState(async () => {
        try {
          const result = await graphqlFetcher<{ Citisignal_removeFromCart: CartOperationResult }>(
            REMOVE_FROM_CART,
            { cartItemId: itemId },
            createCartRequestOptions(cartId)
          );

          if (result.Citisignal_removeFromCart.success) {
            // Update cart ID if Adobe Commerce created a new cart (happens when removing last item)
            if (
              result.Citisignal_removeFromCart.cart?.id &&
              result.Citisignal_removeFromCart.cart.id !== cartId
            ) {
              setCartId(result.Citisignal_removeFromCart.cart.id);
            }

            // Force cache refresh with explicit key and data
            const newCartData = { Citisignal_cart: result.Citisignal_removeFromCart.cart };
            const cacheKey = cartId ? ['cart', cartId] : null;
            if (cacheKey) {
              await swrMutate(cacheKey, newCartData, { revalidate: true });
            }
          } else {
            throw new Error(
              result.Citisignal_removeFromCart.errors?.[0] || 'Failed to remove item'
            );
          }
        } catch (error) {
          console.error('Remove item error:', error);
          throw error;
        }
      });
    },
    [withLoadingState, cartId, setCartId]
  );

  // Clear the entire cart
  const clearCart = useCallback(async () => {
    return withLoadingState(async () => {
      try {
        const result = await graphqlFetcher<{ Citisignal_clearCart: CartOperationResult }>(
          CLEAR_CART,
          {},
          createCartRequestOptions(cartId)
        );
        if (result.Citisignal_clearCart.success) {
          setCartId(null); // Clear local cart ID
          // Force cache refresh - clear cart case
          const newCartData = { Citisignal_cart: result.Citisignal_clearCart.cart };
          const cacheKey = cartId ? ['cart', cartId] : null;
          if (cacheKey) {
            await swrMutate(cacheKey, newCartData, { revalidate: true });
          }
        } else {
          throw new Error(result.Citisignal_clearCart.errors?.[0] || 'Failed to clear cart');
        }
      } catch (error) {
        console.error('Clear cart error:', error);
        throw error;
      }
    });
  }, [withLoadingState, setCartId, cartId]);

  // Helper functions for cart UI
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const itemCount = items.reduce((total: number, item: CartItem) => total + item.quantity, 0);

  return {
    isOpen,
    setIsOpen,
    toggleCart,
    closeCart,
    items,
    itemCount,
    subtotal,
    isEmpty,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    isLoading,
    error,
  };
}
