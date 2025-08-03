'use client';

import { ReactNode } from 'react';
import { HeroIcon } from '@/types/hero-icons';
import PageContainer from '@/components/layout/PageContainer';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';
import PageFooter from '@/components/layout/PageFooter';
import BreadcrumbSection from '@/components/ui/BreadcrumbSection';
import PageHeaderSection from '@/components/ui/PageHeaderSection';
import SearchAndSort from '@/components/ui/SearchAndSort';
import ResultsCount from '@/components/ui/ResultsCount';
import ProductGridWithEmpty from '@/components/ui/ProductGridWithEmpty';
import FilterSidebarResponsive from '@/components/ui/FilterSidebarResponsive';
import type { FilterSection } from '@/components/ui/FilterSidebar/FilterSidebar.types';
import type { SortOption } from '@/lib/constants';

export interface StandardProductLayoutProps {
  // Page configuration
  breadcrumbs: Array<{ name: string; href?: string }>;
  pageHeader: {
    title: string;
    description: string;
    icon: HeroIcon;
  };
  search: {
    placeholder: string;
    itemLabel: string;
  };
  emptyState: {
    title: string;
    description: string;
    actionLabel?: string;
  };
  filters: FilterSection[];
  
  // Product data and state
  products: unknown[];
  filteredProducts: unknown[];
  
  // Search and sort state
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
  
  // Filter state
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void;
  onClearFilters: () => void;
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
  
  // Product grid rendering
  renderProduct: (product: unknown, index: number) => ReactNode;
  gridColumns?: { sm?: number; md?: number; lg?: number; xl?: number };
}

/**
 * Standard layout for product listing pages.
 * Provides consistent structure: breadcrumbs, header, search/sort, filters, and product grid.
 * Used for: accessories, watches, streaming, gift-cards, internet-deals.
 * 
 * @example
 * <StandardProductLayout
 *   breadcrumbs={breadcrumbs}
 *   pageHeader={pageHeader}
 *   search={search}
 *   emptyState={emptyState}
 *   filters={filters}
 *   products={products}
 *   filteredProducts={filteredProducts}
 *   // ... state props
 *   renderProduct={(product) => <ProductCard key={product.id} product={product} />}
 * />
 */
export default function StandardProductLayout({
  breadcrumbs,
  pageHeader,
  search,
  emptyState,
  filters,
  products,
  filteredProducts,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  activeFilters,
  onFilterChange,
  onClearFilters,
  showMobileFilters,
  setShowMobileFilters,
  renderProduct,
  gridColumns = { sm: 1, md: 2, lg: 3 }
}: StandardProductLayoutProps) {
  return (
    <>
      <PageContainer background="gray">
        <BreadcrumbSection items={breadcrumbs} />
        
        <PageHeaderSection 
          title={pageHeader.title}
          description={pageHeader.description}
          icon={pageHeader.icon}
        />
        
        <SearchAndSort 
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          sortBy={sortBy}
          onSortChange={onSortChange}
          searchPlaceholder={search.placeholder}
        />
        
        <ResultsCount 
          showing={filteredProducts.length} 
          total={products.length} 
          itemLabel={search.itemLabel} 
        />
        
        <TwoColumnLayout 
          sidebar={
            <FilterSidebarResponsive
              filters={filters}
              activeFilters={activeFilters}
              onFilterChange={onFilterChange}
              onClearFilters={onClearFilters}
              showMobileFilters={showMobileFilters}
              setShowMobileFilters={setShowMobileFilters}
            />
          }
        >
          <ProductGridWithEmpty
            hasResults={filteredProducts.length > 0}
            emptyState={{
              title: emptyState.title,
              description: emptyState.description,
              actionLabel: emptyState.actionLabel,
              onAction: onClearFilters
            }}
          >
            <div 
              className={`grid gap-6 ${
                gridColumns?.sm === 1 ? 'grid-cols-1' : 'grid-cols-1'
              } ${
                gridColumns?.md === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2'
              } ${
                gridColumns?.lg === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-3'
              } ${
                gridColumns?.xl ? `xl:grid-cols-${gridColumns.xl}` : ''
              }`}
            >
              {filteredProducts.map((product, index) => renderProduct(product, index))}
            </div>
          </ProductGridWithEmpty>
        </TwoColumnLayout>
      </PageContainer>
      
      <PageFooter />
    </>
  );
}