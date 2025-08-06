'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TwoColumnLayoutProps {
  children: ReactNode[];
  className?: string;
}

/**
 * Responsive two-column layout with sidebar and main content.
 * Handles responsive behavior: stacked on mobile, side-by-side on desktop.
 * Expects exactly two children: first child is sidebar, second child is main content.
 * 
 * @example
 * <TwoColumnLayout>
 *   <FilterSidebar />
 *   <ProductGrid />
 * </TwoColumnLayout>
 */
export default function TwoColumnLayout({ 
  children, 
  className 
}: TwoColumnLayoutProps) {
  const [sidebar, content] = children;

  return (
    <div className={twMerge('flex flex-col lg:flex-row gap-8', className)}>
      {sidebar}
      <div className="flex-1">
        {content}
      </div>
    </div>
  );
}