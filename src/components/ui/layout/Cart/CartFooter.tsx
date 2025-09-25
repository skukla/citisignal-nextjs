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
  const { subtotal, isLoading, itemCount, closeCart, clearCart } = useCart();

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  const handleClearCart = async () => {
    try {
      console.log('Clear cart button clicked');
      await clearCart();
      console.log('Clear cart completed successfully');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      // Reset loading state if something goes wrong
      // The loading state should be managed by the useAdobeCommerceCart hook
      alert('Failed to clear cart. Please try again.');
    }
  };

  // Don't render footer for empty cart
  if (itemCount === 0) {
    return null;
  }

  return (
    <div className={twMerge('border-t border-gray-200 px-6 py-6', className)}>
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p>${subtotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
      </div>
      {showShippingNote && (
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
      )}
      <div className="mt-6 space-y-3">
        <Button onClick={handleCheckout} fullWidth size="lg">
          {checkoutLabel}
        </Button>

        <Button
          onClick={handleClearCart}
          variant="secondary"
          fullWidth
          size="sm"
          disabled={isLoading}
        >
          {isLoading ? 'Clearing...' : 'Clear Cart'}
        </Button>
      </div>
    </div>
  );
}
