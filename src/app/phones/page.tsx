'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';
import ProductCard from '@/components/ui/ProductCard';
import ProductGrid from '@/components/ui/ProductGrid';
import LoadMore from '@/components/ui/LoadMore';
import ProductListLayout from '@/components/layout/ProductListLayout';
import { phones, phoneFilterOptions } from '@/data/phones';
import { DevicePhoneMobileIcon, Bars3Icon, DevicePhoneMobileIcon as PhoneIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { useProductList } from '@/hooks/useProductList';
import ContentSection from '@/components/ui/ContentSection';
import TechReviewGrid from '@/components/ui/TechReviewGrid';
import BuyingGuideGrid from '@/components/ui/BuyingGuideGrid';
import TipGrid from '@/components/ui/TipGrid';

export default function PhonesPage() {
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

  const reviews = [
    {
      title: 'iPhone 15 Pro vs Galaxy S24 Ultra: The Ultimate Camera Showdown',
      description: 'We put these flagship phones head-to-head in real-world photography tests. See which one comes out on top in our detailed comparison.',
      href: '/blog/iphone-15-pro-vs-galaxy-s24-ultra'
    },
    {
      title: 'The Best Budget Phones of 2024',
      description: 'Amazing phones don\'t have to break the bank. Discover our top picks for phones under $500 that deliver incredible value.',
      href: '/blog/best-budget-phones-2024'
    },
    {
      title: '5G Speed Test: Real World Results',
      description: 'We tested 5G speeds across different phones and locations. See which devices offer the fastest connectivity in your area.',
      href: '/blog/5g-speed-test-results'
    }
  ];

  const guides = [
    {
      icon: PhoneIcon,
      title: 'How to Choose Your Perfect Phone',
      description: 'From screen size to battery life, learn what features matter most for your needs.',
      href: '/guides/choosing-phone'
    },
    {
      icon: CreditCardIcon,
      title: 'Understanding Phone Financing',
      description: 'Compare payment plans, trade-in options, and find the best way to finance your new phone.',
      href: '/guides/phone-financing'
    }
  ];

  const tips = [
    {
      category: 'Photography',
      title: 'Master Your Phone\'s Camera',
      description: 'Pro tips for taking stunning photos with any smartphone camera.',
      href: '/tips/master-phone-camera',
      categoryColor: 'purple'
    },
    {
      category: 'Battery Life',
      title: 'Extend Your Battery Life',
      description: 'Simple tricks to make your phone\'s battery last all day and beyond.',
      href: '/tips/extend-battery-life',
      categoryColor: 'green'
    },
    {
      category: 'Security',
      title: 'Keep Your Phone Secure',
      description: 'Essential security settings and practices for protecting your device.',
      href: '/tips/phone-security',
      categoryColor: 'blue'
    }
  ];

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

  return (
    <div className="min-h-screen">
      <Header />
      
      <ProductListLayout
        title="Phones"
        description="Find your perfect phone from our wide selection of the latest smartphones. From flagship models to budget-friendly options, we have the right device for you."
        icon={DevicePhoneMobileIcon}
        filters={filters}
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
          <ProductGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="md">
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
              >
                <TechReviewGrid reviews={reviews} />
              </ContentSection>

              {/* Buying Guides */}
              <ContentSection
                title="Phone Buying Guides"
                actionLabel='View All Guides'
                actionHref='/guides'
              >
                <BuyingGuideGrid guides={guides} />
              </ContentSection>

              {/* Tips & Tricks */}
              <ContentSection
                title="Tips & Tricks"
                actionLabel="View All Tips"
                actionHref="/tips"
              >
                <TipGrid tips={tips} />
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