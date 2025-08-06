'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Input from '@/components/ui/foundations/Input';
import Checkbox from '@/components/ui/foundations/Checkbox';
import Button from '@/components/ui/foundations/Button';
import { useCheckoutContext } from './CheckoutContext';
import { useFieldValidation } from './hooks/useFieldValidation';
import type { CheckoutPaymentProps, PaymentDetails, ValidationResult } from './types';

export default function CheckoutPayment({ className }: CheckoutPaymentProps) {
  const { 
    paymentDetails, 
    updatePayment, 
    setStep, 
    isStepComplete,
    validateStep,
    touchedFields
  } = useCheckoutContext();

  const validation = validateStep('payment') as ValidationResult<PaymentDetails>;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { getFieldError } = useFieldValidation<PaymentDetails>({ isSubmitted, touchedFields });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (isStepComplete('payment')) {
      setStep('review');
    }
  };

  return (
    <div className={twMerge('space-y-6', className)}>
      <div>
        <h2 className="text-lg font-medium text-gray-900">Payment Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Enter your payment details to continue with your purchase.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6">
          <div>
            <Input
              type="text"
              name="nameOnCard"
              id="nameOnCard"
              label="Name on Card"
              placeholder="Enter the name on your card"
              value={paymentDetails?.nameOnCard || ''}
              onChange={(e) => updatePayment({ nameOnCard: e.target.value }, 'nameOnCard')}
              required
              error={getFieldError('nameOnCard', validation.errors)}
            />
          </div>

          <div>
            <Input
              type="text"
              name="cardNumber"
              id="cardNumber"
              label="Card Number"
              placeholder="Enter your card number"
              value={paymentDetails?.cardNumber || ''}
              onChange={(e) => updatePayment({ cardNumber: e.target.value }, 'cardNumber')}
              required
              error={getFieldError('cardNumber', validation.errors)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                type="text"
                name="expiryDate"
                id="expiryDate"
                label="Expiry Date"
                placeholder="MM/YY"
                              value={paymentDetails?.expiryDate || ''}
              onChange={(e) => updatePayment({ expiryDate: e.target.value }, 'expiryDate')}
              required
              error={getFieldError('expiryDate', validation.errors)}
              />
            </div>

            <div>
              <Input
                type="text"
                name="cvv"
                id="cvv"
                label="CVV"
                placeholder="Enter CVV"
                value={paymentDetails?.cvv || ''}
              onChange={(e) => updatePayment({ cvv: e.target.value }, 'cvv')}
              required
              error={getFieldError('cvv', validation.errors)}
              />
            </div>
          </div>

          <Checkbox
            name="billingAddressSameAsShipping"
            checked={paymentDetails?.billingAddressSameAsShipping || false}
            onChange={(e) => updatePayment({ billingAddressSameAsShipping: e.target.checked })}
            label="Billing address same as shipping"
          />
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep('shipping')}
          >
            Back to Shipping
          </Button>
          <Button 
            type="submit"
            disabled={!isStepComplete('payment')}
          >
            Continue to Review
          </Button>
        </div>
      </form>
    </div>
  );
}