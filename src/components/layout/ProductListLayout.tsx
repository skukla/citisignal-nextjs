'use client';

import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import SearchSortBar from '@/components/ui/SearchSortBar';
import FilterSidebar from '@/components/ui/FilterSidebar';
import EmptyState from '@/components/ui/EmptyState';
import { SORT_OPTIONS } from '@/lib/constants';
import useBreadcrumbs from '@/hooks/useBreadcrumbs';
import { BREADCRUMB_LABELS } from '@/data/breadcrumbs';

interface FilterOption {
  id: string;
  name: string;
  count?: number;
}

interface FilterSection {
  title: string;
  key: string;
  options: FilterOption[];
  type: 'checkbox' | 'radio';
}

interface ProductListLayoutProps {
  title: string;
  description: string;
  icon: ElementType;
  filters: FilterSection[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void;
  onClearFilters: () => void;
  totalCount: number;
  filteredCount: number;
  emptyStateIcon: ElementType;
  children: React.ReactNode;
  className?: string;
}

export default function ProductListLayout({
  title,
  description,
  icon,
  filters,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  activeFilters,
  onFilterChange,
  onClearFilters,
  totalCount,
  filteredCount,
  emptyStateIcon,
  children,
  className
}: ProductListLayoutProps) {
  const breadcrumbs = useBreadcrumbs({
    labels: BREADCRUMB_LABELS
  });

  const hasResults = filteredCount > 0;

  return (
    <div className={twMerge('min-h-screen bg-gray-50', className)}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbs} />
        </div>

        <PageHeader
          title={title}
          description={description}
          icon={icon}
        />

        <SearchSortBar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          sortBy={sortBy}
          onSortChange={onSortChange}
          sortOptions={SORT_OPTIONS}
          searchPlaceholder={`Search ${title.toLowerCase()}...`}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCount} of {totalCount} {title.toLowerCase()}
          </p>
        </div>

        {/* Main Content */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Filters */}
          <div className="hidden lg:block lg:col-span-3">
            <FilterSidebar
              filters={filters}
              activeFilters={activeFilters}
              onFilterChange={onFilterChange}
              onClearFilters={onClearFilters}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-9">
            {hasResults ? (
              children
            ) : (
              <EmptyState
                icon={emptyStateIcon}
                title="No results found"
                description={`We couldn't find any ${title.toLowerCase()} matching your criteria. Try adjusting your filters or search terms.`}
                actionLabel="Clear filters"
                onAction={onClearFilters}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 