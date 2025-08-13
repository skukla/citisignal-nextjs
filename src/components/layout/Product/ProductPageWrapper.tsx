'use client';

import { ProductRoot } from './ProductRoot';
import EmptyState from '@/components/ui/feedback/EmptyState';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import type { ProductPageWrapperProps } from './Product.types';

/**
 * Wrapper component that provides consistent loading and error states
 * for all product category pages (phones, watches, accessories, etc.)
 */
export function ProductPageWrapper({
  breadcrumbs,
  title,
  description,
  loading,
  error,
  products,
  totalCount,
  searchProps,
  children,
  loadingSkeletonCount = 12,
  errorTitle = 'Unable to load products',
  errorDescription = 'There was an error loading the products. Please try again later.',
  onRetry = () => window.location.reload()
}: ProductPageWrapperProps) {
  
  // Show loading skeleton on initial load
  if (loading && products.length === 0) {
    return (
      <ProductRoot
        breadcrumbs={breadcrumbs}
        title={title}
        description={description}
        resultsCount={0}
      >
        <div className="min-h-[400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(loadingSkeletonCount)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2 mb-2"></div>
                <div className="bg-gray-200 h-6 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </ProductRoot>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <ProductRoot
        breadcrumbs={breadcrumbs}
        title={title}
        description={description}
        resultsCount={0}
      >
        <div className="min-h-[400px] flex items-start justify-center pt-12">
          <EmptyState
            icon={ExclamationTriangleIcon}
            title={errorTitle}
            description={errorDescription}
            actionLabel="Retry"
            onAction={onRetry}
          />
        </div>
      </ProductRoot>
    );
  }

  // Normal content with search bar
  return (
    <ProductRoot
      breadcrumbs={breadcrumbs}
      title={title}
      description={description}
      searchProps={searchProps}
      resultsCount={totalCount || products.length}
    >
      {children}
    </ProductRoot>
  );
}