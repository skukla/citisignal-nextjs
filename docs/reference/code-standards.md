# Code Standards & Best Practices

## Simplicity & Maintainability

### Extract Complex Logic

If logic needs a comment, extract it to a named function.

### Limit Dependencies

- useMemo: Over 10 dependencies suggests component does too much
- Context: Over 15 values needs splitting

### Clear Code Structure

- **Early Returns** - Exit early instead of nesting conditionals
- **Flat Over Nested** - Avoid deeply nested ternaries and object spreads
- **One Concern Per Hook** - Hooks should do one thing well
- **No Magic Numbers** - Use named constants for all values

### Naming Conventions

- **Descriptive Names** - `isUserEligibleForDiscount` not `checkUser`
- **No Inline Business Logic** - Extract complex conditions to descriptive functions

## Code Smells to Avoid

### ❌ BAD: Complex inline logic

```tsx
sortBy: (() => {
  if (!sort) return 'RELEVANCE';
  const attribute = sort.attribute;
  const direction = sort.direction;
  if (attribute === 'RELEVANCE') return 'RELEVANCE';
  return `${attribute}_${direction}`;
})();
```

### ✅ GOOD: Extract to function

```tsx
const formatSortValue = (sort) => {
  if (!sort || sort.attribute === 'RELEVANCE') return 'RELEVANCE';
  return `${sort.attribute}_${sort.direction}`;
};
// Then use: sortBy: formatSortValue(sort)
```

### ❌ BAD: Nested conditional spreads

```tsx
activeFilters: {
  ...(manufacturer ? { manufacturer: [manufacturer] } : {}),
  ...(memory?.length ? { memory } : {}),
  ...(priceMin !== undefined || priceMax !== undefined ? {
    price: [`${priceMin || 0}-${priceMax || 999999}`]
  } : {})
}
```

### ✅ GOOD: Build object clearly

```tsx
const buildActiveFilters = (filters) => {
  const active = {};
  if (filters.manufacturer) active.manufacturer = [filters.manufacturer];
  if (filters.memory?.length) active.memory = filters.memory;
  if (filters.hasPrice) active.price = [filters.priceRange];
  return active;
};
```

## API Integration

- **Use Custom Resolvers** - `Citisignal_*` queries for consistent data
- **Normalize in Resolver** - Don't transform data in frontend
- **Handle Images Properly** - Use `productView.images` for Live Search

## UI/UX Patterns

- **Show All Products** - Display out-of-stock with badges, don't filter
- **Compound Components** - Use Context to avoid prop drilling
- **Smart Components** - Encapsulate logic, keep JSX clean
- **Reuse UI Components** - Check `/ui` folder before creating new

## Code Quality

- **TypeScript Strict** - Define all types and interfaces
- **Path Alias** - Use `@/*` instead of relative imports
- **Single Source of Truth** - Constants in one place
- **No Debug Code** - Remove console.logs before commit
- **Tailwind First** - Use Tailwind classes not inline styles
