# Adobe Commerce Services Integration Guide

This document provides critical insights into integrating with Adobe Commerce Services (Live Search and Catalog Service) through our GraphQL mesh.

## Architecture Overview

We use a **hybrid approach** combining two Adobe services:

- **Live Search**: AI-powered search ranking and facets
- **Catalog Service**: Complete product data and attributes

## Critical Implementation Details

### 1. Coordinated Loading Strategy

We implement a single `usePageLoading` hook that tracks:

- Initial page load (both products and facets)
- Search transitions (with 500ms debounce)
- Sort transitions

This prevents jarring sequential renders where facets appear before products.

```typescript
const pageLoading = usePageLoading({
  productsLoading: productData.loading,
  facetsLoading: facetsData.loading,
  searchQuery: urlState.search,
  sortBy: urlState.formattedSort, // Critical: Track sort changes!
});
```

### 2. Sort Implementation Gotchas

The sort dropdown wasn't working initially due to several issues:

**Issue 1: TypeScript Types Mismatch**

```typescript
// ❌ Wrong - included unsupported attributes
export type SortAttribute = 'RELEVANCE' | 'PRICE' | 'NAME' | 'NEWEST' | 'POPULARITY';

// ✅ Correct - only supported attributes
export type SortAttribute = 'RELEVANCE' | 'PRICE' | 'NAME';
```

**Issue 2: GraphQL Type Names**

```graphql
# ❌ Wrong - generic type names
query TestSort($sort: SortInput) { ... }

# ✅ Correct - namespaced types
query TestSort($sort: Citisignal_SortInput) { ... }
```

**Issue 3: Sort Changes Not Triggering Skeletons**

- Sort changes must be tracked in `usePageLoading` hook
- Without this, sort changes don't show loading state

### 3. Category Values

Frontend uses friendly names but backend expects different values:

- Frontend route: `/phones`
- Frontend category: `"phones"`
- Backend categoryPath: Depends on your catalog structure

Always verify actual category values in your Adobe Commerce instance.

### 4. Parallel Query Execution

**Performance Optimization**: Always run queries in parallel when possible:

```javascript
// ✅ Parallel - 200ms total
const [products, facets] = await Promise.all([fetchProducts(), fetchFacets()]);

// ❌ Sequential - 400ms total
const products = await fetchProducts();
const facets = await fetchFacets();
```

### 5. Facets Architecture

Facets are handled by a **separate resolver and hook**:

- `useProductCards`: Fetches products
- `useProductFacets`: Fetches filter options

This separation allows:

- Independent caching strategies
- Parallel loading
- Better performance (facets use `page_size: 1`)

### 6. Search Debouncing

```typescript
const SEARCH_DEBOUNCE_MS = 500;

// Local state for immediate UI update
const [localValue, setLocalValue] = useState(searchQuery);

// Debounced update to URL/API
useEffect(() => {
  const timer = setTimeout(() => {
    if (localValue !== searchQuery) {
      setSearchQuery(localValue);
    }
  }, SEARCH_DEBOUNCE_MS);

  return () => clearTimeout(timer);
}, [localValue]);
```

## Service Capabilities Matrix

| Feature               | Live Search | Catalog Service | Our Solution                 |
| --------------------- | ----------- | --------------- | ---------------------------- |
| AI Search Ranking     | ✅          | ❌              | Use Live Search for searches |
| Complete Product Data | Limited     | ✅              | Merge both results           |
| Facets/Filters        | ✅          | ❌              | Always use Live Search       |
| Category Browsing     | ✅          | ✅              | Use Catalog for browsing     |
| Sort by Price/Name    | ✅          | ✅              | Both work                    |
| Sort by Relevance     | ✅          | ❌              | Only with search phrase      |

## Common Issues and Solutions

### Issue: Sort dropdown not working

**Symptoms**: Selecting sort option returns empty results
**Causes**:

1. Wrong field name in Catalog Service (`name` vs `attribute`)
2. Category value mismatch
3. Missing required `phrase` parameter
4. Sort changes not tracked in loading state

**Solution**: See mesh resolver's `mapSortForCatalog` function

### Issue: Facets not loading

**Symptoms**: Filter sidebar empty or showing wrong options
**Cause**: Catalog Service doesn't support facets
**Solution**: Always use Live Search for facets, even when browsing

### Issue: Uneven loading (facets before products)

**Symptoms**: Filter sidebar appears, then products load later
**Cause**: Uncoordinated loading states
**Solution**: Use single `usePageLoading` hook for coordination

### Issue: Search feels sluggish

**Symptoms**: UI freezes during typing
**Causes**:

1. Sequential API calls
2. No debouncing
3. Not using parallel queries

**Solution**: Implement debouncing and parallel queries

## Testing Strategies

### 1. Create Test Pages

Create isolated test pages to debug specific features:

```typescript
// app/test-sort/page.tsx
export default function TestSortPage() {
  // Test different sort/filter combinations
  // Log requests and responses
  // Verify field names and values
}
```

### 2. Browser Console Debugging

Always check:

- Network tab for GraphQL requests/responses
- Console for logged variables
- Exact error messages from GraphQL

### 3. Direct Mesh Testing

Test queries directly against the mesh endpoint to verify field names and requirements.

## Best Practices

1. **Always use correct GraphQL types**: `Citisignal_*` prefixed types
2. **Track all state changes** that should show loading: search, sort, filters
3. **Use parallel queries** whenever possible
4. **Separate concerns**: Products, facets, and UI state in different contexts
5. **Test with actual data**: Use real category values from your catalog
6. **Handle service differences** in the mesh resolver, not frontend
7. **Keep loading states coordinated** to prevent jarring UI updates

## Key Files

### Mesh (commerce-mesh)

- `/resolvers/product-cards.js` - Hybrid search implementation
- `/resolvers/product-facets.js` - Facets-only resolver
- `/schema/product-cards.graphql` - GraphQL schema definitions
- `/CLAUDE.md` - Critical API differences documentation

### Frontend (citisignal-nextjs)

- `/src/hooks/products/useProductCards.ts` - Product fetching
- `/src/hooks/products/useProductFacets.ts` - Facets fetching
- `/src/components/layout/ProductPage/hooks/usePageLoading.ts` - Coordinated loading
- `/src/components/layout/ProductPage/providers/ProductPageProvider.tsx` - Main orchestrator

## Smooth Loading Transitions

### The Layout Shift Problem

Skeletons and content have different heights, causing jarring movements during transitions.

### Solution: Layered Transitions

```jsx
<LayeredTransition
  skeleton={<Skeleton />} // Sets dimensions, stays in DOM
  content={<RealContent />} // Overlays absolutely
  showContent={hasData}
/>
```

**Key Benefits:**

- Zero layout shift (skeleton reserves space)
- Smooth fade transitions
- Better performance (no reflow)

### Implementation Principles

1. **Keep skeletons in DOM** - Use `invisible` not `display: none`
2. **Absolute positioning for content** - Overlays in same space
3. **Use Tailwind classes** - `transition-opacity duration-300` not inline styles
4. **Avoid over-engineering** - Remove unused props, dead components

## References

- [Adobe Catalog Service Docs](https://developer.adobe.com/commerce/services/graphql/catalog-service/)
- [Adobe Live Search Docs](https://experienceleague.adobe.com/docs/commerce/live-search/)
- [GraphQL Mesh Documentation](https://the-guild.dev/graphql/mesh)
