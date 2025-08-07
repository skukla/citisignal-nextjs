import { ReactNode } from 'react';

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export interface ProductRootProps {
  children: ReactNode;
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description?: string;
  searchProps: {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    sortBy: 'popular' | 'price-low' | 'price-high' | 'newest';
    onSortChange: (value: string) => void;
    placeholder?: string;
  };
  resultsCount: number;
  itemLabel?: string;
}