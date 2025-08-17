'use client';

import useSWR from 'swr';
import GetCategoryBreadcrumbsQuery from '@/graphql/queries/GetCategoryBreadcrumbs.graphql';
import { graphqlFetcher } from '@/lib/graphql-fetcher';

export interface BreadcrumbItem {
  categoryId?: string;
  name: string;
  urlPath: string;
  level: number;
}

interface CategoryBreadcrumbsResult {
  items: BreadcrumbItem[];
}

interface CategoryBreadcrumbsResponse {
  Citisignal_categoryBreadcrumbs: CategoryBreadcrumbsResult;
}

interface UseCategoryBreadcrumbsOptions {
  categoryUrlKey: string;
}

/**
 * Hook to fetch category breadcrumbs from Commerce API
 * 
 * @param options - Configuration options with required categoryUrlKey
 * @returns SWR response with breadcrumb data
 * 
 * @example
 * ```tsx
 * const { data, error, isLoading } = useCategoryBreadcrumbs({ 
 *   categoryUrlKey: 'electronics' 
 * });
 * 
 * if (isLoading) return <Skeleton />;
 * if (error) return <Error />;
 * 
 * return (
 *   <Breadcrumbs>
 *     {data.items.map((item, index) => (
 *       <BreadcrumbItem 
 *         key={index} 
 *         href={item.urlPath}
 *         isLast={index === data.items.length - 1}
 *       >
 *         {item.name}
 *       </BreadcrumbItem>
 *     ))}
 *   </Breadcrumbs>
 * );
 * ```
 */
export function useCategoryBreadcrumbs(options: UseCategoryBreadcrumbsOptions) {
  const { categoryUrlKey } = options;

  const variables = {
    categoryUrlKey
  };

  const { data, error, mutate } = useSWR<CategoryBreadcrumbsResponse>(
    categoryUrlKey ? ['Citisignal_categoryBreadcrumbs', variables] : null,
    () => graphqlFetcher<CategoryBreadcrumbsResponse>(
      GetCategoryBreadcrumbsQuery,
      variables
    ),
    {
      // Breadcrumbs change rarely, cache for 1 hour
      dedupingInterval: 3600000,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      // Keep previous data while revalidating
      keepPreviousData: true
    }
  );

  return {
    data: data?.Citisignal_categoryBreadcrumbs || { items: [] },
    error,
    loading: !data && !error,
    mutate
  };
}