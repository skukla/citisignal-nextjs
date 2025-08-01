'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from './Button';

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
export default function NewsletterForm({
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
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 bg-white border-0 shadow-lg focus:ring-4 focus:ring-yellow-400 focus:outline-none transition-all duration-200"
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