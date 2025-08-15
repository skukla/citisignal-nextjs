'use client';

import { ProductPage, ProductPageProvider } from '@/components/layout/ProductPage';
import { giftCardsPageData } from '@/data/route-groups/products/gift-cards';

export default function GiftCardsPage() {
  // Extract page data for the provider
  const pageData = {
    breadcrumbs: giftCardsPageData.breadcrumbs,
    pageHeader: giftCardsPageData.pageHeader,
    search: giftCardsPageData.search,
    filters: giftCardsPageData.filters,
    emptyState: giftCardsPageData.emptyState,
    loadingSkeletonCount: 12
  };

  return (
    <ProductPageProvider 
      category="gift-cards"
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