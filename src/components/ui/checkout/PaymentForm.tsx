'use client';

import { PaymentMethod } from '@/types/cart';
import clsx from 'clsx';

interface PaymentFormProps {
  values: PaymentMethod;
  onChange: (field: keyof PaymentMethod, value: string) => void;
}

export default function PaymentForm({ values, onChange }: PaymentFormProps) {
  const inputClasses = clsx(
    'input-base input-purple',
    'w-full transition-colors'
  );

  const labelClasses = clsx(
    'block text-sm font-medium',
    'text-gray-700'
  );

  const paymentButtonClasses = (isSelected: boolean) => clsx(
    'flex items-center justify-center',
    'rounded-md border py-3',
    'text-sm font-medium transition-colors',
    isSelected
      ? 'border-primary-600 bg-primary-50 text-primary-600'
      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
  );

  return (
    <div className="mt-6">
      <div className="grid grid-cols-4 gap-y-6 gap-x-4">
        <div className="col-span-4">
          <label htmlFor="cardholderName" className={labelClasses}>
            Card holder name
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="cardholderName"
              name="cardholderName"
              value={values.cardholderName || ''}
              onChange={(e) => onChange('cardholderName', e.target.value)}
              className={inputClasses}
            />
          </div>
        </div>

        <div className="col-span-4">
          <label htmlFor="cardNumber" className={labelClasses}>
            Card number
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={values.cardNumber || ''}
              onChange={(e) => onChange('cardNumber', e.target.value)}
              placeholder="1234 1234 1234 1234"
              className={inputClasses}
            />
          </div>
        </div>

        <div className="col-span-2">
          <label htmlFor="expiryMonth" className={labelClasses}>
            Expiry month
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="expiryMonth"
              name="expiryMonth"
              value={values.expiryMonth || ''}
              onChange={(e) => onChange('expiryMonth', e.target.value)}
              placeholder="MM"
              className={inputClasses}
            />
          </div>
        </div>

        <div className="col-span-2">
          <label htmlFor="expiryYear" className={labelClasses}>
            Expiry year
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="expiryYear"
              name="expiryYear"
              value={values.expiryYear || ''}
              onChange={(e) => onChange('expiryYear', e.target.value)}
              placeholder="YYYY"
              className={inputClasses}
            />
          </div>
        </div>

        <div className="col-span-2">
          <label htmlFor="cvv" className={labelClasses}>
            CVV
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={values.cvv || ''}
              onChange={(e) => onChange('cvv', e.target.value)}
              placeholder="123"
              className={inputClasses}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center">
        <input
          id="save-card"
          name="save-card"
          type="checkbox"
          className={clsx(
            'h-4 w-4 rounded border-gray-300',
            'text-primary-600 focus:ring-primary-500',
            'transition-colors'
          )}
        />
        <label htmlFor="save-card" className="ml-2 block text-sm text-gray-900">
          Save this card for future purchases
        </label>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex-1 border-t border-gray-200" />
        <span className="text-sm text-gray-500">Or pay with</span>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => onChange('type', 'paypal')}
          className={paymentButtonClasses(values.type === 'paypal')}
        >
          PayPal
        </button>
        <button
          type="button"
          onClick={() => onChange('type', 'apple_pay')}
          className={paymentButtonClasses(values.type === 'apple_pay')}
        >
          Apple Pay
        </button>
        <button
          type="button"
          onClick={() => onChange('type', 'google_pay')}
          className={paymentButtonClasses(values.type === 'google_pay')}
        >
          Google Pay
        </button>
      </div>
    </div>
  );
} 