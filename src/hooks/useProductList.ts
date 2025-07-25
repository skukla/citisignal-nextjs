'use client';

import { useState, useMemo } from 'react';
import { SortOption } from '@/lib/constants';

interface Product {
  id: string;
  name: string;
  price: number;
  manufacturer?: string;
  memory?: string[];
  available_colors?: { name: string; hex: string; }[];
  features?: string[];
  isNew?: boolean;
  review_count?: number;
  sku?: string;
  original_price?: number;
  media_gallery?: { url: string; }[];
  category?: string;
  stock_status?: string;
}

interface UseProductListProps<T extends Product> {
  products: T[];
  initialSort?: SortOption;
}

interface UseProductListReturn<T> {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: SortOption;
  handleSortChange: (value: string) => void;
  activeFilters: Record<string, string[]>;
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
  handleFilterChange: (filterKey: string, value: string, checked: boolean) => void;
  handleClearFilters: () => void;
  filteredAndSortedProducts: T[];
}

export function useProductList<T extends Product>({ 
  products,
  initialSort = 'popular'
}: UseProductListProps<T>): UseProductListReturn<T> {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
  };

  const handleFilterChange = (filterKey: string, value: string, checked: boolean) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (checked) {
        newFilters[filterKey] = [...(newFilters[filterKey] || []), value];
      } else {
        newFilters[filterKey] = (newFilters[filterKey] || []).filter(v => v !== value);
        if (newFilters[filterKey].length === 0) {
          delete newFilters[filterKey];
        }
      }
      return newFilters;
    });
  };

  const handleClearFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
  };

  const filteredAndSortedProducts = useMemo(() => {
    // First filter by search
    let filtered = products.filter(product => {
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });

    // Then filter by active filters
    filtered = filtered.filter(product => {
      return Object.entries(activeFilters).every(([key, values]) => {
        switch (key) {
          case 'manufacturer':
            return values.includes(product.manufacturer || '');
          case 'memory':
            return values.some(value => product.memory?.includes(value));
          case 'colors':
            return values.some(value => product.available_colors?.some(color => color.name === value));
          case 'features':
            return values.some(value => product.features?.includes(value));
          default:
            return true;
        }
      });
    });

    // Then sort
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return ((b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        default: // popular
          return ((b.review_count || 0) - (a.review_count || 0));
      }
    });
  }, [products, searchQuery, sortBy, activeFilters]);

  return {
    searchQuery,
    setSearchQuery,
    sortBy,
    handleSortChange,
    activeFilters,
    showMobileFilters,
    setShowMobileFilters,
    handleFilterChange,
    handleClearFilters,
    filteredAndSortedProducts,
  };
} 