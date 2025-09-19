import type { ProductDetailInfoProps } from '../types';

/**
 * ProductDetailInfo component
 * Container for product information section (header, price, variants, actions)
 * Takes up 1 column on desktop grid (gallery takes 2)
 */
export function ProductDetailInfo({ children, className }: ProductDetailInfoProps) {
  const combinedClasses = `lg:col-span-1 space-y-6 ${className || ''}`.trim();

  return <div className={combinedClasses}>{children}</div>;
}
