'use client';

import { useState, memo } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '@/components/ui/foundations/Button';
import Input from '@/components/ui/foundations/Input';

interface NewsletterFormProps {
  onSubmit: (email: string) => Promise<void>;
  className?: string;
}

/**
 * Newsletter subscription form with email validation and loading states.
 * Provides a responsive layout with email input and subscribe button.
 *
 * @example
 * ```tsx
 * <NewsletterForm
 *   onSubmit={async (email) => {
 *     await submitToMailingList(email);
 *   }}
 *   className="mx-auto"
 * />
 * ```
 */
function NewsletterForm({
  onSubmit,
  className
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onSubmit(email);
      setEmail('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={twMerge('max-w-md', className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            variant="newsletter"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          loading={isLoading}
          variant="yellow"
          className="px-8 py-3 shadow-lg"
        >
          Subscribe
        </Button>
      </div>
    </form>
  );
}

export default memo(NewsletterForm); 