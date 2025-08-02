'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import type { CartIconProps } from './Cart.types';
import { useCartContext } from './CartRoot';

/**
 * Cart icon component that displays the current number of items.
 * Uses the Button component for consistency.
 *
 * @example
 * <Cart.Icon aria-label="Shopping cart" />
 */
export function CartIcon({ className, ...props }: CartIconProps) {
  const { itemCount, toggle } = useCartContext();

  return (
    <div className="relative">
      <Button
        onClick={toggle}
        variant="ghost"
        size="sm"
        leftIcon={ShoppingCartIcon}
        className={className}
        data-testid="cart-trigger"
        aria-label="Shopping cart"
        {...props}
      />
      {itemCount > 0 && (
        <span 
          className="absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center bg-purple-600"
        >
          {itemCount}
        </span>
      )}
    </div>
  );
}