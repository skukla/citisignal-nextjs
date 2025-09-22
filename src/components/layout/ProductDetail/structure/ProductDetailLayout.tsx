import type { ProductDetailLayoutProps } from '../types';

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
