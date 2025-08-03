'use client';

import { ProductListLayoutRoot } from './ProductListLayoutRoot';
import { ProductListLayoutHeader } from './ProductListLayoutHeader';
import { ProductListLayoutContent } from './ProductListLayoutContent';
import { ProductListLayoutSidebar } from './ProductListLayoutSidebar';
import { ProductListLayoutGrid } from './ProductListLayoutGrid';
import { ProductListLayoutFooter } from './ProductListLayoutFooter';
import type { ProductListLayoutHeaderProps } from './ProductListLayoutHeader';
import type { ProductListLayoutSidebarProps } from './ProductListLayoutSidebar';
import type { ProductListLayoutGridProps } from './ProductListLayoutGrid';

export interface StandardProductListLayoutProps extends 
  ProductListLayoutHeaderProps,
  Pick<ProductListLayoutSidebarProps, 'filters' | 'activeFilters' | 'onFilterChange' | 'onClearFilters' | 'showMobileFilters' | 'setShowMobileFilters'>,
  Pick<ProductListLayoutGridProps, 'children' | 'emptyState'> {
  hasResults: boolean;
}

/**
 * Standard ProductListLayout component with default structure.
 * Uses ProductListLayout compound components internally but provides simple usage.
 * 
 * For custom layouts, use the ProductListLayout compound components directly.
 */
export function StandardProductListLayout({
  // Header props
  breadcrumbItems,
  title,
  description,
  icon,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  searchPlaceholder,
  resultCount,
  totalCount,
  itemLabel,
  
  // Sidebar props
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
  showMobileFilters,
  setShowMobileFilters,
  
  // Grid props
  children,
  hasResults,
  emptyState
}: StandardProductListLayoutProps) {
  return (
    <ProductListLayoutRoot>
      <ProductListLayoutHeader
        breadcrumbItems={breadcrumbItems}
        title={title}
        description={description}
        icon={icon}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        sortBy={sortBy}
        onSortChange={onSortChange}
        searchPlaceholder={searchPlaceholder}
        resultCount={resultCount}
        totalCount={totalCount}
        itemLabel={itemLabel}
      />
      
      <ProductListLayoutContent>
        <ProductListLayoutSidebar
          filters={filters}
          activeFilters={activeFilters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
          showMobileFilters={showMobileFilters}
          setShowMobileFilters={setShowMobileFilters}
        />
        
        <ProductListLayoutGrid
          hasResults={hasResults}
          emptyState={emptyState}
        >
          {children}
        </ProductListLayoutGrid>
      </ProductListLayoutContent>
      
      <ProductListLayoutFooter />
    </ProductListLayoutRoot>
  );
}