/**
 * Convenience hook that combines all product page contexts
 * Use this for components that need access to multiple contexts
 * For better performance, prefer using individual context hooks
 */

import { useProductData } from '../providers/ProductDataContext';
import { useProductFilters } from '../providers/ProductFilterContext';
import { useProductUI } from '../providers/ProductUIContext';

export function useProductPage() {
  const data = useProductData();
  const filters = useProductFilters();
  const ui = useProductUI();
  
  // Combine all contexts to match the old interface
  return {
    // From ProductDataContext
    products: data.products,
    loading: data.loading,
    error: data.error,
    totalCount: data.totalCount,
    hasMore: data.hasMore,
    facets: data.facets,
    loadMore: data.loadMore,
    filteredProducts: data.filteredProducts,
    
    // From ProductFilterContext
    searchQuery: filters.searchQuery,
    sortBy: filters.sortBy,
    activeFilters: filters.activeFilters,
    hasActiveFilters: filters.hasActiveFilters,
    filterCount: filters.filterCount,
    setSearchQuery: filters.setSearchQuery,
    setSortBy: filters.setSortBy,
    setFilter: filters.setFilter,
    clearFilters: filters.clearFilters,
    pageData: filters.pageData,
    
    // From ProductUIContext
    viewMode: ui.viewMode,
    setViewMode: ui.setViewMode,
    isTransitioning: ui.isTransitioning,
    showMobileFilters: ui.showMobileFilters,
    setShowMobileFilters: ui.setShowMobileFilters
  };
}