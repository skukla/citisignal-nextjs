'use client';

import { type ReactElement } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';
import ProductCard from '@/components/ui/ProductCard';
import ProductGrid from '@/components/ui/ProductGrid';
import LoadMore from '@/components/ui/LoadMore';
import ProductListLayout from '@/components/layout/ProductListLayout';
import { internetDeals, internetDealsFilterOptions } from '@/data/internet-deals';
import { internetFilters } from '@/types/filters';
import type { FilterOption } from '@/types/filters';
import { WifiIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useProductList } from '@/hooks/useProductList';

export default function InternetDealsPage(): ReactElement {
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    handleSortChange,
    activeFilters,
    handleFilterChange,
    handleClearFilters,
    handleLoadMore,
    hasMoreItems,
    filteredAndSortedProducts
  } = useProductList({ products: internetDeals });

  // Populate filter options from internetDealsFilterOptions
  const filters = internetFilters.map(filter => ({
    ...filter,
    options: (internetDealsFilterOptions[filter.key as keyof typeof internetDealsFilterOptions] || []) as FilterOption[]
  }));

  return (
    <div className="min-h-screen">
      <Header />
      
      <ProductListLayout
        title="Internet Deals"
        description="Get connected with high-speed internet from CitiSignal. From fiber to 5G home internet, find the perfect connection for your home or business with competitive pricing and reliable service."
        icon={WifiIcon}
        filters={filters}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalCount={internetDeals.length}
        filteredCount={filteredAndSortedProducts.length}
        emptyStateIcon={Bars3Icon}
      >
        <div className="space-y-12">
          <ProductGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="md">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                brand="CitiSignal"
                price={product.price}
                originalPrice={product.original_price}
                image={product.media_gallery?.[0]?.url || ''}
                category={product.category}
                features={[
                  `Speed: ${product.speed}`,
                  `Data: ${product.data_limit}`,
                  `Contract: ${product.contract_length}`,
                  ...(product.equipment_included ? ['Equipment Included'] : []),
                  ...(product.setup_fee === 0 ? ['No Setup Fee'] : [`Setup Fee: $${product.setup_fee}`]),
                  ...product.features
                ]}
                inStock={product.stock_status === 'IN_STOCK'}
                isNew={product.isNew}
                isSale={product.original_price ? product.original_price > product.price : false}
              />
            ))}
          </ProductGrid>

          <LoadMore
            onLoadMore={handleLoadMore}
            isVisible={hasMoreItems}
          />
        </div>
      </ProductListLayout>

      <NewsletterSection />
      <Footer />
    </div>
  );
} 