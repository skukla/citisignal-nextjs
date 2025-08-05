'use client';

import PageContainer from '@/components/layout/PageContainer';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';
import PageFooter from '@/components/layout/PageFooter';
import BreadcrumbSection from '@/components/ui/layout/BreadcrumbSection';
import PageHeaderSection from '@/components/ui/layout/PageHeaderSection';
import SearchAndSort from '@/components/ui/search/SearchAndSort';
import ResultsCount from '@/components/ui/search/ResultsCount';
import ProductGridWithEmpty from '@/components/ui/grids/ProductGridWithEmpty';
import FilterSidebarResponsive from '@/components/ui/search/FilterSidebar/FilterSidebarResponsive';
import PlanGrid from '@/components/ui/grids/PlanGrid';
import { plansPageData } from '@/data/pages/plans';
import { useProductList } from '@/hooks/useProductList';

export default function PlansPage() {
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
  } = useProductList({ products: plansPageData.products });

  // Page configuration  
  const { filters, breadcrumbs, pageHeader, search, emptyState } = plansPageData;

  return (
    <div className="min-h-screen">
      <PageContainer background="gray">
        <BreadcrumbSection items={breadcrumbs} />
        
        <PageHeaderSection 
          title={pageHeader.title}
          description={pageHeader.description}
          icon={pageHeader.icon}
        />
        
        <SearchAndSort 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchPlaceholder={search.placeholder}
        />
        
        <ResultsCount 
          showing={filteredAndSortedProducts.length}
          total={plansPageData.products.length} 
          itemLabel={search.itemLabel} 
        />
        
        <TwoColumnLayout 
          sidebar={
            <FilterSidebarResponsive 
              filters={filters}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              showMobileFilters={showMobileFilters}
              setShowMobileFilters={setShowMobileFilters}
            />
          }
        >
          <ProductGridWithEmpty 
            hasResults={filteredAndSortedProducts.length > 0}
            emptyState={{
              icon: emptyState.icon,
              title: emptyState.title,
              description: emptyState.description,
              actionLabel: emptyState.actionLabel,
              onAction: handleClearFilters
            }}
          >
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
          </ProductGridWithEmpty>
        </TwoColumnLayout>
      </PageContainer>
      <PageFooter />
    </div>
  );
}