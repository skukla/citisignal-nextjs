import { Geist, Geist_Mono } from 'next/font/google';
import { type Metadata } from 'next';
import type { ReactNode } from 'react';
import Header from '@/components/layout/Header/index';
import Footer from '@/components/layout/Footer';
import Root from '@/components/layout/Root';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CitiSignal',
  description: 'Your trusted mobile carrier',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Root>
          <Header />
          {children}
          <Footer />
        </Root>
      </body>
    </html>
  );
}
