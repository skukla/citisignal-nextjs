'use client';

import PageContainer from '@/components/layout/PageContainer';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';
import PageFooter from '@/components/layout/PageFooter';

import BreadcrumbSection from '@/components/ui/layout/BreadcrumbSection';
import PageHeaderSection from '@/components/ui/layout/PageHeaderSection';
import SearchAndSort from '@/components/ui/search/SearchAndSort';
import ResultsCount from '@/components/ui/search/ResultsCount';
import ProductGridWithEmpty from '@/components/ui/grids/ProductGridWithEmpty';
import ProductGrid from '@/components/ui/grids/ProductGrid';
import FilterSidebarResponsive from '@/components/ui/search/FilterSidebar/FilterSidebarResponsive';

import TechReviewGrid from '@/components/ui/grids/TechReviewGrid';
import BuyingGuideGrid from '@/components/ui/grids/BuyingGuideGrid';
import TipGrid from '@/components/ui/grids/TipGrid';
import AccessoryGrid from '@/components/ui/grids/AccessoryGrid';
import ContentSection from '@/components/ui/layout/ContentSection';
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
    <div className="min-h-screen">
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
            <ProductGrid 
              products={filteredAndSortedProducts as Phone[]}
              columns={{ sm: 1, md: 2, lg: 3 }} 
              gap="md"
            />

            {/* Enhanced Content Sections - Only show when we have products */}
            {filteredAndSortedProducts.length > 0 && (
              <div className="space-y-12 mt-12">
                {/* Featured Tech Reviews */}
                <ContentSection title={sections.techReviews.title}>
                  <TechReviewGrid reviews={sections.techReviews.reviews} />
                </ContentSection>

                {/* Buying Guides */}
                <ContentSection title={sections.buyingGuides.title}>
                  <BuyingGuideGrid guides={sections.buyingGuides.guides} />
                </ContentSection>

                {/* Tips & Tricks */}
                <ContentSection 
                  title={sections.tips.title}
                  subtitle={sections.tips.subtitle}
                  subtitleHref="/tips"
                >
                  <TipGrid tips={sections.tips.tips} />
                </ContentSection>

                {/* Essential Accessories */}
                <ContentSection title={sections.accessories.title}>
                  <AccessoryGrid accessories={sections.accessories.accessories} />
                </ContentSection>
              </div>
            )}
          </ProductGridWithEmpty>
        </TwoColumnLayout>
      </PageContainer>

      <PageFooter />
    </div>
  );
}