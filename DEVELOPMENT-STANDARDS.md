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

## Current State

### ✅ Completed Features
- **Product Pages** - All 6 pages using compound components (70% code reduction)
- **Account Pages** - All 7 pages using compound components (65% code reduction)
- **Hybrid API Integration** - Intelligent Catalog/Live Search selection
- **Search Suggestions** - Autocomplete with `Citisignal_searchSuggestions`
- **Dynamic Facets** - Ready for Live Search faceted navigation
- **Unified Data Layer** - Consistent API responses via custom resolvers

### Architecture Patterns

**Compound Components with Context**
```tsx
<ProductPageProvider category="phones" pageData={pageData}>
  <ProductPage.Background>
    <ProductPage.Container>
      <ProductPage.Header />
      <ProductPage.Content />  {/* Smart component with logic */}
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

## Tech Stack

- **Next.js 15.4.2** - App Router, Turbopack
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

### Code Quality
- **TypeScript Strict** - Define all types and interfaces
- **Path Alias** - Use `@/*` instead of relative imports
- **Single Source of Truth** - Constants in one place
- **No Debug Code** - Remove console.logs and debug fields before commit

### Simplicity & Maintainability
- **Extract Complex Logic** - If logic needs a comment, extract it to a named function
- **Limit useMemo Dependencies** - Over 10 dependencies suggests component does too much
- **No Inline Business Logic** - Extract complex conditions to descriptive functions
- **Flat Over Nested** - Avoid deeply nested ternaries and object spreads
- **One Concern Per Hook** - Hooks should do one thing well
- **Descriptive Names** - `isUserEligibleForDiscount` not `checkUser`
- **Early Returns** - Exit early instead of nesting conditionals
- **No Magic Numbers** - Use named constants for all values
- **Limit Context Values** - Large contexts (>15 values) need splitting

### Code Smells to Avoid

**❌ BAD: Complex inline logic**
```tsx
sortBy: (() => {
  if (!sort) return 'RELEVANCE';
  const attribute = sort.attribute;
  const direction = sort.direction;
  if (attribute === 'RELEVANCE') return 'RELEVANCE';
  return `${attribute}_${direction}`;
})()
```

**✅ GOOD: Extract to function**
```tsx
const formatSortValue = (sort) => {
  if (!sort || sort.attribute === 'RELEVANCE') return 'RELEVANCE';
  return `${sort.attribute}_${sort.direction}`;
};
// Then use: sortBy: formatSortValue(sort)
```

**❌ BAD: Nested conditional spreads**
```tsx
activeFilters: {
  ...(manufacturer ? { manufacturer: [manufacturer] } : {}),
  ...(memory?.length ? { memory } : {}),
  ...(priceMin !== undefined || priceMax !== undefined ? { 
    price: [`${priceMin || 0}-${priceMax || 999999}`] 
  } : {})
}
```

**✅ GOOD: Build object clearly**
```tsx
const buildActiveFilters = (filters) => {
  const active = {};
  if (filters.manufacturer) active.manufacturer = [filters.manufacturer];
  if (filters.memory?.length) active.memory = filters.memory;
  if (filters.hasPrice) active.price = [filters.priceRange];
  return active;
};
```

## Documentation

- [API Integration](./docs/api-integration.md) - Adobe Commerce Mesh
- [Component Patterns](./docs/component-patterns.md) - Compound components guide
- [Troubleshooting](./docs/troubleshooting.md) - Common issues
- [Future Improvements](./docs/future-improvements.md) - Planned enhancements

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

## Next Steps

Apply compound component pattern to:
- Checkout pages (multi-step form)
- Home page sections
- Search results page
- Product detail pages