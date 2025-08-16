# Hybrid State Management Refactoring Plan

## Overview

Refactor the current client-side filtering approach to a strategic hybrid architecture that balances server-side state management for core commerce functions with client-side interactivity for enhanced user experience. This approach provides SEO benefits and shareable URLs while maintaining responsive UI interactions.

## Current State

### Problems with Current Architecture
- **Dual filtering logic** - Filters applied both client-side (useProductList) and server-side
- **State synchronization issues** - URL state and component state can diverge
- **Bundle size** - Unnecessary client-side filtering code
- **SEO limitations** - Filtered views aren't directly linkable
- **Complexity** - Two places to maintain filtering logic

### Current Flow
1. Initial load fetches data from GraphQL
2. User applies filters via UI
3. Filters stored in React state (useProductList hook)
4. Client-side filtering applied to fetched data
5. URL not updated, state lost on refresh

## Target Architecture

### Hybrid Approach Benefits
- **SEO Optimization** - Major filters in URL for indexable, shareable pages
- **Responsive UX** - Instant feedback for UI interactions
- **Performance Balance** - Server handles heavy operations, client handles quick refinements
- **Development Simplicity** - Clear separation of concerns
- **Progressive Enhancement** - Works without JavaScript for core functions
- **Reduced Server Load** - Minor interactions don't require API calls

### Server-Side State (URL-Driven)
**Core Commerce Functions:**
- Product search queries (`?search=iphone`)
- Category filtering (`?category=phones`)
- Price range filtering (`?priceMin=500&priceMax=1000`)
- Manufacturer/brand filtering (`?manufacturer=apple`)
- Sorting options (`?sort=price_asc`)
- Pagination (`?page=2`)

### Client-Side State (React State)
**Interactive UI Elements:**
- View preferences (grid/list toggle)
- Temporary UI states (collapsed panels, open modals)
- Quick filters within loaded dataset
- Optimistic updates during transitions
- Form validation and error states
- Loading and transition animations

### Target Flow
1. **Major Operations** (Server-Side):
   - User searches or changes category → Update URL → Server query → Display results
   - Benefits: SEO, shareable links, browser history

2. **Minor Operations** (Client-Side):
   - User toggles view mode → Update React state → Instant UI change
   - Benefits: No latency, smooth interactions

## Implementation Plan

### Phase 1: URL State Management (Frontend)

#### 1.1 Update URL Parameter Structure
```typescript
// Example URL structure
/phones?search=iphone&sort=price_asc&manufacturer=apple&memory=128GB,256GB&page=2

// Corresponding query params
interface ProductPageParams {
  search?: string;      // Search query
  sort?: string;        // Sort option
  manufacturer?: string; // Brand filter
  memory?: string;      // Comma-separated memory options
  colors?: string;      // Comma-separated color values
  priceMin?: number;    // Price range minimum
  priceMax?: number;    // Price range maximum
  page?: number;        // Current page
}
```

#### 1.2 Refactor useProductList Hook
- Simplify to handle only UI state and optimistic updates
- Remove heavy filtering logic (moves to server)
- Keep quick client-side refinements for loaded data
- Add optimistic update patterns for better UX

#### 1.3 Update useProductCards Hook
```typescript
// Hybrid approach - server filters with client enhancements
const useProductCards = ({ searchParams, clientFilters }) => {
  // Server-side filtering via URL params
  const { data, error, size, setSize } = useSWRInfinite(
    (pageIndex) => ['productCards', searchParams, pageIndex + 1],
    (key) => fetchProductCards({
      ...searchParams,
      page: key[2]
    })
  );
  
  // Optional client-side refinements for loaded data
  const filteredData = useMemo(() => {
    if (!clientFilters || Object.keys(clientFilters).length === 0) {
      return data;
    }
    // Apply quick client filters (e.g., hide out of stock temporarily)
    return applyClientFilters(data, clientFilters);
  }, [data, clientFilters]);
  
  return { data: filteredData, error, loadMore: () => setSize(size + 1) };
};
```

### Phase 2: GraphQL Resolver Enhancement

