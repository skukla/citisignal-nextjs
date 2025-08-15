'use client';
import { ProductPageWrapper } from '@/components/layout/Product/ProductPageWrapper';
import EmptyState from '@/components/ui/feedback/EmptyState';
import ProductGrid from '@/components/ui/grids/ProductGrid';
import FilterSidebarResponsive from '@/components/ui/search/FilterSidebar/FilterSidebarResponsive';
import TechReviewGrid from '@/components/ui/grids/TechReviewGrid';
import BuyingGuideGrid from '@/components/ui/grids/BuyingGuideGrid';
import TipGrid from '@/components/ui/grids/TipGrid';
import Link from '@/components/ui/foundations/Link';
import Button from '@/components/ui/foundations/Button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { phonesPageData } from '@/data/route-groups/products/phones';
import { useProductList } from '@/hooks/useProductList';
import { useAllPhones } from '@/hooks/products/usePhones';
import type { Phone } from '@/types/commerce';

export default function PhonesPage() {
  // Fetch phones from Adobe Commerce with infinite loading
  const { phones, loading, error, hasMoreItems, loadMore, totalCount } = useAllPhones(12);
  
  // Use product list hook with dynamic data
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
  } = useProductList({ products: phones });

  // Page configuration and content
  const { filters, breadcrumbs, pageHeader, search, emptyState, techReviews, buyingGuides, tips } = phonesPageData;
  
  // Enhanced content sections
  const sections = {
    techReviews: { title: 'Latest Reviews', reviews: techReviews },
    buyingGuides: { title: 'Buying Guides', guides: buyingGuides },
    tips: { title: 'Tips & Tricks', subtitle: 'View All Tips', tips: tips }
  };
  
  // Handle loading more products
  const handleLoadMore = async () => {
    if (loadMore) {
      await loadMore();
    }
  };

  return (
    <ProductPageWrapper
      breadcrumbs={breadcrumbs}
      title={pageHeader.title}
      description={pageHeader.description}
      loading={loading}
      error={error}
      products={phones}
      totalCount={totalCount || filteredAndSortedProducts.length}
      searchProps={{
        searchQuery,
        onSearchChange: setSearchQuery,
        sortBy,
        onSortChange: handleSortChange,
        placeholder: search.placeholder
      }}
      loadingSkeletonCount={12}
      errorTitle="Unable to load phones"
      errorDescription="There was an error loading the phones. Please try again later."
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

          {/* Load More Button */}
          {hasMoreItems && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleLoadMore}
                variant="secondary"
                disabled={loading}
                className="min-w-[200px]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  `Load More (${totalCount - phones.length} remaining)`
                )}
              </Button>
            </div>
          )}

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
    </ProductPageWrapper>
  );
}
