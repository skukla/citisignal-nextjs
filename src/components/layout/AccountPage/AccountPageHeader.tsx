'use client';

import { useAccountPage } from './AccountPageContext';

interface AccountPageHeaderProps {
  className?: string;
}

export function AccountPageHeader({ className }: AccountPageHeaderProps = {}) {
  const { pageData } = useAccountPage();
  
  return (
    <div className={className || 'mb-6'}>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {pageData.title}
          </h1>
          {pageData.description && (
            <p className="mt-2 text-sm text-gray-600">
              {pageData.description}
            </p>
          )}
        </div>
        {pageData.actions && (
          <div className="ml-4">
            {pageData.actions}
          </div>
        )}
      </div>
    </div>
  );
}