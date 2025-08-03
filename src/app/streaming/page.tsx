'use client';

import PageContainer from '@/components/layout/PageContainer';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';
import PageFooter from '@/components/layout/PageFooter';
import BreadcrumbSection from '@/components/ui/BreadcrumbSection';
import PageHeaderSection from '@/components/ui/PageHeaderSection';
import SearchAndSort from '@/components/ui/SearchAndSort';
import ResultsCount from '@/components/ui/ResultsCount';
import ProductGridWithEmpty from '@/components/ui/ProductGridWithEmpty';
import FilterSidebarResponsive from '@/components/ui/FilterSidebarResponsive';
import ProductCard from '@/components/ui/ProductCard';
import { streamingServices, streamingPageConfig } from '@/data/pages/streaming';
import { useProductList } from '@/hooks/useProductList';
import type { StreamingService } from '@/data/pages/streaming';

export default function StreamingPage() {
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
  } = useProductList({ products: streamingServices });

  // Page configuration
  const { filters, breadcrumbs, pageHeader, search, emptyState } = streamingPageConfig;

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
        total={streamingServices.length} 
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
            {filteredAndSortedProducts.map((service) => (
              <ProductCard.Root key={service.id} product={service as StreamingService}>
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