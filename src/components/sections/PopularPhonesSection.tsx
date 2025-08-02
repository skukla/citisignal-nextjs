import { memo, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { phones } from '@/data/phones';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { popularPhonesContent } from '@/data/sections/popularPhones';
import type { PopularPhonesContent } from '@/data/sections/popularPhones';
import { 
  ProductCard, 
  ProductCardImage, 
  ProductCardBadges, 
  ProductCardInfo, 
  ProductCardPrice, 
  ProductCardActions 
} from '@/features/product/components/ProductCard';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularPhones.map((phone) => (
            <ProductCard key={phone.sku} product={phone}>
              <ProductCardImage />
              <ProductCardBadges />
              <ProductCardInfo />
              <ProductCardPrice />
              <ProductCardActions />
            </ProductCard>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href={content.viewAllLink.href}
            className="inline-flex items-center px-8 py-3 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            {content.viewAllLink.text}
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </Link>
        </div>
    </Section>
  );
}

export default memo(PopularPhonesSection); 