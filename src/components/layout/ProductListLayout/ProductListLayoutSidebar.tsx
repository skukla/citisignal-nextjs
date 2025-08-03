'use client';

import FilterSidebar from '@/components/ui/FilterSidebar';
import type { FilterSection } from '@/components/ui/FilterSidebar/FilterSidebar.types';

export interface ProductListLayoutSidebarProps {
  filters: FilterSection[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void;
  onClearFilters: () => void;
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
}

/**
 * Sidebar section for ProductListLayout.
 * Handles both desktop sidebar and mobile overlay filters.
 */
export function ProductListLayoutSidebar({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
  showMobileFilters,
  setShowMobileFilters
}: ProductListLayoutSidebarProps) {
  return (
    <>
      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="bg-white w-80 h-full overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button 
                onClick={() => setShowMobileFilters(false)} 
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close filters"
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

      {/* Desktop Filters Sidebar */}
      <div className="hidden lg:block flex-shrink-0">
        <FilterSidebar 
          filters={filters}
          activeFilters={activeFilters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
        />
      </div>
    </>
  );
}