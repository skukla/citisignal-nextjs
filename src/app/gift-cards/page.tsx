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
import ProductGrid from '@/components/ui/grids/ProductGrid';
import { giftCardsPageData } from '@/data/pages/gift-cards';
import { useProductList } from '@/hooks/useProductList';
import type { GiftCard } from '@/data/pages/gift-cards';

export default function GiftCardsPage() {
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
  } = useProductList({ products: giftCardsPageData.products });

  // Page configuration
  const { filters, breadcrumbs, pageHeader, search, emptyState } = giftCardsPageData;

  return (
    <PageContainer>
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
          onSortChange={handleSortChange}
          searchPlaceholder={search.placeholder}
        />
        
        <ResultsCount 
          showing={filteredAndSortedProducts.length} 
          total={giftCardsPageData.products.length} 
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
            <ProductGrid 
              products={filteredAndSortedProducts as GiftCard[]}
              columns={{ sm: 1, md: 2, lg: 3 }}
              gap="lg"
            />
          </ProductGridWithEmpty>
        </TwoColumnLayout>
      </PageContainer>
      <PageFooter />
    </PageContainer>
  );
}