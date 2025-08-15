'use client';

import { ProductPage, ProductPageProvider } from '@/components/layout/ProductPage';
import { internetDealsPageData } from '@/data/route-groups/products/internet-deals';

export default function InternetDealsPage() {
  // Extract page data for the provider
  const pageData = {
    breadcrumbs: internetDealsPageData.breadcrumbs,
    pageHeader: internetDealsPageData.pageHeader,
    search: internetDealsPageData.search,
    filters: internetDealsPageData.filters,
    emptyState: internetDealsPageData.emptyState,
    loadingSkeletonCount: 12
  };

  return (
    <ProductPageProvider 
      category="internet-deals"
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