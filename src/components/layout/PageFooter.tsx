'use client';

import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';

/**
 * Standard page footer that includes newsletter section and site footer.
 * Provides consistent footer pattern across all pages.
 * 
 * @example
 * <PageFooter />
 */
export default function PageFooter() {
  return (
    <>
      <NewsletterSection />
      <Footer />
    </>
  );
}