'use client';

import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { phones } from '@/data/phones';
import ProductCard from '@/components/ui/ProductCard';
import SectionContainer from '@/components/ui/SectionContainer';
import SectionHeader from '@/components/ui/SectionHeader';
import ProductGrid from '@/components/ui/ProductGrid';
import Button from '@/components/ui/Button';

export default function PopularPhonesSection() {
  // Get 4 popular phones (those with highest review count)
  const popularPhones = phones
    .sort((a, b) => b.review_count - a.review_count)
    .slice(0, 4);

  return (
    <SectionContainer>
      <SectionHeader
        title="Popular Phones"
        description="Discover the latest smartphones with exclusive CitiSignal deals. Get the phone you want with flexible payment options."
        centered
        className="mb-16"
      />

      <ProductGrid>
        {popularPhones.map((phone) => (
          <ProductCard
            key={phone.sku}
            id={phone.id}
            name={phone.name}
            brand={phone.manufacturer}
            price={phone.price}
            originalPrice={phone.original_price}
            image={phone.media_gallery?.[0]?.url || ''}
            category={phone.category}
            features={phone.memory}
            colors={phone.available_colors}
            inStock={phone.stock_status === 'IN_STOCK'}
            isNew={phone.isNew}
            isSale={phone.original_price ? phone.original_price > phone.price : false}
          />
        ))}
      </ProductGrid>

      <div className="text-center mt-12">
        <Button
          href="/phones"
          variant="subtle"
          rightIcon={ChevronRightIcon}
        >
          View All Phones
        </Button>
      </div>
    </SectionContainer>
  );
} 