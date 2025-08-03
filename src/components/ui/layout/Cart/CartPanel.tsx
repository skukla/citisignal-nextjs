'use client';

import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/foundations/Button';
import EmptyState from '@/components/ui/feedback/EmptyState';
import type { CartPanelProps } from './Cart.types';
import { useCartContext } from './CartRoot';

/**
 * Cart panel component that displays the cart contents.
 * Uses EmptyState and Button components for consistency.
 *
 * @example
 * <Cart.Panel id="cart-panel" />
 */
export function CartPanel({ className }: CartPanelProps) {
  const { isOpen, panelRef, items, updateQuantity, removeItem } = useCartContext();

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className={twMerge(
        'absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden',
        className
      )}
      onClick={(e) => e.stopPropagation()}
      data-testid="cart-panel"
    >
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-medium text-gray-900">Your Cart</h2>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={ShoppingCartIcon}
          title="Your cart is empty"
          description="Add some items to get started"
          className="py-8"
        />
      ) : (
        <div className="divide-y divide-gray-100">
          {items.map(item => (
            <div key={item.id} className="p-4 flex items-center gap-4">
              {item.imageUrl && (
                <div className="w-16 h-16 relative">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                    sizes="64px"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <div className="text-sm text-gray-700">
                  ${item.price.toFixed(2)} × {item.quantity}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 text-gray-600 hover:text-gray-900"
                >
                  -
                </Button>
                <span className="w-8 text-center text-gray-900">{item.quantity}</span>
                <Button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 text-gray-600 hover:text-gray-900"
                >
                  +
                </Button>
                <Button
                  onClick={() => removeItem(item.id)}
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 text-red-500 hover:text-red-700"
                >
                  ×
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}