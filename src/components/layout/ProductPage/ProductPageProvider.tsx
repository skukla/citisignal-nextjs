'use client';

import { ReactNode, useMemo, useState, useEffect } from 'react';
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
  // Track if user has interacted (searched or filtered)
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  
  // Fetch products with infinite loading and facets when user has interacted
  const { 
    items: products, 
    loading, 
    error, 
    hasMoreItems: hasMore, 
    loadMore, 
    totalCount,
    facets
  } = useProductCards({
    filter: {
      ...(category ? { category } : {})
    },
    limit,
    facets: hasUserInteracted // Request facets after user interaction
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

  // Track user interaction for facets
  useEffect(() => {
    // Enable facets if user has searched or filtered
    const hasSearched = searchQuery && searchQuery.trim() !== '';
    const hasFiltered = Object.keys(activeFilters).length > 0;
    
    if ((hasSearched || hasFiltered) && !hasUserInteracted) {
      setHasUserInteracted(true);
    }
  }, [searchQuery, activeFilters, hasUserInteracted]);


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
    pageData,
    
    // Dynamic facets from Live Search
    facets: facets || undefined
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
    pageData,
    facets
  ]);

  return (
    <ProductPageContext.Provider value={contextValue}>
      {children}
    </ProductPageContext.Provider>
  );
}