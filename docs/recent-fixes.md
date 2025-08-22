# Recent Fixes and Improvements

## Overview

This document summarizes recent fixes to the CitiSignal NextJS application, focusing on facet filtering, query optimization, and unified query mode improvements.

## Fixed Issues

### 1. Unified Query Triggering on First Filter Application

**Problem:**
When in single query mode, applying a filter for the first time would trigger the unified query (GetCategoryPageData) unnecessarily, causing an extra API call.

**Root Cause:**
The `useCategoryPageData` hook was receiving an empty object `{}` instead of `null` when not in use, causing SWR to still make the query.

**Solution:**

```typescript
// ProductPageProvider.tsx
// Changed from:
const unifiedData = useCategoryPageData(useUnifiedQuery ? {...} : {});

// To:
const unifiedData = useCategoryPageData(useUnifiedQuery ? {...} : null);
```

**Impact:**

- Eliminates unnecessary API call on first filter application
- Improves performance in single query mode
- Reduces network overhead

---

### 2. Facet Counts Showing 0

**Problem:**
All facet options showed `count: 0` in both single query and multi-query modes.

**Root Cause:**
Missing GraphQL inline fragments for bucket union types in the resolver queries. Adobe's APIs return facet buckets as union types that require inline fragments to access the count field.

**Solution:**
Updated all resolver queries to use inline fragments:

```graphql
# Before (incorrect):
facets {
  buckets { title count }
}

# After (correct):
facets {
  buckets {
    ... on Search_ScalarBucket { title count }
    ... on Search_RangeBucket { title count }
  }
}
```

**Files Updated:**

- `commerce-mesh/resolvers/product-facets.js`
- `commerce-mesh/resolvers/category-page.js`
- `commerce-mesh/resolvers/product-cards.js`

---

### 3. Multiple Facets Not Filtering Cumulatively

**Problem:**
Applying multiple facets didn't narrow results. For example, selecting "Apple" + "256GB" showed the same results as just "Apple".

**Root Cause:**
Memory and color filters weren't implemented in the resolver filter builders.

**Solution:**
Added filter handling for all facet types:

```javascript
// Added to buildLiveSearchFilters and buildCatalogFilters:

// Memory filter
if (filter.memory) {
  filters.push({
    attribute: 'cs_memory',
    in: Array.isArray(filter.memory) ? filter.memory : [filter.memory],
  });
}

// Color filter
if (filter.colors && filter.colors.length > 0) {
  filters.push({
    attribute: 'cs_color',
    in: filter.colors,
  });
}
```

**Impact:**

- Filters now work cumulatively (AND logic)
- Apple + 256GB correctly shows only Apple phones with 256GB option
- All facet types are functional

---

### 4. Case Sensitivity in Manufacturer Filter

**Problem:**
Filtering by "apple" returned no results; only "Apple" (capitalized) worked.

**Root Cause:**
Direct string comparison without normalization in the resolvers.

**Solution:**
Implemented case normalization helper:

```javascript
const normalizeFilterValue = (value) => {
  if (!value || typeof value !== 'string') return value;
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};
```

**Impact:**

- "apple", "APPLE", and "Apple" all work correctly
- Better user experience with forgiving input handling

---

### 5. Breadcrumbs Returning Null

**Problem:**
GraphQL error: "Cannot return null for non-nullable field urlPath"

**Root Cause:**
Incorrect field mapping in breadcrumb builder - using `href` instead of `urlPath`.

**Solution:**

```javascript
// Fixed field names to match schema:
return {
  name: category.name,
  urlPath: buildCategoryUrl(category), // Was: href
  level: level, // Was: isActive
};
```

---

### 6. Missing aggregations Field

**Problem:**
Frontend expected `aggregations` field for backward compatibility.

**Root Cause:**
Adobe's newer APIs use `facets` instead of `aggregations`.

**Solution:**
Since this is a new app targeting Adobe Commerce 2.4.7+, we removed the aggregations fallback and use only the modern `facets` field consistently.

## Query Optimization Patterns

### Preventing Unnecessary Queries

Use `null` instead of empty objects to prevent SWR queries:

```typescript
// Hook implementation
export function useDataHook(variables: Variables | null) {
  const key = variables ? [QUERY, variables] : null;
  return useSWR(key, fetcher);
}

// Usage
const data = useDataHook(shouldFetch ? params : null);
```

### Query Strategy Flow

1. **Initial Load**: Use unified query for all data
2. **First Interaction**: Switch to individual queries
3. **Mode/Category Change**: Reset to unified query

## Testing Improvements

### cURL Testing Template

```bash
# Quick test for facet counts
curl -X POST $MESH_ENDPOINT \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -H "Magento-Environment-Id: $ENV_ID" \
  -d '{"query": "..."}'
```

### Debug Fields

Temporarily add debug info to responses:

```javascript
return {
  data: transformedData,
  _debug: {
    raw: originalData,
    filters: appliedFilters,
  },
};
```

## Best Practices Established

1. **Always use inline fragments** for GraphQL union types
2. **Pass null, not {}** to prevent unwanted queries
3. **Normalize string filters** for case-insensitive matching
4. **Test with cURL first** to isolate frontend vs backend issues
5. **Use Demo Inspector** to monitor query execution
6. **Implement all filter types** consistently across resolvers

## Files Modified

### Commerce Mesh

- `resolvers/product-facets.js` - Added inline fragments, filter support
- `resolvers/product-cards.js` - Added memory/color filters
- `resolvers/category-page.js` - Fixed facets, added filters
- `resolvers/category-breadcrumbs.js` - Fixed field mapping

### NextJS App

- `src/components/layout/ProductPage/providers/ProductPageProvider.tsx` - Fixed null vs {} issue
- `src/graphql/queries/GetCategoryPageData.graphql` - Removed aggregations
- `src/hooks/products/useCategoryPageData.ts` - Already handled null correctly

## Monitoring and Debugging

### Demo Inspector Usage

- Toggle single query mode with `Cmd+Shift+D`
- Monitor query execution in real-time
- Check query times (now formatted as seconds when >1000ms)
- Verify which queries run on filter changes

### Common Patterns to Watch

1. Unified query should only run on initial load
2. Filter changes should trigger individual queries
3. Facet counts should never be 0 (unless truly no products)
4. Multiple filters should narrow results cumulatively

## Future Considerations

1. **Performance**: Consider implementing resolver-level caching
2. **Error Handling**: Add more graceful degradation for API failures
3. **Testing**: Add automated tests for filter combinations
4. **Documentation**: Keep troubleshooting guide updated with new issues

## Related Documentation

- [Query Optimization Guide](./query-optimization.md)
- [Single Query Mode](./single-query-mode.md)
- [Loading Strategy](./loading-strategy.md)
- Commerce Mesh: [Facet Implementation](../../commerce-mesh/docs/FACET-IMPLEMENTATION.md)
- Commerce Mesh: [Troubleshooting](../../commerce-mesh/docs/troubleshooting.md)
