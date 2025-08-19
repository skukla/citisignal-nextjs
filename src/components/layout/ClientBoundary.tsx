'use client';

import { ReactNode } from 'react';
import { AuthProvider, AccountProvider } from '@/components/ui/layout/Account';
import CartRootProvider from '@/components/ui/layout/Cart/CartRootProvider';
import Root from '@/components/layout/Root';
import { DemoInspectorProvider } from '@/contexts/DemoInspectorContext';
import { NavigationProvider } from '@/contexts/NavigationContext';
import DemoInspector from '@/components/demo-inspector/DemoInspector';

interface ClientBoundaryProps {
  children: ReactNode;
  initialNavigation?: {
    headerNav: Array<{
      href: string;
      label: string;
      category?: string;
    }>;
    footerNav: Array<{
      href: string;
      label: string;
    }>;
  } | null;
  initialBreadcrumbs?: {
    items: Array<{
      name: string;
      urlPath: string;
    }>;
  } | null;
}

export default function ClientBoundary({ 
  children, 
  initialNavigation,
  initialBreadcrumbs 
}: ClientBoundaryProps) {
  return (
    <DemoInspectorProvider>
      <NavigationProvider 
        initialNavigation={initialNavigation}
        initialBreadcrumbs={initialBreadcrumbs}
      >
        <AuthProvider>
          <AccountProvider>
            <CartRootProvider>
              <Root>
                {children}
              </Root>
            </CartRootProvider>
          </AccountProvider>
        </AuthProvider>
      </NavigationProvider>
      <DemoInspector />
    </DemoInspectorProvider>
  );
}