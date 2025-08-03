'use client';

import { memo, useMemo } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import { phones } from '@/data/phones';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ProductGrid from '@/components/ui/ProductGrid';
import { popularPhonesContent } from '@/data/sections/popularPhones';
import type { PopularPhonesContent } from '@/data/sections/popularPhones';

export interface PopularPhonesSectionProps {
  content?: PopularPhonesContent;
  className?: string;
}

/**
 * PopularPhonesSection displays the most popular phones based on review count.
 * 
 * @example
 * ```tsx
 * <PopularPhonesSection className="my-8" />
 * ```
 */
function PopularPhonesSection({
  content = popularPhonesContent,
  className
}: PopularPhonesSectionProps) {
  // Memoize popular phones calculation for performance
  const popularPhones = useMemo(() => 
    phones
      .sort((a, b) => b.review_count - a.review_count)
      .slice(0, content.phoneCount),
    [content.phoneCount]
  );

  return (
    <Section background="bg-white" className={className}>
      <SectionHeader
        title={content.header.title}
        description={content.header.description}
        centered
        className="mb-16"
      />

        {/* Phones Grid */}
        <ProductGrid 
          products={popularPhones}
          columns={{ sm: 1, md: 2, lg: 4 }}
          gap="lg"
        />

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            href={content.viewAllLink.href}
            variant="secondary"
            rightIcon={ArrowRightIcon}
          >
            {content.viewAllLink.text}
          </Button>
        </div>
    </Section>
  );
}

export default memo(PopularPhonesSection); 