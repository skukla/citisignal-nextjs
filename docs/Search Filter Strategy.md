# Search & Filter Implementation Strategy for Phones Page

## Current vs. Recommended Architecture

### Current (Client-side)
- ❌ Search: Filters already-loaded products in memory
- ❌ Filters: Static filter options, client-side filtering
- ❌ Performance: All products loaded upfront
- ❌ Relevance: Simple string matching

### Recommended (Server-side with Live Search)
- ✅ Search: Live Search API with AI-powered relevance
- ✅ Filters: Dynamic facets from Live Search
- ✅ Performance: Server-side filtering, pagination
- ✅ Relevance: ML-based ranking, suggestions

## Implementation Plan

### Phase 1: Search Bar Integration
Replace client-side search with Live Search:

```typescript
// When user types in search bar
const { data } = await apolloClient.query({
  query: SEARCH_PRODUCTS,
  variables: {
    phrase: searchQuery,
    filters: activeFilters // Maintain current filters
  }
});
```

Benefits:
- Search suggestions appear as user types
- AI-powered relevance ranking
- Typo tolerance and synonyms

### Phase 2: Dynamic Faceted Filters
Replace static filters with Live Search facets:

```typescript
// Facets come from the same query
const facets = data.Search_productSearch.facets;
// Transform to filter UI:
// - Manufacturer: Apple (15), Samsung (8), CitiSignal (3)
// - Price Range: $0-500 (5), $500-1000 (12), $1000+ (9)
// - Memory: 128GB (10), 256GB (8), 512GB (5)
```

Benefits:
- Only show filters with available products
- Display product counts per option
- Filters update based on search/category

### Phase 3: Hybrid Loading Strategy

**Initial Page Load:**
1. Use `Catalog_productSearch` for initial products (with custom fields)
2. Use `Search_productSearch` (empty phrase) to get initial facets

**When User Interacts:**
1. Search typing → `Search_productSearch` with phrase
2. Filter selection → `Search_productSearch` with filters
3. Both return updated products + facets

## Query Structure

### Initial Load Query
```graphql
query InitialPhonePageLoad {
  # Products with custom fields
  Catalog_productSearch(phrase: "", filter: [{attribute: "categories", eq: "phones"}]) {
    items {
      productView {
        ... # All custom fields
      }
    }
  }
  
  # Facets for filters
  Search_productSearch(phrase: "", filter: [{attribute: "categories", eq: "phones"}]) {
    facets {
      title
      buckets {
        ... on Search_ScalarBucket {
          title
          count
        }
      }
    }
  }
}
```

### Search/Filter Query
```graphql
query SearchAndFilter($phrase: String!, $filters: [SearchFilterInput!]) {
  Search_productSearch(phrase: $phrase, filter: $filters) {
    items {
      productView {
        # Basic fields for search results
      }
    }
    facets {
      # Updated facets
    }
    suggestions # Search suggestions
  }
}
```

## Benefits
1. **Better Search**: AI-powered relevance, suggestions, typo tolerance
2. **Dynamic Filters**: Only show relevant options with counts
3. **Performance**: Server-side filtering, smaller payloads
4. **SEO**: Can implement URL-based filters for better SEO
5. **Scalability**: Works with thousands of products