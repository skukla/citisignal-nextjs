# Component Patterns

## Overview

This document defines the component architecture patterns used throughout the CitiSignal application, with a focus on compound components, composition patterns, and maintainable component design.

## Core Patterns

### Compound Component Pattern

Compound components provide a clean, semantic API for complex UI structures while maintaining flexibility and readability.

#### Implementation

```tsx
// Parent component exports child components
export const ProductPage = ({ children }) => {
  return <ProductPageProvider>{children}</ProductPageProvider>;
};

// Attach child components as static properties
ProductPage.Background = ProductPageBackground;
ProductPage.Container = ProductPageContainer;
ProductPage.Header = ProductPageHeader;
ProductPage.Toolbar = ProductPageToolbar;
ProductPage.Content = ProductPageContent;
ProductPage.Sidebar = ProductPageSidebar;
// ... 25+ specialized components
```

#### Usage

```tsx
// Clear, semantic structure visible in JSX
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

      <ProductPage.Layout>
        <ProductPage.Sidebar>
          <ProductPage.Filters />
        </ProductPage.Sidebar>

        <ProductPage.Main>
          <ProductPage.Content />
          <ProductPage.LoadMore />
        </ProductPage.Main>
      </ProductPage.Layout>
    </ProductPage.Container>
  </ProductPage.Background>
</ProductPage>
```

### Context-Driven Data Flow

#### Provider Pattern

```tsx
const ProductPageProvider = ({ category, children }) => {
  // Centralized data fetching and state management
  const { products, facets, loading, error } = useProductData(category);

  const contextValue = {
    products,
    facets,
    loading,
    error,
    // Methods
    applyFilter,
    clearFilters,
    loadMore,
  };

  return <ProductPageContext.Provider value={contextValue}>{children}</ProductPageContext.Provider>;
};
```

#### Consumer Components

```tsx
const ProductPageContent = () => {
  // Components consume only what they need
  const { products, loading, error } = useProductPageContext();

  if (loading) return <ProductPage.Skeleton />;
  if (error) return <ProductPage.Error />;
  if (!products.length) return <ProductPage.Empty />;

  return <ProductPage.Grid products={products} />;
};
```

### Component Composition Strategies

#### Slot-Based Composition

```tsx
interface LayoutProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  main: ReactNode;
  footer?: ReactNode;
}

const Layout = ({ header, sidebar, main, footer }) => (
  <div className="min-h-screen">
    {header && <header className="sticky top-0">{header}</header>}
    <div className="flex">
      {sidebar && <aside className="w-64">{sidebar}</aside>}
      <main className="flex-1">{main}</main>
    </div>
    {footer && <footer>{footer}</footer>}
  </div>
);
```

#### Render Props Pattern

```tsx
const DataFetcher = ({ query, children }) => {
  const { data, loading, error } = useSWR(query);

  return children({ data, loading, error });
};

// Usage
<DataFetcher query={productQuery}>
  {({ data, loading, error }) => (loading ? <Skeleton /> : <ProductList products={data} />)}
</DataFetcher>;
```

## Component Architecture Principles

### Single Responsibility

Each component should have one clear purpose:

```tsx
// ✅ Good - Single responsibility
const ProductPrice = ({ price, originalPrice }) => (
  <div className="flex gap-2">
    <span className="font-bold">{price}</span>
    {originalPrice && <span className="line-through text-gray-500">{originalPrice}</span>}
  </div>
);

// ❌ Bad - Multiple responsibilities
const ProductCard = ({ product, onAddToCart, user, showQuickView }) => {
  // Handles display, cart logic, user state, and modals
};
```

### Composition Over Configuration

Prefer composable components over prop-heavy configuration:

```tsx
// ✅ Good - Composable
<Card>
  <Card.Image src={product.image} />
  <Card.Body>
    <Card.Title>{product.name}</Card.Title>
    <Card.Price value={product.price} />
  </Card.Body>
  <Card.Actions>
    <AddToCartButton product={product} />
  </Card.Actions>
</Card>

// ❌ Bad - Configuration heavy
<Card
  image={product.image}
  title={product.name}
  price={product.price}
  showActions={true}
  actionButtons={['cart', 'wishlist']}
  layout="vertical"
/>
```

### Explicit Dependencies

Make component dependencies clear and explicit:

```tsx
// ✅ Good - Clear dependencies via context
const useProductPageContext = () => {
  const context = useContext(ProductPageContext);
  if (!context) {
    throw new Error('useProductPageContext must be used within ProductPageProvider');
  }
  return context;
};

// ❌ Bad - Hidden global dependencies
const ProductList = () => {
  const products = globalStore.products; // Hidden dependency
};
```

## Refactoring Strategy

### From God Components to Compound Components

#### Before (God Component)

```tsx
<ProductPageWrapper
  breadcrumbs={breadcrumbs}
  title={title}
  description={description}
  loading={loading}
  error={error}
  products={products}
  totalCount={totalCount}
  searchProps={searchProps}
  filterProps={filterProps}
  sortProps={sortProps}
  paginationProps={paginationProps}
  // ... many more props
/>
```

