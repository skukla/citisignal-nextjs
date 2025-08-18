/**
 * Filter utility functions for converting between different filter formats
 */

export interface FrontendFilter {
  manufacturer?: string;
  memory?: string[];
  colors?: string[];
  priceMin?: number;
  priceMax?: number;
  category?: string;
}

export interface ServiceFilter {
  attribute: string;
  eq?: string;
  in?: string[];
  from?: number;
  to?: number;
}

/**
 * Convert frontend filter format to service filter format
 */
export function convertToServiceFilter(filter: FrontendFilter): ServiceFilter[] {
  const serviceFilters: ServiceFilter[] = [];
  
  if (filter.category) {
    serviceFilters.push({
      attribute: 'category_uid',
      eq: filter.category
    });
  }
  
  if (filter.manufacturer) {
    serviceFilters.push({
      attribute: 'manufacturer',
      eq: filter.manufacturer
    });
  }
  
  if (filter.memory?.length) {
    serviceFilters.push({
      attribute: 'memory',
      in: filter.memory
    });
  }
  
  if (filter.colors?.length) {
    serviceFilters.push({
      attribute: 'color',
      in: filter.colors
    });
  }
  
  if (filter.priceMin || filter.priceMax) {
    serviceFilters.push({
      attribute: 'price',
      from: filter.priceMin,
      to: filter.priceMax
    });
  }
  
  return serviceFilters;
}

/**
 * Merge multiple filter objects
 */
export function mergeFilters(...filters: FrontendFilter[]): FrontendFilter {
  return filters.reduce((merged, filter) => ({
    ...merged,
    ...filter,
    // Merge arrays properly
    memory: [...(merged.memory || []), ...(filter.memory || [])],
    colors: [...(merged.colors || []), ...(filter.colors || [])]
  }), {});
}

/**
 * Parse URL query string into filter object
 */
export function parseUrlFilters(searchParams: URLSearchParams): FrontendFilter {
  const filter: FrontendFilter = {};
  
  const manufacturer = searchParams.get('manufacturer');
  if (manufacturer) filter.manufacturer = manufacturer;
  
  const memory = searchParams.getAll('memory');
  if (memory.length) filter.memory = memory;
  
  const colors = searchParams.getAll('colors');
  if (colors.length) filter.colors = colors;
  
  const priceMin = searchParams.get('priceMin');
  if (priceMin) filter.priceMin = parseFloat(priceMin);
  
  const priceMax = searchParams.get('priceMax');
  if (priceMax) filter.priceMax = parseFloat(priceMax);
  
  return filter;
}

/**
 * Build URL query string from filter object
 */
export function buildFilterQueryString(filter: FrontendFilter): string {
  const params = new URLSearchParams();
  
  if (filter.manufacturer) params.set('manufacturer', filter.manufacturer);
  if (filter.memory?.length) {
    filter.memory.forEach(m => params.append('memory', m));
  }
  if (filter.colors?.length) {
    filter.colors.forEach(c => params.append('colors', c));
  }
  if (filter.priceMin) params.set('priceMin', filter.priceMin.toString());
  if (filter.priceMax) params.set('priceMax', filter.priceMax.toString());
  
  return params.toString();
}