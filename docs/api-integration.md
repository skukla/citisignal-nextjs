# API Integration

## Adobe Commerce API Mesh

**Endpoint**: `https://edge-sandbox-graph.adobe.io/api/d5818ebf-e560-45b3-9830-79183dbfaf27/graphql`

### Available Services

1. **Catalog Service** (`Catalog_*`)
   - `Catalog_productSearch` - Product search with full details
   - Best for: Initial page loads, SEO, complete product data
   - Returns: Full product details, images with complete URLs

2. **Live Search** (`Search_*`)
   - `Search_productSearch` - AI-powered search with facets
   - Best for: User searches, dynamic filtering, faceted navigation
   - Returns: Search results with `productView` object containing stock/images
   - Note: Use `productView.images` for full URLs, not `product.small_image`

3. **Commerce GraphQL** (`Commerce_*`)
   - Core operations (cart, checkout, customer)

4. **Custom Citisignal Queries**
   - `Citisignal_productCards` - Unified product listing with intelligent service selection
   - `Citisignal_searchSuggestions` - Quick search suggestions for autocomplete

### Custom Resolver Fields

The mesh adds clean business fields to products:
- `manufacturer` - Clean manufacturer name
- `memory_options` - Array of memory sizes
- `available_colors` - Color objects with hex values
- `is_on_sale` - Boolean sale status
- `secure_image` - HTTPS image URLs
- `discount_percentage` - Calculated discount

### Service Usage Guidelines

**Hybrid Approach (Recommended)**:
- Use `Citisignal_productCards` - automatically selects the right service:
  - Catalog Service for initial loads (SEO-optimized)
  - Live Search when user searches or needs facets
  - Consistent data structure regardless of service

**Direct Service Usage**:
- Category Pages: `Catalog_productSearch` for initial, `Search_productSearch` for filters
- Product Detail Pages: `Catalog_products(skus: [sku])`
- Search Suggestions: `Citisignal_searchSuggestions`

### Implementation Learnings

**Data Normalization**:
- Live Search and Catalog return different structures
- Live Search: Data in `productView` object
- Catalog: Data directly on product
- Solution: Normalize in resolver for consistent API

**Image Handling**:
- Live Search may return relative paths
- Always use `productView.images` for Live Search (has full URLs)
- Apply `ensureHttpsUrl()` helper for protocol consistency

**Stock Status**:
- Show all products with clear "Out of Stock" badges
- Don't filter out - users want to see full catalog
- Follows standard e-commerce UX patterns

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

## GraphQL Headers Configuration

The Next.js GraphQL proxy (`/src/app/api/graphql/route.ts`) passes headers to the mesh:

### Required Headers

**For Commerce Core GraphQL (categoryList, storeConfig):**
- `Store`: Store view code (e.g., `citisignal_us`)
  - Specifies which store view to query
  - Without this, multi-store instances may return empty categories

**For Catalog Service/Live Search:**
- `X-Api-Key`: API key for authentication
- `Magento-Environment-Id`: Commerce environment ID
- `Magento-Website-Code`: Website code (e.g., `citisignal`)  
- `Magento-Store-Code`: Store code (e.g., `citisignal_store`)
- `Magento-Store-View-Code`: Store view code (e.g., `citisignal_us`)
- `Magento-Customer-Group`: Customer group for pricing

### Header Conventions

Adobe Commerce uses different header naming for different services:
- **REST/Core GraphQL**: Simple `Store` header
- **Catalog Services**: Prefixed `Magento-*` headers

The proxy passes both sets to ensure compatibility with all services.

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