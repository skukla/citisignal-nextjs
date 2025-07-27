'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';
import PlanCard from '@/components/ui/PlanCard';
import PlanGrid from '@/components/ui/PlanGrid';
import getPlanFeatures from '@/components/ui/PlanFeatureList';
import LoadMore from '@/components/ui/LoadMore';
import ProductListLayout from '@/components/layout/ProductListLayout';
import PlanComparison from '@/components/sections/PlanComparisonSection';
import { SignalIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { usePlans } from '@/hooks/usePlans';
import { planTypes, planFeatures, planFilters } from '@/data/plans';

export default function PlansPage() {
  const {
    plans,
    filteredPlans,
    searchQuery,
    setSearchQuery,
    sortBy,
    handleSortChange,
    activeFilters,
    handleFilterChange,
    handleClearFilters,
    handleLoadMore,
    hasMoreItems,
    handleWishlistChange,
    handleSelectPlan,
    handleLearnMore
  } = usePlans();

  return (
    <div className="min-h-screen">
      <Header />
      
      <ProductListLayout
        title="Wireless Plans"
        description="Choose the perfect wireless plan for your needs. From unlimited data to family plans, we have flexible options with no hidden fees and the reliability of our nationwide network."
        icon={SignalIcon}
        filters={planFilters}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalCount={plans.length}
        filteredCount={filteredPlans.length}
        emptyStateIcon={Bars3Icon}
      >
        <div className="space-y-12">
          <PlanGrid>
            {filteredPlans.map((plan) => (
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
                onWishlistChange={handleWishlistChange}
                onSelect={() => handleSelectPlan(plan.id)}
                onLearnMore={() => handleLearnMore(plan.id)}
              />
            ))}
          </PlanGrid>

          <LoadMore
            onLoadMore={handleLoadMore}
            isVisible={hasMoreItems}
          />

          {/* Only show comparison when we have products */}
          {filteredPlans.length > 0 && (
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