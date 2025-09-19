import type { ProductDetailBackgroundProps } from '../types';

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
