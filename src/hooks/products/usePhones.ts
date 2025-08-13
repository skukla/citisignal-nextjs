import { GET_POPULAR_PHONES, GET_ALL_PHONES } from '@/graphql/queries/products';
import { transformToPhone } from './transforms';
import { useProducts } from './useProducts';
import type { Phone } from '@/types/commerce';

/**
 * Hook to fetch popular phones
 * @param limit - Number of phones to fetch (default: 4)
 */
export function usePopularPhones(limit: number = 4) {
  const result = useProducts<Phone>({
    query: GET_POPULAR_PHONES,
    variables: { limit },
    transform: transformToPhone
  });

  return {
    phones: result.items,
    loading: result.loading,
    error: result.error,
    refetch: result.refetch,
    totalCount: result.totalCount
  };
}

/**
 * Hook to fetch all phones with pagination
 * @param pageSize - Number of phones per page (default: 20)
 * @param currentPage - Current page number (default: 1)
 */
export function useAllPhones(pageSize: number = 20, currentPage: number = 1) {
  const result = useProducts<Phone>({
    query: GET_ALL_PHONES,
    variables: { pageSize, currentPage },
    transform: transformToPhone
  });

  return {
    phones: result.items,
    loading: result.loading,
    error: result.error,
    pageInfo: result.pageInfo,
    loadMore: result.loadMore,
    totalCount: result.totalCount
  };
}