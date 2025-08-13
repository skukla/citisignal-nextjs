'use client';

import Input from '@/components/ui/foundations/Input';
import Button from '@/components/ui/foundations/Button';
import { addressValidation } from '@/data/route-groups/account/validation';
import { useForm } from '@/hooks/forms/useForm';
import type { AddressFields } from '@/data/route-groups/account/profile';
import Checkbox from '../../foundations/Checkbox';

interface AddressFormProps {
  initialValues?: Partial<AddressFields>;
  onSubmit: (values: AddressFields) => Promise<void>;
  onCancel?: () => void;
}

export default function AddressForm({ 
  initialValues = {},
  onSubmit,
  onCancel 
}: AddressFormProps) {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldError,
    isSubmitting,
    touchedFields,
    dirtyFields
  } = useForm<AddressFields>({
    initialValues: {
      name: '',
      street: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: false,
      ...initialValues
    },
    validationRules: addressValidation,
    onSubmit
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        name="name"
        label="Full Name"
        type="text"
        required
        value={values.name}
        error={touchedFields.name && dirtyFields.name ? getFieldError('name') : undefined}
        onChange={(e) => handleChange('name', e.target.value)}
        onBlur={() => handleBlur('name')}
      />
      <Input
        name="street"
        label="Street Address"
        type="text"
        required
        value={values.street}
        error={touchedFields.street && dirtyFields.street ? getFieldError('street') : undefined}
        onChange={(e) => handleChange('street', e.target.value)}
        onBlur={() => handleBlur('street')}
      />
      <Input
        name="apartment"
        label="Apartment, suite, etc."
        type="text"
        value={values.apartment}
        onChange={(e) => handleChange('apartment', e.target.value)}
        onBlur={() => handleBlur('apartment')}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="city"
          label="City"
          type="text"
          required
          value={values.city}
          error={touchedFields.city && dirtyFields.city ? getFieldError('city') : undefined}
          onChange={(e) => handleChange('city', e.target.value)}
          onBlur={() => handleBlur('city')}
        />
        <Input
          name="state"
          label="State"
          type="text"
          required
          value={values.state}
          error={touchedFields.state && dirtyFields.state ? getFieldError('state') : undefined}
          onChange={(e) => handleChange('state', e.target.value)}
          onBlur={() => handleBlur('state')}
        />
      </div>
      <Input
        name="zipCode"
        label="ZIP Code"
        type="text"
        required
        value={values.zipCode}
        error={touchedFields.zipCode && dirtyFields.zipCode ? getFieldError('zipCode') : undefined}
        onChange={(e) => handleChange('zipCode', e.target.value)}
        onBlur={() => handleBlur('zipCode')}
      />
      <div className="flex items-center space-x-4">
        <Checkbox
          name="isDefault"
          label="Set as default address"
          checked={values.isDefault}
          onChange={(e) => handleChange('isDefault', e.target.checked)}
          onBlur={() => handleBlur('isDefault')}
        />
      </div>
      <div className="flex justify-end space-x-4">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Address'}
        </Button>
      </div>
    </form>
  );
}