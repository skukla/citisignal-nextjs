'use client';

import { useState, useCallback, useMemo } from 'react';
import { useCart } from '../../Cart/useCart';
import { useCheckoutValidation } from './useCheckoutValidation';
import { useOrderProcessing } from './useOrderProcessing';
import type { 
  CheckoutContextValue, 
  CheckoutStepId, 
  ShippingDetails, 
  PaymentDetails,
  OrderDetails,
  TouchedFields
} from '../types';

import { checkoutData } from '../data/checkout';
import { validationData } from '../data/validation';

interface UseCheckoutOptions {
  onComplete?: (orderDetails: OrderDetails) => void;
}

/**
 * Manages checkout process state and logic.
 * Handles shipping, payment, and order completion.
 * @param {Object} [options] - Checkout configuration
 * @param {Function} [options.onComplete] - Callback when order completes
 * @returns {Object} Checkout state and handlers
 * @example
 * const {
 *   currentStep,
 *   shippingDetails,
 *   paymentDetails,
 *   updateShipping,
 *   placeOrder
 * } = useCheckout({
 *   onComplete: (order) => console.log(order)
 * });
 */
export function useCheckout({ onComplete }: UseCheckoutOptions = {}): CheckoutContextValue {
  const { items, getSubtotal } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStepId>('shipping');
  const steps = checkoutData.steps;
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({});

  const subtotal = useMemo(() => getSubtotal(), [getSubtotal]);
  const tax = useMemo(() => subtotal * checkoutData.rates.tax, [subtotal]);
  const shipping = checkoutData.rates.shipping;
  const total = useMemo(() => subtotal + tax + shipping, [subtotal, tax, shipping]);

  const updateShipping = useCallback((details: Partial<ShippingDetails>, fieldName?: string) => {
    setShippingDetails(prev => ({
      ...prev,
      ...details
    } as ShippingDetails));
    
    if (fieldName) {
      setTouchedFields((prev: TouchedFields) => ({
        ...prev,
        [fieldName]: true
      }));
    }
  }, []);

  const updatePayment = useCallback((details: Partial<PaymentDetails>, fieldName?: string) => {
    setPaymentDetails(prev => ({
      ...prev,
      ...details
    } as PaymentDetails));
    
    if (fieldName) {
      setTouchedFields((prev: TouchedFields) => ({
        ...prev,
        [fieldName]: true
      }));
    }
  }, []);

  const { isStepComplete, validateStep } = useCheckoutValidation(shippingDetails, paymentDetails);
  const { placeOrder: processOrder } = useOrderProcessing({ onComplete });

  const canProceedToStep = useCallback((stepId: CheckoutStepId): boolean => {
    const stepIndex = checkoutData.steps.findIndex(step => step.id === stepId);
    const previousSteps = checkoutData.steps.slice(0, stepIndex);
    return previousSteps.every(step => isStepComplete(step.id));
  }, [isStepComplete]);

  const setStep = useCallback((stepId: CheckoutStepId) => {
    if (canProceedToStep(stepId)) {
      setCurrentStep(stepId);
    }
  }, [canProceedToStep]);

  const placeOrder = useCallback(async () => {
    if (!isStepComplete('shipping') || !isStepComplete('payment')) {
      throw new Error(validationData.messages.missingInfo);
    }

    const orderDetails = {
      items,
      shipping: shippingDetails!,
      payment: paymentDetails!,
      totals: {
        subtotal,
        tax,
        shipping,
        total
      }
    };

    const result = await processOrder(orderDetails);
    if (!result.success) {
      throw result.error || new Error(validationData.messages.orderFailed);
    }
  }, [items, shippingDetails, paymentDetails, subtotal, tax, shipping, total, processOrder, isStepComplete]);

  return {
    currentStep,
    steps,
    items,
    subtotal,
    tax,
    shipping,
    total,
    shippingDetails,
    paymentDetails,
    touchedFields,
    setStep,
    updateShipping,
    updatePayment,
    placeOrder,
    isStepComplete,
    canProceedToStep,
    validateStep
  };
}