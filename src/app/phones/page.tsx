'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';
import ProductCard from '@/components/ui/ProductCard';
import ProductListLayout from '@/components/layout/ProductListLayout';
import { phones, phoneFilterOptions } from '@/data/phones';
import { DevicePhoneMobileIcon, Bars3Icon, DevicePhoneMobileIcon as PhoneIcon, CreditCardIcon, BoltIcon, CloudIcon, MusicalNoteIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useProductList } from '@/hooks/useProductList';
import ContentSection from '@/components/ui/ContentSection';
import TechReviewGrid from '@/components/ui/TechReviewGrid';
import BuyingGuideGrid from '@/components/ui/BuyingGuideGrid';
import TipGrid from '@/components/ui/TipGrid';
import AccessoryGrid from '@/components/ui/AccessoryGrid';

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

  const breadcrumbItems = [
    { name: 'Shop', href: '/shop' },
    { name: 'Phones' }
  ];

  const accessories = [
    {
      icon: BoltIcon,
      title: 'Fast Chargers',
      price: 'From $29.99',
      href: '/accessories/chargers'
    },
    {
      icon: CloudIcon,
      title: 'Cases & Protection',
      price: 'From $19.99',
      href: '/accessories/cases'
    },
    {
      icon: MusicalNoteIcon,
      title: 'Audio Accessories',
      price: 'From $24.99',
      href: '/accessories/audio'
    },
    {
      icon: PlusIcon,
      title: 'View All',
      price: 'Accessories',
      href: '/accessories'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <ProductListLayout
        title="Phones"
        description="Find your perfect phone from our wide selection of the latest smartphones. From flagship models to budget-friendly options, we have the right device for you."
        icon={DevicePhoneMobileIcon}
        breadcrumbItems={breadcrumbItems}
        filters={filters}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        showMobileFilters={showMobileFilters}
        setShowMobileFilters={setShowMobileFilters}
        totalCount={phones.length}
        filteredCount={filteredAndSortedProducts.length}
        emptyStateIcon={Bars3Icon}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>

        {/* Rich Content Sections - Only show when we have products */}
        {filteredAndSortedProducts.length > 0 && (
          <div className="space-y-12 mt-12">
            {/* Featured Tech Reviews */}
            <ContentSection
              title="Latest Tech Reviews"
            >
              <TechReviewGrid reviews={reviews} />
            </ContentSection>

            {/* Buying Guides */}
            <ContentSection
              title="Phone Buying Guides"
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

            {/* Related Products */}
            <ContentSection
              title="Essential Accessories"
            >
              <AccessoryGrid accessories={accessories} />
            </ContentSection>
          </div>
        )}
      </ProductListLayout>

      <NewsletterSection />
      <Footer />
    </div>
  );
} 