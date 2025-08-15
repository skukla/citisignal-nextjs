# Future Improvements

These are planned enhancements to implement after the compound component refactoring is complete.

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

## 2. Search & Filter Server-Side Integration

**Goal**: Replace client-side filtering with Adobe Live Search

### Phase 1: Search Bar
- Integrate Live Search API for AI-powered search
- Add search suggestions and typo tolerance
- Implement relevance ranking

### Phase 2: Dynamic Faceted Filters  
- Replace static filters with Live Search facets
- Show product counts per filter option
- Only display filters with available products

### Phase 3: Hybrid Loading
- Initial load: `Catalog_productSearch` for products
- User interaction: `Search_productSearch` for search/filter
- Maintain custom resolver fields in results

### Benefits
- AI-powered search with suggestions
- Dynamic filters with real-time counts
- Better performance with server-side filtering
- Improved SEO with URL-based filters

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

1. ✅ Complete compound component refactoring for phones page
2. ⏳ Apply pattern to other product pages
3. 📋 Update GraphQL queries with custom fields
4. 📋 Integrate Live Search for filtering
5. 📋 Add search suggestions and AI relevance