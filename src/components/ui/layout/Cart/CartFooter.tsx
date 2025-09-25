'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '@/components/ui/foundations/Button';
import { useRouter } from 'next/navigation';
import { useCart } from './CartProvider';
import ConfirmationDialog from '@/components/ui/feedback/ConfirmationDialog';
import type { CartFooterProps } from './Cart.types';

export function CartFooter({
  showShippingNote = true,
  checkoutLabel = 'Checkout',
  className,
}: CartFooterProps) {
  const router = useRouter();
  const { subtotal, isLoading, itemCount, closeCart, clearCart } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  const handleClearCart = () => {
    setShowClearConfirm(true);
  };

  const handleConfirmClear = async () => {
    try {
      await clearCart();
      setShowClearConfirm(false);
    } catch (error) {
      console.error('Failed to clear cart:', error);
      // Keep dialog open and show error in the loading state
      // Could also add toast notification here if available
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

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={handleConfirmClear}
        title="Clear Cart"
        message="Are you sure you want to remove all items from your cart? This action cannot be undone."
        confirmText="Clear Cart"
        cancelText="Keep Items"
        isDestructive
        isLoading={isLoading}
      />
    </div>
  );
}
