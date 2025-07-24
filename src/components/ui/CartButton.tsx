'use client';

import { useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/contexts/CartContext';
import clsx from 'clsx';
import MiniCart from './MiniCart';

export default function CartButton() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();

  return (
    <>
      <button
        type="button"
        className={clsx(
          'icon-button relative',
          isCartOpen && 'text-primary-600'
        )}
        onClick={() => setIsCartOpen(true)}
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open cart</span>
        <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
        {cart.itemCount > 0 && (
          <span className="badge badge-primary absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-medium">
            {cart.itemCount}
          </span>
        )}
      </button>
      <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
} 