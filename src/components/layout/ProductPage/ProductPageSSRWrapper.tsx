import { ReactNode } from 'react';
import { fetchCategoryPageData } from '@/hooks/products/useCategoryPageData';
import { ProductPageProvider } from './providers/ProductPageProvider';
import type { PageData } from './types';

interface ProductPageSSRWrapperProps {
  category: string;
  pageData: PageData;
  children: ReactNode;
  pageSize?: number;
  currentPage?: number;
}

/**
 * ProductPageSSRWrapper - Server Component for SSR Data Fetching
 * 
 * This server component fetches all category page data in a single query
 * and passes it to the client-side provider for hydration.
 * 
 * Benefits:
 * - Single API call instead of multiple
 * - Complete HTML from server (better SEO)
 * - No loading states on initial render
 * - Faster perceived performance
 */
export default async function ProductPageSSRWrapper({
  category,
  pageData,
  children,
  pageSize = 24,
  currentPage = 1
}: ProductPageSSRWrapperProps) {
  // Fetch all data server-side using the unified query
  let initialData;
  
  try {
    initialData = await fetchCategoryPageData({
      category,
      pageSize,
      currentPage
    });
  } catch (error) {
    // If SSR fetch fails, fall back to client-side fetching
    console.error('SSR data fetch failed, falling back to client-side:', error);
    initialData = undefined;
  }
  
  // Pass the SSR data to the enhanced provider
  return (
    <ProductPageProvider
      category={category}
      pageData={pageData}
      initialData={initialData}
      limit={pageSize}
    >
      {children}
    </ProductPageProvider>
  );
}