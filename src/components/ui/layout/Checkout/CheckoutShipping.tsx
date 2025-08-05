'use client';

import { twMerge } from 'tailwind-merge';
import Input from '@/components/ui/foundations/Input';
import Button from '@/components/ui/foundations/Button';
import { useCheckoutContext } from './CheckoutContext';
import type { CheckoutShippingProps } from './Checkout.types';

export function CheckoutShipping({ className }: CheckoutShippingProps) {
  const { 
    shippingDetails, 
    updateShipping, 
    setStep, 
    isStepComplete 
  } = useCheckoutContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepComplete('shipping')) {
      setStep('payment');
    }
  };

  return (
    <div className={twMerge('space-y-6', className)}>
      <div>
        <h2 className="text-lg font-medium text-gray-900">Shipping Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Enter your shipping details to continue with your purchase.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div>
            <Input
              type="text"
              name="firstName"
              placeholder="First name"
              value={shippingDetails?.firstName || ''}
              onChange={(e) => updateShipping({ firstName: e.target.value })}
              required
            />
          </div>

          <div>
            <Input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={shippingDetails?.lastName || ''}
              onChange={(e) => updateShipping({ lastName: e.target.value })}
              required
            />
          </div>

          <div className="sm:col-span-2">
            <Input
              type="text"
              name="address1"
              placeholder="Address line 1"
              value={shippingDetails?.address1 || ''}
              onChange={(e) => updateShipping({ address1: e.target.value })}
              required
            />
          </div>

          <div className="sm:col-span-2">
            <Input
              type="text"
              name="address2"
              placeholder="Address line 2 (optional)"
              value={shippingDetails?.address2 || ''}
              onChange={(e) => updateShipping({ address2: e.target.value })}
            />
          </div>

          <div>
            <Input
              type="text"
              name="city"
              placeholder="City"
              value={shippingDetails?.city || ''}
              onChange={(e) => updateShipping({ city: e.target.value })}
              required
            />
          </div>

          <div>
            <Input
              type="text"
              name="state"
              placeholder="State"
              value={shippingDetails?.state || ''}
              onChange={(e) => updateShipping({ state: e.target.value })}
              required
            />
          </div>

          <div>
            <Input
              type="text"
              name="zipCode"
              placeholder="ZIP / Postal code"
              value={shippingDetails?.zipCode || ''}
              onChange={(e) => updateShipping({ zipCode: e.target.value })}
              required
            />
          </div>

          <div>
            <Input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={shippingDetails?.phone || ''}
              onChange={(e) => updateShipping({ phone: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit"
            disabled={!isStepComplete('shipping')}
          >
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
}