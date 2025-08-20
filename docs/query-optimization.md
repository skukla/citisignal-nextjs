# Query Optimization Guide

## Unified Query Mode Optimization

### The Problem
When switching from unified query to individual queries after user interaction, the unified query was still being executed with an empty object `{}`, causing unnecessary API calls.

### The Solution
Pass `null` instead of `{}` to prevent SWR from making the query:

```typescript
// ❌ INCORRECT - Will still make the query
const unifiedData = useCategoryPageData(useUnifiedQuery ? {
  categoryUrlKey: category,
  // ... other params
} : {});  // Empty object still triggers query!

// ✅ CORRECT - Properly prevents query
const unifiedData = useCategoryPageData(useUnifiedQuery ? {
  categoryUrlKey: category,
  // ... other params
} : null);  // null prevents SWR from creating a key
```

### How It Works

In the hook implementation:
```typescript
export function useCategoryPageData(variables: CategoryPageDataVariables | null) {
  // When variables is null, key is null, so SWR skips the query
  const key = variables ? [GET_CATEGORY_PAGE_DATA, variables] : null;
  
  return useSWR(
    key,  // null key = no query
    key ? ([query, vars]) => fetcher(query, vars) : null
  );
}
```

## Query Strategy Flow

### Initial Load (Single Query Mode ON)
1. User visits category page
2. `userHasInteracted = false`
3. `useUnifiedQuery = true`
4. Single unified query fetches all data

### After First Interaction
1. User applies filter/sort
2. `userHasInteracted = true`
3. `useUnifiedQuery = false`
4. Unified query receives `null` (no query)
5. Individual queries run for products and facets

### Mode Switch or Category Change
1. `userHasInteracted` resets to `false`
2. Returns to unified query for initial load
3. Cycle repeats

## Filter State Management

### URL State Tracking
The provider tracks filter state separately for different purposes:

```typescript
// Initial state (frozen for unified query)
const initialUrlStateRef = useRef(urlState);

// Previous state (for detecting changes)
const previousUrlStateRef = useRef(urlState);

// Current state (for individual queries)
const urlState = useUrlState();
```

### Filter Change Detection
```typescript
// Detect when user has interacted with filters
useEffect(() => {
  const filtersChanged = 
    urlState.manufacturer !== previousUrlStateRef.current.manufacturer ||
    urlState.memory !== previousUrlStateRef.current.memory ||
    urlState.colors !== previousUrlStateRef.current.colors ||
    urlState.priceMin !== previousUrlStateRef.current.priceMin ||
    urlState.priceMax !== previousUrlStateRef.current.priceMax ||
    urlState.search !== previousUrlStateRef.current.search ||
    urlState.formattedSort !== previousUrlStateRef.current.formattedSort;
  
  if (filtersChanged && singleQueryMode) {
    setUserHasInteracted(true);
  }
}, [urlState, singleQueryMode]);
```

## Multiple Facet Filtering

### Filter Structure
Filters are passed as an object to the GraphQL queries:

```typescript
const filter = {
  categoryUrlKey: "phones",
  manufacturer: "Apple",      // Single value
  memory: "256GB",            // Single value
  colors: ["Black", "Blue"],  // Array
  priceMin: 500,
  priceMax: 1500
};
```

### Cumulative Logic (AND)
All filters are applied cumulatively:
- Each additional filter narrows the result set
- Products must match ALL specified filters
- Example: Apple + 256GB = Apple phones WITH 256GB option

## Performance Considerations

### Query Deduplication
SWR automatically deduplicates identical queries:
```typescript
// Both components use the same key
const key = ['productCards', phrase, filter, sort, limit, pageIndex];

// SWR will only make one request even if multiple components subscribe
```

### Cache Strategy
```typescript
{
  revalidateOnFocus: false,      // Don't refetch on tab focus
  revalidateOnReconnect: false,  // Don't refetch on reconnect
  dedupingInterval: 60000,       // Cache for 1 minute
}
```

### Infinite Loading Optimization
```typescript
// Stop fetching when no more data
const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.items?.length) {
    return null;  // Stop infinite loading
  }
  return ['productCards', ...params, pageIndex + 1];
};
```

## Common Pitfalls

### 1. Forgetting to Pass null
Always pass `null`, not `{}` or `undefined`, to prevent queries.

### 2. Not Resetting User Interaction State
Reset `userHasInteracted` when switching modes or categories.

### 3. Mixing Initial and Current State
Use `initialUrlStateRef` for unified query, `urlState` for individual queries.

### 4. Missing Filter Implementation
Ensure all filters are handled in both frontend and backend:
- Frontend: Pass in filter object
- Backend: Convert to API-specific format

## Debugging Tips

### Check Which Queries Are Running
Use the Demo Inspector (`Cmd+Shift+D`) to see:
- Which queries are executing
- Query timing and sequence
- Response data

### Verify Filter Application
```typescript
console.log('Filter being sent:', {
  useUnifiedQuery,
  filter: useUnifiedQuery ? unifiedFilter : productFilter
});
```

### Monitor State Changes
```typescript
useEffect(() => {
  console.log('Query strategy:', {
    singleQueryMode,
    userHasInteracted,
    useUnifiedQuery
  });
}, [singleQueryMode, userHasInteracted, useUnifiedQuery]);
```