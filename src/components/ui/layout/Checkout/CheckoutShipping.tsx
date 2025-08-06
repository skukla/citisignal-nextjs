'use client';

import { twMerge } from 'tailwind-merge';
import Input from '@/components/ui/foundations/Input';
import Button from '@/components/ui/foundations/Button';
import { useCheckoutContext } from './CheckoutContext';
import { useFieldValidation } from './hooks/useFieldValidation';
import type { CheckoutShippingProps, ShippingDetails, ValidationResult } from './types';
import { useState } from 'react';

export default function CheckoutShipping({ className }: CheckoutShippingProps) {
  const { 
    shippingDetails, 
    updateShipping, 
    setStep, 
    isStepComplete,
    validateStep,
    touchedFields
  } = useCheckoutContext();

  const validation = validateStep('shipping') as ValidationResult<ShippingDetails>;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { getFieldError } = useFieldValidation<ShippingDetails>({ isSubmitted, touchedFields });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
              id="firstName"
              label="First Name"
              placeholder="Enter your first name"
              value={shippingDetails?.firstName || ''}
              onChange={(e) => updateShipping({ firstName: e.target.value }, 'firstName')}
              required
              error={getFieldError('firstName', validation.errors)}
            />
          </div>

          <div>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              label="Last Name"
              placeholder="Enter your last name"
              value={shippingDetails?.lastName || ''}
              onChange={(e) => updateShipping({ lastName: e.target.value }, 'lastName')}
              required
              error={getFieldError('lastName', validation.errors)}
            />
          </div>

          <div className="sm:col-span-2">
            <Input
              type="text"
              name="address1"
              id="address1"
              label="Street Address"
              placeholder="Enter your street address"
              value={shippingDetails?.address1 || ''}
              onChange={(e) => updateShipping({ address1: e.target.value }, 'address1')}
              required
              error={getFieldError('address1', validation.errors)}
            />
          </div>

          <div className="sm:col-span-2">
            <Input
              type="text"
              name="address2"
              id="address2"
              label="Apartment, Suite, etc. (optional)"
              placeholder="Enter apartment, suite, unit, etc."
              value={shippingDetails?.address2 || ''}
              onChange={(e) => updateShipping({ address2: e.target.value }, 'address2')}
            />
          </div>

          <div>
            <Input
              type="text"
              name="city"
              id="city"
              label="City"
              placeholder="Enter your city"
              value={shippingDetails?.city || ''}
              onChange={(e) => updateShipping({ city: e.target.value }, 'city')}
              required
              error={getFieldError('city', validation.errors)}
            />
          </div>

          <div>
            <Input
              type="text"
              name="state"
              id="state"
              label="State"
              placeholder="Enter your state"
              value={shippingDetails?.state || ''}
              onChange={(e) => updateShipping({ state: e.target.value }, 'state')}
              required
              error={getFieldError('state', validation.errors)}
            />
          </div>

          <div>
            <Input
              type="text"
              name="zipCode"
              id="zipCode"
              label="ZIP / Postal Code"
              placeholder="Enter your ZIP code"
              value={shippingDetails?.zipCode || ''}
              onChange={(e) => updateShipping({ zipCode: e.target.value }, 'zipCode')}
              required
              error={getFieldError('zipCode', validation.errors)}
            />
          </div>

          <div>
            <Input
              type="tel"
              name="phone"
              id="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
              value={shippingDetails?.phone || ''}
              onChange={(e) => updateShipping({ phone: e.target.value }, 'phone')}
              required
              error={getFieldError('phone', validation.errors)}
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