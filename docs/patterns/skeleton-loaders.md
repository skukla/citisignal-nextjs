# Skeleton Loader Best Practices

## Overview

Skeleton loaders provide visual placeholders that mimic the structure of content while it's loading. When implemented correctly, they reduce perceived loading time and prevent layout shift.

## Key Principles

### 1. Match Content Structure

Skeletons should closely match the actual content layout to minimize visual disruption when content loads.

**Bad:**

```tsx
// Generic skeleton that doesn't match content
<div className="h-40 bg-gray-200 animate-pulse" />
```

**Good:**

```tsx
// Skeleton that matches actual facet structure
{
  sections.map((section) => (
    <div key={section.key}>
      <div className="h-5 bg-gray-200 rounded w-24" /> {/* Title */}
      {Array.from({ length: section.optionCount }).map((i) => (
        <div key={i} className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-gray-200 rounded" /> {/* Checkbox */}
          <div className="h-4 bg-gray-200 rounded w-20" /> {/* Label */}
          <div className="h-4 bg-gray-200 rounded w-8" /> {/* Count */}
        </div>
      ))}
    </div>
  ));
}
```

### 2. Appropriate Height and Spacing

Skeleton height should match typical content to prevent layout shift:

```typescript
// Analyze your actual data to determine appropriate defaults
const DEFAULT_SKELETON_CONFIG = {
  sectionsCount: 4, // Most pages have 3-5 filter sections
  optionsPerSection: 5, // Average 4-6 options per section
  lastSectionOptions: 4, // Vary the last section for realism
};
```

### 3. Progressive Enhancement

Start with a good default, then use actual data structure when available:

```typescript
const [skeletonStructure, setSkeletonStructure] = useState(DEFAULT_STRUCTURE);

useEffect(() => {
  if (data) {
    // Use actual data structure for subsequent skeletons
    setSkeletonStructure({
      sections: data.facets.map((f) => ({
        key: f.key,
        optionCount: f.options.length,
      })),
    });
  }
}, [data]);
```

## When to Show Skeletons

### ✅ Use Skeletons For:

- **Initial page load** - No previous content to show
- **Route changes** - Navigating to a new page
- **Empty to populated transitions** - Going from no results to results

### ❌ Avoid Skeletons For:

- **Filter updates** - Keep existing content visible
- **Pagination** - Show inline loading for additional items
- **Refreshing existing data** - Use subtle loading indicators
- **Quick operations** (<300ms) - No loader needed

## Implementation Patterns

### 1. Adaptive Skeleton Pattern

Show skeleton only when truly needed:

```typescript
const showSkeleton = !hasPreviousData && isLoading;
const showInlineLoading = hasPreviousData && isLoading;

return showSkeleton ? (
  <SkeletonLoader />
) : (
  <Content className={showInlineLoading ? 'opacity-50' : ''} />
);
```

### 2. Skeleton with Memory

Remember content structure for better subsequent skeletons:

```typescript
interface SkeletonMemory {
  structure: SkeletonSection[];
  timestamp: number;
}

const useSkeletonMemory = () => {
  const [memory, setMemory] = useState<SkeletonMemory>();

  // Use remembered structure if recent (< 5 minutes old)
  const getSkeletonStructure = () => {
    if (memory && Date.now() - memory.timestamp < 300000) {
      return memory.structure;
    }
    return DEFAULT_STRUCTURE;
  };

  return { getSkeletonStructure, setMemory };
};
```

### 3. Responsive Skeletons

Different skeleton layouts for different screen sizes:

```tsx
export function ResponsiveSkeleton() {
  return (
    <>
      {/* Desktop skeleton */}
      <div className="hidden lg:block">
        <DesktopSkeleton />
      </div>

      {/* Mobile skeleton */}
      <div className="lg:hidden">
        <MobileSkeleton />
      </div>
    </>
  );
}
```

## Animation Best Practices

### 1. Pulse Animation

Use subtle pulse animation to indicate loading:

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

### 2. Staggered Loading

Add visual interest with staggered animations:

```tsx
{
  items.map((item, index) => (
    <div key={item.key} className="animate-pulse" style={{ animationDelay: `${index * 100}ms` }}>
      {/* Skeleton content */}
    </div>
  ));
}
```

### 3. Smooth Transitions

Fade between skeleton and content:

```tsx
<div className="relative">
  <div
    className={`transition-opacity duration-300 ${
      isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
  >
    <Skeleton />
  </div>

  <div className={`transition-opacity duration-300 ${!isLoading ? 'opacity-100' : 'opacity-0'}`}>
    <Content />
  </div>
</div>
```

## Performance Optimization

### 1. Lazy Load Skeletons

Only import skeleton components when needed:

```typescript
const SkeletonLoader = lazy(() => import('./SkeletonLoader'));
```

### 2. Memoize Skeleton Structure

Prevent unnecessary re-renders:

```typescript
const skeletonStructure = useMemo(() => {
  if (!data) return DEFAULT_STRUCTURE;
  return data.map((item) => ({
    key: item.id,
    height: calculateHeight(item),
  }));
}, [data]);
```

### 3. CSS-Only Skeletons

Use CSS for better performance:

```css
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

## Accessibility

### 1. ARIA Labels

Properly label loading states:

```tsx
<div role="status" aria-label="Loading content">
  <Skeleton />
  <span className="sr-only">Loading...</span>
</div>
```

### 2. Reduced Motion

Respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-pulse {
    animation: none;
    opacity: 0.8;
  }
}
```

## Common Pitfalls

### ❌ Showing Skeletons Too Often

**Problem**: Skeleton appears for every minor update
**Solution**: Use adaptive loading pattern

### ❌ Mismatched Heights

**Problem**: Content jumps when skeleton is replaced
**Solution**: Analyze actual content and match skeleton height

### ❌ Too Fast/Too Slow

**Problem**: Skeleton flashes or stays too long
**Solution**: Minimum display time of 500ms, maximum based on p95 load time

### ❌ Generic Skeletons

**Problem**: One-size-fits-all skeleton
**Solution**: Create specific skeletons for different content types

## Testing

```typescript
describe('Skeleton Loader', () => {
  it('should match content structure', () => {
    const { container } = render(<Skeleton sections={mockSections} />);
    expect(container.querySelectorAll('.skeleton-section')).toHaveLength(
      mockSections.length
    );
  });

  it('should not cause layout shift', () => {
    const { rerender } = render(<Skeleton />);
    const skeletonHeight = document.body.scrollHeight;

    rerender(<Content />);
    const contentHeight = document.body.scrollHeight;

    expect(Math.abs(skeletonHeight - contentHeight)).toBeLessThan(50);
  });
});
```