#### After (Compound Components)

```tsx
<ProductPageProvider>
  <ProductPage>
    <ProductPage.Breadcrumbs />
    <ProductPage.Header />
    <ProductPage.Controls />
    <ProductPage.Content />
    <ProductPage.Pagination />
  </ProductPage>
</ProductPageProvider>
```

### Migration Approach

1. **Identify Component Boundaries**
   - Map current prop structure
   - Group related functionality
   - Define clear responsibilities

2. **Create Provider Infrastructure**

   ```tsx
   // Step 1: Create context and provider
   const ProductPageContext = createContext();
   const ProductPageProvider = ({ children }) => {
     /* ... */
   };
   ```

3. **Build Compound Components**

   ```tsx
   // Step 2: Create child components that consume context
   const ProductPageHeader = () => {
     const { title, description } = useProductPageContext();
     return <PageHeader title={title} description={description} />;
   };
   ```

4. **Assemble Component API**

   ```tsx
   // Step 3: Attach to parent component
   ProductPage.Header = ProductPageHeader;
   ProductPage.Content = ProductPageContent;
   // etc.
   ```

5. **Gradual Migration**
   - Start with leaf components
   - Move up the component tree
   - Maintain backward compatibility during transition

## Advanced Patterns

### Polymorphic Components

```tsx
interface PolymorphicProps<T extends ElementType> {
  as?: T;
  children?: ReactNode;
}

type ButtonProps<T extends ElementType> =
  PolymorphicProps<T> &
  ComponentPropsWithoutRef<T>;

const Button = <T extends ElementType = 'button'>({
  as,
  children,
  ...props
}: ButtonProps<T>) => {
  const Component = as || 'button';
  return <Component {...props}>{children}</Component>;
};

// Usage
<Button as="a" href="/products">View Products</Button>
<Button as={Link} to="/cart">Go to Cart</Button>
```

### Component Variants

```tsx
const buttonVariants = cva('inline-flex items-center justify-center rounded-md font-medium', {
  variants: {
    variant: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      ghost: 'hover:bg-gray-100',
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
      lg: 'h-12 px-6 text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  children?: ReactNode;
}

const Button = ({ variant, size, className, children }: ButtonProps) => (
  <button className={cn(buttonVariants({ variant, size }), className)}>{children}</button>
);
```

### Controlled vs Uncontrolled Components

```tsx
// Flexible component that can be controlled or uncontrolled
const SearchInput = ({ value: controlledValue, defaultValue = '', onChange, ...props }) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledValue(e.target.value);
    }
    onChange?.(e);
  };

  return <input value={value} onChange={handleChange} {...props} />;
};
```

## Testing Patterns

### Component Testing Strategy

```tsx
// Test compound components with integration tests
describe('ProductPage', () => {
  it('renders complete page structure', () => {
    render(
      <ProductPageProvider mockData={mockProducts}>
        <ProductPage>
          <ProductPage.Header />
          <ProductPage.Content />
        </ProductPage>
      </ProductPageProvider>
    );

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(mockProducts.length);
  });

  it('handles loading state', () => {
    render(
      <ProductPageProvider loading={true}>
        <ProductPage.Content />
      </ProductPageProvider>
    );

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });
});
```

### Mocking Context

```tsx
const createMockProvider =
  (value = {}) =>
  ({ children }) => (
    <ProductPageContext.Provider
      value={{
        products: [],
        loading: false,
        error: null,
        ...value,
      }}
    >
      {children}
    </ProductPageContext.Provider>
  );

// Usage in tests
const MockProvider = createMockProvider({ loading: true });
render(<ProductPage.Content />, { wrapper: MockProvider });
```

## Performance Considerations

### Memoization Strategies

```tsx
// Memoize expensive computations
const ProductGrid = memo(({ products }) => {
  const sortedProducts = useMemo(() => products.sort((a, b) => a.price - b.price), [products]);

  return (
    <div className="grid">
      {sortedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});
```

### Code Splitting

```tsx
// Lazy load heavy components
const ProductQuickView = lazy(() => import('./ProductQuickView'));

const ProductCard = ({ product }) => {
  const [showQuickView, setShowQuickView] = useState(false);

  return (
    <>
      <div onClick={() => setShowQuickView(true)}>{/* Card content */}</div>

      {showQuickView && (
        <Suspense fallback={<QuickViewSkeleton />}>
          <ProductQuickView product={product} />
        </Suspense>
      )}
    </>
  );
};
```

## Best Practices

1. **Keep Components Small**: Aim for <100 lines per component
2. **Use TypeScript**: Provide strong typing for all props and context
3. **Document Complex Logic**: Add JSDoc comments for non-obvious behavior
4. **Prefer Composition**: Build complex UIs from simple, composable parts
5. **Test User Interactions**: Focus tests on user behavior, not implementation
6. **Optimize Carefully**: Profile before optimizing, avoid premature optimization

## Related Documentation

- [State Management](./state-management.md)
- [Performance Guide](../guides/performance-and-loading.md)
- [Code Standards](../reference/code-standards.md)
- [Testing Guide](../guides/testing.md)
