import { ReadonlyURLSearchParams } from 'next/navigation';

interface FilterInput {
  attribute?: string;
  in?: string[];
  eq?: string;
  range?: {
    from?: number;
    to?: number;
  };
}

interface SortInput {
  attribute?: string;
  direction?: 'ASC' | 'DESC';
}

/**
 * Parse filter parameters from URL search params
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
 * Build URL search params from filters and sort
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