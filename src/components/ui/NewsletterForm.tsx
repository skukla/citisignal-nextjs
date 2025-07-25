'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Input from './Input';
import Button from './Button';

interface NewsletterFormProps {
  onSubmit: (email: string) => Promise<void>;
  inputClassName?: string;
  buttonClassName?: string;
  className?: string;
}

export default function NewsletterForm({
  onSubmit,
  inputClassName,
  buttonClassName,
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
            required
            variant="newsletter"
            className={inputClassName}
          />
        </div>
        <Button
          variant="yellow"
          loading={isLoading}
          disabled={isLoading}
          className={buttonClassName}
        >
          Subscribe
        </Button>
      </div>
    </form>
  );
} 