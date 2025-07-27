'use client';

import { type ReactElement } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';
import ProductCard from '@/components/ui/ProductCard';
import ProductGrid from '@/components/ui/ProductGrid';
import LoadMore from '@/components/ui/LoadMore';
import ProductListLayout from '@/components/layout/ProductListLayout';
import { phones, phoneFilters } from '@/data/phones';
import { techReviews } from '@/data/tech-reviews';
import { buyingGuides } from '@/data/buying-guides';
import { phoneTips } from '@/data/tips';
import { DevicePhoneMobileIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useProductList } from '@/hooks/useProductList';
import ContentSection from '@/components/ui/ContentSection';
import TechReviewGrid from '@/components/ui/TechReviewGrid';
import BuyingGuideGrid from '@/components/ui/BuyingGuideGrid';
import TipGrid from '@/components/ui/TipGrid';

export default function PhonesPage(): ReactElement {
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    handleSortChange,
    activeFilters,
    handleFilterChange,
    handleClearFilters,
    handleLoadMore,
    hasMoreItems,
    filteredAndSortedProducts
  } = useProductList({ products: phones });

  return (
    <div className="min-h-screen">
      <Header />
      
      <ProductListLayout
        title="Phones"
        description="Find your perfect phone from our wide selection of the latest smartphones. From flagship models to budget-friendly options, we have the right device for you."
        icon={DevicePhoneMobileIcon}
        filters={phoneFilters}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalCount={phones.length}
        filteredCount={filteredAndSortedProducts.length}
        emptyStateIcon={Bars3Icon}
      >
        <div className="space-y-12">
          <ProductGrid 
            columns={{ sm: 1, md: 2, lg: 3 }} 
            gap="md"
          >
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
          </ProductGrid>

          <LoadMore
            onLoadMore={handleLoadMore}
            isVisible={hasMoreItems}
          />

          {/* Rich Content Sections - Only show when we have products */}
          {filteredAndSortedProducts.length > 0 && (
            <div className="space-y-12">
              {/* Featured Tech Reviews */}
              <ContentSection
                title="Latest Tech Reviews"
                titleColor="text-gray-900"
                spacing="lg"
              >
                <TechReviewGrid reviews={techReviews} />
              </ContentSection>

              {/* Buying Guides */}
              <ContentSection
                title="Phone Buying Guides"
                actionLabel='View All Guides'
                actionHref='/guides'
                buttonVariant="primary"
                spacing="lg"
              >
                <BuyingGuideGrid guides={buyingGuides} />
              </ContentSection>

              {/* Tips & Tricks */}
              <ContentSection
                title="Tips & Tricks"
                actionLabel="View All Tips"
                actionHref="/tips"
                buttonVariant="secondary"
                spacing="lg"
              >
                <TipGrid tips={phoneTips} />
              </ContentSection>
            </div>
          )}
        </div>
      </ProductListLayout>

      <NewsletterSection />
      <Footer />
    </div>
  );
} 