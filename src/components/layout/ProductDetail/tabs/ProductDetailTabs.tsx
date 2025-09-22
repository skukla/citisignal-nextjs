import type { ProductDetailTabsProps } from '../types';

/**
 * ProductDetailTabs component
 * Container for tabbed content sections with enhanced visual hierarchy
 * Creates clear separation between product info and detailed content
 */
export function ProductDetailTabs({ children, className }: ProductDetailTabsProps) {
  const combinedClasses = `mt-16 border-t-2 border-gray-300 pt-12 ${className || ''}`.trim();

  return (
    <div className={combinedClasses}>
      <div className="space-y-12">{children}</div>
    </div>
  );
}
