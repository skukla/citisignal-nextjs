'use client';

import { useCallback } from 'react';
import type { CheckoutStepId, ShippingDetails, PaymentDetails } from '../Checkout.types';

export function useCheckoutValidation(
  shippingDetails: ShippingDetails | null,
  paymentDetails: PaymentDetails | null
) {
  const validateShipping = useCallback(() => {
    if (!shippingDetails) return false;
    const requiredFields: (keyof ShippingDetails)[] = [
      'firstName', 'lastName', 'address1', 'city', 
      'state', 'zipCode', 'phone'
    ];
    return requiredFields.every(field => Boolean(shippingDetails[field]));
  }, [shippingDetails]);

  const validatePayment = useCallback(() => {
    if (!paymentDetails) return false;
    const requiredFields: (keyof PaymentDetails)[] = [
      'cardNumber', 'expiryDate', 'cvv', 'nameOnCard'
    ];
    return requiredFields.every(field => Boolean(paymentDetails[field]));
  }, [paymentDetails]);

  const isStepComplete = useCallback((stepId: CheckoutStepId): boolean => {
    switch (stepId) {
      case 'shipping': return validateShipping();
      case 'payment': return validatePayment();
      case 'review': return validateShipping() && validatePayment();
      default: return false;
    }
  }, [validateShipping, validatePayment]);

  return { isStepComplete };
}