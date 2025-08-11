'use client';

import { ReactNode } from 'react';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';

interface AccountPageRootProps {
  children: ReactNode;
}

/**
 * Account page layout wrapper component.
 * Provides consistent layout structure for account pages.
 * Used by app/account/layout.tsx to wrap all account pages.
 */
export function AccountPageRoot({ children }: AccountPageRootProps) {
  return (
    <Section background="bg-gray-50">
      <Container>
          {children}
      </Container>
    </Section>
  );
}