#### 2.1 Extend Citisignal_productCards Arguments
```graphql
type Query {
  Citisignal_productCards(
    phrase: String
    filter: ProductFilter
    sort: SortOption  # New: Add sorting
    limit: Int
    page: Int
    facets: Boolean
  ): ProductCardResult!
}

enum SortOption {
  RELEVANCE      # Default for search
  PRICE_ASC      # Price low to high
  PRICE_DESC     # Price high to low
  NAME_ASC       # Alphabetical A-Z
  NAME_DESC      # Alphabetical Z-A
  NEWEST         # Recently added
}
```

#### 2.2 Implement Sorting in Resolver
```javascript
// product-cards.js resolver additions
const mapSortOption = (sort, isLiveSearch) => {
  const sortMappings = {
    PRICE_ASC: isLiveSearch 
      ? { attribute: 'price', direction: 'ASC' }
      : { name: 'price', direction: 'ASC' },
    PRICE_DESC: isLiveSearch
      ? { attribute: 'price', direction: 'DESC' }
      : { name: 'price', direction: 'DESC' },
    NAME_ASC: isLiveSearch
      ? { attribute: 'name', direction: 'ASC' }
      : { name: 'name', direction: 'ASC' },
    // ... other mappings
  };
  
  return sortMappings[sort] || null;
};

// In resolver
const sortConfig = mapSortOption(args.sort, useLiveSearch);
if (sortConfig) {
  if (useLiveSearch) {
    // Live Search sort format
    queryArgs.sort = [sortConfig];
  } else {
    // Catalog Service sort format
    queryArgs.sort = sortConfig;
  }
}
```

#### 2.3 Maintain Simple Service Selection
```javascript
// Keep the simple, clear logic as documented
const shouldUseLiveSearch = (args) => {
  if (args.phrase && args.phrase.trim() !== '') return true;
  if (args.facets === true) return true;
  return false; // Default to Catalog
};
```

### Phase 3: Component Updates

#### 3.1 Update FilterPanel Component
```typescript
// Hybrid approach - major filters to URL, minor to state
const FilterPanel = () => {
  const [tempFilters, setTempFilters] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Major filter change (server-side)
  const handleMajorFilterChange = (filterType: string, value: any) => {
    // Show optimistic UI update
    setTempFilters({ ...tempFilters, [filterType]: value });
    
    // Update URL for server query
    const params = new URLSearchParams(searchParams);
    if (value && value.length > 0) {
      params.set(filterType, Array.isArray(value) ? value.join(',') : value);
    } else {
      params.delete(filterType);
    }
    params.delete('page'); // Reset pagination
    
    router.push(`${pathname}?${params.toString()}`);
  };
  
  // Minor filter change (client-side only)
  const handleMinorFilterChange = (filterType: string, value: any) => {
    setTempFilters({ ...tempFilters, [filterType]: value });
    // These don't update URL, just local state
  };
  
  return (
    <>
      {/* Major filters - update URL */}
      <CategoryFilter onChange={(v) => handleMajorFilterChange('category', v)} />
      <PriceFilter onChange={(v) => handleMajorFilterChange('price', v)} />
      
      {/* Minor filters - client state only */}
      <ViewToggle onChange={(v) => handleMinorFilterChange('view', v)} />
      <QuickFilter onChange={(v) => handleMinorFilterChange('quick', v)} />
    </>
  );
};
```

#### 3.2 Update SortDropdown Component
```typescript
// Use URL params instead of local state
const SortDropdown = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentSort = searchParams.get('sort') || 'RELEVANCE';
  
  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    router.push(`${pathname}?${params.toString()}`);
  };
  
  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      {/* Sort options */}
    </Select>
  );
};
```

#### 3.3 Update SearchBar Component
```typescript
// Navigate with search query in URL
const handleSearch = (query: string) => {
  const params = new URLSearchParams();
  if (query) {
    params.set('search', query);
  }
  router.push(`${pathname}?${params.toString()}`);
};
```

### Phase 4: Testing & Validation

#### 4.1 Test Cases
- [ ] Direct URL access with major filters works
- [ ] Browser back/forward navigation maintains state
- [ ] Bookmarked filtered views load correctly
- [ ] Client-side filters provide instant feedback
- [ ] Optimistic updates show immediately
- [ ] Filter changes reset pagination appropriately
- [ ] Sort options work for both services
- [ ] Search triggers Live Search service
- [ ] Initial load uses Catalog Service
- [ ] Facets only requested when needed
- [ ] View preferences persist during session
- [ ] Quick filters don't trigger server requests

