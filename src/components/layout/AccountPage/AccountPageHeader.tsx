'use client';

import { useAccountPage } from './AccountPageContext';

interface AccountPageHeaderProps {
  className?: string;
}

export function AccountPageHeader({ className }: AccountPageHeaderProps = {}) {
  const { pageData } = useAccountPage();
  
  return (
    <div className={className || 'mb-6'}>
      <h1 className="text-2xl font-bold text-gray-900">
        {pageData.title}
      </h1>
      {pageData.description && (
        <p className="mt-2 text-sm text-gray-600">
          {pageData.description}
        </p>
      )}
    </div>
  );
}