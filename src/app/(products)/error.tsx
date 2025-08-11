'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/foundations/Button';

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Products page error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-96">
      <div className="text-center max-w-md px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Unable to load products
        </h2>
        <p className="text-gray-600 mb-6">
          We&apos;re having trouble loading our product catalog. Please try again.
        </p>
        <div className="space-x-4">
          <Button onClick={reset} variant="primary">
            Retry
          </Button>
          <Button 
            onClick={() => window.location.href = '/'} 
            variant="outline"
          >
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
}