#### 4.2 Performance Metrics
- Measure bundle size reduction
- Compare initial load times
- Test filtered view load times
- Verify no unnecessary re-renders

#### 4.3 SEO Validation
- Ensure filtered URLs are crawlable
- Verify meta tags update correctly
- Test Open Graph data for shared URLs

### Phase 5: Documentation Updates

#### 5.1 Update CLAUDE.md Files
- Document new URL-driven approach
- Update development standards
- Add examples of URL structures

#### 5.2 Update Component Documentation
- Document new props and behaviors
- Add migration notes for other pages
- Include troubleshooting section

## Migration Checklist

### Pre-Migration
- [ ] Review current filtering logic
- [ ] Document existing URL structures
- [ ] Identify all components using filters
- [ ] Create rollback plan

### During Migration
- [ ] Update GraphQL resolver with sorting
- [ ] Test resolver via GraphQL playground
- [ ] Update useProductCards hook for hybrid approach
- [ ] Refactor useProductList hook (simplify, not remove)
- [ ] Update FilterPanel with major/minor filter separation
- [ ] Update SortDropdown component
- [ ] Update SearchBar component
- [ ] Implement optimistic updates
- [ ] Test all filter combinations
- [ ] Verify URL state persistence
- [ ] Ensure client filters work without server calls

### Post-Migration
- [ ] Update documentation
- [ ] Remove unused code
- [ ] Performance testing
- [ ] SEO validation
- [ ] Deploy to staging
- [ ] Monitor for issues

## Rollback Plan

If issues arise:
1. Revert GraphQL resolver changes
2. Restore useProductList hook
3. Revert component changes
4. Deploy hotfix

Keep the old code in a branch for 2 weeks after deployment.

## Success Criteria

- ✅ Major filters handled server-side with URL state
- ✅ Minor UI interactions remain instant (client-side)
- ✅ Shareable filtered views work for commerce operations
- ✅ Browser navigation works correctly
- ✅ Optimistic updates provide immediate feedback
- ✅ Bundle size moderately reduced (5-10KB)
- ✅ Improved perceived performance
- ✅ Clean separation between commerce and UI state
- ✅ Progressive enhancement - works without JS for core features

## Timeline

- **Week 1**: GraphQL resolver updates and testing
- **Week 2**: Frontend refactoring and component updates
- **Week 3**: Testing, documentation, and deployment

## Notes

### Why This Hybrid Approach?

1. **Balanced Performance** - Server handles heavy operations, client handles quick interactions
2. **Better UX** - Instant feedback for UI interactions, no network latency for minor changes
3. **SEO Benefits** - Major filters in URL for indexable, shareable pages
4. **Development Simplicity** - Clear separation between commerce and UI concerns
5. **Progressive Enhancement** - Core functionality works without JavaScript
6. **Follows Best Practices** - Aligns with modern headless commerce patterns
7. **Maintains Flexibility** - Easy to adjust the balance as needed

### Potential Challenges

1. **State Synchronization** - Keeping server and client state in sync
   - Solution: Clear separation of responsibilities, optimistic updates
   
2. **Complexity** - Managing two types of state
   - Solution: Document clearly which filters go where, use TypeScript interfaces
   
3. **User Expectations** - Users may expect all filters in URL
   - Solution: Only SEO-relevant filters in URL, document the decision

### Future Enhancements

After successful migration:
- Implement filter presets (saved searches)
- Add analytics tracking for filter usage patterns
- Consider edge caching for common filter combinations
- Add smart prefetching for likely next actions
- Implement view transitions API for smoother updates
- Consider WebSocket for real-time inventory updates

## Decision Rationale

Based on the comprehensive analysis in `hybrid-state-management.md`, this hybrid approach provides the optimal balance between:
- **SEO requirements** - Critical filters in URL for search indexing
- **User experience** - Instant feedback for UI interactions
- **Performance** - Reduced server load for minor operations
- **Development complexity** - Clear, maintainable architecture

This strategic compromise avoids the drawbacks of both extremes (fully client-side or fully server-side) while capturing the benefits of each approach where they matter most.