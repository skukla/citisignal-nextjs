import useSWR from 'swr';
import { graphqlFetcher } from '@/lib/graphql-fetcher';
import GET_PRODUCT_DETAIL from '@/graphql/queries/GetProductDetail.graphql';
import type { ProductDetail } from '@/types/commerce';

export interface ProductDetailResult {
  product: ProductDetail | null;
  loading: boolean;
  error?: Error;
  isValidating: boolean;
}

interface UseProductDetailOptions {
  urlKey: string | null;
}

/**
 * Fetches detailed product information for Product Detail Pages.
 * Uses SWR for caching and revalidation following established patterns.
 *
 * @param options Configuration object with product URL key
 * @returns Product detail data with loading and error states
 *
 * @example
 * ```tsx
 * const { product, loading, error } = useProductDetail({
 *   urlKey: 'iphone-15-pro-256gb'
 * });
 * ```
 */
export function useProductDetail(options: UseProductDetailOptions): ProductDetailResult {
  const { urlKey } = options;

  // Create cache key - null disables the query
  const key = urlKey ? ['productDetail', urlKey] : null;

  // Fetch product detail data
  const { data, error, isLoading, isValidating } = useSWR(
    key,
    () => graphqlFetcher(GET_PRODUCT_DETAIL, { urlKey }),
    {
      revalidateOnFocus: false,
      // Cache for 5 minutes since product details don't change frequently
      dedupingInterval: 5 * 60 * 1000,
    }
  );

  // Extract product from GraphQL response
  const product =
    data && typeof data === 'object' && data !== null && 'Citisignal_productDetail' in data
      ? (data as { Citisignal_productDetail?: ProductDetail }).Citisignal_productDetail || null
      : null;

  return {
    product,
    loading: isLoading,
    error,
    isValidating,
  };
}
