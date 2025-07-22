'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';
import ProductCard from '@/components/ui/ProductCard';
import FilterSidebar from '@/components/ui/FilterSidebar';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { giftCards, giftCardFilterOptions } from '@/data/giftCards';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, Bars3Icon, GiftIcon } from '@heroicons/react/24/outline';

type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating' | 'newest';

export default function GiftCardsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filters = [
    { title: 'Card Type', key: 'type', options: giftCardFilterOptions.type, type: 'checkbox' as const },
    { title: 'Amount', key: 'amount', options: giftCardFilterOptions.amount, type: 'checkbox' as const },
    { title: 'Delivery', key: 'deliveryTime', options: giftCardFilterOptions.deliveryTime, type: 'checkbox' as const },
    { title: 'Purpose', key: 'purpose', options: giftCardFilterOptions.purpose, type: 'checkbox' as const }
  ];

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = giftCards.filter(product => {
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (activeFilters.type?.length > 0 && !activeFilters.type.includes(product.type)) return false;
      
      if (activeFilters.amount?.length > 0) {
        const amountInRange = activeFilters.amount.some(range => {
          switch (range) {
            case 'under-50': return product.amount < 50;
            case '50-100': return product.amount >= 50 && product.amount < 100;
            case '100-200': return product.amount >= 100 && product.amount < 200;
            case 'over-200': return product.amount >= 200;
            default: return false;
          }
        });
        if (!amountInRange) return false;
      }

      if (activeFilters.deliveryTime?.length > 0) {
        const hasDeliveryType = activeFilters.deliveryTime.some(delivery => {
          if (delivery === 'instant') return product.deliveryTime.toLowerCase().includes('instant');
          if (delivery === 'physical') return product.deliveryTime.includes('business days');
          return false;
        });
        if (!hasDeliveryType) return false;
      }

      return true;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.amount - b.amount;
        case 'price-high': return b.amount - a.amount;
        case 'rating': return b.rating - a.rating;
        case 'newest': return b.isNew ? 1 : -1;
        default: return b.reviews - a.reviews;
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
        if (newFilters[filterKey].length === 0) delete newFilters[filterKey];
      }
      return newFilters;
    });
  };

  const handleClearFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
  };

  const breadcrumbItems = [{ name: 'Shop', href: '/shop' }, { name: 'Gift Cards' }];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <GiftIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Gift Cards</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl">
            Give the gift of choice with CitiSignal gift cards. Perfect for devices, accessories, 
            service plans, or letting someone choose exactly what they want.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search gift cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg bg-white shadow-sm focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 focus:border-purple-500 focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none w-48 px-4 pr-10 py-3 border-2 border-gray-300 rounded-lg bg-white shadow-sm focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 focus:border-purple-500 focus:outline-none transition-all duration-200 text-gray-900 cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Amount: Low to High</option>
                <option value="price-high">Amount: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-lg bg-white shadow-sm hover:bg-gray-50 hover:border-purple-300 transition-all duration-200 text-gray-900"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedProducts.length} of {giftCards.length} gift cards
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  brand="CitiSignal"
                  price={product.amount}
                  rating={product.rating}
                  reviews={product.reviews}
                  image={product.image}
                  category={product.category}
                  features={product.features}
                  colors={[]}
                  inStock={true}
                  isNew={product.isNew}
                  isSale={false}
                />
              ))}
            </div>

            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bars3Icon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No gift cards found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria.</p>
                <button onClick={handleClearFilters} className="text-white px-6 py-2 rounded-lg hover:opacity-90 transition-colors" style={{ backgroundColor: '#8821f4' }}>
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