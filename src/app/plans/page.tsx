'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';
import PlanCard from '@/components/ui/PlanCard';
import FilterSidebar from '@/components/ui/FilterSidebar';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { plans, planFilterOptions } from '@/data/plans';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, Bars3Icon } from '@heroicons/react/24/outline';

type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating' | 'newest';

export default function PlansPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
    },
    {
      title: 'Network Priority',
      key: 'networkPriority',
      options: planFilterOptions.networkPriority,
      type: 'checkbox' as const
    }
  ];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = plans.filter(product => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Type filter
      if (activeFilters.type?.length > 0) {
        if (!activeFilters.type.includes(product.type)) {
          return false;
        }
      }

      // Price filter
      if (activeFilters.price?.length > 0) {
        const priceInRange = activeFilters.price.some(range => {
          switch (range) {
            case 'under-50':
              return product.price < 50;
            case '50-100':
              return product.price >= 50 && product.price < 100;
            case 'over-100':
              return product.price >= 100;
            default:
              return false;
          }
        });
        if (!priceInRange) return false;
      }

      // Data filter
      if (activeFilters.data?.length > 0) {
        const hasDataType = activeFilters.data.some(dataType => {
          switch (dataType) {
            case 'unlimited':
              return product.data.toLowerCase().includes('unlimited');
            case 'limited':
              return !product.data.toLowerCase().includes('unlimited');
            default:
              return false;
          }
        });
        if (!hasDataType) return false;
      }

      // Features filter
      if (activeFilters.features?.length > 0) {
        const hasFeature = activeFilters.features.some(feature => {
          switch (feature) {
            case '5g':
              return product.features.some(f => f.toLowerCase().includes('5g'));
            case 'hotspot':
              return product.hotspot !== 'None';
            case 'streaming':
              return product.streaming.length > 0;
            case 'no-contract':
              return !product.contractRequired;
            default:
              return false;
          }
        });
        if (!hasFeature) return false;
      }

      // Network Priority filter
      if (activeFilters.networkPriority?.length > 0) {
        if (!activeFilters.networkPriority.includes(product.networkPriority)) {
          return false;
        }
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
    { name: 'Plans' }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Wireless Plans</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Choose the perfect wireless plan for your needs. From unlimited data to family plans, 
            we have flexible options with no hidden fees and the reliability of our nationwide network.
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg bg-white shadow-sm focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 focus:border-purple-500 focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg bg-white shadow-sm focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 focus:border-purple-500 focus:outline-none transition-all duration-200 text-gray-900"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

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
                  id={plan.id}
                  name={plan.name}
                  type={plan.type}
                  price={plan.price}
                  originalPrice={plan.originalPrice}
                  rating={plan.rating}
                  reviews={plan.reviews}
                  category={plan.category}
                  data={plan.data}
                  talk={plan.talk}
                  text={plan.text}
                  features={plan.features}
                  hotspot={plan.hotspot}
                  streaming={plan.streaming}
                  isPopular={plan.isPopular}
                  isNew={plan.isNew}
                  isSale={plan.isSale}
                  contractRequired={plan.contractRequired}
                  networkPriority={plan.networkPriority}
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