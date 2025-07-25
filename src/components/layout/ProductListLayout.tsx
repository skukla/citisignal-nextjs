'use client';

import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import Breadcrumb from '../ui/Breadcrumb';
import PageHeader from '../ui/PageHeader';
import SearchSortBar from '../ui/SearchSortBar';
import FilterSidebar from '../ui/FilterSidebar';
import EmptyState from '../ui/EmptyState';
import { SORT_OPTIONS } from '@/lib/constants';

interface FilterOption {
  id: string;
  name: string;
  count?: number;
}

interface FilterSection {
  title: string;
  key: string;
  options: FilterOption[];
  type: 'checkbox';
}

interface ProductListLayoutProps {
  title: string;
  description: string;
  icon: ElementType;
  breadcrumbItems: { name: string; href?: string }[];
  filters: FilterSection[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  activeFilters: Record<string, string[]>;
  onFilterChange: (key: string, value: string, checked: boolean) => void;
  onClearFilters: () => void;
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
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
  breadcrumbItems,
  filters,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  activeFilters,
  onFilterChange,
  onClearFilters,
  showMobileFilters,
  setShowMobileFilters,
  totalCount,
  filteredCount,
  emptyStateIcon,
  children,
  className
}: ProductListLayoutProps) {
  const hasResults = filteredCount > 0;

  return (
    <div className={twMerge('min-h-screen bg-gray-50', className)}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
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
          sortOptions={[...SORT_OPTIONS]}
          searchPlaceholder={`Search ${title.toLowerCase()}...`}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCount} of {totalCount} {title.toLowerCase()}
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filters Overlay */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
              <div className="bg-white w-80 h-full overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                <FilterSidebar
                  filters={filters}
                  activeFilters={activeFilters}
                  onFilterChange={onFilterChange}
                  onClearFilters={onClearFilters}
                />
              </div>
            </div>
          )}

          {/* Desktop Filters */}
          <div className="hidden lg:block flex-shrink-0">
            <FilterSidebar
              filters={filters}
              activeFilters={activeFilters}
              onFilterChange={onFilterChange}
              onClearFilters={onClearFilters}
            />
          </div>

          {/* Product Grid or Empty State */}
          <div className="flex-1">
            {hasResults ? (
              children
            ) : (
              <EmptyState
                icon={emptyStateIcon}
                title={`No ${title.toLowerCase()} found`}
                description="Try adjusting your search or filter criteria to find what you're looking for."
                actionLabel="Clear all filters"
                onAction={onClearFilters}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 