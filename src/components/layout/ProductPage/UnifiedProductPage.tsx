'use client';

import { useMemo } from 'react';
import { useProductPageData } from '@/hooks/products/useProductPageData';
import { ProductPageLayout } from './structure/ProductPageLayout';
import { ProductPageHeader } from './structure/ProductPageHeader';
import { ProductPageBreadcrumbs } from './structure/ProductPageBreadcrumbs';
import { ProductPageFilters } from './toolbar/ProductPageFilters';
import { ProductPageContent } from './products/ProductPageContent';
import { LoadingState } from '@/components/ui/LoadingState';
import { ErrorState } from '@/components/ui/ErrorState';
import { useSearchParams } from 'next/navigation';
import { parseFiltersFromURL, parseSortFromURL } from '@/utils/product-filters';

/**
 * Unified Product Page Component
 *
 * Demonstrates the power of Adobe API Mesh by fetching ALL page data
 * in a SINGLE GraphQL query. This is the key value proposition:
 *
 * Instead of making 3-4 separate API calls:
 * - ❌ Fetch navigation separately
 * - ❌ Fetch products separately
 * - ❌ Fetch facets separately
 * - ❌ Fetch breadcrumbs separately
 *
 * We make ONE unified query that orchestrates:
 * - ✅ Commerce Core (navigation, breadcrumbs)
 * - ✅ Live Search (facets, search)
 * - ✅ Catalog Service (product details)
 *
 * All through a single GraphQL endpoint!
 */
export function UnifiedProductPage({ category }: { category?: string }) {
  const searchParams = useSearchParams();

  // Parse all query parameters
  const variables = useMemo(() => {
    const phrase = searchParams.get('q') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '12', 10);
    const filter = parseFiltersFromURL(searchParams, 'page');
    const sort = parseSortFromURL(searchParams);

    return {
      category,
      phrase,
      filter,
      sort,
      pageSize,
      currentPage: page,
    };
  }, [category, searchParams]);

  // ONE query to rule them all! 🎯
  const { data, error, isLoading, mutate } = useProductPageData(variables);

  // Extract data from unified response
  const pageData = useMemo(() => {
    if (!data?.Citisignal_categoryPageData) {
      return null;
    }

    const { navigation, products, facets, breadcrumbs } = data.Citisignal_categoryPageData;

    return {
      navigation,
      products: products?.items || [],
      pageInfo: products?.page_info || { current_page: 1, page_size: 12, total_pages: 0 },
      facets: facets?.facets || [],
      breadcrumbs: breadcrumbs?.items || [],
    };
  }, [data]);

  // Show loading state
  if (isLoading) {
    return (
      <ProductPageLayout>
        <LoadingState message="Loading product page..." />
      </ProductPageLayout>
    );
  }

  // Show error state
  if (error) {
    return (
      <ProductPageLayout>
        <ErrorState message="Failed to load product page" onRetry={() => mutate()} />
      </ProductPageLayout>
    );
  }

  // Show empty state
  if (!pageData) {
    return (
      <ProductPageLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">No data available</p>
        </div>
      </ProductPageLayout>
    );
  }

  return (
    <ProductPageLayout>
      <ProductPageHeader />

      {/* Breadcrumbs from unified query */}
      {pageData.breadcrumbs.length > 0 && (
        <div className="mb-6">
          <ProductPageBreadcrumbs />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Facets from unified query */}
        <div className="lg:col-span-1">
          <ProductPageFilters />
        </div>

        {/* Products from unified query */}
        <div className="lg:col-span-3">
          <ProductPageContent />
        </div>
      </div>
    </ProductPageLayout>
  );
}

/**
 * Example usage in a page component:
 *
 * ```tsx
 * // app/shop/[category]/page.tsx
 * import { UnifiedProductPage } from '@/components/layout/ProductPage/UnifiedProductPage';
 *
 * export default function CategoryPage({ params }: { params: { category: string } }) {
 *   return <UnifiedProductPage category={params.category} />;
 * }
 * ```
 *
 * This single component replaces multiple data fetching hooks with ONE unified query!
 */
