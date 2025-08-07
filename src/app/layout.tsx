'use client';

import { ReactNode } from 'react';
import { StandardHeader } from '@/components/layout/Header/StandardHeader';
import { StandardFooter } from '@/components/layout/Footer/StandardFooter';
import { AuthProvider, AccountProvider } from '@/components/ui/layout/Account';
import CartRootProvider from '@/components/ui/layout/Cart/CartRootProvider';
import { usePathname } from 'next/navigation';
import Root from '@/components/layout/Root';
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const isCheckout = pathname?.startsWith('/checkout');

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AccountProvider>
            <CartRootProvider>
              <Root>
                {!isCheckout && <StandardHeader />}
                <main>
                  {children}
                </main>
                <StandardFooter />
              </Root>
            </CartRootProvider>
          </AccountProvider>
        </AuthProvider>
      </body>
    </html>
  );
}