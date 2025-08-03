'use client';

import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';

/**
 * Footer section for ProductListLayout.
 * Handles newsletter section and site footer.
 */
export function ProductListLayoutFooter() {
  return (
    <>
      <NewsletterSection />
      <Footer />
    </>
  );
}