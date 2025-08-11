'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/foundations/Button';

export default function CheckoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Checkout error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-96">
      <div className="text-center max-w-md px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Checkout Error
        </h2>
        <p className="text-gray-600 mb-6">
          We encountered an issue processing your checkout. Your cart has been saved.
        </p>
        <div className="space-x-4">
          <Button onClick={reset} variant="primary">
            Try again
          </Button>
          <Button 
            onClick={() => window.location.href = '/'} 
            variant="outline"
          >
            Continue shopping
          </Button>
        </div>
      </div>
    </div>
  );
}