'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '@/components/ui/foundations/Button';
import { useCheckoutContext } from './CheckoutContext';
import type { CheckoutReviewProps } from './Checkout.types';

export function CheckoutReview({ className }: CheckoutReviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { 
    shippingDetails, 
    paymentDetails,
    setStep,
    placeOrder,
    isStepComplete 
  } = useCheckoutContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepComplete('shipping') || !isStepComplete('payment')) return;

    try {
      setIsSubmitting(true);
      await placeOrder();
    } catch (error) {
      console.error('Failed to place order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!shippingDetails || !paymentDetails) {
    return null;
  }

  return (
    <div className={twMerge('space-y-6', className)}>
      <div>
        <h2 className="text-lg font-medium text-gray-900">Review Order</h2>
        <p className="mt-1 text-sm text-gray-500">
          Please review your order details before placing your order.
        </p>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-medium text-gray-900">Shipping Information</h3>
            <div className="mt-2 text-sm text-gray-500">
              <p>{shippingDetails.firstName} {shippingDetails.lastName}</p>
              <p>{shippingDetails.address1}</p>
              {shippingDetails.address2 && <p>{shippingDetails.address2}</p>}
              <p>{shippingDetails.city}, {shippingDetails.state} {shippingDetails.zipCode}</p>
              <p>{shippingDetails.phone}</p>
            </div>
          </div>

          <div>
            <h3 className="text-base font-medium text-gray-900">Payment Information</h3>
            <div className="mt-2 text-sm text-gray-500">
              <p>{paymentDetails.nameOnCard}</p>
              <p>Card ending in {paymentDetails.cardNumber.slice(-4)}</p>
              <p>Expires {paymentDetails.expiryDate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setStep('payment')}
        >
          Back to Payment
        </Button>
        <Button 
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting || !isStepComplete('shipping') || !isStepComplete('payment')}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}