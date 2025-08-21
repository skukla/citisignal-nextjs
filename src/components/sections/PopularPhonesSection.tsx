'use client';

import { memo } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/foundations/Button';
import ContentSection from '@/components/ui/layout/ContentSection';
import SectionHeader from '@/components/ui/layout/SectionHeader';
import ProductGrid from '@/components/ui/grids/ProductGrid';
import { popularPhonesContent } from '@/data/sections/popularPhones';
import { useProductCards } from '@/hooks/products/useProductCards';
import type { PopularPhonesContent } from '@/data/sections/popularPhones';
import type { Phone } from '@/types/commerce';

export interface PopularPhonesSectionProps {
  content?: PopularPhonesContent;
  className?: string;
}

/**
 * PopularPhonesSection displays the most popular phones from Adobe Commerce.
 *
 * @example
 * ```tsx
 * <PopularPhonesSection className="my-8" />
 * ```
 */
function PopularPhonesSection({
  content = popularPhonesContent,
  className,
}: PopularPhonesSectionProps) {
  // Fetch popular phones from Adobe Commerce mesh
  const {
    items: phones,
    loading,
    error,
  } = useProductCards({
    filter: {
      categoryUrlKey: 'phones',
      // Note: Remove onSaleOnly filter to show any phones if none are on sale
      // onSaleOnly: true,
    },
    limit: content.phoneCount,
  });

  // Show loading skeleton while fetching
  if (loading && phones.length === 0) {
    return (
      <ContentSection background="bg-white" className={className}>
        <SectionHeader
          title={content.header.title}
          description={content.header.description}
          centered
          className="mb-16"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </ContentSection>
    );
  }

  // Don't render section if there's an error or no phones
  if (error || phones.length === 0) {
    return null;
  }

  return (
    <ContentSection background="bg-white" className={className}>
      <SectionHeader
        title={content.header.title}
        description={content.header.description}
        centered
        className="mb-16"
      />

      {/* Phones Grid */}
      <ProductGrid products={phones as Phone[]} columns={{ sm: 1, md: 2, lg: 4 }} gap="lg" />

      {/* View All Button */}
      <div className="text-center mt-12">
        <Button href={content.viewAllLink.href} variant="secondary" rightIcon={ArrowRightIcon}>
          {content.viewAllLink.text}
        </Button>
      </div>
    </ContentSection>
  );
}

export default memo(PopularPhonesSection);
