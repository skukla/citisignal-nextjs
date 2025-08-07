'use client';

import { ProductRoot } from '@/components/layout/Product/ProductRoot';
import FilterSidebarResponsive from '@/components/ui/search/FilterSidebar/FilterSidebarResponsive';
import EmptyState from '@/components/ui/feedback/EmptyState';
import ProductGrid from '@/components/ui/grids/ProductGrid';
import { streamingPageData } from '@/data/pages/streaming';
import { useProductList } from '@/hooks/useProductList';
import type { StreamingService } from '@/data/pages/streaming';

export default function StreamingPage() {
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    handleSortChange,
    activeFilters,
    showMobileFilters,
    setShowMobileFilters,
    handleFilterChange,
    handleClearFilters,
    filteredAndSortedProducts
  } = useProductList({ products: streamingPageData.products });

  // Page configuration
  const { filters, breadcrumbs, pageHeader, search, emptyState } = streamingPageData;

  return (
    <ProductRoot
      breadcrumbs={breadcrumbs}
      title={pageHeader.title}
      description={pageHeader.description}
      searchProps={{
        searchQuery,
        onSearchChange: setSearchQuery,
        sortBy,
        onSortChange: handleSortChange,
        placeholder: search.placeholder
      }}
      resultsCount={filteredAndSortedProducts.length}
      itemLabel={search.itemLabel}
    >
      <FilterSidebarResponsive 
        filters={filters}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        showMobileFilters={showMobileFilters}
        setShowMobileFilters={setShowMobileFilters}
      />
      
      {filteredAndSortedProducts.length > 0 ? (
        <ProductGrid 
          products={filteredAndSortedProducts as StreamingService[]}
          columns={{ sm: 1, md: 2, lg: 3 }}
          gap="lg"
        />
      ) : (
        <EmptyState
          icon={emptyState.icon}
          title={emptyState.title}
          description={emptyState.description}
          actionLabel={emptyState.actionLabel}
          onAction={handleClearFilters}
        />
      )}
    </ProductRoot>
  );
}
