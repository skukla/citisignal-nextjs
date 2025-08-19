import { ReactNode } from 'react';
import { StandardHeader } from '@/components/layout/Header/StandardHeader';
import { StandardFooter } from '@/components/layout/Footer/StandardFooter';
import ClientBoundary from '@/components/layout/ClientBoundary';
import { fetchNavigationSSR } from '@/lib/ssr-fetchers';
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  // Fetch navigation data server-side for instant rendering
  const navigationData = await fetchNavigationSSR();

  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <head>
        <title>CitiSignal - Your Trusted Wireless Provider</title>
        <meta name="description" content="America's most reliable wireless network. Stay connected with the latest phones, unlimited plans, and nationwide coverage." />
      </head>
      <body className="h-full bg-white antialiased" suppressHydrationWarning>
        <ClientBoundary initialNavigation={navigationData}>
          <StandardHeader />
          <main>
            {children}
          </main>
          <StandardFooter />
        </ClientBoundary>
      </body>
    </html>
  );
}