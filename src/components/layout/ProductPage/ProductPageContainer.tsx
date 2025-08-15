'use client';

import { ReactNode } from 'react';
import Content from '@/components/layout/Content';

interface ProductPageContainerProps {
  children: ReactNode;
  className?: string;
}

export function ProductPageContainer({ 
  children,
  className 
}: ProductPageContainerProps) {
  return (
    <Content className={className}>
      {children}
    </Content>
  );
}