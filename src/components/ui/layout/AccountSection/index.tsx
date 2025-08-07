'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface AccountSectionProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function AccountSection({ 
  title,
  description,
  actions,
  children,
  className 
}: AccountSectionProps) {
  return (
    <section className={twMerge('space-y-6', className)}>
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            {description && (
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            )}
          </div>
          {actions && (
            <div className="ml-4">{actions}</div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {children}
      </div>
    </section>
  );
}