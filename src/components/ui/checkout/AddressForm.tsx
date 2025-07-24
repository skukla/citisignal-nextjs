'use client';

import { ShippingAddress } from '@/types/cart';
import clsx from 'clsx';

interface AddressFormProps {
  type: 'shipping' | 'billing';
  values: ShippingAddress;
  onChange: (field: keyof ShippingAddress, value: string) => void;
}

export default function AddressForm({ type, values, onChange }: AddressFormProps) {
  const inputClasses = clsx(
    'input-base input-purple',
    'w-full transition-colors'
  );

  const labelClasses = clsx(
    'block text-sm font-medium',
    'text-gray-700'
  );

  return (
    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
      <div className="sm:col-span-1">
        <label htmlFor={`${type}-firstName`} className={labelClasses}>
          First name
        </label>
        <div className="mt-1">
          <input
            type="text"
            id={`${type}-firstName`}
            name={`${type}-firstName`}
            value={values.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="sm:col-span-1">
        <label htmlFor={`${type}-lastName`} className={labelClasses}>
          Last name
        </label>
        <div className="mt-1">
          <input
            type="text"
            id={`${type}-lastName`}
            name={`${type}-lastName`}
            value={values.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={`${type}-address1`} className={labelClasses}>
          Address
        </label>
        <div className="mt-1">
          <input
            type="text"
            id={`${type}-address1`}
            name={`${type}-address1`}
            value={values.address1}
            onChange={(e) => onChange('address1', e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={`${type}-address2`} className={labelClasses}>
          Apartment, suite, etc.
        </label>
        <div className="mt-1">
          <input
            type="text"
            id={`${type}-address2`}
            name={`${type}-address2`}
            value={values.address2 || ''}
            onChange={(e) => onChange('address2', e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="sm:col-span-1">
        <label htmlFor={`${type}-city`} className={labelClasses}>
          City
        </label>
        <div className="mt-1">
          <input
            type="text"
            id={`${type}-city`}
            name={`${type}-city`}
            value={values.city}
            onChange={(e) => onChange('city', e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="sm:col-span-1">
        <label htmlFor={`${type}-state`} className={labelClasses}>
          State
        </label>
        <div className="mt-1">
          <input
            type="text"
            id={`${type}-state`}
            name={`${type}-state`}
            value={values.state}
            onChange={(e) => onChange('state', e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="sm:col-span-1">
        <label htmlFor={`${type}-postalCode`} className={labelClasses}>
          ZIP / Postal code
        </label>
        <div className="mt-1">
          <input
            type="text"
            id={`${type}-postalCode`}
            name={`${type}-postalCode`}
            value={values.postalCode}
            onChange={(e) => onChange('postalCode', e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="sm:col-span-1">
        <label htmlFor={`${type}-phone`} className={labelClasses}>
          Phone
        </label>
        <div className="mt-1">
          <input
            type="tel"
            id={`${type}-phone`}
            name={`${type}-phone`}
            value={values.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>
    </div>
  );
} 