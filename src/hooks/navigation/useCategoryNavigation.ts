'use client';

import useSWR from 'swr';
import GetCategoryNavigationQuery from '@/graphql/queries/GetCategoryNavigation.graphql';
import { graphqlFetcher } from '@/lib/graphql-fetcher';
import { graphqlFetcherWithTracking } from '@/lib/graphql-fetcher-with-tracking';

interface NavItem {
  href: string;
  label: string;
  category?: string;
}

interface FooterNavItem {
  href: string;
  label: string;
}

interface CategoryNavigationResult {
  headerNav: NavItem[];
  footerNav: FooterNavItem[];
}

interface CategoryNavigationResponse {
  Citisignal_categoryNavigation: CategoryNavigationResult;
}

interface UseCategoryNavigationOptions {
  rootCategoryId?: string;
  includeInactive?: boolean;
  enabled?: boolean;  // Whether to fetch data
}

/**
 * Hook to fetch category navigation tree from Commerce API
 * 
 * @param options - Configuration options
 * @returns SWR response with category navigation data
 * 
 * @example
 * ```tsx
 * const { data, error, isLoading } = useCategoryNavigation();
 * 
 * if (isLoading) return <Skeleton />;
 * if (error) return <Error />;
 * 
 * return (
 *   <Navigation>
 *     {data.items.map(category => (
 *       <NavItem key={category.id} href={category.urlPath}>
 *         {category.name}
 *       </NavItem>
 *     ))}
 *   </Navigation>
 * );
 * ```
 */
export function useCategoryNavigation(options: UseCategoryNavigationOptions = {}) {
  const {
    rootCategoryId,
    includeInactive = false,
    enabled = true
  } = options;

  const variables = {
    rootCategoryId,
    includeInactive
  };
  
  // Use tracking fetcher if Demo Inspector might be enabled
  const fetcher = typeof window !== 'undefined' ? graphqlFetcherWithTracking : graphqlFetcher;

  const { data, error, mutate } = useSWR<CategoryNavigationResponse>(
    enabled ? ['Citisignal_categoryNavigation', variables] : null,
    () => fetcher<CategoryNavigationResponse>(
      GetCategoryNavigationQuery,
      variables
    ),
    {
      // Categories change rarely, cache for 1 hour
      dedupingInterval: 3600000,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      // Keep previous data while revalidating
      keepPreviousData: true
    }
  );

  return {
    data: data?.Citisignal_categoryNavigation || null,
    error,
    loading: !data && !error,
    mutate
  };
}