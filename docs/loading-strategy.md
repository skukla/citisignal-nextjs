# Coordinated Loading Strategy

## The Problem
When products and facets load independently, users see jarring sequential renders:
1. Nav loads instantly (static)
2. Facets appear (fast query)
3. Products appear (slower query)
4. Result: Multiple layout shifts, poor UX

## The Solution: Simplified usePageLoading Hook
Single source of truth for page-level loading state - a clean custom hook that returns a simple boolean:

```typescript
// hooks/usePageLoading.ts - Clean, focused hook
export function usePageLoading({ productsLoading, facetsLoading, searchQuery, sortBy }) {
  const initialLoadComplete = useRef(false);
  const [isInSearchTransition, setIsInSearchTransition] = useState(false);
  
  // Track initial load and search transitions
  // Return true when coordinated skeletons should show
  return isInitialLoad || isSearching || isSorting;
}

// In ProductPageProvider - Just one line
const pageLoading = usePageLoading({
  productsLoading: productData.loading,
  facetsLoading: facetsData.loading,
  searchQuery: urlState.search,
  sortBy: urlState.sortBy
});

// All components use the same state via context
const { isInitialLoading } = useProductData();
if (isInitialLoading) return <Skeleton />;
```

## Loading Rules
1. **Initial Page Load**: Show all skeletons until BOTH queries complete
2. **Search Changes**: Show all skeletons until BOTH queries complete  
3. **Sort Changes**: Show all skeletons until BOTH queries complete
4. **Filter Changes**: Each component handles its own loading (no coordination)

## Why This Approach?
**Simplicity Over Complexity**: We evolved from complex coordination logic to a single, clean hook that:
- Lives in one place (no scattered loading logic)
- Returns one value (boolean for "show skeletons")
- Has clear rules (initial load + searches + sorts = coordinate, filters = independent)
- Easy to test and reason about

## Key Implementation Details
- **Search Debouncing**: 500ms delay prevents skeleton flicker while typing
- **keepPreviousData**: SWR option prevents facets from disappearing during revalidation
- **Empty Facets**: Hide filter sidebar completely when category has no facets
- **State Persistence**: Uses refs and state to track transitions properly

## Smooth Transitions

### LayeredTransition Pattern
Smoothly transitions between skeleton and content states:

```typescript
export function LayeredTransition({skeleton, content, showContent}) {
  // Content renders in normal flow when ready
  if (showContent) {
    return (
      <div>
        <FadeTransition show={true}>
          {content}
        </FadeTransition>
      </div>
    );
  }
  
  // Show skeleton while loading
  return (
    <div>
      {skeleton}
    </div>
  );
}
```

**Key improvement**: Content renders in normal document flow (not absolute positioned) to prevent overlap issues with sections below.

### FadeTransition Component
Simple opacity transition using Tailwind classes:

```typescript
const durationClass = duration <= 200 ? 'duration-200' : 
                     duration <= 300 ? 'duration-300' : 
                     duration <= 500 ? 'duration-500' : 'duration-700';

return (
  <div className={`transition-opacity ${durationClass} ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
    {children}
  </div>
);
```

## Benefits
- **Clean Architecture**: Single `pageLoading` state instead of complex coordination
- **No Jarring Renders**: Everything appears/disappears together
- **Proper Document Flow**: Content maintains normal height calculation
- **No Overlapping**: Sections below products don't get covered
- **Predictable Behavior**: Clear rules for when skeletons show
- **Maintainable**: Simple conditional rendering, easy to understand