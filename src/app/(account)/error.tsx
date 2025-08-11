'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/foundations/Button';

export default function AccountError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Account page error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-96">
      <div className="text-center max-w-md px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Account Error
        </h2>
        <p className="text-gray-600 mb-6">
          We&apos;re having trouble accessing your account information. Please try again.
        </p>
        <div className="space-x-4">
          <Button onClick={reset} variant="primary">
            Try again
          </Button>
          <Button 
            onClick={() => window.location.href = '/account/auth'} 
            variant="outline"
          >
            Sign in again
          </Button>
        </div>
      </div>
    </div>
  );
}