'use client';

import { twMerge } from 'tailwind-merge';
import Button from '@/components/ui/foundations/Button';
import { useRouter } from 'next/navigation';
import { useCart } from './CartProvider';
import type { CartFooterProps } from './Cart.types';

export function CartFooter({
  showShippingNote = true,
  checkoutLabel = 'Checkout',
  className,
}: CartFooterProps) {
  const router = useRouter();
  const { subtotal, closeCart } = useCart();

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  return (
    <div className={twMerge('border-t border-gray-200 px-6 py-6', className)}>
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p>${subtotal}</p>
      </div>
      {showShippingNote && (
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
      )}
      <div className="mt-6">
        <Button onClick={handleCheckout} fullWidth size="lg">
          {checkoutLabel}
        </Button>
      </div>
    </div>
  );
}
