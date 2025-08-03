'use client';

import PageContainer from '@/components/layout/PageContainer';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';
import PageFooter from '@/components/layout/PageFooter';
import BreadcrumbSection from '@/components/ui/layout/BreadcrumbSection';
import PageHeaderSection from '@/components/ui/layout/PageHeaderSection';
import SearchAndSort from '@/components/ui/search/SearchAndSort';
import ResultsCount from '@/components/ui/search/ResultsCount';
import ProductGridWithEmpty from '@/components/ui/grids/ProductGridWithEmpty';
import FilterSidebarResponsive from '@/components/ui/search/FilterSidebarResponsive';
import ProductCard from '@/components/ui/cards/ProductCard';
import TechReviewGrid from '@/components/ui/grids/TechReviewGrid';
import BuyingGuideGrid from '@/components/ui/grids/BuyingGuideGrid';
import TipGrid from '@/components/ui/grids/TipGrid';
import AccessoryGrid from '@/components/ui/grids/AccessoryGrid';
import Link from '@/components/ui/foundations/Link';
import { phonesPageData } from '@/data/pages/phones';
import { useProductList } from '@/hooks/useProductList';
import type { Phone } from '@/types/commerce';

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
  } = useProductList({ products: phonesPageData.products });

  // Page configuration and content
  const { filters, breadcrumbs, pageHeader, search, emptyState, techReviews, buyingGuides, tips, accessories } = phonesPageData;
  
  // Enhanced content sections
  const sections = {
    techReviews: { title: 'Latest Reviews', reviews: techReviews },
    buyingGuides: { title: 'Buying Guides', guides: buyingGuides },
    tips: { title: 'Tips & Tricks', subtitle: 'View All Tips', tips: tips },
    accessories: { title: 'Essential Accessories', accessories: accessories }
  };

  return (
    <PageContainer background="gray">
      <BreadcrumbSection items={breadcrumbs} />
      
      <PageHeaderSection 
        title={pageHeader.title}
        description={pageHeader.description}
        icon={pageHeader.icon}
      />
      
      <SearchAndSort 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        searchPlaceholder={search.placeholder}
      />
      
      <ResultsCount 
        showing={filteredAndSortedProducts.length} 
        total={phonesPageData.products.length} 
        itemLabel={search.itemLabel} 
      />
      
      <TwoColumnLayout 
        sidebar={
          <FilterSidebarResponsive 
            filters={filters}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            showMobileFilters={showMobileFilters}
            setShowMobileFilters={setShowMobileFilters}
          />
        }
      >
        <ProductGridWithEmpty 
          hasResults={filteredAndSortedProducts.length > 0}
          emptyState={{
            icon: emptyState.icon,
            title: emptyState.title,
            description: emptyState.description,
            actionLabel: emptyState.actionLabel,
            onAction: handleClearFilters
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProducts.map((phone) => (
              <ProductCard.Root key={phone.sku} product={phone as Phone}>
                <ProductCard.Image />
                <ProductCard.Badges />
                <ProductCard.Info />
                <ProductCard.Price />
                <ProductCard.Actions />
              </ProductCard.Root>
            ))}
          </div>

          {/* Enhanced Content Sections - Only show when we have products */}
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
                  <Link 
                    href="/tips" 
                    variant="text"
                    className="text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    {sections.tips.subtitle}
                  </Link>
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
        </ProductGridWithEmpty>
      </TwoColumnLayout>
      
      <PageFooter />
    </PageContainer>
  );
}