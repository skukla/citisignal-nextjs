'use client';

import { ProductPage, ProductPageProvider } from '@/components/layout/ProductPage';
import { streamingPageData } from '@/data/route-groups/products/streaming';

export default function StreamingPage() {
  // Extract page data for the provider
  const pageData = {
    breadcrumbs: streamingPageData.breadcrumbs,
    pageHeader: streamingPageData.pageHeader,
    search: streamingPageData.search,
    filters: streamingPageData.filters,
    emptyState: streamingPageData.emptyState,
    loadingSkeletonCount: 12
  };

  return (
    <ProductPageProvider 
      category="streaming"
      pageData={pageData}
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