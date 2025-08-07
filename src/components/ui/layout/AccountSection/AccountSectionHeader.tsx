'use client';

import { twMerge } from 'tailwind-merge';
import type { AccountSectionHeaderProps } from './AccountSection.types';

export function AccountSectionHeader({ 
  title,
  description,
  actions,
  className 
}: AccountSectionHeaderProps) {
  return (
    <div className={twMerge('mb-6', className)}>
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
  );
}
