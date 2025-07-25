'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';
import PlanCard from '@/components/ui/PlanCard';
import PlanGrid from '@/components/ui/PlanGrid';
import getPlanFeatures from '@/components/ui/PlanFeatureList';
import LoadMore from '@/components/ui/LoadMore';
import ProductListLayout from '@/components/layout/ProductListLayout';
import PlanComparison from '@/components/sections/PlanComparison';
import { plans, planFilterOptions } from '@/data/plans';
import { SignalIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useProductList } from '@/hooks/useProductList';

const planTypes = [
  { id: 'basic', name: 'Basic' },
  { id: 'premium', name: 'Premium' },
  { id: 'unlimited', name: 'Unlimited' }
];

const planFeatures = [
  {
    name: 'Unlimited Talk & Text',
    description: 'Unlimited nationwide calling and messaging',
    availableIn: ['basic', 'premium', 'unlimited']
  },
  {
    name: 'Mobile Hotspot',
    description: 'Share your data with other devices',
    availableIn: ['premium', 'unlimited']
  },
  {
    name: 'Premium Data',
    description: 'No data slowdowns regardless of usage',
    availableIn: ['unlimited']
  },
  {
    name: 'International Features',
    description: 'Text and data in 200+ countries',
    availableIn: ['premium', 'unlimited']
  },
  {
    name: 'Streaming Quality',
    description: 'HD streaming on supported services',
    availableIn: ['premium', 'unlimited']
  },
  {
    name: 'Network Priority',
    description: 'Priority during network congestion',
    availableIn: ['unlimited']
  }
];

export default function PlansPage() {
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
    handleLoadMore,
    hasMoreItems,
    filteredAndSortedProducts
  } = useProductList({ products: plans });

  const filters = [
    {
      title: 'Plan Type',
      key: 'type',
      options: planFilterOptions.type,
      type: 'checkbox' as const
    },
    {
      title: 'Price Range',
      key: 'price',
      options: planFilterOptions.price,
      type: 'checkbox' as const
    },
    {
      title: 'Data Amount',
      key: 'data',
      options: planFilterOptions.data,
      type: 'checkbox' as const
    },
    {
      title: 'Features',
      key: 'features',
      options: planFilterOptions.features,
      type: 'checkbox' as const
    }
  ];

  const breadcrumbItems = [
    { name: 'Shop', href: '/shop' },
    { name: 'Plans' }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <ProductListLayout
        title="Wireless Plans"
        description="Choose the perfect wireless plan for your needs. From unlimited data to family plans, we have flexible options with no hidden fees and the reliability of our nationwide network."
        icon={SignalIcon}
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
        totalCount={plans.length}
        filteredCount={filteredAndSortedProducts.length}
        emptyStateIcon={Bars3Icon}
      >
        <div className="space-y-12">
          <PlanGrid>
            {filteredAndSortedProducts.map((plan) => (
              <PlanCard
                key={plan.id}
                name={plan.name}
                type={plan.type}
                price={plan.price}
                originalPrice={plan.original_price}
                rating={plan.rating_summary}
                reviews={plan.review_count}
                data={plan.data}
                talk={plan.talk}
                text={plan.text}
                features={getPlanFeatures({
                  data: plan.data,
                  hotspot: plan.hotspot,
                  streaming: plan.streaming,
                  contractRequired: plan.contract_required,
                  networkPriority: plan.network_priority
                })}
                hotspot={plan.hotspot}
                streaming={plan.streaming}
                isPopular={plan.type === 'unlimited'}
                isNew={Boolean(plan.isNew)}
                isSale={plan.original_price ? plan.original_price > plan.price : false}
                contractRequired={plan.contract_required}
                networkPriority={plan.network_priority}
              />
            ))}
          </PlanGrid>

          <LoadMore
            onLoadMore={handleLoadMore}
            isVisible={hasMoreItems}
          />

          {/* Only show comparison when we have products */}
          {filteredAndSortedProducts.length > 0 && (
            <PlanComparison
              planTypes={planTypes}
              features={planFeatures}
            />
          )}
        </div>
      </ProductListLayout>

      <NewsletterSection />
      <Footer />
    </div>
  );
} 