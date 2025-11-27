# Unified Query Pattern - Reference Implementation

**STATUS:** Read-only reference (not actively used)

Complete end-to-end example of unified query pattern consumption.

## Contents

- `hooks/` - useProductPageData, useCategoryPageData
- `components/` - UnifiedProductPage
- `graphql/` - GetCategoryPageData query

## Why Reference Only?

Unified queries offer faster initial load (~220ms vs ~380ms) but higher maintenance:

- Must sync with individual resolvers
- Complex conditional logic
- Race condition handling

Individual queries recommended for most use cases.

## When to Use Unified Queries

Only consider unified queries if:

- SSR performance is critical (every millisecond matters)
- High-traffic pages (100k+ daily visitors)
- Team has capacity for higher maintenance burden

## Backend Resolver

The backend resolver is also in reference-only status:

- `commerce-mesh/resolvers-src/reference/category-page.js`

## Documentation

See: `commerce-mesh/docs/architecture/context-state-query-pattern-implications.md`
