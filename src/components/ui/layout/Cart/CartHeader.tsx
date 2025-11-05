'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import Button from '@/components/ui/foundations/Button';
import { useCart } from './CartProvider';
import type { CartHeaderProps } from './Cart.types';

export function CartHeader({ title = 'Shopping Cart', className }: CartHeaderProps) {
  const { closeCart } = useCart();

  return (
    <div className={twMerge('flex items-center justify-between px-6', className)}>
      <h2 className="text-lg font-medium text-gray-900">{title}</h2>
      <Button
        variant="ghost"
        size="sm"
        onClick={closeCart}
        leftIcon={XMarkIcon}
        className="text-gray-400 hover:text-gray-500"
        aria-label="Close panel"
      />
    </div>
  );
}
