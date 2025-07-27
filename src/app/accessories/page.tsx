'use client';

import { type ReactElement } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';
import ProductCard from '@/components/ui/ProductCard';
import ProductGrid from '@/components/ui/ProductGrid';
import LoadMore from '@/components/ui/LoadMore';
import ProductListLayout from '@/components/layout/ProductListLayout';
import { accessories, accessoryFilterOptions } from '@/data/accessories';
import { accessoryFilters } from '@/types/filters';
import type { FilterOption } from '@/types/filters';
import { Square3Stack3DIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useProductList } from '@/hooks/useProductList';

export default function AccessoriesPage(): ReactElement {
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
  } = useProductList({ products: accessories });

  // Populate filter options from accessoryFilterOptions
  const filters = accessoryFilters.map(filter => ({
    ...filter,
    options: (accessoryFilterOptions[filter.key as keyof typeof accessoryFilterOptions] || []) as FilterOption[]
  }));

  return (
    <div className="min-h-screen">
      <Header />
      
      <ProductListLayout
        title="Accessories"
        description="Enhance your devices with our wide range of accessories. From cases and chargers to headphones and more, find everything you need to get the most out of your technology."
        icon={Square3Stack3DIcon}
        filters={filters}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalCount={accessories.length}
        filteredCount={filteredAndSortedProducts.length}
        emptyStateIcon={Bars3Icon}
      >
        <div className="space-y-12">
          <ProductGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="md">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.sku}
                id={product.id}
                name={product.name}
                brand={product.manufacturer}
                price={product.price}
                originalPrice={product.original_price}
                image={product.media_gallery?.[0]?.url || ''}
                category={product.category}
                features={[`Compatible with: ${product.compatibility.join(', ')}`]}
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