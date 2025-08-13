'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { StandardHeader } from '@/components/layout/Header/StandardHeader';
import { StandardFooter } from '@/components/layout/Footer/StandardFooter';
import { AuthProvider, AccountProvider } from '@/components/ui/layout/Account';
import CartRootProvider from '@/components/ui/layout/Cart/CartRootProvider';
import ApolloProvider from '@/providers/ApolloProvider';
import Root from '@/components/layout/Root';
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const isCheckoutPage = pathname?.startsWith('/checkout');

  return (
    <html lang="en" className="h-full">
      <head>
        <title>CitiSignal - Your Trusted Wireless Provider</title>
        <meta name="description" content="America's most reliable wireless network. Stay connected with the latest phones, unlimited plans, and nationwide coverage." />
      </head>
      <body className="h-full bg-white antialiased" suppressHydrationWarning>
        <ApolloProvider>
          <AuthProvider>
            <AccountProvider>
              <CartRootProvider>
                <Root>
                  {!isCheckoutPage && <StandardHeader />}
                  <main>
                    {children}
                  </main>
                  <StandardFooter />
                </Root>
              </CartRootProvider>
            </AccountProvider>
          </AuthProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}