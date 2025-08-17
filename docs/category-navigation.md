# Category Navigation Implementation

## Overview

Category navigation and breadcrumbs are fetched from Commerce Core GraphQL API through custom resolvers in the API Mesh. This provides hierarchical category data for navigation menus and breadcrumb trails.

## Architecture

### Service Selection
- **Commerce Core GraphQL**: Primary source for category data
  - Has complete category hierarchy with parent-child relationships
  - Provides breadcrumb trail information
  - Includes metadata like `includeInMenu`, `isActive`, positions
- **Live Search**: Does not provide hierarchical category data
- **Catalog Service**: Limited category information, no hierarchy

### Custom Types

All custom types are namespaced with `Citisignal_` prefix:

```graphql
type Citisignal_CategoryItem {
  id: String!
  name: String!
  urlPath: String!
  urlKey: String!
  level: Int!
  position: Int!
  includeInMenu: Boolean!
  isActive: Boolean!
  children: [Citisignal_CategoryItem]
  productCount: Int
  parentId: String
}

type Citisignal_BreadcrumbItem {
  categoryId: String
  name: String!
  urlPath: String!
  level: Int!
}
```

## Implementation

### API Mesh Resolvers

**category-navigation.js**:
- Fetches top-level categories from Commerce Core
- Transforms to consistent `Citisignal_CategoryItem` structure
- Filters by `includeInMenu` and `isActive` flags
- Recursively includes child categories

**category-breadcrumbs.js**:
- Fetches category by URL key
- Builds complete breadcrumb trail
- Always includes Home → Shop → [Categories]
- Returns array of breadcrumb items with hierarchy levels

### GraphQL Queries

**GetCategoryNavigation.graphql**:
```graphql
query GetCategoryNavigation($rootCategoryId: String, $includeInactive: Boolean = false) {
  Citisignal_categoryNavigation(
    rootCategoryId: $rootCategoryId
    includeInactive: $includeInactive
  ) {
    items {
      id
      name
      urlPath
      urlKey
      level
      position
      includeInMenu
      isActive
      productCount
      children {
        # Nested structure up to 3 levels
      }
    }
  }
}
```

**GetCategoryBreadcrumbs.graphql**:
```graphql
query GetCategoryBreadcrumbs($categoryUrlKey: String!) {
  Citisignal_categoryBreadcrumbs(categoryUrlKey: $categoryUrlKey) {
    items {
      categoryId
      name
      urlPath
      level
    }
  }
}
```

### React Hooks

**useCategoryNavigation**:
```typescript
const { data, error, loading } = useCategoryNavigation({
  rootCategoryId: '2', // Optional, defaults to root
  includeInactive: false // Optional, filter inactive categories
});
```

**useCategoryBreadcrumbs**:
```typescript
const { data, error, loading } = useCategoryBreadcrumbs({
  categoryUrlKey: 'electronics'
});
```

Both hooks use SWR with:
- 1-hour cache duration (categories change rarely)
- No revalidation on focus
- Previous data kept while revalidating

## Usage Examples

### Navigation Menu
```tsx
import { useCategoryNavigation } from '@/hooks/navigation';

function NavigationMenu() {
  const { data, loading } = useCategoryNavigation();
  
  if (loading) return <NavigationSkeleton />;
  
  return (
    <nav>
      {data.items.map(category => (
        <NavItem key={category.id} href={category.urlPath}>
          {category.name}
          {category.children && (
            <SubMenu items={category.children} />
          )}
        </NavItem>
      ))}
    </nav>
  );
}
```

### Breadcrumb Trail
```tsx
import { useCategoryBreadcrumbs } from '@/hooks/navigation';

function Breadcrumbs({ categoryUrlKey }) {
  const { data, loading } = useCategoryBreadcrumbs({ categoryUrlKey });
  
  if (loading) return <BreadcrumbSkeleton />;
  
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex space-x-2">
        {data.items.map((item, index) => (
          <li key={index}>
            {index < data.items.length - 1 ? (
              <Link href={item.urlPath}>{item.name}</Link>
            ) : (
              <span>{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

## Data Flow

1. **Frontend** calls `useCategoryNavigation` or `useCategoryBreadcrumbs`
2. **Hook** sends GraphQL query to API Mesh
3. **Mesh Resolver** queries Commerce Core GraphQL
4. **Commerce Core** returns raw category data
5. **Resolver** transforms to `Citisignal_*` types
6. **Hook** caches result with SWR
7. **Component** renders navigation/breadcrumbs

## Caching Strategy

- **Cache Duration**: 1 hour (3600000ms)
- **Deduplication**: Prevents duplicate requests within cache period
- **Keep Previous**: Shows stale data while revalidating
- **No Focus Revalidation**: Categories don't change frequently

## Error Handling

Resolvers return safe defaults on error:
- **Navigation**: Empty items array
- **Breadcrumbs**: Home-only breadcrumb trail

Frontend hooks handle errors gracefully:
- Return empty data structure
- Allow components to show error states
- Log errors for debugging

## Testing

### Test Resolver Directly
```bash
curl -X POST [mesh-endpoint] \
  -H "Content-Type: application/json" \
  -H "x-api-key: [api-key]" \
  -d '{
    "query": "{ 
      Citisignal_categoryNavigation { 
        items { 
          name 
          urlPath 
          children { name } 
        } 
      } 
    }"
  }'
```

### Verify Commerce Core Data
```bash
# Check what Commerce Core returns
curl -X POST [commerce-endpoint] \
  -H "Content-Type: application/json" \
  -H "Store: default" \
  -d '{
    "query": "{ 
      categoryList { 
        items { 
          name 
          url_key 
          breadcrumbs { 
            category_name 
          } 
        } 
      } 
    }"
  }'
```

## Key Considerations

1. **Hierarchy Depth**: Currently fetches 3 levels of nested categories
2. **Filtering**: Only shows categories with `includeInMenu: true` and `isActive: true`
3. **Performance**: Single query fetches entire navigation tree
4. **Breadcrumb Base**: Always includes Home and Shop as base items
5. **URL Keys**: Categories identified by URL key for SEO-friendly URLs