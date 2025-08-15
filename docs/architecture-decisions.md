# Architecture Decisions

## Decision Record

This document captures key architectural decisions made during the CitiSignal Next.js project development.

## 1. Compound Component Pattern

### Decision
Adopt compound components with React Context for all complex multi-component pages.

### Context
Product pages suffered from 14+ layers of prop drilling, making the code hard to maintain and understand.

### Alternatives Considered
1. **Redux/Zustand** - Too heavy for page-level state
2. **Prop drilling** - Current approach, unmaintainable
3. **Render props** - Less readable than compound components
4. **HOCs** - Outdated pattern, poor TypeScript support

### Outcome
- 70% code reduction in product pages
- 65% code reduction in account pages
- Zero prop drilling
- Self-documenting JSX structure

## 2. Structural Duplication Over Abstraction

### Decision
Keep page structure duplicated across similar pages rather than abstracting into a single component.

### Context
All product pages have identical JSX structure. Traditional DRY principles would suggest creating a single `ProductPageLayout` component.

### Reasoning
```tsx
// We chose this (explicit structure in each page):
<ProductPage.Background>
  <ProductPage.Container>
    <ProductPage.Header />
    <ProductPage.Content />
  </ProductPage.Container>
</ProductPage.Background>

// Over this (hidden structure):
<ProductPageLayout category="phones" />
```

### Benefits
- **Debugging** - Everything visible in one file
- **Flexibility** - Easy to make one page unique
- **Onboarding** - New developers understand immediately
- **"Worse is better"** - Simple and obvious over clever

## 3. Thin Wrapper Components

### Decision
Create thin wrapper components that connect context to existing UI components.

### Example
```tsx
// Wrapper component
function ProductPageHeader() {
  const { pageData } = useProductPage();
  return <PageHeader {...pageData} />;
}
```

### Reasoning
- Maintains single responsibility principle
- Reuses battle-tested UI components
- Provides consistent compound component API
- Easy to add page-specific logic later

## 4. Smart Components for Logic

### Decision
Encapsulate all conditional rendering logic in dedicated "smart" components.

### Example
```tsx
function ProductPageContent() {
  const { loading, error, products } = useProductPage();
  
  if (loading) return <ProductSkeleton />;
  if (error) return <ProductError error={error} />;
  if (!products.length) return <EmptyProducts />;
  
  return <ProductGrid products={products} />;
}
```

### Benefits
- Parent components stay clean
- Logic centralized and testable
- Easy to modify conditions
- Reduces cognitive load

## 5. Context at Page Level

### Decision
Provide context at the page level, not globally.

### Reasoning
- Page-specific state doesn't pollute global scope
- Better performance (no unnecessary re-renders)
- Clearer data flow
- Easier testing

### Implementation
```tsx
// Each page has its own provider
<ProductPageProvider>
  {/* Page content */}
</ProductPageProvider>

<AccountPageProvider>
  {/* Different page, different provider */}
</AccountPageProvider>
```

## 6. Environment Variable Standardization

### Decision
Use consistent environment variable names across all services.

### Changes Made
- Renamed `ADOBE_SANDBOX_CATALOG_API_KEY` → `ADOBE_CATALOG_API_KEY`
- Removed redundant `ADOBE_API_KEY`
- Aligned commerce-mesh and citisignal-nextjs

### Benefits
- Reduced confusion
- Easier deployment
- Single source of truth
- Better documentation

## 7. Component Organization

### Decision
Separate page-level compound components from reusable UI components.

### Structure
```
components/
├── layout/          # Page-level compound components
│   ├── ProductPage/
│   └── AccountPage/
└── ui/              # Reusable UI components
    ├── buttons/
    ├── cards/
    └── forms/
```

### Reasoning
- Clear separation of concerns
- Easy to find components
- Prevents mixing abstraction levels
- Supports gradual migration

## 8. No Auto-Wrapping Components

### Decision
Components should not wrap themselves in layout containers.

### Example
```tsx
// ❌ Bad - Component decides its container
function PageHeader() {
  return (
    <Container>
      <header>...</header>
    </Container>
  );
}

// ✅ Good - Parent decides structure
function PageHeader() {
  return <header>...</header>;
}
```

### Benefits
- Composability
- Flexibility
- Predictability
- Reusability

## 9. TypeScript-First Context

### Decision
Always provide full TypeScript types for context values.

### Implementation
```tsx
interface ProductPageContextValue {
  products: Product[];
  loading: boolean;
  error: Error | null;
  filters: FilterState;
  pagination: PaginationState;
}
```

### Benefits
- Type safety
- Better IntelliSense
- Catch errors at compile time
- Self-documenting

## 10. Delete Rather Than Deprecate

### Decision
Remove old components immediately after migration rather than deprecating.

### Reasoning
- Prevents accidental usage
- Reduces codebase size
- Forces complete migration
- Cleaner git history

### Process
1. Refactor all usages
2. Verify functionality
3. Delete old components
4. Commit immediately

## Lessons Learned

### What Worked Well
- Compound components eliminated complexity
- Structural duplication improved developer experience  
- Smart components centralized logic effectively
- Context at page level prevented global pollution

### What We'd Do Differently
- Start with compound components from day one
- Document patterns before implementing
- Create migration checklist upfront
- Build example components first

## Future Considerations

### When to Apply These Patterns
✅ **Use compound components when:**
- Multiple components share state
- Props are passed through 2+ layers
- Page has 5+ related components
- Building forms with multiple steps

❌ **Avoid when:**
- Component is truly standalone
- No shared state needed
- Simple presentation component
- One-off utility component

### Migration Priority
1. **High:** Pages with heavy prop drilling
2. **Medium:** Complex forms and wizards
3. **Low:** Simple display components
4. **Skip:** Third-party integrations

## References

- [Compound Components Pattern](https://kentcdodds.com/blog/compound-components-with-react-hooks)
- [Worse Is Better](https://en.wikipedia.org/wiki/Worse_is_better)
- [Context API Best Practices](https://react.dev/reference/react/useContext)
- [TypeScript with React Context](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context)