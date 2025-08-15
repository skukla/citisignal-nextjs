# Compound Component Refactoring Plan

## Overview
This document outlines the refactoring of product pages from a "god component" pattern with heavy prop drilling to a clean compound component structure that clearly shows page composition.

## Current Architecture Problems

### 1. God Components
- `ProductPageWrapper` accepts 14+ props
- `ProductRoot` accepts 7+ props  
- Props are deeply nested (searchProps, breadcrumbs, etc.)
- Page structure is hidden behind wrapper abstractions

### 2. Prop Drilling
```tsx
// Current approach - props passed through multiple layers
<ProductPageWrapper
  breadcrumbs={breadcrumbs}
  title={pageHeader.title}
  description={pageHeader.description}
  loading={loading}
  error={error}
  products={phones}
  totalCount={totalCount}
  searchProps={{
    searchQuery,
    onSearchChange: setSearchQuery,
    sortBy,
    onSortChange: handleSortChange,
    placeholder: search.placeholder
  }}
  loadingSkeletonCount={12}
  errorTitle="Unable to load phones"
  errorDescription="There was an error loading the phones. Please try again later."
>
```

### 3. Poor Readability
- Hard to understand page composition from JSX
- Component responsibilities are unclear
- Difficult to customize or reorder sections

## New Compound Component Architecture

### Core Structure
```tsx
// New approach - semantic, clear structure
<ProductPageProvider category="phones" pageData={phonesPageData}>
  <ProductPage>
    <ProductPage.Background color="gray">
      <ProductPage.Container>
        <ProductPage.Breadcrumbs />
        <ProductPage.Header />
        
        <ProductPage.Toolbar>
          <ProductPage.Search />
          <ProductPage.Sort />
          <ProductPage.MobileFilterButton />
        </ProductPage.Toolbar>
        
        <ProductPage.ResultCount />
        
        <ProductPage.Layout>
          <ProductPage.Sidebar>
            <ProductPage.Filters />
          </ProductPage.Sidebar>
          
          <ProductPage.Main>
            <ProductPage.Content />  {/* Smart component with conditional logic */}
            <ProductPage.LoadMore />
          </ProductPage.Main>
        </ProductPage.Layout>
        
        <ProductPage.ContentSections>
          <PhonesTechReviews />
          <PhonesBuyingGuides />
          <PhonesTips />
        </ProductPage.ContentSections>
      </ProductPage.Container>
      
      <ProductPage.Newsletter />
    </ProductPage.Background>
  </ProductPage>
</ProductPageProvider>
```

## Implementation Details

### 1. ProductPage Compound Component

Create `components/layout/ProductPage/index.tsx`:
```tsx
export const ProductPage = Object.assign(ProductPageRoot, {
  // Layout
  Background: ProductPageBackground,
  Container: ProductPageContainer,
  Layout: ProductPageLayout,
  Sidebar: ProductPageSidebar,
  Main: ProductPageMain,
  
  // Header
  Breadcrumbs: ProductPageBreadcrumbs,
  Header: ProductPageHeader,
  
  // Toolbar
  Toolbar: ProductPageToolbar,
  Search: ProductPageSearch,
  Sort: ProductPageSort,
  ResultCount: ProductPageResultCount,
  MobileFilterButton: ProductPageMobileFilterButton,
  
  // Filters
  Filters: ProductPageFilters,
  
  // Content (Option 3 - Smart Component)
  Content: ProductPageContent,
  
  // Actions
  LoadMore: ProductPageLoadMore,
  
  // Sections
  ContentSections: ProductPageContentSections,
  Newsletter: ProductPageNewsletter
});
```

### 2. Context-Based Data Provider

