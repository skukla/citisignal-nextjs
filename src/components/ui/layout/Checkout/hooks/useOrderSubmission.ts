'use client';

import { useState, useCallback } from 'react';
import { useCheckoutContext } from '../CheckoutContext';

/**
 * Manages order submission state and validation.
 * @returns {Object} Submission state and handlers
 * @example
 * const { isSubmitting, submitOrder, canSubmit } = useOrderSubmission();
 */
export function useOrderSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { placeOrder, isStepComplete } = useCheckoutContext();

  const submitOrder = useCallback(async () => {
    if (!isStepComplete('shipping') || !isStepComplete('payment')) {
      return false;
    }

    try {
      setIsSubmitting(true);
      await placeOrder();
      return true;
    } catch (error) {
      console.error('Failed to place order:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [placeOrder, isStepComplete]);

  const canSubmit = useCallback(() => {
    return isStepComplete('shipping') && isStepComplete('payment');
  }, [isStepComplete]);

  return {
    isSubmitting,
    submitOrder,
    canSubmit
  };
}