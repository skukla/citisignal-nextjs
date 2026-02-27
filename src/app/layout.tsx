'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { StandardHeader } from '@/components/layout/Header/StandardHeader';
import { StandardFooter } from '@/components/layout/Footer/StandardFooter';
import { AuthProvider, AccountProvider } from '@/components/ui/layout/Account';
import { CartProvider } from '@/components/ui/layout/Cart/CartProvider';
import Root from '@/components/layout/Root';
import { NavigationProvider } from '@/contexts/NavigationContext';
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const isCheckoutPage = pathname?.startsWith('/checkout');

  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <head>
        <title>CitiSignal - Your Trusted Wireless Provider</title>
        <meta
          name="description"
          content="America's most reliable wireless network. Stay connected with the latest phones, unlimited plans, and nationwide coverage."
        />
      </head>
      <body className="h-full bg-white antialiased" suppressHydrationWarning>
        <NavigationProvider>
          <AuthProvider>
            <AccountProvider>
              <CartProvider>
                <Root>
                  {!isCheckoutPage && <StandardHeader />}
                  <main>{children}</main>
                  <StandardFooter />
                </Root>
              </CartProvider>
            </AccountProvider>
          </AuthProvider>
        </NavigationProvider>
      </body>
    </html>
  );
}
