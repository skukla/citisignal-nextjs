'use client';

import StandardProductLayout from '@/components/layout/StandardProductLayout';
import ProductCard from '@/components/ui/ProductCard';
import { accessories, accessoriesPageConfig } from '@/data/pages/accessories';
import { useProductList } from '@/hooks/useProductList';
import type { Accessory } from '@/types/commerce';

export default function AccessoriesPage() {
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    activeFilters,
    showMobileFilters,
    setShowMobileFilters,
    handleFilterChange,
    handleClearFilters,
    filteredAndSortedProducts
  } = useProductList({ products: accessories });

  // Get page configuration
  const { filters, breadcrumbs, pageHeader, search, emptyState } = accessoriesPageConfig;

  return (
    <StandardProductLayout
      breadcrumbs={breadcrumbs}
      pageHeader={pageHeader}
      search={search}
      emptyState={emptyState}
      filters={filters}
      products={accessories}
      filteredProducts={filteredAndSortedProducts}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      sortBy={sortBy}
      onSortChange={setSortBy}
      activeFilters={activeFilters}
      onFilterChange={handleFilterChange}
      onClearFilters={handleClearFilters}
      showMobileFilters={showMobileFilters}
      setShowMobileFilters={setShowMobileFilters}
      renderProduct={(product) => (
        <ProductCard.Root key={(product as Accessory).id} product={product as Accessory}>
          <ProductCard.Image />
          <ProductCard.Badges />
          <ProductCard.Info />
          <ProductCard.Price />
          <ProductCard.Actions />
        </ProductCard.Root>
      )}
      gridColumns={{ sm: 1, md: 2, lg: 3 }}
    />
  );
}