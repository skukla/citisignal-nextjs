'use client';

import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';
import PlanCard from '@/components/ui/PlanCard';
import FilterSidebar from '@/components/ui/FilterSidebar';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import SearchSortBar from '@/components/ui/SearchSortBar';
import { plans, planFilterOptions } from '@/data/plans';
import { SignalIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useProductList } from '@/hooks/useProductList';
import { SORT_OPTIONS } from '@/lib/constants';

export default function PlansPage() {
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    activeFilters,
    showMobileFilters,
    setShowMobileFilters,
    handleFilterChange,
    handleClearFilters,
    filteredAndSortedProducts
  } = useProductList({ products: plans });

  // Filter configuration
  const filters = [
    {
      title: 'Plan Type',
      key: 'type',
      options: planFilterOptions.type,
      type: 'checkbox' as const
    },
    {
      title: 'Price Range',
      key: 'price',
      options: planFilterOptions.price,
      type: 'checkbox' as const
    },
    {
      title: 'Data Amount',
      key: 'data',
      options: planFilterOptions.data,
      type: 'checkbox' as const
    },
    {
      title: 'Features',
      key: 'features',
      options: planFilterOptions.features,
      type: 'checkbox' as const
    }
  ];

  const breadcrumbItems = [
    { name: 'Shop', href: '/shop' },
    { name: 'Plans' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <PageHeader
          title="Wireless Plans"
          description="Choose the perfect wireless plan for your needs. From unlimited data to family plans, we have flexible options with no hidden fees and the reliability of our nationwide network."
          icon={SignalIcon}
        />

        <SearchSortBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          sortOptions={SORT_OPTIONS}
          searchPlaceholder="Search plans..."
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedProducts.length} of {plans.length} plans
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
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>
          )}

          {/* Desktop Filters */}
          <div className="hidden lg:block flex-shrink-0">
            <FilterSidebar
              filters={filters}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Plans Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onSelectPlan={(planId) => {
                    // TODO: Navigate to checkout with selected plan
                    console.log('Select plan:', planId);
                  }}
                  onLearnMore={(planId) => {
                    // TODO: Navigate to plan details page
                    console.log('Learn more about plan:', planId);
                  }}
                  onWishlistToggle={(planId, saved) => {
                    // TODO: Update wishlist state
                    console.log('Wishlist toggle:', planId, saved);
                  }}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bars3Icon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No plans found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria to find what you&apos;re looking for.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="text-white px-6 py-2 rounded-lg hover:opacity-90 transition-colors"
                  style={{ backgroundColor: '#8821f4' }}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <NewsletterSection />
      <Footer />
    </div>
  );
} 