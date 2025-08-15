'use client';

import { ProductPage, ProductPageProvider } from '@/components/layout/ProductPage';
import { accessoriesPageData } from '@/data/route-groups/products/accessories';

export default function AccessoriesPage() {
  // Extract page data for the provider
  const pageData = {
    breadcrumbs: accessoriesPageData.breadcrumbs,
    pageHeader: accessoriesPageData.pageHeader,
    search: accessoriesPageData.search,
    filters: accessoriesPageData.filters,
    emptyState: accessoriesPageData.emptyState,
    loadingSkeletonCount: 12
  };

  return (
    <ProductPageProvider 
      category="accessories"
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