'use client';

import { ProductPage, ProductPageProvider } from '@/components/layout/ProductPage';
import { watchesPageData } from '@/data/route-groups/products/watches';

export default function WatchesPage() {
  // Extract page data for the provider
  const pageData = {
    breadcrumbs: watchesPageData.breadcrumbs,
    pageHeader: watchesPageData.pageHeader,
    search: watchesPageData.search,
    filters: watchesPageData.filters,
    emptyState: watchesPageData.emptyState,
    loadingSkeletonCount: 12
  };

  return (
    <ProductPageProvider 
      category="watches"
      pageData={pageData}
      limit={12}
    >
      <ProductPage.Background color="gray">
        <ProductPage.Container>
          <ProductPage.Breadcrumbs />
          <ProductPage.Header />
          
          <ProductPage.Toolbar>
            <ProductPage.Search />
            <ProductPage.Sort />
            <ProductPage.MobileFilterButton />
          </ProductPage.Toolbar>
          
          <ProductPage.ResultCount />
          
          <ProductPage.Layout>
            <ProductPage.Sidebar>
              <ProductPage.Filters />
            </ProductPage.Sidebar>
            
            <ProductPage.Main>
              <ProductPage.Content />
              <ProductPage.LoadMore />
            </ProductPage.Main>
          </ProductPage.Layout>
        </ProductPage.Container>
        
        <ProductPage.Newsletter />
      </ProductPage.Background>
    </ProductPageProvider>
  );
}