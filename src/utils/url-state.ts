/**
 * URL state management utilities
 */

/**
 * Format a URL-friendly category key into a display name
 * @param categoryKey The category URL key (e.g., "gift-cards")
 * @returns Formatted display name (e.g., "Gift Cards")
 */
export function formatCategoryName(categoryKey: string): string {
  if (!categoryKey) return '';
  
  return categoryKey
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export interface SortOption {
  attribute: string;
  direction: 'ASC' | 'DESC';
}

/**
 * Parse sort parameter from URL
 */
export function parseSortParam(sortParam: string | null): SortOption | null {
  if (!sortParam) return null;
  
  const sortMap: Record<string, SortOption> = {
    'RELEVANCE': { attribute: 'relevance', direction: 'DESC' },
    'PRICE_LOW_TO_HIGH': { attribute: 'price', direction: 'ASC' },
    'PRICE_HIGH_TO_LOW': { attribute: 'price', direction: 'DESC' },
    'NAME_A_TO_Z': { attribute: 'name', direction: 'ASC' },
    'NAME_Z_TO_A': { attribute: 'name', direction: 'DESC' },
    'NEWEST': { attribute: 'created_at', direction: 'DESC' },
    'RATING': { attribute: 'rating', direction: 'DESC' }
  };
  
  return sortMap[sortParam] || null;
}

/**
 * Format sort option for display
 */
export function formatSortDisplay(sort: SortOption | null): string {
  if (!sort) return 'RELEVANCE';
  
  const sortKey = `${sort.attribute}_${sort.direction}`;
  const displayMap: Record<string, string> = {
    'price_ASC': 'PRICE_LOW_TO_HIGH',
    'price_DESC': 'PRICE_HIGH_TO_LOW',
    'name_ASC': 'NAME_A_TO_Z',
    'name_DESC': 'NAME_Z_TO_A',
    'created_at_DESC': 'NEWEST',
    'rating_DESC': 'RATING',
    'relevance_DESC': 'RELEVANCE'
  };
  
  return displayMap[sortKey] || 'RELEVANCE';
}

/**
 * Sync state to URL without causing navigation
 */
export function syncToUrl(params: Record<string, string | string[] | number | boolean | null | undefined>, pathname: string) {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') return;
    
    if (Array.isArray(value)) {
      value.forEach(v => searchParams.append(key, v));
    } else {
      searchParams.set(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
  
  // Update URL without navigation
  if (typeof window !== 'undefined') {
    window.history.replaceState({}, '', newUrl);
  }
}

/**
 * Build canonical URL for SEO
 */
export function buildCanonicalUrl(
  baseUrl: string,
  pathname: string,
  params?: URLSearchParams
): string {
  const url = new URL(pathname, baseUrl);
  
  // Only include important params for canonical
  const importantParams = ['category', 'page'];
  if (params) {
    importantParams.forEach(param => {
      const value = params.get(param);
      if (value) url.searchParams.set(param, value);
    });
  }
  
  return url.toString();
}