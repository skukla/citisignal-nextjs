'use client';

import { twMerge } from 'tailwind-merge';
import Button from '@/components/ui/foundations/Button';
import { useCheckoutContext } from './CheckoutContext';
import { useOrderSubmission } from './hooks/useOrderSubmission';
import { useCheckoutNavigation } from './hooks/useCheckoutNavigation';
import type { CheckoutReviewProps } from './types';

export default function CheckoutReview({ className }: CheckoutReviewProps) {
  const { shippingDetails, paymentDetails } = useCheckoutContext();
  const { isSubmitting, submitOrder, canSubmit } = useOrderSubmission();
  const { navigateToStep } = useCheckoutNavigation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitOrder();
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
          onClick={() => navigateToStep('payment')}
        >
          Back to Payment
        </Button>
        <Button 
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting || !canSubmit()}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}