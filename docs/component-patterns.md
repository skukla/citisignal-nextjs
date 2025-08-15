# Component Patterns

## Compound Component Pattern

The compound component pattern eliminates prop drilling and creates semantic, self-documenting JSX structures.

### Core Principles

1. **Context for Data Flow** - Use React Context to share state between components
2. **Dot Notation for Composition** - Group related components (e.g., `ProductPage.Header`)
3. **Smart Components for Logic** - Encapsulate conditional rendering in dedicated components
4. **Wrapper Components for Integration** - Thin wrappers connect context to existing UI components
5. **Explicit Over Implicit** - Visible structure is better than hidden magic

### Product Page Implementation

Successfully refactored from 165 lines with heavy prop drilling to 60 lines of semantic JSX:

```tsx
<ProductPageProvider category="phones" pageData={pageData}>
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
          <ProductPage.Content />  {/* Smart component */}
          <ProductPage.LoadMore />
        </ProductPage.Main>
      </ProductPage.Layout>
    </ProductPage.Container>
  </ProductPage.Background>
</ProductPageProvider>
```

### Architecture Decisions

#### Why Duplicate Page Structure?
Each product page has identical JSX structure. We consciously chose NOT to abstract this because:
- **Developer Experience** - Everything visible in one file
- **Debugging** - No jumping between files to understand the page
- **Flexibility** - Easy to make one page unique if needed
- **The duplication is structure, not logic** - Logic is properly abstracted in components

#### Why Wrapper Components?
Components like `ProductPageHeader` just wrap `PageHeader`. This provides:
- **Context Integration** - Access to `useProductPage()` without prop drilling
- **Semantic Clarity** - `<ProductPage.Header />` shows intent
- **Consistent API** - Everything uses the compound pattern
- **Future Flexibility** - Easy to add product-specific logic

### Implementation Components

1. **Provider** (`ProductPageProvider`)
   - Combines data fetching hooks
   - Provides context to all children
   - Single source of truth for page state

2. **Smart Component** (`ProductPageContent`)
   ```tsx
   function ProductPageContent() {
     const { loading, error, products } = useProductPage();
     
     if (loading) return <Skeleton />;
     if (error) return <Error />;
     if (!products.length) return <Empty />;
     return <Products />;
   }
   ```
   - All conditional logic in one place
   - Parent components stay clean
   - Easy to test and maintain

3. **UI Wrappers**
   - `ProductPage.Background` → wraps `Page`
   - `ProductPage.Container` → wraps `Content`
   - `ProductPage.Layout` → wraps `TwoColumnLayout`
   - `ProductPage.Header` → wraps `PageHeader`

## Product Card Compound Components

```tsx
<ProductCard.Root product={product}>
  <ProductCard.Image />
  <ProductCard.Badges />
  <ProductCard.Info />
  <ProductCard.Price />
  <ProductCard.Actions />
</ProductCard.Root>
```

## Guidelines for New Components

### Make Components Composable
```tsx
// ❌ Bad - Auto-wraps itself
function PageHeader() {
  return (
    <Content>
      <header>...</header>
    </Content>
  );
}

// ✅ Good - Composable
function PageHeader() {
  return <header>...</header>;
}
```

### Use Context for Cross-Component State
```tsx
// Provider at page level
<CheckoutProvider>
  {/* All children can access checkout state */}
</CheckoutProvider>

// Components use hook
function CheckoutSummary() {
  const { total, items } = useCheckout();
  return <Summary total={total} items={items} />;
}
```

### Create Smart Components for Conditional Logic
Don't scatter conditions throughout JSX. Create a smart component:
```tsx
function CheckoutContent() {
  const { step, isValid } = useCheckout();
  
  switch(step) {
    case 'shipping': return <ShippingForm />;
    case 'payment': return <PaymentForm />;
    case 'review': return <OrderReview />;
    default: return <EmptyCart />;
  }
}
```

## When to Apply This Pattern

✅ **Good Candidates:**
- Pages with multiple related components
- Components that share state
- Complex forms with multiple steps
- Dashboard layouts with widgets

❌ **Not Suitable For:**
- Simple components with no shared state
- One-off components
- Pure presentation components

## Migration Strategy

1. **Identify prop drilling** - Look for props passed through 2+ layers
2. **Create context and provider** - Define shared state structure
3. **Create compound component structure** - Group with dot notation
4. **Create smart components** - Extract conditional logic
5. **Create thin wrappers** - Connect context to existing UI
6. **Test thoroughly** - Ensure feature parity

## Benefits Achieved

- **60% code reduction** in product pages
- **Zero prop drilling** - Context handles data flow
- **Self-documenting JSX** - Structure visible at a glance
- **Easier testing** - Logic isolated in smart components
- **Better maintainability** - Changes in one place affect all