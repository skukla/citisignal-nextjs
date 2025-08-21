# Adaptive Loading Patterns

## Overview

Adaptive loading provides different loading experiences based on the context of data fetching. Instead of showing the same skeleton loader for every data update, the system intelligently chooses between skeleton loaders and inline loading indicators.

## The Problem

Traditional approaches show skeleton loaders for all loading states, which creates a jarring experience:

- Users lose context when filters are applied
- The entire UI appears to "reset" for minor updates
- Skeleton loaders flash quickly for cached data
- Layout shifts occur when switching between skeleton and real content

## The Solution: Adaptive Loading

Our adaptive loading pattern uses different loading strategies based on the loading context:

### 1. Initial Page Load

**Shows: Full skeleton loader**

- Used when there's no previous data to display
- Provides structure while the initial data loads
- Prevents cumulative layout shift

### 2. Filter/Sort Changes

**Shows: Inline loading indicators**

- Keeps the existing UI visible
- Adds subtle visual feedback (opacity + spinner)
- Maintains user context and scroll position
- No jarring skeleton replacement

### 3. Search Updates

**Shows: Inline loading indicators**

- Similar to filter changes
- Preserves the facet structure
- Updates counts smoothly

## Implementation

### Core Components

#### 1. ProductPageFilters

Orchestrates the adaptive loading logic:

```typescript
export function ProductPageFilters() {
  const { facets, isInitialLoading, loading, isValidating } = useProductData();

  // Store previous facets to use during transitions
  const previousFacetsRef = useRef(facets);
  useEffect(() => {
    if (facets && facets.length > 0) {
      previousFacetsRef.current = facets;
    }
  }, [facets]);

  // Determine what to show
  const hasFacets = facets && facets.length > 0;
  const hasPreviousFacets = previousFacetsRef.current?.length > 0;

  // Show skeleton only when no previous data exists
  const showContent = hasFacets || hasPreviousFacets;

  // Use previous facets during loading if current facets are empty
  const facetsToDisplay = hasFacets ? facets : previousFacetsRef.current;
}
```

#### 2. FilterSidebarSection

Handles inline loading indicators:

```typescript
function FilterSidebarSection({ section, isValidating }) {
  return (
    <div className="relative">
      {/* Content with opacity reduction during loading */}
      <div className={`${isValidating ? 'opacity-50' : ''}`}>
        {section.options.map(option => ...)}
      </div>

      {/* Overlay spinner that doesn't affect layout */}
      {isValidating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}
```

### Data Flow

1. **useProductSearchFilter** provides `isValidating` state
2. **ProductDataContext** passes it through the component tree
3. **ProductPageFilters** determines skeleton vs inline loading
4. **FilterSidebarSection** renders appropriate loading UI

## Best Practices

### 1. Preserve Previous Data

Always store the last successful data to display during updates:

```typescript
const previousDataRef = useRef(data);
useEffect(() => {
  if (data) previousDataRef.current = data;
}, [data]);
```

### 2. Use Proper Loading States

Distinguish between different loading scenarios:

- `isLoading`: No data yet (show skeleton)
- `isValidating`: Updating existing data (show inline loading)

### 3. Prevent Layout Shift

- Position spinners absolutely so they don't affect layout
- Use opacity instead of hiding/showing elements
- Add CSS transitions for smooth changes

### 4. Match Skeleton to Content

Create skeletons that match the actual content structure:

```typescript
const skeletonSections = facets?.map((f) => ({
  key: f.key,
  optionCount: f.options.length,
}));
```

## Visual Indicators

### Skeleton Loader

- Gray animated blocks
- Used only on initial load
- Matches expected content height

### Inline Loading

- 50% opacity on content
- Spinning indicator overlay
- Smooth 200-300ms transitions
- Content remains interactive

## Performance Considerations

### SWR Configuration

```typescript
useSWR(key, fetcher, {
  keepPreviousData: true, // Keep old data while fetching
  revalidateOnFocus: false,
  dedupingInterval: 5000,
});
```

### Preventing Unnecessary Re-renders

- Use `memo` for filter components
- Implement proper key strategies
- Batch state updates when possible

## Accessibility

- Loading states are announced to screen readers
- Focus management during transitions
- Keyboard navigation remains functional during loading

## Testing Checklist

- [ ] Initial page load shows skeleton
- [ ] First filter application shows inline loading (not skeleton)
- [ ] Subsequent filters show inline loading
- [ ] Clear all preserves scroll position
- [ ] Loading indicators don't cause layout shift
- [ ] Transitions are smooth (200-300ms)
- [ ] Previous data remains visible during updates

## Common Issues and Solutions

### Issue: Skeleton shows on every filter change

**Solution**: Ensure you're storing and using previous facets data

### Issue: Layout jumps when spinner appears

**Solution**: Use absolute positioning for spinners

### Issue: Scroll position resets on clear filters

**Solution**: Add `{ scroll: false }` to router.push()

### Issue: Flash of empty state

**Solution**: Check both current and previous data before hiding content
