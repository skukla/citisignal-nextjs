'use client';

import Page from '@/components/layout/Page';
import Content from '@/components/layout/Content';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';
import Breadcrumb from '@/components/ui/layout/Breadcrumb';
import PageHeader from '@/components/ui/layout/PageHeader';
import SearchAndSort from '@/components/ui/search/SearchAndSort';
import ResultsCount from '@/components/ui/search/ResultsCount';
import FilterSidebarResponsive from '@/components/ui/search/FilterSidebar/FilterSidebarResponsive';
import EmptyState from '@/components/ui/feedback/EmptyState';
import ProductGrid from '@/components/ui/grids/ProductGrid';
import NewsletterSection from '@/components/sections/NewsletterSection';
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
    <Page background="gray">
      <Content>
        <Breadcrumb items={breadcrumbs} />
        
        <PageHeader 
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
          total={streamingPageData.products.length} 
          itemLabel={search.itemLabel} 
        />
        
        <TwoColumnLayout>
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
        </TwoColumnLayout>
      </Content>
      <NewsletterSection />
    </Page>
  );
}