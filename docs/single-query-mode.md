# Single Query Mode

## Overview

The Demo Inspector includes a "Single Query" toggle that demonstrates two data fetching approaches for initial page loads.

## Query Modes

### Single Query ON (Unified)
- Uses `Citisignal_categoryPageData` resolver from Adobe API Mesh
- One GraphQL query returns all page data:
  - Navigation (header and footer)
  - Products with pagination
  - Facets for filtering
  - Breadcrumbs
  - Category information
- Reduces network overhead for initial page load (75% fewer queries)
- Ideal for SSR scenarios
- Demonstrates the power of API Mesh orchestration

### Single Query OFF (Multiple)
- Uses focused resolvers for granular control:
  - `Citisignal_productCards` - Product listings
  - `Citisignal_productFacets` - Filter options
  - `Citisignal_categoryNavigation` - Navigation menu
  - `Citisignal_categoryBreadcrumbs` - Breadcrumb trail
- Multiple parallel queries for different data needs
- Better caching granularity
- More flexible for incremental updates

## Implementation Details

### ProductPageProviderSSR Component

The `ProductPageProviderSSR` component manages both query modes:

```typescript
// Determines query mode based on Demo Inspector toggle
const { singleQueryMode } = useDemoInspector();

// Single query mode for initial load without filters
const shouldUseSingleQuery = singleQueryMode && !initialData && !urlState.hasActiveFilters && !urlState.search;

// Uses categoryPageData hook when in single query mode
const unifiedData = useCategoryPageData(shouldUseSingleQuery ? {...} : null);

// Falls back to multiple queries otherwise
const productData = useProductCards(shouldUseMultipleQueries ? {...} : null);
```

### Important Behaviors

1. **Initial Load Only**: Single query mode only affects the initial page load
2. **Filter/Sort Updates**: Always use focused queries for efficiency, regardless of mode
3. **Search Updates**: Trigger focused queries to leverage Live Search capabilities
4. **Pagination**: Uses focused queries for loading more products

## Usage Instructions

1. Open Demo Inspector with `Cmd+Shift+D`
2. Look for "Single Query: OFF/ON" toggle in the header
3. Toggle to ON to enable unified query mode
4. Refresh the page to see the change take effect
5. Observe the query list:
   - **Single Query ON**: Shows 1 query (`Citisignal_categoryPageData`)
   - **Single Query OFF**: Shows 4-5 queries (individual resolvers)

## Performance Comparison

### Single Query Mode (ON)
- **Queries**: 1
- **Network Requests**: 1
- **Initial Load Time**: ~200-300ms faster
- **Best For**: SSR, initial page loads, slow connections

### Multiple Query Mode (OFF)
- **Queries**: 4-5
- **Network Requests**: 4-5 (parallel)
- **Initial Load Time**: Standard
- **Best For**: Client-side apps, granular caching needs

## Technical Architecture

### Adobe API Mesh Resolver
The `category-page.js` resolver in the mesh orchestrates multiple backend services:
- **Commerce Core**: Navigation and breadcrumbs
- **Catalog Service**: Product listings
- **Live Search**: Facets and AI ranking

All this complexity is hidden behind a single GraphQL query when using Single Query mode.

### Frontend Integration
The frontend seamlessly switches between modes without changing the UI components:
- Same ProductPage compound components
- Same data structure in context
- Only the data fetching strategy changes

## Future SSR Migration

This implementation is designed to support future SSR:

```typescript
interface Props {
  initialData?: CategoryPageSSRData; // For SSR pre-fetched data
}
```

When SSR is implemented:
1. Server fetches data using `Citisignal_categoryPageData`
2. Passes as `initialData` prop
3. Client hydrates without additional queries
4. Updates use focused queries for efficiency

## Benefits

### For Development
- Easy A/B testing of query strategies
- Clear demonstration of API Mesh value
- Gradual migration path to SSR

### For Production
- Reduced latency on initial load
- Lower server load (fewer resolver calls)
- Better performance on slow connections
- SEO-friendly with SSR support

## Troubleshooting

### Toggle Not Working?
- Ensure Demo Inspector is enabled
- Refresh page after toggling
- Check browser console for errors

### Queries Not Changing?
- Clear browser cache
- Check localStorage for saved preferences
- Verify API Mesh is deployed with latest resolvers

### Performance Not Improving?
- Network latency may dominate (check DevTools)
- Browser caching may affect measurements
- Try incognito mode for clean testing