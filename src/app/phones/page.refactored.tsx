'use client';

import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';
import { 
  ProductCard, 
  ProductCardImage, 
  ProductCardBadges, 
  ProductCardInfo, 
  ProductCardPrice, 
  ProductCardActions 
} from '@/features/product/components/ProductCard';
import FilterSidebar from '@/components/ui/FilterSidebar';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import SearchSortBar from '@/components/ui/SearchSortBar';
import EmptyState from '@/components/ui/EmptyState';
import TechReviewGrid from '@/components/ui/TechReviewGrid';
import BuyingGuideGrid from '@/components/ui/BuyingGuideGrid';
import TipGrid from '@/components/ui/TipGrid';
import AccessoryGrid from '@/components/ui/AccessoryGrid';
import { phones, phoneFilterOptions } from '@/data/phones';
import { phonesPageContent } from '@/data/pages/phones';
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

  const { header, breadcrumbs, sections } = phonesPageContent;

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbs} />
        </div>

        <PageHeader
          title={header.title}
          description={header.description}
          icon={header.icon}
        />

        <SearchSortBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={(value) => setSortBy(value)}
          sortOptions={SORT_OPTIONS}
          searchPlaceholder="Search phones..."
        />

        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedProducts.length} of {phones.length} phones
          </p>
        </div>

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((phone) => (
                  <ProductCard key={phone.sku} product={phone}>
                    <ProductCardImage />
                    <ProductCardBadges />
                    <ProductCardInfo />
                    <ProductCardPrice />
                    <ProductCardActions />
                  </ProductCard>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No phones found"
                description="Try adjusting your search or filter criteria to find what you're looking for."
                onAction={handleClearFilters}
              />
            )}

            {/* Rich Content Sections - Only show when we have products */}
            {filteredAndSortedProducts.length > 0 && (
              <div className="space-y-12 mt-12">
                {/* Featured Tech Reviews */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{sections.techReviews.title}</h2>
                  <TechReviewGrid reviews={sections.techReviews.reviews} />
                </section>

                {/* Buying Guides */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{sections.buyingGuides.title}</h2>
                  <BuyingGuideGrid guides={sections.buyingGuides.guides} />
                </section>

                {/* Tips & Tricks */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{sections.tips.title}</h2>
                    <a href="/tips" className="text-sm font-medium text-purple-600 hover:text-purple-700">
                      {sections.tips.subtitle}
                    </a>
                  </div>
                  <TipGrid tips={sections.tips.tips} />
                </section>

                {/* Essential Accessories */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{sections.accessories.title}</h2>
                  <AccessoryGrid accessories={sections.accessories.accessories} />
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