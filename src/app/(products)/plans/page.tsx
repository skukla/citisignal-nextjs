'use client';

import { ProductPage, ProductPageProvider } from '@/components/layout/ProductPage';
import { plansPageData } from '@/data/route-groups/products/plans';

export default function PlansPage() {
  // Extract page data for the provider
  const pageData = {
    breadcrumbs: plansPageData.breadcrumbs,
    pageHeader: plansPageData.pageHeader,
    search: plansPageData.search,
    filters: plansPageData.filters,
    emptyState: plansPageData.emptyState,
    loadingSkeletonCount: 12
  };

  return (
    <ProductPageProvider 
      category="plans"
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