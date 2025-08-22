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

The API returns simplified navigation structures:

```graphql
type NavItem {
  href: String!
  label: String!
  category: String # Optional category identifier for product pages
}

type FooterNavItem {
  href: String!
  label: String!
}

type CategoryNavigationResult {
  headerNav: [NavItem]!
  footerNav: [FooterNavItem]!
}
```

## Implementation

### API Mesh Resolvers

**category-navigation.js**:

- Returns pre-configured navigation items for header and footer
- Provides simplified structure optimized for frontend consumption
- Header navigation includes category identifiers for product pages
- Footer navigation contains static links for company information

**category-breadcrumbs.js**:

- Fetches category by URL key
- Builds complete breadcrumb trail
- Returns array of breadcrumb items with hierarchy levels

### GraphQL Queries

**GetCategoryNavigation.graphql**:

```graphql
query GetCategoryNavigation($rootCategoryId: String, $includeInactive: Boolean = false) {
  Citisignal_categoryNavigation(
    rootCategoryId: $rootCategoryId
    includeInactive: $includeInactive
  ) {
    headerNav {
      href
      label
      category
    }
    footerNav {
      href
      label
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
interface UseCategoryNavigationOptions {
  rootCategoryId?: string;
  includeInactive?: boolean;
  enabled?: boolean; // Whether to fetch data
}

const { data, error, loading } = useCategoryNavigation({
  rootCategoryId: '2', // Optional, defaults to root
  includeInactive: false, // Optional, filter inactive categories
  enabled: true, // Optional, control when to fetch
});

// Returns:
// data: { headerNav: NavItem[], footerNav: FooterNavItem[] } | null
```

**useCategoryBreadcrumbs**:

```typescript
const { data, error, loading } = useCategoryBreadcrumbs({
  categoryUrlKey: 'electronics',
});
```

Both hooks use SWR with:

- 1-hour cache duration (categories change rarely)
- No revalidation on focus
- Previous data kept while revalidating

## Usage Examples

### Navigation Menu

```tsx
import { useCategoryNavigation } from '@/hooks/navigation/useCategoryNavigation';

function NavigationMenu() {
  const { data, loading } = useCategoryNavigation();

  if (loading) return <NavigationSkeleton />;
  if (!data) return null;

  return (
    <nav>
      {/* Header Navigation */}
      <div className="header-nav">
        {data.headerNav.map((item, index) => (
          <NavItem key={index} href={item.href}>
            {item.label}
          </NavItem>
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="footer-nav">
        {data.footerNav.map((item, index) => (
          <FooterItem key={index} href={item.href}>
            {item.label}
          </FooterItem>
        ))}
      </div>
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

1. **Simplified Structure**: Returns flat arrays instead of nested hierarchy
2. **Pre-configured**: Navigation items are configured in the mesh resolver
3. **Performance**: Lightweight response with minimal data transfer
4. **Category Integration**: Header nav items include category field for product page routing
5. **Static Footer**: Footer navigation contains company/support links
