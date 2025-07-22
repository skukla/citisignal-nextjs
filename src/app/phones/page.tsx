'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';
import ProductCard from '@/components/ui/ProductCard';
import FilterSidebar from '@/components/ui/FilterSidebar';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { phones, phoneFilterOptions } from '@/data/phones';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, Bars3Icon } from '@heroicons/react/24/outline';

type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating' | 'newest';

export default function PhonesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter configuration
  const filters = [
    {
      title: 'Brand',
      key: 'brand',
      options: phoneFilterOptions.brand,
      type: 'checkbox' as const
    },
    {
      title: 'Operating System',
      key: 'os',
      options: phoneFilterOptions.os,
      type: 'checkbox' as const
    },
    {
      title: 'Storage',
      key: 'storage',
      options: phoneFilterOptions.storage,
      type: 'checkbox' as const
    },
    {
      title: 'Price Range',
      key: 'price',
      options: phoneFilterOptions.price,
      type: 'checkbox' as const
    },
    {
      title: 'Features',
      key: 'features',
      options: phoneFilterOptions.features,
      type: 'checkbox' as const
    }
  ];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = phones.filter(product => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Brand filter
      if (activeFilters.brand?.length > 0) {
        if (!activeFilters.brand.includes(product.brand.toLowerCase())) {
          return false;
        }
      }

      // OS filter
      if (activeFilters.os?.length > 0) {
        if (!activeFilters.os.includes(product.os.toLowerCase())) {
          return false;
        }
      }

      // Storage filter
      if (activeFilters.storage?.length > 0) {
        const hasStorage = activeFilters.storage.some(storage => {
          const storageAmount = storage.replace('gb', '');
          return product.storage.some(s => s.toLowerCase().includes(storageAmount));
        });
        if (!hasStorage) return false;
      }

      // Price filter
      if (activeFilters.price?.length > 0) {
        const priceInRange = activeFilters.price.some(range => {
          switch (range) {
            case 'under-700':
              return product.price < 700;
            case '700-1000':
              return product.price >= 700 && product.price < 1000;
            case 'over-1000':
              return product.price >= 1000;
            default:
              return false;
          }
        });
        if (!priceInRange) return false;
      }

      // Features filter
      if (activeFilters.features?.length > 0) {
        const hasFeature = activeFilters.features.some(feature => {
          switch (feature) {
            case '5g':
              return product.features.some(f => f.toLowerCase().includes('5g'));
            case 'wireless-charging':
              return true; // Assume most modern phones have wireless charging
            case 'face-id':
              return product.brand === 'Apple';
            case 'fast-charging':
              return true; // Assume most modern phones have fast charging
            default:
              return false;
          }
        });
        if (!hasFeature) return false;
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.isNew ? 1 : -1;
        default: // popular
          return b.reviews - a.reviews;
      }
    });

    return filtered;
  }, [searchQuery, activeFilters, sortBy]);

  const handleFilterChange = (filterKey: string, value: string, checked: boolean) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (checked) {
        newFilters[filterKey] = [...(newFilters[filterKey] || []), value];
      } else {
        newFilters[filterKey] = (newFilters[filterKey] || []).filter(v => v !== value);
        if (newFilters[filterKey].length === 0) {
          delete newFilters[filterKey];
        }
      }
      return newFilters;
    });
  };

  const handleClearFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
  };

  const breadcrumbItems = [
    { name: 'Shop', href: '/shop' },
    { name: 'Phones' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Phones</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Discover the latest smartphones from top brands. From flagship iPhones to powerful Android devices, 
            find the perfect phone with our flexible payment options and exclusive deals.
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search phones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg bg-white shadow-sm focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 focus:border-purple-500 focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none w-48 px-4 pr-10 py-3 border-2 border-gray-300 rounded-lg bg-white shadow-sm focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 focus:border-purple-500 focus:outline-none transition-all duration-200 text-gray-900 cursor-pointer"
              >
                <option value="popular" className="text-gray-900">Most Popular</option>
                <option value="price-low" className="text-gray-900">Price: Low to High</option>
                <option value="price-high" className="text-gray-900">Price: High to Low</option>
                <option value="rating" className="text-gray-900">Highest Rated</option>
                <option value="newest" className="text-gray-900">Newest</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-lg bg-white shadow-sm hover:bg-gray-50 hover:border-purple-300 transition-all duration-200 text-gray-900"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  brand={product.brand}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  rating={product.rating}
                  reviews={product.reviews}
                  image={product.image}
                  category={product.category}
                  features={product.features}
                  colors={product.colors}
                  inStock={product.inStock}
                  isNew={product.isNew}
                  isSale={product.isSale}
                />
              ))}
            </div>

            {/* Rich Content Sections */}
            <div className="space-y-12">
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
                      Amazing phones don't have to break the bank. Discover our top picks for phones under $500 that deliver incredible value.
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

            {/* No Results State */}
            {filteredAndSortedProducts.length === 0 && (
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
          </div>
        </div>
      </main>

      <NewsletterSection />
      <Footer />
    </div>
  );
} 