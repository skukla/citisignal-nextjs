import { ErrorState } from '@/components/ui/ErrorState';

interface ProductDetailErrorProps {
  error?: Error;
  onRetry?: () => void;
}

/**
 * ProductDetailError component
 * Standardized error state for Product Detail Page using ErrorState component
 * Provides consistent error handling across the application
 */
export function ProductDetailError({ error, onRetry }: ProductDetailErrorProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full">
        <ErrorState
          message={error?.message || "We couldn't load this product. Please try again."}
          onRetry={onRetry}
        />
      </div>
    </div>
  );
}
