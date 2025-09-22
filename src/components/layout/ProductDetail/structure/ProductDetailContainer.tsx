import type { ProductDetailContainerProps } from '../types';

/**
 * ProductDetailContainer component
 * Reuses the same container system as ProductPage for consistency
 * Includes bottom padding to create proper spacing before footer
 */
export function ProductDetailContainer({ children, className }: ProductDetailContainerProps) {
  const combinedClasses =
    `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24 ${className || ''}`.trim();

  return <div className={combinedClasses}>{children}</div>;
}
