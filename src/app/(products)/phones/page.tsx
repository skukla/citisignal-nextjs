'use client';

import { ProductPage, ProductPageProvider } from '@/components/layout/ProductPage';
import PhonesTechReviews from '@/components/sections/phones/PhonesTechReviews';
import PhonesBuyingGuides from '@/components/sections/phones/PhonesBuyingGuides';
import PhonesTips from '@/components/sections/phones/PhonesTips';
import { phonesPageData } from '@/data/route-groups/products/phones';

export default function PhonesPage() {
  // Extract page data for the provider
  const pageData = {
    breadcrumbs: phonesPageData.breadcrumbs,
    pageHeader: phonesPageData.pageHeader,
    search: phonesPageData.search,
    filters: phonesPageData.filters,
    emptyState: phonesPageData.emptyState,
    loadingSkeletonCount: 12
  };

  return (
    <ProductPageProvider 
      category="phones"
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
          
          <ProductPage.ContentSections>
            <PhonesTechReviews />
            <PhonesBuyingGuides />
            <PhonesTips />
          </ProductPage.ContentSections>
        </ProductPage.Container>
        
        <ProductPage.Newsletter />
      </ProductPage.Background>
    </ProductPageProvider>
  );
}
