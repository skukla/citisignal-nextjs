'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';
import ProductCard from '@/components/ui/ProductCard';
import FilterSidebar from '@/components/ui/FilterSidebar';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { internetDeals, internetDealsFilterOptions } from '@/data/internetDeals';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, Bars3Icon, WifiIcon } from '@heroicons/react/24/outline';

type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating' | 'newest';

export default function InternetDealsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filters = [
    { title: 'Connection Type', key: 'type', options: internetDealsFilterOptions.type, type: 'checkbox' as const },
    { title: 'Speed Range', key: 'speed', options: internetDealsFilterOptions.speed, type: 'checkbox' as const },
    { title: 'Price Range', key: 'price', options: internetDealsFilterOptions.price, type: 'checkbox' as const },
    { title: 'Contract Length', key: 'contractLength', options: internetDealsFilterOptions.contractLength, type: 'checkbox' as const },
    { title: 'Features', key: 'features', options: internetDealsFilterOptions.features, type: 'checkbox' as const }
  ];

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = internetDeals.filter(product => {
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (activeFilters.type?.length > 0 && !activeFilters.type.includes(product.type)) return false;
      
      if (activeFilters.price?.length > 0) {
        const priceInRange = activeFilters.price.some(range => {
          switch (range) {
            case 'under-50': return product.price < 50;
            case '50-100': return product.price >= 50 && product.price < 100;
            case 'over-100': return product.price >= 100;
            default: return false;
          }
        });
        if (!priceInRange) return false;
      }

      if (activeFilters.contractLength?.length > 0) {
        const hasContractType = activeFilters.contractLength.some(contract => {
          switch (contract) {
            case 'no-contract': return product.contractLength.toLowerCase().includes('no contract');
            case '12-months': return product.contractLength.includes('12');
            case '24-months': return product.contractLength.includes('24') || product.contractLength.includes('36');
            default: return false;
          }
        });
        if (!hasContractType) return false;
      }

      if (activeFilters.features?.length > 0) {
        const hasFeature = activeFilters.features.some(feature => {
          switch (feature) {
            case 'unlimited-data': return product.dataLimit.toLowerCase().includes('unlimited');
            case 'free-installation': return product.installation.toLowerCase().includes('free');
            case 'wifi-included': return product.equipmentIncluded.some(e => e.toLowerCase().includes('router') || e.toLowerCase().includes('wifi'));
            case 'business-class': return product.provider.toLowerCase().includes('business');
            default: return false;
          }
        });
        if (!hasFeature) return false;
      }

      return true;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
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

  const breadcrumbItems = [{ name: 'Shop', href: '/shop' }, { name: 'Internet Deals' }];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <WifiIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Internet Deals</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl">
            Get connected with high-speed internet from CitiSignal. From fiber to 5G home internet, 
            find the perfect connection for your home or business with competitive pricing and reliable service.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search internet plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg bg-white shadow-sm focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 focus:border-purple-500 focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  brand={product.provider}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  rating={product.rating}
                  reviews={product.reviews}
                  image={`/internet/${product.id}.jpg`}
                  category={product.category}
                  features={[product.speed, product.dataLimit, product.installation]}
                  colors={[]}
                  inStock={true}
                  isNew={product.isNew}
                  isSale={product.isSale}
                />
              ))}
            </div>

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