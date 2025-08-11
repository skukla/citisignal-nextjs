import { CreditCardIcon } from '@heroicons/react/24/outline';

export interface CardFormFields {
  number: string;
  name: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  billingAddressId: string;
  isDefault?: boolean;
}

export const paymentConfig = {
  list: {
    title: 'Payment Methods',
    description: 'Manage your saved payment methods.',
    addButton: 'Add Payment Method',
    emptyState: {
      icon: CreditCardIcon,
      title: 'No payment methods',
      description: 'Add your first payment method'
    }
  },
  form: {
    fields: [
      {
        id: 'number',
        label: 'Card Number',
        type: 'text',
        required: true
      },
      {
        id: 'name',
        label: 'Name on Card',
        type: 'text',
        required: true
      },
      {
        id: 'expiryMonth',
        label: 'Expiry Month (MM)',
        type: 'text',
        required: true
      },
      {
        id: 'expiryYear',
        label: 'Expiry Year (YYYY)',
        type: 'text',
        required: true
      },
      {
        id: 'cvc',
        label: 'CVC',
        type: 'text',
        required: true
      }
    ]
  }
};