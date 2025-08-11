'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/foundations/Button';

export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Home page error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-md px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-6">
          We&apos;re having trouble loading the page. Please try again.
        </p>
        <div className="space-x-4">
          <Button onClick={reset} variant="primary">
            Try again
          </Button>
          <Button 
            onClick={() => window.location.href = '/'} 
            variant="outline"
          >
            Go to home
          </Button>
        </div>
      </div>
    </div>
  );
}