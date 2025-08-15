'use client';

import { ReactNode } from 'react';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';

interface AccountRootProps {
  children: ReactNode;
}

/**
 * Account section layout component.
 * Provides consistent layout structure for account pages.
 * Used by app/account/layout.tsx to wrap all account pages.
 */
export function AccountRoot({ children }: AccountRootProps) {
  return (
    <Section background="bg-gray-50">
      <Container>
          {children}
      </Container>
    </Section>
  );
}