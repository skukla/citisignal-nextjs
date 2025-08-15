'use client';

import { ReactNode } from 'react';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';

interface ProductPageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function ProductPageLayout({ 
  children, 
  className 
}: ProductPageLayoutProps) {
  // TwoColumnLayout expects exactly 2 children as an array
  const childrenArray = Array.isArray(children) ? children : [children];
  
  return (
    <TwoColumnLayout className={className}>
      {childrenArray}
    </TwoColumnLayout>
  );
}