'use client';

import { createContext, useContext } from 'react';
import type { BaseProduct } from '@/types/commerce';
import type { SortOption } from '@/lib/constants';
import type { FilterSection } from '@/components/ui/search/FilterSidebar/FilterSidebar.types';
import type { HeroIcon } from '@/types/hero-icons';
import type { Facet } from '@/hooks/products/useProductCards';

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export interface EmptyStateConfig {
  icon?: HeroIcon;
  title: string;
  description: string;
  actionLabel?: string;
}

export interface PageData {
  breadcrumbs: BreadcrumbItem[];
  pageHeader: {
    title: string;
    description: string;
    icon?: HeroIcon;
  };
  search: {
    placeholder: string;
    itemLabel?: string;
  };
  filters: FilterSection[];
  emptyState: EmptyStateConfig;
  loadingSkeletonCount?: number;
}

export interface ProductPageContextValue {
  // Data
  products: BaseProduct[];
  loading: boolean;
  error: Error | null;
  totalCount: number;
  hasMore: boolean;
  
  // Search/Filter/Sort
  searchQuery: string;
  sortBy: SortOption;
  activeFilters: Record<string, string[]>;
  
  // Actions
  loadMore: () => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: SortOption) => void;
  setFilter: (key: string, value: string, checked: boolean) => void;
  clearFilters: () => void;
  
  // UI State
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
  
  // Computed
  filteredProducts: BaseProduct[];
  
  // Page Configuration
  pageData: PageData;
  
  // Dynamic facets from Live Search
  facets?: Facet[];
}

const ProductPageContext = createContext<ProductPageContextValue | null>(null);

export function useProductPage() {
  const context = useContext(ProductPageContext);
  if (!context) {
    throw new Error('useProductPage must be used within ProductPageProvider');
  }
  return context;
}

export { ProductPageContext };