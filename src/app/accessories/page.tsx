'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';
import ProductCard from '@/components/ui/ProductCard';
import FilterSidebar from '@/components/ui/FilterSidebar';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import SearchSortBar from '@/components/ui/SearchSortBar';
import { accessories, accessoryFilterOptions } from '@/data/accessories';
import { Square3Stack3DIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useProductList } from '@/hooks/useProductList';
import { SORT_OPTIONS } from '@/lib/constants';

export default function AccessoriesPage() {
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
  } = useProductList({ products: accessories });

  // Filter configuration
  const filters = [
    {
      title: 'Category',
      key: 'subcategory',
      options: accessoryFilterOptions.manufacturer,
      type: 'checkbox' as const
    },
    {
      title: 'Brand',
      key: 'brand',
      options: accessoryFilterOptions.manufacturer,
      type: 'checkbox' as const
    },
    {
      title: 'Price Range',
      key: 'price',
      options: accessoryFilterOptions.price,
      type: 'checkbox' as const
    },
    {
      title: 'Compatibility',
      key: 'compatibility',
      options: accessoryFilterOptions.compatibility,
      type: 'checkbox' as const
    }
  ];

  const breadcrumbItems = [
    { name: 'Shop', href: '/shop' },
    { name: 'Accessories' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <PageHeader
          title="Accessories"
          description="Enhance your devices with our wide range of accessories. From cases and chargers to headphones and more, find everything you need to get the most out of your technology."
          icon={Square3Stack3DIcon}
        />

        <SearchSortBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          sortOptions={SORT_OPTIONS}
          searchPlaceholder="Search accessories..."
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedProducts.length} of {accessories.length} accessories
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

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard
                  key={product.sku}
                  id={product.id}
                  name={product.name}
                  brand={product.manufacturer}
                  price={product.price}
                  originalPrice={product.original_price}
                  image={product.media_gallery?.[0]?.url || ''}
                  category={product.category}
                  features={[`Compatible with: ${product.compatibility.join(', ')}`]}
                  colors={product.available_colors}
                  inStock={product.stock_status === 'IN_STOCK'}
                  isNew={product.isNew}
                  isSale={product.original_price ? product.original_price > product.price : false}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bars3Icon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
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

            {/* Load More Button (if needed for pagination) */}
            {filteredAndSortedProducts.length > 0 && filteredAndSortedProducts.length >= 12 && (
              <div className="text-center mt-12">
                <button className="bg-gray-100 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  Load More Products
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