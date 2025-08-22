# Client-Side State Management Architecture

## Current Implementation

This project uses a **client-side state management approach** with URL-based persistence for critical commerce state. This provides an optimal balance between user experience, performance, and SEO requirements.

## Architecture Overview

### State Management Layers

1. **URL State** - Persistent state managed via URL parameters
   - Product filters (category, manufacturer, price range)
   - Search queries
   - Sort options
   - Pagination
   - Managed by: `useProductPageParams` hook

2. **Component State** - Local React state for UI interactions
   - Loading states
   - Form inputs
   - Modal/dropdown visibility
   - Managed by: React Context API and local state

3. **Data State** - Server data cached client-side
   - Product listings
   - Facets/filters
   - Category navigation
   - Managed by: SWR for caching and revalidation

## Implementation Details

### URL State Management

The `useProductPageParams` hook (`/src/components/layout/ProductPage/hooks/useProductPageParams.ts`) manages all URL-based state:

```typescript
export function useProductPageParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Parse current URL state
  const urlState = {
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || '',
    filters: parseFiltersFromURL(searchParams),
    // ... other params
  };

  // Update functions preserve other params
  const setSearch = (search: string) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { urlState, setSearch, setSort, setFilters, clearFilters };
}
```

### Data Fetching Strategy

**Three-Tier Query System:**

1. **Unified Query** (Initial Load)
   - Single `GetCategoryPageData` query
   - Returns products + facets + metadata
   - Used for first page load and SSR preparation

2. **Consolidated Queries** (After Interaction)
   - Separate `GetProductCards` and `GetProductFacets`
   - Run in parallel for performance
   - Allows independent caching strategies

3. **Individual Updates** (Optimized)
   - Sort changes only refetch products
   - Filter changes refetch both (contextual facets)
   - SWR deduplication prevents unnecessary requests

### Client-Side GraphQL Integration

All GraphQL queries go through a local API route (`/src/app/api/graphql/route.ts`):

```typescript
export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(process.env.MESH_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.MESH_API_KEY!,
      // Adobe-specific headers
      Store: 'default',
      'Magento-Store-View-Code': 'default',
    },
    body: JSON.stringify(body),
  });

  return response;
}
```

## Benefits of Current Approach

### User Experience

- **Instant interactions** - No network latency for UI state changes
- **Smooth animations** - Full control over transitions and loading states
- **Optimistic updates** - Show changes immediately, sync with server
- **Progressive enhancement** - Works without JavaScript for SEO

### Performance

- **Smart caching** - SWR handles deduplication and background updates
- **Parallel queries** - Products and facets load simultaneously
- **Selective updates** - Only refetch what changed
- **Client-side filtering** - Option for instant filter preview

### Developer Experience

- **Simple mental model** - Standard React patterns
- **Type safety** - Full TypeScript support
- **Debugging** - Browser DevTools for state inspection
- **Testing** - Standard React testing approaches

## Trade-offs and Considerations

### Current Limitations

1. **Initial bundle size** - Includes SWR and GraphQL client code
2. **Hydration complexity** - Must handle SSR/CSR differences
3. **State synchronization** - URL must stay in sync with UI

### When to Consider Server-Side State

- **Large catalogs** (100K+ products) - Server filtering more efficient
- **Complex business logic** - Keep sensitive logic server-side
- **Multi-region deployment** - Edge computing benefits
- **Strict SEO requirements** - Full server-side rendering

## Best Practices

### URL Parameter Design

```
/phones?search=iphone&manufacturer=apple&sort=price-asc&page=2
```

- Use descriptive parameter names
- Keep URLs readable and shareable
- Implement canonical URLs for SEO

### Loading State Coordination

```typescript
const pageLoadingState = usePageLoading({
  productsLoading: products.loading,
  facetsLoading: facets.loading,
  searchQuery: urlState.search,
  sortBy: urlState.sort,
  activeFilters: urlState.filters,
});
```

### Cache Management

```typescript
// Configure SWR for optimal caching
const swrConfig = {
  dedupingInterval: 3600000, // 1 hour for categories
  revalidateOnFocus: false, // Don't refetch on tab focus
  keepPreviousData: true, // Show stale while revalidating
};
```

## Migration Path

### To Full Server-Side State

If requirements change, migration path:

1. **Move filter logic to API mesh**
   - Implement filter parsing in resolvers
   - Handle all transformations server-side

2. **Convert to Server Components**
   - Use Next.js App Router RSC
   - Fetch data in server components

3. **Implement edge caching**
   - Cache filtered results at CDN
   - Use cache tags for invalidation

### Hybrid Approach

For specific use cases, combine approaches:

- **Server-side**: Category pages, search results
- **Client-side**: Product details, cart, checkout
- **Mixed**: Use server for initial data, client for interactions

## Conclusion

The current client-side state management architecture provides an excellent balance of user experience, performance, and maintainability for this e-commerce application. The URL-based persistence ensures SEO compatibility while maintaining the responsiveness users expect from modern web applications.

Future enhancements could include selective server-side rendering for specific pages or implementing edge computing for geographically distributed users, but the current architecture serves the application's needs effectively.
