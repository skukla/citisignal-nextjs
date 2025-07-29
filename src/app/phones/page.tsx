'use client';

import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';
import ProductCard from '@/components/ui/ProductCard';
import FilterSidebar from '@/components/ui/FilterSidebar';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import SearchSortBar from '@/components/ui/SearchSortBar';
import { phones, phoneFilterOptions } from '@/data/phones';
import { DevicePhoneMobileIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useProductList } from '@/hooks/useProductList';
import { SORT_OPTIONS } from '@/lib/constants';

export default function PhonesPage() {
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
  } = useProductList({ products: phones });

  // Filter configuration
  const filters = [
    {
      title: 'Manufacturer',
      key: 'manufacturer',
      options: phoneFilterOptions.manufacturer,
      type: 'checkbox' as const
    },
    {
      title: 'Memory',
      key: 'memory',
      options: phoneFilterOptions.memory,
      type: 'checkbox' as const
    },
    {
      title: 'Price Range',
      key: 'price',
      options: phoneFilterOptions.price,
      type: 'checkbox' as const
    },
    {
      title: 'Colors',
      key: 'colors',
      options: phoneFilterOptions.colors,
      type: 'checkbox' as const
    },
    {
      title: '5G Features',
      key: 'features',
      options: phoneFilterOptions.features,
      type: 'checkbox' as const
    }
  ];

  const breadcrumbItems = [
    { name: 'Shop', href: '/shop' },
    { name: 'Phones' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <PageHeader
          title="Phones"
          description="Find your perfect phone from our wide selection of the latest smartphones. From flagship models to budget-friendly options, we have the right device for you."
          icon={DevicePhoneMobileIcon}
        />

        <SearchSortBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          sortOptions={SORT_OPTIONS}
          searchPlaceholder="Search phones..."
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedProducts.length} of {phones.length} phones
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
            {filteredAndSortedProducts.length > 0 ? (
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
                    features={product.memory}
                    colors={product.available_colors}
                    inStock={product.stock_status === 'IN_STOCK'}
                    isNew={product.isNew}
                    isSale={product.original_price ? product.original_price > product.price : false}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bars3Icon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No phones found</h3>
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

            {/* Rich Content Sections - Only show when we have products */}
            {filteredAndSortedProducts.length > 0 && (
              <div className="space-y-12 mt-12">
                {/* Featured Tech Reviews */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Tech Reviews</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Review Card 1 */}
                    <div className="group">
                      <div className="aspect-video bg-purple-50 rounded-lg mb-4 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                          <span className="text-purple-600 font-medium">Review Video</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                        iPhone 15 Pro vs Galaxy S24 Ultra: The Ultimate Camera Showdown
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        We put these flagship phones head-to-head in real-world photography tests. See which one comes out on top in our detailed comparison.
                      </p>
                    </div>
                    {/* Review Card 2 */}
                    <div className="group">
                      <div className="aspect-video bg-purple-50 rounded-lg mb-4 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                          <span className="text-purple-600 font-medium">Review Video</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                        The Best Budget Phones of 2024
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        Amazing phones don&apos;t have to break the bank. Discover our top picks for phones under $500 that deliver incredible value.
                      </p>
                    </div>
                    {/* Review Card 3 */}
                    <div className="group">
                      <div className="aspect-video bg-purple-50 rounded-lg mb-4 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                          <span className="text-purple-600 font-medium">Review Video</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                        5G Speed Test: Real World Results
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        We tested 5G speeds across different phones and locations. See which devices offer the fastest connectivity in your area.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Buying Guides */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Phone Buying Guides</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Guide 1 */}
                    <div className="flex gap-6 items-start group">
                      <div className="w-20 h-20 rounded-lg bg-purple-50 flex-shrink-0 flex items-center justify-center">
                        <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                          How to Choose Your Perfect Phone
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          From screen size to battery life, learn what features matter most for your needs.
                        </p>
                        <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-700">
                          Read More →
                        </a>
                      </div>
                    </div>
                    {/* Guide 2 */}
                    <div className="flex gap-6 items-start group">
                      <div className="w-20 h-20 rounded-lg bg-purple-50 flex-shrink-0 flex items-center justify-center">
                        <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                          Understanding Phone Financing
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          Compare payment plans, trade-in options, and find the best way to finance your new phone.
                        </p>
                        <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-700">
                          Read More →
                        </a>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Tips & Tricks */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Tips & Tricks</h2>
                    <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-700">
                      View All Tips →
                    </a>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="group cursor-pointer">
                      <div className="text-sm font-medium text-purple-600 mb-2">Photography</div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                        Master Your Phone&apos;s Camera
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Pro tips for taking stunning photos with any smartphone camera.
                      </p>
                    </div>
                    <div className="group cursor-pointer">
                      <div className="text-sm font-medium text-purple-600 mb-2">Battery Life</div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                        Extend Your Battery Life
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Simple tricks to make your phone&apos;s battery last all day and beyond.
                      </p>
                    </div>
                    <div className="group cursor-pointer">
                      <div className="text-sm font-medium text-purple-600 mb-2">Security</div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                        Keep Your Phone Secure
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Essential security settings and practices for protecting your device.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Related Products */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Essential Accessories</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="group">
                      <div className="aspect-square bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors">Fast Chargers</h3>
                      <p className="text-sm text-gray-600">From $29.99</p>
                    </div>
                    <div className="group">
                      <div className="aspect-square bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors">Cases & Protection</h3>
                      <p className="text-sm text-gray-600">From $19.99</p>
                    </div>
                    <div className="group">
                      <div className="aspect-square bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors">Audio Accessories</h3>
                      <p className="text-sm text-gray-600">From $24.99</p>
                    </div>
                    <div className="group">
                      <div className="aspect-square bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors">View All</h3>
                      <p className="text-sm text-gray-600">Accessories</p>
                    </div>
                  </div>
                </section>
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