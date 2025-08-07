'use client';

import { ProductRoot } from '@/components/layout/Product/ProductRoot';
import FilterSidebarResponsive from '@/components/ui/search/FilterSidebar/FilterSidebarResponsive';
import EmptyState from '@/components/ui/feedback/EmptyState';
import PlanGrid from '@/components/ui/grids/PlanGrid';
import { plansPageData } from '@/data/pages/plans';
import { useProductList } from '@/hooks/useProductList';

export default function PlansPage() {
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
  } = useProductList({ products: plansPageData.products });

  // Page configuration  
  const { filters, breadcrumbs, pageHeader, search, emptyState } = plansPageData;

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
        <PlanGrid
          plans={filteredAndSortedProducts}
          onSelectPlan={(planId) => {
            // TODO: Navigate to checkout with selected plan
            console.log('Select plan:', planId);
          }}
          onLearnMore={(planId) => {
            // TODO: Navigate to plan details page
            console.log('Learn more about plan:', planId);
          }}
          onWishlistToggle={(planId, saved) => {
            // TODO: Update wishlist state
            console.log('Wishlist toggle:', planId, saved);
          }}
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
