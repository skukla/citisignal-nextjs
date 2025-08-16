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
- [Troubleshooting](./docs/troubleshooting.md) - Common issues
- [Future Improvements](./docs/future-improvements.md) - Planned enhancements
- [Code Standards](./docs/code-standards.md) - Best practices and patterns
- [Loading Strategy](./docs/loading-strategy.md) - Coordinated loading approach

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

## Next Steps

Apply compound component pattern to:
- Checkout pages (multi-step form)
- Home page sections
- Search results page
- Product detail pages