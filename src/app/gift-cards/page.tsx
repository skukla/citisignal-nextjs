'use client';

import Page from '@/components/layout/Page';
import Content from '@/components/layout/Content';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';
import Breadcrumb from '@/components/ui/layout/Breadcrumb';
import PageHeader from '@/components/ui/layout/PageHeader';
import SearchAndSort from '@/components/ui/search/SearchAndSort';
import ResultsCount from '@/components/ui/search/ResultsCount';
import EmptyState from '@/components/ui/feedback/EmptyState';
import FilterSidebarResponsive from '@/components/ui/search/FilterSidebar/FilterSidebarResponsive';
import ProductGrid from '@/components/ui/grids/ProductGrid';
import NewsletterSection from '@/components/sections/NewsletterSection';
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
          total={giftCardsPageData.products.length} 
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
              products={filteredAndSortedProducts as GiftCard[]}
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