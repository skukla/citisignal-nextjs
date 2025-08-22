# CitiSignal Next.js Project

Next.js 15 telecommunications e-commerce frontend with Adobe Commerce API Mesh integration.

## Quick Reference

- **Dev Server**: `npm run dev` (http://localhost:3000)
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **API**: `https://edge-sandbox-graph.adobe.io/api/d5818ebf-e560-45b3-9830-79183dbfaf27/graphql`

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/
│   ├── layout/       # Page layouts and compound components
│   │   └── ProductPage/  # 25+ compound components for products
│   ├── sections/     # Page-specific sections
│   └── ui/           # Reusable UI components
├── hooks/            # Custom React hooks
├── types/            # TypeScript interfaces
├── data/             # Static page configuration
└── utils/            # Utilities
```

## Branch: demo-inspector-client-only

This branch demonstrates a pure client-side rendering approach with full Demo Inspector functionality including single query mode toggle.

### Single Query Mode Implementation Details

**Query Behavior**

- **Initial load**: Only `GetCategoryPageData` runs (unified query)
- **First user interaction**: Switches to `GetProductCards` + `GetProductFacets` (individual queries)
- **Filter changes**: Both queries run (products update, facets update contextually per Adobe docs)
- **Sort changes**: Only `GetProductCards` runs (facets use SWR cache, no network request)

**Facet Preservation During Loading**
To prevent facets from disappearing during loading (which causes layout shift):

1. **Problem**: When switching query modes or updating filters, facets briefly disappear
2. **Solution**: Store previous facets in a ref and reuse them during loading
3. **Implementation**:
   - `ProductPageProvider` uses `previousFacetsRef` to store last known facets
   - During loading, facets fall back to previous values instead of empty array
   - Applies to both unified and individual query modes
   - Prevents the sidebar from collapsing and products taking full width

**Dynamic Facet Updates**
Per Adobe Live Search documentation, facets are **contextual** - they update based on applied filters:

- Filter by "Apple" → Memory facet shows only Apple phone memory options
- Uses selective exclusion: each facet excludes itself but includes other filters
- Both queries must run when filters change for accurate contextual facets
- SWR deduplication prevents unnecessary facet requests when only sort changes

**Implementation Notes**

- `userHasInteracted` flag tracks when to switch from unified to individual queries
- Resets when switching modes or changing categories
- Unified query uses frozen initial URL state to prevent re-runs
- Individual queries use current URL state for real-time updates

## Current State

### ✅ Completed Features

- **Product Pages** - All 6 pages using compound components (70% code reduction)
- **Account Pages** - All 7 pages using compound components (65% code reduction)
- **Hybrid API Integration** - Intelligent Catalog/Live Search selection
- **Search Suggestions** - Autocomplete with `Citisignal_searchSuggestions`
- **Dynamic Facets** - Ready for Live Search faceted navigation
- **Unified Data Layer** - Consistent API responses via custom resolvers
- **Category Navigation** - Dynamic navigation from Commerce API (header & footer)
- **Breadcrumbs** - Category breadcrumb trails for SEO and navigation
- **Demo Inspector** - Visual debugging tool (Cmd+Shift+D toggle, Cmd+Shift+E expand/collapse)
- **Single Query Mode** - Toggle between unified and multiple queries for demonstration
- **Client-Side Rendering** - All data fetched on the client for maximum interactivity

### Architecture Patterns

**Compound Components with Context**

```tsx
<ProductPageProvider category="phones" pageData={pageData}>
  <ProductPage.Background>
    <ProductPage.Container>
      <ProductPage.Header />
      <ProductPage.Content /> {/* Smart component with logic */}
    </ProductPage.Container>
  </ProductPage.Background>
</ProductPageProvider>
```

**Key Principles:**

1. Context for data flow (no prop drilling)
2. Smart components for conditional logic
3. Thin wrappers for context integration
4. Explicit structure over hidden abstractions
5. Composable components (no auto-wrapping)

### Hybrid Search Architecture

When users search, we run Live Search + Catalog in parallel:

- **Live Search**: AI relevance ranking (SKUs only)
- **Catalog Service**: Complete product details
- **Result**: AI-ranked products with full attributes (50% faster than sequential)

Service selection:

- Search text → Hybrid (both services in parallel)
- No search → Catalog only
- Facets → Always Live Search (Catalog has no support)

The mesh resolver handles this complexity - frontend just calls `Citisignal_productCards`

## Tech Stack

- **Next.js 15.4.2** - App Router
- **React 19** - TypeScript 5
- **Tailwind CSS 4** - Custom theming
- **SWR** - Data fetching with infinite scroll
- **Adobe API Mesh** - GraphQL gateway for Commerce services

## Development Standards

### API Integration

- **Use Custom Resolvers** - `Citisignal_*` queries for consistent data
- **Hybrid Service Selection** - Catalog for initial loads, Live Search for user interaction
- **Normalize in Resolver** - Don't transform data in frontend
- **Handle Images Properly** - Use `productView.images` for Live Search

### UI/UX Patterns

- **Show All Products** - Display out-of-stock with badges, don't filter
- **Compound Components** - Use Context to avoid prop drilling
- **Smart Components** - Encapsulate logic, keep JSX clean
- **Reuse UI Components** - Check `/ui` folder before creating new

### Code Standards

**[→ See detailed code standards documentation](./docs/code-standards.md)**

- Extract complex logic to named functions
- Use Tailwind classes, not inline styles
- Early returns over nested conditionals
- TypeScript strict mode with proper types
- Remove all debug code before commit

## 🔴 Required Checklists After Every Change

1. **[Code Review Checklist](./docs/code-review-checklist.md)** - Check for over-engineering, patterns, types
2. **[Documentation Checklist](./docs/documentation-checklist.md)** - Update all affected docs

## Documentation

- [API Integration](./docs/api-integration.md) - Adobe Commerce Mesh
- [Component Patterns](./docs/component-patterns.md) - Compound components guide
- [Demo Inspector](./docs/demo-inspector.md) - Visual debugging tool guide
- [SSR Implementation](./docs/ssr-implementation.md) - Server-side rendering
- [Unified Query Architecture](./docs/unified-query-architecture.md) - Single query pattern
- [Troubleshooting](./docs/troubleshooting.md) - Common issues
- [Future Improvements](./docs/future-improvements.md) - Planned enhancements
- [Code Standards](./docs/code-standards.md) - Best practices and patterns
- [Loading Strategy](./docs/loading-strategy.md) - Coordinated loading approach
- [Adaptive Loading Patterns](./docs/patterns/adaptive-loading.md) - Context-aware loading states
- [Skeleton Loader Best Practices](./docs/patterns/skeleton-loaders.md) - When and how to use skeletons
- [Loading States Troubleshooting](./docs/troubleshooting/loading-states.md) - Common issues & fixes

## Product Categories

Active: `phones`, `watches`, `accessories`, `plans`, `streaming`, `gift-cards`
Removed: `internet-deals` (not suitable for e-commerce catalog)

## Architecture Decisions

### Why Compound Components?

- **Eliminates prop drilling** - Data flows through context
- **Self-documenting** - JSX structure shows intent
- **Composable** - Mix and match components as needed
- **Maintainable** - Logic isolated in smart components

### Why Keep Page Structure Duplication?

- **Developer experience** - Everything visible in one file
- **Debugging** - No jumping between files
- **Flexibility** - Easy to make one page unique
- **Structure != Logic** - Logic is properly abstracted

### Component Organization

- `/components/layout/` - Page-level compound components
- `/components/ui/` - Reusable UI components
- Thin wrappers connect context to existing UI components

## Coordinated Loading Strategy

**[→ See detailed loading strategy documentation](./docs/loading-strategy.md)**

- Single `usePageLoading` hook for coordinated skeletons
- Shows all skeletons on: initial load, search changes, sort changes
- Independent loading for filter changes
- LayeredTransition prevents layout shifts
- 500ms search debouncing prevents flicker

## Adaptive Loading Pattern (2024-01-08)

**[→ See detailed adaptive loading documentation](./docs/patterns/adaptive-loading.md)**

### Problem Solved

- Skeleton loader appeared on every filter change, causing jarring UX
- Users lost context when applying filters
- Constant UI resets disrupted browsing experience

### Solution Implemented

**Adaptive loading** that shows different UI based on context:

- **Initial load**: Show skeleton (no previous data exists)
- **Filter/sort changes**: Show inline loading (preserve UI, add spinner)
- **Clear filters**: Maintain scroll position

### Key Implementation Details

#### 1. Store Previous Data

```typescript
const previousFacetsRef = useRef(facets);
useEffect(() => {
  if (facets?.length > 0) previousFacetsRef.current = facets;
}, [facets]);
```

#### 2. Adaptive Display Logic

```typescript
const showContent = hasFacets || hasPreviousFacets;
const showSkeleton = !hasPreviousFacets && isLoading;
```

#### 3. Inline Loading Indicators

- 50% opacity on content during loading
- Absolutely positioned spinner (no layout shift)
- Smooth 300ms transitions

### Adobe API Mesh Constraints

**Critical limitations discovered:**

- **No template literals** - Use string concatenation: `'$' + price`
- **No imports/requires** - All code must be inline
- **No external dependencies** - Pure JavaScript only

### Frontend "Dumb" Pattern

- **NO business logic in frontend** - All transformations in mesh
- Frontend only displays what it receives from mesh
- Price formatting, filter parsing, etc. handled by resolvers

### Common Pitfalls & Solutions

#### Mesh Update Detection

**Problem**: Hash check unreliable, compared wrong files
**Solution**: Check source files (resolvers/_.js, schema/_.graphql) not mesh.json

#### Next.js 15 Router API

**Problem**: `router.push(path, undefined, { scroll: false })` doesn't work
**Solution**: Use two-parameter syntax: `router.push(path, { scroll: false })`

#### Filter State Management

**Problem**: Array comparisons failing in useEffect
**Solution**: Use JSON.stringify for array comparison

### Testing Checklist for Loading States

- [ ] Initial page load shows skeleton
- [ ] First filter shows inline loading (not skeleton)
- [ ] Subsequent filters show inline loading
- [ ] Clear all preserves scroll position
- [ ] No layout shift from spinners
- [ ] Smooth transitions (200-300ms)

## Next Steps

Apply compound component pattern to:

- Checkout pages (multi-step form)
- Home page sections
- Search results page
- Product detail pages
