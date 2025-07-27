'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';
import ProductCard from '@/components/ui/ProductCard';
import ProductGrid from '@/components/ui/ProductGrid';
import LoadMore from '@/components/ui/LoadMore';
import ProductListLayout from '@/components/layout/ProductListLayout';
import { watches, watchFilterOptions } from '@/data/watches';
import { watchFilters } from '@/data/filters';
import { FilterOption } from '@/types/filters';
import { ClockIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useProductList } from '@/hooks/useProductList';

export default function WatchesPage() {
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
  } = useProductList({ products: watches });

  // Populate filter options from watchFilterOptions
  const filters = watchFilters.map(filter => ({
    ...filter,
    options: (watchFilterOptions[filter.key as keyof typeof watchFilterOptions] || []) as FilterOption[]
  }));

  return (
    <div className="min-h-screen">
      <Header />
      
      <ProductListLayout
        title="Watches"
        description="Stay connected and track your health with the latest smartwatches. From Apple Watch to Samsung Galaxy Watch, find the perfect wearable device to complement your lifestyle."
        icon={ClockIcon}
        filters={filters}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalCount={watches.length}
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
                brand={product.manufacturer}
                price={product.price}
                originalPrice={product.original_price}
                image={product.media_gallery?.[0]?.url || ''}
                category={product.category}
                features={[product.connectivity, product.battery_life]}
                colors={product.available_colors}
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