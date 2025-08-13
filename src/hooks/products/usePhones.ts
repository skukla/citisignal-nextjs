import GET_PHONES_FOR_CARDS from '@/graphql/queries/GetPhonesForCards.graphql';
import GET_POPULAR_PHONES_FOR_CARDS from '@/graphql/queries/GetPopularPhonesForCards.graphql';
// Full detail queries can be imported when needed for product detail pages
// import GET_ALL_PHONES from '@/graphql/queries/GetAllPhones.graphql';
// import GET_POPULAR_PHONES from '@/graphql/queries/GetPopularPhones.graphql';
import { transformToPhone } from './transforms';
import { useProducts } from './useProducts';
import type { Phone } from '@/types/commerce';

/**
 * Hook to fetch popular phones
 * @param limit - Number of phones to fetch (default: 4)
 */
export function usePopularPhones(limit: number = 4) {
  const result = useProducts<Phone>({
    query: GET_POPULAR_PHONES_FOR_CARDS,
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
    query: GET_PHONES_FOR_CARDS,
    variables: { pageSize, currentPage },
    transform: transformToPhone,
    enablePagination: true  // Enable load more functionality
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