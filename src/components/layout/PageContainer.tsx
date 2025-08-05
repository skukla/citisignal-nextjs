'use client';

import { twMerge } from 'tailwind-merge';
import type { PageContainerProps } from '@/types/layout';

/**
 * Basic page container that provides consistent page structure.
 * 
 * @example
 * // Default usage
 * <PageContainer>
 *   <PageContent />
 * </PageContainer>
 * 
 * // Confirmation page with narrow width and gray background
 * <PageContainer background="gray" maxWidth="2xl">
 *   <ConfirmationContent />
 * </PageContainer>
 * 
 * // Custom padding
 * <PageContainer padding={{ y: 'lg' }}>
 *   <Content />
 * </PageContainer>
 */
export default function PageContainer({ 
  children, 
  background = 'white',
  maxWidth = '7xl',
  padding = { x: 'lg', y: 'md' },
  className 
}: PageContainerProps) {
  return (
    <div className={twMerge(
      'min-h-screen',
      background === 'gray' ? 'bg-gray-50' : 'bg-white',
      className
    )}>
      <main className={twMerge(
        'mx-auto',
        // Max width
        maxWidth === '2xl' && 'max-w-2xl',
        maxWidth === '4xl' && 'max-w-4xl',
        maxWidth === '7xl' && 'max-w-7xl',
        
        // Horizontal padding
        padding.x === 'none' && '',
        padding.x === 'sm' && 'px-2 sm:px-4',
        padding.x === 'md' && 'px-4 sm:px-6',
        padding.x === 'lg' && 'px-4 sm:px-6 lg:px-8',
        
        // Vertical padding
        padding.y === 'none' && '',
        padding.y === 'sm' && 'py-4',
        padding.y === 'md' && 'py-8',
        padding.y === 'lg' && 'py-12'
      )}>
        {children}
      </main>
    </div>
  );
}