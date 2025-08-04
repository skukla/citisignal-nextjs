'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface PageContainerProps {
  children: ReactNode;
  background?: 'gray' | 'white';
  className?: string;
}

/**
 * Basic page container that provides consistent page structure.
 * Replaces repetitive min-h-screen + main wrapper patterns.
 * 
 * @example
 * <PageContainer background="gray">
 *   <PageContent />
 * </PageContainer>
 */
export default function PageContainer({ 
  children, 
  background = 'white',
  className 
}: PageContainerProps) {
  return (
    <div className={twMerge(
      'min-h-screen',
      background === 'gray' ? 'bg-gray-50' : 'bg-white',
      className
    )}>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}