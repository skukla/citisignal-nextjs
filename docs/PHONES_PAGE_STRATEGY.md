# Phones Page Implementation Strategy

## Current State
- Using `Catalog_productSearch` with category filter
- Custom `transformToPhone` function doing heavy lifting
- Missing custom resolver fields from queries

## Recommended Strategy

### 1. Update GraphQL Queries
Add custom resolver fields to queries:
```graphql
... on Catalog_ComplexProductView {
  manufacturer        # Clean manufacturer name
  memory_options     # Array of memory options
  available_colors {  # Structured color data
    name
    hex
  }
  is_on_sale         # Boolean sale status
  priceRange { ... }
}
```

### 2. Simplify Transform Function
With custom resolvers, `transformToPhone` becomes minimal:
```typescript
function transformToPhone(product: any): Phone {
  const view = product.productView;
  return {
    id: view.id,
    sku: view.sku,
    name: view.name,
    manufacturer: view.manufacturer, // Direct from resolver
    memory: view.memory_options,     // Direct from resolver
    available_colors: view.available_colors, // Direct from resolver
    isSale: view.is_on_sale,        // Direct from resolver
    // ... other direct mappings
  };
}
```

### 3. Hybrid Approach for Category Pages
For the phones category page, use both services:

**Initial Load:**
- `Catalog_productSearch` for products with custom fields
- Provides clean data without heavy transformations

**Filtering & Search:**
- Add `Search_productSearch` for faceted filtering
- User can filter by brand, price range, features
- Provides better search relevance

### 4. Implementation Steps
1. ✅ Custom resolvers deployed (manufacturer, memory_options, available_colors, is_on_sale)
2. 🔄 Update GraphQL queries to include custom fields
3. 🔄 Simplify `transformToPhone` to use resolver data
4. 🔄 Add Live Search integration for filtering
5. 🔄 Update UI to show facets/filters from Live Search

### 5. Benefits
- Cleaner code with less transformation logic
- Better performance (transformations in mesh)
- Richer filtering with Live Search facets
- Consistent data across the app