# Performance and Loading Guide

## Overview

This guide consolidates all performance optimization and loading strategies for the CitiSignal Next.js application. It covers coordinated loading states, adaptive loading patterns, skeleton loaders, and performance best practices.

## Core Loading Architecture

### Coordinated Loading Strategy

We implement a unified `usePageLoading` hook that coordinates multiple data sources to prevent jarring sequential renders:

```typescript
const pageLoading = usePageLoading({
  productsLoading: productData.loading,
  facetsLoading: facetsData.loading,
  searchQuery: urlState.search,
  sortBy: urlState.formattedSort,
});
```

**Key Benefits:**

- Single source of truth for page loading state
- Prevents facets appearing before products
- Smooth transitions between states
- Consistent user experience

### Loading State Hierarchy

```typescript
interface LoadingStates {
  initial: boolean; // First page load
  searching: boolean; // Active search with debounce
  transitioning: boolean; // Sort/filter changes
  paginating: boolean; // Loading more items
  refreshing: boolean; // Background refresh
}
```

## Adaptive Loading Patterns

### Context-Aware Loading

The system adapts loading behavior based on user context and interaction patterns:

#### Network-Aware Loading

```typescript
const getLoadingStrategy = () => {
  const connection = navigator.connection;

  if (connection?.effectiveType === '4g') {
    return {
      skeletonCount: 12,
      skeletonDuration: 300,
      eagerLoad: true,
      prefetchNext: true,
    };
  }

  return {
    skeletonCount: 6,
    skeletonDuration: 500,
    eagerLoad: false,
    prefetchNext: false,
  };
};
```

#### Device-Aware Loading

```typescript
const isMobile = useMediaQuery('(max-width: 768px)');
const skeletonGrid = isMobile ? 'grid-cols-2' : 'grid-cols-4';
const itemsPerPage = isMobile ? 12 : 24;
```

### Progressive Enhancement

1. **Initial Load**: Show skeleton loaders immediately
2. **Data Arrival**: Smooth transition from skeleton to content
3. **Interaction**: Optimistic updates with background revalidation
4. **Error State**: Graceful degradation with cached data

## Skeleton Loader Implementation

### Anatomy of Effective Skeletons

```typescript
const ProductSkeleton = () => (
  <div className="animate-pulse">
    {/* Image placeholder */}
    <div className="aspect-square bg-gray-200 rounded-lg" />

    {/* Content structure matching real product */}
    <div className="mt-4 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-6 bg-gray-200 rounded w-1/4" />
    </div>
  </div>
);
```

### Skeleton Best Practices

#### Match Content Structure

- Skeleton should mirror actual content layout
- Maintain consistent spacing and sizing
- Include all major visual elements

#### Animation Timing

```css
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

#### Skeleton Count Strategy

```typescript
const getSkeletonCount = (viewportWidth: number) => {
  if (viewportWidth < 640) return 4; // Mobile: 2x2
  if (viewportWidth < 1024) return 6; // Tablet: 3x2
  return 12; // Desktop: 4x3
};
```

## Performance Optimization Techniques

### Query Optimization

#### Debouncing Search

```typescript
const SEARCH_DEBOUNCE_MS = 500;

const debouncedSearch = useMemo(
  () =>
    debounce((value: string) => {
      updateUrlState({ search: value });
    }, SEARCH_DEBOUNCE_MS),
  []
);
```

#### Parallel Query Execution

```typescript
// ✅ Parallel - Optimal performance
const [products, facets, navigation] = await Promise.all([
  fetchProducts(),
  fetchFacets(),
  fetchNavigation(),
]);

// ❌ Sequential - Poor performance
const products = await fetchProducts();
const facets = await fetchFacets();
const navigation = await fetchNavigation();
```

### Caching Strategies

#### SWR Configuration

```typescript
const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 2000,
  focusThrottleInterval: 5000,
  errorRetryCount: 3,
  errorRetryInterval: 1000,
};
```

#### Cache Key Strategy

```typescript
const getCacheKey = (params) => {
  // Stable key generation for consistent caching
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((acc, key) => {
      if (params[key] !== undefined && params[key] !== null) {
        acc[key] = params[key];
      }
      return acc;
    }, {});

  return JSON.stringify(sortedParams);
};
```

### Bundle Optimization

#### Code Splitting

```typescript
// Dynamic imports for heavy components
const ProductQuickView = dynamic(
  () => import('@/components/ProductQuickView'),
  {
    loading: () => <QuickViewSkeleton />,
    ssr: false
  }
);
```

#### Image Optimization

```typescript
<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={400}
  loading="lazy"
  placeholder="blur"
  blurDataURL={product.blurHash}
  sizes="(max-width: 640px) 50vw,
         (max-width: 1024px) 33vw,
         25vw"
