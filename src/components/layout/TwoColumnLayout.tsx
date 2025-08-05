'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TwoColumnLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Responsive two-column layout with sidebar and main content.
 * Handles responsive behavior: stacked on mobile, side-by-side on desktop.
 * 
 * @example
 * <TwoColumnLayout sidebar={<FilterSidebar />}>
 *   <ProductGrid />
 * </TwoColumnLayout>
 */
export default function TwoColumnLayout({ 
  sidebar, 
  children, 
  className 
}: TwoColumnLayoutProps) {
  return (
    <div className={twMerge('flex flex-col lg:flex-row gap-8', className)}>
      {sidebar}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}