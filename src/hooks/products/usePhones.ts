import { useProductCards } from './useProductCards';
import type { Phone } from '@/types/commerce';

/**
 * Hook to fetch popular phones with infinite loading
 * @param limit - Number of phones to fetch per page (default: 4)
 */
export function usePopularPhones(limit: number = 4) {
  const result = useProductCards({
    filter: {
      category: 'phones',
      onSaleOnly: true // Popular phones are those on sale
    },
    limit
  });

  return {
    phones: result.items as Phone[],
    loading: result.loading,
    error: result.error,
    hasMoreItems: result.hasMoreItems,
    loadMore: result.loadMore,
    totalCount: result.totalCount
  };
}

/**
 * Hook to fetch all phones with infinite loading
 * @param limit - Number of phones to fetch per page (default: 20)
 */
export function useAllPhones(limit: number = 20) {
  const result = useProductCards({
    filter: {
      category: 'phones'
    },
    limit
  });

  return {
    phones: result.items as Phone[],
    loading: result.loading,
    error: result.error,
    hasMoreItems: result.hasMoreItems,
    loadMore: result.loadMore,
    totalCount: result.totalCount
  };
}