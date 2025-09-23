import type {
  ProductDetailBackgroundProps,
  ProductDetailContainerProps,
  ProductDetailLayoutProps,
} from '../types';

/**
 * Consolidated ProductDetail structure components
 *
 * These are simple layout components that were previously split into separate files.
 * Consolidating them reduces file count while maintaining the same API and functionality.
 */

/**
 * ProductDetailBackground component
 * Reuses the same background system as ProductPage for consistency
 */
export function ProductDetailBackground({
  children,
  className,
  color = 'white',
}: ProductDetailBackgroundProps) {
  const baseClasses = 'min-h-screen';
  const colorClasses = color === 'white' ? 'bg-white' : 'bg-gray-50';
  const combinedClasses = `${baseClasses} ${colorClasses} ${className || ''}`.trim();

  return <div className={combinedClasses}>{children}</div>;
}

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

/**
 * ProductDetailLayout component
 * Provides responsive layout for gallery and product info
 * Mobile: stacked vertically
 * Desktop: side-by-side with more balanced proportions (gallery:info = 1:1)
 */
export function ProductDetailLayout({ children, className }: ProductDetailLayoutProps) {
  const combinedClasses = `grid gap-8 lg:grid-cols-2 lg:gap-12 py-8 ${className || ''}`.trim();

  return <div className={combinedClasses}>{children}</div>;
}

/**
 * Compound component structure for easy importing
 */
export const ProductDetailStructure = {
  Background: ProductDetailBackground,
  Container: ProductDetailContainer,
  Layout: ProductDetailLayout,
};
