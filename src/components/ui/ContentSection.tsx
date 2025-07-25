'use client';

import { twMerge } from 'tailwind-merge';
import Button from './Button';

interface ContentSectionProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  children: React.ReactNode;
  className?: string;
}

export default function ContentSection({
  title,
  description,
  actionLabel,
  actionHref,
  children,
  className
}: ContentSectionProps) {
  return (
    <section className={twMerge(
      'bg-white rounded-2xl p-8 shadow-sm border border-gray-100',
      className
    )}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {title}
          </h2>
          {description && (
            <p className="mt-2 text-gray-600">
              {description}
            </p>
          )}
        </div>
        {actionLabel && actionHref && (
          <Button
            href={actionHref}
            variant="secondary"
            size="sm"
          >
            {actionLabel}
          </Button>
        )}
      </div>
      {children}
    </section>
  );
} 