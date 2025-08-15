'use client';

import { ReactNode } from 'react';
import Page from '@/components/layout/Page';

interface ProductPageBackgroundProps {
  children: ReactNode;
  color?: 'white' | 'gray';
  className?: string;
}

export function ProductPageBackground({ 
  children, 
  color = 'gray',
  className 
}: ProductPageBackgroundProps) {
  return (
    <Page background={color} className={className}>
      {children}
    </Page>
  );
}