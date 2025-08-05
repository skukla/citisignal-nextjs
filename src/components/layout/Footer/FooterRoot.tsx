'use client';

import Container from '@/components/ui/layout/Container';
import type { BaseComponentProps } from '@/types/ui';

interface FooterRootProps extends BaseComponentProps {
  children: React.ReactNode;
}

/**
 * Root component for Footer compound component.
 * Provides the base footer structure and Container for all Footer sub-components.
 * 
 * @example
 * ```tsx
 * <Footer.Root>
 *   <Footer.Logo description="Company description" />
 *   <Footer.SocialLinks links={socialLinks} />
 *   <Footer.LinkGroup title="Shop" links={shopLinks} />
 *   <Footer.Bottom copyright="© 2024 Company" />
 * </Footer.Root>
 * ```
 */
export function FooterRoot({ children }: FooterRootProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <Container className="py-12">
        {children}
      </Container>
    </footer>
  );
}