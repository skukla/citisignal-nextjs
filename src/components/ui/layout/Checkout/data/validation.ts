import type { ShippingDetails, PaymentDetails } from '../types';

export const validationData = {
  requiredFields: {
    shipping: ['firstName', 'lastName', 'address1', 'city', 'state', 'zipCode', 'phone'] as const,
    payment: ['cardNumber', 'expiryDate', 'cvv', 'nameOnCard'] as const
  },

  patterns: {
    phone: /^\d{10}$/,
    zipCode: /^\d{5}(-\d{4})?$/,
    cardNumber: /^\d{16}$/,
    expiryDate: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
    cvv: /^\d{3,4}$/
  },

  messages: {
    required: (field: keyof ShippingDetails | keyof PaymentDetails) => `${field} is required`,
    phone: 'Please enter a valid 10-digit phone number',
    zipCode: 'Please enter a valid ZIP code',
    cardNumber: 'Please enter a valid 16-digit card number',
    expiryDate: 'Please enter a valid expiry date (MM/YY)',
    cvv: 'Please enter a valid CVV (3-4 digits)',
    missingInfo: 'Cannot place order: missing required information',
    orderFailed: 'Failed to place order'
  }
};