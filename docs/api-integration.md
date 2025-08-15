# API Integration

## Adobe Commerce API Mesh

**Endpoint**: `https://edge-sandbox-graph.adobe.io/api/d5818ebf-e560-45b3-9830-79183dbfaf27/graphql`

### Available Services

1. **Catalog Service** (`Catalog_*`)
   - `Catalog_productSearch` - Product search with custom fields
   - `Catalog_products(skus: [...])` - Fetch by SKU
   - `Catalog_categories` - Category hierarchy

2. **Live Search** (`Search_*`)
   - `Search_productSearch` - AI-powered search with facets
   - Better for filtering and category pages
   - Dynamic facets based on results

3. **Commerce GraphQL** (`Commerce_*`)
   - Core operations (cart, checkout, customer)

### Custom Resolver Fields

The mesh adds clean business fields to products:
- `manufacturer` - Clean manufacturer name
- `memory_options` - Array of memory sizes
- `available_colors` - Color objects with hex values
- `is_on_sale` - Boolean sale status
- `secure_image` - HTTPS image URLs
- `discount_percentage` - Calculated discount

### Service Usage Guidelines

**Category Pages**:
- Use `Catalog_productSearch` for initial grid
- Use `Search_productSearch` for faceted filtering

**Product Detail Pages**:
- Use `Catalog_products(skus: [sku])`

**Search Bar**:
- Use `Search_productSearch(phrase: "...")`

## Data Fetching with SWR

We use SWR instead of Apollo Client for simplicity:

```typescript
// Product cards hook
const { data, error, isLoading, loadMore } = useProductCards({
  category: 'phones',
  limit: 12
});

// Product list hook with filtering
const { filteredProducts, searchQuery, sortBy } = useProductList({
  products: data
});
```

### Why SWR
- Simpler pagination with `useSWRInfinite`
- Less boilerplate than Apollo
- Automatic deduplication
- Built-in retry logic
- Smaller bundle (30KB vs 140KB)

## Environment Variables

Required in `.env`:
```
ADOBE_COMMERCE_URL=
ADOBE_COMMERCE_ENVIRONMENT_ID=
ADOBE_COMMERCE_WEBSITE_CODE=
ADOBE_COMMERCE_STORE_CODE=
ADOBE_COMMERCE_STORE_VIEW_CODE=
```

## Next.js Configuration

```javascript
// next.config.ts - Support HTTP/HTTPS
remotePatterns: [
  { protocol: 'https', hostname: commerceUrl.hostname },
  { protocol: 'http', hostname: commerceUrl.hostname }
]
```