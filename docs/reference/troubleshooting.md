# Troubleshooting Guide

## Overview

This comprehensive guide covers common issues, debugging strategies, and solutions for the CitiSignal Next.js application. Issues are organized by category for quick reference.

## Table of Contents

- [Loading States](#loading-states)
- [Query and Data Fetching](#query-and-data-fetching)
- [Performance Issues](#performance-issues)
- [UI/UX Problems](#uiux-problems)
- [API Integration](#api-integration)
- [Development Environment](#development-environment)
- [Production Issues](#production-issues)

## Loading States

### Skeleton Shows on Every Filter Change

**Symptoms:**

- Skeleton loader appears when applying filters
- UI "resets" on each interaction
- Loss of user context

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

### Layout Shift When Loading Completes

**Symptoms:**

- Content jumps when skeleton is replaced
- Scroll position changes
- Visual jarring

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

### Multiple Loading States Shown

**Symptoms:**

- Both skeleton and spinner visible
- Overlapping loading indicators
- Confusing visual feedback

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

## Query and Data Fetching

### Queries Not Switching Between Modes

**Symptoms:**

- Single Query toggle not working
- Still seeing multiple queries when unified mode is ON
- Queries executing with empty parameters

**Root Cause:**
Empty object `{}` still triggers SWR query execution

**Solution:**

```typescript
// ❌ INCORRECT - Will still make the query
const unifiedData = useCategoryPageData(useUnifiedQuery ? { ...params } : {});

// ✅ CORRECT - Properly prevents query
const unifiedData = useCategoryPageData(useUnifiedQuery ? { ...params } : null);
```

### Stale Data After Navigation

**Symptoms:**

- Old category data showing briefly
- Flash of incorrect content
- Cache not updating properly

**Solution:**

```typescript
// Use SWR's mutate to clear cache on navigation
useEffect(() => {
  return () => {
    // Clear cache when leaving page
    mutate((key) => Array.isArray(key) && key[0] === GET_PRODUCTS, undefined, {
      revalidate: false,
    });
  };
}, [category]);
```

### Infinite Refetch Loop

**Symptoms:**

- Continuous network requests
- Performance degradation
- Browser becomes unresponsive

**Root Cause:**
Dependencies causing constant re-renders

**Solution:**

```typescript
// Stabilize query variables
const variables = useMemo(
  () => ({
    category,
    filters: stableFilters,
    sort: stableSort,
  }),
  [category, stableFilters, stableSort]
);

// Use stable variables in query
const { data } = useQuery(variables);
```

## Performance Issues

### Slow Initial Page Load

**Symptoms:**

- Long time to first paint
- Large bundle size
- Blocking resources

**Solutions:**

1. **Implement Code Splitting:**

```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), { ssr: false });
```

2. **Optimize Images:**

```typescript
<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={400}
  loading="lazy"
  placeholder="blur"
  sizes="(max-width: 640px) 50vw, 25vw"
/>
```

3. **Reduce Bundle Size:**

```bash
# Analyze bundle
npm run build
npm run analyze
```

### Memory Leaks

**Symptoms:**

- Performance degrades over time
- Browser tab becomes slow
- High memory usage

**Common Causes & Solutions:**

```typescript
// ❌ Memory leak - No cleanup
useEffect(() => {
  const timer = setInterval(callback, 1000);
});

// ✅ Proper cleanup
useEffect(() => {
  const timer = setInterval(callback, 1000);
  return () => clearInterval(timer);
}, []);
```

### Janky Animations

**Symptoms:**

- Stuttering transitions
- Dropped frames
- Unsmooth scrolling

**Solution:**

```css
/* Enable GPU acceleration */
.animated-element {
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
}

/* Use CSS instead of JS animations */
.skeleton {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

## UI/UX Problems

### Scroll Position Resets

**Symptoms:**

- Page jumps to top on filter change
- Lost reading position
- Poor user experience

**Solution:**

```typescript
// Next.js App Router
const updateFilters = (params) => {
  router.push(`${pathname}?${params}`, { scroll: false });
};

// With shallow routing
router.push(url, undefined, { shallow: true, scroll: false });
```

### Flash of Unstyled Content (FOUC)

**Symptoms:**

- Brief flash of unstyled elements
- Layout shift on load
- Fonts loading late

**Solutions:**

1. **Preload Critical Fonts:**

```html
<link
  rel="preload"
  href="/fonts/inter-var.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous"
/>
```

2. **Inline Critical CSS:**

```typescript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
  },
};
```

### Mobile Menu Not Working

**Symptoms:**

- Menu doesn't open/close
- Backdrop not appearing
- Body still scrollable

**Solution:**

```typescript
// Proper mobile menu implementation
const MobileMenu = ({ isOpen, onClose }) => {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 h-full w-80 bg-white">
        {/* Menu content */}
      </div>
    </div>,
    document.body
  );
};
```

## API Integration

### CORS Errors

**Symptoms:**

- "Access-Control-Allow-Origin" errors
- Requests blocked by browser
- API calls failing

**Solutions:**

1. **Configure API Headers:**

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  return response;
}
```

2. **Use API Routes as Proxy:**

```typescript
// app/api/products/route.ts
export async function GET(request: Request) {
  const response = await fetch(EXTERNAL_API_URL, {
    headers: {
      'X-API-Key': process.env.API_KEY,
    },
  });

  return Response.json(await response.json());
}
```

### Authentication Errors

**Symptoms:**

- 401/403 errors
- "Unauthorized" responses
- Token expiration issues

**Solution:**

```typescript
// Implement token refresh
const fetcher = async (url: string) => {
  try {
    return await fetchWithToken(url);
  } catch (error) {
    if (error.status === 401) {
      await refreshToken();
      return await fetchWithToken(url);
    }
    throw error;
  }
};
```

### Rate Limiting

**Symptoms:**

- 429 "Too Many Requests" errors
- Intermittent API failures
- Degraded performance

**Solution:**

```typescript
// Implement request throttling
import pThrottle from 'p-throttle';

const throttle = pThrottle({
  limit: 10,
  interval: 1000, // 10 requests per second
});

const throttledFetch = throttle(async (url) => {
  return fetch(url);
});
```

## Development Environment

### Hot Reload Not Working

**Symptoms:**

- Changes not reflecting
- Need manual refresh
- Dev server not detecting file changes

**Solutions:**

1. **Check File Watching Limits:**

```bash
# Linux/Mac
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

2. **Clear Next.js Cache:**

```bash
rm -rf .next
npm run dev
```

3. **Check WSL2 Settings (Windows):**

```json
// .env.local
WATCHPACK_POLLING=true
```

### TypeScript Errors Not Showing

**Symptoms:**

- Errors only appear on build
- IDE not showing type errors
- Inconsistent type checking

**Solution:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "incremental": true,
    "skipLibCheck": false
  }
}
```

## Production Issues

### Build Failures

**Common Errors and Solutions:**

1. **"Module not found"**

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

2. **"Export encountered errors"**

```typescript
// Check for runtime-only code in static exports
const Component = () => {
  // ❌ Will fail in static export
  if (typeof window !== 'undefined') {
    localStorage.getItem('key');
  }

  // ✅ Safe for static export
  useEffect(() => {
    localStorage.getItem('key');
  }, []);
};
```

### Different Behavior in Production

**Symptoms:**

- Works in dev, fails in production
- Different rendering results
- Missing functionality

**Common Causes:**

1. **React StrictMode (Dev Only):**

```typescript
// Account for double-rendering in dev
const hasRun = useRef(false);
useEffect(() => {
  if (hasRun.current) return;
  hasRun.current = true;
  // Run once logic
}, []);
```

2. **Environment Variables:**

```typescript
// Ensure proper prefixing
NEXT_PUBLIC_API_URL=https://api.example.com // ✅ Available in browser
API_SECRET=secret // ❌ Server only
```

### Performance Regression

**Symptoms:**

- Slower than development
- High server response times
- Poor Core Web Vitals

**Debugging Steps:**

1. **Enable Performance Monitoring:**

```typescript
// pages/_app.tsx or app/layout.tsx
export function reportWebVitals(metric) {
  console.log(metric);
  // Send to analytics
}
```

2. **Check Build Output:**

```bash
npm run build
# Look for:
# - Large page sizes (>500kB)
# - Large first load JS (>200kB)
# - Missing static optimization
```

3. **Profile in Production:**

```typescript
// Add timing markers
performance.mark('myFeature-start');
// ... code ...
performance.mark('myFeature-end');
performance.measure('myFeature', 'myFeature-start', 'myFeature-end');
```

## Debug Utilities

### Loading State Logger

```typescript
const useDebugLoading = (name: string, state: any) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${name}] State:`, {
        loading: state.loading,
        error: state.error,
        hasData: !!state.data,
        timestamp: new Date().toISOString(),
      });
    }
  }, [name, state]);
};
```

### Network Request Monitor

```typescript
// Development-only request monitor
if (process.env.NODE_ENV === 'development') {
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    console.log('📡 Fetch:', args[0]);
    const start = performance.now();
    try {
      const response = await originalFetch(...args);
      console.log(`✅ ${args[0]} - ${performance.now() - start}ms`);
      return response;
    } catch (error) {
      console.error(`❌ ${args[0]} - ${error.message}`);
      throw error;
    }
  };
}
```

### Visual Debug Overlay

```typescript
const DebugOverlay = () => {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-0 left-0 bg-black text-white p-2 text-xs z-50">
      <div>Render: {new Date().toISOString()}</div>
      <div>Route: {pathname}</div>
      <div>Viewport: {width}x{height}</div>
    </div>
  );
};
```

## Quick Reference Checklist

When troubleshooting issues, check:

- [ ] Browser console for errors
- [ ] Network tab for failed requests
- [ ] React DevTools for component state
- [ ] Performance tab for bottlenecks
- [ ] Build output for warnings
- [ ] TypeScript compilation errors
- [ ] Environment variable configuration
- [ ] Cache invalidation needs
- [ ] Memory leaks in useEffect
- [ ] Proper error boundaries

## Getting Help

If you're still stuck:

1. Check the [GitHub Issues](https://github.com/citisignal/issues)
2. Review the [API Documentation](../guides/api-integration.md)
3. Consult the [Architecture Guide](../architecture/overview.md)
4. Enable debug mode with `DEBUG=* npm run dev`
5. Create a minimal reproduction

## Related Documentation

- [Performance Guide](../guides/performance-and-loading.md)
- [API Integration](../guides/api-integration.md)
- [Component Patterns](../architecture/component-patterns.md)
- [Development Strategy](../DEVELOPMENT-STRATEGY.md)
