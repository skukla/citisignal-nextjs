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

export interface ProductPageWrapperProps {
  // Page metadata
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description: string;
  
  // State flags
  loading: boolean;
  error: any;
  
  // Data
  products: any[];
  totalCount?: number;
  
  // Search props (optional when loading/error)
  searchProps?: {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    sortBy: string;
    onSortChange: (value: string) => void;
    placeholder: string;
  };
  
  // Content
  children: ReactNode;
  
  // Customization
  loadingSkeletonCount?: number;
  errorTitle?: string;
  errorDescription?: string;
  onRetry?: () => void;
}