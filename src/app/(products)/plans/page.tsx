'use client';

import { ProductRoot } from '@/components/layout/Product/ProductRoot';
import FilterSidebarResponsive from '@/components/ui/search/FilterSidebar/FilterSidebarResponsive';
import EmptyState from '@/components/ui/feedback/EmptyState';
import PlanGrid from '@/components/ui/grids/PlanGrid';
import { plansPageData } from '@/data/route-groups/products/plans';
import { useProductList } from '@/hooks/useProductList';
import { usePlanActions } from '@/hooks/usePlanActions';

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

  const { selectPlan, learnMore, toggleWishlist } = usePlanActions();

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
          onSelectPlan={selectPlan}
          onLearnMore={learnMore}
          onWishlistToggle={toggleWishlist}
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
