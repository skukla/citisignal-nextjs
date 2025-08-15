'use client';

import { ReactNode } from 'react';

interface ProductPageMainProps {
  children: ReactNode;
}

export function ProductPageMain({ children }: ProductPageMainProps) {
  // TwoColumnLayout handles the responsive layout, we just wrap in semantic div
  return (
    <div className="min-w-0 w-full">
      {children}
    </div>
  );
}