import { ReadonlyURLSearchParams } from 'next/navigation';

// REMOVED: Legacy FilterInput interface - no longer used after deprecation cleanup

// New page filter format - used by page-level resolvers
interface PageFilter {
  manufacturer?: string;
  memory?: string[];
  colors?: string[];
  priceMin?: number;
  priceMax?: number;
  onSaleOnly?: boolean;
}

// Product filter format - used by standalone queries
interface ProductFilter extends PageFilter {
  category?: string;
}

interface SortInput {
  attribute?: string;
  direction?: 'ASC' | 'DESC';
}

// REMOVED: parseFiltersFromParams - deprecated function replaced by parseFiltersFromURL

/**
 * Parse page filter parameters from URL search params
 * Used for page-level resolvers (category doesn't come from filter)
 */
export function parsePageFilterFromParams(
  searchParams: ReadonlyURLSearchParams
): PageFilter | undefined {
  const filter: PageFilter = {};
  let hasFilters = false;

  // Parse manufacturer/brand filter
  const manufacturer = searchParams.get('manufacturer') || searchParams.get('brand');
  if (manufacturer) {
    filter.manufacturer = manufacturer;
    hasFilters = true;
  }

  // Parse price range filter
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  if (minPrice) {
    filter.priceMin = parseFloat(minPrice);
    hasFilters = true;
  }
  if (maxPrice) {
    filter.priceMax = parseFloat(maxPrice);
    hasFilters = true;
  }

  // Parse memory filter
  const memory = searchParams.getAll('memory');
  if (memory.length > 0) {
    filter.memory = memory;
    hasFilters = true;
  }

  // Parse color filter
  const colors = searchParams.getAll('color');
  if (colors.length > 0) {
    filter.colors = colors;
    hasFilters = true;
  }

  // Parse on sale filter
  const onSale = searchParams.get('onSale');
  if (onSale === 'true') {
    filter.onSaleOnly = true;
    hasFilters = true;
  }

  return hasFilters ? filter : undefined;
}

/**
 * Parse product filter parameters from URL search params
 * Used for standalone product queries (includes category)
 */
export function parseProductFilterFromParams(
  searchParams: ReadonlyURLSearchParams
): ProductFilter | undefined {
  const pageFilter = parsePageFilterFromParams(searchParams);
  const category = searchParams.get('category');

  if (!pageFilter && !category) {
    return undefined;
  }

  const filter: ProductFilter = pageFilter || {};
  if (category) {
    filter.category = category;
  }

  return filter;
}

/**
 * Parse sort parameters from URL search params
 */
export function parseSortFromParams(searchParams: ReadonlyURLSearchParams): SortInput | undefined {
  const sort = searchParams.get('sort');
  if (!sort) return undefined;

  // Parse sort format like "price_asc" or "name_desc"
  const [attribute, direction] = sort.split('_');

  if (!attribute) return undefined;

  return {
    attribute,
    direction: direction === 'desc' ? 'DESC' : 'ASC',
  };
}

// REMOVED: buildSearchParams - deprecated function replaced by buildSearchParamsFromPageFilter/buildSearchParamsFromProductFilter

/**
 * Build URL search params from page filter and sort
 */
export function buildSearchParamsFromPageFilter(
  filter?: PageFilter,
  sort?: SortInput
): URLSearchParams {
  const params = new URLSearchParams();

  if (filter) {
    // Add manufacturer/brand
    if (filter.manufacturer) {
      params.set('manufacturer', filter.manufacturer);
    }

    // Add price range
    if (filter.priceMin !== undefined) {
      params.set('minPrice', filter.priceMin.toString());
    }
    if (filter.priceMax !== undefined) {
      params.set('maxPrice', filter.priceMax.toString());
    }

    // Add memory options
    if (filter.memory) {
      filter.memory.forEach((m) => params.append('memory', m));
    }

    // Add color options
    if (filter.colors) {
      filter.colors.forEach((c) => params.append('color', c));
    }

    // Add on sale filter
    if (filter.onSaleOnly) {
      params.set('onSale', 'true');
    }
  }

  // Add sort to params
  if (sort) {
    const direction = sort.direction === 'DESC' ? 'desc' : 'asc';
    params.set('sort', `${sort.attribute}_${direction}`);
  }

  return params;
}

/**
 * Build URL search params from product filter and sort
 */
export function buildSearchParamsFromProductFilter(
  filter?: ProductFilter,
  sort?: SortInput
): URLSearchParams {
  const params = buildSearchParamsFromPageFilter(filter, sort);

  // Add category if present
  if (filter?.category) {
    params.set('category', filter.category);
  }

  return params;
}

// =============================================================================
// UNIFIED FILTER PARSING - New simplified approach
// =============================================================================

/**
 * Unified filter parsing that handles both page and product contexts
 * Replaces the multiple deprecated functions with a single, clear approach
 */
export function parseFiltersFromURL(
  searchParams: ReadonlyURLSearchParams,
  mode: 'page' | 'product' = 'page'
): (PageFilter | ProductFilter) | undefined {
  const filter: Record<string, unknown> = {};
  let hasFilters = false;

  // Parse manufacturer/brand filter
  const manufacturer = searchParams.get('manufacturer') || searchParams.get('brand');
  if (manufacturer) {
    filter.manufacturer = manufacturer;
    hasFilters = true;
  }

  // Parse price range filter
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  if (minPrice) {
    filter.priceMin = parseFloat(minPrice);
    hasFilters = true;
  }
  if (maxPrice) {
    filter.priceMax = parseFloat(maxPrice);
    hasFilters = true;
  }

  // Parse memory filter
  const memory = searchParams.getAll('memory');
  if (memory.length > 0) {
    filter.memory = memory;
    hasFilters = true;
  }

  // Parse color filter
  const colors = searchParams.getAll('color');
  if (colors.length > 0) {
    filter.colors = colors;
    hasFilters = true;
  }

  // Parse on sale filter
  const onSale = searchParams.get('onSale');
  if (onSale === 'true') {
    filter.onSaleOnly = true;
    hasFilters = true;
  }

  // For product mode, include category
  if (mode === 'product') {
    const category = searchParams.get('category');
    if (category) {
      filter.category = category;
      hasFilters = true;
    }
  }

  return hasFilters ? filter : undefined;
}

/**
 * Unified sort parsing function
 * Replaces the scattered sort parsing logic
 */
export function parseSortFromURL(searchParams: ReadonlyURLSearchParams): SortInput | undefined {
  const sortParam = searchParams.get('sort');
  if (!sortParam) return undefined;

  // Parse format: "attribute_direction" (e.g., "price_desc", "name_asc")
  const [attribute, direction] = sortParam.toLowerCase().split('_');

  // Map attribute names
  const attributeMap: Record<string, string> = {
    price: 'PRICE',
    name: 'NAME',
    relevance: 'RELEVANCE',
  };

  const mappedAttribute = attributeMap[attribute];
  if (!mappedAttribute) return undefined;

  return {
    attribute: mappedAttribute,
    direction: direction?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
  } as SortInput;
}
