import type { CheckoutStep } from '../types';

export const checkoutData = {
  steps: [
    {
      id: 'shipping',
      title: 'Shipping',
      description: 'Enter your shipping details',
      isComplete: false
    },
    {
      id: 'payment',
      title: 'Payment',
      description: 'Enter your payment information',
      isComplete: false
    },
    {
      id: 'review',
      title: 'Review',
      description: 'Review your order',
      isComplete: false
    }
  ] as CheckoutStep[],

  rates: {
    tax: 0.0825, // 8.25%
    shipping: 9.99
  }
};