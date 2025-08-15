'use client';

import { ReactNode, useMemo } from 'react';
import { ProductPageContext, type PageData } from './ProductPageContext';
import { useProductCards } from '@/hooks/products/useProductCards';
import { useProductList } from '@/hooks/useProductList';
import type { BaseProduct } from '@/types/commerce';

interface ProductPageProviderProps {
  children: ReactNode;
  category?: string;
  pageData: PageData;
  limit?: number;
}

export function ProductPageProvider({ 
  children, 
  category,
  pageData,
  limit = 12 
}: ProductPageProviderProps) {
  // Fetch products with infinite loading
  const { 
    items: products, 
    loading, 
    error, 
    hasMoreItems: hasMore, 
    loadMore, 
    totalCount 
  } = useProductCards({
    filter: category ? { category } : undefined,
    limit
  });
  
  // Manage filtering, sorting, and search
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
  } = useProductList({ products: products as BaseProduct[] });

  const contextValue = useMemo(() => ({
    // Data
    products,
    loading,
    error,
    totalCount,
    hasMore,
    
    // Search/Filter/Sort
    searchQuery,
    sortBy,
    activeFilters,
    
    // Actions
    loadMore,
    setSearchQuery,
    setSortBy: handleSortChange,
    setFilter: handleFilterChange,
    clearFilters: handleClearFilters,
    
    // UI State
    showMobileFilters,
    setShowMobileFilters,
    
    // Computed
    filteredProducts: filteredAndSortedProducts,
    
    // Page Configuration
    pageData
  }), [
    products,
    loading,
    error,
    totalCount,
    hasMore,
    searchQuery,
    sortBy,
    activeFilters,
    loadMore,
    setSearchQuery,
    handleSortChange,
    handleFilterChange,
    handleClearFilters,
    showMobileFilters,
    setShowMobileFilters,
    filteredAndSortedProducts,
    pageData
  ]);

  return (
    <ProductPageContext.Provider value={contextValue}>
      {children}
    </ProductPageContext.Provider>
  );
}