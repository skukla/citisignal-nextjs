'use client';

import { ProductRoot } from '@/components/layout/Product/ProductRoot';
import EmptyState from '@/components/ui/feedback/EmptyState';
import ProductGrid from '@/components/ui/grids/ProductGrid';
import FilterSidebarResponsive from '@/components/ui/search/FilterSidebar/FilterSidebarResponsive';
import TechReviewGrid from '@/components/ui/grids/TechReviewGrid';
import BuyingGuideGrid from '@/components/ui/grids/BuyingGuideGrid';
import TipGrid from '@/components/ui/grids/TipGrid';
import Link from '@/components/ui/foundations/Link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { phonesPageData } from '@/data/pages/phones';
import { useProductList } from '@/hooks/useProductList';
import type { Phone } from '@/types/commerce';

export default function PhonesPage() {
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    handleSortChange,
    activeFilters,
    showMobileFilters,
    setShowMobileFilters,
    handleFilterChange,
    handleClearFilters,
    filteredAndSortedProducts
  } = useProductList({ products: phonesPageData.products });

  // Page configuration and content
  const { filters, breadcrumbs, pageHeader, search, emptyState, techReviews, buyingGuides, tips } = phonesPageData;
  
  // Enhanced content sections
  const sections = {
    techReviews: { title: 'Latest Reviews', reviews: techReviews },
    buyingGuides: { title: 'Buying Guides', guides: buyingGuides },
    tips: { title: 'Tips & Tricks', subtitle: 'View All Tips', tips: tips }
  };

  return (
    <ProductRoot
      breadcrumbs={breadcrumbs}
      title={pageHeader.title}
      description={pageHeader.description}
      searchProps={{
        searchQuery,
        onSearchChange: setSearchQuery,
        sortBy,
        onSortChange: handleSortChange,
        placeholder: search.placeholder
      }}
      resultsCount={filteredAndSortedProducts.length}
    >
      <FilterSidebarResponsive 
        filters={filters}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        showMobileFilters={showMobileFilters}
        setShowMobileFilters={setShowMobileFilters}
      />
      
      {filteredAndSortedProducts.length > 0 ? (
        <>
          <ProductGrid 
            products={filteredAndSortedProducts as Phone[]}
            columns={{ sm: 1, md: 2, lg: 3 }} 
            gap="md"
          />

          {/* Enhanced Content Sections */}
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
                <Link 
                  href="/tips" 
                  variant="text"
                  className="text-sm font-medium text-purple-600 hover:text-purple-700 inline-flex items-center gap-1"
                >
                  {sections.tips.subtitle}
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
              <TipGrid tips={sections.tips.tips} />
            </section>
          </div>
        </>
      ) : (
        <EmptyState
          icon={emptyState.icon}
          title={emptyState.title}
          description={emptyState.description}
          actionLabel={emptyState.actionLabel}
          onAction={handleClearFilters}
        />
      )}
    </ProductRoot>
  );
}
