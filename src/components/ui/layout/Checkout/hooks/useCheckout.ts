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
  CartItem 
} from '../Checkout.types';

const STEPS = [
  {
    id: 'shipping' as const,
    title: 'Shipping',
    description: 'Enter your shipping details',
    isComplete: false
  },
  {
    id: 'payment' as const,
    title: 'Payment',
    description: 'Enter your payment information',
    isComplete: false
  },
  {
    id: 'review' as const,
    title: 'Review',
    description: 'Review your order',
    isComplete: false
  }
];

const TAX_RATE = 0.0825; // 8.25%
const SHIPPING_RATE = 9.99;

interface OrderDetails {
  items: CartItem[];
  shipping: ShippingDetails;
  payment: PaymentDetails;
  totals: {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  };
}

interface UseCheckoutOptions {
  onComplete?: (orderDetails: OrderDetails) => void;
}

export function useCheckout({ onComplete }: UseCheckoutOptions = {}): CheckoutContextValue {
  const { items, getSubtotal } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStepId>('shipping');
  const steps = STEPS;
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);

  const subtotal = useMemo(() => getSubtotal(), [getSubtotal]);
  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);
  const shipping = SHIPPING_RATE;
  const total = useMemo(() => subtotal + tax + shipping, [subtotal, tax, shipping]);

  const updateShipping = useCallback((details: Partial<ShippingDetails>) => {
    setShippingDetails(prev => ({
      ...prev,
      ...details
    } as ShippingDetails));
  }, []);

  const updatePayment = useCallback((details: Partial<PaymentDetails>) => {
    setPaymentDetails(prev => ({
      ...prev,
      ...details
    } as PaymentDetails));
  }, []);

  const { isStepComplete } = useCheckoutValidation(shippingDetails, paymentDetails);
  const { placeOrder: processOrder } = useOrderProcessing({ onComplete });

  const canProceedToStep = useCallback((stepId: CheckoutStepId): boolean => {
    const stepIndex = STEPS.findIndex(step => step.id === stepId);
    const previousSteps = STEPS.slice(0, stepIndex);
    return previousSteps.every(step => isStepComplete(step.id));
  }, [isStepComplete]);

  const setStep = useCallback((stepId: CheckoutStepId) => {
    if (canProceedToStep(stepId)) {
      setCurrentStep(stepId);
    }
  }, [canProceedToStep]);

  const placeOrder = useCallback(async () => {
    if (!isStepComplete('shipping') || !isStepComplete('payment')) {
      throw new Error('Cannot place order: missing required information');
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
      throw result.error || new Error('Failed to place order');
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
    setStep,
    updateShipping,
    updatePayment,
    placeOrder,
    isStepComplete,
    canProceedToStep
  };
}