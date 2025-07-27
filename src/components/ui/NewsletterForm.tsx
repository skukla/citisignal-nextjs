'use client';

import { twMerge } from 'tailwind-merge';
import Input from './Input';
import Button from './Button';
import useForm from '@/hooks/useForm';
import { validateEmail } from '@/lib/validation';
import type { ButtonVariant, InputVariant } from '@/types/theme';

interface NewsletterFormProps {
  onSubmit: (email: string) => Promise<void>;
  buttonText?: string;
  buttonVariant?: ButtonVariant;
  inputVariant?: InputVariant;
  placeholder?: string;
  inputClassName?: string;
  buttonClassName?: string;
  className?: string;
}

type NewsletterFormValues = Record<'email', string>;

const validate = (values: NewsletterFormValues) => {
  const errors: Partial<Record<keyof NewsletterFormValues, string>> = {};
  const emailError = validateEmail(values.email);
  if (emailError) {
    errors.email = emailError;
  }
  return errors;
};

export default function NewsletterForm({
  onSubmit,
  buttonText = 'Subscribe',
  buttonVariant = 'yellow',
  inputVariant = 'newsletter',
  placeholder = 'Enter your email address',
  inputClassName,
  buttonClassName,
  className
}: NewsletterFormProps) {
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useForm<NewsletterFormValues>({
    initialValues: { email: '' },
    onSubmit: async (values) => {
      await onSubmit(values.email);
    },
    validate
  });

  return (
    <form 
      onSubmit={handleSubmit} 
      className={twMerge('max-w-md', className)}
      >
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="email"
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder={placeholder}
            required
            variant={inputVariant}
            className={twMerge(
              errors.email && 'border-red-500 focus:border-red-500 focus:ring-red-200',
              inputClassName
            )}
          />
          {errors.email && (
            <div className="mt-1 text-sm text-red-500">
              {errors.email}
            </div>
          )}
        </div>
        <Button
          variant={buttonVariant}
          loading={isSubmitting}
          disabled={isSubmitting}
          className={buttonClassName}
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
} 