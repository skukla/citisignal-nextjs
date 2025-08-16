# Future Improvements

These are planned enhancements to implement after the compound component refactoring is complete.

## ✅ Completed Improvements

### Hybrid Catalog/Live Search Implementation (Completed)

**Implementation**: Successfully implemented intelligent service selection that uses:
- **Catalog Service** for initial page loads (SEO-optimized, full product details)
- **Live Search** when users search or request facets (AI-powered, dynamic filtering)

**Key Learnings**:
1. **Data Consistency**: Live Search and Catalog Service return data differently
   - Live Search uses `productView` object for complete data (images, stock, SKU)
   - Catalog Service returns data directly on the product object
   - Solution: Normalize data in resolver to provide consistent API

2. **Image URL Handling**: 
   - Live Search returns relative paths, Catalog returns full URLs
   - Solution: Use `productView.images` which contains full URLs

3. **Stock Filtering**:
   - Initially implemented manual filtering as fallback
   - Decided to remove toggle entirely - better UX to show all products with clear "Out of Stock" badges
   - Follows standard e-commerce patterns (Amazon, Apple, etc.)

4. **Facets Implementation**:
   - Only request facets after user interaction to optimize initial load
   - Facets come from Live Search with configurable labels from Commerce admin
   - No hardcoded label mappings - pass through admin-configured labels

**Benefits Achieved**:
- Fast initial page loads with Catalog Service
- AI-powered search with Live Search
- Consistent data structure regardless of service used
- Clean separation of concerns in resolver

## 1. Phones Page GraphQL Enhancement

**Goal**: Simplify data transformation by using custom resolver fields

### Implementation Steps
1. Update GraphQL queries to include custom fields:
   - `manufacturer` - Clean manufacturer name
   - `memory_options` - Array of memory options  
   - `available_colors` - Structured color data
   - `is_on_sale` - Boolean sale status

2. Simplify `transformToPhone` function to use resolver data directly

3. Benefits:
   - Cleaner code with less transformation logic
   - Better performance (transformations in mesh)
   - Consistent data across the app

## 2. ✅ Search & Filter Server-Side Integration (Completed)

**Status**: Fully implemented with hybrid approach

### Completed Features:
- ✅ AI-powered search via Live Search
- ✅ Search suggestions with `Citisignal_searchSuggestions` resolver
- ✅ Dynamic facets from Live Search (ready but awaiting data)
- ✅ Hybrid loading strategy implemented
- ✅ Consistent data normalization across services

### Implementation Notes:
- Search automatically triggers Live Search
- Facets requested only after user interaction
- All data normalized through custom resolvers
- Stock status shown via badges, no filtering needed

## 3. Apply Compound Pattern to Other Pages

**Pages to refactor**:
- `/app/(products)/accessories/page.tsx`
- `/app/(products)/watches/page.tsx`
- Other pages using `ProductRoot` pattern

**Process**:
1. Create page-specific providers if needed
2. Reuse ProductPage compound components
3. Maintain feature parity while reducing code

## Implementation Priority

1. ✅ Complete compound component refactoring for all product pages
2. ✅ Integrate Live Search with hybrid approach
3. ✅ Add search suggestions resolver
4. ⏳ Update remaining GraphQL queries with custom fields
5. 📋 Add more Live Search features (personalization, merchandising)