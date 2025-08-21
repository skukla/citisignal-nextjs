import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import type { SortInput } from '@/hooks/products/useProductCards';

/**
 * Hook to manage URL parameters for product pages.
 * Handles all major filtering and sorting operations via URL state.
 *
 * This creates shareable, bookmarkable URLs for filtered views.
 */

// Sort options for dropdown
export const SORT_OPTIONS = [
  { value: 'RELEVANCE', label: 'Best Match', direction: 'DESC' as const },
  { value: 'PRICE_ASC', label: 'Price: Low to High', direction: 'ASC' as const },
  { value: 'PRICE_DESC', label: 'Price: High to Low', direction: 'DESC' as const },
  { value: 'NAME_ASC', label: 'Name: A to Z', direction: 'ASC' as const },
  { value: 'NAME_DESC', label: 'Name: Z to A', direction: 'DESC' as const },
] as const;

// Parse sort string from URL parameter (e.g., 'PRICE_ASC' -> { attribute: 'PRICE', direction: 'ASC' })
function parseSortString(sortString: string): SortInput | undefined {
  if (!sortString || sortString === 'RELEVANCE') {
    return { attribute: 'RELEVANCE', direction: 'DESC' };
  }

  // Handle format like PRICE_ASC, NAME_DESC
  const parts = sortString.split('_');
  if (parts.length === 2) {
    const [attribute, direction] = parts;
    return {
      attribute: attribute as SortInput['attribute'],
      direction: direction as SortInput['direction'],
    };
  }

  return undefined;
}

interface ProductPageParams {
  // Search and filtering
  search?: string;
  category?: string;
  manufacturer?: string;
  memory?: string[];
  color?: string[];
  price?: string[];

  // Sorting
  sort?: SortInput;

  // Pagination
  page?: number;
}

interface UseProductPageParamsResult extends ProductPageParams {
  // Update functions
  updateSearch: (search: string) => void;
  updateSort: (sortKey: string) => void;
  updateFilter: (
    filterKey: string,
    value: string | string[] | number | boolean,
    checked?: boolean
  ) => void;
  updatePage: (page: number) => void;
  clearFilters: () => void;

  // Helper values
  hasActiveFilters: boolean;
  filterCount: number;
  activeFilters: Record<string, string | string[] | number | boolean>;
  formattedSort: string;
}

export function useProductPageParams(): UseProductPageParamsResult {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Parse current URL parameters
  const params = useMemo((): ProductPageParams => {
    const search = searchParams.get('search') || undefined;
    const category = searchParams.get('category') || undefined;
    const manufacturer = searchParams.get('manufacturer') || undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : undefined;

    // Parse array parameters
    const memory = searchParams.get('memory')?.split(',').filter(Boolean) || undefined;
    const color = searchParams.get('color')?.split(',').filter(Boolean) || undefined;
    const price = searchParams.get('price')?.split(',').filter(Boolean) || undefined;

    // Parse sort
    const sortParam = searchParams.get('sort');
    const sort = sortParam ? parseSortString(sortParam) : undefined;

    return {
      search,
      category,
      manufacturer,
      memory,
      color,
      price,
      sort,
      page,
    };
  }, [searchParams]);

  // Generic function to update URL parameters
  const updateParams = useCallback(
    (updates: Record<string, string | string[] | number | boolean | null | undefined>) => {
      const newParams = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
          newParams.delete(key);
        } else if (Array.isArray(value)) {
          if (value.length > 0) {
            newParams.set(key, value.join(','));
          } else {
            newParams.delete(key);
          }
        } else {
          newParams.set(key, String(value));
        }
      });

      // Reset to page 1 when filters change (unless page is being updated)
      if (!('page' in updates) && newParams.get('page')) {
        newParams.delete('page');
      }

      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  // Update search query
  const updateSearch = useCallback(
    (search: string) => {
      updateParams({ search: search || undefined });
    },
    [updateParams]
  );

  // Update sort
  const updateSort = useCallback(
    (sortKey: string) => {
      // sortKey comes from the dropdown as the option value (e.g., 'PRICE_ASC')
      updateParams({ sort: sortKey || undefined });
    },
    [updateParams]
  );

  // Update page number
  const updatePage = useCallback(
    (page: number) => {
      updateParams({ page: page > 1 ? page : undefined });
    },
    [updateParams]
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  // Calculate active filter count
  const filterCount = useMemo(() => {
    let count = 0;
    if (params.search) count++;
    if (params.manufacturer) count++;
    if (params.memory?.length) count++;
    if (params.color?.length) count++;
    if (params.price?.length) count++;
    return count;
  }, [params]);

  // Build active filters for display
  const activeFilters = useMemo(() => {
    const filters: Record<string, string | string[] | number | boolean> = {};
    if (params.manufacturer) filters.manufacturer = [params.manufacturer];
    if (params.memory?.length) filters.memory = params.memory;
    if (params.color?.length) filters.color = params.color;
    if (params.price?.length) filters.price = params.price;
    return filters;
  }, [params]);

  // Format sort for display
  const formattedSort = useMemo(() => {
    if (!params.sort) return 'RELEVANCE';
    if (params.sort.attribute === 'RELEVANCE') return 'RELEVANCE';
    return `${params.sort.attribute}_${params.sort.direction}`;
  }, [params.sort]);

  // Simplified filter update that handles all types
  const updateFilter = useCallback(
    (filterKey: string, value: string | string[] | number | boolean, checked?: boolean) => {
      if (filterKey === 'manufacturer') {
        updateParams({ manufacturer: checked ? String(value) : undefined });
      } else if (filterKey === 'memory' || filterKey === 'color' || filterKey === 'price') {
        const currentValues = params[filterKey as keyof typeof params] as string[] | undefined;
        const stringValue = String(value);
        const newValues = checked
          ? [...(currentValues || []), stringValue]
          : (currentValues || []).filter((v) => v !== stringValue);
        updateParams({ [filterKey]: newValues.length > 0 ? newValues : undefined });
      }
    },
    [params, updateParams]
  );

  return {
    ...params,
    updateSearch,
    updateSort,
    updateFilter,
    updatePage,
    clearFilters,
    hasActiveFilters: filterCount > 0,
    filterCount,
    activeFilters,
    formattedSort,
  };
}
