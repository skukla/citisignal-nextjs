import { ReadonlyURLSearchParams } from 'next/navigation';

// Legacy filter format - kept for backward compatibility
interface FilterInput {
  attribute?: string;
  in?: string[];
  eq?: string;
  range?: {
    from?: number;
    to?: number;
  };
}

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

/**
 * Parse filter parameters from URL search params (legacy format)
 * @deprecated Use parsePageFilterFromParams or parseProductFilterFromParams instead
 */
export function parseFiltersFromParams(searchParams: ReadonlyURLSearchParams): FilterInput[] {
  const filters: FilterInput[] = [];
  
  // Parse category filter
  const category = searchParams.get('category');
  if (category) {
    filters.push({
      attribute: 'category_uid',
      eq: category
    });
  }
  
  // Parse price range filter
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  if (minPrice || maxPrice) {
    filters.push({
      attribute: 'price',
      range: {
        from: minPrice ? parseFloat(minPrice) : undefined,
        to: maxPrice ? parseFloat(maxPrice) : undefined
      }
    });
  }
  
  // Parse color filter
  const colors = searchParams.getAll('color');
  if (colors.length > 0) {
    filters.push({
      attribute: 'color',
      in: colors
    });
  }
  
  // Parse size filter
  const sizes = searchParams.getAll('size');
  if (sizes.length > 0) {
    filters.push({
      attribute: 'size',
      in: sizes
    });
  }
  
  // Parse brand filter
  const brands = searchParams.getAll('brand');
  if (brands.length > 0) {
    filters.push({
      attribute: 'brand',
      in: brands
    });
  }
  
  return filters;
}

/**
 * Parse page filter parameters from URL search params
 * Used for page-level resolvers (category doesn't come from filter)
 */
export function parsePageFilterFromParams(searchParams: ReadonlyURLSearchParams): PageFilter | undefined {
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
export function parseProductFilterFromParams(searchParams: ReadonlyURLSearchParams): ProductFilter | undefined {
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
    direction: direction === 'desc' ? 'DESC' : 'ASC'
  };
}

/**
 * Build URL search params from filters and sort (legacy format)
 * @deprecated Use buildSearchParamsFromPageFilter or buildSearchParamsFromProductFilter instead
 */
export function buildSearchParams(filters: FilterInput[], sort?: SortInput): URLSearchParams {
  const params = new URLSearchParams();
  
  // Add filters to params
  filters.forEach(filter => {
    if (filter.attribute === 'category_uid' && filter.eq) {
      params.set('category', filter.eq);
    } else if (filter.attribute === 'price' && filter.range) {
      if (filter.range.from) params.set('minPrice', filter.range.from.toString());
      if (filter.range.to) params.set('maxPrice', filter.range.to.toString());
    } else if (filter.in) {
      filter.in.forEach(value => {
        params.append(filter.attribute || '', value);
      });
    }
  });
  
  // Add sort to params
  if (sort) {
    const direction = sort.direction === 'DESC' ? 'desc' : 'asc';
    params.set('sort', `${sort.attribute}_${direction}`);
  }
  
  return params;
}

/**
 * Build URL search params from page filter and sort
 */
export function buildSearchParamsFromPageFilter(filter?: PageFilter, sort?: SortInput): URLSearchParams {
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
      filter.memory.forEach(m => params.append('memory', m));
    }
    
    // Add color options
    if (filter.colors) {
      filter.colors.forEach(c => params.append('color', c));
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
export function buildSearchParamsFromProductFilter(filter?: ProductFilter, sort?: SortInput): URLSearchParams {
  const params = buildSearchParamsFromPageFilter(filter, sort);
  
  // Add category if present
  if (filter?.category) {
    params.set('category', filter.category);
  }
  
  return params;
}