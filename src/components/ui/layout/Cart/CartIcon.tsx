'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import Button from '@/components/ui/foundations/Button';
import { CartRoot, CartHeader, CartBody, CartFooter } from './';
import { useCart } from './useCart';
import type { BaseComponentProps } from '@/types/ui';

interface CartIconProps extends BaseComponentProps {
  'aria-label'?: string;
}

/**
 * Cart icon component that displays the current number of items.
 * Uses the Button component for consistency.
 *
 * @example
 * <Cart.Icon aria-label="Shopping cart" />
 */
export function CartIcon({ className, ...props }: CartIconProps) {
  const { items, isOpen, toggleCart, closeCart } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div className="relative">
        <Button
          onClick={toggleCart}
          variant="ghost"
          size="sm"
          leftIcon={ShoppingCartIcon}
          className={twMerge('focus:ring-0 focus:ring-offset-0', className)}
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

      <CartRoot isOpen={isOpen} onClose={closeCart}>
        <CartHeader />
        <CartBody />
        <CartFooter />
      </CartRoot>
    </>
  );
}