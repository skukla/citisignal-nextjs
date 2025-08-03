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
import ProductCard from '@/components/ui/cards/ProductCard';
import { internetDealsPageData } from '@/data/pages/internet-deals';
import { useProductList } from '@/hooks/useProductList';
import type { InternetDeal } from '@/data/pages/internet-deals';

export default function InternetDealsPage() {
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
  } = useProductList({ products: internetDealsPageData.products });

  // Page configuration
  const { filters, breadcrumbs, pageHeader, search, emptyState } = internetDealsPageData;

  return (
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
        total={internetDealsPageData.products.length} 
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProducts.map((deal) => (
              <ProductCard.Root key={deal.id} product={deal as InternetDeal}>
                <ProductCard.Image />
                <ProductCard.Badges />
                <ProductCard.Info />
                <ProductCard.Price />
                <ProductCard.Actions />
              </ProductCard.Root>
            ))}
          </div>
        </ProductGridWithEmpty>
      </TwoColumnLayout>
      
      <PageFooter />
    </PageContainer>
  );
}