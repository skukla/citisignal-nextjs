'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import EmptyState from '@/components/ui/feedback/EmptyState';
import { CartItem } from './CartItem';
import { useCartContext } from './CartContext';
import type { CartBodyProps } from './Cart.types';
import type { ComponentType } from 'react';

export function CartBody({
  emptyStateIcon = ShoppingCartIcon,
  emptyStateTitle = 'Your cart is empty',
  emptyStateDescription = 'Add some items to get started',
  className
}: CartBodyProps) {
  const { items } = useCartContext();

  if (items.length === 0) {
    return (
      <EmptyState
        icon={emptyStateIcon as ComponentType}
        title={emptyStateTitle}
        description={emptyStateDescription}
        className="py-8"
      />
    );
  }

  return (
    <div className={twMerge('flex-1 overflow-y-auto py-6', className)}>
      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}