'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from '@/components/ui/foundations/Link';

interface ContentSectionProps {
  title: string;
  subtitle?: string;
  subtitleHref?: string;
  children: ReactNode;
  className?: string;
}

/**
 * ContentSection component for consistent section styling across pages.
 * Provides a standard white background card with consistent spacing and header styles.
 * 
 * @example
 * ```tsx
 * <ContentSection 
 *   title="Latest Reviews"
 *   subtitle="View All"
 *   subtitleHref="/reviews"
 * >
 *   <ReviewGrid reviews={reviews} />
 * </ContentSection>
 * ```
 */
export default function ContentSection({
  title,
  subtitle,
  subtitleHref,
  children,
  className
}: ContentSectionProps) {
  return (
    <section className={twMerge('bg-white rounded-2xl p-8 shadow-sm border border-gray-100', className)}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {subtitle && subtitleHref && (
          <Link 
            href={subtitleHref}
            variant="text"
            className="text-sm font-medium text-purple-600 hover:text-purple-700"
          >
            {subtitle}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}