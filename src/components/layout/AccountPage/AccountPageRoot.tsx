'use client';

import { ReactNode } from 'react';
import Page from '@/components/layout/Page';
import Content from '@/components/layout/Content';

interface AccountPageRootProps {
  children: ReactNode;
  background?: 'white' | 'gray';
  className?: string;
}

export function AccountPageRoot({ 
  children, 
  background = 'gray',
  className 
}: AccountPageRootProps) {
  return (
    <Page background={background} className={className}>
      <Content>
        {children}
      </Content>
    </Page>
  );
}