/>
```

## Loading State Coordination

### Preventing Layout Shift

```typescript
const useFacetsPersistence = () => {
  const previousFacetsRef = useRef(null);

  return {
    getFacets: (loading, currentFacets) => {
      if (!loading && currentFacets) {
        previousFacetsRef.current = currentFacets;
        return currentFacets;
      }
      // Return previous facets during loading to prevent collapse
      return previousFacetsRef.current || [];
    },
  };
};
```

### Smooth Transitions

```typescript
const LoadingTransition = ({ loading, children }) => (
  <div className={cn(
    "transition-opacity duration-200",
    loading && "opacity-50 pointer-events-none"
  )}>
    {children}
  </div>
);
```

## Performance Metrics

### Key Metrics to Track

```typescript
interface PerformanceMetrics {
  // Core Web Vitals
  LCP: number; // Largest Contentful Paint < 2.5s
  FID: number; // First Input Delay < 100ms
  CLS: number; // Cumulative Layout Shift < 0.1

  // Custom Metrics
  TTI: number; // Time to Interactive
  TBT: number; // Total Blocking Time
  FCP: number; // First Contentful Paint
}
```

### Monitoring Implementation

```typescript
useEffect(() => {
  // Track page load performance
  if (typeof window !== 'undefined' && window.performance) {
    const navigation = performance.getEntriesByType('navigation')[0];

    console.log('Performance Metrics:', {
      domContentLoaded: navigation.domContentLoadedEventEnd,
      loadComplete: navigation.loadEventEnd,
      domInteractive: navigation.domInteractive,
    });
  }
}, []);
```

## Advanced Loading Patterns

### Optimistic Updates

```typescript
const handleFilterChange = async (newFilter) => {
  // 1. Update UI immediately
  setOptimisticFilter(newFilter);

  // 2. Fetch new data in background
  const data = await fetchProducts(newFilter);

  // 3. Reconcile with server response
  if (data) {
    setProducts(data);
  } else {
    // Rollback on error
    setOptimisticFilter(previousFilter);
  }
};
```

### Incremental Loading

```typescript
const useIncrementalLoad = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    const newItems = await fetchPage(page);

    if (newItems.length < PAGE_SIZE) {
      setHasMore(false);
    }

    setItems((prev) => [...prev, ...newItems]);
    setPage((prev) => prev + 1);
  }, [page]);

  return { items, loadMore, hasMore };
};
```

### Predictive Prefetching

```typescript
const usePredictivePrefetch = () => {
  const prefetchCategory = (category: string) => {
    // Prefetch likely next navigation
    router.prefetch(`/category/${category}`);

    // Preload data
    mutate(
      ['products', category],
      fetchProducts({ category }),
      false // Don't revalidate
    );
  };

  return { prefetchCategory };
};
```

## Troubleshooting Performance Issues

### Common Problems and Solutions

#### Janky Animations During Load

**Problem**: Skeletons stutter or freeze  
**Solution**: Use CSS animations instead of JS, enable GPU acceleration

```css
.skeleton {
  transform: translateZ(0); /* GPU acceleration */
  will-change: opacity;
}
```

#### Slow Initial Load

**Problem**: Large bundle blocking render  
**Solution**: Implement code splitting and lazy loading

```typescript
const HeavyComponent = lazy(() => import(/* webpackChunkName: "heavy" */ './HeavyComponent'));
```

#### Memory Leaks

**Problem**: Performance degrades over time  
**Solution**: Proper cleanup in useEffect

```typescript
useEffect(() => {
  const timer = setTimeout(callback, delay);
  return () => clearTimeout(timer); // Cleanup
}, []);
```

## Performance Checklist

- [ ] Implement coordinated loading states
- [ ] Add appropriate skeleton loaders
- [ ] Debounce search inputs (500ms)
- [ ] Use parallel queries where possible
- [ ] Configure SWR for optimal caching
- [ ] Implement code splitting for heavy components
- [ ] Optimize images with Next.js Image component
- [ ] Monitor Core Web Vitals
- [ ] Test on slow connections
- [ ] Profile with React DevTools

## Related Documentation

- [Unified Query Architecture](../architecture/unified-query-architecture.md)
- [SSR Implementation](./ssr-implementation.md)
- [API Integration](./api-integration.md)
- [Troubleshooting Guide](../reference/troubleshooting.md)
