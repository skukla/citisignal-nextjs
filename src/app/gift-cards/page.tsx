'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';
import ProductCard from '@/components/ui/ProductCard';
import ProductGrid from '@/components/ui/ProductGrid';
import LoadMore from '@/components/ui/LoadMore';
import ProductListLayout from '@/components/layout/ProductListLayout';
import { giftCards, giftCardFilterOptions } from '@/data/giftCards';
import { giftCardFilters } from '@/data/filters';
import type { FilterOption } from '@/types/filters';
import { Bars3Icon, GiftIcon } from '@heroicons/react/24/outline';
import { useProductList } from '@/hooks/useProductList';

export default function GiftCardsPage() {
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
  } = useProductList({ products: giftCards });

  // Populate filter options from giftCardFilterOptions
  const filters = giftCardFilters.map(filter => ({
    ...filter,
    options: (giftCardFilterOptions[filter.key as keyof typeof giftCardFilterOptions] || []) as FilterOption[]
  }));

  return (
    <div className="min-h-screen">
      <Header />
      
      <ProductListLayout
        title="Gift Cards"
        description="Give the gift of choice with CitiSignal gift cards. Perfect for devices, accessories, service plans, or letting someone choose exactly what they want."
        icon={GiftIcon}
        filters={filters}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalCount={giftCards.length}
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