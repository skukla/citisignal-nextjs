'use client';

import { ChevronRightIcon } from '@heroicons/react/24/outline';
import ProductCard from '@/components/ui/ProductCard';
import BaseSection from '@/components/ui/layout/BaseSection';
import ProductGrid from '@/components/ui/ProductGrid';
import Button from '@/components/ui/Button';
import usePopularProducts from '@/hooks/usePopularProducts';

export default function PopularPhonesSection() {
  const { popularProducts, isLoading, error } = usePopularProducts(4);

  if (error) {
    return null;
  }

  if (isLoading) {
    return (
      <BaseSection
        header={{
          title: "Popular Phones",
          description: "Loading popular phones...",
          centered: true
        }}
      >
        <div className="h-96 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </BaseSection>
    );
  }

  return (
    <BaseSection
      header={{
        title: "Popular Phones",
        description: "Discover the latest smartphones with exclusive CitiSignal deals. Get the phone you want with flexible payment options.",
        centered: true
      }}
    >
      <ProductGrid>
        {popularProducts.map((phone) => (
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
    </BaseSection>
  );
} 