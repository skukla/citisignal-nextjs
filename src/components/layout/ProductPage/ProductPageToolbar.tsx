'use client';

import { ReactNode } from 'react';

interface ProductPageToolbarProps {
  children: ReactNode;
}

export function ProductPageToolbar({ children }: ProductPageToolbarProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      {children}
    </div>
  );
}