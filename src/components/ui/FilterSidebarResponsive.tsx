'use client';

import FilterSidebar from '@/components/ui/FilterSidebar';
import type { FilterSection } from '@/components/ui/FilterSidebar/FilterSidebar.types';

export interface FilterSidebarResponsiveProps {
  filters: FilterSection[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void;
  onClearFilters: () => void;
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
}

/**
 * Responsive FilterSidebar that handles both mobile and desktop experiences.
 * 
 * Mobile: Full-screen overlay with backdrop and close button
 * Desktop: Clean persistent sidebar
 * 
 * This component encapsulates both responsive states since they're always used together
 * on product listing pages, avoiding prop duplication while maintaining clear UX separation.
 * 
 * @example
 * <FilterSidebarResponsive 
 *   filters={filters}
 *   activeFilters={activeFilters}
 *   onFilterChange={handleFilterChange}
 *   onClearFilters={handleClearFilters}
 *   showMobileFilters={showMobileFilters}
 *   setShowMobileFilters={setShowMobileFilters}
 * />
 */
export default function FilterSidebarResponsive({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
  showMobileFilters,
  setShowMobileFilters
}: FilterSidebarResponsiveProps) {
  return (
    <>
      {/* Mobile: Full-screen overlay experience */}
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

      {/* Desktop: Clean persistent sidebar experience */}
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