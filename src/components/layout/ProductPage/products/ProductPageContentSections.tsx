'use client';

import { ReactNode } from 'react';

interface ProductPageContentSectionsProps {
  children: ReactNode;
}

export function ProductPageContentSections({ children }: ProductPageContentSectionsProps) {
  return (
    <div className="space-y-12 mt-12">
      {children}
    </div>
  );
}