'use client';

import { twMerge } from 'tailwind-merge';
import Input from './Input';
import Button from './Button';
import useForm from '@/hooks/useForm';

interface NewsletterFormProps {
  onSubmit: (email: string) => Promise<void>;
  inputClassName?: string;
  buttonClassName?: string;
  className?: string;
}

type NewsletterFormValues = Record<'email', string>;

const validateEmail = (values: NewsletterFormValues) => {
  const errors: Partial<Record<keyof NewsletterFormValues, string>> = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

export default function NewsletterForm({
  onSubmit,
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
    validate: validateEmail
  });

  return (
    <form onSubmit={handleSubmit} className={twMerge('max-w-md', className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="email"
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter your email address"
            required
            variant="newsletter"
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
          variant="yellow"
          loading={isSubmitting}
          disabled={isSubmitting}
          className={buttonClassName}
        >
          Subscribe
        </Button>
      </div>
    </form>
  );
} 