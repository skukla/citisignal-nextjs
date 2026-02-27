# Unified Query Architecture

## Overview

The Unified Query Architecture consolidates multiple GraphQL queries into comprehensive queries that fetch all data needed for a page in optimal round trips. This approach significantly improves performance, simplifies data management, and provides flexibility between SSR and client-side rendering strategies.

## Architecture Overview

### Problem Statement

Traditional multi-query approaches suffer from:

- Multiple network round trips causing waterfall loading
- Complex loading state management across queries
- Difficult error handling and recovery
- Poor performance metrics, especially on slow connections
- Challenging SSR implementation

### Solution: Unified Query Pattern

```typescript
// ✅ Unified approach - comprehensive data in minimal queries
const { data, loading, error } = useProductPageData({
  category: 'phones',
  filters: { brand: ['Apple'] },
});

// All data available at once
const { products, facets, breadcrumbs, navigation, pageInfo } = data;
```

## Query Modes

### Single Query Mode (Unified)

Uses Adobe API Mesh's `Citisignal_categoryPageData` resolver to fetch all page data in one request:

- **Navigation**: Header and footer menus
- **Products**: Listings with pagination
- **Facets**: Dynamic filter options
- **Breadcrumbs**: Category trail
- **Page Info**: Metadata and totals

**Benefits:**

- 75% fewer queries on initial load
- ~200-300ms faster initial render
- Ideal for SSR and slow connections
- Lower server load

### Multiple Query Mode (Focused)

Uses specialized resolvers for granular control:

- `Citisignal_productCards` - Product listings
- `Citisignal_productFacets` - Filter options
- `Citisignal_categoryNavigation` - Navigation
- `Citisignal_categoryBreadcrumbs` - Breadcrumbs

**Benefits:**

- Better caching granularity
- Flexible incremental updates
- Optimized for client-side apps
- Independent query invalidation

## Implementation Strategy

### Query Lifecycle

```typescript
// 1. Initial Load - Use unified query for performance
const useUnifiedQuery = singleQueryMode && !userHasInteracted;

// 2. User Interactions - Switch to focused queries
useEffect(() => {
  if (filtersChanged || sortChanged) {
    setUserHasInteracted(true);
  }
}, [filters, sort]);

// 3. Prevent unnecessary queries with null
const unifiedData = useCategoryPageData(
  useUnifiedQuery ? variables : null // null prevents SWR from creating a key
);
```

### Query Optimization

#### SWR Key Management

```typescript
export function useCategoryPageData(variables: CategoryPageDataVariables | null) {
  // null variables = null key = no query
  const key = variables ? [GET_CATEGORY_PAGE_DATA, variables] : null;

  return useSWR(key, key ? ([query, vars]) => fetcher(query, vars) : null);
}
```

#### Performance Gains

**Sequential client calls**: 200ms + 150ms + 180ms + 100ms = 630ms total  
**Unified parallel query**: ~250ms total (60% reduction)

### State Management

#### Filter State Architecture

```typescript
interface FilterState {
  // URL state for user selections
  urlState: {
    manufacturer: string[];
    memory: string[];
    search: string;
    sort: SortOption;
  };

  // Unified query format
  unifiedFilter: {
    facets: Record<string, any>;
    onSaleOnly?: boolean;
  };

  // Individual query format
  productFilter: {
    manufacturer?: string;
    memory?: string[];
    facets?: JSON;
  };
}
```

#### State Synchronization

1. **URL → State**: Parse URL parameters into filter state
2. **State → Queries**: Transform state for appropriate query format
3. **Response → UI**: Update components with fetched data
4. **UI → URL**: User interactions update URL state

## Adobe API Mesh Integration

### Resolver Architecture

The mesh orchestrates multiple backend services:

```javascript
// category-page.js resolver
const executeUnifiedQuery = async (context, args) => {
  const promises = [
    // Commerce Core: Navigation and categories
    context.CommerceGraphQL.Query.Commerce_categoryList(),

    // Catalog Service or Live Search: Products
    useSearch
      ? context.LiveSearchSandbox.Query.Search_productSearch()
      : context.CatalogServiceSandbox.Query.Catalog_productSearch(),

    // Category-specific data
    getCategoryDetails(context, args.categoryUrlKey),
  ];

  const results = await Promise.all(promises);
  return assemblePageResponse(results);
};
```

### Service Selection Logic

- **Search queries**: Use Live Search for AI-powered relevance
- **Category browsing**: Use Catalog Service for complete data
- **Facets**: Contextual based on current filters
- **Navigation**: Always from Commerce Core

## SSR Migration Path

### Current Client-Side Implementation

```typescript
export function ProductPageProvider({ category }: Props) {
  // Client-side data fetching
  const data = useProductPageData({ category });
  return <ProductPageContext.Provider value={data} />;
}
```

### Future SSR Implementation

```typescript
// Server-side data fetching
export async function getServerSideProps({ params }) {
  const data = await fetchCategoryPageData({
    category: params.category
  });

  return { props: { initialData: data } };
}

// Client hydration
export function ProductPageProvider({ category, initialData }: Props) {
  const data = useProductPageData(
    { category },
    { fallbackData: initialData }  // SWR hydration
  );
  return <ProductPageContext.Provider value={data} />;
}
```

## Performance Considerations

### Initial Load Optimization

1. **Unified Query**: Reduces round trips, parallel backend processing
2. **Field Selection**: Request only needed fields
3. **Pagination**: Reasonable default page sizes (20-24 items)
4. **Caching**: SWR deduplication and revalidation

### Interaction Optimization

1. **Focused Queries**: Update only what changed
2. **Optimistic Updates**: Immediate UI feedback
3. **Debouncing**: 500ms for search inputs
4. **Stale-While-Revalidate**: Show cached data during updates

### Memory Management

```typescript
// Prevent memory leaks with proper cleanup
useEffect(() => {
  return () => {
    // Cleanup subscriptions, timers, etc.
  };
}, []);
```

## Troubleshooting

### Common Issues

#### Queries Not Switching Modes

- Check `userHasInteracted` state
- Ensure page refresh after mode change

#### Unnecessary Query Execution

- Verify using `null` not `{}` for disabled queries
- Check SWR key generation logic
- Monitor network tab for duplicate requests

#### Performance Degradation

- Review query complexity
- Check for N+1 query patterns
- Verify caching headers
- Monitor bundle size

### Debug Utilities

```typescript
// Enable query logging
if (process.env.NODE_ENV === 'development') {
  console.log('Query Mode:', useUnifiedQuery ? 'UNIFIED' : 'FOCUSED');
  console.log('Active Queries:', getActiveQueries());
}
```

## Best Practices

1. **Use unified queries for initial loads** - Optimal performance
2. **Switch to focused queries for interactions** - Better caching
3. **Implement proper error boundaries** - Graceful degradation
4. **Monitor performance metrics** - Track improvements
5. **Test with slow connections** - Validate optimization benefits

## Related Documentation

- [Performance and Loading Guide](../guides/performance-and-loading.md)
- [API Integration](../guides/api-integration.md)
- [SSR Implementation](../guides/ssr-implementation.md)
