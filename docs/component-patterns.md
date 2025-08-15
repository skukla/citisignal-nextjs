# Component Patterns

## Product Page Compound Components

Eliminates prop drilling and creates semantic page structure.

### Implementation

```tsx
<ProductPageProvider category="phones" pageData={pageData}>
  <ProductPage>
    <ProductPage.Background>
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
  </ProductPage>
</ProductPageProvider>
```

### Key Components

1. **ProductPageProvider** - Combines hooks, provides context
2. **ProductPageContent** - Smart component with all conditional logic (loading/error/empty/products)
3. **UI Wrappers** - Each wraps existing UI components:
   - `Background` → `Page`
   - `Container` → `Content`
   - `Layout` → `TwoColumnLayout`
   - `Header` → `PageHeader`

### Benefits
- Reduced code from 165 to 63 lines
- No prop drilling
- Clear page structure in JSX
- Reuses existing UI components

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

## Component Guidelines

### Always Composable
UI components should NOT auto-wrap themselves:
```tsx
// ❌ Bad - Auto-wraps in Content
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

// Usage
<Content>
  <PageHeader />
</Content>
```

### Context Pattern
```tsx
// Provider wraps page
<ProductPageProvider>
  {children}
</ProductPageProvider>

// Components use hook
function ProductPageHeader() {
  const { pageData } = useProductPage();
  return <PageHeader {...pageData.header} />;
}
```

### Smart Components
Encapsulate conditional logic in one place:
```tsx
// All logic internal
function ProductPageContent() {
  const { loading, error, products } = useProductPage();
  
  if (loading) return <Skeleton />;
  if (error) return <Error />;
  if (!products.length) return <Empty />;
  return <Products />;
}
```