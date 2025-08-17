import { DocumentNode } from 'graphql';
import { print } from 'graphql';

// Import tracking if available (won't break if inspector is disabled)
let trackQuery: ((query: any) => void) | undefined;
if (typeof window !== 'undefined') {
  import('@/contexts/DemoInspectorContext').then(module => {
    // This will be set up by the DemoInspector component
    (window as any).__demoInspectorTrackQuery = (query: any) => {
      // Track the query
    };
  }).catch(() => {
    // Inspector not available, that's ok
  });
}

/**
 * Enhanced GraphQL fetcher that tracks data sources
 * Works seamlessly whether inspector is enabled or not
 */
export async function graphqlFetcherWithTracking<T = any>(
  query: DocumentNode | string,
  variables?: Record<string, any>
): Promise<T> {
  // Convert DocumentNode to string if needed
  const queryString = typeof query === 'string' ? query : print(query);
  
  // Extract query name for tracking
  const queryNameMatch = queryString.match(/query\s+(\w+)/);
  const queryName = queryNameMatch ? queryNameMatch[1] : 'Anonymous';
  
  const startTime = performance.now();
  
  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: queryString,
      variables,
    }),
  });

  const json = await response.json();
  const endTime = performance.now();

  // Handle GraphQL errors but ignore mesh validation errors that don't affect data
  if (json.errors) {
    const realErrors = json.errors.filter((err: any) => {
      // Filter out mesh validation errors that don't prevent data from being returned
      return !err.message?.includes('Unknown type \'_Any\'') && 
             !err.message?.includes('Field \'_entities\'');
    });
    
    if (realErrors.length > 0) {
      throw new Error(realErrors[0].message);
    }
  }

  // Track the query and its data if inspector is available
  if (typeof window !== 'undefined') {
    // Determine source based on query name and response structure
    let source: 'commerce' | 'catalog' | 'search' = 'commerce';
    
    // Analyze the response to determine source
    if (json.data) {
      // Product queries typically come from catalog
      if (json.data.Citisignal_productCards || json.data.products || queryName.includes('Product')) {
        source = 'catalog';
      }
      // Facet/filter queries come from search
      else if (json.data.Citisignal_productFacets || json.data.facets || queryName.includes('Facet') || queryName.includes('Search')) {
        source = 'search';
      }
      // Navigation, categories, store config come from commerce
      else if (json.data.categories || json.data.storeConfig || json.data.navigation) {
        source = 'commerce';
      }
    }
    
    // Store the response data with source attribution
    if ((window as any).__demoInspectorStoreData) {
      (window as any).__demoInspectorStoreData({
        queryName,
        source,
        data: json.data,
        timestamp: Date.now()
      });
    }
    
    // Track the query
    if ((window as any).__demoInspectorTrackQuery) {
      (window as any).__demoInspectorTrackQuery({
        id: `${queryName}-${Date.now()}`,
        name: queryName,
        source,
        timestamp: Date.now(),
        responseTime: Math.round(endTime - startTime)
      });
    }
  }

  return json.data;
}