Create `components/layout/ProductPage/ProductPageContext.tsx`:
```tsx
interface ProductPageContextValue {
  // Data
  products: BaseProduct[];
  loading: boolean;
  error: Error | null;
  totalCount: number;
  hasMore: boolean;
  
  // Search/Filter/Sort
  searchQuery: string;
  sortBy: SortOption;
  activeFilters: Record<string, string[]>;
  
  // Actions
  loadMore: () => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: SortOption) => void;
  setFilter: (key: string, value: string, checked: boolean) => void;
  clearFilters: () => void;
  
  // UI State
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
  
  // Computed
  filteredProducts: BaseProduct[];
  
  // Page Configuration
  pageData: {
    breadcrumbs: BreadcrumbItem[];
    title: string;
    description: string;
    filters: FilterSection[];
    emptyState: EmptyStateConfig;
    // ... other page config
  };
}

const ProductPageContext = createContext<ProductPageContextValue | null>(null);

export function useProductPage() {
  const context = useContext(ProductPageContext);
  if (!context) {
    throw new Error('useProductPage must be used within ProductPageProvider');
  }
  return context;
}
```

### 3. ProductPageContent Component (Option 3)

Create `components/layout/ProductPage/ProductPageContent.tsx`:
```tsx
export function ProductPageContent() {
  const { 
    loading, 
    error, 
    filteredProducts,
    pageData 
  } = useProductPage();
  
  // Initial loading state
  if (loading && filteredProducts.length === 0) {
    return <ProductPageSkeleton count={pageData.loadingSkeletonCount || 12} />;
  }
  
  // Error state
  if (error) {
    return <ProductPageError error={error} />;
  }
  
  // Empty state (no products after filtering)
  if (filteredProducts.length === 0) {
    return <ProductPageEmpty />;
  }
  
  // Normal state: show products
  return <ProductPageProducts products={filteredProducts} />;
}
```

This approach encapsulates all conditional logic in one place, making it:
- Testable: Can unit test ProductPageContent independently
- Maintainable: Changes to loading/error/empty states happen in one place
- Consistent: All pages use the same conditional logic
- Clean: Page components don't have conditional rendering clutter

## Component Breakdown

### Layout Components
- **ProductPageBackground**: Replaces `Page`, provides full-width background
- **ProductPageContainer**: Replaces `Content`, provides constrained width
- **ProductPageLayout**: Replaces `TwoColumnLayout`, handles responsive sidebar/main

### Header Components
- **ProductPageBreadcrumbs**: Wraps `Breadcrumb`, gets data from context
- **ProductPageHeader**: Wraps `PageHeader`, gets title/description from context

### Toolbar Components
- **ProductPageToolbar**: Container for search/sort/filters
- **ProductPageSearch**: Search input, connects to context
- **ProductPageSort**: Sort dropdown, connects to context
- **ProductPageResultCount**: Shows count from context
- **ProductPageMobileFilterButton**: Mobile filter trigger

### Content Components
- **ProductPageSidebar**: Sidebar wrapper
- **ProductPageMain**: Main content area
- **ProductPageFilters**: Wraps `FilterSidebarResponsive`
- **ProductPageContent**: Smart component with conditional logic
- **ProductPageProducts**: Wraps `ProductGrid`
- **ProductPageSkeleton**: Loading skeleton
- **ProductPageError**: Error state
- **ProductPageEmpty**: Empty state
- **ProductPageLoadMore**: Load more button

### Section Components
- **ProductPageContentSections**: Container for content sections
- **ProductPageNewsletter**: Wraps `NewsletterSection`

## Implementation Steps

### Phase 1: Core Setup
1. Create `components/layout/ProductPage/` directory
2. Implement `ProductPageProvider.tsx` with context and data fetching
3. Create `ProductPageContext.tsx` with types and hook
4. Build `ProductPageRoot.tsx` as main container

### Phase 2: Layout Components
5. Create `ProductPageBackground.tsx`
6. Create `ProductPageContainer.tsx`
7. Create `ProductPageLayout.tsx`
8. Create `ProductPageSidebar.tsx`
9. Create `ProductPageMain.tsx`

### Phase 3: Header Components
10. Create `ProductPageBreadcrumbs.tsx`
11. Create `ProductPageHeader.tsx`

