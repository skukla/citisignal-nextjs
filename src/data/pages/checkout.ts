import type { CheckoutPageData } from '@/types/checkout';

export const checkoutPageData: CheckoutPageData = {
  steps: {
    shipping: {
      title: 'Shipping Information',
      description: 'Enter your shipping details'
    },
    payment: {
      title: 'Payment Method',
      description: 'Choose how you want to pay'
    },
    review: {
      title: 'Review Order',
      description: 'Review your order details'
    }
  },
  summary: {
    title: 'Order Summary',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    tax: 'Tax',
    total: 'Total'
  }
};