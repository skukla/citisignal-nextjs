import { Geist, Geist_Mono } from 'next/font/google';
import { type Metadata } from 'next';
import type { ReactNode } from 'react';
import Header from '@/components/layout/Header/index';
import { NavigationRoot } from '@/components/ui/Navigation';
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
        <NavigationRoot>
          <Header />
          <main className="min-h-screen">{children}</main>
        </NavigationRoot>
      </body>
    </html>
  );
}