### Phase 4: Toolbar Components
12. Create `ProductPageToolbar.tsx`
13. Create `ProductPageSearch.tsx`
14. Create `ProductPageSort.tsx`
15. Create `ProductPageResultCount.tsx`
16. Create `ProductPageMobileFilterButton.tsx`

### Phase 5: Content Components
17. Create `ProductPageFilters.tsx`
18. Create `ProductPageContent.tsx` (smart component)
19. Create `ProductPageProducts.tsx`
20. Create `ProductPageSkeleton.tsx`
21. Create `ProductPageError.tsx`
22. Create `ProductPageEmpty.tsx`
23. Create `ProductPageLoadMore.tsx`

### Phase 6: Section Components
24. Create `ProductPageContentSections.tsx`
25. Create `ProductPageNewsletter.tsx`

### Phase 7: Page-Specific Sections
26. Create `components/sections/phones/PhonesTechReviews.tsx`
27. Create `components/sections/phones/PhonesBuyingGuides.tsx`
28. Create `components/sections/phones/PhonesTips.tsx`

### Phase 8: Integration
29. Create barrel export in `components/layout/ProductPage/index.tsx`
30. Refactor `phones/page.tsx` to use new structure
31. Test all functionality works correctly

### Phase 9: Migration
32. Update `accessories/page.tsx`
33. Update `watches/page.tsx`
34. Update other product pages
35. Remove old `ProductPageWrapper` and `ProductRoot`
36. Update tests and documentation

## Benefits

### 1. No Prop Drilling
- Context handles all data flow
- Components access what they need directly
- No passing props through intermediate layers

### 2. Clear Structure
- JSX mirrors visual layout exactly
- Easy to understand page composition
- Component responsibilities are obvious

### 3. Flexibility
- Easy to reorder sections
- Simple to add/remove components
- Can override specific behaviors when needed

### 4. Reusability
- Each component has single responsibility
- Can compose pages differently
- Share components across pages

### 5. Maintainability
- Changes are localized
- Easy to test individual components
- Clear separation of concerns

### 6. Type Safety
- Full TypeScript support through context
- Autocomplete for all compound components
- Type errors caught at compile time

### 7. Performance
- Can optimize individual components with React.memo
- Lazy load sections as needed
- Prevent unnecessary re-renders

## Migration Strategy

1. **Build alongside existing code**: Create new components without breaking current implementation
2. **Test with phones page first**: Validate approach with most complex page
3. **Iterate on API**: Refine compound component API based on real usage
4. **Migrate incrementally**: Update one page at a time
5. **Clean up**: Remove old components once migration complete

## Example: Override Flexibility

While `ProductPage.Content` handles default behavior, pages can override when needed:

```tsx
// Custom loading state for special page
<ProductPage.Main>
  {loading && <CustomLoadingAnimation />}
  {!loading && error && <ProductPage.Error />}
  {!loading && !error && products.length > 0 && <ProductPage.Products />}
  {!loading && !error && products.length === 0 && <SpecialEmptyState />}
  <ProductPage.LoadMore />
</ProductPage.Main>
```

## Testing Strategy

### Unit Tests
- Test each compound component in isolation
- Test ProductPageContent conditional logic
- Test context provider state management

### Integration Tests
- Test full page rendering
- Test data flow through context
- Test user interactions

### Visual Tests
- Snapshot tests for each component
- Visual regression tests for full pages
- Responsive design tests

## Documentation Updates

1. Update component documentation
2. Add Storybook stories for compound components
3. Create usage examples
4. Document migration guide for other pages

## Success Criteria

- ✅ No prop drilling in page components
- ✅ Clear, semantic JSX structure
- ✅ All current functionality preserved
- ✅ Improved developer experience
- ✅ Better performance
- ✅ Easier to maintain and extend

## Next Steps

1. Review and approve plan
2. Begin implementation with Phase 1
3. Get feedback after phones page refactor
4. Apply learnings to other pages
5. Document patterns for team