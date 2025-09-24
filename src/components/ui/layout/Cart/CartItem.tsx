'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import Button from '@/components/ui/foundations/Button';
import { CartQuantity } from './CartQuantity';
import { useCart } from './CartProvider';
import { useToast } from '@/hooks/useToast';
import type { CartItemProps } from './Cart.types';

export function CartItem({ item, className }: CartItemProps) {
  const { removeItem } = useCart();
  const { showToast } = useToast();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    if (isRemoving) return;

    setIsRemoving(true);

    try {
      // Small delay to show feedback
      await new Promise((resolve) => setTimeout(resolve, 200));
      removeItem(item.variantId || item.id);
      showToast('success', 'Item removed', `${item.name} was removed from your cart`);
    } catch (error) {
      console.error('Failed to remove item:', error);
      showToast('error', 'Remove failed', 'Unable to remove item from cart');
      setIsRemoving(false);
    }
  };

  return (
    <div className={twMerge('flex py-6 px-6', className)}>
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={96}
            height={96}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <div className="h-full w-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>{item.name}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            disabled={isRemoving}
            leftIcon={isRemoving ? undefined : XMarkIcon}
            className={twMerge(
              'text-gray-400 hover:text-gray-500 disabled:opacity-50',
              isRemoving && 'pointer-events-none'
            )}
            aria-label="Remove item"
          >
            {isRemoving && (
              <div className="animate-spin rounded-full h-4 w-4 border border-gray-400 border-t-transparent" />
            )}
          </Button>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <CartQuantity item={item} />
          <p className="text-gray-500">${item.price}</p>
        </div>
      </div>
    </div>
  );
}
