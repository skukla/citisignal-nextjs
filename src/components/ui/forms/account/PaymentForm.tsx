'use client';

import Input from '@/components/ui/foundations/Input';
import Button from '@/components/ui/foundations/Button';
import { paymentConfig } from '@/data/account/payment';
import { paymentValidation } from '@/data/account/validation';
import { useForm } from '@/hooks/forms/useForm';
import type { CardFormFields } from '@/data/account/payment';

interface PaymentFormProps {
  onSubmit: (values: CardFormFields) => Promise<void>;
  onCancel?: () => void;
}

export default function PaymentForm({ onSubmit, onCancel }: PaymentFormProps) {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldError,
    isSubmitting,
    touchedFields,
    dirtyFields
  } = useForm<CardFormFields>({
    initialValues: {
      number: '',
      name: '',
      expiryMonth: '',
      expiryYear: '',
      cvc: '',
      billingAddressId: ''
    },
    validationRules: paymentValidation,
    onSubmit
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {paymentConfig.form.fields.map((field) => {
        const fieldName = field.id as keyof CardFormFields;
        const error = touchedFields[fieldName] && dirtyFields[fieldName] 
          ? getFieldError(fieldName) 
          : undefined;

        return (
          <Input
            key={field.id}
            name={field.id}
            label={field.label}
            type={field.type}
            required={field.required}
            value={String(values[fieldName] || '')}
            error={error}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            onBlur={() => handleBlur(fieldName)}
          />
        );
      })}
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
          {isSubmitting ? 'Saving...' : 'Save Card'}
        </Button>
      </div>
    </form>
  );
}