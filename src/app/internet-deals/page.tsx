'use client';

import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';
import ProductGrid from '@/components/ui/ProductGrid';
import FilterSidebar from '@/components/ui/FilterSidebar';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import SearchSortBar from '@/components/ui/SearchSortBar';
import { internetDeals, internetDealsFilterOptions, internetDealsPageConfig } from '@/data/pages/internet-deals';
import { WifiIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useProductList } from '@/hooks/useProductList';
import { SORT_OPTIONS } from '@/lib/constants';

export default function InternetDealsPage() {
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
  } = useProductList({ products: internetDeals });

  const filters = [
    { title: 'Connection Type', key: 'type', options: internetDealsFilterOptions.type, type: 'checkbox' as const },
    { title: 'Speed Range', key: 'speed', options: internetDealsFilterOptions.speed, type: 'checkbox' as const },
    { title: 'Price Range', key: 'price', options: internetDealsFilterOptions.price, type: 'checkbox' as const },
    { title: 'Contract Length', key: 'contractLength', options: internetDealsFilterOptions.contract_length, type: 'checkbox' as const }
  ];

  const breadcrumbItems = [{ name: 'Shop', href: '/shop' }, { name: 'Internet Deals' }];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <PageHeader
          title="Internet Deals"
          description="Get connected with high-speed internet from CitiSignal. From fiber to 5G home internet, find the perfect connection for your home or business with competitive pricing and reliable service."
          icon={WifiIcon}
        />

        <SearchSortBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          sortOptions={SORT_OPTIONS}
          searchPlaceholder="Search internet plans..."
        />

        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedProducts.length} of {internetDeals.length} internet plans
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
              <div className="bg-white w-80 h-full overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button onClick={() => setShowMobileFilters(false)} className="text-gray-500 hover:text-gray-700">×</button>
                </div>
                <FilterSidebar filters={filters} activeFilters={activeFilters} onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
              </div>
            </div>
          )}

          <div className="hidden lg:block flex-shrink-0">
            <FilterSidebar filters={filters} activeFilters={activeFilters} onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
          </div>

          <div className="flex-1">
            <ProductGrid 
              products={filteredAndSortedProducts}
              columns={{ sm: 1, md: 2, lg: 3 }}
              gap="md"
            />

            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bars3Icon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No internet plans found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria.</p>
                <button onClick={handleClearFilters} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
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