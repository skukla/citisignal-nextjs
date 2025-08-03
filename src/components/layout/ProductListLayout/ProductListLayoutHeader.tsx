'use client';


import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import SearchSortBar from '@/components/ui/SearchSortBar';
import { SORT_OPTIONS, type SortOption } from '@/lib/constants';
import type { HeroIcon } from '@/types/hero-icons';

export interface ProductListLayoutHeaderProps {
  // Breadcrumb
  breadcrumbItems?: Array<{ name: string; href?: string }>;
  
  // Page Header
  title: string;
  description?: string;
  icon: HeroIcon;
  
  // Search & Sort
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  sortBy?: SortOption;
  onSortChange?: (sortBy: SortOption) => void;
  searchPlaceholder?: string;
  
  // Results count
  resultCount?: number;
  totalCount?: number;
  itemLabel?: string;
}

/**
 * Header section for ProductListLayout.
 * Handles breadcrumbs, page header, search/sort, and results count.
 */
export function ProductListLayoutHeader({
  breadcrumbItems,
  title,
  description,
  icon,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  searchPlaceholder = 'Search...',
  resultCount,
  totalCount,
  itemLabel = 'items'
}: ProductListLayoutHeaderProps) {
  return (
    <Container>
      {/* Breadcrumb */}
      {breadcrumbItems && (
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title={title}
        description={description}
        icon={icon}
      />

      {/* Search & Sort */}
      {(searchQuery !== undefined || sortBy !== undefined) && (
        <SearchSortBar
          searchQuery={searchQuery || ''}
          onSearchChange={onSearchChange || (() => {})}
          sortBy={sortBy || 'popular'}
          onSortChange={onSortChange || (() => {})}
          sortOptions={SORT_OPTIONS}
          searchPlaceholder={searchPlaceholder}
        />
      )}

      {/* Results Count */}
      {(resultCount !== undefined && totalCount !== undefined) && (
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {resultCount} of {totalCount} {itemLabel}
          </p>
        </div>
      )}
    </Container>
  );
}