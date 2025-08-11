'use client';

import { ReactNode } from 'react';
import { AuthProvider, AccountProvider } from '@/components/ui/layout/Account';
import CartRootProvider from '@/components/ui/layout/Cart/CartRootProvider';
import Root from '@/components/layout/Root';
import ConditionalHeader from '@/components/layout/Header/ConditionalHeader';
import { StandardFooter } from '@/components/layout/Footer/StandardFooter';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AccountProvider>
        <CartRootProvider>
          <Root>
            <ConditionalHeader />
            <main>
              {children}
            </main>
            <StandardFooter />
          </Root>
        </CartRootProvider>
      </AccountProvider>
    </AuthProvider>
  );
}
