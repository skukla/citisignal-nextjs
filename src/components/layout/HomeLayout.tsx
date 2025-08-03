'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import Footer from '@/components/layout/Footer';

export interface HomeLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * Layout for the home page.
 * Provides full-width container for marketing sections that manage their own max-width.
 * Different from ProductPageLayout which constrains content width.
 * 
 * @example
 * <HomeLayout>
 *   <HeroSection />
 *   <WhyCitiSignalSection />
 *   <NewsletterSection />
 * </HomeLayout>
 */
export default function HomeLayout({ 
  children, 
  className 
}: HomeLayoutProps) {
  return (
    <div className={twMerge('min-h-screen', className)}>
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}