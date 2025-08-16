'use client';

import EmptyState from '@/components/ui/feedback/EmptyState';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ProductPageErrorProps {
  error: Error;
}

export default function ProductPageError({ error }: ProductPageErrorProps) {
  return (
    <div className="min-h-[400px] flex items-start justify-center pt-12">
      <EmptyState
        icon={ExclamationTriangleIcon}
        title="Unable to load products"
        description={error.message || 'There was an error loading the products. Please try again later.'}
        actionLabel="Retry"
        onAction={() => window.location.reload()}
      />
    </div>
  );
}