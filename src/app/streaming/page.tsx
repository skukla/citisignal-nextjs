'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/sections/NewsletterSection';
import ProductCard from '@/components/ui/ProductCard';
import ProductGrid from '@/components/ui/ProductGrid';
import LoadMore from '@/components/ui/LoadMore';
import ProductListLayout from '@/components/layout/ProductListLayout';
import { streamingServices, streamingFilterOptions } from '@/data/streaming';
import { PlayIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useProductList } from '@/hooks/useProductList';

export default function StreamingPage() {
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
  } = useProductList({
    products: streamingServices
  });

  const filters = [
    {
      title: 'Provider',
      key: 'provider',
      options: streamingFilterOptions.provider,
      type: 'checkbox' as const
    },
    {
      title: 'Price Range',
      key: 'price',
      options: streamingFilterOptions.price,
      type: 'checkbox' as const
    },
    {
      title: 'Content Type',
      key: 'contentType',
      options: streamingFilterOptions.content_type,
      type: 'checkbox' as const
    },
    {
      title: 'Video Quality',
      key: 'videoQuality',
      options: streamingFilterOptions.video_quality,
      type: 'checkbox' as const
    },
    {
      title: 'Features',
      key: 'features',
      options: streamingFilterOptions.features,
      type: 'checkbox' as const
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <ProductListLayout
        title="Streaming"
        description="Add premium streaming services to your CitiSignal plan. Enjoy your favorite shows, movies, music, and live sports with our exclusive bundles and discounted rates."
        icon={PlayIcon}
        filters={filters}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalCount={streamingServices.length}
        filteredCount={filteredAndSortedProducts.length}
        emptyStateIcon={Bars3Icon}
      >
        <div className="space-y-12">
          <ProductGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="md">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                brand={product.provider}
                price={product.price}
                originalPrice={product.original_price}
                image={product.media_gallery?.[0]?.url || ''}
                category={product.category}
                features={[...product.video_quality, `${product.device_limit}`]}
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
        </div>
      </ProductListLayout>

      <NewsletterSection />
      <Footer />
    </div>
  );
} 