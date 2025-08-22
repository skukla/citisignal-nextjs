# Troubleshooting Loading States

## Common Issues and Solutions

### Skeleton Shows on Every Filter Change

**Symptoms:**

- Skeleton loader appears when applying filters
- UI "resets" on each interaction
- Loss of user context

**Root Causes:**

1. Not preserving previous data during updates
2. Incorrect loading state logic
3. Missing `isValidating` implementation

**Solution:**

```typescript
// Store previous data
const previousDataRef = useRef(data);
useEffect(() => {
  if (data) previousDataRef.current = data;
}, [data]);

// Use previous data during loading
const displayData = data || previousDataRef.current;

// Show skeleton only when no previous data exists
const showSkeleton = !previousDataRef.current && isLoading;
```

---

### Layout Shift When Loading Completes

**Symptoms:**

- Content jumps when skeleton is replaced
- Scroll position changes
- Visual jarring

**Root Causes:**

1. Skeleton height doesn't match content
2. Dynamic content without fixed dimensions
3. Missing CSS transitions

**Solution:**

```typescript
// Match skeleton to actual content structure
const skeletonConfig = {
  sections: actualData?.sections.length || 4,
  itemsPerSection: actualData?.avgItems || 5
};

// Add smooth transitions
<div className="transition-all duration-300">
  {isLoading ? <Skeleton {...skeletonConfig} /> : <Content />}
</div>
```

---

### Scroll Position Resets on Clear Filters

**Symptoms:**

- Page jumps to top when clearing filters
- Lost reading position
- Poor user experience

**Root Causes:**

1. Using router.push without scroll options
2. Default Next.js navigation behavior
3. Page re-render triggering scroll reset

**Solution:**

```typescript
// Next.js App Router (13+)
const clearFilters = () => {
  router.push(pathname, { scroll: false });
};

// Or with query params
const updateFilters = (params) => {
  router.push(`${pathname}?${params}`, { scroll: false });
};
```

---

### Loading Spinner Causes Height Changes

**Symptoms:**

- Filter sections expand when loading
- Content shifts down then up
- Bouncing UI effect

**Root Causes:**

1. Spinner in normal document flow
2. Missing absolute positioning
3. Incorrect parent container setup

**Solution:**

```tsx
// Parent needs relative positioning
<div className="relative">
  {/* Content with opacity during loading */}
  <div className={isLoading ? 'opacity-50' : ''}>{children}</div>

  {/* Absolutely positioned spinner */}
  {isLoading && (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <Spinner />
    </div>
  )}
</div>
```

---

### Flash of Empty State

**Symptoms:**

- Brief "No results" message
- Empty state before data loads
- Flickering UI

**Root Causes:**

1. Checking only current data, not previous
2. Incorrect empty state logic
3. Race conditions in data fetching

**Solution:**

```typescript
// Check both current and previous data
const hasData = data?.length > 0 || previousData?.length > 0;
const isEmpty = !isLoading && !hasData;

// Only show empty state when truly empty
if (isEmpty) {
  return <EmptyState />;
}
```

---

### Multiple Loading States Shown

**Symptoms:**

- Both skeleton and spinner visible
- Overlapping loading indicators
- Confusing visual feedback

**Root Causes:**

1. Uncoordinated loading states
2. Multiple data sources with different states
3. Missing state consolidation

**Solution:**

```typescript
// Consolidate loading states
const pageLoadingState = usePageLoading({
  productsLoading,
  facetsLoading,
  searchQuery,
  activeFilters,
});

// Single source of truth
const showSkeleton = pageLoadingState.isInitialLoad;
const showInlineLoading = pageLoadingState.isValidating;
```

---

### Slow Transition Between States

**Symptoms:**

- Delayed feedback on user actions
- Sluggish UI responses
- Poor perceived performance

**Root Causes:**

1. Missing optimistic updates
2. Waiting for full data refresh
3. No immediate visual feedback

**Solution:**

```typescript
// Immediate visual feedback
const [optimisticFilters, setOptimisticFilters] = useState(filters);

const handleFilterChange = (filter) => {
  // Update UI immediately
  setOptimisticFilters((prev) => ({ ...prev, [filter.key]: filter.value }));

  // Then fetch data
  fetchData(filter);
};

// Show optimistic state during loading
const displayFilters = isLoading ? optimisticFilters : filters;
```

---

### Different Loading UX in Development vs Production

**Symptoms:**

- Works in dev, broken in production
- Different timing or sequences
- Inconsistent behavior

**Root Causes:**

1. React StrictMode double-rendering
2. Different network speeds
3. Build optimizations affecting timing

**Solution:**

```typescript
// Account for StrictMode in development
const isStrictMode = process.env.NODE_ENV === 'development';

// Use refs for one-time operations
const hasInitialized = useRef(false);
useEffect(() => {
  if (hasInitialized.current) return;
  hasInitialized.current = true;

  // One-time initialization
}, []);

// Test with production build locally
npm run build && npm run start
```

---

## Debugging Tools

### 1. Loading State Logger

```typescript
const useLoadingDebug = (name: string, state: any) => {
  useEffect(() => {
    console.log(`[${name}] Loading State:`, {
      isLoading: state.isLoading,
      isValidating: state.isValidating,
      hasData: !!state.data,
      error: state.error,
      timestamp: new Date().toISOString(),
    });
  }, [name, state]);
};
```

### 2. Visual Loading Indicators

```typescript
// Development-only loading overlay
{process.env.NODE_ENV === 'development' && (
  <div className="fixed top-0 left-0 bg-red-500 text-white p-2 text-xs z-50">
    {isLoading && '⏳ Loading'}
    {isValidating && '🔄 Validating'}
    {error && '❌ Error'}
  </div>
)}
```

### 3. Performance Monitoring

```typescript
const measureLoadingTime = () => {
  const start = performance.now();

  return () => {
    const duration = performance.now() - start;
    console.log(`Loading took ${duration}ms`);

    if (duration < 300) {
      console.warn('Consider removing loader for sub-300ms operations');
    }
  };
};
```

## Best Practices Checklist

- [ ] Store previous data for use during updates
- [ ] Use `isValidating` for inline loading states
- [ ] Position spinners absolutely to prevent layout shift
- [ ] Add `scroll: false` to router navigation
- [ ] Match skeleton height to actual content
- [ ] Implement smooth CSS transitions
- [ ] Test with slow network throttling
- [ ] Verify behavior in production build
- [ ] Add loading state analytics
- [ ] Document expected loading sequences

## Testing Loading States

```typescript
// Example test for adaptive loading
it('should show skeleton only on initial load', async () => {
  const { rerender } = render(<FilterSidebar />);

  // Initial load - should show skeleton
  expect(screen.getByTestId('skeleton')).toBeInTheDocument();

  // After data loads
  await waitFor(() => {
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
  });

  // Apply filter - should NOT show skeleton
  fireEvent.click(screen.getByText('Apply Filter'));
  expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
  expect(screen.getByTestId('inline-loader')).toBeInTheDocument();
});
```
