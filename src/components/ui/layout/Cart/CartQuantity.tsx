'use client';

import { useState } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/foundations/Button';
import { useCart } from './CartProvider';
import { useToast } from '@/hooks/useToast';
import type { CartItem } from './Cart.types';

interface CartQuantityProps {
  item: CartItem;
}

export function CartQuantity({ item }: CartQuantityProps) {
  const { updateQuantity, removeItem } = useCart();
  const { showToast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity === item.quantity || isUpdating) return;

    setIsUpdating(true);

    try {
      if (newQuantity <= 0) {
        removeItem(item.variantId || item.id);
        showToast('success', 'Item removed', `${item.name} was removed from your cart`);
      } else {
        const oldQuantity = item.quantity;
        updateQuantity(item.variantId || item.id, newQuantity);

        if (newQuantity > oldQuantity) {
          showToast('success', 'Quantity updated', `Increased to ${newQuantity}`);
        } else {
          showToast('success', 'Quantity updated', `Decreased to ${newQuantity}`);
        }
      }

      // Small delay to show feedback
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error) {
      console.error('Failed to update quantity:', error);
      showToast('error', 'Update failed', 'Unable to update item quantity');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDecrement = () => handleQuantityChange(item.quantity - 1);
  const handleIncrement = () => handleQuantityChange(item.quantity + 1);

  return (
    <div className="flex items-center gap-1">
      <label className="sr-only">Quantity for {item.name}</label>

      {/* Decrease button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDecrement}
        disabled={isUpdating}
        className="h-8 w-8 p-0 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        aria-label="Decrease quantity"
      >
        <MinusIcon className="h-4 w-4" />
      </Button>

      {/* Quantity display */}
      <div className="flex items-center justify-center min-w-[2.5rem] h-8 px-2 text-sm font-medium border-t border-b border-gray-300 bg-gray-50">
        {isUpdating ? (
          <div className="animate-spin rounded-full h-3 w-3 border border-purple-600 border-t-transparent" />
        ) : (
          item.quantity
        )}
      </div>

      {/* Increase button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleIncrement}
        disabled={isUpdating || item.quantity >= 10}
        className="h-8 w-8 p-0 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        aria-label="Increase quantity"
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
